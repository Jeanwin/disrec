package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

/**
 * Description: study_active 实体类 活动实体类 CreateDate: Mon May 25 14:59:58 CST 2015
 * Author: JeanwinHuang@live.com
 */

public class Active implements Serializable {
	private static final long serialVersionUID = -2514143331737015310L;
	private int id;
	private String name;
	private String type;
	private String status;//状态
	private String picture;
	private String regbegintime;
	private String regendtime;
	private String conbegintime;
	private String conendtime;
	private String description;
	private String contemplate;
	private String model;
	private Date createdate;

	
	public Active() {
		super();
	}
	

	public Active(int id, String name, String type, String picture,
			String regbegintime, String regendtime, String conbegintime,
			String conendtime, String description, String contemplate,
			String model, Date createdate) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.picture = picture;
		this.regbegintime = regbegintime;
		this.regendtime = regendtime;
		this.conbegintime = conbegintime;
		this.conendtime = conendtime;
		this.description = description;
		this.contemplate = contemplate;
		this.model = model;
		this.createdate = createdate;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public void setId(int id) {
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getPicture() {
		return picture;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}

	public String getContemplate() {
		return contemplate;
	}

	public void setContemplate(String contemplate) {
		this.contemplate = contemplate;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getModel() {
		return model;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
	}

	public Date getCreatedate() {
		return createdate;
	}

	public String getRegbegintime() {
		return regbegintime;
	}

	public void setRegbegintime(String regbegintime) {
		this.regbegintime = regbegintime;
	}

	public String getRegendtime() {
		return regendtime;
	}

	public void setRegendtime(String regendtime) {
		this.regendtime = regendtime;
	}

	public String getConbegintime() {
		return conbegintime;
	}

	public void setConbegintime(String conbegintime) {
		this.conbegintime = conbegintime;
	}

	public String getConendtime() {
		return conendtime;
	}

	public void setConendtime(String conendtime) {
		this.conendtime = conendtime;
	}

	@Override
	public String toString() {
		return "Active [id=" + id + ", name=" + name + ", type=" + type + ", picture=" + picture + ", regbegintime=" + regbegintime + ", regendtime=" + regendtime + ", conbegintime=" + conbegintime
				+ ", conendtime=" + conendtime + ", description=" + description + ", contemplate=" + contemplate + ", model=" + model + ", createdate=" + createdate + "]";
	}

}
