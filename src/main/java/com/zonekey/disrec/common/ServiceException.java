 /*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.common;

/**
* @Title: ServiceException.java
* @Description: <p>Service层公用的Exception.继承自RuntimeException, 从由Spring管理事务的函数中抛出时会触发事务回滚.</p>
* @author <a href="mailto:cuiwx@zonekey.com.cn">崔卫翔</a> 
* @date 2014-7-24 下午2:10:39   
* @version v 1.0 
*/ 
public class ServiceException extends RuntimeException {

	private static final long serialVersionUID = 3583566093089790852L;

	public ServiceException() {
		super();
	}

	public ServiceException(String message) {
		super(message);
	}

	public ServiceException(Throwable cause) {
		super(cause);
	}

	public ServiceException(String message, Throwable cause) {
		super(message, cause);
	}
}
