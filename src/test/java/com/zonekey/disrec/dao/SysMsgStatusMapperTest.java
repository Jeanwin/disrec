package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.SysMsgStatus;

/**
 * @Title: @{#} SysMsgStatusMapperTest.java
 * @Description: <p>SysMsgStatusMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class SysMsgStatusMapperTest extends SpringTxTestCase{

	@Autowired
	private SysMsgStatusMapper sysmsgstatusMapper;
	
	@Test
	public void findPage() throws Exception {
		List<SysMsgStatus> list = sysmsgstatusMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		SysMsgStatus sysmsgstatus = new SysMsgStatus();
		sysmsgstatus.setId("101");
		sysmsgstatusMapper.insert(sysmsgstatus);
		Assert.assertNotNull(sysmsgstatusMapper.findOne("101"));
		
		//update
		/*sysmsgstatus = sysmsgstatusMapper.findOne("101");
		sysmsgstatus.setName("TEST");
		sysmsgstatusMapper.update(sysmsgstatus);
		Assert.assertEquals(sysmsgstatus.getName(), "TEST");*/
		
		// delete
		sysmsgstatus.setModifydate(new Date());
		sysmsgstatus.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		sysmsgstatus.setModifyuser("admin");
		sysmsgstatusMapper.delete(sysmsgstatus);
		Assert.assertEquals(sysmsgstatus.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
