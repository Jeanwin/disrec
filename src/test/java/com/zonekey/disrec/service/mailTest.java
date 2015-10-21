package com.zonekey.disrec.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.zonekey.disrec.service.mail.TemplateEmail;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class mailTest {

	@Autowired
	private TemplateEmail templateEmail;
	
	@Test
	public void run(){
		templateEmail.sendTemplateMail("qq", "", "qiulinaluye@163.com", "邮箱报警", "email.vm");
	}
}
