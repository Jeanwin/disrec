 /*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.dao;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Sysimportinfo;
/**
* @Title: SysimportinfoMapper.java
* @Description: <p>TODO</p>
* @author <a href="mailto:niuxl@zonekey.com.cn">牛喜林</a> 
* @date 2014年11月19日 下午1:26:32   
* @version v 1.0 
*/ 
@MyBatisRepository
public interface SysimportinfoMapper extends BaseMapper<Sysimportinfo, String>{
	/** 
	 * @Description: 新增
	 * @author niuxl
	 * @date 2014年11月19日 下午1:29:03
	 * @param sysimportinfo
	 * @return
	*/
	public int insertSysimportinfo(Sysimportinfo sysimportinfo);  
}
