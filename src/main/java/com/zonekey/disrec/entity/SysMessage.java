package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class SysMessage implements Serializable {

	private static final long serialVersionUID = 3588487884728626597L;
	
	private String id;
	private String userid;
	private String typeid;
	private String title;
	private String content;
	private String status;
	private Date createdate;
	private String createuser;
	private Date modifydate;
	private String modifyuser;
	private String deleteflag;

	public SysMessage(String id, String userid, String typeid, String title,
			String content, String status, Date createdate, String createuser,
			Date modifydate, String modifyuser, String deleteflag) {

		this.id = id;
		this.userid = userid;
		this.typeid = typeid;
		this.title = title;
		this.content = content;
		this.status = status;
		this.createdate = createdate;
		this.createuser = createuser;
		this.modifydate = modifydate;
		this.modifyuser = modifyuser;
		this.deleteflag = deleteflag;
	}

	public SysMessage() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getTypeid() {
		return typeid;
	}

	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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