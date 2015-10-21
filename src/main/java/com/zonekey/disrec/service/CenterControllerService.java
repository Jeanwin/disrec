package com.zonekey.disrec.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.dao.AreaMapper;
import com.zonekey.disrec.dao.DutySetMapper;
import com.zonekey.disrec.entity.AlarmLog;
import com.zonekey.disrec.entity.DeviceAlarm;
import com.zonekey.disrec.entity.DutySet;
import com.zonekey.disrec.entity.MessageList;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.service.mail.TemplateEmail;
import com.zonekey.disrec.vo.AreaView;

@Component
@Transactional(readOnly = true)
public class CenterControllerService extends BaseService {

	@Autowired
	private MessageListService messageListService;
	@Autowired
	private AlarmLogService alarmLogService;
	@Autowired
	private TemplateEmail templateEmail;
	@Autowired
	private DutySetMapper dutySetMapper;
	@Autowired
	private AreaMapper areaMapper;

	@Transactional(readOnly = false)
	public DeviceAlarm doMessageEmail(DeviceAlarm deviceAlarm) {
		int flag = 0;
		if (null != deviceAlarm) {
			String areaId = deviceAlarm.getAreaId();
			String messageAlarm = deviceAlarm.getMessageAlarm();
			String emailUse = deviceAlarm.getEmailUse();
			MessageList messageList = new MessageList();
			messageList.setSource("系统");
			messageList.setTitle(deviceAlarm.getClues());
			messageList.setAreaId(deviceAlarm.getAreaId());
			if (areaId != "") {
				// 只要满足条件 就报警 （向报警日志插入数据）
				AlarmLog alarmLog = new AlarmLog();
				alarmLog.setAreaId(areaId);
				alarmLog.setContent(deviceAlarm.getClues());
				alarmLogService.repairAlarmLog(alarmLog);
				flag=alarmLogService.isAlarmExist(alarmLog);
				if (0>=flag) 
				{
					alarmLogService.saveAlarmLog2(alarmLog);
					if (messageAlarm != "" && "1".equals(messageAlarm)) {
						flag = messageListService.saveMessageList(messageList);
						if (flag == 1) {
							deviceAlarm.setMessageId(messageList.getId());
						}
					}
					try {
						if (emailUse != "" && "1".equals(emailUse)) {
							DutySet dutySet = dutySetMapper.findDuty(areaId);
							AreaView areaView = areaMapper.findAreaByid(areaId);
							if ("1".equals(deviceAlarm.getEmailUse())&& null != dutySet && null != areaView) {
								templateEmail.sendMail(dutySet.getName(), "",
										dutySet.getWarmEmail(), "邮箱报警",
										"warmEmail.vm", deviceAlarm.getClues(),
										areaView.getName());
							}
						}
					} catch (Exception e) {
						// TODO: handle exception
					}
				}else {
					alarmLogService.updateAlarmExist(alarmLog);
					messageListService.upMessageExist(messageList);
				}
			}
			if (flag <= 1) {
				return deviceAlarm;
			} else {
				return null;
			}
		}
		return null;
	}

}
