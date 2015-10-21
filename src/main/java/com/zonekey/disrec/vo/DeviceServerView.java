package com.zonekey.disrec.vo;

import java.io.Serializable;
import java.util.Date;

import com.zonekey.disrec.entity.Active;
import com.zonekey.disrec.entity.DeviceServer;

/**
 * xufx
 */

public class DeviceServerView  extends DeviceServer  {
	private static final long serialVersionUID = -2514143331737015310L;

	private String name;
	private String ip;
	private String flag;
	private String areaid;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getAreaid() {
		return areaid;
	}
	public void setAreaid(String areaid) {
		this.areaid = areaid;
	}
	
	
}
