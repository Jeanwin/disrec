/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.SysRole;
import com.zonekey.disrec.vo.SysRoleView;

/**
 * @Title: @{#} SysRoleMapper.java
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@MyBatisRepository
public interface SysRoleMapper extends BaseMapper<SysRole, String> {
	public List<Map<String,Object>> getRoles();
	public void deleteRoleFunction(SysRoleView sysRole);
	public void insertRoleFunction(SysRoleView sysRole);
	public int findUserCount(SysRoleView sysRole);
}
