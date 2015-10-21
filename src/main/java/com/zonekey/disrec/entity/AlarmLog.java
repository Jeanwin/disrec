package com.zonekey.disrec.entity;


public class AlarmLog {
    private String id;

    private String time;

    private String source;//来源于哪个教室

    private String content;//报警内容

    private String dutyroom;//值班室

    private String state;//0:未处理   1:已处理

    private String createuser;

    private String modifyuser;
    
    private String _loginname;
    
    private String handelTime;

    private String mac;
    
    private String areaId;
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }


    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source == null ? null : source.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }


    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state == null ? null : state.trim();
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

	public String getDutyroom() {
		return dutyroom;
	}

	public void setDutyroom(String dutyroom) {
		this.dutyroom = dutyroom;
	}

	public String get_loginname() {
		return _loginname;
	}

	public void set_loginname(String _loginname) {
		this._loginname = _loginname;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	public String getHandelTime() {
		return handelTime;
	}

	public void setHandelTime(String handelTime) {
		this.handelTime = handelTime;
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
    
    
}