package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * xufx
 */

public class DeviceServer implements Serializable {
	private static final long serialVersionUID = -2514143331737015310L;
	private String id;
	private String deviceid;
	private String serverid;
	private String deleteflag;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDeviceid() {
		return deviceid;
	}
	public void setDeviceid(String deviceid) {
		this.deviceid = deviceid;
	}
	public String getServerid() {
		return serverid;
	}
	public void setServerid(String serverid) {
		this.serverid = serverid;
	}
	public String getDeleteflag() {
		return deleteflag;
	}
	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
	}
	

}
