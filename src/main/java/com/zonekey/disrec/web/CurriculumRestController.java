/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.web;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Validator;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.beanvalidator.BeanValidators;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.DateTermUtil;
import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exception.RestException;
import com.zonekey.disrec.common.exportexcel.ExportCurriculumForExcel;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.entity.Area;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.entity.Curriculumbase;
import com.zonekey.disrec.entity.ManualVideo;
import com.zonekey.disrec.entity.ScheduleTask;
import com.zonekey.disrec.entity.Term;
import com.zonekey.disrec.service.AreaService;
import com.zonekey.disrec.service.CurriculumService;
import com.zonekey.disrec.service.CurriculumbaseService;
import com.zonekey.disrec.service.DeviceService;
import com.zonekey.disrec.service.ManualVideoService;
import com.zonekey.disrec.service.TermService;
import com.zonekey.disrec.vo.DeviceView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.SysUserView;

/**
 * @Title: @{#} CurriculumRestController.java
 * @Description: <p>Curriculum的Restful API的Controller.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Controller
@RequestMapping(value = "/rest/curriculum")
public class CurriculumRestController {
	
	private static final Logger LOG = LoggerFactory.getLogger(CurriculumRestController.class);
	
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
	@Autowired
	private ManualVideoService manualVideoService;
	public int excelrow=1;
	/**
	 * 获取直播课表(全部和按条件均可，以后加上分页参数)
	 */
	@RequestMapping(value = "liveCurriculum")
	public @ResponseBody
	Map<String,Object> findLiveCurriculum(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		
		LOG.info("liveCurriculum");
		return curriculumService.findLiveCurriculum(pageBean);
	}

	/**
	 * @Title:getWeekCurriculum
	 * @Description: 查找周课表
	 */
	@RequestMapping(value = "findWeekCurriculum")
	public @ResponseBody
	Map<String,Object> findWeekCurriculum(HttpServletRequest req) {
		Curriculum curriculum=JsonUtil.jsonToObject(req, Curriculum.class);
		return  curriculumService.findWeekCurriculum(curriculum);
	}
	
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
	Map<String,Object> findWeekCurriculumList(HttpServletRequest req) {
		Curriculum curriculum=JsonUtil.jsonToObject(req, Curriculum.class);
		return  curriculumService.findWeekCurriculumList(curriculum);
	}
	/**
	 * @Title:findMyWeekCurriculumList
	 * @Description: 查找我的课表
	 * 
	 * @author niuxl
	 * @date 2014年9月22日 下午1:18:29
	 * @param res
	 */
	@RequestMapping(value = "findMyWeekCurriculumList",method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	Map<String,Object> findMyWeekCurriculumList(HttpServletRequest req) {
		Curriculum curriculum=JsonUtil.jsonToObject(req, Curriculum.class);
		return  curriculumService.findMyWeekCurriculumList(curriculum);
	}
	/** 
	 * @Title:findEditCurriculum
	 * @Description: 查找可编辑课表
	 * @date 2014年9月23日 上午11:13:47
	 * @param res
	 * @return
	*/
	@RequestMapping(value = "findEditCurriculum")
	public @ResponseBody
	Map<String,Object> findEditCurriculum(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		return	 curriculumService.findEditCurriculum(pageBean);
		 
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
	JsonMsg deleteEditCurriculum(HttpServletRequest req) {
		List<Map<String,Object>> maplist = JsonUtil.jsonToObject(req, List.class);
		List<Curriculum> list = new ArrayList<Curriculum>();
		for(Map<String,Object> curriculum : maplist){
			 Curriculum curriculumvo = new Curriculum();
			 curriculumvo.setDate(curriculum.get("date").toString());
			 curriculumvo.setSameclass(curriculum.get("sameclass").toString());
			 curriculumvo.setWeeks(curriculum.get("weeks").toString());
			 curriculumvo.setWeekdate(curriculum.get("weekdate").toString());
			 curriculumvo.setAreaid(curriculum.get("areaid").toString());
			 curriculumvo.setUserid(curriculum.get("userid").toString());
			 list.add(curriculumvo);
		}
		return  curriculumService.deleteEditCurriculum(list);
	}
	/** 
	 * @Title:findEditCurriculum
	 * @Description: 修改可编辑课表（可修改时间、教室字段）
	 * @date 2014年9月23日 上午11:13:47
	 * @param res
	 * @return
	*/
	@RequestMapping(value = "updateEditCurriculum")
	public @ResponseBody
	JsonMsg  updateEditCurriculum(HttpServletRequest req) {
		try{
				//json转化为对象
		Curriculum curriculum = JsonUtil.jsonToObject(req, Curriculum.class);
		return curriculumService.updateEditCurriculum(curriculum);
		}catch (Exception e){
			JsonMsg msg=new JsonMsg();
			msg.setId("0");
			msg.setOperation("编辑失败");
			return msg;
		}
	}
	/** 
	 * @Title:findEditCurriculum
	 * @Description: 修改周课表（不改修改时间、教室字段）
	 * @date 2015年1月19日 上午11:13:47
	 * @param res
	 * @return
	*/
	@RequestMapping(value = "updateWeekCurriculum")
	public @ResponseBody
	JsonMsg  updateWeekCurriculum(HttpServletRequest req) {
		try{
				//json转化为对象
				Curriculum curriculum = JsonUtil.jsonToObject(req, Curriculum.class);
				  return curriculumService.updateWeekCurriculum(curriculum);
				//把listCurriculum转换为json串
		}catch (Exception e){
			JsonMsg msg=new JsonMsg();
			msg.setId("0");
			msg.setOperation("编辑失败");
			return msg;
		}
	}
	/** 
	 * @Title:findEditCurriculum
	 * @Description: 修改可编辑课表（修改非时间、非教室字段）
	 * @date 2014年9月23日 上午11:13:47
	 * @param res
	 * @return
	*/
	@RequestMapping(value = "updateCurriculumForBase")
	public @ResponseBody
	JsonMsg  updateCurriculumForBase(HttpServletRequest req) {
		try{
				//json转化为对象
				Curriculum curriculum = JsonUtil.jsonToObject(req, Curriculum.class);
				  return curriculumService.updateCurriculumForBase(curriculum);
				//把listCurriculum转换为json串
		}catch (Exception e){
			JsonMsg msg=new JsonMsg();
			msg.setId("0");
			msg.setOperation("编辑失败");
			return msg;
		}
	}
	/**
	 * 新增直播课表（手动加课表）
	 * 默认是当前学期
	 */
	@RequestMapping(value = "insertCurriculum")
	public @ResponseBody
	JsonMsg insertCurriculum(HttpServletRequest req){
		//将json转化为对象
		Curriculum curriculum = JsonUtil.jsonToObject(req, Curriculum.class);
		 return curriculumService.insertCurriculum(curriculum);
	}
	/**
	 * 设置直播课表(页面初始化)---作废
	 */
	@RequestMapping(value = "setLiveCurriculum")
	public @ResponseBody
	String setLiveCurriculum(ServletResponse res){
		//把传过来的参数 转化成string类型
		String id="";
		//根据id 到数据库中查询到一条直播课表的数据
		Curriculum lc=curriculumService.findLiveCurriculumById(id);
		//把这个数据以json的格式返到前台
		return null;
	}
	/**
	 * 保存设置直播课表
	 */
	@RequestMapping(value = "updateLiveCurriculum",method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	JsonMsg updateLiveCurriculum(HttpServletRequest req){
		Curriculum curriculum = JsonUtil.jsonToObject(req, Curriculum.class);
		return curriculumService. updateLiveCurriculumById(curriculum);
	}
	/**
	 * 取消直播课表
	 */
	@RequestMapping(value = "cancelLiveCurriculum",method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	JsonMsg cancelLiveCurriculum(HttpServletRequest req){
		Curriculum curriculum = JsonUtil.jsonToObject(req, Curriculum.class);
		return curriculumService.cancelLiveCurriculum(curriculum);
	}
	
	/**
	 * 删除直播课表
	 */
	
	@RequestMapping(value = "deleteLiveCurriculum")
	public @ResponseBody
	JsonMsg deleteLiveCurriculum(HttpServletRequest req){
		JsonMsg msg=new JsonMsg();
		int flag=0;
		Curriculum curriculum = JsonUtil.jsonToObject(req, Curriculum.class);
		if(curriculum.getId()!=null && curriculum.getId()!=""){
			  msg=curriculumService.deleteLiveCurriculum(curriculum);
			 return msg;
		}
		
		return msg;
		//把这个数据以json的格式返到前台
	}
	
	/**
	 * 查看所有学期
	 */
	
	@RequestMapping(value = "findAllTerm")
	public @ResponseBody
	Map<String,Object> findAllTerm(HttpServletRequest req){
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Curriculum curriculum=new Curriculum();
		return termservice.findAllTerm(pageBean);
	}
	/**
	 * 查看所有学期为下拉框使用
	 */
	
	@RequestMapping(value = "findAllTermForShearch")
	public @ResponseBody
	List<Term> findAllTermForShearch(HttpServletRequest req){
		return termservice.findAllTermForShearch();
	}
	/**
	 * 编辑学期
	 */
	
	@RequestMapping(value = "editTerm", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	JsonMsg updateTerm(HttpServletRequest req){
		Term term = JsonUtil.jsonToObject(req, Term.class);
		  return termservice.updateTerm(term);
	}
	/**
	 * 设为当前学期
	 */
	
	@RequestMapping(value = "editiscurrent", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	int editiscurrent(HttpServletRequest req){
		Term term = JsonUtil.jsonToObject(req, Term.class);
		 return termservice.editiscurrent(term);
	}
	/**
	 * 添加新学期
	 */
	
	@RequestMapping(value = "insertTerm",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	JsonMsg insertTerm(HttpServletRequest req, UriComponentsBuilder uriBuilder){
		Term term = JsonUtil.jsonToObject(req, Term.class);
		return termservice.insertTerm(term);
	}
	/**
	 * 判断学期名字是否重复
	 */
	
	@RequestMapping(value = "checkTermName",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	JsonMsg checkTermName(HttpServletRequest req){
		Term term = JsonUtil.jsonToObject(req, Term.class);
		return termservice.checkTermName(term);
	}
	/**
	 * 判断学期日期是否重复
	 */
	
	@RequestMapping(value = "checkTermDate",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	JsonMsg checkTermDate(HttpServletRequest req){
		Term term = JsonUtil.jsonToObject(req, Term.class);
		return termservice.checkTermDate(term);
	}
	/**
	 * 查找本学期最大节次
	 */
	
	@RequestMapping(value = "findMaxClass",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	List<LinkedHashMap<String,Object>> findMaxClass(HttpServletRequest req){
//		Term term = JsonUtil.jsonToObject(req, Term.class);
		return curriculumService.findMaxClass();
	}
	/**
	 * 判断节次方案是否重复
	 */
	
	@RequestMapping(value = "checkCurriculumType",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	JsonMsg checkCurriculumType(HttpServletRequest req){
		JsonMsg jsonmsg=new JsonMsg();
		Curriculumbase curriculumbase = JsonUtil.jsonToObject(req, Curriculumbase.class);
		List<Curriculumbase> curriculumbaselist=curriculumbaseService.findCurriculumbaseByType(curriculumbase);
		if(curriculumbaselist.size()>0){
			jsonmsg.setId("0");
			jsonmsg.setName("失败");
			jsonmsg.setOperation("方案不能重复");
			return jsonmsg;
		}
		jsonmsg.setId("1");
		jsonmsg.setName("成功");
		jsonmsg.setOperation("方案不重复");
		return jsonmsg;
	}
	/**
	 * 查看该学期下所有节次方案  ----作废
	 */
	
	@RequestMapping(value = "findCurriculumbaseByTerm")
	public @ResponseBody String findCurriculumbaseByTerm(ServletResponse res){
		//把传过来的参数 json转成对象
		Curriculum curriculum=new Curriculum();
		curriculum.setTermid("1");
		//根据id 到数据库中修改一条直播课表的数据
		List<Curriculumbase>  curriculumbaseList=curriculumbaseService.findCurriculumbaseByTerm(curriculum);
		//把这个数据以json的格式返到前台
		return  null;
	}
	/**
	 * 新增节次初始化
	 */
	@RequestMapping(value = "initInsertCurriculumbase" ,method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	List<Curriculumbase> initInsertCurriculumbase(HttpServletRequest req){
		return curriculumbaseService.initInsertCurriculumbase();
	}
	/**
	 * 新增节次
	 */
	@RequestMapping(value = "insertCurriculumbase" ,method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	JsonMsg insertCurriculumbase(HttpServletRequest req){
		JsonMsg msg=new JsonMsg();
		int flag=0;
		List<Map<String,Object>> curriculumbaselist=JsonUtil.jsonToObject(req, List.class);
		List<Curriculumbase> clist=new ArrayList<Curriculumbase>();
		for(Map<String,Object> curriculumbase:curriculumbaselist){
			 Curriculumbase curriculumbasevo=new Curriculumbase();
			  curriculumbasevo.setClasstype(curriculumbase.get("classtype").toString());
    		  curriculumbasevo.setDatebegin(curriculumbase.get("datebegin").toString());
    		  curriculumbasevo.setDateend(curriculumbase.get("dateend").toString());
    		  curriculumbasevo.setStarttime(curriculumbase.get("starttime").toString());
    		  curriculumbasevo.setEndtime(curriculumbase.get("endtime").toString());
    		  curriculumbasevo.setIclass(Integer.parseInt(curriculumbase.get("iclass").toString()));
    		  clist.add(curriculumbasevo);
			
		}
//		System.out.println(clist);
		if (curriculumbaseService.findCurriculumbaseByType(clist.get(0)) != null
				&& curriculumbaseService.findCurriculumbaseByType(clist.get(0))
						.size() > 0) {
//			System.out.println("数据库中有同样方案名称、起止时间的数据,不允许新增");
			LOG.debug("数据库中有同样方案名称、起止时间的数据,不允许新增");
			msg.setId("0");
			msg.setName("失败");
			msg.setOperation("很抱歉，操作未完成，请稍后再试。");

			return msg;
		}
		JsonMsg checkmsg = curriculumbaseService.checkCurriculumbaseTime(clist);
		if (StringUtils.isEmpty(checkmsg.getId())) {
			flag = curriculumbaseService.insertCurriculumbase(clist);
		} else {
			return checkmsg;
		}

		if (flag == 1) {
			msg.setId("1");
			msg.setName("成功");
			msg.setOperation("节次方案添加成功！");
		}

		return msg;
	}
	/**
	 * 保存应用到教室
	 */
	@RequestMapping(value = "insertUsedarea")
	public @ResponseBody
	 List<Area> insertUsedarea(HttpServletRequest req){
		JsonMsg jsonMsg = new JsonMsg();
		//将json数组转化为对象
		Curriculumbase curriculumsbase = JsonUtil.jsonToObject(req, Curriculumbase.class);
		 List<Area> arealist=findClassTypeByArea(curriculumsbase);
		 if(arealist !=null && arealist.size()>0){
			 return arealist;
		 }else{
			 int data = curriculumbaseService.insertUsedarea(curriculumsbase);
				if(data == 1){
					jsonMsg.setId("1");
					jsonMsg.setName("成功");
					jsonMsg.setOperation("新增");
				
				String jsonData = JsonUtil.toJson(jsonMsg);
//				System.out.println(jsonData);
				}
				return new ArrayList<Area>();
		 }
		
	}
	/**
	 * 实时检查该教室有没有重叠的方案
	 */
	public List<Area> findClassTypeByArea(Curriculumbase curriculumsbase){
		List<Area> arealist= curriculumbaseService.findClassTypeByArea(curriculumsbase);
//		System.out.println(arealist);
		return arealist;
		
	}
	/**
	 * 实时检查该教室有没有重叠的方案
	 */
	@RequestMapping(value = "findClassTypeByArea")
	public @ResponseBody
	List<Area> findClassTypeByArea_bak(HttpServletRequest req){
		
		//将json数组转化为对象
		Curriculumbase curriculumsbase = JsonUtil.jsonToObject(req, Curriculumbase.class);
		List<Area> arealist= curriculumbaseService.findClassTypeByArea(curriculumsbase);
//		System.out.println(arealist);
		return arealist;
		
	}
	/**
	 * 查看所有节次方案
	 */
	
	@RequestMapping(value = "findAllCurriculumbase" , method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody Map<String,Object> findAllCurriculumbase(HttpServletRequest req){
		PageBean pageBean = JsonUtil.jsonToPage(req);
		return curriculumbaseService.findAllCurriculumbase(pageBean);
	}
	/**
	 * @Title:findAreaCurriculumbase
	 * @Description: 查找该教室下本学期所有的节次方案
	 * 
	 * @author niuxl
	 * @date 2014年9月22日 下午1:18:29
	 * @param res
	 */
	@RequestMapping(value = "findAreaCurriculumbase")
	public @ResponseBody
	List<Curriculumbase> findAreaCurriculumbase(HttpServletRequest req) {
		Curriculum curriculum=JsonUtil.jsonToObject(req, Curriculum.class);
		/*Curriculum curriculum=new Curriculum();
		curriculum.setAreaid("00a9156526bb4f93967c35d8d49103b5");*/
		List<Curriculumbase>  listC1urriculum =  curriculumbaseService.findAreaCurriculumbase(curriculum);
//		System.out.println(listC1urriculum.size());
		return listC1urriculum;
	}
	/** 
	 * @Description: 修改节次基础数据(展示基础数据)
	 * @date 2014年9月23日 上午11:13:47
	 * @param res
	 * @return
	*/
	@RequestMapping(value = "queryCurriculumbase")
	public @ResponseBody
	List<Curriculumbase> queryCurriculumbase(HttpServletRequest req) {
		Curriculumbase curriculumbase=JsonUtil.jsonToObject(req,Curriculumbase.class);
				List<Curriculumbase>  curriculumbaseList =  curriculumbaseService.queryCurriculumbase(curriculumbase);
//				System.out.println(curriculumbaseList.toString());
		return curriculumbaseList;
	}
	/** 
	 * @Description: 修改节次教室数据(初始化教室应用页面)新增时也可以调用
	 * @date 2014年9月23日 上午11:13:47
	 * @param res
	 * @return
	*/
	@RequestMapping(value = "findAreaByCurriculumbase")
	public @ResponseBody
	List<Curriculumbase> findAreaByCurriculumbase(HttpServletRequest req) {
		Curriculumbase curriculumbase=JsonUtil.jsonToObject(req, Curriculumbase.class);
				List<Curriculumbase>  curriculumbaseList =  curriculumbaseService.findAreaByCurriculumbase(curriculumbase);
//				System.out.println(curriculumbaseList.toString());
		return curriculumbaseList;
	}
	/** 
	 * @Description: 修改节次基础数据
	 * @date 2014年9月23日 上午11:13:47
	 * @param res
	 * @return
	*/
	@RequestMapping(value = "updateCurriculumbase",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	JsonMsg updateCurriculumbase(HttpServletRequest req) {
		JsonMsg msg = new JsonMsg();
		int  upd = 0;
		List<Map<String ,Object>> curriculumbaselist = JsonUtil.jsonToObject(req, List.class);
		List<Curriculumbase> clist = new ArrayList<Curriculumbase>();
		for(Map<String,Object> curriculumbase:curriculumbaselist){
			 Curriculumbase curriculumbasevo = new Curriculumbase();
			  curriculumbasevo.setClasstype(curriculumbase.get("classtype").toString());
			  curriculumbasevo.setDatebegin(curriculumbase.get("datebegin").toString());
			  curriculumbasevo.setDateend(curriculumbase.get("dateend").toString());
			  curriculumbasevo.setStarttime(curriculumbase.get("starttime").toString());
			  curriculumbasevo.setEndtime(curriculumbase.get("endtime").toString());
			  curriculumbasevo.setIclass(Integer.parseInt(curriculumbase.get("iclass").toString()));
			  curriculumbasevo.setClassbatch(curriculumbase.get("classbatch").toString());
			  clist.add(curriculumbasevo);
			
		}
		/**
		 *  查询该方案，该有效起止时间 一共有多少节课
		 */
		 List<Curriculumbase> sameculist = curriculumbaseService.findCurriculumbaseByType(clist.get(0)) ;
		if(sameculist != null && sameculist.size() > 0){
			if(sameculist.get(0).getClassbatch().equals(clist.get(0).getClassbatch())){
				  //upd =  curriculumbaseService.updateCurriculumbase(clist);
			}else{
				LOG.debug("数据库中有同样方案名称、起止时间的数据,不允许新增！");
				msg.setId("0");
				msg.setName("失败");
				msg.setOperation("很抱歉，数据库中有同样方案名称、起止时间的数据。");
				return msg;
			}
			
		}
//		验证节次方案里面的时间大小
		JsonMsg checkmsg = curriculumbaseService.checkCurriculumbaseTime(clist);
		if (StringUtils.isEmpty(checkmsg.getId())) {
			 upd =  curriculumbaseService.updateCurriculumbase(clist);
		} else {
			return checkmsg;
		}
		if(upd== -1){
			msg.setId("0");
			msg.setName("失败");
			msg.setOperation("节次方案数有误！");
		}else if(upd== -2){
			msg.setId("0");
			msg.setName("失败");
			msg.setOperation("有效期起止时间有误！");
		}else{
			msg.setId("1");
			msg.setName("成功");
			msg.setOperation("节次方案修改成功！");
		}
		return msg;
	}
	/** 
	 * @Description: 删除节次
	 * @date 2014年9月23日 上午11:13:47
	 * @param res
	 * @return
	*/
	@RequestMapping(value = "deleteCurriculumbase")
	public @ResponseBody
	JsonMsg deleteCurriculumbase(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		Curriculumbase curriculumbase=JsonUtil.jsonToObject(req, Curriculumbase.class);
				int del=  curriculumbaseService.deleteCurriculumbase(curriculumbase);
				if(del==0){
					msg.setId("0");
					msg.setName("失败");
					msg.setOperation("很抱歉，方案删除未完成，可能有相关的课表");
					return msg;
				}else{
					msg.setId("1");
					msg.setName("成功");
					msg.setOperation("方案删除成功！");
					return msg;
				}
				
				
	}

	/**
	 * 导出
	 */
	@RequestMapping(value = "exportcurriculum", method = RequestMethod.GET)
	public @ResponseBody void exportcurriculum(HttpServletRequest req,
			HttpServletResponse rep) {
//		Curriculum curriculum = JsonUtil.jsonToObject(req, Curriculum.class);
		String excelbatch=req.getParameter("excelbatch");
		Curriculum curriculum=new Curriculum();
		curriculum.setExcelbatch(excelbatch);
		
		List<Curriculum> curriculumList = curriculumService
				.exportcurriculum(curriculum);
		ExportCurriculumForExcel excelp = new ExportCurriculumForExcel();
		excelp.exportExcelForPerson(req, rep, curriculumList);
//		return "1";
	}
	/**
	 * 导入
	 */
	@RequestMapping(value = "/importcurriculum", method = RequestMethod.GET)
	public  String importcurriculum() {
		return "importcurriculum";
	}
	/**
	 * 导入
	 * 
	 * @param person
	 * @return
	 */
	@RequestMapping(value = "/curriculum/import", method = RequestMethod.POST)
	public @ResponseBody JsonMsg importcurriculum(@ModelAttribute(" curriculum ") Curriculum curriculum,@RequestParam(value = "file") MultipartFile file,HttpServletRequest request) throws IOException {
		JsonMsg msg = new JsonMsg();
		int flag = 0;
		List<Curriculum> list1 = new ArrayList<Curriculum>();
		if (file.isEmpty()) {
//			System.out.println("文件未上传");
			LOG.debug("文件未上传");
		} else {
//			System.out.println("进入导入方法" + curriculum);
			LOG.debug("进入导入方法" + curriculum);
			// 得到文件名
			String filename = file.getOriginalFilename();
//			System.out.println("文件名：" + filename);
			LOG.debug("文件名：" + filename);
			try {
				list1 = readExcel(curriculum, file);
				if(list1 == null || list1.size()==0){
					msg.setId("0");
					msg.setName("导入");
					msg.setOperation("导入失败");
					return msg;
				}

				// 去数据库中查一下，该批次、flag=1的数据
				Curriculum curriculumadd = new Curriculum();
				curriculumadd.setFlag("1");
				curriculumadd.setExcelbatch(list1.get(0).getExcelbatch());
				List<Curriculum> curriculumListadd = curriculumService.findCurriculummid(curriculumadd);
				// 将集合curriculumListadd新增到数据库中
				flag = curriculumService.insertCurriculumList(curriculumListadd);
//				System.out.println(list1.size());
			} catch (Exception e) {
				msg.setId("0");
				msg.setName("导入");
				msg.setOperation("导入失败");
				e.printStackTrace();
			}
		}
//		if (flag > 0) {
//
//			msg.setId("1");
//			msg.setName("导入");
//			msg.setOperation("导入成功");
//
//		} else {
			// 去数据库中查一下，该批次、flag=1的数据
			Curriculum curriculumerr = new Curriculum();
			curriculumerr.setFlag("0");
			curriculumerr.setExcelbatch(list1.get(0).getExcelbatch());
			List<Curriculum> curriculumListerr = curriculumService.findCurriculummid(curriculumerr);
//			System.out.println("导入的条数为："+excelrow);
			LOG.debug("导入的条数为："+excelrow);
			if (curriculumListerr != null && curriculumListerr.size() > 0) {
				if(curriculumListerr.size()<excelrow){
					msg.setId("2");
					msg.setName(list1.get(0).getExcelbatch());
					msg.setOperation("部分导入失败");
				}else if(curriculumListerr.size()==excelrow){
					msg.setId("0");
					msg.setName(list1.get(0).getExcelbatch());
					msg.setOperation("导入失败");
				}
				
			}else{
				msg.setId("1");
				msg.setName("导入");
				msg.setOperation("导入成功");
			}

//		}
		return msg;
	}
	//读取excel，并将数据插入到临时表里(这里可以不返回list，返回批次号也可以，以后看情况改过来)
	public List<Curriculum> readExcel(Curriculum curriculum ,MultipartFile file)throws Exception{
		 List<Curriculum> list1 = new ArrayList<Curriculum>();
		 Workbook book;
		 String systime=DateTermUtil.getNowTime().replace(" ", "").replace("-", "").replace(":", "").trim();
			try {
				book = Workbook.getWorkbook(file .getInputStream());
				 //读取sheet
				Sheet[] sheets=book.getSheets();
	             Sheet sheet=book.getSheet(0); 
	             int row = sheet.getRows();
	             excelrow=row-1;
	              for(int i = 1; i < row; i++) {
	            	  Curriculum curriculum1 = new Curriculum();
	            	  curriculum1.setId(UUID.randomUUID().toString());
	            	  curriculum1.setTermid(curriculum.getTermid());
	            	  curriculum1.setUserno(sheet.getCell(0,i).getContents());
	            	  curriculum1.setUsername(sheet.getCell(1,i).getContents());
	            	  curriculum1.setAreano(sheet.getCell(2,i).getContents());
	            	  curriculum1.setAreaname(sheet.getCell(3,i).getContents());
	            	  curriculum1.setSubject(sheet.getCell(4,i).getContents());
	            	  curriculum1.setDeptno(sheet.getCell(5,i).getContents());
	            	  curriculum1.setDeptname(sheet.getCell(6,i).getContents());
	            	  curriculum1.setWeeksbefore(sheet.getCell(7,i).getContents());
	            	  curriculum1.setWeekdate(sheet.getCell(8,i).getContents());
	            	  curriculum1.setClassnumbefore(sheet.getCell(9,i).getContents());
	            	  curriculum1.setFlag("1");
	            	  curriculum1.setExcelbatch(systime);
//	            	  curriculum1.setSameclass(sheet.getCell(9,i).getContents());
//	            	  if(sheet.getCell(10,i).getContents() == "" || sheet.getCell(10,i).getContents() == null){
	            	  if(StringUtils.isEmpty(sheet.getCell(10,i).getContents())){
	            		  curriculum1.setLive(curriculum.getLive());
	            	  }else{
	            		  curriculum1.setLive(sheet.getCell(10,i).getContents());
	            	  }
//	            	  if(sheet.getCell(11,i).getContents() == "" || sheet.getCell(11,i).getContents() == null){
	            	  if(StringUtils.isEmpty(sheet.getCell(11,i).getContents())){
	            		  curriculum1.setLivemodel(curriculum.getLivemodel());
	            	  }else{
	            		  curriculum1.setLivemodel(sheet.getCell(11,i).getContents());
	            	  }
//	            	 if(sheet.getCell(12,i).getContents() == "" || sheet.getCell(12,i).getContents() == null){
	            	  if(StringUtils.isEmpty(sheet.getCell(12,i).getContents())){
	            		 curriculum1.setRecord(curriculum.getRecord());
	            	 }else{
	            		 curriculum1.setRecord(sheet.getCell(12,i).getContents());
	            	 }
//	            	  if(sheet.getCell(13,i).getContents() == "" || sheet.getCell(13,i).getContents() == null){
	            		  if(StringUtils.isEmpty(sheet.getCell(13,i).getContents())){
	            		  curriculum1.setVideo(curriculum.getVideo());
	            	  }else{
	            		  curriculum1.setVideo(sheet.getCell(13,i).getContents());
	            	  }
//	            	  if(sheet.getCell(14,i).getContents() == "" || sheet.getCell(14,i).getContents() ==null){
	            		  if(StringUtils.isEmpty(sheet.getCell(14,i).getContents())){
	            		  curriculum1.setClassniddlerecord(curriculum.getClassniddlerecord());
	            	  }else{
	            		  curriculum1.setClassniddlerecord(sheet.getCell(14,i).getContents());
	            	  }
//	            	  if(sheet.getCell(15,i).getContents() == "" || sheet.getCell(15,i).getContents() == null){
	            		  if(StringUtils.isEmpty(sheet.getCell(15,i).getContents())){
	            		  curriculum1.setIntercourse(curriculum.getIntercourse());
	            	  }else{
	            		  curriculum1.setIntercourse(sheet.getCell(15,i).getContents());
	            	  }
//	            	  if(sheet.getCell(17,i).getContents() == "" || sheet.getCell(17,i).getContents() == null){
	            		  if(StringUtils.isEmpty(sheet.getCell(16,i).getContents())){
	            		  curriculum1.setIsupload(curriculum.getIsupload());
	            	  }else{
	            		  curriculum1.setIsupload(sheet.getCell(16,i).getContents());
	            	  }
	            		  //新增到临时表
	            	  curriculum1.setId(UUID.randomUUID().toString());
	            	  //-
	            	//第几周weeksbefore   周几weekdate 节次classnumbefore 不为空且都是半角
	            	  String errordescribe="";
	        			 //TODO
	        			 if(true){
//	        				 System.out.println("假设通过");
	        				 curriculum1.setSameclass(curriculum1.getClassnumbefore());
	        			 }else{
	        				 errordescribe+="第几周或节次含有全角字符;";
	        				 curriculum1.setErrordescribe(errordescribe); 
	        				 curriculum1.setFlag("0");
//	        				 continue;
	        			 }
	        			 //如果weeksbefore  classnumbefore 拆分后，后面的数字＜前面的，
	        			 
	        			if( !DateTermUtil.validatWeekNum(curriculum1.getWeeksbefore())){
	        				errordescribe+="第几周填写有误;";
	        				 curriculum1.setErrordescribe(errordescribe); 
	        				 curriculum1.setFlag("0");
	        			}
	        			 
	        			//如果weeksbefore  classnumbefore 拆分后，后面的数字＜前面的，
	        			 if(curriculum1.getClassnumbefore().indexOf("-") >0){
	        				 if(Integer.parseInt(curriculum1.getClassnumbefore().split("-")[1]) <= Integer.parseInt(curriculum1.getClassnumbefore().split("-")[0])){
	        					 errordescribe+="节次填写有误;";
		        				 curriculum1.setErrordescribe(errordescribe); 
		        				 curriculum1.setFlag("0");
	        				 }
	        			 }
	        			 Map<String,Object> map=new HashMap<String, Object>();
	        			 map.put("username", curriculum1.getUsername());
	        			 map.put("loginname", curriculum1.getUserno());
	        			 map.put("areaname", curriculum1.getAreaname());
	        			 map.put("innerid", curriculum1.getAreano());
	        			 if(curriculum1.getDeptno() != "" && curriculum1.getDeptname() != ""){
	        				 map.put("deptname", curriculum1.getDeptname());
		        			 map.put("code", curriculum1.getDeptno());
	        			 }
	        			 //教师工号、教师名称如果为空 
	        			 if(curriculum1.getUserno() == "" || curriculum1.getUsername() == ""){
	        				 errordescribe+="教师工号、教师名称不能为空;";
	        				 curriculum1.setErrordescribe(errordescribe); 
	        				 curriculum1.setFlag("0");
//	        				 continue;
	        				//教室编号、教室名称不能为空
	        			 }else if(curriculum1.getAreano() == "" || curriculum1.getAreaname() == ""){
	        				 errordescribe+="教室编号、教室名称不能为空;";
	        				 curriculum1.setErrordescribe(errordescribe); 
	        				 curriculum1.setFlag("0");
	        			 }else{
	        				 Map<String,Object> querymap=areaService.getCheck(map);
	        				 if(querymap==null){
	        					 errordescribe+="教师或教室或班级不存在;";
		        				 curriculum1.setErrordescribe(errordescribe); 
	        					 curriculum1.setFlag("0");
	        				 }else{
	        					 if(querymap.get("id") == null){
		        					 errordescribe+="不存在该教师;";
			        				 curriculum1.setErrordescribe(errordescribe); 
		        					 curriculum1.setFlag("0");
		        				 }else{
		        					 curriculum1.setUserid(querymap.get("id").toString());
		        				 }
		        				 if(querymap.get("areaid") == null){
		        					 errordescribe+="不存在该教室;";
			        				 curriculum1.setErrordescribe(errordescribe); 
		        					 curriculum1.setFlag("0");
		        				 }else{
		        					 curriculum1.setAreaid(querymap.get("areaid").toString());
		        				 }
		        				 if(curriculum1.getDeptno() != "" && curriculum1.getDeptname() != ""){
		        					 if(querymap.get("deptid") == null){
			        					 errordescribe+="不存在该班级;";
				        				 curriculum1.setErrordescribe(errordescribe); 
			        					 curriculum1.setFlag("0");
			        				 }else{
			        					 curriculum1.setDeptid(querymap.get("deptid").toString());
			        				 } 
			        			 }
		        				
	        				 }
	        			 }
	        			 
	        			 //根据areaid，上课时间，判断是否存在对应的方案，如果没有flag=0
	            	int dateadd = curriculumService.insertCurriculumlinshi(curriculum1);
	             	 list1.add(curriculum1);
	              }
			} catch (BiffException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return list1;
	}
	/**
	 * 查看当前时间的课节
	 */
	/*@RequestMapping(value = "findCurriculumByTime")
	public @ResponseBody
	List<Curriculum> findClassByTime(ServletResponse res){
		List<Curriculum>  list= curriculumService.findClassByTime();
		for(Curriculum curriculum :list){
			String cmin=curriculum.getCmin();
			String cmax=curriculum.getCmax();
			cmin=cmin.substring(0, 2)+":"+cmin.substring(2, 4)+":"+cmin.substring(4, 6);
			cmax=cmax.substring(0, 2)+":"+cmax.substring(2, 4)+":"+cmax.substring(4, 6);
			curriculum.setStarttime(cmin);
			curriculum.setEndtime(cmax);
		}
		System.out.println(list.size());
		System.out.println(list);
		return list;
		
	}*/
	
	/**
	 * 查看当前教室未来的课节
	 */
	@RequestMapping(value = "findClassByAreaidAndTime" ,method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	Map<String,Object> findClassByAreaidAndTime(HttpServletRequest req){
		Map<String,Object> map=new HashMap<String, Object>();
		String mac=req.getParameter("mac");
		DeviceView deviceView=deviceService.findDeviceByMac(mac);
		if(deviceView !=null){
			Curriculum co= new Curriculum();
			List<ScheduleTask> scheduleTaskList=curriculumService.findClassByAreaidAndTime(co,deviceView.getAreaid());
			ScheduleTask scheduleTask=manualVideoService.getScheduleTaskByAreaId(deviceView.getAreaid());
			if (scheduleTask!=null){
				scheduleTaskList.add(scheduleTask);
			}
			if(scheduleTaskList.size()==0){
				//return null;
				map.put("ScheduleTask", "NOScheduleTask");
			}
			//LOG.info("mac.."+mac+"==="+scheduleTaskList);
//			String json=JsonUtil.toJson(scheduleTaskList);
			map.put("ScheduleTask", scheduleTaskList);
//			System.out.println(map);
			return map;
		}
		//return null;
		map.put("ScheduleTask", "DeviceViewNotFind");
		return map;
	}
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public Curriculum get(@PathVariable("id") String id) {
		Curriculum curriculum = curriculumService.getCurriculum(id);
		if (curriculum == null) {
			String message = "数据不存在(id:" + id + ")";
			LOG.warn(message);
			throw new RestException(HttpStatus.NOT_FOUND, message);
		}
		return curriculum;
	}
	
	@RequestMapping(value = "page/{no}/{size}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(@PathVariable("no") String no, @PathVariable("size") String size) {
		Page<Curriculum> dataPage = curriculumService.findPageBy(Integer.parseInt(no), Integer.parseInt(size));
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("rows", dataPage.getContent());
		return mapData;
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaTypes.JSON)
	public ResponseEntity<?> create(@RequestBody Curriculum curriculum, UriComponentsBuilder uriBuilder) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		BeanValidators.validateWithException(validator, curriculum);

		// 保存新增
		curriculumService.saveCurriculum(curriculum);

		// 按照Restful风格约定，创建指向新任务的url, 也可以直接返回id或对象.
		String id = curriculum.getId();
		URI uri = uriBuilder.path("/curriculum/" + id).build().toUri();
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(uri);

		return new ResponseEntity(headers, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaTypes.JSON)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@RequestBody Curriculum curriculum) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		BeanValidators.validateWithException(validator, curriculum);

		// 保存更新
		curriculumService.updateCurriculum(curriculum);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable("id") String id) {
		curriculumService.deleteCurriculum(id);
	}
	/**
	 * 导入
	 */
	@RequestMapping(value = "/importcurriculum/importpage", method = RequestMethod.GET)
	public  String importpage() {
		return "importimage";
	}
	/**
	 * 修改直播课表
	 */
	@RequestMapping(value="/curriculum/importimage",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	JsonMsg importimage(MultipartHttpServletRequest req, Curriculum curriculum) {
		JsonMsg msg=new JsonMsg();
		//SysUserView sysUserView = JsonUtil.jsonToObject(req, SysUserView.class);
//		String filePath = CommonUtil.uploadImage("curriculum"+File.separatorChar, req,curriculum.getImageurl());
		String filePath = CommonUtil.upload(null, req,curriculum.getImageurl());
		 if(filePath !=null){
        	 curriculum.setImageurl(filePath);
        	msg=curriculumService.updateLiveCurriculumById(curriculum);
        	
        	return msg;
        }else{
        	msg=curriculumService.updateLiveCurriculumById(curriculum);
        }
		 return msg;
	}
	/**
	 * 测试
	 */
	@RequestMapping(value = "/findResourcefloderByAraeaid", method = RequestMethod.GET)
	public @ResponseBody
	void findResourcefloderByAraeaid(HttpServletRequest req){
		Map<String,Object> map=new HashMap<String, Object>();
		map.put("id", "a6398363c1874aa4aae18ece05bb52d8");
		List<Map<String,Object>> mapList= curriculumService.findResourcefloderByAraeaid(map);
		for(Map<String,Object> mapurl:mapList){
			if(mapurl != null){
			}
			
		}
	}
	
	/**
	 * 简单导播台调用
	 */
	@RequestMapping(value = "/findSimpleClassByTime", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	Curriculum findSimpleClassByTime(HttpServletRequest req){
		Curriculum curriculum = JsonUtil.jsonToObject(req, Curriculum.class);
		return curriculumService.findSimpleClassByTime(curriculum);
		
	}
	/**
	 * 简单导播台二次调用
	 */
	@RequestMapping(value = "/findSimpleClassByTimeTwo", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	Curriculum findSimpleClassByTimeTwo(HttpServletRequest req){
		Map<String,Object> map = JsonUtil.jsonToObject(req, Map.class);
		PageBean pageBean=new PageBean();    
		pageBean.setTreeid(map.get("treeid").toString());
		return curriculumService.findSimpleClassByTimeTwo(pageBean);
		
	}
	/**
	 * updateEndtimeByMac
	 * @Description: 根据批次号修改结束时间（设备调用）
	 * @author niuxl
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	@RequestMapping(value = "/updateEndtimeByBatch", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public @ResponseBody
	Map<String,String> updateEndtimeByBatch(HttpServletRequest req){
		String endtime = req.getParameter("endtime");
		String id = req.getParameter("id");
		Map<String,String> map = new HashMap<String, String>();
		 int result = curriculumService.updateEndtimeByBatch(id,endtime);
		 if(result==1){
			 map.put("result", "ok");
		 }else{
			 map.put("result", "fail");
		 }
	
		return map;
	}
	/**
	 * getSystime
	 * @Description: 根据批次号修改结束时间（设备调用）
	 * @author niuxl
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	@RequestMapping(value = "/getSystime", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public @ResponseBody
	String getSystime(HttpServletRequest req){
		return DateTermUtil.getNowTime();
	}
	/**
	 * selectEndtimeByBatch
	 * @Description: 根据批次号获取结束时间（设备调用）
	 * @author niuxl
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	@RequestMapping(value = "/selectEndtimeByBatch", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody
	String selectEndtimeByBatch(HttpServletRequest req){
		Curriculum curriculum = JsonUtil.jsonToObject(req, Curriculum.class);
		return curriculumService.selectEndtimeByBatch(curriculum.getId());
	}
	/**
	 * selectResourcefloderByBatch
	 * @Description: 根据批次号获取录像文件名字（设备调用）
	 * @author niuxl
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	@RequestMapping(value = "/selectResourcefloderByBatch", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public @ResponseBody
	String selectResourcefloderByBatch(HttpServletRequest req){
		Curriculum curriculum = JsonUtil.jsonToObject(req, Curriculum.class);
		return curriculumService.selectResourcefloderByBatch(curriculum.getEditclassbatch());
	}
	
}
