 /*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service;

import org.apache.poi.ss.formula.functions.Now;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.dao.SysimportinfoMapper;
import com.zonekey.disrec.entity.Sysimportinfo;
import com.zonekey.disrec.service.base.BaseService;
/**
* @Title: SysimportinfoService.java
* @Description: <p>TODO</p>
* @author <a href="mailto:niuxl@zonekey.com.cn">牛喜林</a> 
* @date 2014年11月19日 下午1:27:56   
* @version v 1.0 
*/ 
@Component
@Transactional(readOnly = true)
public class SysimportinfoService extends BaseService{
	@Autowired
	private SysimportinfoMapper sysimportinfoMapper;
	/** 
	 * @Description: 新增
	 * @author niuxl
	 * @date 2014年11月19日 下午1:29:03
	 * @param sysimportinfo
	 * @return
	*/
	@Transactional(readOnly = false)
	public int insertSysimportinfo(Sysimportinfo sysimportinfo){
		try{
		return sysimportinfoMapper.insertSysimportinfo(sysimportinfo);
		}catch(Exception e){
			e.printStackTrace();
		}
		return 0;
	}
}
