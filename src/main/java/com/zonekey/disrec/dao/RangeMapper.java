/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Range;
import com.zonekey.disrec.vo.RangeView;

/**
 * @Title: @{#} RangeMapper.java
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@MyBatisRepository
public interface RangeMapper extends BaseMapper<Range, String> {
	int insertRange(@Param("list")List<Map<String,Object>> list,@Param("createuser")String createuser,@Param("userid")String userid);
	int insertRangeRole(@Param("list")List<Map<String,Object>> list,@Param("createuser")String createuser,@Param("userid")String userid);
	int deleteRangeRole(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser);
	int deleteRange(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser);
	int saveRange(Map<String,Object> map);
	int updateRange(Range range);
	public List<Map<String,Object>> getScope();
	int deleteRangeScope(RangeView rangeView);
	int insertRangeScope(RangeView rangeView);
	int findUserCount(RangeView rangeView);
	int delRange(RangeView rangeView);
}
