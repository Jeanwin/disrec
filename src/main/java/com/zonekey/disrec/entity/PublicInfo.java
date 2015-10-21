/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.entity;

/**
 * @Title: PublicInfo.java
 * @Description: 公共类
 * @author <a href="mailto:niuxl@zonekey.com.cn">牛喜林</a>
 * @date 2014年12月8日 下午6:34:43
 * @version v 1.0
 */
public class PublicInfo {
	private String id;
	private String mac;
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	@Override
	public String toString() {
		return "PublicInfo [id=" + id + "]";
	}

}
