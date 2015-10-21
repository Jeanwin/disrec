package com.zonekey.disrec.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.MessageListMapper;
import com.zonekey.disrec.entity.MessageList;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.PageBean;


@Component
@Transactional(readOnly = true)
public class MessageListService extends BaseService{

	@Autowired
	private MessageListMapper messageListMapper;
	
	@Transactional(readOnly = false)
	public int saveMessageList(MessageList messageList) {
		if(null==messageList){
			return 0;
		}
		messageList.setId(IdUtils.uuid2());
//		if (messageListMapper.IsAralmMessageExist(messageList)>0)
//			return 1;
		return messageListMapper.saveMessageList(messageList);
	}
	
	@Transactional(readOnly = false)
	public int IsAralmMessageExist(MessageList messageList) {
		if(null==messageList){
			return 0;
		}
		return messageListMapper.isMessageExist(messageList);
	}
		
	@Transactional(readOnly = false)
	public int upMessageExist(MessageList messageList) {
		if(null==messageList){
			return 0;
		}
		return messageListMapper.upMessageExist(messageList);
	}
		
	public Page<MessageList> findPageBy(PageBean pageBean) {
		//String areaId = "";
		long total = messageListMapper.count(pageBean);
		Map<String, String> map = new HashMap<String, String>();
		List<MessageList> list = messageListMapper.findByPage(pageBean);
		for (MessageList messageList : list) {
			Map<String, String> m = messageList.getMap();
			if (null==m) {
				map.put("areaid", "");
				map.put("editclassbatch", "");
				map.put("mac", "");
				map.put("ip", "");
				map.put("resourcefloder", "");
				
			}
			messageList.setMap(map);
		}
		Page<MessageList> page = new PageImpl<MessageList>(list,null,total);
		return page;
	}

	@Transactional(readOnly = false)
	public int delete(List<Map<String, Object>> list) {
		if(null==list && list.size()==0){
			return 0;
		}
		return messageListMapper.deleteMessageList(list);
	}
	@Transactional(readOnly = false)
	public int delMessageList(String id) {
		return messageListMapper.delMessage(id);
	}

	@Transactional(readOnly = false)
	public Map<String, String> updateReadFlag(List<Map<String, Object>> list) {
		Map<String, String> map = new HashMap<String, String>();
		if(null==list && list.size()==0){
			map.put("state", "0");
			return map;
		}
		int flag = messageListMapper.updateReadFlag(list);
		map.put("state", ""+flag);
		return map;
	}

	/**
	 * 查看未读消息的总数
	 */
	public long findCount() {
		return messageListMapper.findCount();
	}

}
