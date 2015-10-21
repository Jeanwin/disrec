package com.zonekey.disrec.service;

import junit.framework.Assert;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.internal.runners.statements.Fail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.test.SpringTxTestCase;
import com.zonekey.disrec.service.SysCodeService;
import com.zonekey.disrec.entity.SysCode;

/**
 * @Title: @{#} SysCodeServiceTest.java
 * @Description: <p>SysCodeService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class SysCodeServiceTest extends SpringTxTestCase{

	@Autowired
	private SysCodeService syscodeService;

	@Test
	public void getSysCode() {
		SysCode syscode = syscodeService.getSysCode("1");
		Assert.assertNotNull(syscode);
	}

	@Test
	public void findPageBy() {
//		Page<SysCode> page = syscodeService.findPageBy(1, 10);
//		for (SysCode syscode : page) {
//			Assert.assertNotNull(syscode);
//		}
	}
	
	@Test
	public void findDiviceType() {
		List<Map<String,Object>> list = syscodeService.findDiviceType();
		 if(list!=null){
	        	for(int i=0;i<list.size();i++){
	        		Map<String,Object> map=list.get(i);
	        		System.out.println(map.size());
	        	}
	        }
	}
	
	@Test
	public void findSopeAll() {
		try {
			List<SysCode> list = syscodeService.findSopeAll("10");
			for (SysCode syscode : list) {
				Assert.assertNotNull(syscode);
				System.out.println(syscode.getName());
			}
		} catch (Exception e) {
			
		}
		
	}
}


