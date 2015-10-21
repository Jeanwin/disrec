/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;

import java.util.List;

import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.entity.Term;
import com.zonekey.disrec.vo.PageBean;

/**
 * @Title: @{#} TermMapper.java
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@MyBatisRepository
public interface TermMapper extends BaseMapper<Term, String> {
	/** 
	 *查找当前学期
	 * @param id
	 * @return
	*/
	public Term findNowTerm();
	/** 
	 *查找所有学期
	 * @param id
	 * @return
	*/
	public List<Term> findAllTerm(PageBean pageBean);
	/** 
	 *查找所有学期,不翻页
	 * @param id
	 * @return
	*/
	public List<Term> findAllTermForShearch ();
	/** 
	 *查找所有名字,不翻页
	 * @param id
	 * @return
	*/
	public List<Term> findAllTermByName(Term term);
	/** 
	 *查找所有周,不翻页
	 * @param id
	 * @return
	*/
	public Term findAllWeeksForShearch();
	/** 
	 *添加新学期
	 * @param id
	 * @return
	*/
	public int insertTerm(Term term);
	/** 
	 *根据id查询一个学期
	 * @param id
	 * @return
	*/
	public Term findTermById(String id);
	public long findAllTermCount(PageBean pageBean);
	public int editiscurrent(Term term);
	public int updateTerm(Term term);
	public int canceliscurrent(Term term);
}
