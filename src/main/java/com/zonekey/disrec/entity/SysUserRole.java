/**
 * 
 */
package com.zonekey.disrec.entity;

import java.io.Serializable;

/**
 * @author Administrator
 *
 */
public class SysUserRole implements Serializable{
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String id;
    private String userid;
    private String roleid;
    private String createtime;
    private String createuser;
    private String modifydate;
    private String modifyuser;
    private String deleteflag;
    private String enable;
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
    public String getRoleid() {
        return roleid;
    }
    public void setRoleid(String roleid) {
        this.roleid = roleid;
    }
    public String getCreatetime() {
        return createtime;
    }
    public void setCreatetime(String createtime) {
        this.createtime = createtime;
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
    public String getEnable() {
        return enable;
    }
    public void setEnable(String enable) {
        this.enable = enable;
    }
    @Override
    public String toString() {
	return "SysUserRole [id=" + id + ", userid=" + userid + ", roleid=" + roleid + ", createtime=" + createtime + ", createuser=" + createuser + ", modifydate=" + modifydate + ", modifyuser="
		+ modifyuser + ", deleteflag=" + deleteflag + ", enable=" + enable + "]";
    }
    
}
