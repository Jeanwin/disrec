package com.zonekey.disrec.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.PortMapper;
import com.zonekey.disrec.entity.Port;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;

@Service
@Transactional(readOnly = true)
public class PortService extends BaseService{
    @Autowired
    private PortMapper portMapper;
    //添加服务器端口
    @Transactional( readOnly = false )
    public int savePort(Port port){
    	if(port == null || port.getPort() == null || port.getName() == null || port.getServerid() == null 
    			|| "".equals(port.getName()) || "".equals(port.getPort()) || validatePort(port.getPort(), port.getServerid()) == 0){
    		return 0;
    	}
    	port.setId(IdUtils.uuid2());
    	//添加serverid
    	port.setCreateuser(ShiroDbRealm.getCurrentLoginName());
    	int flag = portMapper.insert(port);
    	return flag;
    }
    //修改服务器端口
    @Transactional( readOnly = false )
    public int updatePort( Port port ){
    	if( port == null || port.getPort() == null || port.getName() == null || port.getServerid() == null
    			|| "".equals(port.getName()) || "".equals(port.getPort()) || "".equals(port.getServerid()) || verifyPort(port) == 0){
    		return 0;
    	}
    	port.setModifyuser(ShiroDbRealm.getCurrentLoginName());
    	int flag = portMapper.update(port);
    	return flag;
    }
    //删除端口号
    @Transactional( readOnly = false )
    @SuppressWarnings("null")
	public int deletePort( Port port ){
    	if( port == null && port.getId() == null ){
    		return 0;
    	}
    	int flag = portMapper.del(port);
    	return flag;
    }
    //添加时验证端口号格式及是否重复
    @Transactional( readOnly = false )
    public int validatePort(String port,String serverId){
    	List<Port> ports = portMapper.getByServerId( serverId );
    	List<String> portList = new ArrayList<String>();
    	for (Port iport : ports) {
			portList.add(iport.getPort());
		}
    	if(portList.contains(port) || ! isPort(port)){
    		return 0;
    	}else{
    		return 1;
    	}
    }
  //修改时验证端口号格式及是否重复
    @Transactional( readOnly = false )
    public int verifyPort(Port port){
    	List<Port> ports = portMapper.getByServerIdRest( port );
    	List<String> portList = new ArrayList<String>();
    	for (Port iport : ports) {
			portList.add(iport.getPort());
		}
    	if(portList.contains(port.getPort()) || ! isPort(port.getPort())){
    		return 0;
    	}else{
    		return 1;
    	}
    }
    //验证端口号格式
    public boolean isPort(String port){
    	long longPort = Integer.parseInt(port);
    	if(longPort>=0 && longPort<=65535){
    		return true;
    	}else
    		return false;
    	//String portReg = "^[1-9]$|(^[1-9][0-9]$)|(^[1-9][0-9][0-9]$)|(^[1-9][0-9][0-9][0-9]$)|(^[1-6][0-5][0-5][0-3][0-5]$)";
    	//Pattern pattern = Pattern.compile(portReg);
    	//Matcher matcher = pattern.matcher(port);
    	//return matcher.matches();
    }
}
