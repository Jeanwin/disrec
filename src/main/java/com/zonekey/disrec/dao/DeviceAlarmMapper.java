package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.DeviceAlarm;

@MyBatisRepository
public interface DeviceAlarmMapper  extends BaseMapper<DeviceAlarm, String> {

	public int saveDeviceAlarm(@Param("list")List<Map<String, String>> deviceAlarms);

	public int deleteDeviceAlarm(String areaId);
	
	public int deleteDeviceAlarmByids(String[] alarmids);
	
	public int deleteDeviceAlarmByAreaids(String[] areaIds);

	public int saveDeviceAlarmArea(Map<String, String> map);

	public List<DeviceAlarm> findDeviceAlarmList(DeviceAlarm deviceAlarm);

	public List<DeviceAlarm> findDeviceAlarmListByAreaid(String areaid);
	
	public List<DeviceAlarm> findDeviceAlarmListByDeviceAlarm(DeviceAlarm deviceAlarm);
	
	public List<DeviceAlarm> findDeviceAlarmListWithCode(DeviceAlarm deviceAlarm);
	
	public int deleteDeviceAlarmArea(String areaId);
	
	public DeviceAlarm findDeviceAlarm(Map<String, String> map);
	
	

	/**
	 * 
	 * @param id 根据区域Id查找是否有对应的设置方案
	 * @return
	 */
	public DeviceAlarm findByAreaId(String id);
	
	/**
	 * 
	 * @param id  如果选中的区域有对应的方案，则更新最新方案  （获取id） 
	 * @param areaId 批次方案
	 */
	public int updateDeviceAlarmArea(@Param("id")String id, @Param("areaId")String areaId);

}
