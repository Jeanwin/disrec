/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Curriculumbase;

import java.util.List;

import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.vo.PageBean;

/**
 * @Title: @{#} CurriculumbaseMapper.java
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@MyBatisRepository
public interface CurriculumbaseMapper extends BaseMapper<Curriculumbase, String> {
	/** 
	 *查找对应课节
	 * @param id
	 * @return
	*/
	public List<Curriculumbase> findCurriculumbaseByTerm(Curriculum curriculum);
	/** 
	 *按条件查找课节
	 * @param id
	 * @return
	*/
	public List<Curriculumbase> findCurriculumbaseByWhere(Curriculum curriculum);
	/** 
	 *按教室id、date 查找课节方案
	 * @param id
	 * @return
	*/
	public List<Curriculumbase> findCurriculumbaseTimeByWhere(Curriculum curriculum);
	/** 
	 *新增课节
	 * @param id
	 * @return
	*/
	public int insertCurriculumbase(Curriculumbase curriculumbase);
	/** 
	 *将课节应用到教室
	 * @param id
	 * @return
	*/
	public int insertUsedarea(Curriculumbase curriculumbase);
	/**
	 * 实时检查该教室所有的方案
	 */
	public List<Curriculumbase> findClassTypeByArea(Curriculumbase curriculumsbase);
	/** 
	 *查询该方案，该有效起止时间 一共有多少节课
	 * @param id
	 * @return
	*/
	public List<Curriculumbase> findCurriculumbaseByType(Curriculumbase curriculumbase);
	
	/** 
	 *查看所有课节
	 * @param id
	 * @return
	*/
	public List<Curriculumbase>  findAllCurriculumbase(PageBean pageBean);
	public long findAllCurriculumbaseCount (PageBean pageBean);
	/** 
	 *修改节次基础数据(展示基础数据)
	 * @param id
	 * @return
	*/
	public List<Curriculumbase> queryCurriculumbase(Curriculumbase curriculumsbase);
	
	/** 
	 *查看课节下的教室
	 * @param id
	 * @return
	*/
	public List<Curriculumbase>  findAreaByCurriculumbase(Curriculumbase curriculumsbase);
	/** 
	 *查看该批次下的所有教室
	 * @param id
	 * @return
	*/
	public List<Curriculumbase> findAreaByClassbatch(Curriculumbase curriculumsbase);
	/** 
	 * 删除该批次下的所有教室 ，及方案
	 * @param id
	 * @return
	*/
	public int deleteCurriculumbaseByClassbatch(Curriculumbase curriculumsbase);
	
	/** 
	 *删除该方案，以及下面所有的教室数据
	 * @param id
	 * @return
	*/
	public int deleteCurriculumbaseByType(Curriculumbase curriculumsbase);
	/** 
	 *删除该方案下面所有的教室数据 (保留方案)
	 * @param id
	 * @return
	*/
	public int deleteAreaTypeByClassbatch(Curriculumbase curriculumsbase);
	/** 
	 * @Title:findTypesByweek
	 * @Description: 查找一段时间内的所有方案
	 * @author niuxl
	 * @date 2014年10月16日 下午3:20:45
	 * @param curriculumbase
	 * @return
	*/
	public List<Curriculumbase> findTypesByweek(Curriculumbase curriculumbase);
	
	/** 
	 * @Title:findMyTypesByweek
	 * @Description: 查找一段时间内的所有方案(为我的课表使用)
	 * @author niuxl
	 * @date 2014年10月16日 下午3:20:45
	 * @param curriculumbase
	 * @return
	*/
	public List<Curriculumbase> findMyTypesByweek(Curriculumbase curriculumbase);
	/** 
	 * @Title:findCurriculumbaseClassbatch
	 * @Description: 查找该批次下所有的课节
	 * @author niuxl
	 * @date 2014年10月16日 下午3:20:45
	 * @param curriculumbase
	 * @return
	*/
	public List<Curriculumbase> findCurriculumbaseClassbatch(Curriculumbase curriculumbase);
	/** 
	 * @Title:findCurriculumbaseClassbatch
	 * @Description: 查询某个方案下，某节课的上课时间
	 * @author niuxl
	 * @date 2014年10月16日 下午3:20:45
	 * @param curriculumbase
	 * @return
	*/
	public Curriculumbase findClassTimeByClassnum(Curriculumbase curriculumbase);
	
	/** 
	 * @Title:findCurriculumbaseClassbatchAndIclass
	 * @Description: 根据批次、节次查询方案
	 * @author niuxl
	 * @date 2014年10月16日 下午3:20:45
	 * @param curriculumbase
	 * @return
	*/
	public Curriculumbase findCurriculumbaseClassbatchAndIclass(Curriculumbase curriculumbase);
	/** 
	 * @Title:initInsertCurriculumbase
	 * @Description: 新增节次方案初始化时调用
	 * @author niuxl
	 * @date 2014年12月11日 上午11:43:09
	 * @return
	*/
	public List<Curriculumbase> initInsertCurriculumbase();
}
