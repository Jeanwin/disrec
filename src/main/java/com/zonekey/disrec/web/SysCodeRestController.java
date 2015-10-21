/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.web;

import java.net.URI;
import java.util.HashMap;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.beanvalidator.BeanValidators;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exception.RestException;
import com.zonekey.disrec.entity.SysCode;
import com.zonekey.disrec.service.SysCodeService;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.SysCodeView;

/**
 * @Title: @{#} SysCodeRestController.java
 * @Description: <p>SysCode的Restful API的Controller.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@RestController
@RequestMapping(value = "/syscode")
public class SysCodeRestController {
	private static final Logger LOG = LoggerFactory.getLogger(SysCodeRestController.class);
	
	@Autowired
	private SysCodeService syscodeService;

	@Autowired
	private Validator validator;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public SysCode get(@PathVariable("id") String id) {
		SysCode syscode = syscodeService.getSysCode(id);
		if (syscode == null) {
			String message = "数据不存在(id:" + id + ")";
			LOG.warn(message);
			throw new RestException(HttpStatus.NOT_FOUND, message);
		}
		return syscode;
	}
	/**
	 * 字典树
	 * @return
	 */
	@RequestMapping(value = "dicTree", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String,Object>> dicTree() {
		//获取设备类型
		return syscodeService.getDicTree();
	}
	/**
	 * 字典数据
	 * @return
	 */
	@RequestMapping(value = "codes", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> codes(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		//获取设备类型f
		Page<SysCodeView> dataPage =syscodeService.findPageBy(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}
	/**
	 * 字典数据更新
	 * @return
	 */
	@RequestMapping(value = "update", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int update(HttpServletRequest req) {
		SysCode syscode = JsonUtil.jsonToObject(req, SysCode.class);
		return syscodeService.updateSysCode(syscode);
	}
	/**
	 * 字典数据添加
	 * @return
	 */
	@RequestMapping(value = "save", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int save(HttpServletRequest req) {
		SysCode syscode = JsonUtil.jsonToObject(req, SysCode.class);
		return syscodeService.saveSysCode(syscode);
	}
	@RequestMapping(value = "diviceType", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String,Object>> get() {
		//获取设备类型
		return syscodeService.findDiviceType();
	}
	@RequestMapping(value = "areaType", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String,Object>> areaType() {
		return syscodeService.findType("19");
	}
	@RequestMapping(value = "deptType", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<SysCode> getDeptType() throws Exception {
		//获取组织机构类型
		return syscodeService.findSopeAll("14");
	}

	@RequestMapping(value = "recordType", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<SysCode> getRecordType() throws Exception {
		//获取录像模式类型
		return syscodeService.findSopeAll("32");
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaTypes.JSON)
	public ResponseEntity<?> create(@RequestBody SysCode syscode, UriComponentsBuilder uriBuilder) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		BeanValidators.validateWithException(validator, syscode);

		// 保存新增
		syscodeService.saveSysCode(syscode);

		// 按照Restful风格约定，创建指向新任务的url, 也可以直接返回id或对象.
		String id = syscode.getId();
		URI uri = uriBuilder.path("/syscode/" + id).build().toUri();
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(uri);

		return new ResponseEntity(headers, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaTypes.JSON)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@RequestBody SysCode syscode) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		BeanValidators.validateWithException(validator,syscode);

		// 保存更新
		syscodeService.updateSysCode(syscode);
	}
	//校验代码名称不能重复
	@RequestMapping(value = "/checkName", method = RequestMethod.POST)
	public int checkName(HttpServletRequest req) {
		SysCode sysCode = JsonUtil.jsonToObject(req, SysCode.class);
		return syscodeService.checkName(sysCode);
	}
	//校验代码值不能重复
	@RequestMapping(value = "/checkValue", method = RequestMethod.POST)
	public int checkValue(HttpServletRequest req) {
		SysCode sysCode = JsonUtil.jsonToObject(req, SysCode.class);
		return syscodeService.checkValue(sysCode);
	}
	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public int delete(HttpServletRequest req) {
		SysCode sysCode = JsonUtil.jsonToObject(req, SysCode.class);
		return syscodeService.deleteSysCode(sysCode);
	}
	//身份
	@RequestMapping(value = "/identity", method = RequestMethod.POST)
	public List<Map<String,Object>> identity() {
		return syscodeService.findType("d20987a74f9347a2a34acf400580af7c");
	}
	//性别
	@RequestMapping(value = "/sex", method = RequestMethod.POST)
	public List<Map<String,Object>> sex() {
		return syscodeService.findType("25");
	}
	//教室配置方案
	@RequestMapping(value = "/classScheam", method = RequestMethod.POST)
	public List<Map<String,Object>> classScheam() {
		return syscodeService.findType("edecea2cdd7542b384db59750a8ad0f0");
	}
	//跟踪机编号
	@RequestMapping(value = "/deviceCode", method = RequestMethod.POST)
	public List<Map<String,Object>> deviceCode() {
		return syscodeService.findType("8aa04032117045f7b2eae6b80b459947");
	}
	//跟踪机编号
	@RequestMapping(value = "/code", method = RequestMethod.POST)
	public List<Map<String,Object>> code(HttpServletRequest req) {
		Map<String,String> map = JsonUtil.jsonToObject(req, Map.class);
		if(map==null|| map.get("value")==null)
			return null;
		return syscodeService.getCode(map.get("value"));
	}
}
