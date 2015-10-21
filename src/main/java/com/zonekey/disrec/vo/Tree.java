package com.zonekey.disrec.vo;

import java.util.List;

public class Tree {
	private String id;
	private String title;
	private String attribute;
	private String sort;
	private String innerid;
	private String cameraNum;
	private int classcount;
	private String typeid;
	public int getClasscount() {
		return classcount;
	}

	public void setClasscount(int classcount) {
		this.classcount = classcount;
	}

	public String getCameraNum() {
		return cameraNum;
	}

	public void setCameraNum(String cameraNum) {
		this.cameraNum = cameraNum;
	}

	private List<Tree> nodes;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<Tree> getNodes() {
		return nodes;
	}

	public void setNodes(List<Tree> nodes) {
		this.nodes = nodes;
	}

	public String getAttribute() {
		return attribute;
	}

	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getInnerid() {
		return innerid;
	}

	public void setInnerid(String innerid) {
		this.innerid = innerid;
	}

	public String getTypeid() {
		return typeid;
	}

	public void setTypeid(String typeid) {
		this.typeid = typeid;
	}

}
