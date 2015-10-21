package com.zonekey.disrec.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.AreaMapper;
import com.zonekey.disrec.dao.DeviceMapper;
import com.zonekey.disrec.dao.DutySetMapper;
import com.zonekey.disrec.entity.DutySet;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeviceView;
import com.zonekey.disrec.vo.PageBean;

@Component
@Transactional(readOnly = true)
public class DutySetService extends BaseService{

	@Autowired
	private DutySetMapper dutySetMapper;
	@Autowired
	private DeviceMapper deviceMapper;
	@Autowired
	private AreaMapper areaMapper;
	@Transactional(readOnly = false)
	public int saveDutySet(DutySet dutySet) {
		if(null==dutySet){
			return 0;
		}
		dutySet.setId(IdUtils.uuid2());
		dutySetMapper.insert(dutySet);
		saveDutyArea(dutySet);
		return 1;
	}

	@Transactional(readOnly = false)
	public int saveDutyArea(DutySet dutySet){
		List<Map<String, Object>> list = dutySet.getAreas();
		for (Map<String, Object> map : list) {
			map.put("id1", IdUtils.uuid2());
		}
		return dutySetMapper.saveDutyArea(dutySet);
	}
	@Transactional(readOnly = false)
	public int delete(List<Map<String, Object>> list) {
		if(null==list && list.size()==0){
			return 0;
		}
		  dutySetMapper.deleteDuty(list);
		  dutySetMapper.deleteDutyArea(list);
			
		 
			return 1;
	}

	@Transactional(readOnly = false)
	public int update(DutySet dutySet) {
		if(null==dutySet){
			return 0;
		}
		dutySetMapper.updateDuty(dutySet);
		//中间表修改时先删除再添加
		dutySetMapper.delDutyArea(dutySet);
		saveDutyArea(dutySet);
		return 1;
	}

	public Page<DutySet> findPageBy(PageBean pageBean) {
		long total = dutySetMapper.count();
		List<DutySet> list = dutySetMapper.findDutyByPage(pageBean);
		Page<DutySet> page = new PageImpl<DutySet>(list,null,total);
		return page;
	}


	public List<SysUser> getClassAdminsList() {

		return dutySetMapper.getClassAdminsList();
	}

	public List<Map<String, String>> checkClassroom(Map<String, Object> m) {
		List<Map<String, String>> oldAreaIds = (List<Map<String, String>>) m.get("oldAreaId");
		List<Map<String, String>> l = new ArrayList<Map<String,String>>();
		List<Map<String, String>> list = (List<Map<String, String>>) m.get("list");
		int flag = 1;
		for (Map<String, String> map : list) {
			String areaId = map.get("id");
			//为空说明是创建的时候的验证
			if (null!=oldAreaIds&&oldAreaIds.size()>0) {
				for (Map<String, String> oldArea : oldAreaIds) {
					if (oldArea.get("id").equals(areaId)) {
						flag=0;
						break;
					}
				}
			}
			if (flag==1) {
				List<DutySet> duties = dutySetMapper.checkClassroom(areaId);
				if(null!=duties&&duties.size()>0){
					AreaView areaView = areaMapper.findAreaByid(areaId);
					if (null!=areaView) {
						Map<String, String> map2 = new HashMap<String, String>();
						map2.put("areaName", areaView.getName());
						l.add(map2);
					}
				}
			}
		}
		return l;
	}

	public Map<String, String> getDutyPersonByMac(Map<String, String> map) {
		String mac = map.get("mac");
		DeviceView deviceView = deviceMapper.findDeviceByMac(mac);
		if (null!=deviceView) {
			map.clear();
			AreaView areaView = areaMapper.findAreaByid(deviceView.getAreaid());
			if (null!=areaView) {
				DutySet dutySet =  dutySetMapper.findDuty(deviceView.getAreaid());
				String userId = "";
				if (null!=dutySet) {
					userId=dutySet.getUserId();
					map.put("userId", userId);
					map.put("areaName", areaView.getName());
				}
				if(map.get("areaName")!=""&&map.get("areaName")!=null&&map.get("userId")!=""&&map.get("userId")!=null){
					return map;
				}
			}
		}
		return null;
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
