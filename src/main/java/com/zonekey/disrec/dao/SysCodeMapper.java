/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.SysCode;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.SysCodeView;

/**
 * @Title: @{#} SysCodeMapper.java
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@MyBatisRepository
public interface SysCodeMapper extends BaseMapper<SysCode, String> {
	//获取数据类型
	public List<Map<String,Object>> findDiviceType();
	public void deleteChilds(SysCode sysCode);
	public int checkCount(SysCode sysCode);
	public List<Map<String,Object>> getDicTree();
	//获取数据类型
	public List<Map<String,Object>> findType(String id);
	public List<Map<String,Object>> getCode(String value);
	public String getCodeByName(@Param("parentValue")String parentValue,@Param("name")String name);
	public List<SysCodeView> findPageBy(PageBean pageBean);
	public long count(PageBean pageBean);
	//获取某一节点下的全部 数据
	public List<SysCode> findSopeAll(String id);
}
