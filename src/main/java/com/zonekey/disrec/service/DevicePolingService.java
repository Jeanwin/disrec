/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.HttpSend;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.DeviceMapper;
import com.zonekey.disrec.dao.DevicePolingMapper;
import com.zonekey.disrec.dao.SysCodeMapper;
import com.zonekey.disrec.entity.DevicePoling;
import com.zonekey.disrec.entity.PublicInfo;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;

/**
 * @Title: DevicePolingService.java
 * @Description: 课程巡视
 * @author <a href="mailto:niuxl@zonekey.com.cn">牛喜林</a>
 * @date 2014年12月8日 上午11:24:07
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class DevicePolingService extends BaseService {
	@Autowired
	private DevicePolingMapper devicePolingMapper;
	@Resource
	private DeviceMapper deviceMapper;
	@Resource
	private SysCodeMapper syscodeMapper;
	/**
	 * @Title:insertDevicePoling
	 * @Description: 设置课程巡视
	 * @return
	 */
	@Transactional(readOnly = false)
	public int insertDevicePoling(DevicePoling devicePoling) {
		int result = 0;
		try {
			devicePoling.setId(IdUtils.uuid2());
			devicePoling.setUserid(ShiroDbRealm.getCurrentLoginName());
			devicePoling.setCreateuser(ShiroDbRealm.getCurrentLoginName());
			//查询这个人是否有设置过，有更新，无新增
			DevicePoling dp=devicePolingMapper.findDevicePoling(ShiroDbRealm.getCurrentLoginName());
			if(dp== null){
				result = devicePolingMapper.insertDevicePoling(devicePoling);
			}else{
				devicePoling.setModifyuser(ShiroDbRealm.getCurrentLoginName());
				result = devicePolingMapper.updateDevicePoling(devicePoling);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	/**
	 * @Title:insertDevicePoling
	 * @Description: 设置课程巡视
	 * @return
	 */
	public DevicePoling findDevicePoling() {
		String loginname = ShiroDbRealm.getCurrentLoginName();
		DevicePoling devicePoling = devicePolingMapper
				.findDevicePoling(loginname);
		List<PublicInfo> areainfoList = new ArrayList<PublicInfo>();
		List<PublicInfo> deviceinfoList = new ArrayList<PublicInfo>();

		if (devicePoling != null) {
			for (String id : devicePoling.getAreainfo().split(",")) {
				PublicInfo publicInfo = new PublicInfo();
				publicInfo.setId(id);
				areainfoList.add(publicInfo);
			}

			for (String id : devicePoling.getDeviceinfo().split(",")) {
				PublicInfo publicInfo = new PublicInfo();
				publicInfo.setId(id);
				deviceinfoList.add(publicInfo);

			}
			devicePoling.setAreainfoList(areainfoList);
			devicePoling.setDeviceinfoList(deviceinfoList);
		}else{
			return new DevicePoling();
		}
		
		return devicePoling;
	}
	
	/**
	 * @Title:insertDevicePoling
	 * @Description: 根据教室查询课程巡视分屏
	 * @return
	 */
	public DevicePoling findDevicePolingSetByAreaid(String areainnerid) {
		String loginname = ShiroDbRealm.getCurrentLoginName();
		DevicePoling devicePoling = devicePolingMapper
				.findDevicePolingSetByAreaid(loginname);
		
		return devicePoling;
	}
	public String getPollingType(){
		DevicePoling devicePoling = devicePolingMapper.findDevicePolingSetByAreaid(ShiroDbRealm.getCurrentLoginName());
		return devicePoling.getRoundType();
	} 
}