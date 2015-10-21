/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;


import java.util.List;
import java.util.Map;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Active;
import com.zonekey.disrec.vo.ActiveView;
import com.zonekey.disrec.vo.LectureView;
import com.zonekey.disrec.vo.PageBean;

/**
 */
@MyBatisRepository
public interface ActiveViewMapper extends BaseMapper<ActiveView, String> {

	public int insertSelective(ActiveView active);

	public long findCount(PageBean pageBean);

	public List<ActiveView> findPageByPageBean(PageBean pageBean);

	public int deleteById(int id);

	public int deleteWorksByActiveId(int id);

	public int deleteReviewUserByActiveId(int id);

	public int deleteReviewDetailByActiveId(int id);

	public List<Map<String, Object>> getWorks(int id);

}
