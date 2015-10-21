package com.zonekey.disrec.vo;

import com.zonekey.disrec.entity.SysCode;

public class SysCodeView extends SysCode{
	private String parentName;

	public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}
	
}
