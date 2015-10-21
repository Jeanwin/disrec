package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.Curriculumbase;

/**
 * @Title: @{#} CurriculumbaseMapperTest.java
 * @Description: <p>CurriculumbaseMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class CurriculumbaseMapperTest extends SpringTxTestCase{

	@Autowired
	private CurriculumbaseMapper curriculumbaseMapper;
	
	@Test
	public void findPage() throws Exception {
		List<Curriculumbase> list = curriculumbaseMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		Curriculumbase curriculumbase = new Curriculumbase();
		curriculumbase.setId("101");
		curriculumbaseMapper.insert(curriculumbase);
		Assert.assertNotNull(curriculumbaseMapper.findOne("101"));
		
		//update
		/*curriculumbase = curriculumbaseMapper.findOne("101");
		curriculumbase.setName("TEST");
		curriculumbaseMapper.update(curriculumbase);
		Assert.assertEquals(curriculumbase.getName(), "TEST");*/
		
		// delete
		curriculumbase.setModifydate(new Date());
		curriculumbase.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		curriculumbase.setModifyuser("admin");
		curriculumbaseMapper.delete(curriculumbase);
		Assert.assertEquals(curriculumbase.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
