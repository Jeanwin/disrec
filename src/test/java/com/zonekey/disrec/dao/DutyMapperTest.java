package com.zonekey.disrec.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.zonekey.disrec.entity.Area;
import com.zonekey.disrec.entity.DutySet;
import com.zonekey.disrec.service.DutySetService;
import com.zonekey.disrec.vo.PageBean;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class DutyMapperTest extends AbstractJUnit4SpringContextTests{

	@Autowired
	private DutySetService dutySetService;
	@Autowired
	private DutySetMapper dutySetMapper;
	@Test
	public void test(){
		//增加
		/*DutySet duty = new DutySet();
		duty.setId("1");
		duty.setName("高二一班值班室");
		duty.setTelephone("010-5284101");
		duty.setUserId("85b5b97630014bd3a5651c977877b9e7");
		duty.setWarmEmail("majianxin@163.com");
		List<Area> areas = new ArrayList<Area>();
		Area area = new Area();
		area.setId("001");
		Area area1 = new Area();
		area1.setId("002");
		areas.add(area1);
		areas.add(area);
		duty.setAreas(areas);
		dutySetService.saveDutySet(duty);*/
		//删除
		/*Map map = new HashMap<String, String>();
		map.put("id", "1");
		Map map1 = new HashMap<String, String>();
		map1.put("id", "2");
		List list = new ArrayList<Map<String, Object>>();
		list.add(map);
		list.add(map1);
		dutySetService.delete(list);*/
		//修改
		/*DutySet duty = new DutySet();
		duty.setId("2");
		duty.setName("值班室");
		duty.setTelephone("010-5284101");
		duty.setUserId("101");
		duty.setDutyPerson("qiu");
		List<String> areaIds = new ArrayList<String>();
		areaIds.add("1");
		areaIds.add("2");
		duty.setAreaIds(areaIds);
		dutySetService.update(duty);*/
		//查询
		/*PageBean pageBean = new PageBean();
		Map<String, Object> page = new HashMap<String, Object>();
		page.put("offset", 0);
		page.put("limit", 10);
		pageBean.setPage(page);
		List<DutySet> list = dutySetMapper.findDutyByPage(pageBean);
		System.out.println("值班室的个数："+list.size());
		for (DutySet dutySet : list) {
			System.out.println(dutySet);
		}
		System.out.println(dutySetMapper.count());*/
		//验证
		/*Map map = new HashMap<String, String>();
		map.put("id", "001");
		Map map1 = new HashMap<String, String>();
		map1.put("id", "003");
		List list = new ArrayList<Map<String, Object>>();
		list.add(map);
		list.add(map1);
		int flag = dutySetService.checkClassroom(list);
		System.out.println(flag);*/
		//根据mac查看值班室人的loginname和教室名字
		Map<String, String> map = new HashMap<String, String>();
		map.put("mac", "D050993DEF36");
		map = dutySetService.getDutyPersonByMac(map);
		System.out.println(map);
	}
}




















