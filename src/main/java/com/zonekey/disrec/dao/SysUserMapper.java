/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.SysUserView;
import com.zonekey.disrec.vo.UserRoleView;

/**
 * @Title: @{#} SysUserMapper.java
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@MyBatisRepository
public interface SysUserMapper extends BaseMapper<SysUserView, String> {
	public List<SysUserView> findByPage(PageBean pageBean);
	public List<SysUserView> findRangeByPage(PageBean pageBean);
	public List<SysUserView> findRangeUser(SysUserView sysUserView);
	public SysUserView findByLoginname(@Param("loginname")String loginname,@Param("password")String password);
	public SysUserView finduserByLoginname(@Param("loginname")String loginname);
	public List<String> findUserRole(String loginname);
	public long count(PageBean pageBean);
	public long rangeCount(PageBean pageBean);
	public int delete(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser);
	public int check(SysUser sysUser);
	public int update(SysUser sysUser);
	public Map<String,Object> getValidate(String loginname);
	public int addEmailCode(@Param("loginname")String loginname,@Param("validateCode")String validateCode);
	public int modifyPwd(SysUser user);
	//更新登陆时间和登陆ip
	public int updateLoginDateAndIp(@Param("loginname")String loginName,@Param("loginip")String loginip);
	public List<SysUserView> findsysusermid(@Param("excelbatch")String excelbatch,@Param("flag")String flag);
	public int insertsysusermid(SysUserView sysUserView);
}
