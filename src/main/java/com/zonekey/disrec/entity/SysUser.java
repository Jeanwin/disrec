package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class SysUser implements Serializable {

	private static final long serialVersionUID = -2764914038461340632L;
	
	private String id;
	private String name;
	private String value;
	private String loginname;
	private String password;
	private String salt;
	private String phone;
	private String status;
	private String deptid;
	private String remark;
	private String sex;
	private String email;
	private String pictureurl;
	private String schoolyear;
	private String createdate;
	private String createuser;
	private String modifydate;
	private String modifyuser;
	private String deleteflag;
	private String usertype;
	private String validateCode;
	private String outDate;
	private String enable;
	private String checked;
	private String logindate;	
	private String loginip;
	
	public SysUser(String id, String name, String loginname, String password,
			String salt, String phone, String status, String deptid,
			String remark, String sex, String email, String pictureurl,
			String schoolyear, String createdate, String createuser,
			String modifydate, String modifyuser, String deleteflag,
			String usertype, String validateCode, String outDate,
			String enable, String checked, String logindate, String loginip) {
		super();
		this.id = id;
		this.name = name;
		this.loginname = loginname;
		this.password = password;
		this.salt = salt;
		this.phone = phone;
		this.status = status;
		this.deptid = deptid;
		this.remark = remark;
		this.sex = sex;
		this.email = email;
		this.pictureurl = pictureurl;
		this.schoolyear = schoolyear;
		this.createdate = createdate;
		this.createuser = createuser;
		this.modifydate = modifydate;
		this.modifyuser = modifyuser;
		this.deleteflag = deleteflag;
		this.usertype = usertype;
		this.validateCode = validateCode;
		this.outDate = outDate;
		this.enable = enable;
		this.checked = checked;
		this.logindate = logindate;
		this.loginip = loginip;
	}

	public SysUser() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLoginname() {
		return loginname;
	}

	public void setLoginname(String loginname) {
		this.loginname = loginname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDeptid() {
		return deptid;
	}

	public void setDeptid(String deptid) {
		this.deptid = deptid;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPictureurl() {
		return pictureurl;
	}

	public void setPictureurl(String pictureurl) {
		this.pictureurl = pictureurl;
	}

	public String getSchoolyear() {
		return schoolyear;
	}

	public void setSchoolyear(String schoolyear) {
		this.schoolyear = schoolyear;
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

	public String getUsertype() {
		return usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}

	public String getValidateCode() {
		return validateCode;
	}

	public void setValidateCode(String validateCode) {
		this.validateCode = validateCode;
	}

	public String getOutDate() {
		return outDate;
	}

	public void setOutDate(String outDate) {
		this.outDate = outDate;
	}

	public String getEnable() {
		return enable;
	}

	public void setEnable(String enable) {
		this.enable = enable;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

	public String getLoginip() {
		return loginip;
	}

	public void setLoginip(String loginip) {
		this.loginip = loginip;
	}
	
	public String getLogindate() {
		return logindate;
	}

	public void setLogindate(String logindate) {
		this.logindate = logindate;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}