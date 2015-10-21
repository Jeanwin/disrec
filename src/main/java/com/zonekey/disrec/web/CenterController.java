
package com.zonekey.disrec.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.entity.AlarmLog;
import com.zonekey.disrec.entity.Card;
import com.zonekey.disrec.entity.DeviceAlarm;
import com.zonekey.disrec.entity.MessageList;
import com.zonekey.disrec.entity.VoiceCallLog;
import com.zonekey.disrec.service.AlarmLogService;
import com.zonekey.disrec.service.CardService;
import com.zonekey.disrec.service.CenterControllerService;
import com.zonekey.disrec.service.CurriculumService;
import com.zonekey.disrec.service.DeviceAlarmService;
import com.zonekey.disrec.service.DutySetService;
import com.zonekey.disrec.service.LightSetService;
import com.zonekey.disrec.service.ManualVideoService;
import com.zonekey.disrec.service.MessageListService;
import com.zonekey.disrec.service.ServerService;
import com.zonekey.disrec.service.VoiceCallLogService;
import com.zonekey.disrec.vo.PageBean;


@RestController
@RequestMapping(value = "/centerController")
public class CenterController {

	@Autowired
	private LightSetService lightSetService;
	@Autowired
	private AlarmLogService alarmLogService;
	@Autowired
	private VoiceCallLogService voiceCallLogService;
	@Autowired
	private MessageListService messageListService;
	@Autowired
	private DeviceAlarmService deviceAlarmService;
	@Autowired
	private DutySetService dutySetService;
	@Autowired
	private CenterControllerService centerControllerService;
	@Autowired
	private CardService cardService;
	@Autowired
	private CurriculumService curriculumService;
	@Autowired
	private ManualVideoService manualVideoService;
	
	
	/**
	 * 中控语音呼叫日志(教室呼叫人)
	 */
	@RequestMapping(value="voiceCallLogSave",method = RequestMethod.GET, produces = MediaTypes.JSON)
	public VoiceCallLog voiceCallLogSave(String mac,String callerFlag) {
		VoiceCallLog voiceCallLog = new VoiceCallLog();
		voiceCallLog.setMac(mac);
		voiceCallLog.setCallerFlag(callerFlag);
		return voiceCallLogService.saveVoiceCallLog(voiceCallLog);
	} 
	/**
	 * 
	 * 中控报警日志
	 */
	@RequestMapping(value="alarmLogSave",method = RequestMethod.GET, produces = MediaTypes.JSON)
	public int alarmLogSave(String mac,String content) {
		AlarmLog alarmLog = new AlarmLog();
		alarmLog.setMac(mac);
		alarmLog.setContent(content);
		
		int flag = alarmLogService.saveAlarmLog(alarmLog);
		return flag;
	}
	
	/**
	 * 中控更新灯泡的设置
	 */
	@RequestMapping(value = "/cenConLightSet", method = RequestMethod.GET)
	public int cenConUpdate(String mac,Double usedLength,Double maxLength){
		return lightSetService.creatOrUpdate(mac,usedLength,maxLength);
	}
	
	/**
	 * 获取教室对应的设备配置方案
	 */
	@RequestMapping(value = "getListByCenContr", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public List<DeviceAlarm> getListByCenContr(String mac){
		DeviceAlarm deviceAlarm = new DeviceAlarm();
		deviceAlarm.setMac(mac);
		return deviceAlarmService.getListByCenContr(deviceAlarm);
	}
	/**
	 * 根据mac查看对应值班室的值班员
	 */
	@RequestMapping(value = "getDutyPersonByMac", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public Map<String, String> getDutyPersonByMac(String mac){
		Map<String, String> map = new HashMap<String, String>();
		map.put("mac", mac);
		return dutySetService.getDutyPersonByMac(map);
	}
	/**
	 * 根据mac、中控输出值、 态查看设备配置，并做相应的操作
	 */
	@RequestMapping(value = "getDeviceAlarm", method = RequestMethod.GET)
	public DeviceAlarm getDeviceAlarm(String mac,String output,String state){
		Map<String, String> map = new HashMap<String, String>();
		map.put("mac", mac);
		map.put("output", output);
		map.put("state", state);
		DeviceAlarm deviceAlarm = deviceAlarmService.getDeviceAlarm(map);
		return centerControllerService.doMessageEmail(deviceAlarm);
	}                                                
	/**
	 * 根据mac、以及呼叫状态更新数据库
	 * state 0：接通 1 ：拒绝  2：无应答   3：结束
	 * 
	 */
	
	@RequestMapping(value = "voiceCallTime", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public int voiceCallTime(String mac,String state){
		return voiceCallLogService.saveVoiceCallTime(mac,state);
	}
	/**
	 * 获取所有的特殊卡
	 */
	@RequestMapping(value = "getAllSpecialCard", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public List<Map<String, String>> getAllSpecialCard(){
		return cardService.getgetAllSpecialCard();
	}
	
	
	/**
	 * 根据卡号获取名和类型
	 */
	@RequestMapping(value = "getCardInformation", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public Card getCardInformation(String cardNumber){
		return cardService.getCardInformation(cardNumber);
	}
	
	@RequestMapping(value = "/checkTeacherTime", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public String checkTeacherTime(String loginname,String mac) {
		return curriculumService.checkTeacherTime(loginname, mac)?"true":"false";
	}
	
	@RequestMapping(value = "/delMessageList", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public int delMessageList(String id) {
		return messageListService.delMessageList(id);
	}
	
	/**
	 * 手机端查看消息列表接口
	 */
	@RequestMapping(value = "messages", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage2(req);
		Page<MessageList> dataPage = messageListService.findPageBy(pageBean);
		long count = messageListService.findCount();
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		mapData.put("count",count);
		return mapData;
	}
	@RequestMapping(value="delete",method = RequestMethod.POST)
	public int delete(HttpServletRequest req){
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		return messageListService.delete(list);
	}
	
	@RequestMapping(value="update",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public Map<String,String> updateReadFlag(HttpServletRequest req){
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		return messageListService.updateReadFlag(list);
	}
	/**
	 * 
	 * 手动录像 修改录像的结束时间
	 */
	@RequestMapping(value = "/updateEndTime", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public int updateEndTime(String id) {
		return manualVideoService.updateEndTime(id);
	}
	/**
	 * 
	 * 手动录像 修改录像的下载状态
	 */
	@RequestMapping(value = "/updateVideoState", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public int updateVideoState(String id) {
		return manualVideoService.updateVideoState(id);
	}
	
}
