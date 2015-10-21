package com.zonekey.disrec.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.zonekey.disrec.entity.Email;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class EmailMapperTest extends AbstractJUnit4SpringContextTests{

	@Autowired
	private EmailMapper emailMapper;
	
	@Test
	public void run(){
		//增加
		/*List<Email> list = new ArrayList<Email>();
		Email email = new Email();
		email.setId("003");
		email.setDeleteFlag("0");
		email.setEmail("qq@163.com");
		email.setCreateuser("qq");
		Email email1 = new Email();
		email1.setId("004");
		email1.setDeleteFlag("0");
		email1.setCreateuser("qq");
		email1.setEmail("qq1@163.com");
		list.add(email1);
		list.add(email);
		System.out.println(emailMapper.insert(list));*/
		//修改
		/*Email email = new Email();
		email.setId("003");
		email.setDeleteFlag("0");
		System.out.println(emailMapper.updateByPrimaryKeySelective(email));*/
		//删除
		Map map = new HashMap<String, String>();
		map.put("id", "003");
		Map map1 = new HashMap<String, String>();
		map1.put("id", "004");
		List list = new ArrayList<Map<String, Object>>();
		list.add(map);

		System.out.println(emailMapper.deleteByKeys(list));
		//查询
		/*List<Email> emails = emailMapper.getEmails();
		System.out.println(emails.size());*/
	}
}
