package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.DutySet;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.vo.PageBean;

@MyBatisRepository
public interface DutySetMapper extends BaseMapper<DutySet, String>{

	public int insert(DutySet dutySet);

	public int saveDutyArea(DutySet dutySet);

	public void deleteDuty(@Param("list")List<Map<String, Object>> list);

	public void deleteDutyArea(@Param("list")List<Map<String, Object>> list);

	public void updateDuty(DutySet dutySet);

	/**
	 * 
	 * 修改时真删除中间表
	 */
	public void delDutyArea(DutySet dutySet);

	public long count();

	public List<DutySet> findDutyByPage(PageBean pageBean);

	/**
	 * 获取教室管理员列表
	 */
	public List<SysUser> getClassAdminsList();

	public List<DutySet> checkClassroom(String areaId);

	public DutySet findDuty(String areaId);

	
}
