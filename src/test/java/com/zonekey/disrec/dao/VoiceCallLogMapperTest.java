package com.zonekey.disrec.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.zonekey.disrec.entity.VoiceCallLog;
import com.zonekey.disrec.service.VoiceCallLogService;
import com.zonekey.disrec.vo.PageBean;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class VoiceCallLogMapperTest {

	@Autowired
	private VoiceCallLogService voiceCallLogService;
	@Autowired
	private VoiceCallLogMapper voiceCallLogMapper;
	@Test
	public void run1(){
		//增加或修改
		/*VoiceCallLog voiceCallLog = new VoiceCallLog();
		voiceCallLog.setMac("D050993DEF36");
		voiceCallLog.setCallerFlag("0");
		voiceCallLogService.saveVoiceCallLog(voiceCallLog);*/
		//voiceCallLogService.saveVoiceCallTime("D050993DEF36","0");
		//voiceCallLogService.saveVoiceCallTime("D050993DEF36","1");
		//查询
		PageBean pageBean = new PageBean();
		Map<String, Object> page = new HashMap<String, Object>();
		page.put("offset", 0);
		page.put("limit", 10);
		pageBean.setPage(page);
		/*Map<String, Object> map = new HashMap<String, Object>();
		map.put("startTime","2015-06-16");
		map.put("endTime", "2015-06-19");
		map.put("callerPerson", "中软");
		map.put("calledPerson", "中软");
		//map.put("source", "中软");
		pageBean.setKeywords(map);*/
		voiceCallLogService.findPageBy(pageBean);
		/*System.out.println(list);
		long count = voiceCallLogMapper.count(pageBean);
		System.out.println(count);
		System.out.println(list.size());*/
	}
}
