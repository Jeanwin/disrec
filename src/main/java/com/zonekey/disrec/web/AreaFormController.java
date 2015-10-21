 /*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.zonekey.disrec.common.log.trace.Traced;

/**
 * @Title: AreaFormController.java
 * @Description: <p>Area Form Controller</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a> 
 * @date 2014年9月21日 下午7:36:48   
 * @version v 1.0 
 */
@Controller
@RequestMapping
public class AreaFormController {
	/**
	 * 在log4j.properties中,本logger已被指定使用asyncAppender.
	 */
	public static final String DB_LOGGER_NAME = "BusLog";
	private static final Logger LOG = LoggerFactory.getLogger(DB_LOGGER_NAME);
	
	@Traced
	protected int logAop(int i) {
		return i;
	}
	
	@RequestMapping(value = "area/main", method = RequestMethod.GET)
	public String main() {
		LOG.info("操作员{}登录成功", "admin");
		logAop(1);
		return "admin/areaMain";
		/*Subject currentUser = SecurityUtils.getSubject();
		if (currentUser.hasRole("SYS_ADMIN")) {
			logger.info("操作员{}登录成功", "admin");
    		logAop(1);
			return "main";
		} else {
			return "test";
		}*/
	}
	
	@RequestMapping(value = "area/form", method = RequestMethod.GET)
	public String areaForm(Model model) {
		LOG.info("操作员{}登录成功", "admin");
		logAop(1);
		return "admin/areaForm";
	}
	
}
