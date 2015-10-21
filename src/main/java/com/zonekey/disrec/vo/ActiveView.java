package com.zonekey.disrec.vo;

import java.util.List;

import com.zonekey.disrec.entity.Active;


public class ActiveView extends Active {
	private static final long serialVersionUID = 2490895056615659265L;
	private List<String> reviewUsers;
	private String regdate;
	private String condate;
	private String typename;

	public List<String> getReviewUsers() {
		return reviewUsers;
	}

	public void setReviewUsers(List<String> reviewUsers) {
		this.reviewUsers = reviewUsers;
	}

	public String getRegdate() {
		return regdate;
	}

	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}

	public String getCondate() {
		return condate;
	}

	public void setCondate(String condate) {
		this.condate = condate;
	}

	public String getTypename() {
		return typename;
	}

	public void setTypename(String typename) {
		this.typename = typename;
	}



}
