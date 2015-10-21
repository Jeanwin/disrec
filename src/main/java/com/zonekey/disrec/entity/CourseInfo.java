/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.entity;

/**
* @Title: CourseInfo.java
* @Description: 课表部分信息（设备接口调用）
* @author <a href="mailto:niuxl@zonekey.com.cn">牛喜林</a> 
* @date 2014年11月18日 下午1:23:04   
* @version v 1.0 
*/ 
public class CourseInfo {
	private String Department;
	private String Subject;
	private String CourseName;
	private String Teacher;
	private String Grade;
	private String Address;
	private String Description;

	public String getDepartment() {
		return Department;
	}

	public void setDepartment(String department) {
		Department = department;
	}

	public String getSubject() {
		return Subject;
	}

	public void setSubject(String subject) {
		Subject = subject;
	}

	public String getCourseName() {
		return CourseName;
	}

	public void setCourseName(String courseName) {
		CourseName = courseName;
	}

	public String getTeacher() {
		return Teacher;
	}

	public void setTeacher(String teacher) {
		Teacher = teacher;
	}

	public String getGrade() {
		return Grade;
	}

	public void setGrade(String grade) {
		Grade = grade;
	}

	public String getAddress() {
		return Address;
	}

	public void setAddress(String address) {
		Address = address;
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
	}

	@Override
	public String toString() {
		return "CourseInfo [Department=" + Department + ", Subject=" + Subject
				+ ", CourseName=" + CourseName + ", Teacher=" + Teacher
				+ ", Grade=" + Grade + ", Address=" + Address
				+ ", Description=" + Description + "]";
	}

}
