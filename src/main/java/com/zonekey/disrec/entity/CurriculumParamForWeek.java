/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.entity;

public class CurriculumParamForWeek extends Curriculum{
	private String monDate;
	private String tuesDate;
	private String wednesDate;
	private String thursDate;
	private String friDate;
	private String saturDate;
	private String sunDate;
	private String classbatch;//批次id
//	private String areaid;
//	private String weeks;
//	private String live;
//	private String record;
//	private String isresource;
	//0代表没有过期，1代表过期
	private String showstatus;
	//上课时间
	private String today;
	private String rqid;
	private String classstarttime;
	private String classendtime;
	private String subtoday;
	public String getMonDate() {
		return monDate;
	}
	public void setMonDate(String monDate) {
		this.monDate = monDate;
	}
	public String getTuesDate() {
		return tuesDate;
	}
	public void setTuesDate(String tuesDate) {
		this.tuesDate = tuesDate;
	}
	public String getWednesDate() {
		return wednesDate;
	}
	public void setWednesDate(String wednesDate) {
		this.wednesDate = wednesDate;
	}
	public String getThursDate() {
		return thursDate;
	}
	public void setThursDate(String thursDate) {
		this.thursDate = thursDate;
	}
	public String getFriDate() {
		return friDate;
	}
	public void setFriDate(String friDate) {
		this.friDate = friDate;
	}
	public String getSaturDate() {
		return saturDate;
	}
	public void setSaturDate(String saturDate) {
		this.saturDate = saturDate;
	}
	public String getSunDate() {
		return sunDate;
	}
	public void setSunDate(String sunDate) {
		this.sunDate = sunDate;
	}
	public String getClassbatch() {
		return classbatch;
	}
	public void setClassbatch(String classbatch) {
		this.classbatch = classbatch;
	}
	public String getShowstatus() {
		return showstatus;
	}
	public void setShowstatus(String showstatus) {
		this.showstatus = showstatus;
	}
	public String getToday() {
		return today;
	}
	public void setToday(String today) {
		this.today = today;
	}
	public String getRqid() {
		return rqid;
	}
	public void setRqid(String rqid) {
		this.rqid = rqid;
	}
	public String getClassstarttime() {
		return classstarttime;
	}
	public void setClassstarttime(String classstarttime) {
		this.classstarttime = classstarttime;
	}
	public String getClassendtime() {
		return classendtime;
	}
	public void setClassendtime(String classendtime) {
		this.classendtime = classendtime;
	}
	
	public String getSubtoday() {
		return subtoday;
	}
	public void setSubtoday(String subtoday) {
		this.subtoday = subtoday;
	}
	@Override
	public String toString() {
		return "CurriculumParamForWeek [monDate=" + monDate + ", tuesDate="
				+ tuesDate + ", wednesDate=" + wednesDate + ", thursDate="
				+ thursDate + ", friDate=" + friDate + ", saturDate="
				+ saturDate + ", sunDate=" + sunDate + ", classbatch="
				+ classbatch + ", showstatus=" + showstatus + ", today="
				+ today + ", rqid=" + rqid + ", classstarttime="
				+ classstarttime + ", classendtime=" + classendtime + "]";
	}
	

	

}
