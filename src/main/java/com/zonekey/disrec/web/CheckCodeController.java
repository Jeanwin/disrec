package com.zonekey.disrec.web;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Date;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.eclipse.jetty.util.security.Credential.MD5;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.common.utils.MD5Utils;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.service.SysUserService;
import com.zonekey.disrec.service.mail.TemplateEmail;

@Controller 
@RequestMapping("/code")
public class CheckCodeController { 
	@Resource
	private TemplateEmail templateEmail;
	@Resource
	private SysUserService sysUserService;
    @RequestMapping("/getCode") 
    public void getCode(HttpServletRequest req, HttpServletResponse resp) 
            throws IOException { 
        // 将四位数字的验证码保存到Session中。  
    	StringBuilder code = new StringBuilder();
    	BufferedImage image = CommonUtil.codeImage(code);
        HttpSession session = req.getSession();
        session.setAttribute("code", code.toString()); 
 
        // 禁止图像缓存。  
        resp.setHeader("Pragma", "no-cache"); 
        resp.setHeader("Cache-Control", "no-cache"); 
        resp.setDateHeader("Expires", 0); 
 
        resp.setContentType("image/jpeg"); 
 
        // 将图像输出到Servlet输出流中。  
        ServletOutputStream sos = resp.getOutputStream(); 
        ImageIO.write(image, "jpeg", sos); 
        sos.close(); 
    }
    @ResponseBody
    @RequestMapping(value = "/checkCode",method = RequestMethod.POST) 
    public boolean getCode(HttpServletRequest req,String code)  { 
      String checkCode = (String) req.getSession().getAttribute("code");
      return checkCode.equalsIgnoreCase(code) ?true:false;
    }
    
    //返回
    @RequestMapping(value = "/retrievedPwd",method = RequestMethod.GET) 
    public String resetPwd(HttpServletRequest req) {
      return "retrievedPwd";
    }
    
    @RequestMapping(value = "/sendMail",method = RequestMethod.POST) 
    public String sendMail(String loginname,HttpServletRequest req) {
       String validateCode = IdUtils.uuid2();
       String url = req.getRequestURL().toString();
       url = url.substring(0,url.lastIndexOf("/"))+"/checkEmail?sid="+validateCode+"&loginname="+loginname;
       
       Map<String,Object> map = sysUserService.getValidate(loginname);
       if(map==null){
    	   req.setAttribute("msg", "用户"+loginname+"不存在,请核实");
    	   return "result";
       }
       String email = (String) map.get("email");
       if(email == null){
    	   req.setAttribute("msg", "您没有设置邮箱，请联系管理员。");
    	   return "result";
       }
       
       int update = sysUserService.addEmailCode(loginname,validateCode);
       if(update == 1){
    	   boolean flag = templateEmail.sendTemplateMail(loginname,url,email,"密码找回","email.vm");
    	   if(flag){
    		   req.setAttribute("msg", "重置密码邮件已发送您的"+email+"邮箱，请注意查收");
    	   }else{
    		   req.setAttribute("msg", "发送邮件到"+email+"失败，请重试,若多次发送失败可能是邮箱不正确,请联系管理员。");
    	   }
       }else{
    	   req.setAttribute("msg", "用户"+loginname+"不存在,请核实");
       }
       return "result";
    }
    @RequestMapping(value = "/checkEmail",method = RequestMethod.GET) 
    public String checkEmail(HttpServletRequest req,String sid,String loginname) {
    	if(StringUtils.isEmpty(sid)||StringUtils.isEmpty(loginname)){
    		req.setAttribute("msg", "链接不完整,请重新生成");
    		return "retrievedPwd";
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
    					return "resetPwd";
    				}else{
    					req.setAttribute("msg", "验证码错误,请重新找回");
    					return "retrievedPwd";
    				}
    			}else{
    				req.setAttribute("msg", "链接已失效或网络问题，请重新找回");
    				return "retrievedPwd";
    			}
    		}else{
    			req.setAttribute("msg", "非法操作,请重新找回");
				return "retrievedPwd";
    		}
    	}else{
    		req.setAttribute("msg", "用户"+loginname+"不存在,请核实");
    		return "result";
    	}
    }
    @RequestMapping(value = "/modifyPwd",method = RequestMethod.POST) 
    public String checkEmail(HttpServletRequest req,SysUser user) {
    	if(req.getSession().getAttribute("checked") != null){
    		String password = MD5Utils.md5(user.getPassword());
    		user.setPassword(password);
    		if(StringUtils.isNotEmpty(user.getPassword())){
    			int update = sysUserService.modifyPwd(user);
    			if(update == 1){
    				req.setAttribute("msg","密码修改成功,请用新密码<a href='"+req.getContextPath()+"/login'>登录</a>");
    				return "result";
    			}else{
    				req.setAttribute("msg", "密码修改失败");
    			}
    			req.getSession().removeAttribute("checked");
    		}
    	}else{
    		req.setAttribute("msg", "非法链接");
    	}
    	return "result";
    }
    
} 