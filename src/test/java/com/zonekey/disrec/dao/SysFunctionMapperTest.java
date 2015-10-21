package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.SysFunction;

/**
 * @Title: @{#} SysFunctionMapperTest.java
 * @Description: <p>SysFunctionMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class SysFunctionMapperTest extends SpringTxTestCase{

	@Autowired
	private SysFunctionMapper sysfunctionMapper;
	
	@Test
	public void findPage() throws Exception {
		List<SysFunction> list = sysfunctionMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		SysFunction sysfunction = new SysFunction();
		sysfunction.setId("101");
		sysfunctionMapper.insert(sysfunction);
		Assert.assertNotNull(sysfunctionMapper.findOne("101"));
		
		//update
		/*sysfunction = sysfunctionMapper.findOne("101");
		sysfunction.setName("TEST");
		sysfunctionMapper.update(sysfunction);
		Assert.assertEquals(sysfunction.getName(), "TEST");*/
		
		// delete
		sysfunction.setModifydate(new Date());
		sysfunction.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		sysfunction.setModifyuser("admin");
		sysfunctionMapper.delete(sysfunction);
		Assert.assertEquals(sysfunction.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
