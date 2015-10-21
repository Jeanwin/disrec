package com.zonekey.disrec.service;

import junit.framework.Assert;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.test.SpringTxTestCase;
import com.zonekey.disrec.service.CurriculumService;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.entity.Curriculum;

/**
 * @Title: @{#} CurriculumServiceTest.java
 * @Description: <p>CurriculumService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class CurriculumServiceTest extends SpringTxTestCase{

	@Autowired
	private CurriculumService curriculumService;

	@Test
	public void getCurriculum() {
		PageBean pageBean = new PageBean();
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("offset", 1);
		map.put("limit", 3);
		pageBean.setPage(map);
		Map<String,Object> result = curriculumService.findEditCurriculum(pageBean);
		List<Curriculum> list = (List<Curriculum>) result.get("data");
		System.out.println(result.get("total"));
		for (Curriculum curriculum : list) {
			System.out.println(curriculum.getSameclass());
		}
	}
	@Test
	public void getEditCurriculum() {
		PageBean pageBean = new PageBean();
		Map<String,Object> map = new HashMap<String, Object>();
		map.put("offset", 1);
		map.put("limit", 3);
		pageBean.setPage(map);
		Map<String,Object> result = curriculumService.findLiveCurriculum(pageBean);
		List<Curriculum> list = (List<Curriculum>) result.get("data");
		System.out.println(result.get("total"));
		for (Curriculum curriculum : list) {
			System.out.println(curriculum.getSameclass());
		}
	}

	@Test
	public void findPageBy() {
		Page<Curriculum> page = curriculumService.findPageBy(1, 10);
		for (Curriculum curriculum : page) {
			Assert.assertNotNull(curriculum);
		}
	}
	@Test
	public void testCurriculum() {
		// 根据教室id
		String areaid = "";
		//json转化为对象
		Curriculum curriculum= new Curriculum();
//		curriculum.setAreaid("3");
//		curriculum.setWeeks("7");
		curriculum.setStartdate("2014-10-16");
		List<Curriculum>  listC1urriculum =  curriculumService.testCurriculum(curriculum);
		System.out.println(listC1urriculum.size());
		System.out.println(listC1urriculum);
	}
	
	@Test
	public void findWeekCurriculum() {
		// 根据教室id
		String areaid = "";
		//json转化为对象
		Curriculum curriculum= new Curriculum();
//		curriculum.setAreaid("3");
//		curriculum.setWeeks("7");
//		curriculum.setStartdate("2014-10-16");
//		List<Curriculum>  listC1urriculum =  curriculumService.findWeekCurriculum(curriculum);
//		System.out.println(listC1urriculum.size());
//		System.out.println(listC1urriculum);
	}
	
	@Test
	public void insertCurriculum() {
		String strjson="{\"termid\":\"1\",\"classid\":\"1\",\"areaid\":\"1\",\"userid\":\"1\",\"deptid\":\"1\",\"weeksbefore\":\"1-3,5\",\"classnumbefore\":\"1-2\",\"weekdate\":\"1\",\"starttime\":\"08:00:00\",\"endtime\":\"09:00:00\"}";
		//将json转化为对象
		Curriculum curriculum = JsonUtil.jsonToObject(strjson, Curriculum.class);
		  curriculumService.insertCurriculum(curriculum);
	}
}

