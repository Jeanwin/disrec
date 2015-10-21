/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import net.sf.ehcache.util.SetWrapperList;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.eclipse.jetty.util.log.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.DateTermUtil;
import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.common.utils.DateUtils;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.common.utils.ListSortUtil;
import com.zonekey.disrec.dao.AreaMapper;
import com.zonekey.disrec.dao.CurriculumMapper;
import com.zonekey.disrec.entity.CourseInfo;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.entity.CurriculumParamForWeek;
import com.zonekey.disrec.entity.Curriculumbase;
import com.zonekey.disrec.entity.Dept;
import com.zonekey.disrec.entity.MaxClass;
import com.zonekey.disrec.entity.ScheduleTask;
import com.zonekey.disrec.entity.Term;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeptView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.web.AreaRestController;

/**
 * @Title: @{#} CurriculumService.java
 * @Description: <p>Curriculum实体业务类</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class CurriculumService extends BaseService {
	private static final Logger LOG = LoggerFactory.getLogger(AreaRestController.class);
	@Autowired
	private CurriculumMapper curriculumMapper;
	@Autowired
	private TermService termservice;
	@Autowired
	private CurriculumbaseService curriculumbaseService;
	@Autowired
	private AreaMapper areaMapper;
	@Autowired
	private DeviceService deviceService;
	@Autowired
	private ServerService serverService;
	@Autowired
	private AreaService areaService;
	@Autowired
	private SysCodeService sysCodeService;
	/** 
	 * @Title:findCurriculum
	 * @Description: 查找全部课表
	 * 	
	 * @author xufx
	 * @date 2014年9月11日 下午2:45:26
	 * @return
	*/
	public String findCurriculum(){
		return JsonUtil.toJson(curriculumMapper.findAll());
	}
	/** 
	 * @Description: 查找可编辑课表
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public  Map<String,Object> findEditCurriculum(PageBean pageBean){
		
		long total = curriculumMapper.findEditCount(pageBean);
		List<Curriculum>  listCurriculum =  curriculumMapper.findEditCurriculum(pageBean);
		
		for(Curriculum curriculum :listCurriculum){
			String cmin=curriculum.getCmin();
			String cmax=curriculum.getCmax();
			cmin=cmin.substring(0, 2)+":"+cmin.substring(2, 4);
			cmax=cmax.substring(0, 2)+":"+cmax.substring(2, 4);
			curriculum.setStarttime(cmin);
			curriculum.setEndtime(cmax);
		}
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("total", total);
		map.put("data", listCurriculum);
		return map;
	}
	/** 
	 * @Title:findLiveCurriculum
	 * @Description: 查找直播列表
	 * 	
	 * @author xufx
	 * @date 2014年9月11日 下午2:45:30
	 * @return
	*/
	public  Map<String,Object> findLiveCurriculum(PageBean pageBean){
		long total = curriculumMapper.findLiveCount(pageBean);
		List<Curriculum>  listCurriculum =  curriculumMapper.findLiveCurriculum(pageBean);
//		处理对象属性
		handleLiveCurriculumAttribute(listCurriculum);
		
		ListSortUtil<Curriculum> sortList = new ListSortUtil<Curriculum>();
		sortList.sort(listCurriculum, "statenum", "asc");
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("total", total);
		map.put("data", listCurriculum);
		
		return map;
	}
	/**
	 * 
	 * @param listCurriculum
	 */
	private void handleLiveCurriculumAttribute(List<Curriculum> listCurriculum) {
		for(Curriculum curriculums :listCurriculum){
			if(StringUtils.isEmpty(curriculums.getCoursedesc()) || curriculums.getCoursedesc().equals("null")){
				curriculums.setCoursedesc("");
			}
			String strtime=curriculums.getDate().replace("-", "")+curriculums.getCmin();
			String endtime=curriculums.getDate().replace("-", "")+curriculums.getCmax();
			String nowtime=DateTermUtil.getNowTime().replace(":", "").replace("-", "").replace(" ", "");
			
			if( Long.parseLong(DateTermUtil.getNowDate().replace("-", "")) >=  Long.parseLong(curriculums.getDate().replace("-", ""))){
				if( Long.parseLong(strtime)<= Long.parseLong(nowtime) &&  Long.parseLong(endtime) >= Long.parseLong(nowtime)){
					curriculums.setState("进行中");
					curriculums.setStatenum(1);
				}else if( Long.parseLong(endtime) < Long.parseLong(nowtime)){
					curriculums.setState("已结束");
					curriculums.setStatenum(3);
				}else{
				curriculums.setState("未开始");
				curriculums.setStatenum(2);
				}
			}else{
				curriculums.setState("未开始");
				curriculums.setStatenum(2);
			}
			
		}
		
	}
	/** 
	 * @Title:findWeekCurriculum
	 * @Description: 初始化周课表页面
	 * 	
	 * @author xufx
	 * @date 2014年9月22日 下午1:21:12
	 * @param areaid
	 * @return
	*/
	public Map<String,Object> findWeekCurriculum(Curriculum curriculum){
		Map<String,Object> map = new HashMap<String, Object>();
		MaxClass maxclass = new MaxClass();
		//查看当前学期
		Term nowterm = termservice.findNowTerm();
//		处理当前学期的第几周问题
		String week = handleNowtermWeek(nowterm,curriculum);
		curriculum.setWeeks(week);
//		当前周的所有节次
		List<Curriculumbase> curriculumbaselist = searchWeekCurriculumbase(nowterm,week);
		//循环查到最大节次
		//根据 学期、第几周、教室id 查找周课表
		List<Curriculum>  listCurriculum =  curriculumMapper.findWeekCurriculum(curriculum);
		if(listCurriculum!= null){
			maxclass.setSmaxclass(curriculumbaselist.get(0).getSmaxclass());
			maxclass.setMaxclass(curriculumbaselist.get(0).getMaxclass());
			map.put("classmaxnum", maxclass);
			map.put("data", listCurriculum);
		}
		return map;
	}
	/**
	 * 根据起止时间查到一共有多少种方案
	 * @param nowterm
	 * @param week
	 * @return
	 */
	private List<Curriculumbase> searchWeekCurriculumbase(Term nowterm, String week) {
		//查找最大课节
		//根据学期开始时间、周数、当前第几周，查到当前周的起止时间
		String weekstr = DateTermUtil.getDateByTermAndWeeks(nowterm.getStartday(),week,"1");
		String weekend = DateTermUtil.getDateByTermAndWeeks(nowterm.getStartday(),week,"7");
		//根据起止时间查到一共有多少种方案
		Curriculumbase curriculumbase = new Curriculumbase();
		curriculumbase.setDatebegin(weekstr);
		curriculumbase.setDateend(weekend);
		List<Curriculumbase> curriculumbaselist = curriculumbaseService.findTypesByweek(curriculumbase);
		return curriculumbaselist;
	}
	/**
	 * 判断当前时间是当前学期的第几周
	 * @param nowterm
	 * @param curriculum
	 * @return
	 */
	private String handleNowtermWeek(Term nowterm, Curriculum curriculum) {
		String week = "0";
		if (null==nowterm) return week; 
		String date = DateTermUtil.getNowDate();
		String endday = DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(nowterm.getStartday()), nowterm.getWeeks());
				if(nowterm != null && curriculum.getWeeks() == null){
					//在当前学期范围内，
					if(DateTermUtil.isOrNotTerm(nowterm.getStartday(), endday, date) == true){
						//1、如果在然后确定第几周
						week = DateTermUtil.getWeeksByDateAndTerm(DateTermUtil.dateParse(date),nowterm)+"";
					}else{
						//2、当前日期不在当前学期范围内时，2.1在学期开始之前，显示第一周课表；
						if(DateUtils.isStartBeforeEndTime(DateTermUtil.dateParse(date), DateTermUtil.dateParse(nowterm.getStartday()))){
							week = "1";
						}else{
							//2.2在学期结束之后的，显示最后一周课表
							week = nowterm.getWeeks();
						}
					}
				}else{
					week = curriculum.getWeeks();
				}
				return week;
	}
	/** 
	 * @Title:findWeekCurriculum
	 * @Description: 初始化周课表页面
	 * 	
	 * @author xufx
	 * @date 2014年9月22日 下午1:21:12
	 * @param areaid
	 * @return
	*/
	public Map<String,Object> findWeekCurriculumList(Curriculum curriculum){
//			//查看当前学期
		Term nowterm = termservice.findNowTerm();
//		处理当前学期的第几周问题
		String week = handleNowtermWeek(nowterm,curriculum);
		CurriculumParamForWeek cuparam = new CurriculumParamForWeek();
//		填充对象 cuparam
		cuparam = fillIntoCuparam(cuparam,curriculum,nowterm,week);
		if(StringUtils.isNotBlank(curriculum.getLive())){
			String areaid="";
//			根据部门id deptId查询区域id
			List<AreaView> areaList = areaService.findAreaIdByDeptId(curriculum.getAreaid());
			if(areaList.size() > 0){
				areaid = areaList.get(0).getId();
			}else{
				areaid = null;
			}
			cuparam.setAreaid(areaid);
		}else{
			cuparam.setAreaid(curriculum.getAreaid());
		}
//		当前周的所有节次
		List<Curriculumbase> curriculumbaselist = searchWeekCurriculumbase(nowterm,week);
//		获取返回数据
		return getWeekCurriculumMap(curriculumbaselist,cuparam);
	}
	/**
	 * 填充对象 cuparam
	 * @param curriculum
	 * @param nowterm
	 * @return
	 */
	private CurriculumParamForWeek fillIntoCuparam(CurriculumParamForWeek cuparam,Curriculum curriculum,
			Term nowterm,String week) {
//		20150421 添加 xufx
		cuparam.setWeeks(week.toString());
		cuparam.setLive(curriculum.getLive());
		cuparam.setRecord(curriculum.getRecord());
		cuparam.setIsresource(curriculum.getIsresource());
		cuparam.setMonDate(DateTermUtil.getDateByTermAndWeeks(nowterm.getStartday(),week,"1"));
		cuparam.setTuesDate(DateTermUtil.getDateByTermAndWeeks(nowterm.getStartday(),week,"2"));
		cuparam.setWednesDate(DateTermUtil.getDateByTermAndWeeks(nowterm.getStartday(),week,"3"));
		cuparam.setThursDate(DateTermUtil.getDateByTermAndWeeks(nowterm.getStartday(),week,"4"));
		cuparam.setFriDate(DateTermUtil.getDateByTermAndWeeks(nowterm.getStartday(),week,"5"));
		cuparam.setSaturDate(DateTermUtil.getDateByTermAndWeeks(nowterm.getStartday(),week,"6"));
		cuparam.setSunDate(DateTermUtil.getDateByTermAndWeeks(nowterm.getStartday(),week,"7"));
		return cuparam;
	}
	/**
	 * 获取返回数据
	 * @param curriculumbaselist
	 * @param cuparam
	 * @return
	 */
	
	private Map<String, Object> getWeekCurriculumMap(List<Curriculumbase> curriculumbaselist,
			CurriculumParamForWeek cuparam) {
		MaxClass maxclass = new MaxClass();
		List<CurriculumParamForWeek>  weeklistCurriculum = new ArrayList<CurriculumParamForWeek>();
		Map<String,Object> map = new HashMap<String, Object>();
		//表示这段时间没有方案 上午最大节次3 全天最大节次6
		   if(curriculumbaselist == null || curriculumbaselist.size()==0){
			   maxclass.setSmaxclass(3);
				maxclass.setMaxclass(6);
				map.put("classmaxnum", maxclass);
			    map.put("data", "");
			    return map;
		   }
		   if(curriculumbaselist.size()>0){
			   for(int i=0;i<curriculumbaselist.size();i++){
				   cuparam.setClassbatch(curriculumbaselist.get(i).getClassbatch());
				   //查找课表集合数据42条或者49条
				    weeklistCurriculum =  curriculumMapper.findWeekCurriculumList(cuparam);
				    if(weeklistCurriculum != null && weeklistCurriculum.size()>0){
				    	maxclass.setSmaxclass(curriculumbaselist.get(i).getSmaxclass());
						maxclass.setMaxclass(curriculumbaselist.get(i).getMaxclass());
						map.put("classmaxnum", maxclass);
						map.put("data", weeklistCurriculum);
				    	break;
				    }
			   }
		   }
		if(weeklistCurriculum == null || weeklistCurriculum.size()==0){
			maxclass.setSmaxclass(3);
			maxclass.setMaxclass(6);
			map.put("classmaxnum", maxclass);
			map.put("data", "");
		}
		
		return map;
	}
	/** 
	 * @Title:findWeekCurriculum
	 * @Description: 初始化我的课表页面
	 * 	
	 * @author xufx
	 * @date 2014年9月22日 下午1:21:12
	 * @param areaid
	 * @return
	*/
	public Map<String,Object> findMyWeekCurriculumList(Curriculum curriculum){
		//		//查看当前学期
		Term nowterm = termservice.findNowTerm();
		Map<String,Object> map=new HashMap<String, Object>();
		if (null==nowterm) {
			map.put("classmaxnum", "-1");   //返回异常数据
		    map.put("data", "");
		    return map;
		}
	//	处理当前学期的第几周问题
		String week = handleNowtermWeek(nowterm,curriculum);
//		填充对象 cuparam
		CurriculumParamForWeek cuparam=new CurriculumParamForWeek();
        cuparam = fillIntoCuparam(cuparam,curriculum,nowterm,week);
        cuparam.setUserno(ShiroDbRealm.getCurrentLoginName());
        cuparam.setAreaid(curriculum.getAreaid());
////	当前周的所有节次
	List<Curriculumbase> curriculumbaselist = searchWeekCurriculumbase(nowterm,week);
////	获取返回数据
//	return getWeekCurriculumMap(curriculumbaselist,cuparam);		
		
		MaxClass maxclass=new MaxClass();
		
		 List<CurriculumParamForWeek>  weeklistCurriculum = new ArrayList<CurriculumParamForWeek>();
		   if(curriculumbaselist.get(0) == null || curriculumbaselist.size()==0){
			   maxclass.setSmaxclass(3);
				maxclass.setMaxclass(6);
				map.put("classmaxnum", maxclass);
			    map.put("data", "");
			    return map;
		   }
		   if(curriculumbaselist.size()>0){
			   for(int i=0;i<curriculumbaselist.size();i++){
				   cuparam.setClassbatch(curriculumbaselist.get(i).getClassbatch());
				   //查找课表集合数据42条或者49条
				    weeklistCurriculum =  curriculumMapper.findMyWeekCurriculumList(cuparam);
				    if(weeklistCurriculum != null && weeklistCurriculum.size()>0){
				    	maxclass.setSmaxclass(curriculumbaselist.get(i).getSmaxclass());
						maxclass.setMaxclass(curriculumbaselist.get(i).getMaxclass());
						map.put("classmaxnum", maxclass);
						map.put("data", weeklistCurriculum);
				    	break;
				    }
			   }
		   }
		if(weeklistCurriculum == null || weeklistCurriculum.size()==0){
			maxclass.setSmaxclass(3);
			maxclass.setMaxclass(6);
			map.put("classmaxnum", maxclass);
			map.put("data", "");
		}
		return map;
	}
	/**
	 * 查看本学期最大节次
	 */
	public List<LinkedHashMap<String,Object>> findMaxClass(){
		// 找出今天的所有方案
		 List<Curriculumbase> curriculumbaselist = findTypesByweek();
		 //循环找出最大的节次maxclass
		 int maxclass = findMaxclassByDay(curriculumbaselist);
		 //所有节次信息
		return findResultMaxClass(maxclass);
	}
	/**
	 * 	 //所有节次信息
	 * @param maxclass
	 * @return
	 */
	private List<LinkedHashMap<String, Object>> findResultMaxClass(int maxclass) {
	List<LinkedHashMap<String,Object>> list = new ArrayList<LinkedHashMap<String,Object>>();
		//组织返回数据
		for(int i=0;i < maxclass;i++){
		LinkedHashMap<String,Object> map = new LinkedHashMap<String, Object>();
		map.put("id", (i+1)+"");
		map.put("value", "第"+(i+1)+"节");
		list.add(map);
		}
	return list;
	}
	/**
	 * 循环找出最大的节次maxclass
	 * @param curriculumbaselist
	 * @return
	 */
	private int findMaxclassByDay(List<Curriculumbase> curriculumbaselist) {
		 int maxclass = 0;
		 for(int i=0;i<curriculumbaselist.size();i++){
			int tempclass = curriculumbaselist.get(i).getMaxclass();
			 if(tempclass > maxclass){
				 maxclass = tempclass;
			 }
		 }
		return maxclass;
	}
	/**
	 * 查找一今天的所有方案
	 * @return
	 */
	private List<Curriculumbase> findTypesByweek() {
		String today = DateTermUtil.getNowDate();
		Curriculumbase curriculumbase = new Curriculumbase();
		curriculumbase.setDatebegin(today);
		curriculumbase.setDateend(today);
		return curriculumbaseService.findTypesByweek(curriculumbase);
	}
	/** 
	 * @Title:deleteEditCurriculum
	 * @Description: 删除可编辑课表
	 * @author xufx
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	 * @return 只要有一个删除出错，就显示此次操作失败
	*/
	@Transactional(readOnly = false)
	public  JsonMsg deleteEditCurriculum(List<Curriculum> list){
		JsonMsg msg = new JsonMsg();
		List<Integer> flagList = new ArrayList<Integer>();
		int flag = 0;
		for(Curriculum curriculum : list){
			curriculum.setModifyuser(ShiroDbRealm.getCurrentLoginName());
			flag = curriculumMapper.deleteEditCurriculum(curriculum);
			flagList.add(flag);
		}
		if(flagList.contains(0)){
			msg.setId("0");
			msg.setName("删除");
			msg.setOperation("取消课程出错，课程无法取消，请稍后再试。");
		}else{
			msg.setId("1");
			msg.setName("成功");
			msg.setOperation("课程已被取消。");
		}
		return msg;
	}
	
	/** 
	 * @Title:updateCurriculumForBase
	 * @Description: 修改可编辑课表（修改非时间、非教室字段）
	 * @author xufx
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	 * @return
	*/
	@Transactional(readOnly = false)
	public  JsonMsg updateCurriculumForBase(Curriculum curriculum){
		JsonMsg msg=new JsonMsg();
		int flag = 0;
		//拆分节次
		List<Curriculum> cl = getCurriculumMessage(curriculum);
		//解析
		for (Curriculum curriculums : cl) {
			//20141028 add
			//判断该节课的时间，是否<=当前时间，如果小于，该条数据不允许新增，目前时间点时分，以后看情况要不要修改
			Date now = DateTermUtil.datetimeParse(DateTermUtil.getNowTime());
			Date starttime=DateTermUtil.datetimeParse(curriculums.getDate()+" "+curriculums.getStarttime());
//			Date endtime=DateTermUtil.datetimeParse(curriculums.getDate()+" "+curriculums.getEndtime());
			if(DateUtils.isStartBeforeEndTime(starttime, now)){
				LOG.debug("上课时间必须为当前时间之后，不允许修改");
				msg.setId("0");
				msg.setName("失败");
				msg.setOperation("上课时间必须为当前时间之后，不允许修改");
				return msg;
			}
		}
		List<Integer> flagList = new ArrayList<Integer>();
		int flag1 = curriculumMapper.deleteEditCurriculumForedit( curriculum);
		if(flag1 >0){
			for (Curriculum curriculumadd : cl) {
				curriculumadd.setId(UUID.randomUUID().toString());
				curriculumadd.setImageurl(AppConstants.defaultImageurl);
				//0为正常，1为被删除
				curriculumadd.setDeleteflag("0");
				 flag = curriculumMapper.insertCurriculum(curriculumadd);
				 flagList.add(flag);
			}	
		}
		 if(flagList.contains(0)){
			msg.setId("0");
			msg.setName("失败");
			msg.setOperation("很抱歉，您的修改不符合要求。");
				return msg;
		 }else{
			 msg.setId("1");
				msg.setName("成功");
				msg.setOperation("课表修改成功！");
				return msg;
		 }
	}
	/**
	 * //拆分节次
	 * @param curriculum
	 * @return
	 */
	private List<Curriculum> getCurriculumMessage(Curriculum curriculum) {
		//查询该教室、老师、date、sameclass是否和数据库的重复，
				String weeks = DateTermUtil.classconver(curriculum.getWeeks());
				String classnum = DateTermUtil.classconver(curriculum.getSameclass().toString());
				curriculum.setClassnumafter(classnum);
				curriculum.setWeeksafter(weeks);
		return parseOneCurriculumToListForexcel (curriculum);
	}
	/** 
	 * @Title:updateWeekCurriculum
	 * @Description: 修改周课表
	 * @author xufx
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	 * @return
	*/
	@Transactional(readOnly = false)
	public  JsonMsg updateWeekCurriculum(Curriculum curriculum){
		JsonMsg msg = new JsonMsg();
		int flag=0;
		//拆分节次
		List<Curriculum> cl = getCurriculumMessage(curriculum); 
		//解析
		for (Curriculum curriculums : cl) {
			// 2014-10-27add 新增的时候把时间框去掉了
			if (curriculums.getStarttime() == null
					|| curriculums.getStarttime() == "") {
				LOG.debug("没有对应的节次方案，不允许新增");
				msg.setId("0");
				msg.setName("失败");
				msg.setOperation("节次不在设置范围内");
				return msg;
			}
			// 新增前先要检查 同一教室、同一老师、同一时间是否有记录，有则跳过，无则新增
			List<Curriculum> samecl = curriculumMapper.findCurriculumByDate(curriculums);
			if (samecl.size() > 0) {
				//如果批次和自己的一样，跳过，否则冲突了，
				if(samecl.get(0).getEditclassbatch().equals(curriculum.getEditclassbatch())){
				}else{
					LOG.debug("这条记录中某些节次和已有的重复，不允许新增");
					msg.setId("0");
					msg.setName("失败");
					msg.setOperation("上课时间与其它课有冲突");
					return msg;
				}
			}
			//20141028 add
			//判断该节课的时间，是否<=当前时间，如果小于，该条数据不允许编辑
			Date now=DateTermUtil.datetimeParse(DateTermUtil.getNowTime());
			Date starttime=DateTermUtil.datetimeParse(curriculums.getDate()+" "+curriculums.getStarttime());
//			Date endtime=DateTermUtil.datetimeParse(curriculums.getDate()+" "+curriculums.getEndtime());
			if(DateUtils.isStartBeforeEndTime(starttime, now)){
				LOG.debug("上课时间必须为当前时间之后，不允许编辑");
				msg.setId("0");
				msg.setName("失败");
				msg.setOperation("上课时间必须为当前时间之后，不允许编辑");
				return msg;
			}
		}
		List<Integer> flagList = new ArrayList<Integer>();
		int flag1 = curriculumMapper.deleteEditCurriculumForedit( curriculum);
		if(flag1 > 0){
			for (Curriculum curriculumadd : cl) {
				curriculumadd.setId(UUID.randomUUID().toString());
				//这个设置可能需要去掉，新增的时候设置即可
				curriculumadd.setImageurl(AppConstants.defaultImageurl);
				curriculumadd.setResourcefloder(curriculumadd.getDate().replaceAll("-", "")+String.format("%03d", curriculumadd.getClassnum())+curriculum.getAreano());
				//0为正常，1为被删除
				curriculumadd.setDeleteflag("0");
				flag = curriculumMapper.insertCurriculum(curriculumadd);
				flagList.add(flag);
			}
		}
		 if(flagList.contains(0)){
			 msg.setId("0");
				msg.setName("失败");
				msg.setOperation("很抱歉，您的修改不符合要求。");
				return msg;
		 }else{
			 msg.setId("1");
				msg.setName("成功");
				msg.setOperation("课表修改成功！");
				return msg;
		 }
	}
	/** 
	 * @Title:updateEditCurriculum
	 * @Description: 修改可编辑课表
	 * @author xufx
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	 * @return
	*/
	@Transactional(readOnly = false)
	public  JsonMsg updateEditCurriculum(Curriculum curriculum){
		JsonMsg msg=new JsonMsg();
		int flag=0;
		//2015-01-16 如果这堂课开始上了，就不能改了， 否则之前的课会被删掉
		//判断该节课的时间，是否<=当前时间，如果小于，该条数据不允许编辑
		Date nowtime = DateTermUtil.datetimeParse(DateTermUtil.getNowTime());
		String max = curriculum.getDate()+" "+curriculum.getCmax().substring(0, 2)+":"+curriculum.getCmax().substring(2, 4)+":"+curriculum.getCmax().substring(4,6);
		String min = curriculum.getDate()+" "+curriculum.getCmin().substring(0, 2)+":"+curriculum.getCmin().substring(2, 4)+":"+curriculum.getCmin().substring(4,6);
		Date cmaxtime=DateTermUtil.datetimeParse(max);
		if(DateTermUtil.isOrNotClass(min,max,DateTermUtil.getNowTime()) ){
			msg.setId("0");
			msg.setName("失败");
			msg.setOperation("课程已经开始，不允许编辑");
			return msg;
		}else if(DateUtils.isStartBeforeEndTime(cmaxtime, nowtime)){
			LOG.debug("课程已经结束，不允许编辑");
			msg.setId("0");
			msg.setName("失败");
			msg.setOperation("课程已经结束，不允许编辑");
			return msg;
		}
		//拆分节次
		List<Curriculum> cl = getCurriculumMessage(curriculum); 
		//解析
		for (Curriculum curriculums : cl) {
			// 2014-10-27add 新增的时候把时间框去掉了
			if (curriculums.getStarttime() == null
					|| curriculums.getStarttime() == "") {
				LOG.debug("没有对应的节次方案，不允许新增");
				msg.setId("0");
				msg.setName("失败");
				msg.setOperation("节次不在设置范围内");
				return msg;
			}
			// 新增前先要检查 同一教室、同一老师、同一时间是否有记录，有则跳过，无则新增
			List<Curriculum> samecl = curriculumMapper
					.findCurriculumByDate(curriculums);
			if (samecl.size() > 0) {
				//如果批次和自己的一样，跳过，否则冲突了，
				if(samecl.get(0).getEditclassbatch().equals(curriculum.getEditclassbatch())){
				}else{
					LOG.debug("这条记录中某些节次和已有的重复，不允许新增");
					msg.setId("0");
					msg.setName("失败");
					msg.setOperation("上课时间与其它课有冲突");
					return msg;
				}
			}
			//20141028 add
			//判断该节课的时间，是否<=当前时间，如果小于，该条数据不允许编辑
			Date now=DateTermUtil.datetimeParse(DateTermUtil.getNowTime());
			Date starttime=DateTermUtil.datetimeParse(curriculums.getDate()+" "+curriculums.getStarttime());
			if(DateUtils.isStartBeforeEndTime(starttime, now)){
				LOG.debug("上课时间必须为当前时间之后，不允许编辑");
				msg.setId("0");
				msg.setName("失败");
				msg.setOperation("上课时间必须为当前时间之后，不允许编辑");
				return msg;
			}
		}
		List<Integer> flagList = new ArrayList<Integer>();
		int flag1 = curriculumMapper.deleteEditCurriculumForedit( curriculum);
		if(flag1 > 0){
			for (Curriculum curriculumadd : cl) {
				curriculumadd.setId(UUID.randomUUID().toString());
				//这个设置可能需要去掉，新增的时候设置即可
				curriculumadd.setImageurl(AppConstants.defaultImageurl);
				curriculumadd.setResourcefloder(curriculumadd.getDate().replaceAll("-", "")+String.format("%03d", curriculumadd.getClassnum())+curriculum.getAreano());
				//0为正常，1为被删除
				curriculumadd.setDeleteflag("0");
				flag=curriculumMapper.insertCurriculum(curriculumadd);
				flagList.add(flag);
			}
		}
		 if(flagList.contains(0)){
			 msg.setId("0");
				msg.setName("失败");
				msg.setOperation("很抱歉，您的修改不符合要求。");
				return msg;
		 }else{
			 msg.setId("1");
				msg.setName("成功");
				msg.setOperation("课表修改成功！");
				//
				Map<String,Object> ipmap=new HashMap<String, Object>();
				ipmap.put("areaid", curriculum.getAreaid());
				String mac=deviceService.getMacById(ipmap);
				//根据mac同步录播机
				String ipPort = serverService.getWebServer();
				String url="http://"+ipPort+"/deviceService/updateClassSchedule";
				LOG.info("修改课表通知录播机，地址为："+url+"mac为："+mac);
				//调用设备接口，根据mac，返回ip
				if(StringUtils.isNotEmpty(mac) && StringUtils.isNotEmpty(ipPort)){
					String deviceip = CommonUtil.sendGet(url,"mac="+mac);
				}
				return msg;
		 }
	}
	/** 
	 * @Title:findLiveCurriculumById
	 * @Description: 根据id查询一条直播课表
	 * 	
	 * @author xufx
	 * @date 2014年9月10日 下午4:33:17
	 * @param id
	 * @return
	*/
	public Curriculum findLiveCurriculumById(String id){
		return curriculumMapper.findLiveCurriculumById(id);
	}
	
	/** 
	 * updateLiveCurriculumById
	 * @Description: 根据id修改一条直播课表
	 * @author xufx
	 * @date 2014年9月10日 下午4:33:17
	 * @param id
	*/
	@Transactional(readOnly = false)
	public JsonMsg updateLiveCurriculumById(Curriculum curriculum){
		JsonMsg msg=new JsonMsg();
		curriculum.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		int flag= curriculumMapper.updateLiveCurriculumById(curriculum);
		if(flag==0){
			msg.setId("0");
			msg.setName("失败");
			msg.setOperation("直播课表设置失败");
		}else{
			msg.setId("1");
			msg.setName("成功");
			msg.setOperation("直播课表设置成功");
		}
		return msg;
	}
	/** 
	 * @Title:insertCurriculum
	 * @Description: 手动新增课表
	 * @author xufx
	 * @date 2014年9月11日 下午2:45:30
	 * @return
	*/
	@Transactional(readOnly = false)
	public JsonMsg  insertCurriculum(Curriculum curriculum){
		JsonMsg msg=new JsonMsg();
		int flag=0;
		//将周和节次 由1-3，解析为1,2,3，放到新增的对象中
		String weeks = DateTermUtil.classconver(curriculum.getWeeks());
		String classnum = DateTermUtil.classconver(curriculum
				.getSameclass().toString());
		//前台无法传递Weeksbefore和Classnumbefore，这里接收到处理一下
		curriculum.setClassnumafter(classnum);
		curriculum.setWeeksafter(weeks);
		//拆分节次
	    List<Curriculum> cl = parseOneCurriculumToListForinsert(curriculum);
		//以下这个for循环和编辑课表的一样，无法抽取 因为编辑课表多了一个批次的判断
		for (Curriculum curriculums : cl) {
			// 2014-10-27add 新增的时候把时间框去掉了
			if (curriculums.getStarttime() == null
					|| curriculums.getStarttime() == "") {
				LOG.debug("没有对应的节次方案，不允许新增");
				msg.setId("0");
				msg.setName("失败");
				msg.setOperation("节次不在设置范围内");
				return msg;
			}
			// 新增前先要检查 同一教室、同一老师、同一时间是否有记录，有则跳过，无则新增
			List<Curriculum> samecl = curriculumMapper
					.findCurriculumByDate(curriculums);
			if (samecl.size() > 0) {
				LOG.debug("这条记录中某些节次和已有的重复，不允许新增");
				msg.setId("0");
				msg.setName("失败");
				msg.setOperation("上课时间与其它课有冲突");
				return msg;
			}
			//20141028 add
			//判断该节课的时间，是否<=当前时间，如果小于，该条数据不允许新增
			Date now = DateTermUtil.datetimeParse(DateTermUtil.getNowTime());
			Date starttime=DateTermUtil.datetimeParse(curriculums.getDate()+" "+curriculums.getStarttime());
//			Date endtime=DateTermUtil.datetimeParse(curriculums.getDate()+" "+curriculums.getEndtime());
			if(DateUtils.isStartBeforeEndTime(starttime, now)){
				LOG.debug("上课时间必须为当前时间之后，不允许新增");
				msg.setId("0");
				msg.setName("失败");
				msg.setOperation("上课时间必须为当前时间之后，不允许新增");
				return msg;
			}
		}
		for (Curriculum curriculumadd : cl) {
			curriculumadd.setId(UUID.randomUUID().toString());
			curriculumadd.setImageurl(AppConstants.defaultImageurl);
			curriculumadd.setResourcefloder(curriculumadd.getDate().replaceAll("-", "")+String.format("%03d", curriculumadd.getClassnum())+curriculum.getAreano());
			// 0为正常，1为被删除
			curriculumadd.setDeleteflag("0");
			flag = curriculumMapper.insertCurriculum(curriculumadd);
			
		}
		if(flag>0){
			msg.setId("1");
			msg.setName("成功");
			msg.setOperation("课表添加成功！");
			Map<String,Object> ipmap = new HashMap<String, Object>();
			ipmap.put("areaid", curriculum.getAreaid());
			String mac = deviceService.getMacById(ipmap);
			//根据mac同步录播机
			String url="http://"+serverService.getWebServer()+"/deviceService/updateClassSchedule";
			LOG.info("新增课表通知录播机，地址为："+url+"，mac为："+mac);
			//调用设备接口，根据mac，返回ip
			if(StringUtils.isNotEmpty(mac) && StringUtils.isNotEmpty(serverService.getWebServer())){
				String deviceip =  CommonUtil.sendGet(url,"mac=" + mac);
				
			}
			return msg;
		}
		return msg;
	}
	/** 
	 * @Title:parseOneCurriculumToList
	 * @Description: 把临时表中的一条数据，解析为对应的多条
	 * @author xufx
	 * @date 2014年9月11日 下午2:45:30
	 * @return
	*/
	@Transactional(readOnly = false)
	public List<Curriculum> parseOneCurriculumToListForexcel(Curriculum curriculum){
//		如果周包括,，拆分为数组
		String[] weekarray = getWeekarray(curriculum);
		//如果节次包括-，拆分为数组
		String[] classidarray = getClassidarray(curriculum);
		//根据周的长度，分成相应个数的对象
		List<Curriculum> curriculumlist =  getWeekCurriculumList(curriculum,weekarray);
		//循环这个集合，再根据节次，把每个对象分成相应个数的对象
		List<Curriculum> curriculumsList = getClassidCurriculumList(curriculumlist,curriculum,classidarray);
			//把这些对象放到一个集合中，循环出每个进行新增，或者在上一步完成
			for(Curriculum curriculumadd:curriculumsList){
				//查看当前学期
				Term nowterm = termservice.findTermById(curriculum.getTermid());
				
				//根据termid查到学期开始时间
				String starttime=nowterm.getStartday();
				//根据学期开始时间，第几周，周几，查这天日期，放到date中
				String date = DateTermUtil.getDateByTermAndWeeks(starttime,curriculumadd.getWeeks(),curriculumadd.getWeekdate());
				if(date != "" && date != null){
					curriculumadd.setDate(date);
				}
				//根据date、areaid、可以查到该教室，这个学期，这个时间对应的方案，list
				List<Curriculumbase> curriculumbaselist=curriculumbaseService.findCurriculumbaseTimeByWhere(curriculumadd);
				//循环list，如果list中的iclass = classnum，就把list中的 starttime 、endtime 放到curriculumadd中
				for(Curriculumbase Curriculumbase:curriculumbaselist){
					if(Curriculumbase.getIclass().equals(curriculumadd.getClassnum())){
						curriculumadd.setStarttime(Curriculumbase.getStarttime());
						curriculumadd.setEndtime(Curriculumbase.getEndtime());
						curriculumadd.setClassid(Curriculumbase.getClassbatch());
						curriculumadd.setClassnum(Curriculumbase.getIclass());
					}
				}
			}
			return curriculumsList;
	}
	/**
	 * 循环这个集合，再根据节次，把每个对象分成相应个数的对象
	 * @param curriculumlist
	 * @param curriculum
	 * @param classidarray
	 * @return
	 */
	private List<Curriculum> getClassidCurriculumList(List<Curriculum> curriculumlist, Curriculum curriculum,
			String[] classidarray) {
		List<Curriculum> curriculumsList = new ArrayList<Curriculum>();
		//循环这个集合，再根据节次，把每个对象分成相应个数的对象
		for(Curriculum curriculumvo :curriculumlist){
			//根据周的长度，分成相应个数的对象
			
				for(int i=0;i<classidarray.length;i++){
					Curriculum curriculumclassid=new Curriculum();
					//将curriculum里面的属性值拷贝到curriculumweek，或者在下面完成
					CopyToVo(curriculumvo,curriculumclassid);
					curriculumclassid.setClassnum(Integer.parseInt(classidarray[i]));
					//为了判断是否是课间录像、和节次关联关系
					if(i<classidarray.length-1){
						curriculumclassid.setClassRelation(classidarray[i+1]);
					}else{
						//否或者1
						curriculumclassid.setClassniddlerecord("0");
					}
					curriculumsList.add(curriculumclassid);
				}
		}
		return curriculumsList;
	}
	/**
	 * 根据周的长度，分成相应个数的对象
	 * @param curriculum 
	 * @param weekarray
	 * @return
	 */
	private List<Curriculum> getWeekCurriculumList(Curriculum curriculum, String[] weekarray) {
		List<Curriculum> curriculumlist = new ArrayList<Curriculum>();
		for(int i=0;i<weekarray.length;i++){
			Curriculum curriculumweek=new Curriculum();
			//将curriculum里面的属性值拷贝到curriculumweek，或者在下面完成
			CopyToVo(curriculum,curriculumweek);
			curriculumweek.setWeeks(weekarray[i]);
			//设批次号
			curriculumweek.setEditclassbatch(UUID.randomUUID().toString());
			curriculumlist.add(curriculumweek);
		}
		return curriculumlist;
	}
	private String[] getClassidarray(Curriculum curriculum) {
		String[] classidarray;
		if(DateTermUtil.classconver(curriculum.getClassnumafter()).indexOf(",") >0){
			classidarray = DateTermUtil.classconver(curriculum.getClassnumafter()).split(",");
		}else{
			//定义一个一维数组
			classidarray = new String[1];
			classidarray[0] = curriculum.getClassnumafter();
		}
		return classidarray;
	}
	/**
	 * 如果第几周包括,，拆分为数组
	 * @param curriculum
	 * @return
	 */
	private String[] getWeekarray(Curriculum curriculum) {
		String[] weekarray;
		//如果第几周包括,，拆分为数组
		if(DateTermUtil.classconver(curriculum.getWeeksafter()).indexOf(",") >0){
			weekarray = DateTermUtil.classconver(curriculum.getWeeksafter()).split(",");
		}else{
			//定义一个一维数组
			weekarray = new String[1];
			weekarray[0] = curriculum.getWeeksafter();
		}
		return weekarray;
	}
	/** 
	 * @Title:parseOneCurriculumToList
	 * @Description: 把临时表中的一条数据，解析为对应的多条
	 * @author xufx
	 * @date 2014年9月11日 下午2:45:30
	 * @return
	*/
	@Transactional(readOnly = false)
	public List<Curriculum> parseOneCurriculumToListForinsert(Curriculum curriculum){
//		如果周包括,，拆分为数组
		String[] weekarray = getWeekarray(curriculum);
		//如果节次包括-，拆分为数组
		String[] classidarray = getClassidarray(curriculum);
		//根据周的长度，分成相应个数的对象
		List<Curriculum> curriculumlist =  getWeekCurriculumList(curriculum,weekarray);
		//循环这个集合，再根据节次，把每个对象分成相应个数的对象
		List<Curriculum> curriculumsList = getClassidCurriculumList(curriculumlist,curriculum,classidarray);
		
			//把这些对象放到一个集合中，循环出每个进行新增，或者在上一步完成
			for(Curriculum curriculumadd:curriculumsList){
				//查看当前学期
				Term nowterm=termservice.findNowTerm();
				
				//根据termid查到学期开始时间
				String starttime=nowterm.getStartday();
				//根据学期开始时间，第几周，周几，查这天日期，放到date中
				String date=DateTermUtil.getDateByTermAndWeeks(starttime,curriculumadd.getWeeks(),curriculumadd.getWeekdate());
				if(date != "" && date != null){
					curriculumadd.setDate(date);
				}
				curriculumadd.setTermid(nowterm.getId());
				//根据date、areaid、可以查到该教室，这个学期，这个时间对应的方案，list
				List<Curriculumbase> curriculumbaselist=curriculumbaseService.findCurriculumbaseTimeByWhere(curriculumadd);
				//循环list，如果list中的iclass = classnum，就把list中的 starttime 、endtime 放到curriculumadd中
				for(Curriculumbase Curriculumbase:curriculumbaselist){
					if(Curriculumbase.getIclass().equals(curriculumadd.getClassnum())){
						curriculumadd.setStarttime(Curriculumbase.getStarttime());
						curriculumadd.setEndtime(Curriculumbase.getEndtime());
						curriculumadd.setClassid(Curriculumbase.getClassbatch());
						curriculumadd.setClassnum(Curriculumbase.getIclass());
					}
				}
			}
			return curriculumsList;
	}
	/** 
	 * @Title:insertCurriculumlinshi
	 * @Description: 新增临时课表
	 * @author xufx
	 * @date 2014年9月11日 下午2:45:30
	 * @return
	*/
	@Transactional(readOnly = false)
	public int insertCurriculumlinshi(Curriculum curriculum) {
		String weeks = DateTermUtil.classconver(curriculum.getWeeksbefore());
		String classnum = DateTermUtil.classconver(curriculum
				.getClassnumbefore());
		curriculum.setClassnumafter(classnum);
		curriculum.setWeeksafter(weeks);
		if (curriculum.getFlag().equals("1")) {
			List<Curriculum> cl = parseOneCurriculumToListForexcel(curriculum);
			a:for (Curriculum curriculums : cl) {

				if (curriculums.getStarttime() == null
						|| curriculums.getStarttime() == "") {
					curriculum.setErrordescribe("没有对应的节次方案");
					curriculum.setFlag("0");
					break a;
				}
				String[] weeksarry = weeks.split(",");
				String[] classnumarry = classnum.split(",");
				// 检查临时表中有没有重复的（临时表都是通过excel导入的）
				//2014-10-28按照需求要求，这里不用验重，到数据库直接验重
				List<Curriculum> samecl = curriculumMapper
						.findCurriculumForImport(curriculums);
				for (Curriculum c : samecl) {
					for (int i = 0; i < weeksarry.length; i++) {
						if (c.getWeeksafter().indexOf(weeksarry[i]) > 0) {
							for (int j = 0; j < classnumarry.length; j++) {
								if (c.getClassnumafter().indexOf(
										classnumarry[j]) > 0) {
									curriculum.setErrordescribe("节次上有重复");
									curriculum.setFlag("0");
									break a;
								}
							}

						}
					}
				}
			}

		}
		return curriculumMapper.insertCurriculumlinshi(curriculum);
	}
	/** 
	 * @Title:insertCurriculum
	 * @Description: 新增课表（导入）
	 * @author xufx
	 * @date 2014年9月11日 下午2:45:30
	 * @return
	*/
	@Transactional(readOnly = false)
	public int insertCurriculumList(List<Curriculum> curriculumList) {
		int flag = 0;
		for (Curriculum curriculum : curriculumList) {
			List<Curriculum> cl = parseOneCurriculumToListForexcel(curriculum);
			
			a: for (Curriculum curriculums : cl) {
				// 新增前先要检查 同一教室、同一老师、同一节课是否有记录，有则跳过，（防止手动新加的课表，在临时表中是查不到的）
				List<Curriculum> samecl = curriculumMapper
						.findCurriculumByDate(curriculums);
				if (samecl.size() > 0) {
					curriculum.setErrordescribe("节次和已有的重复，不允许新增");
					curriculum.setFlag("0");
					curriculumMapper.updateCurriculummid(curriculum);
					LOG.debug("这条记录中某些节次和已有的重复，不允许新增");
					// 将临时表中的这条标为节次和已有的重复
					break a;
				}
				//20141028 add
				//判断该节课的时间，是否<=当前时间，如果小于，该条数据不允许新增
				Date now=DateTermUtil.datetimeParse(DateTermUtil.getNowTime());
				Date starttime=DateTermUtil.datetimeParse(curriculums.getDate()+" "+curriculums.getStarttime());
				if(DateUtils.isStartBeforeEndTime(starttime, now)){
					curriculum.setErrordescribe("上课时间必须为当前时间之后，不允许新增");
					curriculum.setFlag("0");
					curriculumMapper.updateCurriculummid(curriculum);
					LOG.debug("上课时间必须为当前时间之后，不允许新增");
					break a;
				}
			}
		}
		if(curriculumList.size()>0){
			// 去数据库中查一下，该批次、flag=1的数据
			Curriculum curriculumadd = new Curriculum();
			curriculumadd.setFlag("1");
			curriculumadd.setExcelbatch(curriculumList.get(0).getExcelbatch());
			List<Curriculum> curriculumListadd = curriculumMapper.findCurriculummid(curriculumadd);
			for (Curriculum curriculumvo : curriculumListadd) {
				List<Curriculum> cl = parseOneCurriculumToListForexcel(curriculumvo);
				for (Curriculum curriculumnew : cl) {
					curriculumnew.setId(UUID.randomUUID().toString());
					curriculumnew.setImageurl(AppConstants.defaultImageurl);
					curriculumnew.setResourcefloder(curriculumnew.getDate().replaceAll("-", "")+String.format("%03d", curriculumnew.getClassnum())+curriculumvo.getAreano());
					// 0为正常，1为被删除
					curriculumnew.setDeleteflag("0");
				 flag = curriculumMapper.insertCurriculum(curriculumnew);
				}
			}
		}
		return flag;
	}
	/** 
	 * @Title:CopyToVo
	 * @Description: 把一个对象的属性copy到另外一个对象中
	 * @author xufx
	 * @date 2014年9月30日 上午10:25:44
	 * @param oldCurriculum
	 * @param newCurriculum
	 * @return
	*/
	public Curriculum CopyToVo(Curriculum oldCurriculum,Curriculum newCurriculum){
		newCurriculum.setUserid(oldCurriculum.getUserid());
		newCurriculum.setAreaid(oldCurriculum.getAreaid());
		newCurriculum.setTermid(oldCurriculum.getTermid());
		newCurriculum.setDate(oldCurriculum.getDate());//???
		newCurriculum.setSubject(oldCurriculum.getSubject());
		newCurriculum.setSubjectattribute(oldCurriculum.getSubjectattribute());
		newCurriculum.setDeptid(oldCurriculum.getDeptid());
		newCurriculum.setWeeks(oldCurriculum.getWeeks());
		newCurriculum.setWeekdate(oldCurriculum.getWeekdate());
		newCurriculum.setLive(oldCurriculum.getLive());
		newCurriculum.setLivemodel(oldCurriculum.getLivemodel());
		newCurriculum.setRecord(oldCurriculum.getRecord());
		newCurriculum.setVideo(oldCurriculum.getVideo());
		newCurriculum.setClassniddlerecord(oldCurriculum.getClassniddlerecord());
		newCurriculum.setIntercourse(oldCurriculum.getIntercourse());
		newCurriculum.setSameclass(oldCurriculum.getSameclass());
		newCurriculum.setExcelbatch(oldCurriculum.getExcelbatch());
		newCurriculum.setFlag(oldCurriculum.getFlag());
//		newCurriculum.setVideoupload(oldCurriculum.getVideoupload());
		newCurriculum.setEditclassbatch(oldCurriculum.getEditclassbatch());
		newCurriculum.setClassnumafter(oldCurriculum.getClassnumafter());
		newCurriculum.setAreano(oldCurriculum.getAreano());
		newCurriculum.setIsupload(oldCurriculum.getIsupload());
		newCurriculum.setCoursedesc(oldCurriculum.getCoursedesc());
		
		return newCurriculum;
	}
	/** 
	 * @Description: 按条件查询课表
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public  List<Curriculum> findCurriculumByWhere(Curriculum curriculum){
		return curriculumMapper.findCurriculumByWhere(curriculum);
	}
	
	/** 
	 * @Title:cancelLiveCurriculum
	 * @Description: 取消直播
	 * 	
	 * @author xufx
	 * @date 2014年9月11日 下午2:45:30
	 * @return
	*/
	@Transactional(readOnly = false)
	public JsonMsg cancelLiveCurriculum(Curriculum curriculum){
		JsonMsg msg=new JsonMsg();
		curriculum.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		int flag= curriculumMapper.cancelLiveCurriculum(curriculum);
		if(flag==0){
			msg.setId("0");
			msg.setName("失败");
			msg.setOperation("直播课表设置失败");
		}else{
			msg.setId("1");
			msg.setName("成功");
			msg.setOperation("直播课表设置成功");
		}
		return msg;
	}
	
	/** 
	 * @Title:cancelLiveCurriculum
	 * @Description: 删除直播
	 * 	
	 * @author xufx
	 * @date 2014年9月11日 下午2:45:30
	 * @return
	*/
	@Transactional(readOnly = false)
	public JsonMsg deleteLiveCurriculum(Curriculum curriculum){
		JsonMsg msg=new JsonMsg();
		curriculum.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		int flag= curriculumMapper.deleteLiveCurriculum(curriculum);
		if(flag==0){
			msg.setId("0");
			msg.setName("失败");
			msg.setOperation("删除失败");
		}else{
			msg.setId("1");
			msg.setName("成功");
			msg.setOperation("删除成功");
		}
		return msg;
	}
	
	/** 
	 * @Description: 按条件查询临时表
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public  List<Curriculum> findCurriculummid(Curriculum curriculum){
		
		List<Curriculum>  listCurriculum =  curriculumMapper.findCurriculummid(curriculum);
		return listCurriculum;
	}
	

	/** 
	 * @Description: 查看当前时间的课节
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public  Map<String,List<Curriculum>> findClassByTime(PageBean pageBean){

//		long total=curriculumMapper.findClassByTimeCount(pageBean);
		List<Curriculum>  listCurriculum =  curriculumMapper.findClassByTime(pageBean);
		Map<String,List<Curriculum>> map = new HashMap<String,List<Curriculum>>();
//		map.put("total", total);
		map.put("data", listCurriculum);
		return map;
//		
//		Map<String,List<Curriculum>> map = new HashMap<String,List<Curriculum>>();
//		List<Curriculum>  ret=new ArrayList<Curriculum>();
//		List<Curriculum>  listCurriculum = new ArrayList<Curriculum>();
//		PageBean p =new PageBean();
//		p.setPage(pageBean.getPage());
////		long total=curriculumMapper.findClassByTimeCount(pageBean);
//
//		for(int i=0;i<areaids.length;i++){
//			p =new PageBean();
//			p.setPage(pageBean.getPage());
//			p.setTreeid(areaids[i].toString());
//			listCurriculum = new ArrayList<Curriculum>();
//			listCurriculum =  curriculumMapper.findClassByTime(p);
//			if(listCurriculum.size()>0)
//			ret.add(listCurriculum.get(0));
//		}
//		
////		p.setTreeid(areaids[0]);
////		listCurriculum =  curriculumMapper.findClassByTime(p);
////		if(listCurriculum.size()>0)
////		ret.add(listCurriculum.get(0));
////		if(areaids.length>1){
////			for(int i=1;i<areaids.length;i++){
////				p =new PageBean();
////				p.setPage(pageBean.getPage());
////				p.setTreeid(areaids[i].toString());
////				listCurriculum = new ArrayList<Curriculum>();
////				listCurriculum =  curriculumMapper.findClassByTime(p);
////				if(listCurriculum.size()>0)
////				ret.add(listCurriculum.get(0));
////			}
////		}
//		
//
//		
//		
////		do{
////			int i=0;
////			pageBean.setTreeid(areaids[i]);
////			listCurriculum =  curriculumMapper.findClassByTime(pageBean);
////			ret.add(listCurriculum.get(i));
////			i++;
////		}while(areaids.length>1);
//		
//		
////		map.put("total", total);
//		map.put("data", ret);
//		return map;
	}
	/** 
	 * updateCurriculummid
	 * @Description: 根据id修改一临时表
	 * @author xufx
	 * @date 2014年9月10日 下午4:33:17
	 * @param id
	*/
	public int updateCurriculummid(Curriculum curriculum){
		return curriculumMapper.updateCurriculummid(curriculum);
	}
	/** 
	 * @Title:insertCurriculummid
	 * @Description: 新增课表
	 * @author xufx
	 * @date 2014年9月11日 下午2:45:30
	*/
//	public int insertCurriculummid(Curriculum curriculum){
//		return curriculumMapper.insertCurriculummid(curriculum);
//	}
	
	public Curriculum getCurriculum(String id) {
		return curriculumMapper.findOne(id);
	}
	
	public Page<Curriculum> findPageBy(int pageNo, int pageSize) {
		long total = curriculumMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize, Sort.Direction.ASC, "id");
		List<Curriculum> list = curriculumMapper.findByPage((pageNo - 1) * pageSize, pageSize);
		Page<Curriculum> page = new PageImpl<Curriculum>(list, pageRequest, total);
		
		return page;
	}

	@Transactional(readOnly = false)
	public void saveCurriculum(Curriculum curriculum) {
		curriculum.setId(IdUtils.uuid2());
		curriculum.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		curriculum.setDeleteflag(AppConstants.IS_STATUS_DEFAULT);
		curriculumMapper.insert(curriculum);
	}
	
	@Transactional(readOnly = false)
	public void updateCurriculum(Curriculum curriculum) {
		curriculum.setModifydate(new Date());
		curriculum.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		curriculumMapper.update(curriculum);
	}

	@Transactional(readOnly = false)
	public void deleteCurriculum(String id) {
		Curriculum curriculum = curriculumMapper.findOne(id);
		curriculum.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		curriculumMapper.delete(id);
	}
	
	/** 
	 * @Description: 测试课节
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	@Transactional(readOnly = false)
	public  List<Curriculum> testCurriculum(Curriculum curriculum){
		
		List<Curriculum>  listCurriculum =  curriculumMapper.testCurriculum(curriculum);
		for(Curriculum curriculums :listCurriculum){
			String strtime=curriculums.getDate().replace("-", "")+curriculums.getCmin();
			String endtime=curriculums.getDate().replace("-", "")+curriculums.getCmax();
			String nowtime=DateTermUtil.getNowTime().replace(":", "").replace("-", "").replace(" ", "");
			if( Long.parseLong(DateTermUtil.getNowDate().replace("-", "")) >=  Long.parseLong(curriculums.getDate().replace("-", ""))){
				if( Long.parseLong(strtime)<= Long.parseLong(nowtime) &&  Long.parseLong(endtime) >= Long.parseLong(nowtime)){
					curriculums.setState("进行中");
				}else if( Long.parseLong(endtime) < Long.parseLong(nowtime)){
					curriculums.setState("已结束");
			}else{
				curriculums.setState("未开始");
		}
			}else{
				curriculums.setState("未开始");
			}
		}
		return listCurriculum;
	}
	/** 
	 * @Description: 课表导出
	 * @date 2014年11月17日 上午11:16:07
	 * @param curriculum
	*/
	public List<Curriculum> exportcurriculum(Curriculum curriculum){
		curriculum.setFlag("0");
		return curriculumMapper.findCurriculummid(curriculum);
	}
	/** 
	 * @Description: 查看当前教室未来的课节(设备调用)
	 * @date 2014年11月17日 上午11:16:07
	 * @param curriculum
	*/
	public List<ScheduleTask> findClassByAreaidAndTime(Curriculum curriculum,String s){
		curriculum.setAreaid(s);
		List<Curriculum>  tasklist=curriculumMapper.findClassByAreaidAndTime(curriculum);	
		List<ScheduleTask>  scheduleTaskList=new ArrayList<ScheduleTask>();
		for(int i=0;i<tasklist.size();i++){
			ScheduleTask scheduleTask=new ScheduleTask();
			CourseInfo courseInfo=new CourseInfo();
			//这节的的结束时间（考虑是否课间录像）
			String addstoptime="";
			//如果这节课是课间录像
			Curriculum curriculumTest = tasklist.get(i);
			if(curriculumTest != null){
				if(curriculumTest.getClassniddlerecord().equals("1")){     //代表课间录像
					//这节课a
					int a= curriculumTest.getClassnum();
					//批次
					String classbatch= curriculumTest.getClassid();
					Curriculumbase  curriculumbase =new Curriculumbase();
					//下节课
					curriculumbase.setIclass(a+1);
					curriculumbase.setClassbatch(classbatch);
					//关联的下节课a+1
					Curriculumbase  curriculumbaseVO=curriculumbaseService.findCurriculumbaseClassbatchAndIclass(curriculumbase);
					//下节课的开始时间
					String nextStartime=curriculumbaseVO.getStarttime();
					//下节课的开始时间=这节课的结束时间
					addstoptime=curriculumTest.getDate()+" "+nextStartime;
					
				}else{
					addstoptime=curriculumTest.getEndtime();
				}
				scheduleTask.setDirectoryName(curriculumTest.getResourcefloder()!=null?curriculumTest.getResourcefloder():"无");
				courseInfo.setDepartment("无");
				courseInfo.setSubject("无");
				courseInfo.setCourseName(curriculumTest.getSubject());
				courseInfo.setTeacher(curriculumTest.getUsername());
				courseInfo.setGrade(curriculumTest.getDeptname());
				courseInfo.setAddress(curriculumTest.getAreaname());
				courseInfo.setDescription(curriculumTest.getCoursedesc());
				scheduleTask.setCourseInfo(courseInfo);
				scheduleTask.setRecording(curriculumTest.getRecord().equals("1")?"true":"False");
				String mode=sysCodeService.getModeByCode(curriculumTest.getVideo());
				scheduleTask.setRecordMode(mode);
				//scheduleTask.setRecordMode(curriculumTest.getVideo().equals("33")?"Movie":(curriculumTest.getVideo().equals("34")?"Resource":(curriculumTest.getVideo().equals("35")?"All":"")));
				scheduleTask.setStartTime(curriculumTest.getStarttime());
				scheduleTask.setStopTime(addstoptime);
				scheduleTask.setLiving(curriculumTest.getLive().equals("1")?"true":"False");
				scheduleTask.setLivingMode(mode);
				//scheduleTask.setLivingMode(curriculumTest.getLivemodel().equals("33")?"Movie":(curriculumTest.getLivemodel().equals("34")?"Resource":(curriculumTest.getLivemodel().equals("35")?"All":"")));
				scheduleTask.setStartMode("Auto");
				scheduleTaskList.add(scheduleTask);
			}
			
		}
		return scheduleTaskList;
	}
	/** 
	 * @Description: 教室正在上的课
	 * @date 2014年11月18日 上午11:16:07
	 * @param curriculum
	*/
	public List<Curriculum> findClassByAreaid(String areaid){
		return curriculumMapper.findClassByAreaid(areaid);
	}
	/**
	 * @Title:findResourcefloderByAraeaid
	 * @Description: <p>TODO</p>
	 * @author xufx
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	public List<Map<String,Object>> findResourcefloderByAraeaid(Map<String,Object> map){
		return curriculumMapper.findResourcefloderByAraeaid(map);
	}
	
	/**
	 * @Title:findSimpleClassByTime
	 * @Description: 根据教室id查课（设备调用）
	 * @author xufx
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	public Curriculum findSimpleClassByTime(Curriculum curriculum){
		Curriculum curriculumvo= curriculumMapper.findSimpleClassByTime(curriculum);
		if(curriculumvo !=null){
			String starttime=curriculumvo.getStarttime();
			String endtime=curriculumvo.getEndtime();
			String cmix=curriculumvo.getCmin();
			String cmax=curriculumvo.getCmax();
			
			curriculumvo.setStarttime(curriculumvo.getDate()+" "+starttime.substring(0, 2)+":"+starttime.substring(2, 4)+":"+starttime.substring(4,6));
			curriculumvo.setEndtime(curriculumvo.getDate()+" "+endtime.substring(0, 2)+":"+endtime.substring(2, 4)+":"+endtime.substring(4,6));
			curriculumvo.setCmin(cmix.substring(0, 2)+":"+cmix.substring(2, 4)+":"+cmix.substring(4,6));
			curriculumvo.setCmax(curriculumvo.getDate()+" "+cmax.substring(0, 2)+":"+cmax.substring(2, 4)+":"+cmax.substring(4,6));
		}
		return curriculumvo;
	}
	
	/**
	 * @Title:findSimpleClassByTimeTwo
	 * @Description: 根据教室id查课（简版导播台2次调用）
	 * @author xufx
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	public Curriculum findSimpleClassByTimeTwo(PageBean pageBean){
		List<Curriculum> curriculumvolist= curriculumMapper.findClassByTime(pageBean);
		if(curriculumvolist !=null && curriculumvolist.size()>0){
			String starttime=curriculumvolist.get(0).getStarttime();
			String endtime=curriculumvolist.get(0).getEndtime();
			
			curriculumvolist.get(0).setStarttime(curriculumvolist.get(0).getDate()+" "+starttime.substring(0, 2)+":"+starttime.substring(2, 4)+":"+starttime.substring(4,6));
			curriculumvolist.get(0).setEndtime(curriculumvolist.get(0).getDate()+" "+endtime.substring(0, 2)+":"+endtime.substring(2, 4)+":"+endtime.substring(4,6));
			curriculumvolist.get(0).setUsername(curriculumvolist.get(0).getUsername().split(" ")[0]);
			return curriculumvolist.get(0);
		}else{
			Curriculum curriculum=new Curriculum();
			AreaView areavo=areaMapper.findAreaByid(pageBean.getTreeid());
			curriculum.setAreaname(areavo.getName());
			curriculum.setStarttime(DateTermUtil.getNowTime());
			curriculum.setEndtime(DateUtils.getOneHours());
			curriculum.setSubject("无");
			curriculum.setUsername("无");
			return curriculum;
		}
	}
	/**
	 * updateEndtimeByMac
	 * @Description: 根据批次号修改结束时间（设备调用）
	 * @author xufx
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateEndtimeByBatch(String id,String endtime){
		
		try{
			SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");// 定义日期格式
			
			if(StringUtils.isNotEmpty(id) && StringUtils.isNotEmpty(endtime)){
				Date endtimedate=format.parse(endtime);
				 return curriculumMapper.updateEndtimeByBatch(id,format.format(endtimedate));
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return 0;
	}
	/**
	 * selectEndtimeByBatch
	 * @Description: 根据批次号获取结束时间（设备调用）
	 * @author xufx
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	public String selectEndtimeByBatch(String editclassbatch){
		if(StringUtils.isNotEmpty(editclassbatch)){
			return curriculumMapper.selectEndtimeByBatch(editclassbatch);
		}
		return null;
	}
	/**
	 * selectResourcefloderByBatch
	 * @Description: 根据批次号获取录像文件名字（设备调用）
	 * @author xufx
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	public String selectResourcefloderByBatch(String editclassbatch){
		if(StringUtils.isNotEmpty(editclassbatch)){
		return curriculumMapper.selectResourcefloderByBatch(editclassbatch);
		}
		return null;
	}
	/**
	 * 手机接口
	 */
	public Map<String, Object> findWeekCurriculumListWithMobile(
			Curriculum curriculum) {
		//查看当前学期
		Term nowterm = termservice.findNowTerm();
//		处理当前学期的第几周问题
		String week = handleNowtermWeek(nowterm,curriculum);
		curriculum.setWeeks(week);
		
//		填充对象 cuparam
		CurriculumParamForWeek cuparam = new CurriculumParamForWeek();
		cuparam = fillIntoCuparam(cuparam,curriculum,nowterm,week);
		
		Map<String,Object> map=new HashMap<String, Object>();
		MaxClass maxclass=new MaxClass();
//		20150421 tj xufx 
		if(StringUtils.isNotBlank(curriculum.getLive())){
			String areaid="";
//			根据部门id deptId查询区域id
			List<AreaView> areaList = areaService.findAreaIdByDeptId(curriculum.getAreaid());
			if(areaList.size() > 0){
				areaid = areaList.get(0).getId();
			}else{
				areaid = null;
			}
			cuparam.setAreaid(areaid);
		}else{
			cuparam.setAreaid(curriculum.getAreaid());
		}
//		当前周的所有节次
		List<Curriculumbase> curriculumbaselist = searchWeekCurriculumbase(nowterm,week);
		/**
		 * 手机接口
		 */
		List<CurriculumParamForWeek>  weeklistCurriculum=new ArrayList<CurriculumParamForWeek>();
		   if(curriculumbaselist == null || curriculumbaselist.size()==0){//表示这段时间没有方案 上午最大节次3 全天最大节次6
			   maxclass.setSmaxclass(3);
				maxclass.setMaxclass(6);
				map.put("classmaxnum", maxclass);
				map.put("monDate", "");
				map.put("tuesDate",  "");
				map.put("wednesDate",  "");
				map.put("thursDate",  "");
				map.put("friDate",  "");
				map.put("saturDate",  "");
				map.put("sunDate",  "");
			    return map;
		   }
		   if(curriculumbaselist.size()>0){
			   for(int i=0;i<curriculumbaselist.size();i++){
				   cuparam.setClassbatch(curriculumbaselist.get(i).getClassbatch());
				   //查找课表集合数据42条或者49条
				    weeklistCurriculum =  curriculumMapper.findWeekCurriculumListWithMobile(cuparam);
				    if(weeklistCurriculum != null && weeklistCurriculum.size()>0){
				    	maxclass.setSmaxclass(curriculumbaselist.get(i).getSmaxclass());
						maxclass.setMaxclass(curriculumbaselist.get(i).getMaxclass());
						map.put("classmaxnum", maxclass);
						
						List<CurriculumParamForWeek> listrq1 = new ArrayList<CurriculumParamForWeek>();
						List<CurriculumParamForWeek> listrq2 = new ArrayList<CurriculumParamForWeek>();
						List<CurriculumParamForWeek> listrq3 = new ArrayList<CurriculumParamForWeek>();
						List<CurriculumParamForWeek> listrq4 = new ArrayList<CurriculumParamForWeek>();
						List<CurriculumParamForWeek> listrq5 = new ArrayList<CurriculumParamForWeek>();
						List<CurriculumParamForWeek> listrq6 = new ArrayList<CurriculumParamForWeek>();
						List<CurriculumParamForWeek> listrq7 = new ArrayList<CurriculumParamForWeek>();
						for(CurriculumParamForWeek curriculumParam:weeklistCurriculum){
							if(curriculumParam.getWeekdate().equals("1")){
								listrq1.add(curriculumParam);
							}
							if(curriculumParam.getWeekdate().equals("2")){
								listrq2.add(curriculumParam);
							}
							if(curriculumParam.getWeekdate().equals("3")){
								listrq3.add(curriculumParam);
							}
							if(curriculumParam.getWeekdate().equals("4")){
								listrq4.add(curriculumParam);
							}
							if(curriculumParam.getWeekdate().equals("5")){
								listrq5.add(curriculumParam);
							}
							if(curriculumParam.getWeekdate().equals("6")){
								listrq6.add(curriculumParam);
							}
							if(curriculumParam.getWeekdate().equals("7")){
								listrq7.add(curriculumParam);
							}
						}
						map.put("monDate", listrq1);
						map.put("tuesDate", listrq2);
						map.put("wednesDate", listrq3);
						map.put("thursDate", listrq4);
						map.put("friDate", listrq5);
						map.put("saturDate", listrq6);
						map.put("sunDate", listrq7);
				    	break;
				    }
			   }
		   }
		//循环查到最大节次
		//根据 学期、第几周、教室id 查找周课表
		if(weeklistCurriculum == null || weeklistCurriculum.size()==0){
			maxclass.setSmaxclass(3);
			maxclass.setMaxclass(6);
			map.put("classmaxnum", maxclass);
			map.put("monDate", "");
			map.put("tuesDate",  "");
			map.put("wednesDate",  "");
			map.put("thursDate",  "");
			map.put("friDate",  "");
			map.put("saturDate",  "");
			map.put("sunDate",  "");
		}
		return map;
	}
	/**
	 * 检查教师签到是否准时
	 * @param loginname
	 * @param mac
	 * @return
	 */
	public Boolean checkTeacherTime(String loginname,String mac) {
		Curriculum curriculum = new Curriculum();
		curriculum.setUsername(loginname);
		curriculum.setMac(mac);
//		String nowtime = DateUtils.format(new Date());
//		curriculum.setNowtime(nowtime);
		int count = curriculumMapper.checkTeacherTime(curriculum);
		if(count > 0){
			return true;
		}else{
			return false;
		}
		
	}
}
