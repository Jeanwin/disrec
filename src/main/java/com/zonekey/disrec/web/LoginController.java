/*****************************
 * Copyright (c) 2012 by Artron Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.web;

import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.cxf.transport.http.Cookies;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.entity.PlateForm;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.service.PlateFormService;
import com.zonekey.disrec.service.ServerService;
import com.zonekey.disrec.service.SysUserService;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.auth.Token;
import com.zonekey.disrec.service.mail.TemplateEmail;
import com.zonekey.disrec.vo.SysUserView;

/**
 * LoginController负责打开登录页面(GET请求)和登录出错页面(POST请求)，
 * 
 * 真正登录的POST请求由Filter完成,
 * 
 * @author <a href="mailto:cwx@artron.com">崔卫翔</a>
 * @version v 1.0
 */
@Controller
public class LoginController {

    @Resource
    private SysUserService sysUserService;
    private static final Logger LOG = LoggerFactory.getLogger(LoginController.class);
    @Resource
    private TemplateEmail templateEmail;
    @Autowired
	private PlateFormService plateFormService;
    
    
    @RequestMapping(value = "/login")
    public String login(HttpServletRequest req, SysUserView user, Model model) {
    	
    	PlateForm  plateForm = plateFormService.findOne();  	
    	req.getSession().setAttribute("DESKTOPPICTUREURL", plateForm.getUintPictureurl().replace("/disrec", ""));
    	req.getSession().setAttribute("DESKTOPNAME", plateForm.getDesktopName());
	if (user.getPassword() != null && user.getLoginname() != null) {
	    try {
		String loginIp = getIpAddrByRequest(req);
		SecurityUtils.getSubject().login(new Token(user.getLoginname(), user.getPassword(), user.getCode()));
		// 判断用户是否第一次登录
//		String checked = ShiroDbRealm.getSysUserView().getChecked();
//		if ("N".equals(checked)) {
//		    req.setAttribute("loginname", ShiroDbRealm.getCurrentLoginName());
//		    return "bindEmail";
//		}
		// SysUser suser =N 表示第一次登陆 Y 表示第n次登陆
		// sysUserService.queryUserByNameAndPass(user.getLoginname(),
		// user.getPassword());
		// sysUserService.updateSysUser(suser);
		// 保存用戶上次登陆时间
		// req.getSession().setAttribute("lastLoginTime",
		// user.getLogindata());
		sysUserService.updateLoginDateAndIp(ShiroDbRealm.getCurrentLoginName(), loginIp);
		return "redirect:/front/index.html";
	    } catch (Exception e) {
		model.addAttribute(FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME, e.getMessage());
	    }
	}
	return "login";
    }
    
    @RequestMapping(value = "/loginCMS")
    public String loginCMS(HttpServletResponse res,HttpServletRequest req) {
    	Cookie[] cookies = req.getCookies();
    	boolean flag = true;
    	if(cookies!= null){
    		for (Cookie cookie : cookies) {
				if(cookie.getName().equals("jeesite.session.id")){
					flag = false;
					break;
				}
			}
    	}
    	if(flag){
    		Map<String, String> map= sysUserService.loginCMS(null, null);
    		for (Entry<String, String> entry: map.entrySet()) {
    			if(entry.getKey().equals("jeesite.session.id")){
    				Cookie cookie = new Cookie("jeesite.session.id", map.get("jeesite.session.id"));
    				//cookie.setDomain("192.168.12.127");
    				cookie.setPath("/");
    				res.addCookie(cookie);
    				break;
    			}
    		}
    	} 
    	return "";
    }
    
    @RequestMapping(value = "/logout")
    public String logout() {
	Subject subject = SecurityUtils.getSubject();
	if (subject.isAuthenticated()) {
	    subject.logout(); // session 会销毁，在SessionListener监听session销毁，清理权限缓存
	}
	return "redirect:login";
    }

    @ResponseBody
    @RequestMapping(value = "/getUser", method = RequestMethod.POST)
    public SysUserView getUser(HttpServletResponse res,HttpServletRequest req) {
        loginCMS(res,req);
    	return ShiroDbRealm.getSysUserView();
    }


    /**
     * 登陆流程 1.登陆验证 2.获取用户信息(getUser) 3.获取学期信息(findTermTips) 3.更新登陆时间
     */
    @RequestMapping(value = "/updateLoginDateAndIp", method = RequestMethod.POST)
    public int updateLoginDate(HttpServletRequest req) {
	String ip = getIpAddrByRequest(req);
	String loginName = ShiroDbRealm.getCurrentLoginName();
	return sysUserService.updateLoginDateAndIp(loginName, ip);
    }

    /**
     * 第一次登录需要绑定邮箱及电话
     * 更新用户表中的邮箱及账户
     * @param user
     * @return
     */
    @RequestMapping(value = "/bindEmail", method = RequestMethod.POST)
    public String bindEmail(SysUser user, HttpServletRequest req) {
	// 更新邮箱和电话
	int flag = sysUserService.updateSysUser(user);
	// user.setChecked("Y");
	if (flag == 1) {
	    req.setAttribute("msg", "恭喜您！邮箱绑定成功");
	    // 发送激活邮件到用户邮箱
	    sendMail(user.getLoginname(),user.getEmail(), req);
	} else {
	    req.setAttribute("msg", "绑定失败");
	}
	return "result";
    }

    /**
     * 激活账户的action
     * 绑定邮箱--点击邮箱中的超链接--将checked字段置为‘Y’
     * 点击激活邮件中的超链接，激活账户
     */
    @RequestMapping(value = "/setCheckedY", method = RequestMethod.GET)
    public String setCheckedY(HttpServletRequest req,String loginname,String validateCode) {
	SysUser user = sysUserService.finduserByLoginname(loginname);
	//user.setSchoolyear(user.getSchoolyear());
	user.setValidateCode(validateCode);
	user.setChecked("Y");
	int flag = sysUserService.updateSysUser(user);
	if (flag == 1) {
	    return "login";
	} else {
	    req.setAttribute("msg", "激活失败，请重试.");
	}
	return "result";
    }

    /**
     * 根据请求获取IP地址
     * 
     * @param request
     * @return
     */
    public static String getIpAddrByRequest(HttpServletRequest request) {
	String ip = request.getHeader("x-forwarded-for");
	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	    ip = request.getHeader("Proxy-Client-IP");
	}
	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	    ip = request.getHeader("WL-Proxy-Client-IP");
	}
	if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	    ip = request.getRemoteAddr();
	}
	return ip;
    }
    /**
     * 绑定邮箱发送激活邮件
     */
    public String sendMail(String loginname, String email, HttpServletRequest req) {
	String validateCode = IdUtils.uuid2();
	String url = req.getRequestURL().toString();
	url = url.substring(0, url.lastIndexOf("/")) + "/setCheckedY?validateCode=" + validateCode + "&loginname=" + loginname;
	boolean flag = templateEmail.sendTemplateMail(loginname, url, email, "绑定邮箱","bindEmail.vm");
	if (flag) {
	    req.setAttribute("msg", "激活邮件已发送您的" + email + "邮箱，请登陆邮箱激活您的账户:"+loginname);
	} else {
	    req.setAttribute("msg", "发送邮件到" + email + "失败，请重试,若多次发送失败可能是邮箱不正确,请联系管理员。");
	}
	return "result";
    }
}
