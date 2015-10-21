/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Dept;
import com.zonekey.disrec.vo.DeptView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.Tree;

/**
 * @Title: @{#} DeptViewMapper.java
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@MyBatisRepository
public interface DeptMapper extends BaseMapper<DeptView, String> {
	public List<DeptView> findByPage(PageBean pageBean);
	public List<Map<String,Object>> findByName(Map<String,Object> map);
	public List<Tree> getDeptRootTrees();
	public List<Tree> getDeptRootTree();
	public long count(PageBean pageBean);
	public int delete(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser);
	
	public int check(Dept dept);
	/**
	 * 通过机构代码查这个机构
	 * 
	 * @return
	 */
	public DeptView findDeptByCode(@Param("code")String code);
	
	/**
	 * 通过父机构id和名字查机构
	 * 
	 * @return
	 */
	public DeptView findDeptByName(DeptView deptView);
	public int checkname(Dept dept);
	public List<DeptView> finddeptmid(@Param("excelbatch")String excelbatch,@Param("flag")String flag);
	public int insertdeptmid(DeptView deptView);
	public List<DeptView> findAreaIdByDeptId(@Param("deptid")String deptid);
	public int updateTreeBoot(@Param("desktopName")String desktopName);
	
	public List<DeptView> findDeptSomeMessage(Dept dept);
	public List<Map<String, Object>> findAll(String id);
}
