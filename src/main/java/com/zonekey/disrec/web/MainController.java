/*****************************
* Copyright (c) 2012 by Artron Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.zonekey.disrec.common.log.trace.Traced;

 /**
 * 系统后台主页面
 * 
 * @author <a href="mailto:cwx@artron.com">崔卫翔</a>
 * @version v 1.0
 */
@Controller
public class MainController {

	/**
	 * 在log4j.properties中,本logger已被指定使用asyncAppender.
	 */
	public static final String DB_LOGGER_NAME = "BusLog";
	
	private static final Logger LOG = LoggerFactory.getLogger(DB_LOGGER_NAME);
	
	@Traced
	protected int logAop(int i1) {
		return i1;
	}
	
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public String main() {
		LOG.info("欢迎进入分布式录播后台管理系统！");
		logAop(1);
		return "main";
	}
	
}
