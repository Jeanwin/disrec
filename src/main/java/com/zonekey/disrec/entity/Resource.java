package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class Resource implements Serializable {
	private String id;
	private String userid;
	private String username;
	private String areaid;
	private String areaname;
	private String curriculumid;
	private String deptid;
	private String deptname;
	private String name;
	private String course;
	private String floder;
	private String source;
	private String description;
//	private String state;
	private String type;
	private Integer size;
	private String createdate;
	private String modifydate;
	private String createuser;
	private String modifyuser;
	private String deleteflag;
	//分类
	private String sorted;
	//发布日期
	private String publishdate;
	//时长
	private String timelength;
	//观看数
	private String watchwatchnum;
	//视频机位
	private String objectpos;
	//父节点
	private String parentid;
	//文件或文件夹
	private String attribute;
	//上传状态
	private String uploadstate;
	//发布状态
	public String publishstate;
	//标签
	public String label;
	private String startdate;
	private String enddate;
	//资源上传
	private String uploadismanual;
//	图像
	private String uploadPic;
	//删除状态
	private String uploaddeletestatus;
	//资源删除
	private String uploadisdelete;
	//资源类型
	private String resourcetype;
	private String resourcetypename;
	//学科
	private String subject;
	private String subjectname;
	//阶段
	private String grade;
	private String gradename;
	//资源名称
	private String resourcename;
	//'点播上传状态:0:正在上传,1:上传完成,2:未上传',
	private String status;
	//自定义类型1
	private String selfType1;
	private String selfType1name;
	//自定义类型1
	private String selfType2;
	private String selfType2name;
		//自定义类型1
	private String selfType3;
	private String selfType3name;
	
	private String resourcePath;//"/video/2015/20150603/"
	
	private Integer comeflag;//0 自动上传  1 手动上传 （录播页面上的按钮）
	
	public Integer getComeflag() {
		return comeflag;
	}
	public void setComeflag(Integer comeflag) {
		this.comeflag = comeflag;
	}
	public String getResourcetypename() {
		return resourcetypename;
	}
	public void setResourcetypename(String resourcetypename) {
		this.resourcetypename = resourcetypename;
	}
	public String getSubjectname() {
		return subjectname;
	}
	public void setSubjectname(String subjectname) {
		this.subjectname = subjectname;
	}
	public String getGradename() {
		return gradename;
	}
	public void setGradename(String gradename) {
		this.gradename = gradename;
	}
	public String getSelfType1name() {
		return selfType1name;
	}
	public void setSelfType1name(String selfType1name) {
		this.selfType1name = selfType1name;
	}
	public String getSelfType2name() {
		return selfType2name;
	}
	public void setSelfType2name(String selfType2name) {
		this.selfType2name = selfType2name;
	}
	public String getSelfType3name() {
		return selfType3name;
	}
	public void setSelfType3name(String selfType3name) {
		this.selfType3name = selfType3name;
	}
	public String getResourcePath() {
		return resourcePath;
	}
	public void setResourcePath(String resourcePath) {
		this.resourcePath = resourcePath;
	}
	public String getUploadPic() {
		return uploadPic;
	}
	public void setUploadPic(String uploadPic) {
		this.uploadPic = uploadPic;
	}
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
	public String getAreaid() {
		return areaid;
	}
	public void setAreaid(String areaid) {
		this.areaid = areaid;
	}
	public String getCurriculumid() {
		return curriculumid;
	}
	public void setCurriculumid(String curriculumid) {
		this.curriculumid = curriculumid;
	}
	public String getDeptid() {
		return deptid;
	}
	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCourse() {
		return course;
	}
	public void setCourse(String course) {
		this.course = course;
	}
	public String getFloder() {
		return floder;
	}
	public void setFloder(String floder) {
		this.floder = floder;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	
	public String getCreatedate() {
		return createdate;
	}
	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}
	public String getModifydate() {
		return modifydate;
	}
	public void setModifydate(String modifydate) {
		this.modifydate = modifydate;
	}
	public String getCreateuser() {
		return createuser;
	}
	public void setCreateuser(String createuser) {
		this.createuser = createuser;
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
	public String getSorted() {
		return sorted;
	}
	public void setSorted(String sorted) {
		this.sorted = sorted;
	}
	public String getPublishdate() {
		return publishdate;
	}
	public void setPublishdate(String publishdate) {
		this.publishdate = publishdate;
	}
	public String getTimelength() {
		return timelength;
	}
	public void setTimelength(String timelength) {
		this.timelength = timelength;
	}
	public String getWatchwatchnum() {
		return watchwatchnum;
	}
	public void setWatchwatchnum(String watchwatchnum) {
		this.watchwatchnum = watchwatchnum;
	}
	public String getObjectpos() {
		return objectpos;
	}
	public void setObjectpos(String objectpos) {
		this.objectpos = objectpos;
	}
	public String getParentid() {
		return parentid;
	}
	public void setParentid(String parentid) {
		this.parentid = parentid;
	}
	public String getAttribute() {
		return attribute;
	}
	public void setAttribute(String attribute) {
		this.attribute = attribute;
	}
	public String getUploadstate() {
		return uploadstate;
	}
	public void setUploadstate(String uploadstate) {
		this.uploadstate = uploadstate;
	}
	public String getPublishstate() {
		return publishstate;
	}
	public void setPublishstate(String publishstate) {
		this.publishstate = publishstate;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getAreaname() {
		return areaname;
	}
	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}
	public String getDeptname() {
		return deptname;
	}
	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}
	
	public String getStartdate() {
		return startdate;
	}
	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}
	public String getEnddate() {
		return enddate;
	}
	public void setEnddate(String enddate) {
		this.enddate = enddate;
	}
	public String getUploadismanual() {
		return uploadismanual;
	}
	public void setUploadismanual(String uploadismanual) {
		this.uploadismanual = uploadismanual;
	}
	
	public String getUploaddeletestatus() {
		return uploaddeletestatus;
	}
	public void setUploaddeletestatus(String uploaddeletestatus) {
		this.uploaddeletestatus = uploaddeletestatus;
	}
	
	public String getUploadisdelete() {
		return uploadisdelete;
	}
	public void setUploadisdelete(String uploadisdelete) {
		this.uploadisdelete = uploadisdelete;
	}
	
	public String getResourcetype() {
		return resourcetype;
	}
	public void setResourcetype(String resourcetype) {
		this.resourcetype = resourcetype;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	
	public String getResourcename() {
		return resourcename;
	}
	public void setResourcename(String resourcename) {
		this.resourcename = resourcename;
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getSelfType1() {
		return selfType1;
	}
	public void setSelfType1(String selfType1) {
		this.selfType1 = selfType1;
	}
	public String getSelfType2() {
		return selfType2;
	}
	public void setSelfType2(String selfType2) {
		this.selfType2 = selfType2;
	}
	public String getSelfType3() {
		return selfType3;
	}
	public void setSelfType3(String selfType3) {
		this.selfType3 = selfType3;
	}
	@Override
	public String toString() {
		return "Resource [id=" + id + ", userid=" + userid + ", username="
				+ username + ", areaid=" + areaid + ", areaname=" + areaname
				+ ", curriculumid=" + curriculumid + ", deptid=" + deptid
				+ ", deptname=" + deptname + ", name=" + name + ", course="
				+ course + ", floder=" + floder + ", source=" + source
				+ ", description=" + description + ", type=" + type + ", size="
				+ size + ", createdate=" + createdate + ", modifydate="
				+ modifydate + ", createuser=" + createuser + ", modifyuser="
				+ modifyuser + ", deleteflag=" + deleteflag + ", sorted="
				+ sorted + ", publishdate=" + publishdate + ", timelength="
				+ timelength + ", watchwatchnum=" + watchwatchnum
				+ ", objectpos=" + objectpos + ", parentid=" + parentid
				+ ", attribute=" + attribute + ", uploadstate=" + uploadstate
				+ ", publishstate=" + publishstate + ", label=" + label
				+ ", startdate=" + startdate + ", enddate=" + enddate
				+ ", uploadismanual=" + uploadismanual
				+ ", uploaddeletestatus=" + uploaddeletestatus
				+ ", uploadisdelete=" + uploadisdelete + ", resourcetype="
				+ resourcetype + ", subject=" + subject + ", grade=" + grade
				+ ", resourcename=" + resourcename + ", status=" + status + "]";
	}
}