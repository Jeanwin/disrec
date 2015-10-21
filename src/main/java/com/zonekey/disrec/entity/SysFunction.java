package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class SysFunction implements Serializable {

	private static final long serialVersionUID = -7846435017957930748L;

	private String id;
	private String parentid;
	private String funCode;
	private String funName;
	private String funPinyin;
	private String attributes;
	private String state;
	private Integer ordervalue;
	private String url;
	private Date createdate;
	private String createuser;
	private Date modifydate;
	private String modifyuser;
	private String deleteflag;

	public SysFunction(String id, String parentid, String funCode,
			String funName, String funPinyin, String attributes, String state,
			Integer ordervalue, String url, Date createdate, String createuser,
			Date modifydate, String modifyuser, String deleteflag) {
		this.id = id;
		this.parentid = parentid;
		this.funCode = funCode;
		this.funName = funName;
		this.funPinyin = funPinyin;
		this.attributes = attributes;
		this.state = state;
		this.ordervalue = ordervalue;
		this.url = url;
		this.createdate = createdate;
		this.createuser = createuser;
		this.modifydate = modifydate;
		this.modifyuser = modifyuser;
		this.deleteflag = deleteflag;
	}

	public SysFunction() {
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

	public String getFunCode() {
		return funCode;
	}

	public void setFunCode(String funCode) {
		this.funCode = funCode;
	}

	public String getFunName() {
		return funName;
	}

	public void setFunName(String funName) {
		this.funName = funName;
	}

	public String getFunPinyin() {
		return funPinyin;
	}

	public void setFunPinyin(String funPinyin) {
		this.funPinyin = funPinyin;
	}

	public String getAttributes() {
		return attributes;
	}

	public void setAttributes(String attributes) {
		this.attributes = attributes;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Integer getOrdervalue() {
		return ordervalue;
	}

	public void setOrdervalue(Integer ordervalue) {
		this.ordervalue = ordervalue;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
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