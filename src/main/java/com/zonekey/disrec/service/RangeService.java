/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.RangeMapper;
import com.zonekey.disrec.dao.SysUserMapper;
import com.zonekey.disrec.entity.Range;
import com.zonekey.disrec.entity.RangeScope;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.RangeScopeView;
import com.zonekey.disrec.vo.RangeView;
import com.zonekey.disrec.vo.SysFunctionView;

/**
 * @Title: @{#} RangeService.java
 * @Description: <p>Range实体业务类</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class RangeService extends BaseService {

	@Autowired
	private RangeMapper rangeMapper;
	@Resource
	private SysUserMapper sysUserMapper;
	public Range getRange(String id) {
		return rangeMapper.findOne(id);
	}
	
	public Page<Range> findPageBy(int pageNo, int pageSize) {
		long total = rangeMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize, Sort.Direction.ASC, "id");
		List<Range> list = rangeMapper.findByPage((pageNo - 1) * pageSize, pageSize);
		Page<Range> page = new PageImpl<Range>(list, pageRequest, total);
		
		return page;
	}

	@Transactional(readOnly = false)
	public void save(Map<String,Object> map) {
		List<Map<String,Object>> datas = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> list = (List<Map<String,Object>>) map.get("scopeList");
		
		String createuser = ShiroDbRealm.getCurrentLoginName();
		String userid = (String) map.get("loginname");
		List<Map<String,Object>> l = new ArrayList<Map<String,Object>>();
		l.add(map);
		deleteRange(l);
		
		for (Map<String,Object> inserMap : list) {
			if(inserMap==null)
				continue;
			inserMap.put("id", IdUtils.uuid2());
			datas.add(inserMap);
		}
		if(datas.size() != 0){
			rangeMapper.insertRange(datas,createuser,userid);
		}
		
		datas = new ArrayList<Map<String,Object>>();
		List<Map<String,Object>> listRole = (List<Map<String,Object>>) map.get("roleList");
		//跟新用户标记
		boolean flag = false;
		for (Map<String,Object> inserMap : listRole) {
			if(inserMap==null)
				continue;
			//更新用户enable,表明此用户及相应的权限不能被删除
			if("N".equals(inserMap.get("enable")))
				flag = true;
			inserMap.put("insertid", IdUtils.uuid2());
			datas.add(inserMap);
		}
		if(flag){
			SysUser user = new SysUser();
			user.setEnable("N");
			sysUserMapper.update(user);
		}
		if(datas.size() != 0){
		 rangeMapper.insertRangeRole(datas,createuser,userid);
		}
	}
	//添加范围
	@Transactional(readOnly = false)
	public void saveRange(Map<String,Object> map) {
		map.put("id", IdUtils.uuid2());
		map.put("createuser", ShiroDbRealm.getCurrentLoginName());
		rangeMapper.saveRange(map);
	}
	//修改范围
	@Transactional(readOnly = false)
	public void updateRange(Range range) {
		range.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		rangeMapper.updateRange(range);
	}
	
	@Transactional(readOnly = false)
	public void updatePower(RangeView rangeView) {
		rangeView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		Range range = rangeMapper.findOne(rangeView.getRangeid());
		
		if(range != null && !range.getName().equals(rangeView.getName())){
			range.setName(rangeView.getName());
			range.setModifyuser(ShiroDbRealm.getCurrentLoginName());
			rangeMapper.updateRange(range);
		}
		
		for (RangeScopeView rangeScope : rangeView.getRangeScopes()) {
			rangeScope.setParam(IdUtils.uuid2());
			rangeScope.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		}
		rangeMapper.deleteRangeScope(rangeView);
		rangeMapper.insertRangeScope(rangeView);
	}
	public List<Map<String,Object>> getScope() {
		return rangeMapper.getScope();
	}
	
	@Transactional(readOnly = false)
	public int deleteRange(List<Map<String,Object>> list) {
		rangeMapper.deleteRange(list,ShiroDbRealm.getCurrentLoginName());
		rangeMapper.deleteRangeRole(list,ShiroDbRealm.getCurrentLoginName());
		return 1;
	}
	@Transactional(readOnly = false)
	public int delete(RangeView rangeView) {
		int count = rangeMapper.findUserCount(rangeView);
		if(count>0)
			return -1;//有用户使用该角色,代表不能删除该角色
		rangeMapper.deleteRangeScope(rangeView);
		return rangeMapper.delRange(rangeView);
	}
}
