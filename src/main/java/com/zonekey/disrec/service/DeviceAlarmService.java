package com.zonekey.disrec.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.AreaMapper;
import com.zonekey.disrec.dao.DeviceAlarmMapper;
import com.zonekey.disrec.dao.DeviceMapper;
import com.zonekey.disrec.entity.DeviceAlarm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeviceView;

@Component
@Transactional(readOnly = true)
public class DeviceAlarmService extends BaseService {

	@Autowired
	private DeviceAlarmMapper deviceAlarmMapper;
	@Autowired
	private DeviceMapper deviceMapper;
	@Autowired
	private AreaMapper areaMapper;

	@Transactional(readOnly = false)
	public Map<String, Object> saveDeviceAlarm(Map<String, Object> map) {
		int flag1 = 0;
		List<Map<String, String>> deviceAlarms = (List<Map<String, String>>) map
				.get("list");
		List<Map<String, String>> areas = (List<Map<String, String>>) map
				.get("areas");
		Map<String, Object> map1 = new HashMap<String, Object>();
		List<DeviceAlarm> list = new ArrayList<DeviceAlarm>();
		if (null == deviceAlarms && deviceAlarms.size() == 0) {
			map1.put("state", "0");
			return map1;
		}
		// System.out.println(checkUnique(deviceAlarms));
		String areaId = deviceAlarms.get(0).get("areaId");
		for (Map<String, String> deviceAlarm : deviceAlarms) {
			deviceAlarm.put("id", IdUtils.uuid2());
		}
		deviceAlarmMapper.deleteDeviceAlarm(areaId);
		deviceAlarmMapper.saveDeviceAlarm(deviceAlarms);
		// 应用到其他教室
		if (null != areas && areas.size() > 0) {
			deviceAlarmMapper.deleteDeviceAlarmArea(areaId);
			Map<String, String> m = new HashMap<String, String>();
			m.put("id", areaId);
			areas.add(m);
			for (Map<String, String> map2 : areas) {
				DeviceAlarm daAlarm = new DeviceAlarm();
				map2.put("id1", IdUtils.uuid2());
				map2.put("areaId", areaId);
				// 判断选中的教室是否有其他方案
				String id = map2.get("id");
				AreaView areaView = areaMapper.findAreaByid(id);
				DeviceAlarm d = deviceAlarmMapper.findByAreaId(id);
				if (null != d) {
					flag1 = deviceAlarmMapper.updateDeviceAlarmArea(d.getId(),
							areaId);
					if (null != areaView) {
						daAlarm.setAreaName(areaView.getName());
						daAlarm.setResultState(flag1);
					}
				} else {
					flag1 = deviceAlarmMapper.saveDeviceAlarmArea(map2);
					if (null != areaView) {
						daAlarm.setAreaName(areaView.getName());
						daAlarm.setResultState(flag1);
					}
				}
				list.add(daAlarm);
			}
			map1.put("resultState", list);
			return map1;
		}
		map1.put("state", "1");
		return map1;
	}

	@Transactional(readOnly = false)
	public Map<String, Object> saveDeviceAlarmAll(Map<String, Object> map) {
		List<Map<String, String>> deviceAlarms = (List<Map<String, String>>) map.get("list");
		List<Map<String, String>> areas = (List<Map<String, String>>) map.get("areas");
		
		Map<String, Object> map1 = new HashMap<String, Object>();
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		int flag1 = 0;
		if (deviceAlarms != null) {
			String areaid = deviceAlarms.get(0).get("areaId");
//			for (int i = 0; i < deviceAlarms.size(); i++) {
//				if (!"".equals(deviceAlarms.get(i).get("areaId"))&&(null!=deviceAlarms.get(i).get("areaId")))
//					areaid = deviceAlarms.get(i).get("areaId");
//			}
//			if ("".equals(areaid)||(null==areaid)||areaid.isEmpty()) {
//				return map1;
//			}
			for (int i = 0; i < areas.size(); i++) {
				deviceAlarmMapper.deleteDeviceAlarm(areas.get(i).get("id"));
			}

			for (int i = 0; i < areas.size(); i++) {
				Map<String, Object> listmap = new HashMap<String, Object>();
				for (int j = 0; j < deviceAlarms.size(); j++) {
					deviceAlarms.get(j).put("areaId", areas.get(i).get("id"));
					deviceAlarms.get(j).put("id", IdUtils.uuid2());
				}
				AreaView areaView = areaMapper.findAreaByid(areas.get(i).get("id"));
				if (null!=areaView){
					flag1=deviceAlarmMapper.saveDeviceAlarm(deviceAlarms);
					if (flag1==0) listmap.put("resultState", "0");
						else listmap.put("resultState", "1");
					listmap.put("areaName", areas.get(i).get("name"));
					list.add(listmap);
				}
			}
			map1.put("resultState", list);
			
			deviceAlarmMapper.deleteDeviceAlarm(areaid);
			for (int i = 0; i < deviceAlarms.size(); i++) {
				deviceAlarms.get(i).put("id", IdUtils.uuid2());
				deviceAlarms.get(i).put("areaId", areaid);
			}

			flag1=deviceAlarmMapper.saveDeviceAlarm(deviceAlarms);
			if (flag1==0) map1.put("state", "0");
			else map1.put("state", "1");
			
		}
		return map1;
	}

	public List<DeviceAlarm> getDeviceAlarmList(DeviceAlarm deviceAlarm) {
		List<DeviceAlarm> deviceAlarms = null;
		if (null != deviceAlarm) {
			// deviceAlarms =
			// deviceAlarmMapper.findDeviceAlarmList(deviceAlarm);
			deviceAlarms = deviceAlarmMapper
					.findDeviceAlarmListByDeviceAlarm(deviceAlarm);
		}
		return deviceAlarms;
	}

	public List<DeviceAlarm> findDeviceAlarmListWithCode(DeviceAlarm deviceAlarm) {
		List<DeviceAlarm> deviceAlarms = null;
		if (null != deviceAlarm) {
			// deviceAlarms =
			// deviceAlarmMapper.findDeviceAlarmList(deviceAlarm);
			deviceAlarms = deviceAlarmMapper
					.findDeviceAlarmListWithCode(deviceAlarm);
		}
		return deviceAlarms;
	}

	public List<DeviceAlarm> getDeviceAlarmListByAreaid(String areaid) {
		List<DeviceAlarm> deviceAlarms = null;
		if (null != areaid && "".equals(areaid)) {
			// deviceAlarms =
			// deviceAlarmMapper.findDeviceAlarmList(deviceAlarm);
			deviceAlarms = deviceAlarmMapper
					.findDeviceAlarmListByAreaid(areaid);
		}
		return deviceAlarms;
	}

	public List<DeviceAlarm> getListByCenContr(DeviceAlarm deviceAlarm) {
		List<DeviceAlarm> deviceAlarms = null;
		DeviceView deviceView = deviceMapper.findDeviceByMac(deviceAlarm
				.getMac());
		deviceAlarm.setAreaId(deviceView.getAreaid());
		deviceAlarms = deviceAlarmMapper.findDeviceAlarmList(deviceAlarm);

		return deviceAlarms;
	}

	public DeviceAlarm getDeviceAlarm(Map<String, String> map) {
		String mac = "";
		if (null != map.get("mac")) {
			mac = map.get("mac");
			DeviceView deviceView = deviceMapper.findDeviceByMac(mac);
			if (null != deviceView) {
				map.put("areaId", deviceView.getAreaid());
			} else {
				map.put("areaId", "");
			}
		}
		DeviceAlarm deviceAlarm = deviceAlarmMapper.findDeviceAlarm(map);
		return deviceAlarm;
	}

	@Transactional(readOnly = false)
	public void deleteAllAlarmById(Map<String, Object> map) {
		List<Map<String, String>> deviceAlarms = (List<Map<String, String>>) map
				.get("list");
		List<Map<String, String>> areas = (List<Map<String, String>>) map
				.get("areas");
		for (int i = 0; i < areas.size(); i++) {
			deviceAlarmMapper.deleteDeviceAlarm(areas.get(i).get("id"));
		}
	}

	@Transactional(readOnly = false)
	public int deleteDeviceAlarmByids(String[] alarmids) {
		return deviceAlarmMapper.deleteDeviceAlarmByids(alarmids);
	}
	
	@Transactional(readOnly = false)
	public int deleteDeviceAlarmByAreaids(String[] areadids) {
		return deviceAlarmMapper.deleteDeviceAlarmByAreaids(areadids);
	}
	
	public int checkUnique(Map<String, Object> map) {
		Map<String, String> m = (Map<String, String>) map.get("keywords");
		List<Map<String, String>> deviceAlarms = (List<Map<String, String>>) map
				.get("list");
		String output1 = m.get("output");
		String output2 = "";
		String state1 = m.get("state");
		String state2 = "";
		int flag = 1;
		for (Map<String, String> d : deviceAlarms) {
			output2 = d.get("output");
			if (output2 != "" && output1 != "" && output1.equals(output2)) {
				state2 = d.get("state");
				if (state1 != "" && state2 != "" && state1.equals(state2)) {
					flag = 0;
				}
			}

		}
		return flag;
	}
}
