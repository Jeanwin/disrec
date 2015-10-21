package com.zonekey.disrec.entity;

import java.io.Serializable;
import java.util.Date;

public class DeviceControl implements Serializable {
	private String id;
	private String areaid;
	private String serviceid;
	private String interfaceName;
	private String method;
	private String type;
	private String parameter;
	private String returncontent;
	private String state;
	private Date createdate;
	private Date modifydate;
	private String createuser;
	private String modifyuser;
	private String deleteflag;

	public DeviceControl(String id, String areaid, String serviceid,
			String interfaceName, String method, String type, String parameter,
			String returncontent, String state, Date createdate,
			Date modifydate, String createuser, String modifyuser,
			String deleteflag) {
		super();
		this.id = id;
		this.areaid = areaid;
		this.serviceid = serviceid;
		this.interfaceName = interfaceName;
		this.method = method;
		this.type = type;
		this.parameter = parameter;
		this.returncontent = returncontent;
		this.state = state;
		this.createdate = createdate;
		this.modifydate = modifydate;
		this.createuser = createuser;
		this.modifyuser = modifyuser;
		this.deleteflag = deleteflag;
	}

	public DeviceControl() {
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAreaid() {
		return areaid;
	}

	public void setAreaid(String areaid) {
		this.areaid = areaid;
	}

	public String getServiceid() {
		return serviceid;
	}

	public void setServiceid(String serviceid) {
		this.serviceid = serviceid;
	}

	public String getInterfaceName() {
		return interfaceName;
	}

	public void setInterfaceName(String interfaceName) {
		this.interfaceName = interfaceName;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

	public String getReturncontent() {
		return returncontent;
	}

	public void setReturncontent(String returncontent) {
		this.returncontent = returncontent;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Date getCreatedate() {
		return createdate;
	}

	public void setCreatedate(Date createdate) {
		this.createdate = createdate;
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

}