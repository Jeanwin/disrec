/**
 * 
 */
package com.zonekey.disrec.vo;

import com.zonekey.disrec.entity.SysUser;

/** 
 * @className:UserModPassView.java
 * @classDescription:
 * @author:JeanwinHuang@live.com
 * @createTime:2015年3月11日
 */
/**
 * @author Administrator
 * 
 */
public class UserModPassView extends SysUser {
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    // 原密码
    private String oldPassword;
    // 新密码
    private String newPassword;
    // 重复密码
    private String repPassword;

    public String getOldPassword() {
	return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
	this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
	return newPassword;
    }

    public void setNewPassword(String newPassword) {
	this.newPassword = newPassword;
    }

    public String getRepPassword() {
	return repPassword;
    }

    public void setRepPassword(String repPassword) {
	this.repPassword = repPassword;
    }

}
