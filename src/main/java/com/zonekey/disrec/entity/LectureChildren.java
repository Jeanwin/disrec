package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;
/**
 * 
 * @author xufx 
 * @Date 2015.05.26
 *听课子表
 */
public class LectureChildren implements Serializable{
	/**
	 * 听课子表
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	
	private String parentid;
	
	private String childKey;
	
	private String childValue;
	
	private Integer sort;//使用次数
	
	private String deleteflag;
	
	
	
	public String getParentid() {
		return parentid;
	}
	public void setParentid(String parentid) {
		this.parentid = parentid;
	}
	public String getDeleteflag() {
		return deleteflag;
	}
	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getChildKey() {
		return childKey;
	}
	public void setChildKey(String childKey) {
		this.childKey = childKey;
	}
	
	public String getChildValue() {
		return childValue;
	}
	public void setChildValue(String childValue) {
		this.childValue = childValue;
	}
	public Integer getSort() {
		return sort;
	}
	public void setSort(Integer sort) {
		this.sort = sort;
	}

}
