package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.Area;
import com.zonekey.disrec.vo.AreaView;

/**
 * @Title: @{#} AreaMapperTest.java
 * @Description: <p>AreaMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class AreaMapperTest extends SpringTxTestCase{

	@Autowired
	private AreaMapper areaMapper;
	
	@Test
	public void findPage() throws Exception {
		List<AreaView> list = areaMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		AreaView area = new AreaView();
		area.setId("101");
		areaMapper.insert(area);
		Assert.assertNotNull(areaMapper.findOne("101"));
		
		//update
		/*area = areaMapper.findOne("101");
		area.setName("TEST");
		areaMapper.update(area);
		Assert.assertEquals(area.getName(), "TEST");*/
		
		// delete
		area.setModifydate(new Date());
		area.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		area.setModifyuser("admin");
		areaMapper.delete(area);
		Assert.assertEquals(area.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
