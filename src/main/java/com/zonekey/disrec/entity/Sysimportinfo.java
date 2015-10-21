 /*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.entity;

/**
* @Title: Sysimportinfo.java
* @Description: 日志
* @author <a href="mailto:niuxl@zonekey.com.cn">牛喜林</a> 
* @date 2014年11月19日 下午1:23:55   
* @version v 1.0 
*/ 
public class Sysimportinfo {
	private String importid;
	private String importdate;
	private Integer status;
	private Integer questionid;
	private Integer excelid;
	private Integer systype;
	private Integer knowledgeid;
	private String error;
	private String type;
	public String getImportid() {
		return importid;
	}
	public void setImportid(String importid) {
		this.importid = importid;
	}
	public String getImportdate() {
		return importdate;
	}
	public void setImportdate(String importdate) {
		this.importdate = importdate;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getQuestionid() {
		return questionid;
	}
	public void setQuestionid(Integer questionid) {
		this.questionid = questionid;
	}
	public Integer getExcelid() {
		return excelid;
	}
	public void setExcelid(Integer excelid) {
		this.excelid = excelid;
	}
	public Integer getSystype() {
		return systype;
	}
	public void setSystype(Integer systype) {
		this.systype = systype;
	}
	public Integer getKnowledgeid() {
		return knowledgeid;
	}
	public void setKnowledgeid(Integer knowledgeid) {
		this.knowledgeid = knowledgeid;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	@Override
	public String toString() {
		return "Sysimportinfo [importid=" + importid + ", importdate="
				+ importdate + ", status=" + status + ", questionid="
				+ questionid + ", excelid=" + excelid + ", systype=" + systype
				+ ", knowledgeid=" + knowledgeid + ", error=" + error
				+ ", type=" + type + "]";
	}
	
}
