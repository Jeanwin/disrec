package com.zonekey.disrec.service;

import java.util.ArrayList;
import java.util.List;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.test.SpringTxTestCase;
import com.zonekey.disrec.entity.LectureChildren;

/**
 * @Title: @{#} TermServiceTest.java
 * @Description: <p>TermService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class LectureChildrenServiceTest extends SpringTxTestCase{

	@Autowired
	private LectureChildrenService lectureChildrenService;

//	@Test
	public void getTerm() {
		String id = "235fc919ea5a40e39e6b0ab21428cf48";
		List<LectureChildren> view = lectureChildrenService.findAll(id);
    	System.out.println(view);
	}
	@Test
	public void getTerm2() {
		String id = "4";
    	LectureChildren lectureChildren = new LectureChildren();
    	lectureChildren.setId(id);
    	lectureChildren.setParentid("235fc919ea5a40e39e6b0ab21428cf48");
    	lectureChildren.setChildKey("上课记录");
    	lectureChildren.setChildValue("填写上课内容");
    	lectureChildren.setSort(5);
    	lectureChildren.setDeleteflag("0");
    	System.out.println(lectureChildrenService.saveLectureChildren(lectureChildren));
	}
}
