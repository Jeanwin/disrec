package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.DeviceServer;
import com.zonekey.disrec.entity.Server;
import com.zonekey.disrec.vo.DeviceServerView;
import com.zonekey.disrec.vo.DeviceView;

@MyBatisRepository
public interface ServerMapper extends BaseMapper<Server, String> {
	 //查询所有服务器配置
     public List<Server> findAll(); 
     //根据类型查询服务器配置
     public String getServerByType(String type);
     /*
      * 修改服务ip时验证ip是否重复
      * 查询ip不为当前修改记录的所有数据
      */
     public List<Server> findRest(String id);
	public List<DeviceServerView> findDeviceServer(Map<String, Object> map);
	
	public int addOrRemoveDeviceServer(DeviceServerView deviceServerView);
	public Server getServerMessageByType(String type);
	
	public List<Server> findByMap(Map<String, Object> map);
	
	public List<DeviceView> findDeviceByServer(Map<String, Object> map);
	public int removeDeviceServer();
}
