/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.DeviceControlMapper;
import com.zonekey.disrec.entity.DeviceControl;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;

/**
 * @Title: @{#} DeviceControlService.java
 * DeviceControl实体业务类
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class DeviceControlService extends BaseService {

	@Autowired
	private DeviceControlMapper devicecontrolMapper;

	public DeviceControl getDeviceControl(String id) {
		return devicecontrolMapper.findOne(id);
	}

	public Page<DeviceControl> findPageBy(int pageNo, int pageSize) {
		long total = devicecontrolMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize,
				Sort.Direction.ASC, "id");
		List<DeviceControl> list = devicecontrolMapper.findByPage((pageNo - 1)
				* pageSize, pageSize);
		Page<DeviceControl> page = new PageImpl<DeviceControl>(list,
				pageRequest, total);

		return page;
	}

	@Transactional(readOnly = false)
	public int saveDeviceControl(DeviceControl devicecontrol) {
		devicecontrol.setId(IdUtils.uuid2());
		devicecontrol.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		devicecontrol.setDeleteflag(AppConstants.IS_STATUS_DEFAULT);
		return devicecontrolMapper.insert(devicecontrol);
	}

	@Transactional(readOnly = false)
	public int updateDeviceControl(DeviceControl devicecontrol) {
		devicecontrol.setModifydate(new Date());
		devicecontrol.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		return devicecontrolMapper.update(devicecontrol);
	}

	@Transactional(readOnly = false)
	public void deleteDeviceControl(String id) {
		DeviceControl devicecontrol = devicecontrolMapper.findOne(id);
		devicecontrol.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		devicecontrolMapper.delete(id);
	}
}
