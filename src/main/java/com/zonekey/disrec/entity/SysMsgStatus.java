package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class SysMsgStatus implements Serializable {
	
	private static final long serialVersionUID = -8178523294837231783L;
	
	private String id;
	private String msgid;
	private String userid;
	private String status;
	private String deleteflag;
	private Date readtime;
	private Date createdate;
	private String createuser;
	private Date modifydate;
	private String modifyuser;

	public SysMsgStatus(String id, String msgid, String userid, String status,
			String deleteflag, Date readtime, Date createdate,
			String createuser, Date modifydate, String modifyuser) {

		this.id = id;
		this.msgid = msgid;
		this.userid = userid;
		this.status = status;
		this.deleteflag = deleteflag;
		this.readtime = readtime;
		this.createdate = createdate;
		this.createuser = createuser;
		this.modifydate = modifydate;
		this.modifyuser = modifyuser;
	}

	public SysMsgStatus() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMsgid() {
		return msgid;
	}

	public void setMsgid(String msgid) {
		this.msgid = msgid;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDeleteflag() {
		return deleteflag;
	}

	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
	}

	public Date getReadtime() {
		return readtime;
	}

	public void setReadtime(Date readtime) {
		this.readtime = readtime;
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

}