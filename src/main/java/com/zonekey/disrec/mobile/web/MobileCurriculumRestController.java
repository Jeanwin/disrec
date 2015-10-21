/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.mobile.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Validator;


import org.activiti.engine.impl.util.json.JSONArray;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.DateTermUtil;
import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.service.AreaService;
import com.zonekey.disrec.service.CurriculumService;
import com.zonekey.disrec.service.CurriculumbaseService;
import com.zonekey.disrec.service.DeviceService;
import com.zonekey.disrec.service.TermService;
import com.zonekey.disrec.vo.AreaView;

@Controller
@RequestMapping(value = "/curriculumMobile")
public class MobileCurriculumRestController {
	
	private static final Logger LOG = LoggerFactory.getLogger(MobileCurriculumRestController.class);
	
	@Autowired
	private CurriculumService curriculumService;
	@Autowired
	private TermService termservice;
	@Autowired
	private CurriculumbaseService curriculumbaseService;
	@Autowired
	private AreaService areaService;
	@Autowired
	private Validator validator;
	
	@Autowired
	private DeviceService deviceService;
	public int excelrow=1;
	/**
	 * @Title:findWeekCurriculumList
	 * @Description: 查找周课表
	 * 
	 * @author niuxl
	 * @date 2014年9月22日 下午1:18:29
	 * @param res
	 */
	@RequestMapping(value = "findWeekCurriculumList")
	public @ResponseBody
	Map<String,Object> findWeekCurriculumList(HttpServletRequest req,HttpServletResponse resp) {
		LOG.info("========>>findWeekCurriculumList");
		String areaid = req.getParameter("areaid");
		String weeks = req.getParameter("weeks");
		JSONArray array = new JSONArray();
		Curriculum curriculum=new Curriculum();
		curriculum.setAreaid(areaid);
		if(StringUtils.isNotBlank(weeks)){
			curriculum.setWeeks(weeks);
		}else{
			curriculum.setWeeks(null);
		}
		Map<String, Object> mapData = new HashMap<String, Object>();
		Map<String, Object> mapD = curriculumService.findWeekCurriculumListWithMobile(curriculum);
		Map<String,Object> data = termservice.findTermtips();
		AreaView areaview = areaService.getDetailById(areaid);
		if(data != null){
		
		String day = DateTermUtil.weekConver((String)data.get("weekdate"));
		data.put("weekday", day);
		data.put("areaid", areaid);
		data.put("areaname", areaview==null?"":areaview.getTitle());
		if(weeks == null){
			data.put("weeks", data.get("week"));
		}else{
			data.put("weeks", weeks);
		}
		}
		mapData.put("term_data", data);
		mapData.put("content", mapD);
		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
		mapData.put("response_code_string", "获取周课表");
		array.put(mapData);
		CommonUtil.println(array, resp);
		 return null;
	}
	
	/**
	 * 新增直播课表（手动加课表）
	 * 默认是当前学期
	 */
	@RequestMapping(value = "insertCurriculum")
	public @ResponseBody
	JsonMsg insertCurriculum(HttpServletRequest req,HttpServletResponse resp){
		LOG.info("========>>insertCurriculum");
		String keylist = JsonUtil.toJson(req.getParameterMap());
    	keylist = keylist.replace("[", "").replace("]", "");
		Curriculum curriculum = JsonUtil.jsonToObject(keylist, Curriculum.class);
		JsonMsg msg = curriculumService.insertCurriculum(curriculum);
		
		JSONArray array = new JSONArray();
		Map<String, Object> mapData = new HashMap<String, Object>();
		if(msg.getId().equals("0")){
			mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
			mapData.put("response_code_string", msg.getOperation());
		}else if(msg.getId().equals("1")){
			mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
			mapData.put("response_code_string", msg.getOperation());
			
		}
		array.put(mapData);
		CommonUtil.println(array, resp);
		 return null;
				 
	}
	
	
	/** 
	 * @Title:deleteEditCurriculum
	 * @Description: 删除可编辑课表
	 * @date 2014年9月23日 上午11:13:47
	 * @param res
	 * @return
	*/
	@RequestMapping(value = "deleteEditCurriculum")
	public @ResponseBody
	JsonMsg deleteEditCurriculum(HttpServletRequest req,HttpServletResponse resp) {
		LOG.info("========>>deleteEditCurriculum");
		String keylist = JsonUtil.toJson(req.getParameterMap());
    	keylist = keylist.replace("[", "").replace("]", "");
    	List<Curriculum> list=new ArrayList<Curriculum>();
    	Curriculum curriculumvo = JsonUtil.jsonToObject(keylist, Curriculum.class);
    	 list.add(curriculumvo);
    	 JsonMsg msg = curriculumService.deleteEditCurriculum(list);
    	 
    	 JSONArray array = new JSONArray();
 		Map<String, Object> mapData = new HashMap<String, Object>();
 		if(msg.getId().equals("0")){
 			mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
 			mapData.put("response_code_string", msg.getOperation());
 		}else if(msg.getId().equals("1")){
 			mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
 			mapData.put("response_code_string", msg.getOperation());
 			
 		}
 		array.put(mapData);
 		CommonUtil.println(array, resp);
				return  null;
	}
	/** 
	 * @Description: 修改可编辑课表（可修改时间、教室字段）
	 * @date 2014年9月23日 上午11:13:47
	 * @param res
	 * @return
	*/
	@RequestMapping(value = "updateEditCurriculum")
	public @ResponseBody
	JsonMsg  updateEditCurriculum(HttpServletRequest req,HttpServletResponse resp) {
		LOG.info("========>>updateEditCurriculum");
		JSONArray array = new JSONArray();
		Map<String, Object> mapData = new HashMap<String, Object>();
		try{
			String keylist = JsonUtil.toJson(req.getParameterMap());
	    	keylist = keylist.replace("[", "").replace("]", "");
			Curriculum curriculum = JsonUtil.jsonToObject(keylist, Curriculum.class);
			JsonMsg msg= curriculumService.updateWeekCurriculum(curriculum);
			if(msg.getId().equals("1")){
				mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
				mapData.put("response_code_string", msg.getOperation());
			}else{
				 mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
				 mapData.put("response_code_string", msg.getOperation());
			}
			
		}catch (Exception e){
			 mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_FAILED);
			 mapData.put("response_code_string", "编辑课程失败");
		}
		array.put(mapData);
		CommonUtil.println(array, resp);
		 return null;
		
	}
}
