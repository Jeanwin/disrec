/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.entity.CurriculumParamForWeek;
import com.zonekey.disrec.entity.Curriculumbase;
import com.zonekey.disrec.entity.ManualVideo;
import com.zonekey.disrec.entity.ScheduleTask;
import com.zonekey.disrec.vo.PageBean;


/**
 * @Title: @{#} CurriculumMapper.java
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@MyBatisRepository
public interface CurriculumMapper extends BaseMapper<Curriculum, String> {
	/** 
	 * 查询全部课表，带分页
	 */
	List<Curriculum> findByPage(int pageNumber, int pageSize);
	/** 
	 * 查询全部课表
	 */
	List<Curriculum> findAll();
	/** 
	*
	*查询直播课表
	*/
	List<Curriculum> findLiveCurriculum(PageBean pageBean);
	/** 
	*
	*手动新增课表
	*/
	public int insertCurriculum(Curriculum curriculum);
	/** 
	*
	*新增临时课表
	*/
	public int insertCurriculumlinshi(Curriculum curriculum);
	
	/** 
	*
	*修改临时课表
	*/
	public int updateCurriculumlinshi(Curriculum curriculum);
	/** 
	 *根据id查询一条直播课表
	 * @param id
	 * @return
	*/
	public Curriculum findLiveCurriculumById(String id);
	/** 
	 *根据id修改一条直播课表
	 * @param Curriculum
	 * @return
	*/
	public int updateLiveCurriculumById(Curriculum Curriculum);
	/** 
	 *取消直播课表
	 * @param Curriculum
	 * @return
	*/
	public int cancelLiveCurriculum(Curriculum Curriculum);
	/** 
	 *删除直播课表
	 * @param Curriculum
	 * @return
	*/
	public int deleteLiveCurriculum(Curriculum Curriculum);
	
	/** 
	 *查找周课表
	 * @param termid,week, areaid
	 * @return
	*/
	public List<Curriculum> findWeekCurriculum(Curriculum curriculum);
	/** 
	 *删除、修改节次方案的验证
	 * @param termid,week, areaid
	 * @return
	*/
	public List<Curriculum> findForDeleteCurriculumbase(Curriculumbase curriculumbase);
	
	/** 
	 *查询该方案中，还未上的课
	 * @param termid,week, areaid
	 * @return
	*/
	public List<Curriculum> findForEditCurriculumbase(Curriculumbase curriculumbase);
	/** 
	 *查询该方案中，还未上的课
	 * @param termid,week, areaid
	 * @return
	*/
	public List<Curriculum> findWillCurriculumByAreaAndBase(Curriculumbase curriculumbase);
	
	
	/** 
	 *查找周课表(新方法，返回40多条数据)
	 * @param termid,week, areaid
	 * @return
	*/
	public List<CurriculumParamForWeek> findWeekCurriculumList(CurriculumParamForWeek curriculumParamForWeek);
	
	/** 
	 *查找我的课表(新方法，返回40多条数据)
	 * @param termid,week, areaid
	 * @return
	*/
	public List<CurriculumParamForWeek> findMyWeekCurriculumList(CurriculumParamForWeek curriculumParamForWeek);
	
	public long findEditCount(PageBean pageBean);
	public long findLiveCount(PageBean pageBean);
	
	/** 
	 *查找可编辑课表
	 * @param termid,week, areaid
	 * @return
	*/
	public List<Curriculum> findEditCurriculum(PageBean pageBean);
	/** 
	 *删除可编辑课表（修改状态）
	 * @param termid,week, areaid
	 * @return
	*/
	public int deleteEditCurriculum(Curriculum curriculum);
	/** 
	 *彻底删除可编辑课表
	 * @param termid,week, areaid
	 * @return
	*/
	public int deleteEditCurriculumForedit(Curriculum curriculum);
	/** 
	 *根据批次删除可编辑课表
	 * @param termid,week, areaid
	 * @return
	*/
	public int deleteCurriculumByClassbatch(Curriculum curriculum);
	/** 
	 *根据时间删除可编辑课表
	 * @param termid,week, areaid
	 * @return
	*/
	public int deleteCurriculumBySamedate(Curriculum curriculum);
	/** 
	 *修改可编辑课表
	 * @param termid,week, areaid
	 * @return
	*/
	public int updateEditCurriculum(Curriculum curriculum);
	/** 
	 *修改课表
	 * @param termid,week, areaid
	 * @return
	*/
	public int updateCurriculumById(Curriculum curriculum);
	/** 
	 *修改临时表
	 * @param termid,week, areaid
	 * @return
	*/
	public int updateCurriculummid(Curriculum curriculum);
	
	
	/** 
	 *查找上课开始时间
	 * @param termid,week, areaid
	 * @return
	*/
	public Curriculum findStartTime(Curriculum curriculum);
	/** 
	 *查找上课结束时间
	 * @param termid,week, areaid
	 * @return
	*/
	public Curriculum findEndtime (Curriculum curriculum);
	/** 
	 *查找上课开始时间和结束时间
	 * @param termid,week, areaid
	 * @return
	*/
	public Curriculum findStartAndEndtime (Curriculum curriculum);
	/** 
	 * @Description: 按条件查询临时表
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public  List<Curriculum> findCurriculummid(Curriculum curriculum);
	/** 
	 * @Description: 按条件查询课表
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public  List<Curriculum> findCurriculumByWhere(Curriculum curriculum);
	/** 
	 * @Description: 按条件查询课表（为导入使用）
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public  List<Curriculum> findCurriculumForImport(Curriculum curriculum);
	/** 
	 * @Description: 查找有没有已存在的节次
	 * @date 2014年9月23日 上午11:16:07
	 * @param userid\areaid\date\classnum
	*/
	public  List<Curriculum> findCurriculumByDate(Curriculum curriculum);
	/** 
	 * @Description: 查看当前时间的课节
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public  List<Curriculum> findClassByTime(PageBean pageBean);
	public  long  findClassByTimeCount(PageBean pageBean);
	/** 
	 * @Description: 查看当前时间的课节
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public  List<Curriculum> testCurriculum(Curriculum curriculum);
	/** 
	 * @Description: 修改课表中文件夹下载状态
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public int updateCurriculumuploadismanual(Curriculum curriculum);
	/** 
	 * @Description: 修改课表中文件夹删除状态
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public int updateCurriculumuploadisdelete(Curriculum curriculum);
	/** 
	 * @Description: 修改课表中上课时间
	 * @date 2014年9月23日 上午11:16:07
	 * @param curriculum
	*/
	public int updateCurriculumTimeById(Curriculum curriculum);
	/** 
	 * @Description: 查看当前教室未来的课节(设备调用)
	 * @date 2014年11月18日 上午11:16:07
	 * @param curriculum
	*/
	public List<Curriculum> findClassByAreaidAndTime(Curriculum curriculum);
	
	public List<Curriculum> findClassByAreaidAndTimeWithSameClass(Curriculum curriculum);
	/** 
	 * @Description: 教室正在上的课
	 * @date 2014年11月18日 上午11:16:07
	 * @param curriculum
	*/
	public List<Curriculum> findClassByAreaid(@Param("areaid")String areaid);
	/**
	 * @Title:findResourcefloderByAraeaid
	 * @Description: <p>TODO</p>
	 * @author niuxl
	 * @date 2014年12月19日 上午11:49:00
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>findResourcefloderByAraeaid(Map<String,Object> map);
	/**
	 * @Title:findSimpleClassByTime
	 * @Description: 根据教室id查课（设备调用）
	 * @author niuxl
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	public Curriculum findSimpleClassByTime(Curriculum curriculum);
	/**
	 * updateEndtimeByBatch
	 * @Description: 根据批次号修改结束时间（设备调用）
	 * @author niuxl
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	public int updateEndtimeByBatch(@Param("id")String id,@Param("endtime")String endtime);
	/**
	 * selectEndtimeByBatch
	 * @Description: 根据批次号获取结束时间（设备调用）
	 * @author niuxl
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	public String selectEndtimeByBatch(@Param("id")String id);
	/**
	 * selectResourcefloderByBatch
	 * @Description: 根据批次号获取录像文件名字（设备调用）
	 * @author niuxl
	 * @date 2014年12月19日 上午11:44:55
	 * @return
	 */
	public String selectResourcefloderByBatch(@Param("editclassbatch")String editclassbatch);
	List<CurriculumParamForWeek> findWeekCurriculumListWithMobile(
			CurriculumParamForWeek cuparam);
	
	int checkTeacherTime(Curriculum curriculum);
	
}
