package com.zonekey.disrec.dao;

import java.util.List;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.VoiceCallLog;
import com.zonekey.disrec.vo.PageBean;

@MyBatisRepository
public interface VoiceCallLogMapper extends BaseMapper<VoiceCallLog, String>{

	public int saveVoiceCallLog(VoiceCallLog voiceCallLog);

	public long count(PageBean pageBean);

	public List<VoiceCallLog> findByPage(PageBean pageBean);

	public int updateCallTime(VoiceCallLog voiceCallLog);

	public String findStartTime(String mac);

}
