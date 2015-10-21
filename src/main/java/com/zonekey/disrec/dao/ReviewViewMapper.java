/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.vo.LectureView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.ReviewView;

/**
 */
@MyBatisRepository
public interface ReviewViewMapper extends BaseMapper<ReviewView, String> {

	public int insertSelective(ReviewView reviewView);

	public long findCount(PageBean pageBean);

	public List<ReviewView> findPageByPageBean(PageBean pageBean);

	public int updateSelective(ReviewView reviewView);

}
