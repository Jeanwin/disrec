package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.Device;

/**
 * @Title: @{#} DeviceMapperTest.java
 * @Description: <p>DeviceMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class DeviceMapperTest extends SpringTxTestCase{

	@Autowired
	private DeviceMapper deviceMapper;
	
	@Test
	public void findPage() throws Exception {
		
	}
	
	@Test
	public void curd() throws Exception {
		
	}
}
