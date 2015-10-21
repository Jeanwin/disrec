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
import com.zonekey.disrec.dao.SysMessageMapper;
import com.zonekey.disrec.entity.SysMessage;

/**
 * @Title: @{#} SysMessageService.java
 * @Description: <p>SysMessage实体业务类</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class SysMessageService extends BaseService {

	@Autowired
	private SysMessageMapper sysmessageMapper;
	
	public SysMessage getSysMessage(String id) {
		return sysmessageMapper.findOne(id);
	}
	
	public Page<SysMessage> findPageBy(int pageNo, int pageSize) {
		long total = sysmessageMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize, Sort.Direction.ASC, "id");
		List<SysMessage> list = sysmessageMapper.findByPage((pageNo - 1) * pageSize, pageSize);
		Page<SysMessage> page = new PageImpl<SysMessage>(list, pageRequest, total);
		
		return page;
	}

	@Transactional(readOnly = false)
	public void saveSysMessage(SysMessage sysmessage) {
		sysmessage.setId(IdUtils.uuid2());
		sysmessage.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		sysmessage.setDeleteflag(AppConstants.IS_STATUS_DEFAULT);
		sysmessageMapper.insert(sysmessage);
	}
	
	@Transactional(readOnly = false)
	public void updateSysMessage(SysMessage sysmessage) {
		sysmessage.setModifydate(new Date());
		sysmessage.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		sysmessageMapper.update(sysmessage);
	}

	@Transactional(readOnly = false)
	public void deleteSysMessage(String id) {
		SysMessage sysmessage = sysmessageMapper.findOne(id);
		sysmessage.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		sysmessageMapper.delete(id);
	}
}
