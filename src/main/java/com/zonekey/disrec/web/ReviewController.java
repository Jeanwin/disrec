/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Validator;

import org.apache.batik.gvt.text.ArabicTextHandler;
import org.jasig.cas.client.authentication.AttributePrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.beanvalidator.BeanValidators;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exportexcel.ExportAreaForExcel;
import com.zonekey.disrec.common.utils.ContinueFTP;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.entity.ReviewChildren;
import com.zonekey.disrec.service.AreaService;
import com.zonekey.disrec.service.ReviewChildrenService;
import com.zonekey.disrec.service.ReviewService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.LectureView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.ReviewView;
import com.zonekey.disrec.vo.Tree;

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
@RequestMapping(value = "/rest/reviewView")
public class ReviewController {
	private static final Logger LOG = LoggerFactory.getLogger(ReviewController.class);
	@Autowired
	private ReviewService reviewService;
	@Autowired
	private ReviewChildrenService reviewChildrenService;
	/**
	 * 获取评课模板
	 */
	@RequestMapping(value = "classEvaluationModal")
	public @ResponseBody
	Map<String,Object> classEvaluationModal(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		return reviewService.findPageByPageBean(pageBean);
	}
	/**
	 * 获取子评课模板
	 */
	@RequestMapping(value = "classEvaluationChildModal")
	public @ResponseBody
	List<ReviewChildren> classEvaluationChildModal(HttpServletRequest req) {
		ReviewView reviewView = JsonUtil.jsonToObject(req, ReviewView.class);
		return reviewChildrenService.findAll(reviewView.getId());
	}
	/**
	 * 新增评课模板
	 */
	@RequestMapping(value = "insertListenModal")
	public @ResponseBody
	int insertReviewModal(HttpServletRequest req){
		//将json转化为对象
		ReviewView reviewView = JsonUtil.jsonToObject(req, ReviewView.class);
		 return reviewService.saveReview(reviewView);
	}
	/**
	 * 修改评课模板
	 */
	@RequestMapping(value = "updateListenModal")
	public @ResponseBody
	int updateListenModal(HttpServletRequest req){
		//将json转化为对象
		ReviewView reviewView = JsonUtil.jsonToObject(req, ReviewView.class);
		 return reviewService.updateReview(reviewView);
	}
	/**
	 * 删除评课模板
	 */
	@RequestMapping(value = "deleteListenModal")
	public @ResponseBody
	int deleteListenModal(HttpServletRequest req){
		//将json转化为对象
		ReviewView reviewView = JsonUtil.jsonToObject(req, ReviewView.class);
		 return reviewService.deleteReview(reviewView.getId());
	}
	
}