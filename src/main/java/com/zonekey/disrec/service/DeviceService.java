/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.HttpSend;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.DeviceMapper;
import com.zonekey.disrec.dao.DevicePolingMapper;
import com.zonekey.disrec.dao.SysCodeMapper;
import com.zonekey.disrec.entity.DevicePoling;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.DeviceView;
import com.zonekey.disrec.vo.PageBean;

/**
 * @Title: @{#} DeviceService.java
 * @Description: <p>
 *               Device实体业务类
 *               </p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Service
@Transactional(readOnly = true)
public class DeviceService extends BaseService {
	@Autowired
	private DevicePolingMapper devicePolingMapper;
	@Autowired
	private DeviceMapper deviceMapper;
	@Autowired
	private ServerService serverService;
	@Resource
	private SysCodeMapper syscodeMapper;
	public DeviceView getDevice(String id) {
		return deviceMapper.findOne(id);
	}
	/**
	 * 取出中控设备（不在zonekey_device_server中的中控设备）
	 * @param map
	 * @return
	 */
	public List<DeviceView> findDeviceControl(Map<String, Object> map) {
		return deviceMapper.findDeviceControl(map);
	}
	
	/**
	 * 通过areaid或innerid获取教室下录播机mac
	 * @return
	 */
	public String getMacById(Map<String,Object> map){
		//设置录播机
		//map.put("typeid", AppConstants.TYPE_DEVICETYPE_RECORD);
		return deviceMapper.getMacById(map);
	}
	public Page<DeviceView> findPageBy(PageBean pageBean,HttpServletRequest req) {
		long total = deviceMapper.count(pageBean);
		List<DeviceView> list = deviceMapper.findByPage(pageBean);
		Page<DeviceView> page = new PageImpl<DeviceView>(list, null, total);
		return page;
	}

	public List<Map<String, Object>> findByAreaId(Map<String, Object> map) {
		List<Map<String, Object>> list = deviceMapper.findByAreaId(map);
		return list;
	}

	/**
	 * 
	 * @param map
	 * @return
	 */
	public List<Map<String, Object>> findDevice(Map<String, Object> map) {
		List<Map<String, Object>> list = deviceMapper.findDevice(map);
		return list;
	}

	@Transactional(readOnly = false)
	public int saveDevice(DeviceView deviceView) {
		if(deviceView==null||deviceView.getAreaid()==null||deviceView.getName()==null||deviceView.getTypeid()==null||deviceView.getIp()==null){
			return 0;
		}
		String mac = deviceView.getMac();
		if(mac != null){
			mac = mac.toUpperCase();
			deviceView.setMac(mac);
		}
		deviceView.setId(IdUtils.uuid2());
		deviceView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		return deviceMapper.insert(deviceView);
	}

	@Transactional(readOnly = false)
	public int updateDevice(DeviceView deviceView) {
		if(deviceView==null||deviceView.getId()==null){
			return 0;
		}
		String mac = deviceView.getMac();
		if(mac != null){
			mac = mac.toUpperCase();
			deviceView.setMac(mac);
		}
		deviceView.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		return deviceMapper.update(deviceView);
	}
	
	public int checkMac(DeviceView deviceView) {
		return deviceMapper.checkMac(deviceView);
	}
	public int checkType(DeviceView deviceView) {
		deviceView.setTypeid("1");
		return deviceMapper.checkType(deviceView);
	}
	@Transactional(readOnly = false)
	public int deleteDevice(Map<String,Object> map) {
		if(map == null || map.get("id")==null){
			return 0;
		}
		map.put("modifyuser", ShiroDbRealm.getCurrentLoginName());
		return deviceMapper.delete(map);
	}
	/**
	 * @Description: 根据mac查教室id
	 * @author niuxl
	 * @date 2014年11月26日 下午3:11:49
	 * @param mac
	 */
	public DeviceView findDeviceByMac(String mac){
		return deviceMapper.findDeviceByMac(mac);
	}
	/**
	 * 返回轮询结果
	 * @param req
	 * @param page页面
	 * @return
	 */
	public String polling(HttpServletRequest req,int page){
		Map<String,Object> datas = new HashMap<String, Object>();
		//机位
		List<String> seats =  null;
		//教室编号
		List<String> innerids = null;
		//名字服务需要的数据
		Map<String,Object> data = new HashMap<String, Object>();
		String loginname = ShiroDbRealm.getCurrentLoginName();
		if(loginname==null){
			return "unauthc";
		}
		DevicePoling devicePoling = devicePolingMapper.findDevicePolingSetByAreaid(loginname);
		seats = Arrays.asList(devicePoling.getDeviceinfo().split(","));
		innerids = Arrays.asList(devicePoling.getAreainfo().split(","));
		List<Map<String,String>> macList = deviceMapper.getMacByInnerId(innerids,AppConstants.TYPE_DEVICETYPE_RECORD);
		data.put("seats", seats);  //car0,car1,car4
		//轮询方式
		String roundType = devicePoling.getRoundType();
		String ipPort = serverService.getWebServer();
		String url = "http://"+ipPort+"/deviceService/polling/"+roundType;
		//视频轮询
		List<List<Map<String,Object>>> pollingData = (List<List<Map<String, Object>>>) req.getSession().getAttribute(roundType);
		if(roundType.equals("flowType")){
			if(page==0&&(pollingData==null||pollingData.size()==0)){
			    pollingData = new ArrayList<List<Map<String,Object>>>();
			    req.getSession().setAttribute(roundType, pollingData);
				sendToDeviceService(devicePoling,url,pollingData,data,macList);
			}
			if(pollingData != null && pollingData.size()>page){
				datas.put("data", pollingData.get(page));
			}
		}else{
			data.put("macList",macList);
			String result = HttpSend.post(url, data);
			List<Map<String,Object>> files = cutPic(result,macList,seats);
			String path = "http://"+req.getLocalAddr()+"/images";
			datas.put("url", path);
			datas.put("data", files);
		}
		datas.put("polingtime", devicePoling.getPolingtime());
		datas.put("polingset", devicePoling.getPolingset());
		return JsonUtil.toJson(datas);
		
	}
	/**
	 * 第三方请求并处理返回轮询数据
	 * @param devicePoling 发送数据
	 * @param url
	 * @param pollingData 返回结果
	 */
	private void sendToDeviceService(DevicePoling devicePoling,String url,List<List<Map<String,Object>>> pollingData,Map<String,Object> data,List<Map<String,String>> macList){
		int set = Integer.parseInt(devicePoling.getPolingset());
		//机位字典
		List<Map<String,Object>> dics = syscodeMapper.getCode("RoundRobin");
		int i =0;
		for (Map<String, String> map : macList) {
			data.put("macInfo", map);
			String result = HttpSend.post(url, data);
			List<Map<String,Object>> resultList = JsonUtil.jsonToObject(result, List.class);
			if(resultList != null){
				String className = map.get("className");
				transforData(resultList,className,dics);
				handleData(resultList,set,pollingData);
				if(pollingData.size()>0&&pollingData.get(0).size()==set){
					i++;
					break;
				}
			}
			i++;
		}
		for (int j = 0; j <i; j++) {
			macList.remove(0);
		}
		if(macList.size()>0){
			new pollingThread(set, url, dics, data,pollingData, macList).start();
		}
	}
	/**
	 * 返回结果处理
	 * @param resultList第三方返回数据
	 * @param set分屏数
	 * @param pollingData
	 */
	private void handleData(List<Map<String,Object>> resultList,int set,List<List<Map<String,Object>>> pollingData){
		//上一页总数
		List<Map<String,Object>> lastList;
		if(pollingData.size()>0){
			lastList = pollingData.get(pollingData.size()-1);
		}else{
			lastList = new ArrayList<Map<String,Object>>();
			pollingData.add(lastList);
		}
		//当前页
		List<Map<String,Object>> currList = new ArrayList<Map<String,Object>>();
		for (Map<String, Object> map : resultList) {
			if(lastList.size()<set){
				lastList.add(map);
			}else{
				if(currList.size()<set){
					currList.add(map);
				}else if(currList.size()==set){
					pollingData.add(currList);
					currList = new ArrayList<Map<String,Object>>();
				}
			}
		}
		if(currList.size()>0){
			pollingData.add(currList);
		}
	}
	/**
	 * 转换返回结果集
	 * @param resultList结果集
	 * @param className教室名称
	 * @param dics机位字典
	 */
	private void transforData(List<Map<String,Object>> resultList,String className,List<Map<String,Object>> dics){
		for (Map<String, Object> map : resultList) {
			map.put("className", className);
			String seat = (String) map.get("seat");
			for (Map<String, Object> dic : dics) {
				if(seat.equals(dic.get("value"))){
					map.put("seatName", dic.get("name"));
					break;
				}
			}
			
		}
	}
	
	/**
	 * 轮询截图
	 * @param req
	 * @return true为截图成功 false执行截图失败
	 */
	private List<Map<String,Object>> cutPic(String result,List<Map<String,String>> macList,List<String> seats){
		Map<String,Object> resultMap = JsonUtil.jsonToObject(result, Map.class);
		try {
			//服务器开始执行截图
			//response_code 0 表示开始截图
			if( resultMap!=null&& "0".equals(resultMap.get("response_code")+"")){
				List<Map<String,Object>> pathList = new ArrayList<Map<String,Object>>();
				//机位字典
				List<Map<String,Object>> dics = syscodeMapper.getCode("RoundRobin");
				for (Map<String,String> map: macList) {
					Map<String,Object> p = new HashMap<String, Object>();
					String mac = map.get("mac");
					String className = map.get("className");
					List<Map<String,Object>> seatList = new ArrayList<Map<String,Object>>();
					for (String seat : seats) {
						String path = AppConstants.POLLING_IMAGE_PATH+File.separator+mac+File.separator+seat;
						long time = System.currentTimeMillis();
						File f = new File(path);
						Map<String,Object> seatMap = new HashMap<String, Object>();
						if(f.exists()){
							File[] fs = f.listFiles();
							for (File file : fs) {
								long seconds = Math.abs((file.lastModified()-time)/1000);
								if(seconds>=0&&seconds<3){
									for (Map<String, Object> dic : dics) {
										if(seat.equals(dic.get("value"))){
											seatMap.put("fileName",file.getName());
											seatMap.put("seat", seat);
											seatMap.put("seatName", dic.get("name"));
											seatList.add(seatMap);
											break;
										}
									}
									break;
								}
							}
						}
					}
					if(seatList.size()!=0){
						p.put("mac", mac);
						p.put("className", className);
						p.put("seats", seatList);
						pathList.add(p);
					}
				}
			return pathList;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	
		return null;
	}
	private class pollingThread extends Thread {
		private int set;
		private String url;
		List<Map<String,Object>> dics;
		List<List<Map<String,Object>>> pollingData;
		Map<String,Object> data;
		List<Map<String,String>> macList;
		public pollingThread(int set,String url,List<Map<String,Object>> dics,Map<String,Object> data,List<List<Map<String,Object>>> pollingData,List<Map<String,String>> macList){
			this.set = set;
			this.url = url;
			this.dics = dics;
			this.pollingData = pollingData;
			this.data = data;
			this.macList = macList;
		}
		@Override
		public void run() {
			long starttime = System.currentTimeMillis();
			for (Map<String, String> map : macList) {
				data.put("macInfo", map);
				String result = HttpSend.post(url, data);
				List<Map<String,Object>> resultList = JsonUtil.jsonToObject(result, List.class);
				if(resultList != null){
					String className = map.get("className");
					transforData(resultList,className,dics);
					handleData(resultList,set,pollingData);
				}
			}
		}
	}
}
