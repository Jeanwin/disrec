/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.Tree;

/**
 * @Title: @{#} AreaMapper.java
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@MyBatisRepository
public interface AreaMapper extends BaseMapper<AreaView, String>  {
	public List<AreaView> findByPage(PageBean pageBean);
	public List<AreaView> findClassRooms(PageBean pageBean);
	public List<Map<String,Object>> findByName(Map<String,Object> map);
	public List<Tree> getAreaTree();
	public List<Tree> getAreaTrees();        
	public long count(PageBean pageBean);
	public int deleteBy(AreaView areaView);    
	public int findCountByName(Map<String,Object> map);
	public int findByInnerid(Map<String,Object> map);
	public Map<String,Object> getCheck(Map<String,Object> map);
	public void clearDeptid(AreaView areaView);
	/**
	 * 根据教室编号查教室
	 * @return
	 */
	public AreaView findAreaByInnerid(@Param("innerid")String innerid);
	/**
	 * 根据教室编号
	 * 
	 * id查教室
	 * @return
	 */
	public AreaView findAreaByid(@Param("id")String id);
	
	public AreaView findAreaByName(Map<String,Object> map);
	
	public List<AreaView> findareamid(@Param("excelbatch")String excelbatch,@Param("flag")String flag);
	public int insertareamid(AreaView areaView);
	
	public int 	insertVersion();
	public List<Map<String,Object>> findVersionByPage(PageBean pageBean);
	public long versionCount(PageBean pageBean);
	/**
	 * 根据教室id查询教室，设备mac,课程，老师
	 * 
	 * @param id
	 * @return
	 */
	public AreaView findDetailById(@Param("id") String id);
	public List<AreaView> findAllClassRooms(AreaView areaView);
	public List<AreaView> findAreaIdByDeptId(@Param("deptid")String deptid);
	public int updateTreeBoot(@Param("desktopName")String desktopName);
	public List<Tree> getAreaTreeAndCount();
	public List<AreaView> findClassRoomsByMobile(PageBean pageBean);
	public long countByMobile(PageBean pageBean);
}
