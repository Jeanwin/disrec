package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class Dept implements Serializable {
	private String id;
	private String parentid;
	private String code;
	private String name;
	private String attribute;
	private String description;
	private Integer sort;
	private String state;
	private String classyear;
	private Date createdate;
	private String createuser;
	private Date modifydate;
	private String modifyuser;
	private String deleteflag;

	public Dept(String id, String parentid, String code, String name,
			String attribute, String description, Integer sort, String state,
			String classyear, Date createdate, String createuser,
			Date modifydate, String modifyuser, String deleteflag) {
		this.id = id;
		this.parentid = parentid;
		this.code = code;
		this.name = name;
		this.attribute = attribute;
		this.description = description;
		this.sort = sort;
		this.state = state;
		this.classyear = classyear;
		this.createdate = createdate;
		this.createuser = createuser;
		this.modifydate = modifydate;
		this.modifyuser = modifyuser;
		this.deleteflag = deleteflag;
	}

	public Dept() {
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

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getClassyear() {
		return classyear;
	}

	public void setClassyear(String classyear) {
		this.classyear = classyear;
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