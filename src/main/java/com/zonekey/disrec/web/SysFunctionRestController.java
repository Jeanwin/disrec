/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.web;

import java.net.URI;
import java.util.List;
import java.util.Map;

import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.beanvalidator.BeanValidators;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.exception.RestException;
import com.zonekey.disrec.entity.SysFunction;
import com.zonekey.disrec.service.SysFunctionService;

/**
 * @Title: @{#} SysFunctionRestController.java
 * @Description: <p>SysFunction的Restful API的Controller.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@RestController
@RequestMapping(value = "/sysfunction")
public class SysFunctionRestController {
	private static final Logger LOG = LoggerFactory.getLogger(SysFunctionRestController.class);
	
	@Autowired
	private SysFunctionService sysfunctionService;

	@Autowired
	private Validator validator;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public SysFunction get(@PathVariable("id") String id) {
		SysFunction sysfunction = sysfunctionService.getSysFunction(id);
		if (sysfunction == null) {
			String message = "数据不存在(id:" + id + ")";
			LOG.warn(message);
			throw new RestException(HttpStatus.NOT_FOUND, message);
		}
		return sysfunction;
	}
	
	@RequestMapping(value = "functions", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String, Object>> functions() {
		return sysfunctionService.getFunctions();
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaTypes.JSON)
	public ResponseEntity<?> create(@RequestBody SysFunction sysfunction, UriComponentsBuilder uriBuilder) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		BeanValidators.validateWithException(validator, sysfunction);

		// 保存新增
		sysfunctionService.saveSysFunction(sysfunction);

		// 按照Restful风格约定，创建指向新任务的url, 也可以直接返回id或对象.
		String id = sysfunction.getId();
		URI uri = uriBuilder.path("/sysfunction/" + id).build().toUri();
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(uri);

		return new ResponseEntity(headers, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaTypes.JSON)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@RequestBody SysFunction sysfunction) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		BeanValidators.validateWithException(validator, sysfunction);

		// 保存更新
		sysfunctionService.updateSysFunction(sysfunction);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable("id") String id) {
		sysfunctionService.deleteSysFunction(id);
	}
}
