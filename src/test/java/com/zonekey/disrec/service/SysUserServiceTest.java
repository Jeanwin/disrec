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
import com.zonekey.disrec.service.SysUserService;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.entity.SysUser;

/**
 * @Title: @{#} SysUserServiceTest.java
 * @Description: <p>SysUserService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class SysUserServiceTest extends SpringTxTestCase{

	@Autowired
	private SysUserService sysuserService;

	@Test
	public void getSysUser() {
		SysUser sysuser = sysuserService.getSysUser("1");
		Assert.assertNotNull(sysuser);
	}

	@Test
	public void findbyloginname() {
//		SysUser sysuser = sysuserService.findByLoginname("cwx");
//		Assert.assertNotNull(sysuser);
	}
	
	@Test
	public void findPageBy() {
		PageBean page = new PageBean();
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("offset", 0);
		map.put("limit", 10);
		page.setPage(map);
		System.out.println(JsonUtil.toJson(sysuserService.findPageBy(page).getContent()));;
	}
}
