/*****************************
 * Copyright (c) 2012 by Artron Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.mobile.web;

import javax.servlet.http.Cookie;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.util.json.JSONArray;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.service.DeptService;
import com.zonekey.disrec.service.SysUserService;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.auth.Token;
import com.zonekey.disrec.service.mail.TemplateEmail;
import com.zonekey.disrec.vo.DeptView;
import com.zonekey.disrec.vo.SysUserView;

/**
 */
@Controller
@RequestMapping(value = "/mobile")
public class LogonController {

    @Resource
    private SysUserService sysUserService;
    @Resource
    private DeptService deptService;
    private static final Logger LOG = LoggerFactory.getLogger(LogonController.class);
    @Resource
    private TemplateEmail templateEmail;
    @RequestMapping(value = "/logon")//, method = RequestMethod.POST
    public void logon(HttpServletRequest req, HttpServletResponse resp, Model model){
    	LOG.info("========>>logon");
    	JSONArray array = new JSONArray();
    	Map<String, Object> mapData = new HashMap<String, Object>();
    	String loginname = req.getParameter("loginname");
    	String password = req.getParameter("password");
		String loginIp = req.getParameter("serveraddress");
		
	if (loginname != null && password != null) {
	    try {
		SecurityUtils.getSubject().login(new Token(loginname, password,"mobile"));
		Serializable sessionid = SecurityUtils.getSubject().getSession().getId();
		
		
		SysUserView sysUserView  = ShiroDbRealm.getSysUserView();
		DeptView deptview = deptService.getDept(sysUserView.getDeptid());
		Map<String, Object> map = new HashMap<String, Object>();
		List<String> list = sysUserView.getAuthenticatid();
		
		map.put("deptName", deptview.getName());
		map.put("pictureurl", sysUserView.getPictureurl());
		map.put("name", sysUserView.getName());
		map.put("deptName", sysUserView.getDeptName());
		map.put("userId", sysUserView.getId());
		map.put("JSESSIONID",sessionid);
		map.put("authenticatid", getMobileAuthenticatid(list));
		sysUserService.updateLoginDateAndIp(ShiroDbRealm.getCurrentLoginName(), loginIp);
		mapData.put("content", map);
		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
		mapData.put("response_code_string", "登录成功");
		LOG.info(loginname + "登录成功");
	    } catch (Exception e) {
			mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
			mapData.put("response_code_string", e.getMessage());
			LOG.info(e.getMessage());
	    }
	}
	array.put(mapData);
	CommonUtil.println(array,resp);
    }
    

	/**
     * 法判断手机权限
     * @param list
     * @return
     */
    private List<String> getMobileAuthenticatid(List<String> list) {
    	List<String> list_ = new ArrayList<String>();
    	if(list.indexOf("auth_scheduleManagements_week_url_view") == -1){
			LOG.info("没有查看课表权限");
		}else{
			list_.add("auth_scheduleManagements_week_url_view");
		}
		if(list.indexOf("auth_director_url_view") == -1){
			LOG.info("没有查看直播权限");
		}else{
			list_.add("auth_director_url_view");
		}
	return list_;
}

	@RequestMapping(value = "/logout")
    public String logout(HttpServletResponse resp) {
		LOG.info("========>>logout");
    	JSONArray array = new JSONArray();
    	Map<String, Object> mapData = new HashMap<String, Object>();
		Subject subject = SecurityUtils.getSubject();
		if (subject.isAuthenticated()) {
		    subject.logout(); // session 会销毁，在SessionListener监听session销毁，清理权限缓存
		}
		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
		mapData.put("response_code_string", "登出成功");
		LOG.info("用户登录成功");
		array.put(mapData); 
		CommonUtil.println(array,resp);
		
		return null;
    }
	@RequestMapping(value = "/version")
    public String version(HttpServletRequest req,HttpServletResponse resp) {
		LOG.info("========>>version");
		String version = req.getParameter("version");
    	JSONArray array = new JSONArray();
    	Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
		mapData.put("response_code_string", "版本一致");
		LOG.info("版本一致");
		array.put(mapData); 
		CommonUtil.println(array,resp);
		
		return null;
    }
}
