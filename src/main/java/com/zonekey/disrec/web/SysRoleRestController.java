/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.web;

import java.util.List;
import java.util.Map;

import javax.annotation.RegEx;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exception.RestException;
import com.zonekey.disrec.entity.SysRole;
import com.zonekey.disrec.service.SysRoleService;
import com.zonekey.disrec.vo.SysRoleView;

/**
 * @Title: @{#} SysRoleRestController.java
 * @Description: <p>SysRole的Restful API的Controller.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@RestController
@RequestMapping(value = "/sysrole")
public class SysRoleRestController {
	private static final Logger LOG = LoggerFactory.getLogger(SysRoleRestController.class);
	
	@Autowired
	private SysRoleService sysroleService;

	@Autowired
	private Validator validator;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public SysRole get(@PathVariable("id") String id) {
		SysRole sysrole = sysroleService.getSysRole(id);
		if (sysrole == null) {
			String message = "数据不存在(id:" + id + ")";
			LOG.warn(message);
			throw new RestException(HttpStatus.NOT_FOUND, message);
		}
		return sysrole;
	}
	
	@RequestMapping(value = "roles", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String, Object>> getRoles() {
		List<Map<String,Object>> list = sysroleService.getRoles();
		return list;
	}

	@RequestMapping(value = "save",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public void create(HttpServletRequest req, UriComponentsBuilder uriBuilder) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		SysRole sysRole = JsonUtil.jsonToObject(req, SysRole.class);
		// 保存新增
		sysroleService.saveSysRole(sysRole);
	}

	@RequestMapping(value = "update", method = RequestMethod.POST, produces = MediaTypes.JSON)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	public void update(HttpServletRequest req) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		SysRole sysRole = JsonUtil.jsonToObject(req, SysRole.class);
		// 保存更新
		sysroleService.updateSysRole(sysRole);
	}
	
	@RequestMapping(value = "updatePower", method = RequestMethod.POST, produces = MediaTypes.JSON)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	public void updatePower(HttpServletRequest req) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		SysRoleView sysRole = JsonUtil.jsonToObject(req, SysRoleView.class);
		// 保存更新
		sysroleService.updatePower(sysRole);
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	public int delete(HttpServletRequest req) {
		SysRoleView sysRole = JsonUtil.jsonToObject(req, SysRoleView.class);
		return sysroleService.deleteSysRole(sysRole);
	}
}
