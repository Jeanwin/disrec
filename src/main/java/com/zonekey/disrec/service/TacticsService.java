package com.zonekey.disrec.service;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.TacticsMapper;
import com.zonekey.disrec.service.auth.ShiroDbRealm;

@Service
@Transactional(readOnly = true)
public class TacticsService {
	@Resource
	private TacticsMapper tacticsMapper;
	
	public List<Map<String,Object>> getTactic(){
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		list.add(tacticsMapper.getupload());
		list.add(tacticsMapper.getstrategy());
		list.add(tacticsMapper.getschedule());
		list.add(tacticsMapper.getwarm());
		return list;
	}
	@Transactional(readOnly=false)
	public int getUpdate(Map<String,Map<String,Object>> data){
		String user = ShiroDbRealm.getCurrentLoginName();
		if(data!=null&&data.get("upload")!=null&&data.get("strategy")!=null){
			int flag = 0;
			flag+=transfer(data.get("upload"),user,"Upload");//资源上传策略
			flag+=transfer(data.get("strategy"),user,"Strategy");//资源删除策略
			flag+=transfer(data.get("schedule"),user,"Schedule");//课表同步
			flag+=transfer(data.get("warm"),user,"Warm");//报警策略
			return flag;
		}
		return 0;
	}
	public List<Map<String,Object>> getVideoInfo(Map<String,Object> map){
		if(map != null && map.get("value") != null)
		return tacticsMapper.getVideoInfo(map);
		return null;
	}
	@Transactional(readOnly=false)
	public int updateVideo(Map<String,Object> data){
		List<Map<String,Object>> list = (List<Map<String, Object>>) data.get("videos");
		String classscheam = (String) data.get("scheam");//方案
		tacticsMapper.delByScheam(classscheam);//清空该方案下所有的视频源
		for (Map<String, Object> map : list) {
			map.put("id", IdUtils.uuid2());
			map.put("createuser", ShiroDbRealm.getCurrentLoginName());
			map.put("classscheam", classscheam);
		}
		return tacticsMapper.insertResoureScheam(list);
	}
	
	@Transactional(readOnly=false)
	public int updateVideoApply(Map<String,Object> data){
		List<Map<String,Object>> list = (List<Map<String, Object>>) data.get("areaids");
		String classscheam = (String) data.get("scheam");//方案
		tacticsMapper.delByScheamClass();//清空录播方案应用
		for (Map<String, Object> map : list) {
			map.put("mainid", IdUtils.uuid2());
			map.put("createuser", ShiroDbRealm.getCurrentLoginName());
			map.put("classscheam", classscheam);
		}
		return tacticsMapper.insertScheamClass(list);
	}
	@Transactional(readOnly=false)
	public List<Map<String,Object>> getAreaIds(Map<String,Object> map){
		if(map != null && map.get("value") != null)
			return tacticsMapper.getAreaIds(map);
			return null;
	}
	//------------------------------------录像start
	public List<Map<String,Object>> getVideoParams(Map<String,Object> map){
		if(map != null && map.get("value") != null)
		return tacticsMapper.getVideoParams(map);
		return null;
	}
	@Transactional(readOnly=false)
	public int updateVideoParams(Map<String,Object> data){
		List<Map<String,Object>> list = (List<Map<String, Object>>) data.get("videos");
		String videoscheam = (String) data.get("scheam");//方案
		tacticsMapper.delVideoScheam(videoscheam);//清空该方案下所有的视频源
		for (Map<String, Object> map : list) {
			map.put("id", IdUtils.uuid2());
			map.put("createuser", ShiroDbRealm.getCurrentLoginName());
			map.put("videoscheam", videoscheam);
		}
		return tacticsMapper.insertVideoScheam(list);
	}
	
	@Transactional(readOnly=false)
	public int applyVideoParams(Map<String,Object> data){
		List<Map<String,Object>> list = (List<Map<String, Object>>) data.get("areaids");
		String videoscheam = (String) data.get("scheam");//方案
		tacticsMapper.delApplyVideo();//清空录像方案应用
		for (Map<String, Object> map : list) {
			map.put("mainid", IdUtils.uuid2());
			map.put("createuser", ShiroDbRealm.getCurrentLoginName());
			map.put("videoscheam", videoscheam);
		}
		return tacticsMapper.insertApplyVideo(list);
	}
	@Transactional(readOnly=false)
	public List<String> getVideosAreaIds(Map<String,Object> map){
		if(map != null && map.get("value") != null)
			return tacticsMapper.getVideosAreaIds(map);
			return null;
	}
	//------------------------------------录像end
	
	//------------------------------------rtsp start
	public List<Map<String,Object>> getRtspParams(Map<String,Object> map){
		if(map != null && map.get("value") != null)
		return tacticsMapper.getRtspParams(map);
		return null;
	}
	@Transactional(readOnly=false)
	public int updateRtspParams(Map<String,Object> data){
		List<Map<String,Object>> list = (List<Map<String, Object>>) data.get("videos");
		String rtspscheam = (String) data.get("scheam");//方案
		tacticsMapper.delRtspScheam(rtspscheam);//清空该方案下所有的视频源
		for (Map<String, Object> map : list) {
			map.put("id", IdUtils.uuid2());
			map.put("createuser", ShiroDbRealm.getCurrentLoginName());
			map.put("rtspscheam", rtspscheam);
		}
		return tacticsMapper.insertRtspScheam(list);
	}
	
	@Transactional(readOnly=false)
	public int applyRtspParams(Map<String,Object> data){
		List<Map<String,Object>> list = (List<Map<String, Object>>) data.get("areaids");
		String rtspscheam = (String) data.get("scheam");//方案
		tacticsMapper.delApplyRtsp();//清空录像方案应用
		for (Map<String, Object> map : list) {
			map.put("id", IdUtils.uuid2());
			map.put("createuser", ShiroDbRealm.getCurrentLoginName());
			map.put("rtspscheam", rtspscheam);
		}
		return tacticsMapper.insertApplyRtsp(list);
	}
	@Transactional(readOnly=false)
	public List<String> getRtspAreaIds(Map<String,Object> map){
		if(map != null && map.get("value") != null)
			return tacticsMapper.getRtspAreaIds(map);
			return null;
	}
		//------------------------------------rtsp end

	//------------------------------------Rtmp start
	public Map<String,Object> getRtmpParams(Map<String,Object> map){
		if(map != null && map.get("value") != null)
		return tacticsMapper.getRtmpParams(map);
		return null;
	}
	@Transactional(readOnly=false)
	public int updateRtmpParams(Map<String,Object> map){
		tacticsMapper.delRtmpScheam((String)map.get("scheam"));//清空该方案下所有的视频源
		
		map.put("id", IdUtils.uuid2());
		map.put("createuser", ShiroDbRealm.getCurrentLoginName());
		return tacticsMapper.insertRtmpScheam(map);
	}
	
	@Transactional(readOnly=false)
	public int applyRtmpParams(Map<String,Object> data){
		List<Map<String,Object>> list = (List<Map<String, Object>>) data.get("areaids");
		String rtmpscheam = (String) data.get("scheam");//方案
		tacticsMapper.delApplyRtmp();//清空录像方案应用
		for (Map<String, Object> map : list) {
			map.put("id", IdUtils.uuid2());
			map.put("createuser", ShiroDbRealm.getCurrentLoginName());
			map.put("rtmpscheam", rtmpscheam);
		}
		return tacticsMapper.insertApplyRtmp(list);
	}
	@Transactional(readOnly=false)
	public List<String> getRtmpAreaIds(Map<String,Object> map){
		if(map != null && map.get("value") != null)
			return tacticsMapper.getRtmpAreaIds(map);
			return null;
	}
		//------------------------------------rtsp end
	
	public int transfer(Map<String,Object> map,String user,String method){
		if(map == null)
			return 0;
		if(map.get("id")==null){
			map.put("id", IdUtils.uuid2());
			map.put("createuser", user);
			return invoke("insert"+method, map);
		}else{
			map.put("modifyuser", user);
			return invoke("update"+method, map);
		}
	}
	
	public int invoke(String methodName,Map<String,Object> map){
		Class[] args = new Class[1];
		args[0]=Map.class;
		try {
			Method method = tacticsMapper.getClass().getMethod(methodName, args);
			return  Integer.parseInt(method.invoke(tacticsMapper, map)+"");
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return 0;
	}
	
	
}
