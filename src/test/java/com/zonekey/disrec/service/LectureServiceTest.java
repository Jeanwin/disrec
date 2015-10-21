package com.zonekey.disrec.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import junit.framework.Assert;













import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.test.context.ContextConfiguration;

import com.zonekey.disrec.common.test.SpringTxTestCase;
import com.zonekey.disrec.dao.LectureMapper;
import com.zonekey.disrec.service.TermService;
import com.zonekey.disrec.vo.LectureView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.entity.LectureChildren;
import com.zonekey.disrec.entity.PlateForm;
import com.zonekey.disrec.entity.Term;

/**
 * @Title: @{#} TermServiceTest.java
 * @Description: <p>TermService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class LectureServiceTest extends SpringTxTestCase{

	@Autowired
	private LectureService lectureService;
	@Autowired
	private LectureMapper lectureMapper;

//	@Test
	public void getTerm() {
		String id = "1";
		LectureView view = lectureService.findOne(id);
		List<LectureView> plist = new ArrayList<LectureView>();
    	plist.add(view);
    	System.out.println(plist);
	} 
	@Test
	public void getpage() {
		PageBean pageBean = new PageBean();
		 Map<String,Object> page = new HashMap<String, Object>(); 
		 page.put("limit", 2);
		 page.put("offset", 1);
		 pageBean.setPage(page);	
//		Page<LectureView> p= lectureService.findPageBy(0,10);
		Map<String, Object> p= lectureService.findPageBy(pageBean);
    	System.out.println(p);
	}
//	@Test
	public void save() {
		LectureView lectureView = new LectureView();
//		lectureView.setId("2");
		lectureView.setLectureName("2015听课表模板");
		lectureView.setDescription("高一语文教研组");
		lectureView.setUsetimes(2);
		lectureView.setStatus("0");
		lectureView.setDeleteflag("0");
		
		List<LectureChildren> list = new ArrayList<LectureChildren>();
		
		LectureChildren lectureChildren = new LectureChildren();
		lectureChildren.setChildKey("听课记录");
		lectureChildren.setChildValue("填写听课内容");
		lectureChildren.setSort(1);
		lectureChildren.setDeleteflag("0");
		list.add(lectureChildren);
		LectureChildren lectureChildren1 = new LectureChildren();
		lectureChildren1.setChildKey("课堂评价");
		lectureChildren1.setChildValue("课堂评价");
		lectureChildren1.setSort(2);
		lectureChildren1.setDeleteflag("0");
		list.add(lectureChildren1);
		LectureChildren lectureChildren2 = new LectureChildren();
		lectureChildren2.setChildKey("教学建议");
		lectureChildren2.setChildValue("教学建议");
		lectureChildren2.setSort(3);
		lectureChildren2.setDeleteflag("0");
		list.add(lectureChildren2);
		lectureView.setChildList(list);
		lectureService.saveLecture(lectureView);
//		lectureMapper.insertSelective(lectureView);
	}
}
