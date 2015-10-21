package com.zonekey.disrec.dao;

import java.util.List;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.AlarmLog;
import com.zonekey.disrec.vo.PageBean;

@MyBatisRepository
public interface AlarmLogMapper extends BaseMapper<AlarmLog, String>{

	public int saveAlarmLog(AlarmLog alarmLog);
	
	public int isAlarmExist(AlarmLog alarmLog);
	
	public int deleteAlarmExist(AlarmLog alarmLog);

	public int updateAlarmLog(AlarmLog alarmLog);
	
	public int updateAlarmExist(AlarmLog alarmLog);

	public long count(PageBean pageBean);

	public List<AlarmLog> findByPage(PageBean pageBean);


}
