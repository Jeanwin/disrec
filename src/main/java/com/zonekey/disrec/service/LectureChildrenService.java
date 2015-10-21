/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.dao.LectureChildrenMapper;
import com.zonekey.disrec.entity.LectureChildren;
import com.zonekey.disrec.service.base.BaseService;

/**
 * xufeixiang 15.04.20
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class LectureChildrenService extends BaseService {

	@Autowired
	private LectureChildrenMapper lectureChildrenMapper;
	
	
	public LectureChildrenMapper getLectureChildrenMapper() {
		return lectureChildrenMapper;
	}
	public void setLectureChildrenMapper(LectureChildrenMapper lectureChildrenMapper) {
		this.lectureChildrenMapper = lectureChildrenMapper;
	}
	@Transactional(readOnly = false)
	public int saveLectureChildren(LectureChildren lectureChildren) {
		return lectureChildrenMapper.insert(lectureChildren);
	}
	@Transactional(readOnly = false)
	public void deleteLectureChildren(String id) {
		lectureChildrenMapper.delete(id);
	}
	public List<LectureChildren>  findAll(String id) {
		List<LectureChildren> view= (List<LectureChildren>) lectureChildrenMapper.findAll(id);
		return view;
	}
	public LectureChildren  findOne(String id) {
		LectureChildren view = lectureChildrenMapper.findOne(id);
		return view;
	}
	public int updateLectureChildren(LectureChildren lectureChildren) {
		return lectureChildrenMapper.updateSelective(lectureChildren);
		
		
	}

}
