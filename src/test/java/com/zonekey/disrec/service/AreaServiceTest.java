package com.zonekey.disrec.service;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.test.SpringTxTestCase;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.AreaMapper;
import com.zonekey.disrec.entity.Area;
import com.zonekey.disrec.vo.AreaView;

/**
 * @Title: @{#} AreaServiceTest.java
 * @Description: <p>AreaService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class AreaServiceTest extends SpringTxTestCase{

	@Autowired
	private AreaMapper mapper;

	@Test
	public void getArea() {
		AreaView area = new AreaView();
		area.setId(IdUtils.uuid2());
		area.setParentid("0");
		area.setName("测试");
		area.setInnerid("102225");
		area.setAttribute("y");
		area.setCreateuser("admin");
		area.setDeptid("12");
		area.setState("1");
		area.setSort("1");
		area.setUserid("admin");
		System.out.println(mapper.insert(area));;
		/**
		 * ( 
		#{deptid},
		#{state},#{sort}, #{_loginname})
		 */
		
	}

	@Test
	public void findPageBy() {
		AreaView area = new AreaView();
		
		area.setName("三层111");
		System.out.println(mapper.update(area));
	}
}
