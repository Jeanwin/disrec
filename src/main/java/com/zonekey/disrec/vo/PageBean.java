package com.zonekey.disrec.vo;

import java.util.Map;

public class PageBean {
	private Map<String,Object> page;
	private Map<String,Object> keywords;
	private String flag;
	private String treeid;
	public Map<String, Object> getPage() {
		return page;
	}
	public void setPage(Map<String, Object> page) {
		this.page = page;
	}
	public Map<String, Object> getKeywords() {
		return keywords;
	}
	public void setKeywords(Map<String, Object> keywords) {
		this.keywords = keywords;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getTreeid() {
		return treeid;
	}
	public void setTreeid(String treeid) {
		this.treeid = treeid;
	}
	
}
