/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.dao;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.entity.DevicePoling;

/**
 * @Title: DevicePolingMapper.java
 * @Description: 课程巡视
 * @author <a href="mailto:niuxl@zonekey.com.cn">牛喜林</a>
 * @date 2014年12月8日 上午11:32:01
 * @version v 1.0
 */
@MyBatisRepository
public interface DevicePolingMapper extends BaseMapper<DevicePoling, String> {
	//新增该人记录
	public int insertDevicePoling(DevicePoling devicePoling);
	//查找这个人是否有记录
	public DevicePoling findDevicePoling(@Param("loginname")String loginname);
	//修改该人记录
	public int updateDevicePoling(DevicePoling devicePoling);
	/**
	 * @Title:insertDevicePoling
	 * @Description: 根据教室查询课程巡视分屏
	 * @return
	 */
	public DevicePoling findDevicePolingSetByAreaid(@Param("loginname")String loginname);
}
