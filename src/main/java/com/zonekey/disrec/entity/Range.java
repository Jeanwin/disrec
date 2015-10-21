package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class Range implements Serializable {
	private String id;
	private String name;
	private String typeid;
	private Date createdate;
	private String createuser;
	private Date modifydate;
	private String modifyuser;
	private String deleteflag;

	public Range(String id, String name, String typeid, Date createdate,
			String createuser, Date modifydate, String modifyuser,
			String deleteflag) {
		this.id = id;
		this.name = name;
		this.typeid = typeid;
		this.createdate = createdate;
		this.createuser = createuser;
		this.modifydate = modifydate;
		this.modifyuser = modifyuser;
		this.deleteflag = deleteflag;
	}

	public Range() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public Date getCreatedate() {
		return createdate;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
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

	public String getDeleteflag() {
		return deleteflag;
	}

	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
	}

}