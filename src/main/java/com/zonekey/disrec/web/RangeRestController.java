/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exception.RestException;
import com.zonekey.disrec.entity.Range;
import com.zonekey.disrec.service.RangeService;
import com.zonekey.disrec.service.SysUserService;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.RangeView;
import com.zonekey.disrec.vo.SysUserView;

/**
 * @Title: @{#} RangeRestController.java
 * @Description: <p>Range的Restful API的Controller.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@RestController
@RequestMapping(value = "/rangeView")
public class RangeRestController {
	private static final Logger LOG = LoggerFactory.getLogger(RangeRestController.class);
	
	@Autowired
	private RangeService rangeService;
	@Resource
	private SysUserService sysUserService;
	@Autowired
	private Validator validator;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public Range get(@PathVariable("id") String id) {
		Range range = rangeService.getRange(id);
		if (range == null) {
			String message = "数据不存在(id:" + id + ")";
			LOG.warn(message);
			throw new RestException(HttpStatus.NOT_FOUND, message);
		}
		return range;
	}
	/**
	 * 用户管理
	 */
	@RequestMapping(value = "ranges", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean bean = JsonUtil.jsonToPage(req);
		Page<SysUserView> dataPage = sysUserService.findRangeByPage(bean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}
	/**
	 * 范围列表,包含教室范围和组织范围
	 */
	@RequestMapping(value = "scope", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String, Object>> scope() {
		return rangeService.getScope();
	}
	/**
	 * 根据name查询用户
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "rangeuser", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<SysUserView> rangeuser(HttpServletRequest req) {
		SysUserView sysUserView = JsonUtil.jsonToObject(req,SysUserView.class);
		List<SysUserView> sysuser = sysUserService.getRangeUser(sysUserView);
		return sysuser;
	}
	/**
	 * 授权管理:此方法为用户添加修改角色范围权限
	 * @param req
	 * @param uriBuilder
	 */
	@RequestMapping(value="save",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public void create(HttpServletRequest req, UriComponentsBuilder uriBuilder) {
		Map<String,Object> map = JsonUtil.jsonToObject(req,Map.class);
		// 保存新增
		rangeService.save(map);
	}
	/**
	 * 新增范围
	 * @param req
	 * @param uriBuilder
	 */
	@RequestMapping(value="saveRange",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public void saveRange(HttpServletRequest req, UriComponentsBuilder uriBuilder) {
		Map<String,Object> map = JsonUtil.jsonToObject(req,Map.class);
		rangeService.saveRange(map);
	}
	
	/**
	 * 更新范围下的权限
	 * @param req
	 * @param uriBuilder
	 */
	@RequestMapping(value="updatePower",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public void updatePower(HttpServletRequest req, UriComponentsBuilder uriBuilder) {
		RangeView range = JsonUtil.jsonToObject(req,RangeView.class);
		rangeService.updatePower(range);
	}
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	public int delete(HttpServletRequest req) {
		RangeView rangeView = JsonUtil.jsonToObject(req,RangeView.class);
		return rangeService.delete(rangeView);
	}
	@RequestMapping(value = "deleteRange", method = RequestMethod.POST)
	public int deleteRange(HttpServletRequest req) {
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req,List.class);
		return rangeService.deleteRange(list);
	}
}
