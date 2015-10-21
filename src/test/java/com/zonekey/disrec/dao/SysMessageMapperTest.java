package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.SysMessage;

/**
 * @Title: @{#} SysMessageMapperTest.java
 * @Description: <p>SysMessageMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class SysMessageMapperTest extends SpringTxTestCase{

	@Autowired
	private SysMessageMapper sysmessageMapper;
	
	@Test
	public void findPage() throws Exception {
		List<SysMessage> list = sysmessageMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		SysMessage sysmessage = new SysMessage();
		sysmessage.setId("101");
		sysmessageMapper.insert(sysmessage);
		Assert.assertNotNull(sysmessageMapper.findOne("101"));
		
		//update
		/*sysmessage = sysmessageMapper.findOne("101");
		sysmessage.setName("TEST");
		sysmessageMapper.update(sysmessage);
		Assert.assertEquals(sysmessage.getName(), "TEST");*/
		
		// delete
		sysmessage.setModifydate(new Date());
		sysmessage.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		sysmessage.setModifyuser("admin");
		sysmessageMapper.delete(sysmessage);
		Assert.assertEquals(sysmessage.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
