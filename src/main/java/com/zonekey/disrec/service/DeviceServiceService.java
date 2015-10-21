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
import com.zonekey.disrec.dao.DeviceServiceMapper;
import com.zonekey.disrec.entity.DeviceService;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;

/**
 * @Title: @{#} DeviceServiceService.java
 * @Description: <p>
 *               DeviceService实体业务类
 *               </p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class DeviceServiceService extends BaseService {

	@Autowired
	private DeviceServiceMapper deviceserviceMapper;

	public DeviceService getDeviceService(String id) {
		return deviceserviceMapper.findOne(id);
	}

	public Page<DeviceService> findPageBy(int pageNo, int pageSize) {
		long total = deviceserviceMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize,
				Sort.Direction.ASC, "id");
		List<DeviceService> list = deviceserviceMapper.findByPage((pageNo - 1)
				* pageSize, pageSize);
		Page<DeviceService> page = new PageImpl<DeviceService>(list,
				pageRequest, total);

		return page;
	}

	@Transactional(readOnly = false)
	public void saveDeviceService(DeviceService deviceservice) {
		deviceservice.setId(IdUtils.uuid2());
		deviceservice.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		deviceservice.setDeleteflag(AppConstants.IS_STATUS_DEFAULT);
		deviceserviceMapper.insert(deviceservice);
	}

	@Transactional(readOnly = false)
	public void updateDeviceService(DeviceService deviceservice) {
		deviceservice.setModifydate(new Date());
		deviceservice.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		deviceserviceMapper.update(deviceservice);
	}

	@Transactional(readOnly = false)
	public void deleteDeviceService(String id) {
		DeviceService deviceservice = deviceserviceMapper.findOne(id);
		deviceservice.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		deviceserviceMapper.delete(id);
	}
}
