package com.zonekey.disrec.common.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.NoRouteToHostException;
import java.net.SocketException;
import java.net.SocketTimeoutException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.web.multipart.MultipartFile;
  public class ContinueFTP {
	  protected int connectTimeout = 1000;
      private FTPClient ftpClient = new FTPClient();    
       public ContinueFTP(){    
          this.ftpClient.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out))); 
          
      }    
           
      /**   
       * java������������ӵ�FTP������   
       * @param hostname ������   
       * @param port �˿�   
       * @param username �û���   
       * @param password ����   
       * @return �Ƿ����ӳɹ�   
     * @throws SocketException 
       * @throws IOException   
       */   
      public boolean connect(String hostname,int port,String username,String password) throws SocketTimeoutException, IOException,NoRouteToHostException{ 
    	  ftpClient.setConnectTimeout(2000); // 一秒钟，如果超过就判定超时了
          ftpClient.connect(hostname, port);    
          if(FTPReply.isPositiveCompletion(ftpClient.getReplyCode())){    
              if(ftpClient.login(username, password)){    
                	
                 	return true;
              }    
          }    
          disconnect();    
          return false;    
      }    
           
      /**   
       * ��FTP�������������ļ�   
       * @param remote Զ���ļ�·��   
       * @param local �����ļ�·��   
       * @return �Ƿ�ɹ�   
       * @throws IOException   
       */   
      public boolean download(String remote,String local) throws IOException{    
          ftpClient.enterLocalPassiveMode();    
          ftpClient.setFileType(FTP.BINARY_FILE_TYPE);    
          
          boolean result;    
          File f = new File(local);    
          FTPFile[] files = ftpClient.listFiles(remote);    
          if(files.length != 1){    
              return false;    
          }    
          long lRemoteSize = files[0].getSize();    
          if(f.exists()){    
              OutputStream out = new FileOutputStream(f,true);    
              System.out.println("�����ļ���СΪ:"+f.length());    
              if(f.length() >= lRemoteSize){    
                  System.out.println("�����ļ���С����Զ���ļ���С��������ֹ");    
                  return false;    
              }    
              ftpClient.setRestartOffset(f.length());    
              result = ftpClient.retrieveFile(remote, out);    
              out.close();    
          }else {    
              OutputStream out = new FileOutputStream(f);    
              result = ftpClient.retrieveFile(remote, out);    
              out.close();    
          }    
          return result;    
      }    
           
      /**   
       * �ϴ��ļ���FTP��������֧�ֶϵ���   
       * @param local �����ļ���ƣ����·��   
       * @param remote Զ���ļ�·����ʹ��/home/directory1/subdirectory/file.ext ����Linux�ϵ�·��ָ����ʽ��֧�ֶ༶Ŀ¼Ƕ�ף�֧�ֵݹ鴴�������ڵ�Ŀ¼�ṹ   
       * @return �ϴ����   
       * @throws IOException   
       */   
      public String upload(String local,String remote) throws IOException{    
          //����PassiveMode����    
          ftpClient.enterLocalPassiveMode();    
          //�����Զ��������ķ�ʽ����    
          ftpClient.setFileType(FTP.BINARY_FILE_TYPE);    
          String  result;    
          //��Զ��Ŀ¼�Ĵ���    
          String remoteFileName = remote;    
          if(remote.contains("/")){    
              remoteFileName = remote.substring(remote.lastIndexOf("/")+1);    
              String directory = remote.substring(0,remote.lastIndexOf("/")+1);    
              if(!directory.equalsIgnoreCase("/")&&!ftpClient.changeWorkingDirectory(directory)){    
                  //���Զ��Ŀ¼�����ڣ���ݹ鴴��Զ�̷�����Ŀ¼    
                  int start=0;    
                  int end = 0;    
                  if(directory.startsWith("/")){    
                      start = 1;    
                  }else{    
                      start = 0;    
                  }    
                  end = directory.indexOf("/",start);    
                  while(true){    
                      String subDirectory = remote.substring(start,end);    
                      if(!ftpClient.changeWorkingDirectory(subDirectory)){    
                          if(ftpClient.makeDirectory(subDirectory)){    
                              ftpClient.changeWorkingDirectory(subDirectory);    
                          }else {    
                              System.out.println("����Ŀ¼ʧ��");    
                              return "����Ŀ¼ʧ��";    
                          }    
                      }    
                           
                      start = end + 1;    
                      end = directory.indexOf("/",start);    
                           
                      //�������Ŀ¼�Ƿ񴴽����    
                      if(end <= start){    
                          break;    
                      }    
                  }    
              }    
          }    
               
          //���Զ���Ƿ�����ļ�    
          FTPFile[] files = ftpClient.listFiles(remoteFileName);    
          if(files.length == 1){    
              long remoteSize = files[0].getSize();    
              File f = new File(local);    
              long localSize = f.length();    
              if(remoteSize==localSize){    
                  return "�ļ�����";    
              }else if(remoteSize > localSize){    
                  return "��С��һ��";    
              }    
                   
              //�����ƶ��ļ��ڶ�ȡָ��,ʵ�ֶϵ���    
              InputStream is = new FileInputStream(f);    
              if(is.skip(remoteSize)==remoteSize){    
                  ftpClient.setRestartOffset(remoteSize);    
                  if(ftpClient.storeFile(remote, is)){    
                      return "�ϵ�";    
                  }    
              }    
                   
              //���ϵ���û�гɹ�����ɾ����������ļ��������ϴ�    
              if(!ftpClient.deleteFile(remoteFileName)){    
            	  return "ɾ��";    
              }    
              is = new FileInputStream(f);    
              if(ftpClient.storeFile(remote, is)){        
            	  return "�ɹ�";     
              }else{    
                  result = "ʧ��";    
              }    
              is.close();    
          }else {    
              InputStream is = new FileInputStream(local);    
              if(ftpClient.storeFile(remoteFileName, is)){    
            	  return "�ɹ�1"; 
              }else{    
                  result = "fails";    
              }    
              is.close();    
          }    
          return result;    
      }    
      /**   
       * �Ͽ���Զ�̷�����������   
       * @throws IOException   
       */   
      public void disconnect() throws IOException{    
          if(ftpClient.isConnected()){    
              ftpClient.disconnect();
          }    
      }    
  
      /**   
       * ��ʾ�����ڵ��ļ��б�   
       * @throws IOException   
       */   
      public  java.util.List  getfileList(String path) throws IOException{    
    	  java.util.List list=new java.util.ArrayList();
          if(ftpClient.isConnected()){    
        	 
        	FTPFile[] file= ftpClient.listFiles(path);
           	if(file.length>0){
//           		list=new java.util.ArrayList();
           	
	           	for(int i=0;i<file.length;i++){
	           		java.util.Map map=new java.util.HashMap();
	           		map.put("name", file[i].getName());
	           		map.put("size", file[i].getSize());
	           		map.put("timestamp", file[i].getTimestamp());
	           		
//	           		System.out.println("文件名称"+file[i].getName());
//	           		System.out.println("文件大小"+file[i].getSize());
	           		file[i].getTimestamp().setTime(new Date());
	           		SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 定义日期格式
	        		String sysTime=format2.format(file[i].getTimestamp().getTime());
//	           		System.out.println("文件时间"+sysTime);
	           		map.put("time", sysTime);
	           		
	           		list.add(map);
	           	}
           	}
          }   
          return list;
      }    

      public  java.util.List  getFolederList(String path) throws IOException{    
    	  java.util.List list=new java.util.ArrayList();
          if(ftpClient.isConnected()){    
        	
        	FTPFile[] file= ftpClient.listFiles(path);
           	if(file.length>0){
//           		list=new java.util.ArrayList();
           	
	           	for(int i=0;i<file.length;i++){
	           		java.util.Map map=new java.util.HashMap();
	           		map.put("name", file[i].getName());
	           		map.put("size", file[i].getSize());
	           		SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 定义日期格式
	        		String sysTime=format2.format(file[i].getTimestamp().getTime());
	           		map.put("time", sysTime);
	           		//判断是不是文件夹，是返回true，不是返回false ，因为数据少暂时注掉，以后要打开
	           		if(file[i].isDirectory() ){
	           			list.add(map);
	           		}
	           		
//	           		System.out.println(file[i].getName());
	           		
	           		
	           	}
           	}
          }  
          return list;
      }   
      /**
       * 设置超时时间
     * @param connectTimeout
     */
    public void setConnectTimeout(int connectTimeout) {
          this.connectTimeout = connectTimeout;
      }
    
      public static void main(String[] args) {    
          ContinueFTP myFtp = new ContinueFTP();    
          try {    
              
        	  myFtp.connect("192.168.12.214", 21, "anonymous", "qq123321!!");
        	 
              myFtp.disconnect();    
          } catch (IOException e) {    
              System.out.println("����FTP���?"+e.getMessage());    
          }    
      }
      //
      public boolean upload(MultipartFile []files){
	      InputStream is = null;
	      boolean flag=true;
	      try{
	    	  ftpClient.enterLocalPassiveMode();    
	    	  ftpClient.setFileType(FTP.BINARY_FILE_TYPE);    
	    	  ftpClient.changeWorkingDirectory("update");
	    	  for (MultipartFile file : files) {
	    		  is = file.getInputStream();
		    	  String fileName = file.getOriginalFilename();
		    	  flag = ftpClient.storeFile(fileName, is);
		    	  if(!flag){
		    		  return false;
		    	  }
			}
	          return true;
	      }catch(Exception e){
	    	  e.printStackTrace();
	      }finally{
	    	  try {
				is.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
	      }
		return false;
      }
  } 
