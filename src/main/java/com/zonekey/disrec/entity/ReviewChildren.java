package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
/**
 * 
 * @author xufx 
 * @Date 2015.05.26
 *听课子表
 */
public class ReviewChildren implements Serializable{
	/**
	 * 听课子表
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	
	private String parentid;
	private String reviewid;
	
	private String childKey;//听课表名称
	
	private double childValue;//分数
	
	private Integer sort;
	
	private String deleteflag;
	
	private List<ReviewChildren> childList;
	

	

	public List<ReviewChildren> getChildList() {
		return childList;
	}

	public void setChildList(List<ReviewChildren> childList) {
		this.childList = childList;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public String getReviewid() {
		return reviewid;
	}

	public void setReviewid(String reviewid) {
		this.reviewid = reviewid;
	}

	public String getChildKey() {
		return childKey;
	}

	public void setChildKey(String childKey) {
		this.childKey = childKey;
	}

	public double getChildValue() {
		return childValue;
	}

	public void setChildValue(double childValue) {
		this.childValue = childValue;
	}

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public String getDeleteflag() {
		return deleteflag;
	}

	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
	}
	

	
}
