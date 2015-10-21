/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.LectureChildren;

/**
 */
@MyBatisRepository
public interface LectureChildrenMapper extends BaseMapper<LectureChildren, String> {

	List<LectureChildren> findAll(@Param("parentid")String parentid);

	int insertSelective(LectureChildren lectureChildren);

	int updateSelective(LectureChildren lectureChildren);
	
}
