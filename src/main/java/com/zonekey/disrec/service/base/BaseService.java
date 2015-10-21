 /*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service.base;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.zonekey.disrec.common.log.trace.Traced;

/**
 * @Title: BaseService.java
 * @Description: <p>BaseService</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a> 
 * @date 2014年10月23日 下午3:34:05   
 * @version v 1.0 
 */
public class BaseService {

	/**
	 * 在log4j.properties中,本logger已被指定使用asyncAppender.
	 */
	public static final String DB_LOGGER_NAME = "BusLog";
	protected static Logger LOG = LoggerFactory.getLogger(DB_LOGGER_NAME);
	
	@Traced
	protected int logAop(int i) {
		return i;
	}
}
