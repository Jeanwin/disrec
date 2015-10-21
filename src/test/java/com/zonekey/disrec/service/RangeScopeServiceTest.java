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

import com.zonekey.disrec.service.RangeScopeService;
import com.zonekey.disrec.entity.RangeScope;

/**
 * @Title: @{#} RangeScopeServiceTest.java
 * @Description: <p>RangeScopeService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class RangeScopeServiceTest extends SpringTxTestCase{

	@Autowired
	private RangeScopeService rangescopeService;

	@Test
	public void getRangeScope() {
		RangeScope rangescope = rangescopeService.getRangeScope("1");
		Assert.assertNotNull(rangescope);
	}

	@Test
	public void findPageBy() {
		Page<RangeScope> page = rangescopeService.findPageBy(1, 10);
		for (RangeScope rangescope : page) {
			Assert.assertNotNull(rangescope);
		}
	}
}
