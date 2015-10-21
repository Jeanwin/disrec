/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;



import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.ReviewViewMapper;
import com.zonekey.disrec.entity.LectureChildren;
import com.zonekey.disrec.entity.ReviewChildren;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.LectureView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.ReviewView;
import com.zonekey.disrec.web.ActiveController;

/**
 * xufeixiang 15.04.20
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class ReviewService extends BaseService {
	private static final Logger LOG = LoggerFactory.getLogger(ReviewService.class);
	@Autowired
	private ReviewViewMapper reviewViewMapper;
	@Autowired
	private ReviewChildrenService reviewChildrenService;

	public ReviewViewMapper getReviewViewMapper() {
		return reviewViewMapper;
	}
	public void setReviewViewMapper(ReviewViewMapper reviewViewMapper) {
		this.reviewViewMapper = reviewViewMapper;
	}


	public ReviewView findOne(String id) {
		ReviewView ReviewView = reviewViewMapper.findOne(id);
		return ReviewView;
	}
	public Page<ReviewView> findPageBy(int offset,int limit) {
		long total = reviewViewMapper.count();
		List<ReviewView> list = reviewViewMapper.findByPage(offset,limit);
		Page<ReviewView> page = new PageImpl<ReviewView>(list,null,total);
		return page;
	}
	
	@Transactional(readOnly = false,propagation=Propagation.REQUIRES_NEW)
	public int saveReview(ReviewView reviewView) {
		if(reviewView == null){
			return 0;
		}
		reviewView.setId(IdUtils.uuid2());
		reviewView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		reviewView.setCreatetime(new Date());
		reviewView.setDeleteflag("0");
		if(reviewView.getChildList().size() > 0){
			for(ReviewChildren reviewChildren:reviewView.getChildList()){
				reviewChildren.setId(IdUtils.uuid2());
				reviewChildren.setParentid("0");
				reviewChildren.setReviewid(reviewView.getId());
				reviewChildren.setDeleteflag("0");
				 int flag = reviewChildrenService.saveReviewChildren(reviewChildren);
				 LOG.info("====>" + flag);
			}
		}
		return reviewViewMapper.insert(reviewView);
	}
	@Transactional(readOnly = false)
	public int updateReview(ReviewView reviewView) {
		if(reviewView == null){
			return 0;
		}
//		先删除
//		reviewViewMapper.delete(reviewView.getId());
		reviewChildrenService.deleteReviewChildren(reviewView.getId());
		
//		reviewView.setId(IdUtils.uuid2());
		reviewView.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		reviewView.setModifytime(new Date());
		reviewView.setDeleteflag("0");
		if(reviewView.getChildList().size() > 0){
		for(ReviewChildren reviewChildren:reviewView.getChildList()){
			reviewChildren.setId(IdUtils.uuid2());
			reviewChildren.setParentid("0");
			reviewChildren.setReviewid(reviewView.getId());
			reviewChildren.setDeleteflag("0");
			int flag = reviewChildrenService.saveReviewChildren(reviewChildren);
		}
		}
		return reviewViewMapper.updateSelective(reviewView);
	}
	@Transactional(readOnly = false)
	public int deleteReview(String id) {
		if(StringUtils.isBlank(id)){
			return 0;
		}
		reviewChildrenService.deleteReviewChildren(id);
		reviewViewMapper.delete(id);
		return 1;
	}

	public Map<String, Object> findPageByPageBean(PageBean pageBean) {
		long total = reviewViewMapper.findCount(pageBean);
		List<ReviewView> list = reviewViewMapper.findPageByPageBean(pageBean);
		if(list.size() > 0){
		for(ReviewView view : list){
		
			if(view.getAssess() == AppConstants.ASSESS_YES){
				view.setAssessdesc("需要");
			}else if(view.getAssess() == AppConstants.ASSESS_NO){
				view.setAssessdesc("不需要");
			}
			if(view.getMarkType().equals(AppConstants.MARKTYPE_WU)){
				view.setMarkTypedesc("五分制");
			}else if(view.getMarkType().equals(AppConstants.MARKTYPE_FEN)){
				view.setMarkTypedesc("分值");
			}
			
			List<ReviewChildren> childList = reviewChildrenService.findAll(view.getId());
			view.setChildList(childList);
			
		}
		}
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("total", total);
		map.put("data", list);
		
		return map;
	}
}
