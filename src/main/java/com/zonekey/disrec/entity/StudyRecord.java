package com.zonekey.disrec.entity;

import java.util.Date;

public class StudyRecord {
	private int id;
	private int worksid;
	private String userid;
	private String content;
	private String templateid;
	private Date createDate;
	private String timeflag;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getWorksid() {
		return worksid;
	}
	public void setWorksid(int worksid) {
		this.worksid = worksid;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getTemplateid() {
		return templateid;
	}
	public void setTemplateid(String templateid) {
		this.templateid = templateid;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getTimeflag() {
		return timeflag;
	}
	public void setTimeflag(String timeflag) {
		this.timeflag = timeflag;
	}
	
//	@Override
//	public String toString() {
//		return "StudyRecord [id=" + id + ", worksid=" + worksid + ", userid="
//				+ userid + ", content=" + content + ", templateid="
//				+ templateid + ", createDate=" + createDate + "]";
//	}
	

}
