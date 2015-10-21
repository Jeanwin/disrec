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
import com.zonekey.disrec.entity.DutySet;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.service.DutySetService;
import com.zonekey.disrec.vo.PageBean;

@RestController
@RequestMapping(value = "/dutySet")
public class DutySetController {

	@Autowired
	private DutySetService dutySetService;
	
	@RequestMapping(value="create",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int save(HttpServletRequest req) {
		DutySet dutySet = JsonUtil.jsonToObject(req, DutySet.class);
		int flag = dutySetService.saveDutySet(dutySet);
		return flag;
	}
	
	@RequestMapping(value="delete",method = RequestMethod.POST)
	public int delete(HttpServletRequest req){
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		return dutySetService.delete(list);
	}
	@RequestMapping(value="update",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int update(HttpServletRequest req){
		DutySet dutySet = JsonUtil.jsonToObject(req, DutySet.class);
		return dutySetService.update(dutySet);
	}
	@RequestMapping(value = "duties", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Page<DutySet> dataPage = dutySetService.findPageBy(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}
	
	//获取教室管理员列表
	@RequestMapping(value = "classAdminsList", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<SysUser> getClassAdminsList(){
		return dutySetService.getClassAdminsList();
	}
	/**
	 * 验证一个教室只归一个值班室管理
	 */
	@RequestMapping(value="checkClassroom",method = RequestMethod.POST)
	public List<Map<String, String>> checkClassroom(HttpServletRequest req){
		Map<String, Object> map = JsonUtil.jsonToObject(req, Map.class);
		return dutySetService.checkClassroom(map);
	}
}
