/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.entity;

/**
* @Title: ScheduleTask.java
* @Description: 课表任务（设备接口调用）
* @author <a href="mailto:niuxl@zonekey.com.cn">牛喜林</a> 
* @date 2014年11月18日 下午1:26:03   
* @version v 1.0 
*/ 
public class ScheduleTask {
	private String DirectoryName;
	private CourseInfo courseInfo;
	private String Recording;
	private String RecordMode;
	private String StartTime;
	private String StopTime;
	private String Living;
	private String livingMode;
	private String StartMode;
	
	public String getStartMode() {
		return StartMode;
	}
	public void setStartMode(String startMode) {
		StartMode = startMode;
	}
	public String getDirectoryName() {
		return DirectoryName;
	}
	public void setDirectoryName(String directoryName) {
		DirectoryName = directoryName;
	}
	public CourseInfo getCourseInfo() {
		return courseInfo;
	}
	public void setCourseInfo(CourseInfo courseInfo) {
		this.courseInfo = courseInfo;
	}
	public String getRecording() {
		return Recording;
	}
	public void setRecording(String recording) {
		Recording = recording;
	}
	public String getRecordMode() {
		return RecordMode;
	}
	public void setRecordMode(String recordMode) {
		RecordMode = recordMode;
	}
	public String getStartTime() {
		return StartTime;
	}
	public void setStartTime(String startTime) {
		StartTime = startTime;
	}
	public String getStopTime() {
		return StopTime;
	}
	public void setStopTime(String stopTime) {
		StopTime = stopTime;
	}
	public String getLiving() {
		return Living;
	}
	public void setLiving(String living) {
		Living = living;
	}
	public String getLivingMode() {
		return livingMode;
	}
	public void setLivingMode(String livingMode) {
		this.livingMode = livingMode;
	}
	@Override
	public String toString() {
		return "ScheduleTask [DirectoryName=" + DirectoryName + ", courseInfo="
				+ courseInfo + ", Recording=" + Recording + ", RecordMode="
				+ RecordMode + ", StartTime=" + StartTime + ", StopTime="
				+ StopTime + ", Living=" + Living + ", livingMode="
				+ livingMode + "]";
	}
	
	
}
