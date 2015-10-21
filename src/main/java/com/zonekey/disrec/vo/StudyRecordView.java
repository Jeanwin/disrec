package com.zonekey.disrec.vo;

import java.util.List;
import java.util.Map;

import com.zonekey.disrec.entity.StudyRecord;



public class StudyRecordView extends StudyRecord {
	private static final long serialVersionUID = 2490895056615659265L;
	
	private String username;
	private String deptname;
	private String type;
	private String subjectname;
	private String subjectattribute;
	private String resourceid;
	private String startdate;
	private String enddate;
	private String deptid;
	private String r_deptid;
	private String l_deptid;
	private String r_count;
	private String l_count;
	private String r_days;
	private String l_days;
	private List<Map<String,Object>> properties;
	
	
	public List<Map<String, Object>> getProperties() {
		return properties;
	}
	public void setProperties(List<Map<String, Object>> properties) {
		this.properties = properties;
	}
	public String getSubjectattribute() {
		return subjectattribute;
	}
	public void setSubjectattribute(String subjectattribute) {
		this.subjectattribute = subjectattribute;
	}
	public String getDeptid() {
		return deptid;
	}
	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}
	public String getResourceid() {
		return resourceid;
	}
	public void setResourceid(String resourceid) {
		this.resourceid = resourceid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getDeptname() {
		return deptname;
	}
	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getSubjectname() {
		return subjectname;
	}
	public void setSubjectname(String subjectname) {
		this.subjectname = subjectname;
	}
	public String getStartdate() {
		return startdate;
	}
	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}
	public String getEnddate() {
		return enddate;
	}
	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}
	public String getR_deptid() {
		return r_deptid;
	}
	public void setR_deptid(String r_deptid) {
		this.r_deptid = r_deptid;
	}
	public String getL_deptid() {
		return l_deptid;
	}
	public void setL_deptid(String l_deptid) {
		this.l_deptid = l_deptid;
	}
	public String getR_count() {
		return r_count;
	}
	public void setR_count(String r_count) {
		this.r_count = r_count;
	}
	public String getL_count() {
		return l_count;
	}
	public void setL_count(String l_count) {
		this.l_count = l_count;
	}
	public String getR_days() {
		return r_days;
	}
	public void setR_days(String r_days) {
		this.r_days = r_days;
	}
	public String getL_days() {
		return l_days;
	}
	public void setL_days(String l_days) {
		this.l_days = l_days;
	}
	
	
}
