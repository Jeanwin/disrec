package com.zonekey.disrec.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.service.TacticsService;

/**
 * 
 * @author gly
 *
 */
@RestController
@RequestMapping(value = "/tactics")
public class ClassRoomTactics {
	
	@Resource
	private TacticsService tacticsService;
	//日常策略查询
	@RequestMapping(value = "tactics", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String,Object>> tactis(){
		List<Map<String,Object>> data = tacticsService.getTactic();
		return data;
	}
	//日常策略更新
	@RequestMapping(value = "update", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int update(HttpServletRequest req){
		Map<String,Map<String,Object>> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.getUpdate(map);
	}
	//录播方案
	@RequestMapping(value = "videoInfo", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String,Object>> getVideoInfo(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.getVideoInfo(map);
	}
	//录播方案更新
	@RequestMapping(value = "updateVideo", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int updateVideo(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.updateVideo(map);
	}
	//应用到的教室
	@RequestMapping(value = "selectedAreaIds", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String,Object>> selectedAreaIds(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.getAreaIds(map);
	}
	//录播方案应用
	@RequestMapping(value = "videoApply", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int updateVideoApply(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.updateVideoApply(map);
	}
	//--------------------------------------录像start
	//录像方案
	@RequestMapping(value = "getVideoParams", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String,Object>> getVideoParams(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.getVideoParams(map);
	}
	//录像方案更新
	@RequestMapping(value = "updateVideoParams", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int updateVideoParams(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.updateVideoParams(map);
	}
	//应用到的教室
	@RequestMapping(value = "videosAreaIds", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<String> videosAreaIds(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.getVideosAreaIds(map);
	}
	//录像方案应用
	@RequestMapping(value = "applyVideoParams", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int applyVideoParams(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.applyVideoParams(map);
	}
	//--------------------------------------录像end
	
	//--------------------------------------rtsp start
	//rtsp方案
	@RequestMapping(value = "getRtspParams", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String,Object>> getRtspParams(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.getRtspParams(map);
	}
	//rtsp方案更新
	@RequestMapping(value = "updateRtspParams", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int updateRtspParams(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.updateRtspParams(map);
	}
	//应用到的教室
	@RequestMapping(value = "rtspAreaIds", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<String> rtspAreaIds(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.getRtspAreaIds(map);
	}
	//rtsp方案应用
	@RequestMapping(value = "applyRtspParams", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int applyRtspParams(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.applyRtspParams(map);
	}
	//--------------------------------------rtsp end
	
	//--------------------------------------rtmp start
	//rtmp方案
	@RequestMapping(value = "getRtmpParams", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String,Object> getRtmpParams(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.getRtmpParams(map);
	}
	//rtmp方案更新
	@RequestMapping(value = "updateRtmpParams", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int updateRtmpParams(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.updateRtmpParams(map);
	}
	//应用到的教室
	@RequestMapping(value = "rtmpAreaIds", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<String> RtmpAreaIds(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.getRtmpAreaIds(map);
	}
	//rtmp方案应用
	@RequestMapping(value = "applyRtmpParams", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int applyRtmpParams(HttpServletRequest req){
		Map<String,Object> map= JsonUtil.jsonToObject(req, Map.class);
		return tacticsService.applyRtmpParams(map);
	}
	//--------------------------------------rtmp end
}
