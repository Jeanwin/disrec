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

import com.zonekey.disrec.service.ManualVideoService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class ManualVideoMapperTest {

	@Autowired
	private ManualVideoService manualVideoService;
	@Autowired
	private ManualVideoMapper manualVideoMapper;
	
	@Test
	public void run(){
		/*ManualVideo manualVideo = new ManualVideo();
		manualVideo.setAreaId("13347a54ede748cb87eb352963a9b9ab");
		manualVideo.setTitle("3100测试班级录像");
		manualVideo.setUserId("23ace6022835432095e74a47e83e551a");
		manualVideo.setInnerId("1234");
		manualVideo.setIp("192.168.13.122");
		manualVideo.setUploadWay("1");
		manualVideo.setModelValue("33");
		System.out.println(manualVideoService.saveManualVideo(manualVideo));*/
		Map map = new HashMap<String, String>();
		map.put("id", "7e695c3805b0455793c065c7ebc74e45");
		List list = new ArrayList<Map<String, Object>>();
		list.add(map);
		System.out.println(manualVideoService.delete(list));
		/*PageBean pageBean = new PageBean();
		Map<String, Object> page = new HashMap<String, Object>();
		page.put("offset", 0);
		page.put("limit", 10);
		pageBean.setPage(page);
		System.out.println(manualVideoMapper.count(pageBean));
		System.out.println(manualVideoMapper.findByPage(pageBean));*/
		/*System.out.println(manualVideoService.updateEndTime("c03a6deddd1847bfbd48254f016645b1"));*/
		//System.out.println(manualVideoService.getManualVideoByAreaId("13347a54ede748cb87eb352963a9b9ab"));
	}
}
