package com.zonekey.disrec.vo;

import java.util.List;
import java.util.Map;

import com.zonekey.disrec.entity.RangeScope;
import com.zonekey.disrec.entity.SysRole;
import com.zonekey.disrec.entity.SysUser;


public class SysUserView extends SysUser{
	/**
	 * 
	 */
	private static final long serialVersionUID = 6664351819710258025L;
	private String deptName;
	private String statusName;
	private String usertypeName;
	private String sexName;
	private String code;//验证码
	private Map<String,Object> terms;//学期信息
	private List<SysRole> roleList;
	private List<String> authenticatid;
	private List<RangeScope> scopeList;
	private String errordescribe;//导入错误原因描述
	private String excelbatch;//导入批次号
	private String flag;//导入错误标识
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public List<SysRole> getRoleList() {
		return roleList;
	}
	public void setRoleList(List<SysRole> roleList) {
		this.roleList = roleList;
	}
	public List<RangeScope> getScopeList() {
		return scopeList;
	}
	public void setScopeList(List<RangeScope> scopeList) {
		this.scopeList = scopeList;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public String getUsertypeName() {
		return usertypeName;
	}
	public void setUsertypeName(String usertypeName) {
		this.usertypeName = usertypeName;
	}
	public String getSexName() {
		return sexName;
	}
	public void setSexName(String sexName) {
		this.sexName = sexName;
	}
	
	public List<String> getAuthenticatid() {
		return authenticatid;
	}
	public void setAuthenticatid(List<String> authenticatid) {
		this.authenticatid = authenticatid;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public Map<String, Object> getTerms() {
		return terms;
	}
	public void setTerms(Map<String, Object> terms) {
		this.terms = terms;
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
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	
	
}
