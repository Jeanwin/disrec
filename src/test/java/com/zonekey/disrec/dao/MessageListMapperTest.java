package com.zonekey.disrec.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.zonekey.disrec.common.utils.DateUtils;
import com.zonekey.disrec.entity.MessageList;
import com.zonekey.disrec.service.MessageListService;
import com.zonekey.disrec.vo.PageBean;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class MessageListMapperTest {

	@Autowired
	private MessageListService messageListService;
	@Autowired
	private MessageListMapper messageListMapper;
	@Test
	public void run1(){
		//增加或修改
		MessageList messageList = new MessageList();
		messageList.setId("3");
		messageList.setTitle("from system 投影仪线掉了哇哈哈");
		messageList.setTime("2015/01/23");
		messageListMapper.saveMessageList(messageList);
		//删除
		/*Map map = new HashMap<String, String>();
		map.put("id", "1");
		List list = new ArrayList<Map<String, Object>>();
		list.add(map);
		System.out.println(messageListMapper.deleteMessageList(list));*/
		//查询
		/*PageBean pageBean = new PageBean();
		Map<String, Object> page = new HashMap<String, Object>();
		page.put("offset", 0);
		page.put("limit", 10);
		pageBean.setPage(page);
		System.out.println(messageListService.findPageBy(pageBean).getContent());*/
		/*System.out.println(messageListService.delMessageList("f57e5b2451604388934652bd5b40dd92"));*/
		/*Map map = new HashMap<String, String>();
		map.put("id", "1717f5144f1a4150b260365d89b9f0c3");
		Map map1 = new HashMap<String, String>();
		map1.put("id", "2c625fd582c1454d9b7700fc7efd1559");
		Map map2 = new HashMap<String, String>();
		map2.put("id", "879592e4ea784d75bde6a99648a1ed21");
		Map map3 = new HashMap<String, String>();
		map3.put("id", "ae949780365d460cb1c5226a4352fbb9");
		Map map4 = new HashMap<String, String>();
		map4.put("id", "b6aca97078424e65b45675536dda8f49");
		List list = new ArrayList<Map<String, Object>>();
		list.add(map);
		list.add(map1);
		list.add(map2);
		list.add(map3);
		list.add(map4);
		
		messageListService.updateReadFlag(list);*/
	}
}
