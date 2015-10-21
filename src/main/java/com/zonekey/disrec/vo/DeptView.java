package com.zonekey.disrec.vo;

import java.util.List;

import com.zonekey.disrec.entity.Dept;

public class DeptView extends Dept{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7923248860397580874L;
	private String parentname;
	private String areaName;
	private String areaid;
	private List<Dept> childs;
	private String errordescribe;//导入错误原因描述
	private String excelbatch;//导入批次号
	private String flag;//导入错误标识
	private String attributename;
	public String getParentname() {
		return parentname;
	}
	public void setParentname(String parentname) {
		this.parentname = parentname;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public List<Dept> getChilds() {
		return childs;
	}
	public void setChilds(List<Dept> childs) {
		this.childs = childs;
	}
	public String getAreaid() {
		return areaid;
	}
	public void setAreaid(String areaid) {
		this.areaid = areaid;
	}
	public String getErrordescribe() {
		return errordescribe;
	}
	public void setErrordescribe(String errordescribe) {
		this.errordescribe = errordescribe;
	}
	public String getExcelbatch() {
		return excelbatch;
	}
	public void setExcelbatch(String excelbatch) {
		this.excelbatch = excelbatch;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getAttributename() {
		return attributename;
	}
	public void setAttributename(String attributename) {
		this.attributename = attributename;
	}
	
}
