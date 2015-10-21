package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.DeviceControl;

/**
 * @Title: @{#} DeviceControlMapperTest.java
 * @Description: <p>DeviceControlMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class DeviceControlMapperTest extends SpringTxTestCase{

	@Autowired
	private DeviceControlMapper devicecontrolMapper;
	
	@Test
	public void findPage() throws Exception {
		List<DeviceControl> list = devicecontrolMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		DeviceControl devicecontrol = new DeviceControl();
		devicecontrol.setId("101");
		devicecontrolMapper.insert(devicecontrol);
		Assert.assertNotNull(devicecontrolMapper.findOne("101"));
		
		//update
		/*devicecontrol = devicecontrolMapper.findOne("101");
		devicecontrol.setName("TEST");
		devicecontrolMapper.update(devicecontrol);
		Assert.assertEquals(devicecontrol.getName(), "TEST");*/
		
		// delete
		devicecontrol.setModifydate(new Date());
		devicecontrol.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		devicecontrol.setModifyuser("admin");
		devicecontrolMapper.delete(devicecontrol);
		Assert.assertEquals(devicecontrol.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
