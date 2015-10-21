package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.SysUser;

/**
 * @Title: @{#} SysUserMapperTest.java
 * @Description: <p>SysUserMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class SysUserMapperTest extends SpringTxTestCase{

	@Autowired
	private SysUserMapper sysuserMapper;
	
	@Test
	public void findPage() throws Exception {
	}
	
	@Test
	public void curd() throws Exception {
		//add
		SysUser sysuser = new SysUser();
		sysuser.setId("101");
		Assert.assertNotNull(sysuserMapper.findOne("101"));
		
		//update
		/*sysuser = sysuserMapper.findOne("101");
		sysuser.setName("TEST");
		sysuserMapper.update(sysuser);
		Assert.assertEquals(sysuser.getName(), "TEST");*/
		
		// delete
//		sysuser.setModifydate(new Date());
		sysuser.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		sysuser.setModifyuser("admin");
		Assert.assertEquals(sysuser.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
