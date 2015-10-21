package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.TimeTask;
import com.zonekey.disrec.vo.PageBean;
@MyBatisRepository
public interface TimeTaskMapper extends BaseMapper<TimeTask, String>{

	public int saveTimeTask(TimeTask timeTask);

	public int saveTimeTaskArea(TimeTask timeTask);

	public int updateTimeTask(TimeTask timeTask);

	public int deleteTimeTaskArea(TimeTask timeTask);

	public int deleteTimeTask(@Param("list")List<Map<String, Object>> list);

	public int deleteTimeArea(@Param("list")List<Map<String, Object>> list);

	public long count(PageBean pageBean);

	public List<TimeTask> findByPage(PageBean pageBean);

}
