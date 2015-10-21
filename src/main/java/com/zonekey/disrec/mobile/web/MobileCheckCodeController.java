package com.zonekey.disrec.mobile.web;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONArray;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.common.utils.MD5Utils;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.service.SysUserService;
import com.zonekey.disrec.service.mail.TemplateEmail;

@Controller 
@RequestMapping("/codeMobile")
public class MobileCheckCodeController { 
	private static final Logger LOG = LoggerFactory.getLogger(MobileCheckCodeController.class);
	@Resource
	private TemplateEmail templateEmail;
	@Resource
	private SysUserService sysUserService;
    
    @RequestMapping(value = "/sendMail") //,method = RequestMethod.POST
    public String sendMail(HttpServletRequest req, HttpServletResponse resp) {
    	LOG.info("========>>sendMail");
    	JSONArray array = new JSONArray();
    	Map<String, Object> mapData = new HashMap<String, Object>();
    	String loginname = req.getParameter("loginname");
    	
       String validateCode = IdUtils.uuid2();
       String url = req.getRequestURL().toString();
       url = url.substring(0,url.lastIndexOf("/"))+"/checkEmail?sid="+validateCode+"&loginname="+loginname;
       
       Map<String,Object> map = sysUserService.getValidate(loginname);
       if(map==null){
//    	   req.setAttribute("msg", "用户"+loginname+"不存在,请核实");
    	mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
   		mapData.put("response_code_string", "用户"+loginname+"不存在,请核实");
   		array.put(mapData);
   		CommonUtil.println(array,resp);
    	   return null;
       }
       String email = (String) map.get("email");
       if(email == null){
//    	   req.setAttribute("msg", "您没有设置邮箱，请联系管理员。");
    	   mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
      		mapData.put("response_code_string", "您没有设置邮箱，请联系管理员。");
      		array.put(mapData);
      		CommonUtil.println(array,resp);
       	   return null;
       }
       int update = sysUserService.addEmailCode(loginname,validateCode);
       if(update == 1){
    	   boolean flag = templateEmail.sendTemplateMail(loginname,url,email,"密码找回","email.vm");
    	   if(flag){
//    		   req.setAttribute("msg", "重置密码邮件已发送您的"+email+"邮箱，请注意查收");
    		   mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
         		mapData.put("response_code_string", "重置密码邮件已发送您的"+email+"邮箱，请注意查收");
    	   }else{
//    		   req.setAttribute("msg", "发送邮件到"+email+"失败，请重试,若多次发送失败可能是邮箱不正确,请联系管理员。");
    		   mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
         		mapData.put("response_code_string", "发送邮件到"+email+"失败，请重试,若多次发送失败可能是邮箱不正确,请联系管理员。");
    	   }
       }else{
//    	   req.setAttribute("msg", "用户"+loginname+"不存在,请核实");
    	   mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
    		mapData.put("response_code_string", "用户"+loginname+"不存在,请核实");
       }
       array.put(mapData);
 	   CommonUtil.println(array,resp);
  	   return null;
    }
    @RequestMapping(value = "/checkEmail",method = RequestMethod.GET) 
    public String checkEmail(HttpServletRequest req, HttpServletResponse resp) {
    	LOG.info("========>>checkEmail");
    	String sid = req.getParameter("sid");
    	String loginname = req.getParameter("loginname");
    	JSONArray array = new JSONArray();
    	Map<String, Object> mapData = new HashMap<String, Object>();
    	
    	if(StringUtils.isEmpty(sid)||StringUtils.isEmpty(loginname)){
//    		req.setAttribute("msg", "链接不完整,请重新生成");
    		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
       		mapData.put("response_code_string", "链接不完整,请重新生成");
       		array.put(mapData);
       		CommonUtil.println(array,resp);
        	return null;
    		
    	}
    	
    	Map<String,Object> map = sysUserService.getValidate(loginname);
    	if(map != null &&map.size()!=0){
    		Date date = (Date) map.get("outDate"); 
    		if(date != null){
    			long time = date.getTime()+30*60*1000;
    			if(time>=System.currentTimeMillis()){
    				if(sid.equals(map.get("validateCode"))){
    					req.setAttribute("loginname", loginname);
    					//用于判断是否通过邮箱链接进行的密码修改
    					req.getSession().setAttribute("checked", "checked");
//    					return "resetPwd";
    					mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
    		       		mapData.put("response_code_string", "通过邮箱链接进行的密码修改");
    		       		array.put(mapData);
    		       		CommonUtil.println(array,resp);
    		        	return null;
    					
    				}else{
//    					req.setAttribute("msg", "验证码错误,请重新找回");
//    					return "retrievedPwd";
    					mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
    		       		mapData.put("response_code_string", "验证码错误,请重新找回");
    		       		array.put(mapData);
    		       		CommonUtil.println(array,resp);
    		        	return null;
    				}
    			}else{
//    				req.setAttribute("msg", "链接已失效或网络问题，请重新找回");
//    				return "retrievedPwd";
    				mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
		       		mapData.put("response_code_string", "链接已失效或网络问题，请重新找回");
		       		array.put(mapData);
		       		CommonUtil.println(array,resp);
		        	return null;
    			}
    		}else{
//    			req.setAttribute("msg", "非法操作,请重新找回");
//				return "retrievedPwd";
    			mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
	       		mapData.put("response_code_string", "非法操作,请重新找回");
	       		array.put(mapData);
	       		CommonUtil.println(array,resp);
	        	return null;
    		}
    	}else{
//    		req.setAttribute("msg", "用户"+loginname+"不存在,请核实");
//    		return "result";
    		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
       		mapData.put("response_code_string", "用户"+loginname+"不存在,请核实");
       		array.put(mapData);
       		CommonUtil.println(array,resp);
        	return null;
    	}
    }
    @RequestMapping(value = "/modifyPwd") //,method = RequestMethod.POST
    public String modifyPwd(HttpServletRequest req,HttpServletResponse resp) {
    	LOG.info("========>>modifyPwd");
    	JSONArray array = new JSONArray();
		Map<String, Object> mapData = new HashMap<String, Object>();
		
		String key = JsonUtil.toJson(req.getParameterMap());
		key = key.replace("[", "").replace("]", "");
    	SysUser user = JsonUtil.jsonToObject(key, SysUser.class);
    	
    	if(req.getSession().getAttribute("checked") != null){
    		String password = MD5Utils.md5(user.getPassword());
    		user.setPassword(password);
    		if(StringUtils.isNotEmpty(user.getPassword())){
    			int update = sysUserService.modifyPwd(user);
    			if(update == 1){
//    				req.setAttribute("msg","密码修改成功,请用新密码<a href='"+req.getContextPath()+"/login'>登录</a>");
//    				return "result";
    				mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
    	       		mapData.put("response_code_string", "密码修改成功,请用新密码<a href='"+req.getContextPath()+"/login'>登录</a>");
    	       		array.put(mapData);
    	       		CommonUtil.println(array,resp);
    	        	return null;
    			}else{
    				mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
    	       		mapData.put("response_code_string", "密码修改失败");
//    				req.setAttribute("msg", "密码修改失败");
    			}
    			req.getSession().removeAttribute("checked");
    		}
    	}else{
    		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
       		mapData.put("response_code_string", "非法链接");
//    		req.setAttribute("msg", "非法链接");
    	}
    	array.put(mapData);
   		CommonUtil.println(array,resp);
    	return null;
    }
    
} 