package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;
/**
 * 
 * @author xufx 
 * @Date 2015.05.26
 *听课表
 */
public class Lecture implements Serializable{

	/**
	 * 听课表
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	
	private String lectureName;//听课表名称
	
	private String description;
	private int usetimes;//使用次数
	private String status;//状态
	private Date createtime;
	private Date modifytime;
	private String createuser;
	private String modifyuser;
	private String deleteflag;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getLectureName() {
		return lectureName;
	}
	public void setLectureName(String lectureName) {
		this.lectureName = lectureName;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getUsetimes() {
		return usetimes;
	}
	public void setUsetimes(int usetimes) {
		this.usetimes = usetimes;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	public Date getModifytime() {
		return modifytime;
	}
	public void setModifytime(Date modifytime) {
		this.modifytime = modifytime;
	}
	public String getCreateuser() {
		return createuser;
	}
	public void setCreateuser(String createuser) {
		this.createuser = createuser;
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
