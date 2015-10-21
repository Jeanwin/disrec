package com.zonekey.disrec.service;

import junit.framework.Assert;




import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.test.SpringTxTestCase;
import com.zonekey.disrec.service.TermService;
import com.zonekey.disrec.entity.Term;

/**
 * @Title: @{#} TermServiceTest.java
 * @Description: <p>TermService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class TermServiceTest extends SpringTxTestCase{

	@Autowired
	private TermService termService;

	@Test
	public void getTerm() {
		Term term = termService.getTerm("1");
	}

//	@Test
	public void findPageBy() {
		Page<Term> page = termService.findPageBy(1, 10);
		for (Term term : page) {
			Assert.assertNotNull(term);
		}
	}
}
