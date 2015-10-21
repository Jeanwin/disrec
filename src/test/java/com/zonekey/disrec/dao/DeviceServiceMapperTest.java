package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.DeviceService;

/**
 * @Title: @{#} DeviceServiceMapperTest.java
 * @Description: <p>DeviceServiceMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class DeviceServiceMapperTest extends SpringTxTestCase{

	@Autowired
	private DeviceServiceMapper deviceserviceMapper;
	
	@Test
	public void findPage() throws Exception {
		List<DeviceService> list = deviceserviceMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		DeviceService deviceservice = new DeviceService();
		deviceservice.setId("101");
		deviceserviceMapper.insert(deviceservice);
		Assert.assertNotNull(deviceserviceMapper.findOne("101"));
		
		//update
		/*deviceservice = deviceserviceMapper.findOne("101");
		deviceservice.setName("TEST");
		deviceserviceMapper.update(deviceservice);
		Assert.assertEquals(deviceservice.getName(), "TEST");*/
		
		// delete
		deviceservice.setModifydate(new Date());
		deviceservice.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		deviceservice.setModifyuser("admin");
		deviceserviceMapper.delete(deviceservice);
		Assert.assertEquals(deviceservice.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
