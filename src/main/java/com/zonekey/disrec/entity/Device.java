package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class Device implements Serializable {
	private String id;
	private String parentid;
	private String areaid;
	private String name;
	private String typeid;
	private String mac;
	private String ip;
	private Date createtime;
	private String createuser;
	private Date modifydate;
	private String modifyuser;
	private String mostly;
	private String deleteflag;
	private int camera;

	public Device(String id, String parentid, String areaid, String name, String typeid, String mac, String ip, Date createtime, String createuser, Date modifydate, String modifyuser, String mostly,
			String deleteflag) {
		super();
		this.id = id;
		this.parentid = parentid;
		this.areaid = areaid;
		this.name = name;
		this.typeid = typeid;
		this.mac = mac;
		this.ip = ip;
		this.createtime = createtime;
		this.createuser = createuser;
		this.modifydate = modifydate;
		this.modifyuser = modifyuser;
		this.mostly = mostly;
		this.deleteflag = deleteflag;
	}

	public Device() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public String getAreaid() {
		return areaid;
	}

	public void setAreaid(String areaid) {
		this.areaid = areaid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTypeid() {
		return typeid;
	}

	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public String getCreateuser() {
		return createuser;
	}

	public void setCreateuser(String createuser) {
		this.createuser = createuser;
	}

	public Date getModifydate() {
		return modifydate;
	}

	public void setModifydate(Date modifydate) {
		this.modifydate = modifydate;
	}

	public String getModifyuser() {
		return modifyuser;
	}

	public void setModifyuser(String modifyuser) {
		this.modifyuser = modifyuser;
	}

	public String getMostly() {
		return mostly;
	}

	public void setMostly(String mostly) {
		this.mostly = mostly;
	}

	public String getDeleteflag() {
		return deleteflag;
	}

	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
	}

	public int getCamera() {
		return camera;
	}

	public void setCamera(int camera) {
		this.camera = camera;
	}

}