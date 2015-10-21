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

import com.zonekey.disrec.entity.TimeTask;
import com.zonekey.disrec.service.TimeTaskService;
import com.zonekey.disrec.vo.PageBean;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class TimeTaskMapperTest {

	@Autowired
	private TimeTaskService timeTaskService;
	@Autowired
	private TimeTaskMapper timeTaskMapper;
	@Test
	public void run1(){
		/*TimeTask timeTask = new TimeTask();
		timeTask.setId("1");
		timeTask.setTaskType("a0deec2532d5405f9a42e093bdd05ecb");
		timeTask.setExecStart("2015-1-12");
		timeTask.setExecEnd("2015-6-13");
		Map<String, Object> weekMap = new HashMap<String, Object>();
		weekMap.put("Mon", true);
		weekMap.put("Tues", true);
		weekMap.put("Wed",false);
		weekMap.put("Thur",false);
		weekMap.put("Fri",false);
		weekMap.put("Sat",false);
		weekMap.put("Sun",false);
		timeTask.setWeekMap(weekMap);
		timeTask.setStartTime("8:30:20");
		List<Map<String, Object>> areas = new ArrayList<Map<String, Object>>();
		Map<String, Object> map1 = new HashMap<String, Object>();
		map1.put("id", "001");
		Map<String, Object> map2 = new HashMap<String, Object>();
		map2.put("id", "002");
		areas.add(map1);
		areas.add(map2);
//		timeTask.setAreas(areas);
		timeTaskService.saveTimeTask(timeTask);*/
		//timeTaskService.updateTimeTask(timeTask);
		//删除
		/*Map map = new HashMap<String, String>();
		map.put("id", "1");
		List list = new ArrayList<Map<String, Object>>();
		list.add(map);
		timeTaskService.deleteTimeTask(list);*/
		//查询
		PageBean pageBean = new PageBean();
		Map<String, Object> page = new HashMap<String, Object>();
		page.put("offset", 0);
		page.put("limit", 10);
		pageBean.setPage(page);
		timeTaskMapper.count(pageBean);
		List<TimeTask> list = timeTaskMapper.findByPage(pageBean);
		for (TimeTask timeTask : list) {
			System.out.println(timeTask);
		}
	}
}
