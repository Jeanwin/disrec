package com.zonekey.disrec.vo;

import java.util.List;

import com.zonekey.disrec.entity.Area;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.entity.Device;
import com.zonekey.disrec.entity.SysUser;

public class AreaView extends Area {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1065698676188105019L;
	private String parentname;
	private String username;
	private String deptName;
	private String mac;// 该mac为该教室下录播机mac,录播机唯一
	private String deviceTypeid;
	
	private String subject;// 课程名
	private String starttime;// 开始时间
	private String endtime;// 结束时间
	private String curriculumId;
	private String resourcefloder;
	private List<AreaView> childs;
	private String errordescribe;// 导入错误原因描述
	private String excelbatch;// 导入批次号
	private String flag;// 导入错误标识
	// 2015-3-11 add
	private String devicename;
	private String ip;
	// 2015-3-30
	private List<Device> device;
	private Curriculum curriculum;
	// 2015-4-1
	private int cameraNum;
	private String title;
	// 2015-4-29
	private String deviRemain;
	private String macState;
	
	

	

	public String getDeviceTypeid() {
		return deviceTypeid;
	}

	public void setDeviceTypeid(String deviceTypeid) {
		this.deviceTypeid = deviceTypeid;
	}

	public String getMacState() {
		return macState;
	}

	public void setMacState(String macState) {
		this.macState = macState;
	}

	public String getDeviRemain() {
		return deviRemain;
	}

	public void setDeviRemain(String deviRemain) {
		this.deviRemain = deviRemain;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getCameraNum() {
		return cameraNum;
	}

	public void setCameraNum(int cameraNum) {
		this.cameraNum = cameraNum;
	}

	public List<Device> getDevice() {
		return device;
	}

	public void setDevice(List<Device> device) {
		this.device = device;
	}

	public Curriculum getCurriculum() {
		return curriculum;
	}

	public void setCurriculum(Curriculum curriculum) {
		this.curriculum = curriculum;
	}

	public String getParentname() {
		return parentname;
	}

	public void setParentname(String parentname) {
		this.parentname = parentname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public List<AreaView> getChilds() {
		return childs;
	}

	public void setChilds(List<AreaView> childs) {
		this.childs = childs;
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getStarttime() {
		return starttime;
	}

	public void setStarttime(String starttime) {
		this.starttime = starttime;
	}

	public String getEndtime() {
		return endtime;
	}

	public void setEndtime(String endtime) {
		this.endtime = endtime;
	}

	public String getCurriculumId() {
		return curriculumId;
	}

	public void setCurriculumId(String curriculumId) {
		this.curriculumId = curriculumId;
	}

	public String getResourcefloder() {
		return resourcefloder;
	}

	public void setResourcefloder(String resourcefloder) {
		this.resourcefloder = resourcefloder;
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

	public String getDevicename() {
		return devicename;
	}

	public void setDevicename(String devicename) {
		this.devicename = devicename;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

}
