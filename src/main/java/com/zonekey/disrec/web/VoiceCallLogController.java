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
import com.zonekey.disrec.entity.VoiceCallLog;
import com.zonekey.disrec.service.VoiceCallLogService;
import com.zonekey.disrec.vo.PageBean;

@RestController
@RequestMapping(value = "/voiceCallLog")
public class VoiceCallLogController {

	@Autowired
	private VoiceCallLogService voiceCallLogService;
	
	@RequestMapping(value = "voiceCallLogs", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Page<VoiceCallLog> dataPage = voiceCallLogService.findPageBy(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}
}
