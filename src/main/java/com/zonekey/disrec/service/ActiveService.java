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
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.dao.ActiveViewMapper;
import com.zonekey.disrec.entity.Active;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.ActiveView;
import com.zonekey.disrec.vo.PageBean;

/**
 * xufeixiang 15.04.20
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class ActiveService extends BaseService {

	@Autowired
	private ActiveViewMapper activeMapper;
	@Autowired
	private SysCodeService sysCodeService;
	
	public ActiveViewMapper getActiveMapper() {
		return activeMapper;
	}


	public void setActiveMapper(ActiveViewMapper activeMapper) {
		this.activeMapper = activeMapper;
	}


	public Active findOne(String id) {
		Active lectureView = activeMapper.findOne(id);
		return lectureView;
	}
	
	
	public Page<ActiveView> findPageBy(int offset,int limit) {
		long total = activeMapper.count();
		List<ActiveView> list = activeMapper.findByPage(offset,limit);
		Page<ActiveView> page = new PageImpl<ActiveView>(list,null,total);
		return page;
		
	}
	
	@Transactional(readOnly = false)
	public int deleteActive(int id) {
//	    删除活动记录
		activeMapper.deleteById(id);
//		获取作品信息
		List<Map<String, Object>> list = activeMapper.getWorks(id);
		if(list.size() > 0){
			for(Map<String, Object> map : list){
				Long workid = (Long) map.get("worksid");
				if(workid != null){
//					删除专家评审记录
					activeMapper.deleteReviewDetailByActiveId(workid.intValue());
				}
			}
//		删除参与活动的作品
		activeMapper.deleteWorksByActiveId(id);
		}
//		删除参与活动的专家
		activeMapper.deleteReviewUserByActiveId(id);
		return 1;
	}

	public Map<String, Object> findPageBy(PageBean pageBean) {
		long total = activeMapper.findCount(pageBean);
		List<ActiveView> list = activeMapper.findPageByPageBean(pageBean);
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("total", total);
		map.put("data", list);
		
		return map;
	}
	public static void main(String[] args) {
		Long workid = 1236768l;
		System.out.println(workid.intValue());
	}
}
