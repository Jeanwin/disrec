/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.vo.LectureView;
import com.zonekey.disrec.vo.PageBean;

/**
 */
@MyBatisRepository
public interface LectureMapper extends BaseMapper<LectureView, String> {

	public int insertSelective(LectureView lectureView);

	public long findCount(PageBean pageBean);

	public List<LectureView> findPageByPageBean(PageBean pageBean);

	public int updateSelective(LectureView lectureView);

	public String countStatus(@Param("status")String status);

}
