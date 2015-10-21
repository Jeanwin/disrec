package com.zonekey.disrec.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.test.SpringTxTestCase;

/**
 * @Title: @{#} DeptServiceTest.java
 * @Description: <p>DeptService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class DeptServiceTest extends SpringTxTestCase{

	@Autowired
	private DeptService deptService;

	@Test
	public void getDept() {
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("name", "一");
		List<Map<String,Object>> dept = deptService.findByName(map);
		System.out.println(JsonUtil.toJson(dept));
	}

	@Test
	public void findPageBy() {
		System.out.println(JsonUtil.toJson(deptService.getDeptTree()));
		System.out.println(JsonUtil.toJson(deptService.getDeptTrees()));
	}
}
