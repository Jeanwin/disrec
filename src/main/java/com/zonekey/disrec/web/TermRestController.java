/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.web;

import java.net.URI;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.beanvalidator.BeanValidators;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exception.RestException;
import com.zonekey.disrec.entity.Term;
import com.zonekey.disrec.service.SysUserService;
import com.zonekey.disrec.service.TermService;
import com.zonekey.disrec.service.auth.ShiroDbRealm;

/**
 * @Title: @{#} TermRestController.java
 * @Description: <p>Term的Restful API的Controller.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@RestController
@RequestMapping(value = "/rest/term")
public class TermRestController {
	private static final Logger LOG = LoggerFactory.getLogger(TermRestController.class);
	
	@Autowired
	private TermService termService;

	@Autowired
	private Validator validator;
	
	//@Autowired
	//private SysUserService userService;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public Term get(@PathVariable("id") String id) {
		Term term = termService.getTerm(id);
		if (term == null) {
			String message = "数据不存在(id:" + id + ")";
			LOG.warn(message);
			throw new RestException(HttpStatus.NOT_FOUND, message);
		}
		return term;
	}
	
	@RequestMapping(value = "page/{no}/{size}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(@PathVariable("no") String no, @PathVariable("size") String size) {
		Page<Term> dataPage = termService.findPageBy(Integer.parseInt(no), Integer.parseInt(size));
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("rows", dataPage.getContent());
		return mapData;
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaTypes.JSON)
	public ResponseEntity<?> create(@RequestBody Term term, UriComponentsBuilder uriBuilder) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		BeanValidators.validateWithException(validator, term);

		// 保存新增
		termService.saveTerm(term);

		// 按照Restful风格约定，创建指向新任务的url, 也可以直接返回id或对象.
		String id = term.getId();
		URI uri = uriBuilder.path("/term/" + id).build().toUri();
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(uri);
		return new ResponseEntity(headers, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaTypes.JSON)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@RequestBody Term term) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		BeanValidators.validateWithException(validator, term);

		// 保存更新
		termService.updateTerm(term);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable("id") String id) {
		termService.deleteTerm(id);
	}
	
	/**
	 * 查看所有学期为下拉框使用
	 */
	
	@RequestMapping(value = "findAllTermForShearch")
	public @ResponseBody
	List<Term> findAllTermForShearch(HttpServletRequest req){
		return termService.findAllTermForShearch();
	}
	/**
	 * 查询当前学期下所有周次
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "findAllWeeksForShearch",method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		List<LinkedHashMap<String,Object>> findAllWeeksForShearch(HttpServletRequest req) {
//		Map<String,Object> map = JsonUtil.jsonToObject(req, Map.class);
		List<LinkedHashMap<String,Object>> data = termService.findAllWeeksForShearch();
		return data;
	}
	/**
	 * 查询当前学期下，当前周之后的周次
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "findWillWeeksForShearch",method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		List<LinkedHashMap<String,Object>> findWillWeeksForShearch(HttpServletRequest req) {
//		Map<String,Object> map = JsonUtil.jsonToObject(req, Map.class);
		List<LinkedHashMap<String,Object>> data = termService.findWillWeeksForShearch();
		return data;
	}
	/**
	 * 查询学期提示
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "findTermtips",method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		Map<String,Object> findTermtips(HttpServletRequest req) {
//		Map<String,Object> map = JsonUtil.jsonToObject(req, Map.class);
//		userService.updateLoginDate(ShiroDbRealm.LOGINNAME);
		Map<String,Object> data = termService.findTermtips();
		return data;
	}
}
