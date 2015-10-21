/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.SysFunctionMapper;
import com.zonekey.disrec.entity.SysFunction;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;

/**
 * @Title: @{#} SysFunctionService.java
 * @Description: <p>SysFunction实体业务类</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class SysFunctionService extends BaseService {

	@Autowired
	private SysFunctionMapper sysfunctionMapper;
	
	public SysFunction getSysFunction(String id) {
		return sysfunctionMapper.findOne(id);
	}
	
	public Page<SysFunction> findPageBy(int pageNo, int pageSize) {
		long total = sysfunctionMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize, Sort.Direction.ASC, "id");
		List<SysFunction> list = sysfunctionMapper.findByPage((pageNo - 1) * pageSize, pageSize);
		Page<SysFunction> page = new PageImpl<SysFunction>(list, pageRequest, total);
		
		return page;
	}
	
	public List<Map<String,Object>> getFunctions() {
		return sysfunctionMapper.getFunctions();
	}
	
	@Transactional(readOnly = false)
	public void saveSysFunction(SysFunction sysfunction) {
		sysfunction.setId(IdUtils.uuid2());
		sysfunction.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		sysfunction.setDeleteflag(AppConstants.IS_STATUS_DEFAULT);
		sysfunctionMapper.insert(sysfunction);
	}
	
	@Transactional(readOnly = false)
	public void updateSysFunction(SysFunction sysfunction) {
		sysfunction.setModifydate(new Date());
		sysfunction.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		sysfunctionMapper.update(sysfunction);
	}

	@Transactional(readOnly = false)
	public void deleteSysFunction(String id) {
		SysFunction sysfunction = sysfunctionMapper.findOne(id);
		sysfunction.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		sysfunctionMapper.delete(id);
	}
}
