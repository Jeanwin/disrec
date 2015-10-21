package com.zonekey.disrec.dao;

import java.util.Date;
import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.test.SpringTxTestCase;

import com.zonekey.disrec.entity.SysCode;

/**
 * @Title: @{#} SysCodeMapperTest.java
 * @Description: <p>SysCodeMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class SysCodeMapperTest extends SpringTxTestCase{

	@Autowired
	private SysCodeMapper syscodeMapper;
	
	@Test
	public void findPage() throws Exception {
		List<SysCode> list = syscodeMapper.findByPage(1, 5);
		Assert.assertEquals(5, list.size());
	}
	
	@Test
	public void findSopeAll() throws Exception {
		List<SysCode> list = syscodeMapper.findSopeAll("10");
		for (SysCode sysCode : list) {
			System.out.println(sysCode.getName());
		}
	}
	
	@Test
	public void curd() throws Exception {
		//add
		SysCode syscode = new SysCode();
		syscode.setId("101");
		syscodeMapper.insert(syscode);
		Assert.assertNotNull(syscodeMapper.findOne("101"));
		
		//update
		/*syscode = syscodeMapper.findOne("101");
		syscode.setName("TEST");
		syscodeMapper.update(syscode);
		Assert.assertEquals(syscode.getName(), "TEST");*/
		
		// delete
		syscode.setModifydate(new Date());
		syscode.setDeleteflag(AppConstants.IS_STATUS_DELETE);
		syscode.setModifyuser("admin");
		syscodeMapper.delete(syscode);
		Assert.assertEquals(syscode.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
