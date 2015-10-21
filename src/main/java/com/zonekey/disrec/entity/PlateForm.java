package com.zonekey.disrec.entity;

import java.io.Serializable;
/**
 * 
 * @author xufx 
 * @Date 2015.04.09
 *平台设置表
 */
public class PlateForm implements Serializable{

	/**
	 * 平台设置
	 */
	private static final long serialVersionUID = 1L;

	private String id;
	
	private String desktopName;//单位名称
	
	private String unitName;//平台名称
	
	private String desktopPictureurl;//单位logo
	
	private String uintPictureurl;//平台logo

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDesktopName() {
		return desktopName;
	}

	public void setDesktopName(String desktopName) {
		this.desktopName = desktopName;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getDesktopPictureurl() {
		return desktopPictureurl;
	}

	public void setDesktopPictureurl(String desktopPictureurl) {
		this.desktopPictureurl = desktopPictureurl;
	}

	public String getUintPictureurl() {
		return uintPictureurl;
	}

	public void setUintPictureurl(String uintPictureurl) {
		this.uintPictureurl = uintPictureurl;
	}
	
	
	
}
