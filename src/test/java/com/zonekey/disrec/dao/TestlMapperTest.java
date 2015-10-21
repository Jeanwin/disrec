package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.UUID;

import org.jgroups.tests.perf.Data;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.zonekey.disrec.common.test.SpringTxTestCase;
import com.zonekey.disrec.entity.Testl;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class TestlMapperTest extends AbstractJUnit4SpringContextTests {
	@Autowired
	private TestlMapper testlMapper;
	
	@Test
	public void insertTestl() {
		//add
		Testl testl=new Testl("100", "aadf", 12, new Date());
		System.out.println(testlMapper.insertestl(testl));
	}

}
