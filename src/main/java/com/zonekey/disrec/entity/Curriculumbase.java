package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Curriculumbase implements Serializable {
	/**
	 * {@value}
	 */
	private static final long serialVersionUID = 800053449956341814L;
	// 节次ID
	private String id;
	// 批次ID
	private String classbatch;
	// 节次方案
	private String classtype;
//	private String oclasstype;
	// 节次数
	private String classsum;
	// 教室id
	private String areaid;
	// 教室name
	private String areaname;
	// 教室id
	private List<Area> areaList;
	// 适用教室数
	private String areasum;
	// 有效期开始时间
	private String datebegin;
//	private String odatebegin;
	// 有效期结束时间'
	private String dateend;
//	private String odateend;
	// 学期iD
	private String termid;
	// 节次名称
	private String name;
	// 课节对应的数字 i_class
	private Integer iclass;

	// 开始时间
	private String starttime;
	// 结束时间
	private String endtime;
	// 创建时间
	private Date createtime;
	//
	private String createuser;
	//
	private String modifyuser;
	//
	private Date modifydate;
	//
	private String deleteflag;
	//上午最大节次
		private Integer smaxclass;
		//全天最大节次
		private Integer maxclass;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getClasstype() {
		return classtype;
	}

	public void setClasstype(String classtype) {
		this.classtype = classtype;
	}

	public String getClasssum() {
		return classsum;
	}

	public void setClasssum(String classsum) {
		this.classsum = classsum;
	}

	public String getAreaid() {
		return areaid;
	}

	public void setAreaid(String areaid) {
		this.areaid = areaid;
	}

	public List<Area> getAreaList() {
		return areaList;
	}

	public void setAreaList(List<Area> areaList) {
		this.areaList = areaList;
	}

	public String getAreasum() {
		return areasum;
	}

	public void setAreasum(String areasum) {
		this.areasum = areasum;
	}

	public String getDatebegin() {
		return datebegin;
	}

	public void setDatebegin(String datebegin) {
		this.datebegin = datebegin;
	}

	public String getDateend() {
		return dateend;
	}

	public void setDateend(String dateend) {
		this.dateend = dateend;
	}

	public String getTermid() {
		return termid;
	}

	public void setTermid(String termid) {
		this.termid = termid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getIclass() {
		return iclass;
	}

	public void setIclass(Integer iclass) {
		this.iclass = iclass;
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

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
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

	public Date getModifydate() {
		return modifydate;
	}

	public void setModifydate(Date modifydate) {
		this.modifydate = modifydate;
	}

	public String getDeleteflag() {
		return deleteflag;
	}

	public void setDeleteflag(String deleteflag) {
		this.deleteflag = deleteflag;
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

	public String getClassbatch() {
		return classbatch;
	}

	public void setClassbatch(String classbatch) {
		this.classbatch = classbatch;
	}

	public String getAreaname() {
		return areaname;
	}

	public void setAreaname(String areaname) {
		this.areaname = areaname;
	}

	@Override
	public String toString() {
		return "Curriculumbase [id=" + id + ", classbatch=" + classbatch
				+ ", classtype=" + classtype + ", classsum=" + classsum
				+ ", areaid=" + areaid + ", areaname=" + areaname
				+ ", areaList=" + areaList + ", areasum=" + areasum
				+ ", datebegin=" + datebegin + ", dateend=" + dateend
				+ ", termid=" + termid + ", name=" + name + ", iclass="
				+ iclass + ", starttime=" + starttime + ", endtime=" + endtime
				+ ", createtime=" + createtime + ", createuser=" + createuser
				+ ", modifyuser=" + modifyuser + ", modifydate=" + modifydate
				+ ", deleteflag=" + deleteflag + ", smaxclass=" + smaxclass
				+ ", maxclass=" + maxclass + "]";
	}

	

}