/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
import com.zonekey.disrec.dao.CurriculumMapper;
import com.zonekey.disrec.dao.CurriculumbaseMapper;
import com.zonekey.disrec.entity.Area;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.entity.Curriculumbase;
import com.zonekey.disrec.entity.Term;

/**
 * @Title: @{#} CurriculumbaseService.java
 * @Description: <p>
 *               Curriculumbase实体业务类
 *               </p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class CurriculumbaseService extends BaseService {

	@Autowired
	private CurriculumbaseMapper curriculumbaseMapper;
	@Autowired
	private CurriculumMapper curriculumMapper;
	@Autowired
	private TermService termservice;
	/**
	 * 查找对应课节
	 * 
	 * @param id
	 * @return
	 */
	public List<Curriculumbase> findCurriculumbaseByTerm(Curriculum curriculum) {
		return curriculumbaseMapper.findCurriculumbaseByTerm(curriculum);
	}

	/**
	 * 按条件查找课节
	 * 
	 * @param id
	 * @return
	 */
	public List<Curriculumbase> findCurriculumbaseByWhere(Curriculum curriculum) {
		return curriculumbaseMapper.findCurriculumbaseByWhere(curriculum);
	}

	/**
	 * 按教室id、date 查找课节方案
	 * 
	 * @param id
	 * @return
	 */
	public List<Curriculumbase> findCurriculumbaseTimeByWhere(
			Curriculum curriculum) {
		return curriculumbaseMapper.findCurriculumbaseTimeByWhere(curriculum);
	}

	/**
	 * 查询该方案，该有效起止时间 一共有多少节课
	 * 
	 * @param id
	 * @return
	 */
	public List<Curriculumbase> findCurriculumbaseByType(
			Curriculumbase curriculumbase) {
		return curriculumbaseMapper.findCurriculumbaseByType(curriculumbase);
	}

	/**
	 * 新增课节
	 * 
	 * @param id
	 * @return
	 */
	@Transactional(readOnly = false)
	public int insertCurriculumbase(List<Curriculumbase> curriculumbaselist) {
		int smaxclass = 0;
		int maxclass = curriculumbaselist.size();
		String classbath = UUID.randomUUID().toString();
		for (Curriculumbase curriculumbase : curriculumbaselist) {
			if (curriculumbase.getStarttime() != null) {
				if (Integer
						.parseInt(curriculumbase.getStarttime().split(":")[0]) < 12) {
					smaxclass = smaxclass + 1;
				}
			}
		}
		for (Curriculumbase curriculumbase : curriculumbaselist) {
			curriculumbase.setId(UUID.randomUUID().toString());
			curriculumbase.setClassbatch(classbath);
			curriculumbase.setMaxclass(maxclass);
			curriculumbase.setSmaxclass(smaxclass);
			curriculumbase.setCreateuser(ShiroDbRealm.getCurrentLoginName());
			curriculumbase.setCreatetime(new Date());
			curriculumbaseMapper.insertCurriculumbase(curriculumbase);
		}
		return 1;
	}

	/**
	 * 将课节应用到教室
	 * 
	 * @param id
	 * @return
	 */
	@Transactional(readOnly = false)
	public int insertUsedarea(Curriculumbase curriculumsbase) {
		// 根据批次查到所有匹配教室的id
		List<Curriculumbase> arealist = curriculumbaseMapper
				.findAreaByClassbatch(curriculumsbase);
		//将课表中，对应教室 该批次？？？大于当前日期的开始时间和结束时间设为null，
		//查询现在课表中需要修改的数据,条件：教室、方案号、
		//2015-02-05发现如果把时间设为0，资源下载文件夹为空，会有问题，另外发现先设为0，下面再查这节课就查不到了，目前还有bug updateCurriculumTimeById中没有修改deleteflag
		//
			/*for(Curriculumbase areacurriculumbase :arealist){
				List<Curriculum> culist=curriculumMapper.findForEditCurriculumbase(areacurriculumbase);
				for(Curriculum curriculum:culist){
					//循环每个对象，
					Curriculum curriculumq=new Curriculum();
					curriculumq.setEditclassbatch(curriculum.getEditclassbatch());
					//根据编辑批次去查这批下共有几节课
					List<Curriculum> editcuslist=curriculumMapper.findCurriculumByWhere(curriculumq);
					for(Curriculum editcurriculum:editcuslist){
						//给该课表设置新的上课时间
						editcurriculum.setStarttime("0000");
						editcurriculum.setEndtime("0000");
						editcurriculum.setDeleteflag("1");
						//根据课表的id修改这节的开始时间和结束时间
						curriculumMapper.updateCurriculumTimeById(editcurriculum);
					}
				}
			}*/
				
		if (arealist != null && arealist.size() > 0) {
			curriculumbaseMapper.deleteAreaTypeByClassbatch(curriculumsbase);
		}

		// 查询该方案，该有效起止时间 一共有多少节课
		List<Curriculumbase> curriculumsbaseList = curriculumbaseMapper
				.findCurriculumbaseClassbatch(curriculumsbase);
		for (Curriculumbase curriculumbase : curriculumsbaseList) {
			for (Area area : curriculumsbase.getAreaList()) {
				curriculumbase.setAreaid(area.getId());
				curriculumbase.setId(UUID.randomUUID().toString());
				// curriculumbase.setCreateuser(ShiroDbRealm.getCurrentLoginName());
				curriculumbase.setCreatetime(new Date());
				curriculumbaseMapper.insertUsedarea(curriculumbase);
			}
		}
		//查询现在课表中未上课的数据,条件：教室、方案号、
		for(Area area : curriculumsbase.getAreaList()){
			Curriculumbase  newcurriculumsbase =new Curriculumbase();
			newcurriculumsbase.setAreaid(area.getId());
			newcurriculumsbase.setDatebegin(curriculumsbase.getDatebegin());
			newcurriculumsbase.setDateend(curriculumsbase.getDateend());
			List<Curriculum> culist=curriculumMapper.findWillCurriculumByAreaAndBase(newcurriculumsbase);
			for(Curriculum curriculum:culist){
				//循环每个对象，
				Curriculum curriculumq=new Curriculum();
				curriculumq.setEditclassbatch(curriculum.getEditclassbatch());
				//根据编辑批次去查这批下共有几节课
				List<Curriculum> editcuslist=curriculumMapper.findCurriculumByWhere(curriculumq);
				for(Curriculum editcurriculum:editcuslist){
					Curriculumbase editcurriculumbase=new Curriculumbase();
					editcurriculumbase.setIclass(editcurriculum.getClassnum());
					editcurriculumbase.setClassbatch(curriculumsbase.getClassbatch());
					//查询该方案里，这节的方案信息
					Curriculumbase curriculumbase=curriculumbaseMapper.findClassTimeByClassnum(editcurriculumbase);
					//给该课表设置新的上课时间
					editcurriculum.setStarttime(curriculumbase.getStarttime());
					editcurriculum.setEndtime(curriculumbase.getEndtime());
					editcurriculum.setClassid(curriculumsbase.getClassbatch());
					editcurriculum.setModifyuser(ShiroDbRealm.getCurrentLoginName());
					//根据课表的id修改这节的开始时间和结束时间
					curriculumMapper.updateCurriculumTimeById(editcurriculum);
				}
			}
		}
		return 0;
	}

	/**
	 * 实时检查该教室有没有重叠的方案
	 */
	public List<Area> findClassTypeByArea(Curriculumbase curriculumsbase) {
		List<Area> arealist = new ArrayList<Area>();
		for (Area area : curriculumsbase.getAreaList()) {
			curriculumsbase.setAreaid(area.getId());
			List<Curriculumbase> cl = curriculumbaseMapper
					.findClassTypeByArea(curriculumsbase);
			for (Curriculumbase cubase : cl) {
				if (DateTermUtil.isStartBeforeEndTime(
						DateTermUtil.dateParse(cubase.getDateend()),
						DateTermUtil.dateParse(curriculumsbase.getDatebegin()))
						|| DateTermUtil.isStartBeforeEndTime(DateTermUtil
								.dateParse(curriculumsbase.getDateend()),
								DateTermUtil.dateParse(cubase.getDatebegin()))) {
				} else {
					if(cubase.getClassbatch().equals(curriculumsbase.getClassbatch())){
						
					}else{
						Area areavo = new Area();
						areavo.setId(cubase.getAreaid());
						areavo.setName(cubase.getAreaname());
						//为了不增加字段，这里设置方案的名称
						areavo.setCreateuser(cubase.getClasstype());
						arealist.add(areavo);
					}
					
				}
			}
		}

		return arealist;
	}
	/**
	 * 查看所有课节
	 * 
	 * @param id
	 * @return
	 */
	public Map<String, Object> findAllCurriculumbase(PageBean pageBean) {
		long total = curriculumbaseMapper.findAllCurriculumbaseCount(pageBean);
		List<Curriculumbase> clist = curriculumbaseMapper
				.findAllCurriculumbase(pageBean);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("data", clist);
		return map;
	}
	/**
	 * 查找该教室下所有的节次方案
	 * 
	 * @param id
	 * @return
	 */
	public List<Curriculumbase> findAreaCurriculumbase(Curriculum curriculums) {
		List<Curriculumbase> cuslist=new ArrayList<Curriculumbase>();
		//查询该教室下所有的方案
		Curriculumbase curriculumbase =new Curriculumbase();
		if(curriculums!=null){
			curriculumbase.setAreaid(curriculums.getAreaid());
		}
		List<Curriculumbase> cl = curriculumbaseMapper
				.findClassTypeByArea(curriculumbase);
		//查询当前学期开始时间、结束时间
		//查看当前学期 a
		Term nowterm=termservice.findNowTerm();
		String enddate=DateTermUtil.getEndTermByBegin(DateTermUtil.dateParse(nowterm.getStartday()), nowterm.getWeeks());
		String startdate=nowterm.getStartday();
		//b
		for (Curriculumbase cubase : cl) {
			//a_start <= b_end and a_end >= b_start
			//条件是方案属于这个学期范围内（是否可以去掉？？？），当前时间在方案中
			if(Integer.parseInt(startdate.replaceAll("-", "")) <= Integer.parseInt(cubase.getDateend().replaceAll("-", "")) && 
					Integer.parseInt(enddate.replaceAll("-", "")) >= Integer.parseInt(cubase.getDatebegin().replaceAll("-", ""))
					&& Integer.parseInt(DateTermUtil.getNowDate().replaceAll("-", ""))>=Integer.parseInt(cubase.getDatebegin().replaceAll("-", "")) 
					&& Integer.parseInt(cubase.getDateend().replaceAll("-", "")) >=Integer.parseInt(DateTermUtil.getNowDate().replaceAll("-", ""))
					){
				cuslist.add(cubase);
			}
		}
		return cuslist;
	}

	/**
	 * 修改节次基础数据(展示基础数据)
	 * 
	 * @param id
	 * @return
	 */
	public List<Curriculumbase> queryCurriculumbase(
			Curriculumbase curriculumsbase) {
		return curriculumbaseMapper.queryCurriculumbase(curriculumsbase);
	}

	/**
	 * 查看课节下的教室
	 * 
	 * @param id
	 * @return
	 */
	public List<Curriculumbase> findAreaByCurriculumbase(
			Curriculumbase curriculumsbase) {
		return curriculumbaseMapper.findAreaByCurriculumbase(curriculumsbase);
	}
	/**
	 * 验证节次方案里面的时间大小
	 * 
	 * @param id
	 * @return
	 */
    public JsonMsg checkCurriculumbaseTime(List<Curriculumbase> curriculumsbaselist){
    	JsonMsg msg = new JsonMsg();
    	
    	for(Curriculumbase curriculumbase:curriculumsbaselist){
    		//如果有效期结束时间<开始时间
    		if(DateUtils.isStartBeforeEndTime(
					DateTermUtil.dateParse(curriculumbase.getDateend()),
					DateTermUtil.dateParse(curriculumbase.getDatebegin()))){
    			msg.setId("0");
    			msg.setName("失败");
    			msg.setOperation("有效期结束时间有误！");
    			return msg;
    			
    		}
    	}
    	for (int i=0;i<curriculumsbaselist.size();i++){
    		String starttime=curriculumsbaselist.get(i).getStarttime() !=null ? curriculumsbaselist.get(i).getStarttime().substring(0, 5) : "0";
    		String endtime=curriculumsbaselist.get(i).getEndtime() != null ? curriculumsbaselist.get(i).getEndtime().substring(0, 5) : "0";
    		
    		if(Integer.parseInt(endtime.replaceAll(":", "")) <= Integer.parseInt(starttime.replaceAll(":", ""))){
    			msg.setId("0");
    			msg.setName("失败");
    			msg.setOperation("第"+(i+1)+"节结束时间应该大于开始时间！");
    			return msg;
    		}
    		if(i<curriculumsbaselist.size()-1){
    			String nextstarttime= curriculumsbaselist.get(i+1).getStarttime() != null ? curriculumsbaselist.get(i+1).getStarttime().substring(0, 5) : "0";
    			if(Integer.parseInt(nextstarttime.replaceAll(":", "")) <= Integer.parseInt(endtime.replaceAll(":", ""))){
        			msg.setId("0");
        			msg.setName("失败");
        			msg.setOperation("第"+(i+2)+"节的结束时间应该大于上一节课的开始时间！");
        			return msg;
        		}
    		}
    	}
    	return msg;
    }
	/**
	 * 修改节次基础数据(这里是否要考虑，每次批次号都是不变的)
	 * 
	 * @param id
	 * @return
	 */
	@Transactional(readOnly = false)
	public int updateCurriculumbase(List<Curriculumbase> curriculumsbaselist) {
		Curriculumbase curriculumbaseold = new Curriculumbase();
//		节次批次
		String classbatch = curriculumsbaselist.get(0).getClassbatch();
//		
		Curriculumbase curriculumbaseOne = curriculumsbaselist.get(0);
		
		curriculumbaseold.setClassbatch(classbatch);
		
		//首先判断修改后的课节数是否比现在在用的课节数变少
		List<Curriculum> curlist = curriculumMapper.findForDeleteCurriculumbase(curriculumbaseOne);
		//课表中的最大节次大于修改后方案中的最大节次
		if(curlist.size()>0 && curlist.get(0) !=null && curlist.get(0).getMaxclass() > curriculumsbaselist.size()){
			//不允许修改《不能删除节次 》
			return -1;
		}
		// 根据批次查到所有匹配教室的id
		List<Curriculumbase> arealist = curriculumbaseMapper.findAreaByClassbatch(curriculumbaseOne);
		//判断有效期开始时间和结束时间有无变化
		List<Curriculumbase> curriculumbasedate = curriculumbaseMapper.findCurriculumbaseClassbatch(curriculumbaseold);
		boolean flag = false;
		if(curriculumbasedate.size() > 0){
			if(curriculumbasedate.get(0).getDatebegin().equals(curriculumbaseOne.getDatebegin()) && curriculumbasedate.get(0).getDateend().equals(curriculumbaseOne.getDateend())){
				flag = false;
			}else{
				flag = true;
			}
		}else{
			flag = true;
		}
		if(flag){
			//如果有变化，要遍历每个教室的方案与其他方案是否重复了
//			List<Area> returnarealist = new ArrayList<Area>();
			for(Curriculumbase areaurriculumbase:arealist){
//				curriculumsbase.setAreaid(area.getId());
				List<Curriculumbase> cl = curriculumbaseMapper.findClassTypeByArea(areaurriculumbase);
				for (Curriculumbase cubase : cl) {
					if (DateTermUtil.isStartBeforeEndTime(
							DateTermUtil.dateParse(cubase.getDateend()),
							DateTermUtil.dateParse(curriculumsbaselist.get(0).getDatebegin()))
							|| DateTermUtil.isStartBeforeEndTime(DateTermUtil
									.dateParse(curriculumsbaselist.get(0).getDateend()),
									DateTermUtil.dateParse(cubase.getDatebegin()))) {
					} else {
						if(cubase.getClassbatch().equals(classbatch)){
							
						}else{
//							Area areavo = new Area();
//							areavo.setId(cubase.getAreaid());
//							areavo.setName(cubase.getAreaname());
//							returnarealist.add(areavo);
							return -2;
						}
						
					}
				}
			}
		}else{
			//如果无变化，跳过
		}
		
		// 根据批次 删除原来方案 及 对应教室
		curriculumbaseMapper.deleteCurriculumbaseByClassbatch(curriculumbaseOne);
		// 此方案的上午最大节次、全天最大节次
		int smaxclass = 0;
		int maxclass = curriculumsbaselist.size();
		for (Curriculumbase curriculumbase : curriculumsbaselist) {
			if (curriculumbase.getStarttime() != null) {
				if (Integer.parseInt(curriculumbase.getStarttime().split(":")[0]) < 12) {
					smaxclass = smaxclass + 1;
				}
			}

		}
		for (Curriculumbase curriculumbase : curriculumsbaselist) {
			curriculumbase.setId(UUID.randomUUID().toString());
			curriculumbase.setMaxclass(maxclass);
			curriculumbase.setSmaxclass(smaxclass);
			curriculumbase.setClassbatch(classbatch);
			curriculumbaseMapper.insertCurriculumbase(curriculumbase);
		}

		for (Curriculumbase curriculumbase : curriculumsbaselist) {
			for (Curriculumbase areaCurriculumbase : arealist) {
				curriculumbase.setAreaid(areaCurriculumbase.getAreaid());
				curriculumbase.setId(UUID.randomUUID().toString());
				curriculumbaseMapper.insertUsedarea(curriculumbase);
			}
		}
		//修改现在课表中对应方案且未上的课
		//查询现在课表中需要修改的数据,方案批次是唯一的
	/*	List<Curriculum> culist=curriculumMapper.findForEditCurriculumbase(curriculumbaseold);
		for(Curriculum curriculum:culist){
			//循环每个对象，
			Curriculum curriculumq=new Curriculum();
			curriculumq.setEditclassbatch(curriculum.getEditclassbatch());
			//根据编辑批次去查这批下共有几节课
			List<Curriculum> editcuslist=curriculumMapper.findCurriculumByWhere(curriculumq);
			for(Curriculum editcurriculum:editcuslist){
				Curriculumbase editcurriculumbase=new Curriculumbase();
				editcurriculumbase.setIclass(editcurriculum.getClassnum());
				editcurriculumbase.setClassbatch(classbatch);
				//查询该方案里，这节的方案信息
				Curriculumbase curriculumbase=curriculumbaseMapper.findClassTimeByClassnum(editcurriculumbase);
				editcurriculum.setClassid(classbatch);
				//给该课表设置新的上课时间
				editcurriculum.setStarttime(curriculumbase.getStarttime());
				editcurriculum.setEndtime(curriculumbase.getEndtime());
				//根据课表的id修改这节的开始时间和结束时间
				curriculumMapper.updateCurriculumTimeById(editcurriculum);
			}
		}*/
		//查询现在课表中未上课的数据,条件：教室、方案号、
				for(Curriculumbase areaurriculumbase:arealist){
					Curriculumbase  newcurriculumsbase =new Curriculumbase();
					newcurriculumsbase.setAreaid(areaurriculumbase.getAreaid());
					newcurriculumsbase.setDatebegin(curriculumsbaselist.get(0).getDatebegin());
					newcurriculumsbase.setDateend(curriculumsbaselist.get(0).getDateend());
					List<Curriculum> culist = curriculumMapper.findWillCurriculumByAreaAndBase(newcurriculumsbase);
					for(Curriculum curriculum:culist){
						//循环每个对象，
						Curriculum curriculumq = new Curriculum();
						curriculumq.setEditclassbatch(curriculum.getEditclassbatch());
						//根据编辑批次去查这批下共有几节课
						List<Curriculum> editcuslist = curriculumMapper.findCurriculumByWhere(curriculumq);
						for(Curriculum editcurriculum:editcuslist){
							Curriculumbase editcurriculumbase = new Curriculumbase();
							editcurriculumbase.setIclass(editcurriculum.getClassnum());
							editcurriculumbase.setClassbatch(classbatch);
							//查询该方案里，这节的方案信息
							Curriculumbase curriculumbase = curriculumbaseMapper.findClassTimeByClassnum(editcurriculumbase);
							if(curriculumbase == null){
								
							}else{
								//给该课表设置新的上课时间
								editcurriculum.setStarttime(curriculumbase.getStarttime());
								editcurriculum.setEndtime(curriculumbase.getEndtime());
								editcurriculum.setClassid(classbatch);
								editcurriculum.setModifyuser(ShiroDbRealm.getCurrentLoginName());
								//根据课表的id修改这节的开始时间和结束时间
								curriculumMapper.updateCurriculumTimeById(editcurriculum);
								
							}
						}
					}
				}
		return 1;
	}
	/**
	 * @Title:deleteCurriculumbase
	 * @Description: 删除节次
	 * @date 2014年10月20日 上午11:38:42
	 * @param curriculumbase
	 */
	@Transactional(readOnly = false)
	public int deleteCurriculumbase(Curriculumbase curriculumbase) {
		List<Curriculum> culist=curriculumMapper.findForDeleteCurriculumbase(curriculumbase);
		if(culist .size() >0 && culist.get(0)!=null){
			return 0;
		}else{
			return curriculumbaseMapper
					.deleteCurriculumbaseByClassbatch(curriculumbase);
		}
	}

	public Curriculumbase getCurriculumbase(String id) {
		return curriculumbaseMapper.findOne(id);
	}

	/**
	 * @Title:findTypesByweek
	 * @Description: 查找一段时间内的所有方案
	 * @author niuxl
	 * @date 2014年10月16日 下午3:20:45
	 * @param curriculumbase
	 * @return
	 */
	public List<Curriculumbase> findTypesByweek(Curriculumbase curriculumbase) {
		return curriculumbaseMapper.findTypesByweek(curriculumbase);
	}
	
	/**
	 * @Title:findMyTypesByweek
	 * @Description: 查找一段时间内的所有方案(为我的课表使用)
	 * @author niuxl
	 * @date 2014年10月16日 下午3:20:45
	 * @param curriculumbase
	 * @return
	 */
	public List<Curriculumbase> findMyTypesByweek(Curriculumbase curriculumbase) {
		return curriculumbaseMapper.findMyTypesByweek(curriculumbase);
	}
	public Page<Curriculumbase> findPageBy(int pageNo, int pageSize) {
		long total = curriculumbaseMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize,
				Sort.Direction.ASC, "id");
		List<Curriculumbase> list = curriculumbaseMapper.findByPage(
				(pageNo - 1) * pageSize, pageSize);
		Page<Curriculumbase> page = new PageImpl<Curriculumbase>(list,
				pageRequest, total);

		return page;
	}

	@Transactional(readOnly = false)
	public void saveCurriculumbase(Curriculumbase curriculumbase) {
		curriculumbase.setId(IdUtils.uuid2());
		curriculumbase.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		curriculumbase.setDeleteflag(AppConstants.IS_STATUS_DEFAULT);
		curriculumbaseMapper.insert(curriculumbase);
	}

	@Transactional(readOnly = false)
	public void updateCurriculumbase(Curriculumbase curriculumbase) {
		curriculumbase.setModifydate(new Date());
		curriculumbase.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		curriculumbaseMapper.update(curriculumbase);
	}

	@Transactional(readOnly = false)
	public void deleteCurriculumbase(String id) {
		Curriculumbase curriculumbase = curriculumbaseMapper.findOne(id);
		curriculumbase.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		curriculumbaseMapper.delete(id);
	}
	/** 
	 * @Title:findCurriculumbaseClassbatchAndIclass
	 * @Description: 根据批次、节次查询方案
	 * @author niuxl
	 * @date 2014年10月16日 下午3:20:45
	 * @param curriculumbase
	 * @return
	*/
	public Curriculumbase findCurriculumbaseClassbatchAndIclass(Curriculumbase curriculumbase){
		return curriculumbaseMapper.findCurriculumbaseClassbatchAndIclass(curriculumbase);
	}
	/** 
	 * @Title:initInsertCurriculumbase
	 * @Description: 新增节次方案初始化时调用
	 * @author niuxl
	 * @date 2014年12月11日 上午11:43:09
	 * @return
	*/
	public List<Curriculumbase> initInsertCurriculumbase(){
		return curriculumbaseMapper.initInsertCurriculumbase();
	}
}
