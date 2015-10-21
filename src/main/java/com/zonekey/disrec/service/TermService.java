/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.DateTermUtil;
import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.utils.DateUtils;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.TermMapper;
import com.zonekey.disrec.entity.Term;

/**
 * @Title: @{#} TermService.java
 * @Description: <p>Term实体业务类</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class TermService extends BaseService {
	private static final Logger log = LoggerFactory.getLogger(TermService.class);
	@Autowired
	private TermMapper termMapper;
	/** 
	 * @Title:findNowTerm
	 * @Description: 查找当前学期
	 * @author niuxl
	 * @date 2014年9月22日 下午2:18:35
	 * @return
	*/
	public Term findNowTerm(){
		return termMapper.findNowTerm();
	}
	/** 
	 * @Title:findAllTerm
	 * @Description: 查找所有学期
	 * @date 2014年9月22日 下午2:18:35
	 * @return
	*/
	public Map<String,Object> findAllTerm(PageBean pageBean){
		long total = termMapper.findAllTermCount(pageBean);
		List<Term>  termlist =termMapper.findAllTerm(pageBean);
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("total", total);
		map.put("data", termlist);
		return map;
	}
	/**
	 * 查看所有学期为下拉框使用,不分页
	 */
	public List<Term> findAllTermForShearch(){
		return termMapper.findAllTermForShearch();
	}
	
	/**
	 * 查看所有周,不分页
	 */
	public List<LinkedHashMap<String,Object>> findAllWeeksForShearch(){
		List<LinkedHashMap<String,Object>> list=new ArrayList<LinkedHashMap<String,Object>>();
		Term term = termMapper.findAllWeeksForShearch();
		if (null==term){
			LinkedHashMap<String,Object> map =new LinkedHashMap<String, Object>();
			map.put("id", "0");
			map.put("value", "第0周");
			list.add(map);	
			return list;
		}
		for(int i=0;i<Integer.parseInt(term.getWeeks());i++){
			LinkedHashMap<String,Object> map =new LinkedHashMap<String, Object>();
			map.put("id", (i+1)+"");
			map.put("value", "第"+(i+1)+"周");
			list.add(map);
		}
//		list.add(map);
		return list;
	}
	
	/**
	 * 查询当前学期下，当前周之后的周次,不分页
	 */
	public List<LinkedHashMap<String,Object>> findWillWeeksForShearch(){
		List<LinkedHashMap<String,Object>> list=new ArrayList<LinkedHashMap<String,Object>>();
		Term term = termMapper.findAllWeeksForShearch();
		//
		String week="0";
		String date= DateTermUtil.getNowDate();
		//查看当前学期
		Term nowterm=termMapper.findNowTerm();
		String endday=DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(nowterm.getStartday()), nowterm.getWeeks());
		//判断当前时间是当前学期的第几周
		if(nowterm != null){
			//在当前学期范围内，
			if(DateTermUtil.isOrNotTerm(nowterm.getStartday(), endday, date)== true){
				//1、如果在然后确定第几周
				week= DateTermUtil.getWeeksByDateAndTerm(DateTermUtil.dateParse(date),nowterm)+"";
			}
			else{
				//2、当前日期不在当前学期范围内时
				return list;
			}
		}else{
			return list;
		}
		if(term == null){
			return list;
		}
		//
		for(int i=Integer.parseInt(week);i<=Integer.parseInt(term.getWeeks());i++){
			LinkedHashMap<String,Object> map =new LinkedHashMap<String, Object>();
			map.put("id", i+"");
			map.put("value", i+"");
			list.add(map);
		}
//		list.add(map);
		return list;
	}

	/**
	 * @Title:findTermtips
	 * @Description: 学期提示
	 * @author niuxl
	 * @date 2014年10月31日 下午7:46:41
	 * @param term
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> findTermtips() {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			// 查看当前学期
			Term nowterm = termMapper.findNowTerm();
			// 当前时间，date类型
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");// 定义日期格式
			if (nowterm != null) {
				String endday=DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(nowterm.getStartday()), nowterm.getWeeks());
				log.debug("当前学期的最后一天是："+endday);
				//如果学期结束时间<当前时间，提示学期已经结束
				if(Integer.parseInt(endday.replaceAll("-", ""))< Integer.parseInt(DateTermUtil.getNowDate().replaceAll("-", ""))){
					map.put("id", 0);
					map.put("date", DateTermUtil.getNowDate());
					map.put("desc", "学期已经结束");
					
					Date date = format.parse(endday);// 将字符串转换为日期
					// 星期几
					String weekdate = DateTermUtil.getWeekDayByDate(date);
					map.put("weekdate", weekdate);
					map.put("termname", nowterm.getTermname());
					
					int week = DateTermUtil.getWeeksByDate(nowterm, date);
					map.put("week", week+"");
					return map;
				}
				
				Date date  = format.parse(DateTermUtil.getNowDate());// 将字符串转换为日期
				// 星期几
				String weekdate = DateTermUtil.getWeekDayByDate(date);
				log.debug("今天的日期为："+DateTermUtil.getNowDate());
				log.debug("今天是星期："+weekdate);
				// 根据学期和当前时间查到是第几周
				int week = DateTermUtil.getWeeksByDate(nowterm, date);
				log.debug("今天是第几周："+week);
				map.put("id", 1);
				map.put("termname", nowterm.getTermname());
				map.put("week", week+"");
				map.put("date", DateTermUtil.getNowDate());
				map.put("weekdate", weekdate);
			} else {
				map.put("id", 0);
				map.put("desc", "学期已经结束");
				map = null;
			}

		} catch (Exception e) {

		}
		return map;
	}
	/** 
	 * @Title:checkTermName
	 * @Description: 判断学期名字是否重复
	 * @author niuxl
	 * @date 2014年10月31日 下午7:46:41
	 * @param term
	 * @return
	*/
	@Transactional(readOnly = false)
	public JsonMsg checkTermName(Term term){
		JsonMsg jsonmsg=new JsonMsg();
		List<Term> nameList=termMapper.findAllTermByName(term);
		for(Term termname:nameList){
			if(termname.getTermname().equals(term.getTermname())){
				jsonmsg.setId("0");
				jsonmsg.setName("新增");
				jsonmsg.setOperation("学期名称重复，不允许新增");
				return jsonmsg;
			}
			
		}
		jsonmsg.setId("1");
		jsonmsg.setName("成功");
		jsonmsg.setOperation("学期名称不重复，允许新增");
		return jsonmsg;
	}
	/** 
	 * @Title:checkTermDate
	 * @Description: 判断学期时间是否重复
	 * @author niuxl
	 * @date 2014年10月31日 下午7:46:41
	 * @param term
	 * @return
	*/
	@Transactional(readOnly = false)
	public JsonMsg checkTermDate(Term term){
		JsonMsg jsonmsg=new JsonMsg();
		List<Term> termList=termMapper.findAllTermForShearch();
		String newendday=DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(term.getStartday()),term.getWeeks());
		String newstartday=term.getStartday();
		for(Term dayterm:termList){
			String oldendday=DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(dayterm.getStartday()),dayterm.getWeeks());
			String oldstartday=dayterm.getStartday();
			//比较这两个时间段有没有交叉 a_start <= b_end and a_end >= b_start
			//没有交叉
			if(DateTermUtil.isStartBeforeEndTime(
					DateTermUtil.dateParse(oldendday),
					DateTermUtil.dateParse(newstartday))
					|| DateTermUtil.isStartBeforeEndTime(DateTermUtil
							.dateParse(newendday),
							DateTermUtil.dateParse(oldstartday))){
				
			}else{
				jsonmsg.setId("0");
				jsonmsg.setName("是把");
				jsonmsg.setOperation("时间不能重复，不允许新增");
				return jsonmsg;
			}
		}
		jsonmsg.setId("1");
		jsonmsg.setName("成功");
		jsonmsg.setOperation("时间不重复，允许新增");
		return jsonmsg;
	}
	/** 
	 * @Title:insertTerm
	 * @Description: 添加新学期
	 * @date 2014年9月22日 下午2:18:35
	 * @return
	*/
	@Transactional(readOnly = false)
	public JsonMsg insertTerm(Term term){
		JsonMsg jsonmsg=new JsonMsg();
		List<Term> nameList=termMapper.findAllTermByName(term);
		for(Term termname:nameList){
			if(termname.getTermname().equals(term.getTermname())){
				jsonmsg.setId("0");
				jsonmsg.setName("新增");
				jsonmsg.setOperation("学期名称重复，不允许新增");
				return jsonmsg;
			}
			
		}
		List<Term> termList=termMapper.findAllTermForShearch();
		String newendday=DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(term.getStartday()),term.getWeeks());
		String newstartday=term.getStartday();
		for(Term dayterm:termList){
			String oldendday=DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(dayterm.getStartday()),dayterm.getWeeks());
			String oldstartday=dayterm.getStartday();
			//比较这两个时间段有没有交叉 a_start <= b_end and a_end >= b_start
			//没有交叉
			if(DateTermUtil.isStartBeforeEndTime(
					DateTermUtil.dateParse(oldendday),
					DateTermUtil.dateParse(newstartday))
					|| DateTermUtil.isStartBeforeEndTime(DateTermUtil
							.dateParse(newendday),
							DateTermUtil.dateParse(oldstartday))){
				
			}else{
				jsonmsg.setId("0");
				jsonmsg.setName("新增");
				jsonmsg.setOperation("时间不能重复，不允许新增");
				return jsonmsg;
			}
		}
		term.setId(IdUtils.uuid2());
		term.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		 int flag=termMapper.insertTerm(term);
		 int flag2=1;
		 if(term.getIscurrent() !=null && term.getIscurrent().equals("true")){
			  flag2=editiscurrent(term);
		 }
		 if(flag>0 && flag2>0){
			 jsonmsg.setId("1");
			 jsonmsg.setName("新增");
			 jsonmsg.setOperation("新增成功");
			 return jsonmsg;
		 }else{
			 jsonmsg.setId("0");
				jsonmsg.setName("新增");
				jsonmsg.setOperation("新增失败");
				return jsonmsg;
		 }
	}
	/** 
	 * @Title:findTermById
	 * @Description: 根据termid查询学期
	 * @date 2014年9月22日 下午2:18:35
	 * @return
	*/
	public Term findTermById(String id){
		return termMapper.findTermById(id);
	}
	public Term getTerm(String id) {
		return termMapper.findOne(id);
	}
	
	public Page<Term> findPageBy(int pageNo, int pageSize) {
		long total = termMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize, Sort.Direction.ASC, "id");
		List<Term> list = termMapper.findByPage((pageNo - 1) * pageSize, pageSize);
		Page<Term> page = new PageImpl<Term>(list, pageRequest, total);
		
		return page;
	}

	@Transactional(readOnly = false)
	public void saveTerm(Term term) {
		term.setId(IdUtils.uuid2());
		term.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		term.setDeleteflag(AppConstants.IS_STATUS_DEFAULT);
		termMapper.insert(term);
	}
	
	@Transactional(readOnly = false)
	public JsonMsg updateTerm(Term term) {
		
		JsonMsg jsonmsg=new JsonMsg();
		List<Term> nameList=termMapper.findAllTermByName(term);
		for(Term termname:nameList){
			if(termname.getTermname().equals(term.getTermname())){
				if(term.getId().equals(termname.getId())){
					//是自己的这条数据
				}else{
					jsonmsg.setId("0");
					jsonmsg.setName("修改");
					jsonmsg.setOperation("学期名称重复，不允许修改");
					return jsonmsg;
				}
				
			}
			
		}
		List<Term> termList=termMapper.findAllTermForShearch();
		String newendday=DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(term.getStartday()),term.getWeeks());
		String newstartday=term.getStartday();
		for(Term dayterm:termList){
			String oldendday=DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(dayterm.getStartday()),dayterm.getWeeks());
			String oldstartday=dayterm.getStartday();
			//比较这两个时间段有没有交叉 a_start <= b_end and a_end >= b_start
			//没有交叉
			if(DateTermUtil.isStartBeforeEndTime(
					DateTermUtil.dateParse(oldendday),
					DateTermUtil.dateParse(newstartday))
					|| DateTermUtil.isStartBeforeEndTime(DateTermUtil
							.dateParse(newendday),
							DateTermUtil.dateParse(oldstartday))){
				
			}else{
				if(term.getId().equals(dayterm.getId())){
					//是自己的这条数据
				}else{
					jsonmsg.setId("0");
					jsonmsg.setName("修改");
					jsonmsg.setOperation("时间不能重复，不允许修改");
					return jsonmsg;
				}
				
			}
		}
		term.setModifydate(new Date());
		term.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		 int flag=termMapper.updateTerm(term);
		 if(flag>0){
			 jsonmsg.setId("1");
			 jsonmsg.setName("修改");
			 jsonmsg.setOperation("修改成功");
			 return jsonmsg;
		 }
		 return jsonmsg;
	}
	
	@Transactional(readOnly = false)
	public int editiscurrent(Term term) {
		term.setModifydate(new Date());
		term.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		int del=termMapper.canceliscurrent(term);
		
		return termMapper.editiscurrent(term);
	}
	@Transactional(readOnly = false)
	public void deleteTerm(String id) {
		Term term = termMapper.findOne(id);
		term.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		termMapper.delete(id);
	}
}
