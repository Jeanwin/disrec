package com.zonekey.disrec.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exportexcel.ExportSysuserForExcel;
import com.zonekey.disrec.service.LightSetService;
import com.zonekey.disrec.vo.PageBean;

@RestController
@RequestMapping(value = "/lightSet")
public class LightSetController {

	@Autowired  
	private LightSetService lightSetService;
	
	@RequestMapping(value="update",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int update(HttpServletRequest req){
		List<Map<String, Object>> lightSets = JsonUtil.jsonToObject(req, List.class);
		return lightSetService.updateLightSet(lightSets);
	}
	
	@RequestMapping(value = "lights", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Page<Map<String, Object>> dataPage = lightSetService.findPageBy(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}
	
	/**
	 * 导出灯泡设置
	 */
	@RequestMapping(value = "/exportLights", method = RequestMethod.GET)
	public @ResponseBody void exportcurriculum(HttpServletRequest req,
			HttpServletResponse rep) {
		List<Map<String, Object>> lightList = lightSetService.findLightSet();
		ExportSysuserForExcel excelp = new ExportSysuserForExcel();
		excelp.exportExcelForLightSet(req, rep, lightList);
	}
}
