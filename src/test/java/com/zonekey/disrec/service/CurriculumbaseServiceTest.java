package com.zonekey.disrec.service;

import junit.framework.Assert;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.test.SpringTxTestCase;
import com.zonekey.disrec.service.CurriculumbaseService;
import com.zonekey.disrec.entity.Area;
import com.zonekey.disrec.entity.Curriculumbase;

/**
 * @Title: @{#} CurriculumbaseServiceTest.java
 * @Description: <p>CurriculumbaseService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class CurriculumbaseServiceTest extends SpringTxTestCase{

	@Autowired
	private CurriculumbaseService curriculumbaseService;

	@Test
	public void getCurriculumbase() {
		Curriculumbase curriculumbase = curriculumbaseService.getCurriculumbase("1");
		Assert.assertNotNull(curriculumbase);
	}

	@Test
	public void findPageBy() {
		Page<Curriculumbase> page = curriculumbaseService.findPageBy(1, 10);
		for (Curriculumbase curriculumbase : page) {
			Assert.assertNotNull(curriculumbase);
		}
	}
	@Test
	public void insertCurriculumbase() {
//		List<Curriculumbase> curriculumbaselist1 =new ArrayList<Curriculumbase>();
//		Curriculumbase curriculumbase = new Curriculumbase();
//		curriculumbase.setId(UUID.randomUUID().toString());
//		curriculumbase.setOclasstype("中考班教室3");
//		curriculumbase.setOdatebegin("2014-09-01");
//		curriculumbase.setOdateend("2014-12-01");
//		curriculumbase.setClasstype("中考班教室333");
//		curriculumbase.setDatebegin("2014-09-01");
//		curriculumbase.setDateend("2014-12-01");
//		curriculumbase.setIclass(4);
//		curriculumbase.setName("第四节");
//		curriculumbase.setStarttime("11:59");
//		curriculumbase.setEndtime("14:00");
//		curriculumbaselist1.add(curriculumbase);
//		//检查库中有没有相同的方案名称、起止时间，有不允许新增
//				if(curriculumbaseService.findCurriculumbaseByType(curriculumbaselist1.get(0)) != null && curriculumbaseService.findCurriculumbaseByType(curriculumbaselist1.get(0)).size()>0){
//					System.out.println("数据库中有同样方案名称、起止时间的数据,不允许新增");
//				}else{
//					int data = curriculumbaseService.insertCurriculumbase(curriculumbaselist1);
//				}
}
	
	@Test
	public void updateCurriculumbase() {
//		List<Curriculumbase> curriculumbaselist1 =new ArrayList<Curriculumbase>();
//		Curriculumbase curriculumbase = new Curriculumbase();
//		curriculumbase.setId(UUID.randomUUID().toString());
//		curriculumbase.setOclasstype("中考班教室3");
//		curriculumbase.setOdatebegin("2014-09-01");
//		curriculumbase.setOdateend("2014-12-01");
//		curriculumbase.setClasstype("中考班教室333");
//		curriculumbase.setDatebegin("2014-09-01");
//		curriculumbase.setDateend("2014-12-01");
//		curriculumbase.setIclass(4);
//		curriculumbase.setName("第四节");
//		curriculumbase.setStarttime("11:59");
//		curriculumbase.setEndtime("14:00");
//		curriculumbaselist1.add(curriculumbase);
//		//检查库中有没有相同的方案名称、起止时间，有不允许新增
//		int  upd =  curriculumbaseService.updateCurriculumbase(curriculumbaselist1);
}
	
	@Test
	public void findClassTypeByArea() {
		List<Curriculumbase> curriculumbaselist1 =new ArrayList<Curriculumbase>();
		Curriculumbase curriculumbase = new Curriculumbase();
		String areastrjson="{ \"classbatch\": \"c70c3839-5f39-4b01-8907-4a1ae1b6e401\",\"classtype\": \"中考班教室3\",\"datebegin\": \"2014-09-01\",\"dateend\": \"2014-12-01\",\"areaList\": [{\"id\":\"11\"},{\"id\":\"12\"}]}";
		curriculumbase=JsonUtil.jsonToObject(areastrjson, Curriculumbase.class);
		//检查库中有没有相同的方案名称、起止时间，有不允许新增
		List<Area> alist =  curriculumbaseService.findClassTypeByArea(curriculumbase);
		System.out.println(alist);
}
	@Test
	public void insertUsedarea() {
		List<Curriculumbase> curriculumbaselist1 =new ArrayList<Curriculumbase>();
		Curriculumbase curriculumbase = new Curriculumbase();
		String areastrjson="{ \"classbatch\": \"058acec9-30da-4e85-9e0a-c14b50497a71\",\"classtype\": \"中考班教室3\",\"datebegin\": \"2014-09-01\",\"dateend\": \"2014-12-01\",\"areaList\": [{\"id\":\"1\"},{\"id\":\"2\"}]}";
		curriculumbase=JsonUtil.jsonToObject(areastrjson, Curriculumbase.class);
		//检查库中有没有相同的方案名称、起止时间，有不允许新增
		 curriculumbaseService.insertUsedarea(curriculumbase);
}
}