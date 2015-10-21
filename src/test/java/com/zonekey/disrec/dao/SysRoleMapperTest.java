package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.SysRole;

/**
 * @Title: @{#} SysRoleMapperTest.java
 * @Description: <p>SysRoleMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class SysRoleMapperTest extends SpringTxTestCase{

	@Autowired
	private SysRoleMapper sysroleMapper;
	
	@Test
	public void findPage() throws Exception {
		List<SysRole> list = sysroleMapper.findByPage(1, 5);
	}
	
	@Test
	public void curd() throws Exception {
		System.out.println(111);
		//add
		SysRole sysrole = new SysRole();
		sysrole.setId("101");
		sysroleMapper.insert(sysrole);
//		Assert.assertNotNull(sysroleMapper.findOne("101"));
//		
//		//update
//		/*sysrole = sysroleMapper.findOne("101");
//		sysrole.setName("TEST");
//		sysroleMapper.update(sysrole);
//		Assert.assertEquals(sysrole.getName(), "TEST");*/
//		
//		// delete
//		sysrole.setModifydate(new Date());
//		sysrole.setDeleteflag(AppConstants.IS_STATUS_DELETE);
//		sysrole.setModifyuser("admin");
//		sysroleMapper.delete(sysrole);
		
//		Assert.assertEquals(sysrole.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
