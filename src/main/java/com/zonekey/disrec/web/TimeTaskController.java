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
import com.zonekey.disrec.entity.TimeTask;
import com.zonekey.disrec.service.TimeTaskService;
import com.zonekey.disrec.vo.PageBean;

@RestController
@RequestMapping(value = "/timeTask")
public class TimeTaskController {

	@Autowired
	private TimeTaskService timeTaskService;
	
	@RequestMapping(value="create",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int save(HttpServletRequest req) {
		TimeTask timeTask = JsonUtil.jsonToObject(req, TimeTask.class);
		int flag = timeTaskService.saveTimeTask(timeTask);
		return flag;
	}  
	
	@RequestMapping(value="update",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int update(HttpServletRequest req){
		TimeTask timeTask = JsonUtil.jsonToObject(req, TimeTask.class);
		return timeTaskService.updateTimeTask(timeTask);
	}
	

	@RequestMapping(value="delete",method = RequestMethod.POST)
	public int delete(HttpServletRequest req){
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		return timeTaskService.deleteTimeTask(list);
	}
	
	@RequestMapping(value = "timeTasks", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Page<TimeTask> dataPage = timeTaskService.findPageBy(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}
}
