package com.zonekey.disrec.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.entity.ManualVideo;
import com.zonekey.disrec.service.ManualVideoService;
import com.zonekey.disrec.service.ServerService;
import com.zonekey.disrec.vo.PageBean;

@RestController
@RequestMapping(value = "/manualVideo")
public class ManualVideoController {

	@Autowired
	private ServerService serverService;
	@Autowired
	private ManualVideoService manualVideoService;
	
	@RequestMapping(value="create",method = RequestMethod.POST)
	public Map<String, Object> save(HttpServletRequest req) {
		ManualVideo manualVideo = JsonUtil.jsonToObject(req, ManualVideo.class);
		String mac=manualVideo.getMac();
		Map<String, Object> map=null;
		map=manualVideoService.saveManualVideo(manualVideo);
		//如果保存成功，开始录播
		if ("1".equals(map.get("state").toString())){
			String urlString="http://"+serverService.getWebServer()+"/deviceService/sendCmdToDevice";
			String result = CommonUtil.sendGet(urlString, "cmd=RecordCmd=StartRecord&mac="+mac);
			Map m = JsonUtil.jsonToObject(result, Map.class);
			if (null!=m&&null!=m.get("result")&&"ok".equals(m.get("result").toString())) {
				map.put("recordState", "ok");
				//启动失败，删除手动录像的记录
			}else {
				ManualVideo man = (ManualVideo) map.get("manualVideo");
				int flag = manualVideoService.delManualVideoById(man.getId());
				if (flag==1) {
					map.put("recordState", "no");
				}else {
					map.put("recordState", "manualDelete");
				}
				
			}
		}
		return  map;
	}  
	
	@RequestMapping(value = "manualVideos", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Page<ManualVideo> dataPage = manualVideoService.findPageBy(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}
	@RequestMapping(value = "/updateEndTime", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public Map<String, String> updateEndTime(String id,String mac) {
		Map<String, String> map= new HashMap<String, String>();
		int flag = manualVideoService.updateEndTime(id);
		if (flag>0) {
			map.put("state", "1");
			String urlString="http://"+serverService.getWebServer()+"/deviceService/sendCmdToDevice";
			String result = CommonUtil.sendGet(urlString, "cmd=RecordCmd=StopRecord&mac="+mac);
			Map m = JsonUtil.jsonToObject(result, Map.class);
			//当设备停止成功
			if (null!=m&&null!=m.get("result")&&"ok".equals(m.get("result").toString())) {
				map.put("recordState", "ok");
			}else {
				map.put("recordState", "no");
			}
		}else {
			map.put("state", "0"); 
		}	
		return map;		
	}
	@RequestMapping(value="delete",method = RequestMethod.POST)
	public int delete(HttpServletRequest req){
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		return manualVideoService.delete(list);
	}
	
}
