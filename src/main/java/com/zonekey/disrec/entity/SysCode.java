package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class SysCode implements Serializable {
	
	private static final long serialVersionUID = 5081866338182906984L;
	
	private String id;
	private String parentid;
	private String name;
	private String value;
	private String shortname;
	private Integer sort;
	private Short level;
	private Short childcount;
	private Short defaultValue;
	private Date createdate;
	private String createuser;
	private Date modifydate;
	private String modifyuser;
	private String deleteflag;

	public SysCode(String id, String parentid, String name, String shortname,
			Integer showorder, Short level, Short childcount,
			Short defaultValue, Date createdate, String createuser,
			Date modifydate, String modifyuser, String deleteflag) {
		this.id = id;
		this.parentid = parentid;
		this.name = name;
		this.shortname = shortname;
		this.sort = sort;
		this.level = level;
		this.childcount = childcount;
		this.defaultValue = defaultValue;
		this.createdate = createdate;
		this.createuser = createuser;
		this.modifydate = modifydate;
		this.modifyuser = modifyuser;
		this.deleteflag = deleteflag;
	}

	public SysCode() {
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

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getShortname() {
		return shortname;
	}

	public void setShortname(String shortname) {
		this.shortname = shortname;
	}

	

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public Short getLevel() {
		return level;
	}

	public void setLevel(Short level) {
		this.level = level;
	}

	public Short getChildcount() {
		return childcount;
	}

	public void setChildcount(Short childcount) {
		this.childcount = childcount;
	}

	public Short getDefaultValue() {
		return defaultValue;
	}

	public void setDefaultValue(Short defaultValue) {
		this.defaultValue = defaultValue;
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