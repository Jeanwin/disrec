/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;



import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.DateTermUtil;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.DateUtils;
import com.zonekey.disrec.dao.StudyRecordViewMapper;
import com.zonekey.disrec.entity.LectureChildren;
import com.zonekey.disrec.entity.Term;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.LectureView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.StudyRecordView;

/**
 * xufeixiang 15.04.20
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class StudyRecordViewService extends BaseService {

	@Autowired
	private StudyRecordViewMapper studyRecordViewMapper;
	@Autowired
	private TermService termservice;
	@Autowired
	private DeptService deptService;
	@Autowired
	private LectureChildrenService lectureChildrenService;
	

	public Map<String, Object> findPageByPageBean(PageBean pageBean) {
		long total = studyRecordViewMapper.findCount(pageBean);
		List<StudyRecordView> list = studyRecordViewMapper.findPageByPageBean(pageBean);
		Map<String, String> subjectMap = new HashMap<String, String>();
		for(StudyRecordView view : list){
			String content = view.getContent() =="" ?null:view.getContent();
			List<Map<String,Object>> list1 = JsonUtil.jsonToObject(content, List.class);
			
			if(list1 != null){
			
			for(Map<String,Object> map : list1){
				String id = (String) map.get("id");
				LectureChildren viewChildren = lectureChildrenService.findOne(id);
				if(viewChildren != null){
					map.put("childKey", viewChildren.getChildKey());
					map.put("childValue", viewChildren.getChildValue());
				}
			}
			view.setProperties(list1);
			}
			
			if(view.getType().equals("1")){//对应课表
				subjectMap = studyRecordViewMapper.getSubectByCurriculum(view);
			}else if(view.getType().equals("2")){//对应资源
				subjectMap = studyRecordViewMapper.getSubectByResource(view);
			}else if(view.getType().equals("3")){//对应活动
				subjectMap = studyRecordViewMapper.getSubectByWorks(view);
			}
			
			if(subjectMap != null){
			view.setSubjectname(subjectMap.get("subjectname"));
			view.setSubjectattribute(subjectMap.get("subjectattribute"));
			}
//			System.out.println(DateUtils.format(view.getCreateDate(), "yyyy-MM-dd HH:mm:ss"));
		}
		
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("total", total);
		map.put("data", list);
		
		return map;
	}


	public int deleteView(StudyRecordView studyRecordView) {
		studyRecordViewMapper.delete(studyRecordView);
		return 1;
	}


	public Map<String, Object> getViewList(Map<String, Object> reqMap) {
		 Map<String, Object> resuktmap = new HashMap<String, Object>();
		String type =  reqMap.get("type").toString();
		List<Map<String, Object>>  list = (List<Map<String, Object>>) reqMap.get("dept");
//		处理reqMap
		reqMap = handleReqMap(reqMap);
//		计算天数
		long count = getTimeCount(reqMap);
//		当小于十天时，用天数 ；反之，用周
		List<String> timeList = getTimeList(reqMap,count);
		if(type.equals("1")){//听课
			resuktmap = lecture(list,reqMap,count,timeList);
		}else{//评课
			resuktmap = review(list,reqMap,count,timeList);
		}
		return resuktmap;
	}
	/**
	 * @param list
	 * @param reqMap
	 * @param count
	 * @param timeList
	 * @return
	 */
	private Map<String, Object> review(List<Map<String, Object>> list, Map<String, Object> reqMap,
			long count, List<String> timeList) {
		
		List<Map<String, Object>> mapList2 = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> mapList4 = new ArrayList<Map<String,Object>>();
		
		 Map<String, Object> resuktmap = new HashMap<String, Object>();
		 
			PageBean pageBean1 = new PageBean();
			pageBean1.setKeywords(reqMap);
			mapList4 = getReviewByTime(mapList4,pageBean1,count,timeList);

		//评课
		if(list.size() == 0){
//			PageBean pageBean = new PageBean();
//			pageBean.setKeywords(reqMap);
//			mapList2 = getReviewByDept(mapList2,pageBean);
//			mapList4 = getReviewByTime(mapList4,pageBean,count,timeList);
			 List<Map<String, Object>> strList = deptService.findAll(null);
			 for(Map<String, Object> ids : strList){
				 PageBean pageBean = new PageBean();
				 pageBean.setKeywords(reqMap);
				 pageBean.setKeywords(ids);
				 mapList2.addAll( getLectureByDept(mapList2,pageBean));
				}
			
		}else{
			for(Map<String, Object> map:list){
				PageBean pageBean = new PageBean();
				reqMap.remove("dept");
				map.putAll(reqMap);
				pageBean.setKeywords(map);
//				听课  以机构分组
				mapList2.addAll(getReviewByDept(mapList2,pageBean));
//				mapList4 = getReviewByTime(mapList4,pageBean,count,timeList);
			}
		}
			resuktmap.put("deptType", mapList2);
			resuktmap.put("timeType", mapList4);
		return resuktmap;
	
		
	}


	private List<Map<String, Object>> getReviewByTime(List<Map<String, Object>> mapList, PageBean pageBean,
			long count, List<String> timeList) {
		mapList = new ArrayList<Map<String,Object>>();
		if(count <= AppConstants.LIMIT_DATE){
			mapList = studyRecordViewMapper.findReviewCountByTime(pageBean);
			fillIntoList(mapList,timeList);
		}else{
			mapList = studyRecordViewMapper.findReviewCountByWeekTime(pageBean);
			fillIntoList(mapList,timeList);
		}
		for(int i=0;i<mapList.size();i++){
			Map<String, Object> map = mapList.get(i);
			map.put("time", (i+1) + "");
		}
		return mapList;
	}


	private List<Map<String, Object>> getReviewByDept(List<Map<String, Object>> mapList, PageBean pageBean) {
		mapList = studyRecordViewMapper.findReviewCount(pageBean);
		if(mapList.size() == 0){
			Map<String, Object> map = new HashMap<String, Object>();
			String deptname = (String) pageBean.getKeywords().get("name");
			map.put("deptname", deptname);
			map.put("count", "0");
			mapList.add(map);
		}else{
			int all = 0;
			for(Map<String, Object> map : mapList){
				Long count = (Long) map.get("count");
				all += count;
			}
			Map<String, Object> map = new HashMap<String, Object>();
			String deptname = (String) pageBean.getKeywords().get("name");
			map.put("deptname", deptname);
			map.put("count", all);
			
			mapList.clear();
			mapList.add(map);
		}
		return mapList;
	}

	/**
	 * 
	 * @param list
	 * @param reqMap
	 * @param count
	 * @param timeList
	 * @return
	 */
	private Map<String, Object> lecture(List<Map<String, Object>> list, Map<String, Object> reqMap, long count, List<String> timeList) {
		
		List<Map<String, Object>> mapList = new ArrayList<Map<String,Object>>();
		List<Map<String, Object>> mapList3 = new ArrayList<Map<String,Object>>();
		 Map<String, Object> resuktmap = new HashMap<String, Object>();
		 PageBean pageBean1 = new PageBean();
		 pageBean1.setKeywords(reqMap);
//		听课  以时间分组
		mapList3 = getLectureByTime(mapList3,pageBean1,count,timeList);
		//听课
		if(list.size() == 0){
			 List<Map<String, Object>> strList = deptService.findAll(null);
			 for(Map<String, Object> ids : strList){
				 PageBean pageBean = new PageBean();
				 pageBean.setKeywords(reqMap);
				 pageBean.setKeywords(ids);
				 mapList.addAll( getLectureByDept(mapList,pageBean));
				}
		}else{
			for(Map<String, Object> map:list){
				PageBean pageBean = new PageBean();
				reqMap.remove("dept");
				map.putAll(reqMap);
				pageBean.setKeywords(map);
				
//				听课  以机构分组
				mapList.addAll( getLectureByDept(mapList,pageBean));
			}
		}
		resuktmap.put("deptType", mapList);
		resuktmap.put("timeType", mapList3);
		return resuktmap;
	}


		/**
		 * 
		 * @param mapList 
		 * @param pageBean
		 * @param count
		 * @param timeList
		 * @return
		 */
	private List<Map<String, Object>> getLectureByTime(List<Map<String, Object>> mapList, PageBean pageBean,
			long count, List<String> timeList) {
		if(count <= AppConstants.LIMIT_DATE){
			mapList = studyRecordViewMapper.findLectureCountByTime(pageBean);
			fillIntoList(mapList,timeList);
		}else{
			mapList = studyRecordViewMapper.findLectureCountByWeekTime(pageBean);
			fillIntoList(mapList,timeList);
		}
		for(int i=0;i<mapList.size();i++){
			Map<String, Object> map = mapList.get(i);
			map.put("time", (i+1) + "");
		}
		
		return mapList;
	}

	/**
	 * 
	 * @param mapList
	 * @param timeList
	 */
	private void fillIntoList(List<Map<String, Object>> mapList,
		List<String> timeList) {
		List<Map<String, Object>> mapList_ = new ArrayList<Map<String,Object>>();
			for(String str:timeList){
				Map<String, Object> timeMap = new HashMap<String, Object>();
				timeMap.put("time", str);
				timeMap.put("count", "0");
				for(Map<String, Object> map:mapList){
					if(map.get("time").equals(str)){
						timeMap.put("time", str);
						timeMap.put("count", map.get("count"));
						break;
					}
				}
			
				mapList_.add(timeMap);
			}
			mapList.clear();
			mapList.addAll(mapList_);
}

/**
 * 
 * @param mapList 
 * @param pageBean
 * @return
 */
	private List<Map<String, Object>> getLectureByDept( List<Map<String, Object>> mapList, PageBean pageBean) {
		
		mapList = studyRecordViewMapper.findLectureCount(pageBean);
		if(mapList.size() == 0){
			Map<String, Object> map = new HashMap<String, Object>();
			String deptname = (String) pageBean.getKeywords().get("name");
			map.put("deptname", deptname);
			map.put("count", "0");
			mapList.add(map);
		}else{
			int all = 0;
			for(Map<String, Object> map : mapList){
				long count = (Long) map.get("count");
				all += count;
			}
			Map<String, Object> map = new HashMap<String, Object>();
			String deptname = (String) pageBean.getKeywords().get("name");
			map.put("deptname", deptname);
			map.put("count", all);
			mapList.clear();
			mapList.add(map);
		}
		
		
		return mapList;
	}

/**
 * 计算天数
 * @param reqMap
 * @return
 */
	private long getTimeCount(Map<String, Object> reqMap) {
		String startdate = (String) reqMap.get("startdate");
		String enddate = (String) reqMap.get("enddate");
		SimpleDateFormat dft = new SimpleDateFormat("yyyy-MM-dd"); 
		try {
			long count = DateUtils.comparisonDifferenceDays(dft.parse(startdate), dft.parse(enddate));
			return count;
		} catch (ParseException e) {
			e.printStackTrace();
			return 0;
		}
	}


	/**
	 * 当小于十天时，用天数
	 * 反之，用周
	 * @param reqMap
	 * @param count 
	 * @return
	 */
	private List<String> getTimeList(Map<String, Object> reqMap, long count) {
		String startdate = (String) reqMap.get("startdate");
		List<String> list = new ArrayList<String>();
			if(count <= AppConstants.LIMIT_DATE){
				for(int i=1;i<=count;i++){
					list.add(DateUtils.AddOneDays(startdate,i).replace("-", ""));
				}
			}else{
				int m = 0;
				if(count%7 == 0){
					m = (int) (count/7);
				}else{
					m = (int) (count/7) + 1;
				}
				for(int i=1;i<=m;i++){
					String date = DateUtils.AddOneDays(startdate,i*7);
					try {
						String strWeek = DateUtils.getWeek(DateUtils.parse(date));
						list.add(strWeek);
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
			}
			
		
			
		return list;
	}

	/**
	 * 处理reqMap
	 * @param reqMap
	 * @return
	 */
	private Map<String, Object> handleReqMap(Map<String, Object> reqMap) {
		String timeflag =  reqMap.get("timeflag").toString();
		String enddate = DateUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss");
		if(StringUtils.isNotBlank(timeflag)){
			if(timeflag.equals("0")){
				reqMap.put("startdate", DateUtils.getOneWeeks(enddate));
				reqMap.put("enddate", enddate);
			}else if(timeflag.equals("1")){
				reqMap.put("startdate", DateUtils.getOneMouths(enddate));
				reqMap.put("enddate", enddate);
			}else if(timeflag.equals("2")){
				//查看当前学期
				Term nowterm = termservice.findNowTerm();
				String endday = DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(nowterm.getStartday()), nowterm.getWeeks());
				reqMap.put("startdate", nowterm.getStartday());
				reqMap.put("enddate", endday);
			}else if(timeflag.equals("3")){
				if(StringUtils.isNotBlank(reqMap.get("timeStart").toString()) || StringUtils.isNotBlank(reqMap.get("timeEnd").toString())){
					Term nowterm = termservice.findNowTerm();
					String endday = DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(nowterm.getStartday()), nowterm.getWeeks());
					reqMap.put("startdate", nowterm.getStartday());
					reqMap.put("enddate", endday);
				}else{
					reqMap.put("startdate", reqMap.get("timeStart"));
					reqMap.put("enddate", reqMap.get("timeEnd"));
				}
				
			}
		}else{
			reqMap.put("startdate", DateUtils.getOneWeeks(enddate));
			reqMap.put("enddate", enddate);
		}
		return reqMap;
	}


	public static void main(String[] args) throws Exception {
		String startdate = "2015-01-01";
		String enddate = "2015-07-01";
		 SimpleDateFormat dft=new SimpleDateFormat("yyyy-MM-dd");     
		 long count = DateUtils.comparisonDifferenceDays(dft.parse(startdate), dft.parse(enddate));
		 List<String> list = new ArrayList<String>();
		 
		for(int i=1;i<=count;i++){
			list.add(DateUtils.AddOneDays(startdate,i));
		}
		System.out.println(list);
		
		for(String str:list){
			if(str.equals(enddate)){
				System.out.println("true");
			}else{
				System.err.println("cun o");
			}
		}
	}
}
