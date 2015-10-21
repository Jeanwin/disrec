/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Validator;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exception.RestException;
import com.zonekey.disrec.entity.Device;
import com.zonekey.disrec.service.AreaService;
import com.zonekey.disrec.service.DeviceService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeviceView;
import com.zonekey.disrec.vo.PageBean;

/**
 * @Title: @{#} DeviceRestController.java
 * @Description: <p>Device的Restful API的Controller.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@RestController
@RequestMapping(value = "/deviceView")
public class DeviceRestController {
	private static final Logger LOG = LoggerFactory.getLogger(DeviceRestController.class);
	
	@Autowired
	private DeviceService deviceService;

	@Autowired
	private Validator validator;
	@Autowired
	private AreaService areaService;
	

	@RequestMapping(value = "/{id}", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Device get(@PathVariable("id") String id) {
		Device device = deviceService.getDevice(id);
		if (device == null) {
			String message = "数据不存在(id:" + id + ")";
			LOG.warn(message);
			throw new RestException(HttpStatus.NOT_FOUND, message);
		}
		return device;
	}
	@RequestMapping(value = "devicesByAreaId", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String,Object>> devicesByArea(HttpServletRequest req) {
		Map<String,Object> map = JsonUtil.jsonToObject(req, Map.class);
		
		List<Map<String,Object>> data = deviceService.findByAreaId(map);
		
		return data;
	}
	@RequestMapping(value = "devices", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		
		Page<DeviceView> dataPage = deviceService.findPageBy(pageBean,req);
		
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}

	@RequestMapping(value="save",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int create(HttpServletRequest req, UriComponentsBuilder uriBuilder) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		//BeanValidators.validateWithException(validator, device);
		DeviceView deviceView = JsonUtil.jsonToObject(req, DeviceView.class);
		// 保存新x增
		return deviceService.saveDevice(deviceView);

		/*// 按照Restful风格约定，创建指向新任务的url, 也可以直接返回id或对象.
		String id = device.getId();
		URI uri = uriBuilder.path("/device/" + id).build().toUri();
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(uri);

		return new ResponseEntity(headers, HttpStatus.CREATED);*/
	}

	@RequestMapping(value = "update", method = RequestMethod.POST, produces = MediaTypes.JSON)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	//@ResponseStatus(HttpStatus.NO_CONTENT)
	public int update(HttpServletRequest req) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		//BeanValidators.validateWithException(validator, device);
		DeviceView deviceView = JsonUtil.jsonToObject(req, DeviceView.class);
		// 保存更新
		return deviceService.updateDevice(deviceView);
	}
	
	@RequestMapping(value = "checkMac", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int checkMac(HttpServletRequest req) {
		DeviceView deviceView = JsonUtil.jsonToObject(req, DeviceView.class);
		// 保存更新
		return deviceService.checkMac(deviceView);
	}
	/**
	 * 根据innerid或id查询mac
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "getMacById", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public String getMac(HttpServletRequest req) {
		Map<String,Object> map = JsonUtil.jsonToObject(req, Map.class);
		
		 String temp = null;
		 if(map != null){
			  temp = String.valueOf(map.get("temp") == null?"":map.get("temp"));
		 }
		if(StringUtils.isNotBlank(temp)){
			String deptid = String.valueOf(map.get("areaid"));
//			不为空，表示机构树，传deptid
			List<AreaView> areas = areaService.findAreaIdByDeptId(deptid);
			if(areas.size() > 0){
				map.put("areaid", areas.get(0).getId());
			}else{
//				不确定的treeid
				map.put("areaid", "");
			}
		}
		
		
		// 保存更新
		return deviceService.getMacById(map);
	}
	@RequestMapping(value = "checkType", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int checkType(HttpServletRequest req) {
		DeviceView deviceView = JsonUtil.jsonToObject(req, DeviceView.class);
		if(deviceView != null&&!"1".equals(deviceView.getTypeid())){//不做校验
			return 0;
		}
		// 保存更新
		return deviceService.checkType(deviceView);
	}
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	//@ResponseStatus(HttpStatus.NO_CONTENT)
	public int delete(HttpServletRequest req) {
		Map<String,Object> map = JsonUtil.jsonToObject(req,Map.class);
		return deviceService.deleteDevice(map);
	}
	
	/**
	 * 开始截图
	 * 
	 */
	@RequestMapping(value = "polling" ,method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody String startPoling(HttpServletRequest req){
		int page =  0;
		try{
			page = Integer.parseInt(req.getParameter("page")); 
		}catch(Exception e){
		}
		try{
			return deviceService.polling(req,page);
		}catch(Exception e){
			e.printStackTrace();
		}
		return "error";
	} 
}
