package com.zonekey.disrec.entity;

import java.util.Date;

public class VoiceCallLog {
    private String id;

    private String time;

    private String callerPerson;//呼叫方

    private String calledPerson;//被叫方

    private String state;//0：接通 1：拒绝  2：无应答

    private String startTalkTime;//开始通话时间
    
    private String endTalkTime;//结束通话时间

    private Date createdate;

    private String createuser;

    private String _loginname;
    
    private String callerFlag;//0:教室呼叫  1:人呼叫
    
    private String calledFlag;//0:教室被叫 1：人被叫
    
    private String mac;
    
    private String talkTime;
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getCallerPerson() {
        return callerPerson;
    }

    public void setCallerPerson(String callerPerson) {
        this.callerPerson = callerPerson == null ? null : callerPerson.trim();
    }

    public String getCalledPerson() {
        return calledPerson;
    }

    public void setCalledPerson(String calledPerson) {
        this.calledPerson = calledPerson == null ? null : calledPerson.trim();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state == null ? null : state.trim();
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

	public String getCallerFlag() {
		return callerFlag;
	}

	public void setCallerFlag(String callerFlag) {
		this.callerFlag = callerFlag;
	}

	public String getCalledFlag() {
		return calledFlag;
	}

	public void setCalledFlag(String calledFlag) {
		this.calledFlag = calledFlag;
	}

	public String getMac() {
		return mac;
	}

	public void setMac(String mac) {
		this.mac = mac;
	}

	public String getStartTalkTime() {
		return startTalkTime;
	}

	public void setStartTalkTime(String startTalkTime) {
		this.startTalkTime = startTalkTime;
	}

	public String getEndTalkTime() {
		return endTalkTime;
	}

	public void setEndTalkTime(String endTalkTime) {
		this.endTalkTime = endTalkTime;
	}

	public String getTalkTime() {
		return talkTime;
	}

	public void setTalkTime(String talkTime) {
		this.talkTime = talkTime;
	}

	@Override
	public String toString() {
		return "VoiceCallLog [id=" + id + ", time=" + time + ", callerPerson="
				+ callerPerson + ", calledPerson=" + calledPerson + ", state="
				+ state + ", startTalkTime=" + startTalkTime + ", endTalkTime="
				+ endTalkTime + ", createdate=" + createdate + ", createuser="
				+ createuser + ", _loginname=" + _loginname + ", callerFlag="
				+ callerFlag + ", calledFlag=" + calledFlag + ", mac=" + mac
				+ ", talkTime=" + talkTime + "]";
	}
    
    
}