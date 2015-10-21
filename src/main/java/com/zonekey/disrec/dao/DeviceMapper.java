/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeviceView;
import com.zonekey.disrec.vo.PageBean;

/**
 * @Title: @{#} DeviceMapper.java
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@MyBatisRepository
public interface DeviceMapper extends BaseMapper<DeviceView, String> {
	public List<DeviceView> findByPage(PageBean pageBean);
	public List<Map<String,Object>> findByAreaId(Map<String,Object> map);
	public List<Map<String,Object>> findDevice(Map<String,Object> map);
	public long count(PageBean pageBean);
	public int delete(Map<String,Object> map);
	public int deleteBy(AreaView areaView);
	public int checkMac(DeviceView deviceView);
	public int checkType(DeviceView deviceView);
	public DeviceView findDeviceByMac(@Param("mac")String mac);
	public String getMacById(Map<String,Object> map);
	public List<Map<String,String>> getMacByInnerId(@Param("innerids")List<String> innerids,@Param("typeid")String typeid);
	public DeviceView getDeviceView(String areaId);
	
	public List<DeviceView> findDeviceControl(Map<String, Object> map);
}
