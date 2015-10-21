package com.zonekey.disrec.entity;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class TimeTask {
    private String id;

    private String taskType;//数据字典中的id

    private String execStart;

    private String execEnd;

    private String week;

    private String startTime;

    private Date createdate;

    private String createuser;

    private Date modifydate;

    private String modifyuser;

    private String deleteflag;
    
    private String _loginname;
    
    private List<Map<String, Object>> areas;
    
    private long total;
    
    private Map<String, Object> weekMap;
    
   // private SysCode sysCode;
    
    private String taskName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getTaskType() {
        return taskType;
    }

    public void setTaskType(String taskType) {
        this.taskType = taskType == null ? null : taskType.trim();
    }

    public String getExecStart() {
        return execStart;
    }

    public void setExecStart(String execStart) {
        this.execStart = execStart == null ? null : execStart.trim();
    }

    public String getExecEnd() {
        return execEnd;
    }

    public void setExecEnd(String execEnd) {
        this.execEnd = execEnd == null ? null : execEnd.trim();
    }

    public String getWeek() {
        return week;
    }

    public void setWeek(String week) {
        this.week = week == null ? null : week.trim();
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime == null ? null : startTime.trim();
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

    public Date getModifydate() {
        return modifydate;
    }

    public void setModifydate(Date modifydate) {
        this.modifydate = modifydate;
    }

    public String getModifyuser() {
        return modifyuser;
    }

    public void setModifyuser(String modifyuser) {
        this.modifyuser = modifyuser == null ? null : modifyuser.trim();
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

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public List<Map<String, Object>> getAreas() {
		return areas;
	}

	public void setAreas(List<Map<String, Object>> areas) {
		this.areas = areas;
	}


	public Map<String, Object> getWeekMap() {
		return weekMap;
	}

	public void setWeekMap(Map<String, Object> weekMap) {
		this.weekMap = weekMap;
	}

	/*public SysCode getSysCode() {
		return sysCode;
	}

	public void setSysCode(SysCode sysCode) {
		this.sysCode = sysCode;
	}
*/
	public String getTaskName() {
		return taskName;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	@Override
	public String toString() {
		return "TimeTask [id=" + id + ", taskType=" + taskType + ", execStart="
				+ execStart + ", execEnd=" + execEnd + ", week=" + week
				+ ", startTime=" + startTime + ", createdate=" + createdate
				+ ", createuser=" + createuser + ", modifydate=" + modifydate
				+ ", modifyuser=" + modifyuser + ", deleteflag=" + deleteflag
				+ ", _loginname=" + _loginname + ", areas=" + areas
				+ ", total=" + total + ", weekMap=" + weekMap + ", taskName="
				+ taskName + "]";
	}

	
}