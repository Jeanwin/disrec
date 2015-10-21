/*****************************
* Copyright (c) 2012 by Artron Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.web;

import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.exception.RestException;
import com.zonekey.disrec.entity.RangeScope;

 /**
 * DeviceIOController 负责页面设备通信接口，

 * 真正登录的POST请求由Filter完成,
 * 
 * @author <a href="mailto:chenhao@author chenhao">陈浩</a>
 * @version v 1.0
 */
@Controller
public class DeviceIOController {
/*
private static final Logger LOG = LoggerFactory.getLogger(DeviceIOController.class);
	
	//教室直播状态
	@RequestMapping(value = "/{areaid}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public String getLiveStatus(@PathVariable("areaid") String areaid) {
		//启动、暂停、停止
		String value="停止";
		return value;
	}
	//教室录像状态
	@RequestMapping(value = "/{areaid}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public String getARecordStatus(@PathVariable("areaid") String areaid) {
		//启动、暂停、停止
		String value="停止";
		return value;
	}
	//教室跟踪机状态
	@RequestMapping(value = "/{areaid}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public String getTrackingMachineStatus(@PathVariable("areaid") String areaid) {
		//启动、停止
		String value="停止";
		return value;
	}
	//教室设备状态、教室状态
	@RequestMapping(value = "/{areaid}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public String getPrimaryDeviceStatus(@PathVariable("areaid") String areaid) {
		//启动、停止
		String value="停止";
		return value;
		
	}
		
	//教室磁盘空间
	@RequestMapping(value = "/{areaid}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public String getDeviceSpace(@PathVariable("areaid") String areaid) {
		//
		String value="";
		return value;
		
	}
		
	//教室ftp目录
	@RequestMapping(value = "/{areaid}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public String getFtpUrl(@PathVariable("areaid") String areaid) {
		//
		String value="";
		return value;
		
	}
	*/
	//教室

}
