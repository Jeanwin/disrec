/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.vo.ReviewView;

/**
 */
@MyBatisRepository
public interface ReviewMapper extends BaseMapper<ReviewView, String> {

	int insertSelective(ReviewView reviewView);

}
