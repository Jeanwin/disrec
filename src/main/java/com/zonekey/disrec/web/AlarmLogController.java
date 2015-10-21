package com.zonekey.disrec.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.entity.AlarmLog;
import com.zonekey.disrec.service.AlarmLogService;
import com.zonekey.disrec.vo.PageBean;

@RestController
@RequestMapping(value = "/alarmLog")
public class AlarmLogController {

	@Autowired
	
	private AlarmLogService alarmLogService;
	
	@RequestMapping(value="update",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int update(HttpServletRequest req){
		AlarmLog alarmLog = JsonUtil.jsonToObject(req, AlarmLog.class);
		return alarmLogService.updateAlarmLog(alarmLog);
	}
	
	@RequestMapping(value = "alarmLogs", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Page<AlarmLog> dataPage = alarmLogService.findPageBy(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}
}
