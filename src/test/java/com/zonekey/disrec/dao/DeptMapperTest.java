package com.zonekey.disrec.dao;

import java.util.List;

import junit.framework.Assert;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.test.SpringTxTestCase;
import com.zonekey.disrec.entity.Dept;
import com.zonekey.disrec.vo.DeptView;

/**
 * @Title: @{#} DeptMapperTest.java
 * @Description: <p>DeptMapper的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class DeptMapperTest extends SpringTxTestCase{

	@Autowired
	private DeptMapper deptMapper;
	
	@Test
	public void findPage() throws Exception {
//		List<DeptView> list = deptMapper.findAll();
	}
	
	@Test
	public void curd() throws Exception {
		//add
		Dept dept = new Dept();
		dept.setId("3eee1f7c63334971b13f3881af34c509");
//		deptMapper.update(dept);
		Assert.assertNotNull(deptMapper.findOne("101"));
		
		//update
		/*dept = deptMapper.findOne("101");
		dept.setName("TEST");
		deptMapper.update(dept);
		Assert.assertEquals(dept.getName(), "TEST");*/
		
		// delete
//		dept.setModifydate(new Date());
//		dept.setDeleteflag(AppConstants.IS_STATUS_DELETE);
//		dept.setModifyuser("admin");
//		//deptMapper.delete(dept);
//		Assert.assertEquals(dept.getDeleteflag(), AppConstants.IS_STATUS_DELETE);
	}
}
