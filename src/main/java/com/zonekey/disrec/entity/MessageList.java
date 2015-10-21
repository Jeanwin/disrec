package com.zonekey.disrec.entity;

import java.util.Date;
import java.util.Map;

public class MessageList {
    private String id;

    private String title;//标题

    private String time;//消息报警的时间

    private Date createdate;

    private String createuser;

    private String deleteflag;
    
    private String _loginname;
    
    private String source;//来源于系统还是登录人
    
    private String areaId;
    
    private String areaName;
    
    private String readFlag;//0:未读 1：已读
    
    private Map<String, String> map;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public String getCreateuser() {
        return createuser;
    }

    public void setCreateuser(String createuser) {
        this.createuser = createuser == null ? null : createuser.trim();
    }

    public String getDeleteflag() {
        return deleteflag;
    }

    public void setDeleteflag(String deleteflag) {
        this.deleteflag = deleteflag == null ? null : deleteflag.trim();
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

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}

	public Map<String, String> getMap() {
		return map;
	}

	public void setMap(Map<String, String> map) {
		this.map = map;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	public String getReadFlag() {
		return readFlag;
	}

	public void setReadFlag(String readFlag) {
		this.readFlag = readFlag;
	}

	@Override
	public String toString() {
		return "MessageList [id=" + id + ", title=" + title + ", time=" + time
				+ ", createdate=" + createdate + ", createuser=" + createuser
				+ ", deleteflag=" + deleteflag + ", _loginname=" + _loginname
				+ ", source=" + source + ", areaId=" + areaId + ", areaName="
				+ areaName + ", readFlag=" + readFlag + ", map=" + map + "]";
	}
 
	
}