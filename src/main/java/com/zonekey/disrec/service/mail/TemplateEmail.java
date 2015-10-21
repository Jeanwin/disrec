package com.zonekey.disrec.service.mail;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.velocity.app.VelocityEngine;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.ui.velocity.VelocityEngineUtils;

import com.zonekey.disrec.common.utils.DateUtils;


/**
 * 发送邮件 可以自己编写html模板
 * @author ajun
 *
 */
@Component
public class TemplateEmail {
	
	@Resource
	private  JavaMailSender sender;
	@Resource
    public  VelocityEngine velocityEngine;
      

	/**
     * 生成html模板字符串
     * @param root 存储动态数据的map
     * @return
     */
	private  String getMailText(Map<String,Object> root,String vmname){
		 String result ="";  
	        try {  
	            //通过指定模板名获取VelocityConfig模板实例  
	            result = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine,vmname, "utf-8", root);
	        } catch (Exception e) {  
	            e.printStackTrace();  
	        }  
	        return result;  
	}
	
	/**
	 * 发送邮件
	 * @param root 存储动态数据的map其中必须包含loginname
	 * @param toEmail 邮件地址
	 * @param subject 邮件主题
	 * @return
	 */
    public  boolean sendTemplateMail(String loginname,String url,String email,String subject,String vmname){  
        try {
			Map<String,Object> root = new HashMap<String,Object>();
			root.put("loginname", loginname);
			root.put("url", url);
			root.put("date", DateUtils.getFormat("yyyy-MM-dd"));
        	MimeMessage msg=sender.createMimeMessage();  
			MimeMessageHelper helper=new MimeMessageHelper(msg,false,"UTF-8");//由于是html邮件，不是mulitpart类型  
			helper.setFrom("gaoly@zonekey.com.cn");  
			
			helper.setTo(email);  
			helper.setSubject(subject);  
			String htmlText=getMailText(root,vmname);//使用模板生成html邮件内容  
			helper.setText(htmlText, true);  
			sender.send(msg);
			return true;
		} catch (MailException e) {
			e.printStackTrace();
			return false;
		} catch (MessagingException e) {
			e.printStackTrace();
			return false;
		}  
    }
   
    
    public  boolean sendMail(String name,String url,String email,String subject,String vmname,String clues, String areaName){  
        try {
			Map<String,Object> root = new HashMap<String,Object>();
			root.put("loginname", name);
			root.put("url", url);
			root.put("clues", clues);
			root.put("areaName", areaName);
			root.put("date", DateUtils.getFormat("yyyy-MM-dd"));
        	MimeMessage msg=sender.createMimeMessage();  
			MimeMessageHelper helper=new MimeMessageHelper(msg,false,"UTF-8");//由于是html邮件，不是mulitpart类型  
			helper.setFrom("gaoly@zonekey.com.cn");  
			
			helper.setTo(email);  
			helper.setSubject(subject);  
			String htmlText=getMailText(root,vmname);//使用模板生成html邮件内容  
			helper.setText(htmlText, true);  
			sender.send(msg);
			return true;
		} catch (MailException e) {
			e.printStackTrace();
			return false;
		} catch (MessagingException e) {
			e.printStackTrace();
			return false;
		}  
    }
}
