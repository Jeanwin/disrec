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

import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.SysMsgStatusMapper;
import com.zonekey.disrec.entity.SysMsgStatus;

/**
 * @Title: @{#} SysMsgStatusService.java
 * @Description: <p>SysMsgStatus实体业务类</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class SysMsgStatusService extends BaseService {

	@Autowired
	private SysMsgStatusMapper sysmsgstatusMapper;
	
	public SysMsgStatus getSysMsgStatus(String id) {
		return sysmsgstatusMapper.findOne(id);
	}
	
	public Page<SysMsgStatus> findPageBy(int pageNo, int pageSize) {
		long total = sysmsgstatusMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize, Sort.Direction.ASC, "id");
		List<SysMsgStatus> list = sysmsgstatusMapper.findByPage((pageNo - 1) * pageSize, pageSize);
		Page<SysMsgStatus> page = new PageImpl<SysMsgStatus>(list, pageRequest, total);
		
		return page;
	}

	@Transactional(readOnly = false)
	public void saveSysMsgStatus(SysMsgStatus sysmsgstatus) {
		sysmsgstatus.setId(IdUtils.uuid2());
		sysmsgstatus.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		sysmsgstatus.setDeleteflag(AppConstants.IS_STATUS_DEFAULT);
		sysmsgstatusMapper.insert(sysmsgstatus);
	}
	
	@Transactional(readOnly = false)
	public void updateSysMsgStatus(SysMsgStatus sysmsgstatus) {
		sysmsgstatus.setModifydate(new Date());
		sysmsgstatus.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		sysmsgstatusMapper.update(sysmsgstatus);
	}

	@Transactional(readOnly = false)
	public void deleteSysMsgStatus(String id) {
		SysMsgStatus sysmsgstatus = sysmsgstatusMapper.findOne(id);
		sysmsgstatus.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		sysmsgstatusMapper.delete(id);
	}
}
