package com.zonekey.disrec.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.SysUserRoleMapper;
import com.zonekey.disrec.entity.SysUserRole;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;

/**
 * 
 * @author Administrator
 * 
 */
@Component
@Transactional(readOnly = false)
public class SysUserRoleService extends BaseService {
    @Autowired
    private SysUserRoleMapper sysUserRoleMapper;
    @Transactional(readOnly = false)
    public int saveUserRole(SysUserRole sysUserRole) {
	sysUserRole.setId(IdUtils.uuid2());
	sysUserRole.setCreateuser(ShiroDbRealm.getCurrentLoginName());
	return sysUserRoleMapper.insert(sysUserRole);
    }
    /**
     * 修改用户默认角色
     */
    @Transactional(readOnly = false)
    public int modifyUserRole(String loginname,String userType){
	SysUserRole sysUserRole = sysUserRoleMapper.findByUserAndRole(loginname);
	if(sysUserRole != null && userType != null && !"".equals(userType)){
		sysUserRole.setModifyuser(ShiroDbRealm.getCurrentLoginName());
	    if("2".equals(userType)){
		sysUserRole.setDeleteflag("2");
	    sysUserRoleMapper.delete(sysUserRole);
	    }
	    //默认为老师
	    else{
		sysUserRole.setRoleid("1");
	    }
	    return sysUserRoleMapper.update(sysUserRole);
	}
	else return 0;
    }
}
