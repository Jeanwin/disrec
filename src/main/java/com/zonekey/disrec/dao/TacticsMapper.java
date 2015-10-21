package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;

@MyBatisRepository
public interface TacticsMapper extends BaseMapper<Object, String>{
	public Map<String,Object> getupload(); 
	public Map<String,Object> getstrategy(); 
	public Map<String,Object> getschedule(); 
	public Map<String,Object> getwarm();
	public int updateUpload(Map<String,Object> map);
	public int updateStrategy(Map<String,Object> map);
	public int insertUpload(Map<String,Object> map);
	public int insertStrategy(Map<String,Object> map);
	public int updateSchedule(Map<String,Object> map);
	public int updateWarm(Map<String,Object> map);
	public int insertSchedule(Map<String,Object> map);
	public int insertWarm(Map<String,Object> map);
	public List<Map<String,Object>> getVideoInfo(Map<String,Object> map);
	public int delByScheam(String classscheam);
	public int delByScheamClass();
	public int insertResoureScheam(List<Map<String,Object>> list);
	public int insertScheamClass(List<Map<String,Object>> list);
	public List<Map<String,Object>> getAreaIds(Map<String,Object> map);
	
	//-----录像start
	public List<Map<String,Object>> getVideoParams(Map<String,Object> map);
	public int delVideoScheam(String videoscheam);
	public int delApplyVideo();
	public int insertVideoScheam(List<Map<String,Object>> list);
	public int insertApplyVideo(List<Map<String,Object>> list);
	public List<String> getVideosAreaIds(Map<String,Object> map);
	//-----录像end
	//-----rtsp start
	public List<Map<String,Object>> getRtspParams(Map<String,Object> map);
	public int delRtspScheam(String rtspscheam);
	public int delApplyRtsp();
	public int insertRtspScheam(List<Map<String,Object>> list);
	public int insertApplyRtsp(List<Map<String,Object>> list);
	public List<String> getRtspAreaIds(Map<String,Object> map);
	//-----rtsp end
	
	//-----rtmp start
	public Map<String,Object> getRtmpParams(Map<String,Object> map);
	public int delRtmpScheam(String rtmpscheam);
	public int delApplyRtmp();
	public int insertRtmpScheam(Map<String,Object> map);
	public int insertApplyRtmp(List<Map<String,Object>> list);
	public List<String> getRtmpAreaIds(Map<String,Object> map);
	//-----rtmp end
}
