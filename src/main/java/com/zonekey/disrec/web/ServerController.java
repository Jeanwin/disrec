package com.zonekey.disrec.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.beanvalidator.BeanValidators;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.DeviceMapper;
import com.zonekey.disrec.entity.Server;
import com.zonekey.disrec.service.DeviceService;
import com.zonekey.disrec.service.ServerService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeviceServerView;
import com.zonekey.disrec.vo.DeviceView;

@RestController
@RequestMapping(value = "/serverConfig")
public class ServerController {
	@Autowired
	private ServerService serverService;
	@Autowired
	private Validator validator;
	@Autowired
	private DeviceService deviceService;
	
	// 查询服务器
	@RequestMapping(value = "servers", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Server> page() {
		List<Server> servers = serverService.findAll();
		return servers;
	}
	
//	根据ＩＰ或者　ＭＡＣ　获取服务信息
	@RequestMapping(value = "findByMap", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Server> findByMap(HttpServletRequest req) {
		Map<String, Object> map = JsonUtil.jsonToObject(req, Map.class);
		List<Server> serverList = serverService.findByMap(map);
		return serverList;
	}
//	根据服务id 获取设备信息
	@RequestMapping(value = "findDeviceByServer", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<DeviceView> findDeviceByServer(HttpServletRequest req) {
		Map<String, Object> map = JsonUtil.jsonToObject(req, Map.class);
		List<DeviceView> deviceViewList = serverService.findDeviceByServer(map);
		return deviceViewList;
	}
	
	
//	展示 应用到中控 信息
	@RequestMapping(value = "showDeviceServerList", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> showDeviceServerList(HttpServletRequest req) {
		Map<String, Object> map = JsonUtil.jsonToObject(req, Map.class);
//		取出中控设备（不在zonekey_device_server中的中控设备）
		List<DeviceView>  deviceViewList = deviceService.findDeviceControl(map);
//		取出加入语音服务中的中控信息
		List<DeviceServerView> deviceServerViewList = serverService.findDeviceServer(map);
		Map<String, Object> data = new HashMap<String, Object>();
		for(DeviceView device : deviceViewList){
			DeviceServerView deviceServerView = new DeviceServerView();
			deviceServerView.setDeviceid(device.getId());
			deviceServerView.setServerid(null);
			deviceServerView.setName(device.getName());
			deviceServerView.setIp(device.getIp());
			deviceServerView.setFlag("0");
			deviceServerView.setAreaid(device.getAreaid());
			deviceServerViewList.add(deviceServerView);
		}
		data.put("data", deviceServerViewList);
		return data;
	}
//	增加或者移除语音服务中的中控设备
	@RequestMapping(value = "addOrRemoveDeviceServer", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int addOrRemoveDeviceServer(HttpServletRequest req) {
		List<Map> mapList = JsonUtil.jsonToObject(req, List.class);
		Server server = serverService.getVoiceServer();
		int flag = 0;
		if(server == null){
			return 2;
		}
		int deleflag = serverService.removeDeviceServer();
//		System.out.println(deleflag);
		
		if(mapList.size() == 0){
			return 1;
		}
		
		
		for(Map map : mapList){
			DeviceServerView deviceServerView = new DeviceServerView();
			deviceServerView.setId(IdUtils.uuid2());
			deviceServerView.setServerid(server.getId());
			deviceServerView.setDeviceid(map.get("deviceid").toString());
			deviceServerView.setDeleteflag("0");
			flag = serverService.addOrRemoveDeviceServer(deviceServerView);
			if(flag == 0){
				break;
			}
		}
		return flag;
	}

	// 根据服务器类型查询服务器
	@RequestMapping(value = "getServerByType", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public String serverByType(HttpServletRequest req) {
		String type = JsonUtil.jsonToObject(req, String.class);
		String serverIp = serverService.getByType(type);
		return serverIp;
	}

	// 修改服务器配置
	@RequestMapping(value = "modifyServer", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int modifyServer(HttpServletRequest req) {
		Server server = JsonUtil.jsonToObject(req, Server.class);
		return serverService.updateServer(server);
	}

	// 添加服务器配置
	@RequestMapping(value = "saveServer", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int createServer(HttpServletRequest req) {
		Server server = JsonUtil.jsonToObject(req, Server.class);
		// BeanValidators.validateWithException(validator, server);
		// 保存新增
		return serverService.saveServer(server);
	}

	// 删除服务器配置
	@RequestMapping(value = "deleteServer", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int deleteServer(HttpServletRequest req) {
		Server server = JsonUtil.jsonToObject(req, Server.class);
		return serverService.deleteServer(server);
	}

	// 查询web服务器ip
	@RequestMapping(value = "getWebServer", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public String getWebServer() {
		return serverService.getWebServer();
	}

	// 查询转码服务器ip
	@RequestMapping(value = "getCodeServer", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public String getCodeServer() {
		return serverService.getCodeServer();
	}

	// 查询分发服务器ip
	@RequestMapping(value = "getSendServer", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public String getSendServer() {
		return serverService.getSendServer();
	}

	// 查询中继服务器ip
	@RequestMapping(value = "getMiddleServer", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public String getMiddleServer() {
		return serverService.getMiddleServer();
	}

	// 查询存储服务器ip
	@RequestMapping(value = "getStoreServer", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public String getStoreServer() {
		return serverService.getStoreServer();
	}

	/**
	 * @author zfc
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "getServerUrl", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public String getServerUrl(HttpServletRequest request) {
		String type = request.getParameter("type");
		if (type == null || "".equals(type))
			return "";
		String ret = "http://";
		// switch (type) {
		// case "vds":
		// ret += serverService.getSendServer();
		// break;
		// case "code":
		// ret += serverService.getCodeServer();
		// break;
		// case "middle":
		// ret += serverService.getMiddleServer();
		// break;
		// case "store":
		// ret += serverService.getStoreServer();
		// break;
		// case "web":
		// ret += serverService.getWebServer();
		// break;
		// }
		if ("vds".equals(type)) {
			ret += serverService.getSendServer();
		} else if ("code".equals(type)) {
			ret += serverService.getCodeServer();
		} else if ("middle".equals(type)) {
			ret += serverService.getMiddleServer();
		} else if ("store".equals(type)) {
			ret += serverService.getStoreServer();
		} else if ("web".equals(type)) {
			ret += serverService.getWebServer();
		}else if ("ftp".equals(type)){
			ret += serverService.getFtpServer();
		}
		return ret;
	}
	public static void main(String[] args) {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("data", 1);
		data.put("data", 2);
		System.out.println(data);
	}
}
