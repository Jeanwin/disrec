package com.zonekey.disrec.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.zonekey.disrec.entity.AlarmLog;
import com.zonekey.disrec.service.AlarmLogService;
import com.zonekey.disrec.vo.PageBean;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class AlarmLogMapperTest {

	@Autowired
	private AlarmLogMapper alarmLogMapper;
	@Autowired
	private AlarmLogService alarmLogService;
	@Test
	public void run1(){
		//增加或修改
		/*AlarmLog alarmLog = new AlarmLog();
		alarmLog.setId("7b4a2423af1d42a2a31b8d06494ee047");
		alarmLog.setState("1");
		//alarmLogService.saveAlarmLog(alarmLog);
		alarmLogService.updateAlarmLog(alarmLog);*/
		
		//查询
		PageBean pageBean = new PageBean();
		Map<String, Object> page = new HashMap<String, Object>();
		page.put("offset", 0);
		page.put("limit", 10);
		pageBean.setPage(page);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("startTime","2015/07/1");
		map.put("endTime", "2015/07/3");
		map.put("content", "投影仪");
		//map.put("source", "中软");
		pageBean.setKeywords(map);
		List<AlarmLog> list = alarmLogMapper.findByPage(pageBean);
		long count = alarmLogMapper.count(pageBean);
		System.out.println(count);
		System.out.println(list.size());
		for (AlarmLog alarmLog : list) {
			System.out.println("时间："+alarmLog.getTime());
		}
	}
}
