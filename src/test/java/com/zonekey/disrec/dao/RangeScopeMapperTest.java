package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.RangeScope;

/**
 * @Title: @{#} RangeScopeMapperTest.java
 * @Description: <p>RangeScopeMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class RangeScopeMapperTest extends SpringTxTestCase{

	@Autowired
	private RangeScopeMapper rangescopeMapper;
	
	@Test
	public void findPage() throws Exception {
		List<RangeScope> list = rangescopeMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		RangeScope rangescope = new RangeScope();
		rangescope.setId("101");
		rangescopeMapper.insert(rangescope);
		Assert.assertNotNull(rangescopeMapper.findOne("101"));
		
		//update
		/*rangescope = rangescopeMapper.findOne("101");
		rangescope.setName("TEST");
		rangescopeMapper.update(rangescope);
		Assert.assertEquals(rangescope.getName(), "TEST");*/
		
		// delete
		rangescope.setModifydate(new Date());
		rangescope.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		rangescope.setModifyuser("admin");
		rangescopeMapper.delete(rangescope);
		Assert.assertEquals(rangescope.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
