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
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.LectureMapper;
import com.zonekey.disrec.service.TermService;
import com.zonekey.disrec.vo.LectureView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.ReviewView;
import com.zonekey.disrec.vo.StudyRecordView;
import com.zonekey.disrec.entity.LectureChildren;
import com.zonekey.disrec.entity.PlateForm;
import com.zonekey.disrec.entity.ReviewChildren;
import com.zonekey.disrec.entity.Term;

/**
 * @Title: @{#} TermServiceTest.java
 * @Description: <p>TermService的CRUD测试.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@ContextConfiguration(locations={"/applicationContext.xml"})
public class ReviewServiceTest extends SpringTxTestCase{

	@Autowired
	private ReviewService reviewService;
	@Autowired
	private ActiveService activeService;
	@Autowired
	private StudyRecordViewService studyRecordViewService;
	@Test
	public void getActicve() {
//		activeService.findOne(id);
		PageBean pageBean = new PageBean();
		 Map<String,Object> page = new HashMap<String, Object>(); 
		 page.put("limit", 10);
		 page.put("offset", 0);
		 pageBean.setPage(page);
//		System.out.println(activeService.findPageBy(pageBean));
		 Map<String,Object> map = studyRecordViewService.findPageByPageBean(pageBean);
		 System.out.println(map.get("data"));
		 
		 List<StudyRecordView> view  = (List<StudyRecordView>) map.get("data");
		 System.out.println(view);
	}
	
//	@Test
	public void getTerm() {
		String id = "1";
		ReviewView view = reviewService.findOne(id);
		List<ReviewView> plist = new ArrayList<ReviewView>();
    	plist.add(view);
    	System.out.println(plist);
	} 
//	@Test
	public void getpage() {
		PageBean pageBean = new PageBean();
		 Map<String,Object> page = new HashMap<String, Object>(); 
		 page.put("limit", 1);
		 page.put("offset", 0);
		 pageBean.setPage(page);
		System.out.println(reviewService.findPageByPageBean(pageBean));
//		Page<ReviewView> p= reviewService.findPageBy(0,10);
//    	System.out.println(p.getTotalElements());
//    	System.out.println(p.getContent());
		System.out.println();
	}
//	@Test
	public void save() {
		ReviewView lectureView = new ReviewView();
		lectureView.setName("2015教师同行评价表5");
		lectureView.setDescription("2015教师同行评价表5");
		lectureView.setUsetimes(2);
		lectureView.setAssess(1);
		lectureView.setMarkType("1");
		lectureView.setDeleteflag("0");
		List<ReviewChildren> list = new ArrayList<ReviewChildren>();
		
		ReviewChildren lectureChildren = new ReviewChildren();
		lectureChildren.setId(IdUtils.uuid2());
		lectureChildren.setParentid("0");
		lectureChildren.setChildKey("评价表5一级分类1");
		lectureChildren.setChildValue(20);
		lectureChildren.setSort(1);
		lectureChildren.setDeleteflag("0");
		list.add(lectureChildren);
		
	ReviewChildren lectureChildren1_1 = new ReviewChildren();
	lectureChildren1_1.setId(IdUtils.uuid2());
	lectureChildren1_1.setParentid(lectureChildren.getId());
	lectureChildren1_1.setChildKey("评价表5要点1");
	lectureChildren1_1.setChildValue(5);
	lectureChildren1_1.setSort(1);
	lectureChildren1_1.setDeleteflag("0");
	list.add(lectureChildren1_1);
	
	ReviewChildren lectureChildren1_2 = new ReviewChildren();
	lectureChildren1_2.setId(IdUtils.uuid2());
	lectureChildren1_2.setParentid(lectureChildren.getId());
	lectureChildren1_2.setChildKey("评价表5要点2");
	lectureChildren1_2.setChildValue(5);
	lectureChildren1_2.setSort(2);
	lectureChildren1_2.setDeleteflag("0");
	list.add(lectureChildren1_2);
	
	ReviewChildren lectureChildren1_3 = new ReviewChildren();
	lectureChildren1_3.setId(IdUtils.uuid2());
	lectureChildren1_3.setParentid(lectureChildren.getId());
	lectureChildren1_3.setChildKey("评价表5要点3");
	lectureChildren1_3.setChildValue(10);
	lectureChildren1_3.setSort(3);
	lectureChildren1_3.setDeleteflag("0");
	list.add(lectureChildren1_3);
		
		ReviewChildren lectureChildren2 = new ReviewChildren();
		lectureChildren2.setId(IdUtils.uuid2());
		lectureChildren2.setParentid("0");
		lectureChildren2.setChildKey("评价表5一级分类2");
		lectureChildren2.setChildValue(20);
		lectureChildren2.setSort(2);
		lectureChildren2.setDeleteflag("0");
		list.add(lectureChildren2);
		
		ReviewChildren lectureChildren2_1 = new ReviewChildren();
		lectureChildren2_1.setId(IdUtils.uuid2());
		lectureChildren2_1.setParentid(lectureChildren2.getId());
		lectureChildren2_1.setChildKey("评价表5要点1");
		lectureChildren2_1.setChildValue(8);
		lectureChildren2_1.setSort(1);
		lectureChildren2_1.setDeleteflag("0");
		list.add(lectureChildren2_1);
		
		ReviewChildren lectureChildren2_2 = new ReviewChildren();
		lectureChildren2_2.setId(IdUtils.uuid2());
		lectureChildren2_2.setParentid(lectureChildren2.getId());
		lectureChildren2_2.setChildKey("评价表5要点2");
		lectureChildren2_2.setChildValue(8);
		lectureChildren2_2.setSort(2);
		lectureChildren2_2.setDeleteflag("0");
		list.add(lectureChildren2_2);
		
		ReviewChildren lectureChildren3_3 = new ReviewChildren();
		lectureChildren3_3.setId(IdUtils.uuid2());
		lectureChildren3_3.setParentid(lectureChildren2.getId());
		lectureChildren3_3.setChildKey("评价表5要点3");
		lectureChildren3_3.setChildValue(4);
		lectureChildren3_3.setSort(3);
		lectureChildren3_3.setDeleteflag("0");
		list.add(lectureChildren3_3);
		
		lectureView.setChildList(list);
		reviewService.saveReview(lectureView);
//		lectureMapper.insertSelective(lectureView);
	}
}
