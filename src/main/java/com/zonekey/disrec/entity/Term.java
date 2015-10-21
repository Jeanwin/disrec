package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class Term implements Serializable {

	// 学期id
	private String id;
	// 学期名称
	private String termname;
	// 开始日期
	private String startday;
	// 结束日期
	private String endday;
	// 上课周数
	private String weeks;
	// 创建时间
	private Date createdate;
	// 创建人
	private String createuser;
	// 修改时间
	private Date modifydate;
	// 修改人
	private String modifyuser;
	// 删除标志
	private String deleteflag;
	// 是否是当前学期 1代表是，0代表否
	private String iscurrent;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTermname() {
		return termname;
	}

	public void setTermname(String termname) {
		this.termname = termname;
	}

	public String getStartday() {
		return startday;
	}

	public void setStartday(String startday) {
		this.startday = startday;
	}

	public String getEndday() {
		return endday;
	}

	public void setEndday(String endday) {
		this.endday = endday;
	}

	public String getWeeks() {
		return weeks;
	}

	public void setWeeks(String weeks) {
		this.weeks = weeks;
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

	public String getIscurrent() {
		return iscurrent;
	}

	public void setIscurrent(String iscurrent) {
		this.iscurrent = iscurrent;
	}

	@Override
	public String toString() {
		return "Term [id=" + id + ", termname=" + termname + ", startday="
				+ startday + ", endday=" + endday + ", weeks=" + weeks
				+ ", createdate=" + createdate + ", createuser=" + createuser
				+ ", modifydate=" + modifydate + ", modifyuser=" + modifyuser
				+ ", deleteflag=" + deleteflag + ", iscurrent=" + iscurrent
				+ "]";
	}

	

}