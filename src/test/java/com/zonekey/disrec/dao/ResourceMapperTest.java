package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.Resource;

/**
 * @Title: @{#} ResourceMapperTest.java
 * @Description: <p>ResourceMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class ResourceMapperTest extends SpringTxTestCase{

	@Autowired
	private ResourceMapper resourceMapper;
	
	@Test
	public void findPage() throws Exception {
		List<Resource> list = resourceMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		Resource resource = new Resource();
		resource.setId("101");
		resourceMapper.insert(resource);
		Assert.assertNotNull(resourceMapper.findOne("101"));
		
		//update
		/*resource = resourceMapper.findOne("101");
		resource.setName("TEST");
		resourceMapper.update(resource);
		Assert.assertEquals(resource.getName(), "TEST");*/
		
		// delete
		resource.setModifydate(new Date().toString());
		resource.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		resource.setModifyuser("admin");
		resourceMapper.delete(resource);
		Assert.assertEquals(resource.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
