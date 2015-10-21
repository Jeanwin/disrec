package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class RangeScope implements Serializable {

	private static final long serialVersionUID = -9075308702932585130L;
	
	private String id;
	private String rangeid;
	private String scopeid;
	private String scopetype;
	private Date createdate;
	private String createuser;
	private Date modifydate;
	private String modifyuser;
	private String deleteflag;
	private String isChecked;
	public RangeScope(String id, String rangeid, String scopeid,
			String scopetype, Date createdate, String createuser,
			Date modifydate, String modifyuser, String deleteflag) {
		this.id = id;
		this.rangeid = rangeid;
		this.scopeid = scopeid;
		this.scopetype = scopetype;
		this.createdate = createdate;
		this.createuser = createuser;
		this.modifydate = modifydate;
		this.modifyuser = modifyuser;
		this.deleteflag = deleteflag;
	}

	public RangeScope() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRangeid() {
		return rangeid;
	}

	public void setRangeid(String rangeid) {
		this.rangeid = rangeid;
	}

	public String getScopeid() {
		return scopeid;
	}

	public void setScopeid(String scopeid) {
		this.scopeid = scopeid;
	}

	public String getScopetype() {
		return scopetype;
	}

	public void setScopetype(String scopetype) {
		this.scopetype = scopetype;
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

	public String getIsChecked() {
		return isChecked;
	}

	public void setIsChecked(String isChecked) {
		this.isChecked = isChecked;
	}

}