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
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.service.SysMsgStatusService;
import com.zonekey.disrec.entity.SysMsgStatus;

/**
 * @Title: @{#} SysMsgStatusServiceTest.java
 * @Description: <p>SysMsgStatusService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class SysMsgStatusServiceTest extends SpringTxTestCase{

	@Autowired
	private SysMsgStatusService sysmsgstatusService;

	@Test
	public void getSysMsgStatus() {
		SysMsgStatus sysmsgstatus = sysmsgstatusService.getSysMsgStatus("1");
		Assert.assertNotNull(sysmsgstatus);
	}

	@Test
	public void findPageBy() {
		Page<SysMsgStatus> page = sysmsgstatusService.findPageBy(1, 10);
		for (SysMsgStatus sysmsgstatus : page) {
			Assert.assertNotNull(sysmsgstatus);
		}
	}
}
