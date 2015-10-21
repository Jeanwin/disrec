package com.zonekey.disrec.entity;

import java.util.List;

public class Server {
	private String id;
	private String name;//服务名称
	private String type;//服务类型
	private String address;//地址
	private List<Port> ports;
	private String createDate;
	private String createuser;
	private String modifyDate;
	private String modifyuser;
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
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	public List<Port> getPorts() {
		return ports;
	}
	public void setPorts(List<Port> ports) {
		this.ports = ports;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getCreateuser() {
		return createuser;
	}
	public void setCreateuser(String createuser) {
		this.createuser = createuser;
	}
	public String getModifyDate() {
		return modifyDate;
	}
	public void setModifyDate(String modifyDate) {
		this.modifyDate = modifyDate;
	}
	public String getModifyuser() {
		return modifyuser;
	}
	public void setModifyuser(String modifyuser) {
		this.modifyuser = modifyuser;
	}
	@Override
	public String toString() {
		return "Server [id=" + id + ", name=" + name + ", type=" + type
				+ ", address=" + address + ", createDate=" + createDate
				+ ", createuser=" + createuser + ", modifyDate=" + modifyDate
				+ ", modifyuser=" + modifyuser + "]";
	}
	
}
