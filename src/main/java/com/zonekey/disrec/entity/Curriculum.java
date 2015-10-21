package com.zonekey.disrec.entity;

import java.util.Date;

public class Curriculum {
	// 课表iD
	private String id;
	// 学期ID
	private String termid;
	// 节次ID
	private String classid;
	// 节次名字 ++
	private String classname;
	// 哪次课
	private String sameclass;
	// 教室id
	private String areaid;
	// 教室编号
	private String areano;
	// 教室name
	private String areaname;
	// 教师id
	private String userid;
	// 教师name
	private String username;
	// 教师工号
	private String userno;
	// 班级id
	private String deptid;
	// 班级编号
	private String deptno;
	// 班级名称
	private String deptname;
	// 上课时间
	private String date;
	private String startdate;
	private String enddate;
	// 上课开始时间 ++
	private String starttime;
	// 上课结束时间++
	private String endtime;
	// 同批次课最小时间
	private String cmin;
	// 同批次课最大时间
	private String cmax;
	// 第几周
	private String weeks;
	// 星期
	private String weekdate;
	// 第几周 转换前
	private String weeksbefore;
	// 第几周 转换
	private String weeksafter;
	// 是否录课 0表示不录课，1表示录课；
	private String record;
	// 是否直播 0表示不直播，1表示直播
	private String live;
	// 是否是资源
	private String isresource;

	// 是否课间录像
	private String classniddlerecord;
	// 课程主体
	private String subject;
	private String subjectattribute;
	// 描述
	private String coursedesc;
	// 录像模式
	private String video;
	// 直播模式
	private String livemodel;
	// 互动课程
	private String intercourse;
	// 录像上传
	// private String videoupload;
	// 课表状态 0表示离线，1表示在线
	private String state;
	private int statenum;
	// 教室状态 0表示离线，1表示在线
	private String areastate;
	// 节次
	private Integer classnum;
	// 节次转换前
	private String classnumbefore;
	// 节次转换（为临时表用）
	private String classnumafter;
	// 创建时间
	private Date createtime;
	//
	private Date modifydate;
	//
	private String createuser;
	//
	private String modifyuser;
	//
	private String deleteflag;
	// 导入课表的批次
	private String excelbatch;
	// 临时课表用的标识
	private String flag;
	// 临时课表用的错误描述
	private String errordescribe;

	private String classRelation;
	// '资源是否自动上传,0代表否，1代表是',
	private String isupload;
	// 上午最大节次
	private Integer smaxclass;
	// 全天最大节次
	private Integer maxclass;
	// 一次课的批次号（编辑课表用到）
	public String editclassbatch;
	// 直播课表图片存放地址
	public String imageurl;
	// public String serchclumn;
	// 编辑课表按时间排序的关键字
	public Integer sort;
	// 资源上传时间
	public String uploadtime;
	// 资源文件夹
	public String resourcefloder;
	// '0：未申请 1:申请手动下载2:正在下载 3：下载成功',
	public String uploadstatus;
	// Y:手动下载 N:未手动下载'
	public String uploadismanual;
	public String mac;
	// 教师
	private SysUser teacher;
	
	private String nowtime;
	
	
	
	
	

	public int getStatenum() {
		return statenum;
	}

	public void setStatenum(int statenum) {
		this.statenum = statenum;
	}

	public String getNowtime() {
		return nowtime;
	}

	public void setNowtime(String nowtime) {
		this.nowtime = nowtime;
	}

	public SysUser getTeacher() {
		return teacher;
	}

	public void setTeacher(SysUser teacher) {
		this.teacher = teacher;
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTermid() {
		return termid;
	}

	public void setTermid(String termid) {
		this.termid = termid;
	}

	public String getClassid() {
		return classid;
	}

	public void setClassid(String classid) {
		this.classid = classid;
	}

	public String getClassname() {
		return classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public String getSameclass() {
		return sameclass;
	}

	public void setSameclass(String sameclass) {
		this.sameclass = sameclass;
	}

	public String getAreaid() {
		return areaid;
	}

	public void setAreaid(String areaid) {
		this.areaid = areaid;
	}

	public String getAreano() {
		return areano;
	}

	public void setAreano(String areano) {
		this.areano = areano;
	}

	public String getAreaname() {
		return areaname;
	}

	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserno() {
		return userno;
	}

	public void setUserno(String userno) {
		this.userno = userno;
	}

	public String getDeptid() {
		return deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}

	public String getDeptno() {
		return deptno;
	}

	public void setDeptno(String deptno) {
		this.deptno = deptno;
	}

	public String getDeptname() {
		return deptname;
	}

	public void setDeptname(String deptname) {
		this.deptname = deptname;
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

	public String getWeeks() {
		return weeks;
	}

	public void setWeeks(String weeks) {
		this.weeks = weeks;
	}

	public String getWeekdate() {
		return weekdate;
	}

	public void setWeekdate(String weekdate) {
		this.weekdate = weekdate;
	}

	public String getWeeksbefore() {
		return weeksbefore;
	}

	public void setWeeksbefore(String weeksbefore) {
		this.weeksbefore = weeksbefore;
	}

	public String getRecord() {
		return record;
	}

	public void setRecord(String record) {
		this.record = record;
	}

	public String getLive() {
		return live;
	}

	public void setLive(String live) {
		this.live = live;
	}

	public String getIsresource() {
		return isresource;
	}

	public void setIsresource(String isresource) {
		this.isresource = isresource;
	}

	public String getClassniddlerecord() {
		return classniddlerecord;
	}

	public void setClassniddlerecord(String classniddlerecord) {
		this.classniddlerecord = classniddlerecord;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getCoursedesc() {
		return coursedesc;
	}

	public void setCoursedesc(String coursedesc) {
		this.coursedesc = coursedesc;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}

	public String getLivemodel() {
		return livemodel;
	}

	public void setLivemodel(String livemodel) {
		this.livemodel = livemodel;
	}

	public String getIntercourse() {
		return intercourse;
	}

	public void setIntercourse(String intercourse) {
		this.intercourse = intercourse;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getAreastate() {
		return areastate;
	}

	public void setAreastate(String areastate) {
		this.areastate = areastate;
	}

	public Integer getClassnum() {
		return classnum;
	}

	public void setClassnum(Integer classnum) {
		this.classnum = classnum;
	}

	public String getClassnumbefore() {
		return classnumbefore;
	}

	public void setClassnumbefore(String classnumbefore) {
		this.classnumbefore = classnumbefore;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public Date getModifydate() {
		return modifydate;
	}

	public void setModifydate(Date modifydate) {
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

	public String getErrordescribe() {
		return errordescribe;
	}

	public void setErrordescribe(String errordescribe) {
		this.errordescribe = errordescribe;
	}

	public String getClassRelation() {
		return classRelation;
	}

	public void setClassRelation(String classRelation) {
		this.classRelation = classRelation;
	}

	public String getIsupload() {
		return isupload;
	}

	public void setIsupload(String isupload) {
		this.isupload = isupload;
	}

	public String getCmin() {
		return cmin;
	}

	public void setCmin(String cmin) {
		this.cmin = cmin;
	}

	public String getCmax() {
		return cmax;
	}

	public void setCmax(String cmax) {
		this.cmax = cmax;
	}

	public String getWeeksafter() {
		return weeksafter;
	}

	public String getClassnumafter() {
		return classnumafter;
	}

	public void setClassnumafter(String classnumafter) {
		this.classnumafter = classnumafter;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
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

	public void setWeeksafter(String weeksafter) {
		this.weeksafter = weeksafter;
	}

	public Integer getSmaxclass() {
		return smaxclass;
	}

	public void setSmaxclass(Integer smaxclass) {
		this.smaxclass = smaxclass;
	}

	public Integer getMaxclass() {
		return maxclass;
	}

	public void setMaxclass(Integer maxclass) {
		this.maxclass = maxclass;
	}

	public String getEditclassbatch() {
		return editclassbatch;
	}

	public void setEditclassbatch(String editclassbatch) {
		this.editclassbatch = editclassbatch;
	}

	/*
	 * public String getVideoupload() { return videoupload; }
	 * 
	 * public void setVideoupload(String videoupload) { this.videoupload =
	 * videoupload; }
	 */

	public String getImageurl() {
		return imageurl;
	}

	public void setImageurl(String imageurl) {
		this.imageurl = imageurl;
	}

	// public String getSerchclumn() {
	// return serchclumn;
	// }
	//
	// public void setSerchclumn(String serchclumn) {
	// this.serchclumn = serchclumn;
	// }

	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public String getUploadtime() {
		return uploadtime;
	}

	public void setUploadtime(String uploadtime) {
		this.uploadtime = uploadtime;
	}

	public String getResourcefloder() {
		return resourcefloder;
	}

	public void setResourcefloder(String resourcefloder) {
		this.resourcefloder = resourcefloder;
	}

	public String getUploadstatus() {
		return uploadstatus;
	}

	public void setUploadstatus(String uploadstatus) {
		this.uploadstatus = uploadstatus;
	}

	public String getUploadismanual() {
		return uploadismanual;
	}

	public void setUploadismanual(String uploadismanual) {
		this.uploadismanual = uploadismanual;
	}

	public String getSubjectattribute() {
		return subjectattribute;
	}

	public void setSubjectattribute(String subjectattribute) {
		this.subjectattribute = subjectattribute;
	}

	@Override
	public String toString() {
		return "Curriculum [id=" + id + ", termid=" + termid + ", classid=" + classid + ", classname=" + classname + ", sameclass=" + sameclass + ", areaid=" + areaid + ", areano=" + areano
				+ ", areaname=" + areaname + ", userid=" + userid + ", username=" + username + ", userno=" + userno + ", deptid=" + deptid + ", deptno=" + deptno + ", deptname=" + deptname
				+ ", date=" + date + ", startdate=" + startdate + ", enddate=" + enddate + ", starttime=" + starttime + ", endtime=" + endtime + ", cmin=" + cmin + ", cmax=" + cmax + ", weeks="
				+ weeks + ", weekdate=" + weekdate + ", weeksbefore=" + weeksbefore + ", weeksafter=" + weeksafter + ", record=" + record + ", live=" + live + ", isresource=" + isresource
				+ ", classniddlerecord=" + classniddlerecord + ", subject=" + subject + ", coursedesc=" + coursedesc + ", video=" + video + ", livemodel=" + livemodel + ", intercourse=" + intercourse
				+ ", state=" + state + ", areastate=" + areastate + ", classnum=" + classnum + ", classnumbefore=" + classnumbefore + ", classnumafter=" + classnumafter + ", createtime=" + createtime
				+ ", modifydate=" + modifydate + ", createuser=" + createuser + ", modifyuser=" + modifyuser + ", deleteflag=" + deleteflag + ", excelbatch=" + excelbatch + ", flag=" + flag
				+ ", errordescribe=" + errordescribe + ", classRelation=" + classRelation + ", isupload=" + isupload + ", smaxclass=" + smaxclass + ", maxclass=" + maxclass + ", editclassbatch="
				+ editclassbatch + ", imageurl=" + imageurl + ", sort=" + sort + ", uploadtime=" + uploadtime + ", resourcefloder=" + resourcefloder + ", uploadstatus=" + uploadstatus
				+ ", uploadismanual=" + uploadismanual + "]";
	}

}