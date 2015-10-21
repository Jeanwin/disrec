/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.SysRoleMapper;
import com.zonekey.disrec.entity.SysRole;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.vo.SysFunctionView;
import com.zonekey.disrec.vo.SysRoleView;

/**
 * @Title: @{#} SysRoleService.java
 * @Description: <p>SysRole实体业务类</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class SysRoleService {

	private Logger logger = LoggerFactory.getLogger(SysRole.class);
	
	@Autowired
	private SysRoleMapper sysroleMapper;
	
	public SysRole getSysRole(String id) {
		return sysroleMapper.findOne(id);
	}
	
	public Page<SysRole> findPageBy(int pageNo, int pageSize) {
		long total = sysroleMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize, Sort.Direction.ASC, "id");
		List<SysRole> list = sysroleMapper.findByPage((pageNo - 1) * pageSize, pageSize);
		Page<SysRole> page = new PageImpl<SysRole>(list, pageRequest, total);
		
		return page;
	}

	public List<Map<String,Object>> getRoles() {
		return sysroleMapper.getRoles();
	}
	
	@Transactional(readOnly = false)
	public void saveSysRole(SysRole sysrole) {
		sysrole.setId(IdUtils.uuid2());
		sysrole.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		sysrole.setDeleteflag(AppConstants.IS_STATUS_DEFAULT);
		sysroleMapper.insert(sysrole);
	}
	
	@Transactional(readOnly = false)
	public void updatePower(SysRoleView sysrole) {
		sysrole.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		for (SysFunctionView sysFunction : sysrole.getFunctions()) {
			sysFunction.setRole_function_id(IdUtils.uuid2());
		}
		SysRole sys = sysroleMapper.findOne(sysrole.getId());
		if(sys != null&&!sys.getRoleName().equals(sysrole.getRoleName())){
			sys.setRoleName(sysrole.getRoleName());
			sys.setModifyuser(ShiroDbRealm.getCurrentLoginName());
			sysroleMapper.update(sys);
		}
		sysroleMapper.deleteRoleFunction(sysrole);
		sysroleMapper.insertRoleFunction(sysrole);
	}
	
	@Transactional(readOnly = false)
	public void updateSysRole(SysRole sysrole) {
		sysrole.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		sysroleMapper.update(sysrole);
	}

	@Transactional(readOnly = false)
	public int deleteSysRole(SysRoleView sysrole) {
		//判断是否有用户使用该角色
		int count = sysroleMapper.findUserCount(sysrole);
		if(count>0)
			return -1;//有用户使用该角色,代表不能删除该角色
		
		sysrole.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		sysroleMapper.deleteRoleFunction(sysrole);
		sysroleMapper.delete(sysrole);
		return 1;
	}
}
