package com.zonekey.disrec.common.utils;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;

import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONArray;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.vo.SysUserView;

public class CommonUtil {
	/******************************************************************上传图片start*********************************/
	 public static String upload(String resourcePath,MultipartHttpServletRequest req,String delName){
		//  获得第1张图片（根据前台的name名称得到上传的文件）  
         MultipartFile imgFile  =  req.getFile("file");  
         String filename = imgFile.getOriginalFilename();
         String fileName = IdUtils.uuid();
         try {
 			// 扩展名
 			String ext = filename.substring(filename.indexOf("."));
 			fileName += ext;
 			// 校验文件类型并进行分类存储
 			String rePath = "";
 			if (resourcePath == null) {
 				resourcePath = AppConstants.IMAGE_PATH;
 				rePath = getTypePath(ext);
 				resourcePath += rePath;
 			}else{
 				resourcePath =AppConstants.IMAGE_PATH+resourcePath;
 			}
 			  //删除原路径
	         if(StringUtils.isNotBlank(delName)) {
	        		 delName = AppConstants.IMAGE_PATH+delName;
	        		 File file = new File(delName);
	        		 if(file.isFile()){
	        			file.delete();
	        		 }
	         }  
 			File file = creatFolder(resourcePath, fileName);
 			imgFile.transferTo(file);
 			return File.separator+rePath+fileName;
 		} catch (Exception e) {
 			e.printStackTrace();
 		}
         
		 return null;
	 }
	 /**
		 * 分类存储路径
		 */
		private static String getTypePath(String ext) {
			String path = DateUtils.getFormat("yyyy") + File.separator + DateUtils.getFormat("yyyyMMdd") + File.separator;
			if (AppConstants.IMG_EXT_LIST.contains(ext)) {
				return AppConstants.TYPE_PATH_LIST.get(0) + path;
			} else if (AppConstants.VIDEO_EXT_LIST.contains(ext)) {
				return AppConstants.TYPE_PATH_LIST.get(1) + path;
			} else if (AppConstants.DOC_EXT_LIST.contains(ext)) {
				return AppConstants.TYPE_PATH_LIST.get(2) + path;
			} else {
				return AppConstants.TYPE_PATH_LIST.get(3) + path;
			}
		}
		
	/**
	 * 
	 * @param resourcePath 项目下相对路径 如:upload/images/
	 * @param req
	 * @param delName 需要删除的图片
	 * @return
	 */
	 public static String uploadImage(String resourcePath,MultipartHttpServletRequest req,String delName){
		/* //绝对路径 
		 String absPath = req.getSession().getServletContext().getRealPath("");
		 //项目名
		 String projectName = absPath.substring(absPath.lastIndexOf(File.separatorChar));*/
   	  	 //图片存储的绝对路径
		 String folder = resourcePath;
		 if(StringUtils.isEmpty(resourcePath)){
			 resourcePath = AppConstants.IMAGE_PATH;
			 folder = "";
		 }
		 else{
			 folder = resourcePath;
			 resourcePath = AppConstants.IMAGE_PATH+resourcePath;
		 }
		 //  获得第1张图片（根据前台的name名称得到上传的文件）  
         MultipartFile imgFile  =  req.getFile("file");  
         //保存第一张图片  
         if(!StringUtils.isEmpty(imgFile.getOriginalFilename())) {
        	 String filName = getFile(imgFile,resourcePath, AppConstants.EXT_LIST);
        	 //删除已存在图片,用新图片代替
        	 if(StringUtils.isNotEmpty(filName)&&StringUtils.isNotEmpty(delName)){
        		 delName = resourcePath+delName;
        		 File file = new File(delName);
        		 if(file.isFile()){
        			file.delete();
        		 }
        	 }
        	 
             return File.separator+folder+filName;
         }  
         return null;
   }
	 /**
		 * 
		 * @param resourcePath 项目下相对路径 如:upload/images/
		 * @param req
		 * @param delName 需要删除的图片
		 * @return
		 */
		 public static String uploadImage(String resourcePath,MultipartHttpServletRequest req,String delName,String upoloadFile){
			//绝对路径 
			 String absPath = req.getSession().getServletContext().getRealPath("");
			 //项目名
			 String projectName = absPath.substring(absPath.lastIndexOf(File.separatorChar)+1);
	   	  	 //图片存储的绝对路径
			 String folder = resourcePath;
			 if(StringUtils.isEmpty(resourcePath)){
				 resourcePath = absPath+AppConstants.ASSETS_PATH;
				 folder = "";
			 }
			 else{
				 folder = resourcePath;
				 resourcePath =  absPath+AppConstants.ASSETS_PATH+resourcePath;
			 }
			 //  获得第1张图片（根据前台的name名称得到上传的文件）  
	         MultipartFile imgFile  =  req.getFile(upoloadFile);  
	         //保存第一张图片  
	         if(!StringUtils.isEmpty(imgFile.getOriginalFilename())) {
	        	 //删除已存在图片,用新图片代替
	        		 delName = resourcePath+imgFile.getOriginalFilename();
	        		 File file = new File(delName);
	        		 if(file.isFile()){
	        			file.delete();
	        		 }
	        	 String filName = getSameFile(imgFile,resourcePath, AppConstants.EXT_LIST);
	        	 
	             return "/"+projectName+AppConstants.ASSETS_PATH_GET+filName;
	         }  
	         return null;
	   }
   
   private static String getFile(MultipartFile imgFile,String path,List<String> fileTypes) {
	   //图片名
	   String filename=imgFile.getOriginalFilename(); //user.png
	   //扩展名
	   String ext=filename.substring(filename.lastIndexOf(".")); 
	   //为新生成图片命名
	   String fileName=DateUtils.getFormat("yyyyMMddHHmmss")+ext;
       
	   ext = ext.toLowerCase();  
        if(fileTypes.contains(ext)) {                      //如果扩展名属于允许上传的类型，则创建文件  
            try {  
            	File file = creatFolder(path,fileName);  
               imgFile.transferTo(file);                   //保存上传的文件
               return file.getName();
           } catch (Exception e) {  
               e.printStackTrace();  
           } 
        }  
        return null;  
   }
   private static String getSameFile(MultipartFile imgFile,String path,List<String> fileTypes) {
	   //图片名
	   String filename=imgFile.getOriginalFilename(); //user.png
	   //扩展名
	   String ext=filename.substring(filename.lastIndexOf(".")); 
//	   //为新生成图片命名
//	   String fileName=DateUtils.getFormat("yyyyMMddHHmmss")+ext;
       
	   ext = ext.toLowerCase();  
        if(fileTypes.contains(ext)) {                      //如果扩展名属于允许上传的类型，则创建文件  
            try {  
            	File file = creatFolder(path,filename);  
               imgFile.transferTo(file);                   //保存上传的文件
               return file.getName();
           } catch (Exception e) {  
               e.printStackTrace();  
           } 
        }  
        return null;  
   }
   /**
    * 创建文件
    * @param path 绝对路径
    * @param fileName 文件名
    * @return
    */
   private static File creatFolder(String path,String fileName) {  
       File file = new File(path);  
       if(!file.exists()){
       	file.mkdirs();
       }
       file = new File(file,fileName);
       return file;  
  }
   /******************************************************************上传图片end*********************************/
   
   /******************************************************************生成验证码start*********************************/
   private  static int width = 80;   //定义图片的width  
   private  static int height = 32;  //定义图片的height
   private  static int lineNum = 50;        // 干扰线数量
   private  static int codeCount = 4;//定义图片上显示验证码的个数  
   private  static Random random = new Random(); 
   private static final String RANDOM_STRS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //随机字符串
   
   private static final String FONT_NAME = "Fixedsys";
   private static final int FONT_SIZE = 20;
   public static BufferedImage codeImage(StringBuilder code){
	   // 定义图像buffer  
       BufferedImage buffImg = new BufferedImage(width, height, 
               BufferedImage.TYPE_INT_RGB); 
       Graphics gd = buffImg.getGraphics(); 
       // 设置背景色  
       gd.setColor(getRandColor(200, 250)); 
       gd.fillRect(0, 0, width, height); 
      

       // 随机产生40条干扰线，使图象中的认证码不易被其它程序探测到。  
       gd.setColor(getRandColor(110, 120)); 
       for (int i = 0; i < lineNum; i++) { 
       	drowLine(gd);
       } 

       // randomCode用于保存随机产生的验证码，以便用户登录后进行验证。Font.ROMAN_BASELINE  
       gd.setFont(new Font(FONT_NAME, Font.BOLD, FONT_SIZE)); 
       // 随机产生codeCount数字的验证码。  
       for (int i = 0; i < codeCount; i++) { 
           code.append(drowString(gd, i)); 
       } 
       return buffImg;
   }
   
   
   /**
    * 给定范围获得随机颜色
    */
   private static Color getRandColor(int fc, int bc) {
       if (fc > 255)
           fc = 255;
       if (bc > 255)
           bc = 255;
       int r = fc + random.nextInt(bc - fc);
       int g = fc + random.nextInt(bc - fc);
       int b = fc + random.nextInt(bc - fc);
       return new Color(r, g, b);
   }
   
   /**
    * 绘制干扰线
    */
   private static void drowLine(Graphics g) {
       int x = random.nextInt(width);
       int y = random.nextInt(height);
       int x0 = random.nextInt(16);
       int y0 = random.nextInt(16);
       g.drawLine(x, y, x + x0, y + y0);
   }
   /**
    * 绘制字符串
    */
   private static String drowString(Graphics g, int i) {
       g.setColor(new Color(random.nextInt(101), random.nextInt(111), random
               .nextInt(121)));
       String rand = String.valueOf(getRandomString(random.nextInt(RANDOM_STRS
               .length())));
       g.translate(random.nextInt(5), random.nextInt(3));
       g.drawString(rand, 16*i, 20);
       return rand;
   }
   /**
    * 获取随机的字符
    */
   private static String getRandomString(int num) {
       return String.valueOf(RANDOM_STRS.charAt(num));
   }	
   /******************************************************************生成验证码end*********************************/
   
   /**
	 * 获取系统配置信息
	 * @param propName
	 * @return
	 */
	public static String getConfig(String propName){
	InputStream is=CommonUtil.class.getClassLoader().getResourceAsStream("setting.properties");
   	Properties prop=new Properties();
   	try {
			prop.load(is);
			String propNameString = (String) prop.get(propName);
			String resultName = new String(propNameString.getBytes("ISO-8859-1"), "utf-8");
           return resultName;		
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	/**  
     * 获取linux磁盘空间大小  
     *  
* @return  
     * @throws Exception  
 */   
public static Map<String,String> getDeskUsage() throws Exception { 
   Map<String,String> map = new HashMap<String, String>();
  double totalHD_ = 0;   
   double usedHD_ = 0;  
   double lastHD_ = 0;
    Runtime rt = Runtime.getRuntime();   
   Process p = rt.exec("df -h /home/mfsdate");//df -hl 查看硬盘空间   
  BufferedReader in = null;   
   try {   
       in = new BufferedReader(new InputStreamReader(p.getInputStream()));   
      String str = null;   
      String[] strArray = null;   
        while ((str = in.readLine()) != null) {   
           int m = 0;   
              strArray = str.split(" ");   
             for (String tmp : strArray) {   
                 if (tmp.trim().length() == 0)   
                           continue;   
                  ++m;   
                  if (tmp.indexOf("G") != -1) {   
                     if (m == 2) {   
                            if (!tmp.equals("") && !tmp.equals("0"))   
                            	usedHD_ += Double.parseDouble(tmp   
                                       .substring(0, tmp.length() - 1)) * 1024;   

                       }   
                       if (m == 3) {   
                           if (!tmp.equals("none") && !tmp.equals("0"))   
                        	   totalHD_ += Double.parseDouble(tmp.substring(   
                                      0, tmp.length() - 1)) * 1024;   
 
                      }                      
                       if (m == 4) {   
                           if (!tmp.equals("none") && !tmp.equals("0"))   
                        	   lastHD_ += Double.parseDouble(tmp.substring(   
                                      0, tmp.length() - 1)) * 1024;   
 
                      }  
                      }   
                   if (tmp.indexOf("M") != -1) {   
                     if (m == 2) {   
                         if (!tmp.equals("") && !tmp.equals("0"))   
                        	 usedHD_ += Double.parseDouble(tmp   
                                      .substring(0, tmp.length() - 1));   

                     }   
                      if (m == 3) {   
                           if (!tmp.equals("none") && !tmp.equals("0"))   
                        	   totalHD_ += Double.parseDouble(tmp.substring(   
                                       0, tmp.length() - 1));   
                       } 
                      if (m == 4) {   
                          if (!tmp.equals("none") && !tmp.equals("0"))   
                       	   lastHD_ += Double.parseDouble(tmp.substring(   
                                     0, tmp.length() - 1)) * 1024;   

                     } 
                    }   
                         
               }   

         }   
   } catch (Exception e) {   
        e.printStackTrace();   
   } finally {   
            in.close();   
        }   
            //上面写在userd和total写反了，懒得改了，就反着用了  
       	map.put("totalHD", usedHD_/1024+"G");
    	map.put("usedHD", totalHD_/1024+"G");
    	map.put("lastHD", lastHD_/1024+"G");
        return map;   
    }  
	public static Map<String,String> getDesk() throws Exception  {
		String os = System.getProperty("os.name").toLowerCase();
		if (os.startsWith("linux")) {  
	        return getDeskUsage();  
	    } else if (os.startsWith("win")) {  
	    	 return getDesksages();
	    }
		return null;  
	}

	public static Map<String,String> getDesksages() throws Exception  {
		Map<String,String> map = new HashMap<String, String>();
		 File file = new File("C:");  
	        long totalSpace = file.getTotalSpace();  
	        long freeSpace = file.getFreeSpace();  
	        long usedSpace = totalSpace - freeSpace;  
	    	map.put("totalHD", totalSpace / 1024 / 1024 / 1024 + "G");
	    	map.put("usedHD", freeSpace / 1024 / 1024 / 1024 + "G");
	    	map.put("lastHD", usedSpace / 1024 / 1024 / 1024 + "G");
			return map;
		
	}
	/**
	 * 用于out输出
	 */
	public static void println(Object array, HttpServletResponse resp) {
		try {
			PrintWriter out=resp.getWriter();
			resp.setContentType( "text/html;charset=GBK "); 
			out.print(array);
			
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public static JSONArray generToJson(SysUserView sysUserView,
			String responseCodeSuccess, String string) {
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("content", sysUserView);
		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
		mapData.put("response_code_string", "登录成功");
		
		return null;
	}
	
	/**
	 * 
	 * @param url
	 *            发送请求的URL
	 * @param param
	 *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
	 * @return URL 所代表远程资源的响应结果
	 */
	@SuppressWarnings("unused")
	public static String sendGet(String url, String param) {

		String result = "";
		BufferedReader in = null;
		try {
			String urlNameString = url;
			if (param != null && !"".equals(param))
				urlNameString += "?" + param;
			URL realUrl = new URL(urlNameString);

			URLConnection connection = realUrl.openConnection();
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent",
					"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
			connection.connect();

			Map<String, List<String>> map = connection.getHeaderFields();
			

			in = new BufferedReader(new InputStreamReader(
					connection.getInputStream(), "UTF-8"));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			 e.printStackTrace();
			return null;
		} finally {
			try {
				if (in != null) {
					in.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return result;

	}
}
