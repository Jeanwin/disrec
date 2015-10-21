package com.zonekey.disrec.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.entity.DeviceAlarm;
import com.zonekey.disrec.service.DeviceAlarmService;

@RestController
@RequestMapping(value = "/deviceAlarm")
public class DeviceAlarmController {
	@Autowired
	private DeviceAlarmService deviceAlarmService;

	@RequestMapping(value="create",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public Map<String, Object> save(HttpServletRequest req) {
		Map<String, Object> deviceAlarms = JsonUtil.jsonToObject(req, Map.class);
		return deviceAlarmService.saveDeviceAlarm(deviceAlarms);
	}
	
	//获取教室对应的设备配置方案
	@RequestMapping(value = "deviceAlarmList", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> getDeviceAlarmList(HttpServletRequest req){
		DeviceAlarm deviceAlarm = JsonUtil.jsonToObject(req, DeviceAlarm.class);
		Map<String, Object> mapData = new HashMap<String, Object>();
		List<DeviceAlarm> list = deviceAlarmService.getDeviceAlarmList(deviceAlarm);
		mapData.put("data", list);
		return mapData;
	}

	//获取教室对应的设备配置方案
	@RequestMapping(value = "findDeviceAlarmListWithCode", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> findDeviceAlarmListWithCode(HttpServletRequest req){
		DeviceAlarm deviceAlarm = JsonUtil.jsonToObject(req, DeviceAlarm.class);
		Map<String, Object> mapData = new HashMap<String, Object>();
		List<DeviceAlarm> list = deviceAlarmService.findDeviceAlarmListWithCode(deviceAlarm);
		mapData.put("data", list);
		return mapData;
	}	
	
	//获取教室对应的设备配置方案
	@RequestMapping(value = "deviceAlarmListByAreaid", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> deviceAlarmListByAreaid(HttpServletRequest req,String areaid){
		DeviceAlarm deviceAlarm = JsonUtil.jsonToObject(req, DeviceAlarm.class);
		Map<String, Object> mapData = new HashMap<String, Object>();
		List<DeviceAlarm> list = deviceAlarmService.getDeviceAlarmListByAreaid(areaid);
		mapData.put("data", list);
		return mapData;
	}
	
	@RequestMapping(value="checkDeviceAlarmUnique",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int checkDeviceAlarmUnique(HttpServletRequest req) {
		Map<String, Object> deviceAlarms = JsonUtil.jsonToObject(req, Map.class);
		return deviceAlarmService.checkUnique(deviceAlarms);
	}
	
	@RequestMapping(value="deleteDeviceAlarmByAreaids",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int deleteDeviceAlarmByAreaids(HttpServletRequest req,String areaids) {
		String[] areaidarr=areaids.split(",");
		return deviceAlarmService.deleteDeviceAlarmByAreaids(areaidarr);
	}
	
	@RequestMapping(value="deleteDeviceAlarmByids",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int deleteDeviceAlarmByids(HttpServletRequest req,String alarmids) {
		String[] alarmidarr=alarmids.split(",");
		return deviceAlarmService.deleteDeviceAlarmByids(alarmidarr);
	}	
	
	@RequestMapping(value="saveAlarm",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public Map<String, Object> saveAlarm(HttpServletRequest req) {
		Map<String, Object> deviceAlarms = JsonUtil.jsonToObject(req, Map.class);
		return deviceAlarmService.saveDeviceAlarmAll(deviceAlarms);
	}
}
