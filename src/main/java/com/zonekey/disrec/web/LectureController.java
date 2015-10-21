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
import com.zonekey.disrec.entity.LectureChildren;
import com.zonekey.disrec.service.LectureChildrenService;
import com.zonekey.disrec.service.LectureService;
import com.zonekey.disrec.vo.LectureView;
import com.zonekey.disrec.vo.PageBean;

/**
 * @Title: @{#} AreaRestController.java
 * @Description: <p>
 *               Area的Restful API的Controller.
 *               </p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@RestController
@RequestMapping(value = "/rest/lectureView")
public class LectureController {
	private static final Logger LOG = LoggerFactory.getLogger(LectureController.class);
	@Autowired
	private LectureService lectureService;
	@Autowired
	private LectureChildrenService lectureChildrenService;
	
	/**
	 * 获取听课表模板
	 */
	@RequestMapping(value = "listenModal")
	public @ResponseBody
	Map<String,Object> lectureModel(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		return lectureService.findPageBy(pageBean);
	}
	/**
	 * 获取听课子表模板
	 */
	@RequestMapping(value = "lectureChildModel")
	public @ResponseBody
	List<LectureChildren> lectureChildModel(HttpServletRequest req) {
		LectureView lectureView = JsonUtil.jsonToObject(req, LectureView.class);
		return lectureChildrenService.findAll(lectureView.getId());
	}
	/**
	 * 新增听课表模板
	 */
	@RequestMapping(value = "insertListenModal")
	public @ResponseBody
	int insertListenModal(HttpServletRequest req){
		//将json转化为对象
		LectureView lectureView = JsonUtil.jsonToObject(req, LectureView.class);
		 return lectureService.saveLecture(lectureView);
	}
	/**
	 * 修改听课表模板
	 */
	@RequestMapping(value = "updateListenModal")
	public @ResponseBody
	int updateListenModal(HttpServletRequest req){
		//将json转化为对象
		LectureView lectureView = JsonUtil.jsonToObject(req, LectureView.class);
		 return lectureService.updateLecture(lectureView);
	}
	/**
	 * 修改听课表模板
	 */
	@RequestMapping(value = "changeStatus")
	public @ResponseBody
	int changeStatus(HttpServletRequest req){
		//将json转化为对象
		LectureView lectureView = JsonUtil.jsonToObject(req, LectureView.class);
		 return lectureService.updateSelective(lectureView);
	}
	/**
	 * 删除听课表模板
	 */
	@RequestMapping(value = "deleteListenModal")
	public @ResponseBody
	int deleteListenModal(HttpServletRequest req){
		//将json转化为对象
		LectureView lectureView = JsonUtil.jsonToObject(req, LectureView.class);
		 return lectureService.deleteLecture(lectureView.getId());
	}
	
}