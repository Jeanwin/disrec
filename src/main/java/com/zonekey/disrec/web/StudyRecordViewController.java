/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.service.DeptService;
import com.zonekey.disrec.service.StudyRecordViewService;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.StudyRecordView;

/**
 */
@RestController
@RequestMapping(value = "/rest/studyRecordView")
public class StudyRecordViewController {
	private static final Logger LOG = LoggerFactory.getLogger(StudyRecordViewController.class);
	@Autowired
	private StudyRecordViewService studyRecordViewService;
	@Autowired
	private DeptService deptService;
	/**
	 * 获取听课记录
	 */
	@RequestMapping(value = "getStudyRecordViewList")
	public @ResponseBody
	Map<String,Object> getStudyRecordViewList(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		return studyRecordViewService.findPageByPageBean(pageBean);
	}
	
	/**
	 * 删除听课记录
	 */
	@RequestMapping(value = "deleteView")
	public @ResponseBody
	int deleteView(HttpServletRequest req){
		//将json转化为对象
		StudyRecordView studyRecordView = JsonUtil.jsonToObject(req, StudyRecordView.class);
		 return studyRecordViewService.deleteView(studyRecordView);
	}
	/**
	 * 统计听课，评课
	 */
	@RequestMapping(value = "getViewList")
	public @ResponseBody
	Map<String, Object> getViewList(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Map<String, Object> reqMap = pageBean.getKeywords();
		
		return studyRecordViewService.getViewList(reqMap);
	}
	
}