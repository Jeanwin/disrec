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
import com.zonekey.disrec.entity.LightSet;
import com.zonekey.disrec.service.LightSetService;
import com.zonekey.disrec.vo.PageBean;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class LightSetMapperTest extends AbstractJUnit4SpringContextTests{

	@Autowired
	private LightSetMapper lightSetMapper;
	@Autowired
	private LightSetService lightSetService;
	@Test
	public void test(){
		/*List<LightSet> list = new ArrayList<LightSet>();
		LightSet lightSet = new LightSet();
		lightSet.setUsedlength(780.23);
		lightSet.setMaxlength(800.00);
		lightSet.setAreaId("06ba17e0376f44998cfc37475cf39b32");
		LightSet lightSet1 = new LightSet();
		lightSet1.setUsedlength(10.00);
		lightSet1.setMaxlength(11.11);
		lightSet1.setAreaId("001");
		list.add(lightSet1);
		list.add(lightSet);
		lightSetService.updateLightSet(list);*/
		//查询测试
		/*PageBean pageBean = new PageBean();
		Map<String, Object> page = new HashMap<String, Object>();
		page.put("offset", 0);
		page.put("limit", 1);
		pageBean.setPage(page);
		Map<String, Object> map = new HashMap<String, Object>();
		//map.put("isUse", 1);
		map.put("areaName", "1-203");
		pageBean.setKeywords(map);
		List<Map<String, Object>> list = lightSetMapper.findByPage(pageBean);
		System.out.println("在有限制条件的情况下 查询出来的设置灯泡的区域个数："+list.size());
		long count = lightSetMapper.count(pageBean);
		System.out.println(count);*/
		/*for (LightSet lightSetVo : list) {
			System.out.println("教室:"+lightSetVo.getName()+","+"灯泡使用寿命："+lightSetVo.getUsedlength());
		}
		*/
		System.out.println(lightSetService.creatOrUpdate("D050993DEF36", 15.00, 22.22));
	}
}














