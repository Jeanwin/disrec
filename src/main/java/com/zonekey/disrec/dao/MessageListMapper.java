package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.MessageList;
import com.zonekey.disrec.vo.PageBean;

@MyBatisRepository
public interface MessageListMapper extends BaseMapper<MessageList, String>{

	public long count(PageBean pageBean);
	
    public long untreatedMessageCount();
    
	public List<MessageList> findByPage(PageBean pageBean);

	public int saveMessageList(MessageList messageList);
	
	public int upMessageExist(MessageList messageList);

	public int deleteMessageList(@Param("list")List<Map<String, Object>> list);

	public Map<String, String> findDirectorParam(String areaId);

	public int delMessage(String id);

	public int updateReadFlag(@Param("list")List<Map<String, Object>> list);

	public long findCount();
	
	public int isMessageExist(MessageList messageList);

}
