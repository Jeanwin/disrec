package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class DeviceService implements Serializable {
	private String id;
	private String deviceid;
	private String name;
	private String type;
	private String state;
	private String url;
	private Date createtime;
	private String description;
	private String extendinfo;
	private Date modifydate;
	private String createuser;
	private String modifyuser;
	private String deleteflag;

	public DeviceService(String id, String deviceid, String name, String type,
			String state, String url, Date createtime, String description,
			String extendinfo, Date modifydate, String createuser,
			String modifyuser, String deleteflag) {
		this.id = id;
		this.deviceid = deviceid;
		this.name = name;
		this.type = type;
		this.state = state;
		this.url = url;
		this.createtime = createtime;
		this.description = description;
		this.extendinfo = extendinfo;
		this.modifydate = modifydate;
		this.createuser = createuser;
		this.modifyuser = modifyuser;
		this.deleteflag = deleteflag;
	}

	public DeviceService() {
	}

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getExtendinfo() {
		return extendinfo;
	}

	public void setExtendinfo(String extendinfo) {
		this.extendinfo = extendinfo;
	}

	public Date getModifydate() {
		return modifydate;
	}

	public void setModifydate(Date modifydate) {
		this.modifydate = modifydate;
	}

	public String getCreateuser() {
		return createuser;
	}

	public void setCreateuser(String createuser) {
		this.createuser = createuser;
	}

	public String getModifyuser() {
		return modifyuser;
	}

	public void setModifyuser(String modifyuser) {
		this.modifyuser = modifyuser;
	}

	public String getDeleteflag() {
		return deleteflag;
	}

	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
	}

}