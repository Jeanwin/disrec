package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.Range;

/**
 * @Title: @{#} RangeMapperTest.java
 * @Description: <p>RangeMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class RangeMapperTest extends SpringTxTestCase{

	@Autowired
	private RangeMapper rangeMapper;
	
	@Test
	public void findPage() throws Exception {
		List<Range> list = rangeMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		Range range = new Range();
		range.setId("101");
		rangeMapper.insert(range);
		Assert.assertNotNull(rangeMapper.findOne("101"));
		
		//update
		/*range = rangeMapper.findOne("101");
		range.setName("TEST");
		rangeMapper.update(range);
		Assert.assertEquals(range.getName(), "TEST");*/
		
		// delete
		range.setModifydate(new Date());
		range.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		range.setModifyuser("admin");
		rangeMapper.delete(range);
		Assert.assertEquals(range.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
