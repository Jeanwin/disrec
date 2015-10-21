package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotNull;

public class Area implements Serializable {

	private static final long serialVersionUID = 6074278776110230667L;
	
	private String id;
	private String parentid;
	private String name;
	private String innerid;
	private String attribute;
	private String userid;
	private String deptid;
	private String state;
	private String sort;
	private String createdate;
	private Date modifydate;
	private String createuser;
	private String modifyuser;
	private String deleteflag;

	public Area() {
	}
	
	public Area(String id, String parentid, String name, String innerid,
			String attribute, String userid, String deptid, String state,
			String sort, String createdate, Date modifydate, String createuser,
			String modifyuser, String deleteflag) {
		this.id = id;
		this.parentid = parentid;
		this.name = name;
		this.innerid = innerid;
		this.attribute = attribute;
		this.userid = userid;
		this.deptid = deptid;
		this.state = state;
		this.sort = sort;
		this.createdate = createdate;
		this.modifydate = modifydate;
		this.createuser = createuser;
		this.modifyuser = modifyuser;
		this.deleteflag = deleteflag;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getInnerid() {
		return innerid;
	}

	public void setInnerid(String innerid) {
		this.innerid = innerid;
	}

	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getDeptid() {
		return deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getCreatedate() {
		return createdate;
	}

	public void setCreatedate(String createdate) {
		this.createdate = createdate;
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

	@Override
	public String toString() {
		return "Area [id=" + id + ", parentid=" + parentid + ", name=" + name
				+ ", innerid=" + innerid + ", attribute=" + attribute
				+ ", userid=" + userid + ", deptid=" + deptid + ", state="
				+ state + ", sort=" + sort + ", createdate=" + createdate
				+ ", modifydate=" + modifydate + ", createuser=" + createuser
				+ ", modifyuser=" + modifyuser + ", deleteflag=" + deleteflag
				+ "]";
	}

}