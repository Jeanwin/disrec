package com.zonekey.disrec.web;

import java.util.ArrayList;
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
import com.zonekey.disrec.entity.MessageList;
import com.zonekey.disrec.service.MessageListService;
import com.zonekey.disrec.vo.PageBean;

@RestController
@RequestMapping(value = "/messageList")
public class MessageListController {

	@Autowired
	private MessageListService messageListService;
	

	@RequestMapping(value = "messageList", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> messageList(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
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
		Map<String,Object> map = JsonUtil.jsonToObject(req, Map.class);
		List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
		list.add(map);
		return messageListService.updateReadFlag(list);
	}
}
