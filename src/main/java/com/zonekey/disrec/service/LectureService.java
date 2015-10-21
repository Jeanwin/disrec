/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;



import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.LectureMapper;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.entity.LectureChildren;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.LectureView;
import com.zonekey.disrec.vo.PageBean;

/**
 * xufeixiang 15.04.20
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class LectureService extends BaseService {

	@Autowired
	private LectureMapper lectureMapper;
	@Autowired
	private LectureChildrenService lectureChildrenService;

	
	public LectureMapper getLectureMapper() {
		return lectureMapper;
	}

	public void setLectureMapper(LectureMapper lectureMapper) {
		this.lectureMapper = lectureMapper;
	}
	
	public LectureView findOne(String id) {
		LectureView lectureView = lectureMapper.findOne(id);
		return lectureView;
	}
	
	
//	public Page<LectureView> findPageBy(int offset,int limit) {
//		long total = lectureMapper.count();
//		List<LectureView> list = lectureMapper.findByPage(offset,limit);
//		Page<LectureView> page = new PageImpl<LectureView>(list,null,total);
//		return page;
//		
//	}
	
	@Transactional(readOnly = false,propagation=Propagation.REQUIRES_NEW)
	public int saveLecture(LectureView lectureView) {
		if(lectureView == null){
			return 0;
		}
		lectureView.setId(IdUtils.uuid2());
		lectureView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		lectureView.setCreatetime(new Date());
		lectureView.setDeleteflag("0");
		if(lectureView.getChildList().size() > 0){
		for(LectureChildren lectureChildren:lectureView.getChildList()){
			lectureChildren.setId(IdUtils.uuid2());
			lectureChildren.setParentid(lectureView.getId());
			lectureChildren.setDeleteflag("0");
			lectureChildrenService.saveLectureChildren(lectureChildren);
		}
		}
		return lectureMapper.insertSelective(lectureView);
	}
	@Transactional(readOnly = false)
	public int updateLecture(LectureView lectureView) {
		if(lectureView == null){
			return 0;
		}
		lectureView.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		lectureView.setModifytime(new Date());
		lectureView.setDeleteflag("0");
		
		lectureChildrenService.deleteLectureChildren(lectureView.getId());
		
		if(lectureView.getChildList().size() > 0){
			for(LectureChildren lectureChildren:lectureView.getChildList()){
				LectureChildren lectureChilds = CopyToObject(lectureChildren);
				int flag = 0;
//				if(lectureChilds.getId() == null){
					lectureChilds.setParentid(lectureView.getId());
					lectureChilds.setDeleteflag("0");
					lectureChilds.setId(IdUtils.uuid2());
					flag = lectureChildrenService.saveLectureChildren(lectureChilds);
//				}else{
//					flag = lectureChildrenService.updateLectureChildren(lectureChilds);
//				}
				System.out.println("=== >"+flag);
			}
		}
		
		return lectureMapper.updateSelective(lectureView);
	}
	/*
	 * 
	 */
	private LectureChildren CopyToObject(LectureChildren lectureChildren) {
		LectureChildren lectureChilds = new LectureChildren();
		lectureChilds.setId(lectureChildren.getId());
		lectureChilds.setChildKey(lectureChildren.getChildKey());
		lectureChilds.setChildValue(lectureChildren.getChildValue());
		lectureChilds.setParentid(lectureChildren.getParentid());
		lectureChilds.setSort(lectureChildren.getSort());
		lectureChilds.setDeleteflag(lectureChildren.getDeleteflag());
		return lectureChilds;
	}

	@Transactional(readOnly = false)
	public int deleteLecture(String id) {
		if(StringUtils.isBlank(id)){
			return 0;
		}
		lectureChildrenService.deleteLectureChildren(id);
		
		lectureMapper.delete(id);
		return 1;
	}

	public Map<String, Object> findPageBy(PageBean pageBean) {
		long total = lectureMapper.findCount(pageBean);
		List<LectureView> list = lectureMapper.findPageByPageBean(pageBean);
		if(list.size() > 0){
			for(LectureView view : list){
				List<LectureChildren> childList = lectureChildrenService.findAll(view.getId());
				view.setChildList(childList);
			}
			
		}
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("total", total);
		map.put("data", list);
		
		return map;
	}
	@Transactional(readOnly = false)
	public int updateSelective(LectureView lectureView) {
		String old_id = lectureMapper.countStatus("1");
		int flag = 0;
		if(StringUtils.isNotBlank(old_id)){
			LectureView old_lectureView = new LectureView();
			old_lectureView.setId(old_id);
			old_lectureView.setStatus("0");
			lectureMapper.updateSelective(old_lectureView);
			flag = lectureMapper.updateSelective(lectureView);
		}else{
			flag = lectureMapper.updateSelective(lectureView);
		}
		return flag;
	}
}
