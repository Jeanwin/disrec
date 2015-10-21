package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;
/**
 * 
 * @author xufx 
 * @Date 2015.05.26
 *听课表
 */
public class Review implements Serializable{

	/**
	 * 听课表
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	
	private String name;//听课表名称
	
	private String description;
	private int assess;//主观评价 1需要 0 不需要
	private int usetimes;
	private String markType;//打分方式
	private Date createtime;
	private Date modifytime;
	private String createuser;
	private String modifyuser;
	private String deleteflag;
	
	private String assessdesc;//主观评价 1需要 0 不需要
	private String markTypedesc;//打分方式
	
	
	public String getAssessdesc() {
		return assessdesc;
	}
	public void setAssessdesc(String assessdesc) {
		this.assessdesc = assessdesc;
	}
	public String getMarkTypedesc() {
		return markTypedesc;
	}
	public void setMarkTypedesc(String markTypedesc) {
		this.markTypedesc = markTypedesc;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getAssess() {
		return assess;
	}
	public void setAssess(int assess) {
		this.assess = assess;
	}
	public int getUsetimes() {
		return usetimes;
	}
	public void setUsetimes(int usetimes) {
		this.usetimes = usetimes;
	}
	public String getMarkType() {
		return markType;
	}
	public void setMarkType(String markType) {
		this.markType = markType;
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
