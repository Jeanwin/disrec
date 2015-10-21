/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.StudyRecordView;

/**
 */
@MyBatisRepository
public interface StudyRecordViewMapper extends BaseMapper<StudyRecordView, String> {


	public long findCount(PageBean pageBean);
	public List<StudyRecordView> findPageByPageBean(PageBean pageBean);
	
	public Map<String, String> getSubectByCurriculum(StudyRecordView view);
	
	public Map<String, String> getSubectByResource(StudyRecordView view);
	
	public Map<String, String> getSubectByWorks(StudyRecordView view);
	
	public List<Map<String, Object>> findReviewCount(PageBean pageBean);
	
//	public List<Map<String, Object>> findReviewList(PageBean pageBean);
	public List<Map<String, Object>> findLectureCount(PageBean pageBean);
	public List<Map<String, Object>> findLectureCountByTime(PageBean pageBean);
	public List<Map<String, Object>> findReviewCountByTime(PageBean pageBean);
	public List<Map<String, Object>> findLectureCountByWeekTime(
			PageBean pageBean);
	public List<Map<String, Object>> findReviewCountByWeekTime(PageBean pageBean);

}
