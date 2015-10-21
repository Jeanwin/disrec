package com.zonekey.disrec.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.ServerMapper;
import com.zonekey.disrec.entity.DeviceServer;
import com.zonekey.disrec.entity.Server;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.DeviceServerView;
import com.zonekey.disrec.vo.DeviceView;

@Service
@Transactional(readOnly = true)
public class ServerService extends BaseService {
	@Autowired
	ServerMapper serverMapper;

	// 查找所有服务器配置
	@Transactional(readOnly = false)
	public List<Server> findAll() {
		return serverMapper.findAll();
	}

	// 根据服务器类型查找服务器
	@Transactional(readOnly = false)
	public String getByType(String type) {
		return serverMapper.getServerByType(type);
	}

	// 修改某个服务器配置
	@Transactional(readOnly = false)
	public int updateServer(Server server) {
		if (server == null || server.getId() == null
				|| server.getName() == null || server.getType() == null
				|| server.getAddress() == null || "".equals(server.getName())
				|| "".equals(server.getType())
				|| "".equals(server.getAddress())
				|| !isIp(server.getAddress())
				) {
			//|| verifyAddress(server.getAddress(), server.getId()) == 0
			return 0;
		}
		int flag = serverMapper.update(server);
		return flag;
	}

	// 添加服务器配置
	@Transactional(readOnly = false)
	public int saveServer(Server server) {
		if (server == null || server.getName() == null
				|| server.getType() == null || server.getAddress() == null
				|| "".equals(server.getName()) || "".equals(server.getType())
				|| "".equals(server.getAddress())
				|| !isIp(server.getAddress())
				) {
			//|| validateAddress(server.getAddress()) == 0
			return 0;
		}
		server.setId(IdUtils.uuid2());
		server.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		int addFlag = serverMapper.insert(server);
		return addFlag;
	}

	// 删除某个服务器配置
	@Transactional(readOnly = false)
	public int deleteServer(Server server) {
		if (server == null || server.getId() == null) {
			return 0;
		}
		int delFlag = serverMapper.del(server);
		return delFlag;
	}

	// 添加时验证服务器ip地址格式及是否重复
	@Transactional(readOnly = false)
	public int validateAddress(String addr) {
		List<Server> servers = serverMapper.findAll();
		List<String> addresses = new ArrayList<String>();
		for (Server server : servers) {
			String address = server.getAddress();
			addresses.add(address);
		}
		if (addresses.contains(addr) || !isIp(addr)) {
			return 0;
		} else
			return 1;
	}

	// 修改时验证服务器ip地址格式及是否重复
	@Transactional(readOnly = false)
	public int verifyAddress(String addr, String modifyid) {
		List<Server> servers = serverMapper.findRest(modifyid);
		List<String> addresses = new ArrayList<String>();
		for (Server server : servers) {
			String address = server.getAddress();
			addresses.add(address);
		}
		if (addresses.contains(addr) || !isIp(addr)) {
			return 0;
		} else
			return 1;
	}

	// 验证ip地址格式
	public static boolean isIp(String ipAddress) {
		String ip = "(2[5][0-5]|2[0-4]\\d|1\\d{2}|\\d{1,2})\\.(25[0-5]|2[0-4]\\d|1\\d{2}|\\d{1,2})\\.(25[0-5]|2[0-4]\\d|1\\d{2}|\\d{1,2})\\.(25[0-5]|2[0-4]\\d|1\\d{2}|\\d{1,2})";
		Pattern pattern = Pattern.compile(ip);
		Matcher matcher = pattern.matcher(ipAddress);
		return matcher.matches();
	}

	// 查找网络服务器
	@Transactional(readOnly = false)
	public String getWebServer() {
		return serverMapper.getServerByType(AppConstants.TYPE_SERVER_WEB);
	}

	// 查找转码服务器
	@Transactional(readOnly = false)
	public String getCodeServer() {
		return serverMapper.getServerByType(AppConstants.TYPE_SERVER_CODE);
	}

	// 查找分发服务器
	@Transactional(readOnly = false)
	public String getSendServer() {
		return serverMapper.getServerByType(AppConstants.TYPE_SERVER_SEND);
	}

	// 查找中继服务器
	@Transactional(readOnly = false)
	public String getMiddleServer() {
		return serverMapper.getServerByType(AppConstants.TYPE_SERVER_MIDDLE);
	}

	// 查找存储服务器
	@Transactional(readOnly = false)
	public String getStoreServer() {
		return serverMapper.getServerByType(AppConstants.TYPE_SERVER_STORE);
	}
	
	// 查找FTP服务器
	@Transactional(readOnly = false)
	public String getFtpServer() {
		return serverMapper.getServerByType(AppConstants.TYPE_SERVER_FTP);
	}
	// 查找点播服务器
	@Transactional(readOnly = false)
	public String getDEMANDServer() {
		return serverMapper.getServerByType(AppConstants.TYPE_SERVER_DEMAND);
	}
	// 查找CMS服务器
	@Transactional(readOnly = false)
	public String getCMSServer() {
		return serverMapper.getServerByType(AppConstants.TYPE_SERVER_CMS);
	}
	// 查找语音服务器
	@Transactional(readOnly = false)
	public Server getVoiceServer() {
		return serverMapper.getServerMessageByType(AppConstants.TYPE_SERVER_VOICE);
	}
	/**
	 * 取出加入语音服务中的中控信息
	 * @param map
	 * @return
	 */
		public List<DeviceServerView> findDeviceServer(Map<String, Object> map) {
			return serverMapper.findDeviceServer(map);
		}
		/**
		 * 批量存储
		 */
	@Transactional(readOnly = false)
	public int addOrRemoveDeviceServer(DeviceServerView deviceServerView) {
		return serverMapper.addOrRemoveDeviceServer(deviceServerView);
	}
	/**
	 * 根据ＩＰ或者　ＭＡＣ　获取服务信息
	 * @param map
	 * @return
	 */
		public List<Server> findByMap(Map<String, Object> map) {
			return serverMapper.findByMap(map);
		}
		/**
		 * 根据服务id 获取设备信息
		 * @param map
		 * @return
		 */
			public List<DeviceView> findDeviceByServer(Map<String, Object> map) {
				return serverMapper.findDeviceByServer(map);
			}
		@Transactional(readOnly = false)
		public int removeDeviceServer() {
			return serverMapper.removeDeviceServer();
		}
	
}
