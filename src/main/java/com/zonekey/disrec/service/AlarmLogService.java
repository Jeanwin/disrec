package com.zonekey.disrec.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.AlarmLogMapper;
import com.zonekey.disrec.dao.AreaMapper;
import com.zonekey.disrec.dao.DeviceMapper;
import com.zonekey.disrec.dao.DutySetMapper;
import com.zonekey.disrec.entity.AlarmLog;
import com.zonekey.disrec.entity.DutySet;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeviceView;
import com.zonekey.disrec.vo.PageBean;

@Component
@Transactional(readOnly = true)
public class AlarmLogService extends BaseService{

	@Autowired
	private AlarmLogMapper alarmLogMapper;
	@Autowired
	private DeviceMapper deviceMapper;
	@Autowired
	private AreaMapper areaMapper;
	@Autowired
	private DutySetMapper dutySetMapper;
	
	@Transactional(readOnly = false)
	public int saveAlarmLog(AlarmLog alarmLog) {
		/*if(null==alarmLog){
			return 0;
		}*/
		//if (0<alarmLogMapper.isAlarmExist(alarmLog)) return 0;
		String areaId ="";
		alarmLog.setId(IdUtils.uuid2());
		alarmLog.setState("0");
		if (alarmLog.getMac()!=null&&alarmLog.getMac()!="") {
			DeviceView deviceView = deviceMapper.findDeviceByMac(alarmLog.getMac());
			if (null!=deviceView) {
				areaId = deviceView.getAreaid();
			}
		}else{
			areaId=alarmLog.getAreaId();
		}
		if (areaId!=null&&areaId!="") {
			AreaView areaView = areaMapper.findAreaByid(areaId);
			if (null!=areaView) {
				alarmLog.setSource(areaView.getName());
				//根据区域Id查看值班室
				DutySet dutySet = dutySetMapper.findDuty(areaId);
				if(null!=dutySet){
					alarmLog.setDutyroom(dutySet.getName());
				}
				return alarmLogMapper.saveAlarmLog(alarmLog);
			}
		}
		return 0;
	}
	
	@Transactional(readOnly = false)
	public int saveAlarmLog2(AlarmLog alarmLog) {
		return alarmLogMapper.saveAlarmLog(alarmLog);
	}

	public AlarmLog repairAlarmLog(AlarmLog alarmLog) {
		if(null==alarmLog){
			return null;
		}
		String areaId ="";
		alarmLog.setState("0");
		alarmLog.setId(IdUtils.uuid2());
		if (alarmLog.getMac()!=null&&alarmLog.getMac()!="") {
			DeviceView deviceView = deviceMapper.findDeviceByMac(alarmLog.getMac());
			if (null!=deviceView) {
				areaId = deviceView.getAreaid();
			}
		}else{
			areaId=alarmLog.getAreaId();
		}
		if (areaId!=null&&areaId!="") {
			AreaView areaView = areaMapper.findAreaByid(areaId);
			if (null!=areaView) {
				alarmLog.setSource(areaView.getName());
				//根据区域Id查看值班室
				DutySet dutySet = dutySetMapper.findDuty(areaId);
				if(null!=dutySet){
					alarmLog.setDutyroom(dutySet.getName());
				}
			}
		}
		return alarmLog;
	}
	
	@Transactional(readOnly = false)
	public int isAlarmExist(AlarmLog alarmLog) {
		if(null==alarmLog){
			return 0;
		}	
		return alarmLogMapper.isAlarmExist(alarmLog);
	}

	@Transactional(readOnly = false)
	public int deleteAlarmExist(AlarmLog alarmLog) {
		if(null==alarmLog){
			return 0;
		}	
		return alarmLogMapper.deleteAlarmExist(alarmLog);
	}

	
	@Transactional(readOnly = false)
	public int updateAlarmLog(AlarmLog alarmLog) {
		if(null==alarmLog){
			return 0;
		}
		return alarmLogMapper.updateAlarmLog(alarmLog);
	}
	
	@Transactional(readOnly = false)
	public int updateAlarmExist(AlarmLog alarmLog) {
		if(null==alarmLog){
			return 0;
		}
		return alarmLogMapper.updateAlarmExist(alarmLog);
	}
		
	
	public Page<AlarmLog> findPageBy(PageBean pageBean) {
		long total = alarmLogMapper.count(pageBean);
		List<AlarmLog> list = alarmLogMapper.findByPage(pageBean);
		Page<AlarmLog> page = new PageImpl<AlarmLog>(list,null,total);
		return page;
	}

}
