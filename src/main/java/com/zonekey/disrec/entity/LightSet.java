package com.zonekey.disrec.entity;

import java.util.Date;

public class LightSet {
    private String id;

    private double usedlength;

    private double maxlength;

    private Date createdate;

    private Date modifydate;

    private String createuser;

    private String modifyuser;
    
    private String isUse; //是否报废 0：正常使用 1：报废
    
    private String _loginname;
    
    private String mac;
    
    private String areaId;
    
    private String name;//区域名字
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
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
        this.createuser = createuser == null ? null : createuser.trim();
    }

    public String getModifyuser() {
        return modifyuser;
    }

    public void setModifyuser(String modifyuser) {
        this.modifyuser = modifyuser == null ? null : modifyuser.trim();
    }


	public String getIsUse() {
		return isUse;
	}

	public void setIsUse(String isUse) {
		this.isUse = isUse;
	}

	public String get_loginname() {
		return _loginname;
	}

	public void set_loginname(String _loginname) {
		this._loginname = _loginname;
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "LightSet [id=" + id + ", usedlength=" + usedlength
				+ ", maxlength=" + maxlength + ", createdate=" + createdate
				+ ", modifydate=" + modifydate + ", createuser=" + createuser
				+ ", modifyuser=" + modifyuser + ", isUse=" + isUse
				+ ", _loginname=" + _loginname + ", mac=" + mac + ", areaId="
				+ areaId + ", name=" + name + "]";
	}

	public double getUsedlength() {
		return usedlength;
	}

	public void setUsedlength(double usedlength) {
		this.usedlength = usedlength;
	}

	public double getMaxlength() {
		return maxlength;
	}

	public void setMaxlength(double maxlength) {
		this.maxlength = maxlength;
	}
    
	
}