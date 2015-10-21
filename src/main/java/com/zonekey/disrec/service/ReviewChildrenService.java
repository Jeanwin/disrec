/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.ReviewChildrenMapper;
import com.zonekey.disrec.entity.ReviewChildren;
import com.zonekey.disrec.service.base.BaseService;

/**
 * xufeixiang 15.04.20
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class ReviewChildrenService extends BaseService {

	@Autowired
	private ReviewChildrenMapper reviewChildrenMapper;
	
	
	@Transactional(readOnly = false)
	public int saveReviewChildren(ReviewChildren reviewChildren) {
		if(reviewChildren != null && reviewChildren.getChildList().size() > 0){
			List<ReviewChildren> list = reviewChildren.getChildList();
			for(ReviewChildren reviewChildrenView:list){
				reviewChildrenView.setId(IdUtils.uuid2());
				reviewChildrenView.setParentid(reviewChildren.getId());
				reviewChildrenView.setReviewid(reviewChildren.getReviewid());
				reviewChildrenView.setDeleteflag("0");
				
				reviewChildrenMapper.insert(reviewChildrenView);
			}
		}
		
		
		return reviewChildrenMapper.insert(reviewChildren);
	}
	@Transactional(readOnly = false)
	public void deleteReviewChildren(String id) {
		reviewChildrenMapper.delete(id);
	}
	public List<ReviewChildren>  findAll(String id) {
		List<ReviewChildren> views = (List<ReviewChildren>) reviewChildrenMapper.findAll(id);
		
		if(views.size() > 0 ){
			for(ReviewChildren view :views){
				List<ReviewChildren> viewLists = reviewChildrenMapper.getChildReview(view);
				view.setChildList(viewLists);
			}
			
		}
		
		return views;
	}

}
