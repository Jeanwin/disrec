package com.zonekey.disrec.dao;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.SysUserRole;

/**
 * 用戶--角色
 * @author Administrator
 *
 */
@MyBatisRepository
public interface SysUserRoleMapper extends BaseMapper<SysUserRole, String>{   
    public SysUserRole findByUserAndRole(@Param("loginname")String loginname);
}
