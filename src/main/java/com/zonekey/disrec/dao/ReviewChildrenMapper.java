/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.ReviewChildren;

/**
 */
@MyBatisRepository
public interface ReviewChildrenMapper extends BaseMapper<ReviewChildren, String> {

	List<ReviewChildren> findAll(String id);

	int insertSelective(ReviewChildren reviewChildren);

	List<ReviewChildren> getChildReview(ReviewChildren view);
	
}
