package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.Term;

/**
 * @Title: @{#} TermMapperTest.java
 * @Description: <p>TermMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class TermMapperTest extends SpringTxTestCase{

	@Autowired
	private TermMapper termMapper;
	
	@Test
	public void findPage() throws Exception {
		List<Term> list = termMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void curd() throws Exception {
		//add
		Term term = new Term();
		term.setId("101");
		termMapper.insert(term);
		Assert.assertNotNull(termMapper.findOne("101"));
		
		//update
		/*term = termMapper.findOne("101");
		term.setName("TEST");
		termMapper.update(term);
		Assert.assertEquals(term.getName(), "TEST");*/
		
		// delete
		term.setModifydate(new Date());
		term.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		term.setModifyuser("admin");
		termMapper.delete(term);
		Assert.assertEquals(term.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
