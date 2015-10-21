 /*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.web;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.entity.DevicePoling;
import com.zonekey.disrec.entity.PublicInfo;
import com.zonekey.disrec.service.DevicePolingService;

/**
* @Title: DevicePolingController.java
* @Description: 课程巡视
* @author <a href="mailto:niuxl@zonekey.com.cn">牛喜林</a> 
* @date 2014年12月8日 上午11:18:53   
* @version v 1.0 
*/ 
@Controller
@RequestMapping(value = "/rest/devicePoling")
public class DevicePolingController {
	private static final Logger LOG = LoggerFactory.getLogger(DevicePolingController.class);
	@Autowired
	private DevicePolingService devicePolingService;
	@Resource
	private ServletContext servletContext;
	/**
	 * 设置
	 * 
	 */
	@RequestMapping(value = "setDevicePoling" ,method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	JsonMsg insertDevicePoling(HttpServletRequest req){
		//将json转化为对象
		DevicePoling devicePoling = JsonUtil.jsonToObject(req, DevicePoling.class);
		String areainfo="";
		String deviceinfo="";
		for(PublicInfo publicInfo:devicePoling.getAreainfoList()){
			areainfo+=publicInfo.getId()+",";
		}
		for(PublicInfo publicInfo:devicePoling.getDeviceinfoList()){
			deviceinfo+=publicInfo.getId()+",";
		}
		JsonMsg msg=new JsonMsg();
		devicePoling.setAreainfo(areainfo.substring(0, areainfo.length()-1));
		devicePoling.setDeviceinfo(deviceinfo.substring(0, deviceinfo.length()-1));
		 int flag= devicePolingService.insertDevicePoling(devicePoling);
		 if(flag>0){
			 req.getSession().removeAttribute(devicePoling.getRoundType());
				msg.setId("1");
				msg.setOperation("设置成功");
				return msg;
		 }else{
			 msg.setId("0");
				msg.setOperation("设置失败");
				return msg;
		 }
	}
	/**
	 * 初始化设置
	 * 
	 */
	@RequestMapping(value = "initDevicePoling" ,method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public  @ResponseBody
	DevicePoling initDevicePoling(HttpServletRequest req){
		return devicePolingService.findDevicePoling();
	}
	/**
	 * 根据教室id查课程巡视分屏
	 * 
	 */
	@RequestMapping(value = "findDevicePolingSetByAreaid" ,method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public  @ResponseBody
	DevicePoling findDevicePolingSetByAreaid(HttpServletRequest req){
		//将json转化为对象
		DevicePoling devicePoling = JsonUtil.jsonToObject(req, DevicePoling.class);
		return devicePolingService.findDevicePolingSetByAreaid(devicePoling.getAreainfo());
	}
}
