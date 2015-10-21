/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.entity;

import java.util.List;
import java.util.Map;

/**
* @Title: DevicePoling.java
* @Description: 课程巡视
* @author <a href="mailto:niuxl@zonekey.com.cn">牛喜林</a> 
* @date 2014年12月8日 上午11:16:25   
* @version v 1.0 
*/ 
public class DevicePoling {
	private String id;
	private String userid;
	// 轮巡的教室id，逗号分隔
	private List<PublicInfo> areainfoList;
	// 轮巡的机位id,逗号分隔
	private List<PublicInfo> deviceinfoList;
	// 轮巡的教室id，逗号分隔
	private String areainfo;
		// 轮巡的机位id,逗号分隔
	private String deviceinfo;
	// 分屏设置，从数据字典里获取id并保存
	private String polingset;
	// 轮巡间隔描述
	private String polingtime;
	private String createdate;
	private String createuser;
	private String modifydate;
	private String modifyuser;
	private String deleteflag;
	private List<String> macList;
	//轮巡模式
	private String roundType;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}
	public List<PublicInfo> getAreainfoList() {
		return areainfoList;
	}
	public void setAreainfoList(List<PublicInfo> areainfoList) {
		this.areainfoList = areainfoList;
	}
	public List<PublicInfo> getDeviceinfoList() {
		return deviceinfoList;
	}
	public void setDeviceinfoList(List<PublicInfo> deviceinfoList) {
		this.deviceinfoList = deviceinfoList;
	}
	public String getAreainfo() {
		return areainfo;
	}
	public void setAreainfo(String areainfo) {
		this.areainfo = areainfo;
	}
	public String getDeviceinfo() {
		return deviceinfo;
	}
	public void setDeviceinfo(String deviceinfo) {
		this.deviceinfo = deviceinfo;
	}
	public String getPolingset() {
		return polingset;
	}
	public void setPolingset(String polingset) {
		this.polingset = polingset;
	}
	public String getPolingtime() {
		return polingtime;
	}
	public void setPolingtime(String polingtime) {
		this.polingtime = polingtime;
	}
	public String getCreatedate() {
		return createdate;
	}
	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}
	public String getCreateuser() {
		return createuser;
	}
	public void setCreateuser(String createuser) {
		this.createuser = createuser;
	}
	public String getModifydate() {
		return modifydate;
	}
	public void setModifydate(String modifydate) {
		this.modifydate = modifydate;
	}
	public String getModifyuser() {
		return modifyuser;
	}
	public void setModifyuser(String modifyuser) {
		this.modifyuser = modifyuser;
	}
	public String getDeleteflag() {
		return deleteflag;
	}
	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
	}
	
	public String getRoundType() {
		return roundType;
	}
	public void setRoundType(String roundType) {
		this.roundType = roundType;
	}
	
	public List<String> getMacList() {
		return macList;
	}
	public void setMacList(List<String> macList) {
		this.macList = macList;
	}
	@Override
	public String toString() {
		return "DevicePoling [id=" + id + ", userid=" + userid
				+ ", areainfoList=" + areainfoList + ", deviceinfoList="
				+ deviceinfoList + ", areainfo=" + areainfo + ", deviceinfo="
				+ deviceinfo + ", polingset=" + polingset + ", polingtime="
				+ polingtime + ", createdate=" + createdate + ", createuser="
				+ createuser + ", modifydate=" + modifydate + ", modifyuser="
				+ modifyuser + ", deleteflag=" + deleteflag + ", macList="
				+ macList + ", roundType=" + roundType + "]";
	}

}
