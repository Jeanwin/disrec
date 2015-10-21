package com.zonekey.disrec.vo;

import java.util.List;

import com.zonekey.disrec.entity.SysRole;

public class SysRoleView extends SysRole{
	private List<SysFunctionView> functions;

	public List<SysFunctionView> getFunctions() {
		return functions;
	}

	public void setFunctions(List<SysFunctionView> functions) {
		this.functions = functions;
	}

	
	
}
