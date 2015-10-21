package com.zonekey.disrec.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.AreaMapper;
import com.zonekey.disrec.dao.DeviceMapper;
import com.zonekey.disrec.dao.VoiceCallLogMapper;
import com.zonekey.disrec.entity.VoiceCallLog;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeviceView;
import com.zonekey.disrec.vo.PageBean;


@Component
@Transactional(readOnly = true)
public class VoiceCallLogService extends BaseService{

	@Autowired
	private VoiceCallLogMapper voiceCallLogMapper;
	@Autowired
	private DeviceMapper deviceMapper;
	@Autowired
	private AreaMapper areaMapper;
	
	@Transactional(readOnly = false)
	public VoiceCallLog saveVoiceCallLog(VoiceCallLog voiceCallLog) {
		String callerFlag = voiceCallLog.getCallerFlag();
		AreaView areaView = null;
		int flag = 0;
		DeviceView deviceView = deviceMapper.findDeviceByMac(voiceCallLog.getMac());
		if (null!=deviceView) {
			areaView = areaMapper.findAreaByid(deviceView.getAreaid());
			if (null!=areaView) {
				//中控呼叫平台
				if(callerFlag!=""&&"0".equals(callerFlag)){
					voiceCallLog.setCallerPerson(areaView.getName());
					voiceCallLog.setCalledPerson(ShiroDbRealm.getCurrentLoginName());
				}else if("1".equals(callerFlag)){
					voiceCallLog.setCalledPerson(areaView.getName());
					voiceCallLog.setCallerPerson(ShiroDbRealm.getCurrentLoginName());
				}
				voiceCallLog.setId(IdUtils.uuid2());
				flag = voiceCallLogMapper.saveVoiceCallLog(voiceCallLog);
				if (flag==1) {
					return voiceCallLog;
				}else {
					return null;
				}
			}
		}
		return null;
	}

	public Page<VoiceCallLog> findPageBy(PageBean pageBean) {
		String[] t = new String[3];
		String time = "";
		long total = voiceCallLogMapper.count(pageBean);
		List<VoiceCallLog> list = voiceCallLogMapper.findByPage(pageBean);
		for (VoiceCallLog voiceCallLog : list) {
			time = voiceCallLog.getTalkTime();
			if (null!=time&&time!="") {
				t = time.split("-");
				if("00".equals(t[0])&&"00".equals(t[1])){
					voiceCallLog.setTalkTime(t[2]+"秒");
				}else if("00".equals(t[0])){
					voiceCallLog.setTalkTime(t[1]+"分"+t[2]+"秒");
				}else{
					voiceCallLog.setTalkTime(t[0]+"时"+t[1]+"分"+t[2]+"秒");
				}
			}
		}
		Page<VoiceCallLog> page = new PageImpl<VoiceCallLog>(list,null,total);
		return page;
	}

	/**
	 * 根据状态来更新 state 0：接通 1：拒绝  2：无应答 3:挂断 更新通话结束时间
	 */
	@Transactional(readOnly = false)
	public int saveVoiceCallTime(String mac, String state) {
		if(state!=null&&state!=""){
			VoiceCallLog voiceCallLog = new VoiceCallLog();
			voiceCallLog.setState(state);
			voiceCallLog.setMac(mac);
			if(state!=""&&"3".equals(state)){
				String startTime = voiceCallLogMapper.findStartTime(mac);
				if ("0000-00-00 00:00:00".equals(startTime)||startTime==null||startTime=="") {
					voiceCallLog.setStartTalkTime(startTime);
				}
			}
			
			return voiceCallLogMapper.updateCallTime(voiceCallLog);
		}
		return 0;
	}
	
}
