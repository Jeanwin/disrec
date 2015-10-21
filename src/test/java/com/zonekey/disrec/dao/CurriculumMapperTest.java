package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.Curriculum;

/**
 * @Title: @{#} CurriculumMapperTest.java
 * @Description: <p>CurriculumMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class CurriculumMapperTest extends SpringTxTestCase{

	@Autowired
	private CurriculumMapper curriculumMapper;
	
	@Test
	public void findPage() throws Exception {
		List<Curriculum> list = curriculumMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		Curriculum curriculum = new Curriculum();
		curriculum.setId("101");
		curriculumMapper.insert(curriculum);
//		Assert.assertNotNull(curriculumMapper.findOne("101"));
//		
//		//update
//		/*curriculum = curriculumMapper.findOne("101");
//		curriculum.setName("TEST");
//		curriculumMapper.update(curriculum);
//		Assert.assertEquals(curriculum.getName(), "TEST");*/
//		
//		// delete
//		curriculum.setModifydate(new Date());
//		curriculum.setDeleteflag(AppConstants.IS_STATUS_DELETE);
//		curriculum.setModifyuser("admin");
//		curriculumMapper.delete(curriculum);
//		Assert.assertEquals(curriculum.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
