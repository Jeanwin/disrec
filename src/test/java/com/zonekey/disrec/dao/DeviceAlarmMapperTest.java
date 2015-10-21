package com.zonekey.disrec.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.zonekey.disrec.entity.DeviceAlarm;
import com.zonekey.disrec.service.CenterControllerService;
import com.zonekey.disrec.service.DeviceAlarmService;
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class DeviceAlarmMapperTest {

	@Autowired
	private DeviceAlarmService deviceAlarmService;
	@Autowired
	private CenterControllerService centerControllerService;
	
	@Test
	public void run(){
		/*Map<String, Object> map = new HashMap<String, Object>();
		List<DeviceAlarm> list = new ArrayList<DeviceAlarm>();
		DeviceAlarm deviceAlarm = new DeviceAlarm();
		deviceAlarm.setAreaId("13347a54ede748cb87eb352963a9b9ab");
		deviceAlarm.setOutput("3");
		deviceAlarm.setBell("2");
		deviceAlarm.setClues("测试唯一");
		deviceAlarm.setEmailUse("0");
		deviceAlarm.setMessageAlarm("0");
		deviceAlarm.setSms("0");
		deviceAlarm.setState("0");
		DeviceAlarm deviceAlarm1 = new DeviceAlarm();
		deviceAlarm1.setAreaId("13347a54ede748cb87eb352963a9b9ab");
		deviceAlarm1.setOutput("3");
		deviceAlarm1.setBell("2");
		deviceAlarm1.setClues("测试唯一");
		deviceAlarm1.setEmailUse("0");
		deviceAlarm1.setMessageAlarm("0");
		deviceAlarm1.setSms("0");
		deviceAlarm1.setState("0");
		list.add(deviceAlarm);
		list.add(deviceAlarm1);
		map.put("list", list);
		List<Map<String,Object>> areas = new ArrayList<Map<String,Object>>();
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("id", "13347a54ede748cb87eb352963a9b9ab");
		Map<String, Object> m1 = new HashMap<String, Object>();
		m1.put("id", "2e6462a18d23474db494a0d0f16e26cc");
		areas.add(m);
		areas.add(m1);
		map.put("areas", areas);
		deviceAlarmService.saveDeviceAlarm(map);*/
		/*DeviceAlarm deviceAlarm = new DeviceAlarm();
		deviceAlarm.setAreaId("001");
		System.out.println(deviceAlarmService.getDeviceAlarmList(deviceAlarm).size());*/
	/*	Map<String, Object> map = new HashMap<String, Object>();
		map.put("mac", "D050993DEF36");
		System.out.println(deviceAlarmService.getDeviceAlarm(map));*/
		//根据mac,state,output查找单一的对象
		Map<String, String> map = new HashMap<String, String>();
		map.put("mac", "00096F24A0AF");
		map.put("output", "1");
		map.put("state", "0");
		DeviceAlarm deviceAlarm = deviceAlarmService.getDeviceAlarm(map);
		System.out.println(deviceAlarm);
	    System.out.println(centerControllerService.doMessageEmail(deviceAlarm));
		//deviceAlarmService.getListByCenContr(deviceAlarm);*/
	}
}

















