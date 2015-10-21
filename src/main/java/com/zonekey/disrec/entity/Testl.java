package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

import org.jgroups.tests.perf.Data;

public class Testl implements Serializable {
	private static final long serialVersionUID = 607427823423430667L;

	private String id;
	private String name;
	private Integer age;
	private Date datetime;
	
	
	public Testl(String id, String name, Integer age, Date date) {
		super();
		this.id = id;
		this.name = name;
		this.age = age;
		this.datetime = date;
	}
	
	public Testl() {
		
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
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public Date getDatetime() {
		return datetime;
	}
	public void setDatetime(Date datetime) {
		this.datetime = datetime;
	}

	@Override
	public String toString() {
		return "Testl [id=" + id + ", name=" + name + ", age=" + age
				+ ", datetime=" + datetime + "]";
	}
	
	
}
