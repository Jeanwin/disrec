package com.zonekey.disrec.entity;


public class ManualVideo {
    private String id;

    private String startTime;//也是创建时间

    private String createuser;

    private String modifyuser;

    private String areaId;

    private String title;

    private String userId;

    private String endTime;
    
    private String _loginname;
    
    private String userName;
    
    private String areaName;
    
    private String ip;
    
    private String innerId;
    
    private String folderName;  //
    
    private String ftpPath;
    
    private String state;//0:下载 1：未下载
    
    private String uploadWay;//0：自动上传  1：手动上传
    
    private String modelValue;
    
    private String modelName;
    
    private String mac;
    
	// '0：未申请 1:申请手动下载2:正在下载 3：下载成功',
	public String uploadstatus;
	// Y:手动下载 N:未手动下载'
	public String uploadismanual;
	
	

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

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
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

    public String getAreaId() {
        return areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId == null ? null : areaId.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }


	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String get_loginname() {
		return _loginname;
	}

	public void set_loginname(String _loginname) {
		this._loginname = _loginname;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}


	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getInnerId() {
		return innerId;
	}

	public void setInnerId(String innerId) {
		this.innerId = innerId;
	}

	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public String getFtpPath() {
		return ftpPath;
	}

	public void setFtpPath(String ftpPath) {
		this.ftpPath = ftpPath;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getUploadWay() {
		return uploadWay;
	}

	public void setUploadWay(String uploadWay) {
		this.uploadWay = uploadWay;
	}

	public String getModelValue() {
		return modelValue;
	}

	public void setModelValue(String modelValue) {
		this.modelValue = modelValue;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	@Override
	public String toString() {
		return "ManualVideo [id=" + id + ", startTime=" + startTime
				+ ", createuser=" + createuser + ", modifyuser=" + modifyuser
				+ ", areaId=" + areaId + ", title=" + title + ", userId="
				+ userId + ", endTime=" + endTime + ", _loginname="
				+ _loginname + ", userName=" + userName + ", areaName="
				+ areaName + ", ip=" + ip + ", innerId=" + innerId
				+ ", folderName=" + folderName + ", ftpPath=" + ftpPath
				+ ", state=" + state + ", uploadWay=" + uploadWay
				+ ", modelValue=" + modelValue + ", modelName=" + modelName
				+ "]";
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	
}