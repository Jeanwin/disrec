/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.mobile.web;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Validator;

import org.activiti.engine.impl.util.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.MobileMsg;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.common.utils.MD5Utils;
import com.zonekey.disrec.common.utils.RegexUtils;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.service.SysUserService;
import com.zonekey.disrec.vo.SysUserView;
import com.zonekey.disrec.vo.UserModPassView;

@RestController
@RequestMapping(value = "/restMobile/userView")
public class MobileSysUserRestController {
	private static final Logger LOG = LoggerFactory.getLogger(MobileSysUserRestController.class);
	
	@Autowired
	private SysUserService sysuserService;

	@Autowired
	private Validator validator;

	/*
	 * 修改用户密码
	 * url: /userView/modifyPassword
	 */
	@RequestMapping(value = "/modifyPassword")//, method = RequestMethod.GET
	public @ResponseBody MobileMsg modifyPassword(HttpServletRequest req, HttpServletResponse resp){
		LOG.info("========>>modifyPassword");
		JSONArray array = new JSONArray();
		Map<String, Object> mapData = new HashMap<String, Object>();
		
		String userId = req.getParameter("userId");
	 	String oldPassword = req.getParameter("oldPassword");
    	String newPassword = req.getParameter("newPassword");
		String repPassword = req.getParameter("repPassword");
	    UserModPassView user = new UserModPassView();
	    user.setId(userId);
	    user.setOldPassword(oldPassword);
	    user.setNewPassword(newPassword);
	    user.setRepPassword(repPassword);
	    MobileMsg msg = new MobileMsg();
	    if(user.getId() == null || "".equals(user.getId()) 
		     ||user.getOldPassword() == null || "".equals(user.getOldPassword())
		     ||user.getNewPassword() == null || "".equals(user.getNewPassword())
		     ||user.getRepPassword() == null || "".equals(user.getRepPassword())){
		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
		mapData.put("response_code_string", "请输入正确的密码");
		array.put(mapData);
		CommonUtil.println(array, resp);
		return null;
	    }else if(sysuserService.getSysUser(user.getId()) !=null ){
		SysUser existUser = sysuserService.getSysUser(user.getId());
		msg.setDescribe("密码修改");
		if(MD5Utils.md5(user.getOldPassword()).equals(existUser.getPassword())  && user.getNewPassword().equals(user.getRepPassword()) && RegexUtils.isPassword(user.getNewPassword())){
		    SysUser sysUser = new SysUser();
		    sysUser.setId(user.getId());
		    sysUser.setLoginname(existUser.getLoginname());
		    sysUser.setUsertype(existUser.getUsertype());
		    sysUser.setPassword(MD5Utils.md5(user.getNewPassword()));
		    int flag = sysuserService.updateSysUser(sysUser);
		    if(flag>0){
		    	mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
				mapData.put("response_code_string", "密码修改成功");
		    }else{
	    	mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
			mapData.put("response_code_string", "密码修改失败，请重试");
		    }
		}else if(!MD5Utils.md5(user.getOldPassword()).equals(existUser.getPassword())){
				mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
				mapData.put("response_code_string", "原密码输入错误");
		}else if(!user.getNewPassword().equals(user.getRepPassword())){
				mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
				mapData.put("response_code_string", "两次密码输入不一致");
		}else if(!RegexUtils.isPassword(user.getNewPassword())){
				mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
				mapData.put("response_code_string", "新密码格式为以字母开头，6~18位字母、数字、下划线");
		}else{
				mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
				mapData.put("response_code_string", "密码修改失败");
		}
		array.put(mapData);
		CommonUtil.println(array, resp);
		return null;
	    }else{
	    	mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
			mapData.put("response_code_string", "密码修改失败");
			array.put(mapData);
			CommonUtil.println(array, resp);
			return null;
	    }
	}  
	/**
	 * 根据name查询用户
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "rangeuser")//, method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8
	public List<SysUserView> rangeuser(HttpServletRequest req, HttpServletResponse resp) {
		LOG.info("========>>rangeuser");
		SysUserView sysUserView = new SysUserView();
		JSONArray array = new JSONArray();
		Map<String, Object> mapData = new HashMap<String, Object>();
		String name = req.getParameter("name");
		try {
			if(name != null){
				name = URLDecoder.decode(name,"UTF-8");
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
//		
		sysUserView.setName(name);
		List<SysUserView> sysuser = sysuserService.getRangeUser(sysUserView);
		mapData.put("content", sysuser);
		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
		mapData.put("response_code_string", "通过名称查询教师");
		array.put(mapData);
		CommonUtil.println(array, resp);
		return null;
	}
}
