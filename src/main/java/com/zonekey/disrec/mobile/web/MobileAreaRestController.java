/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.mobile.web;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Validator;

import org.activiti.engine.impl.util.json.JSONArray;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.service.AreaService;
import com.zonekey.disrec.service.DeptService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.Tree;

/**
 * @version v 1.0
 */
@RestController
@RequestMapping(value = "/areaMobile")
public class MobileAreaRestController {
	private static final Logger LOG = LoggerFactory.getLogger(MobileAreaRestController.class);
	@Autowired
	private AreaService areaService;

	@Autowired
	private Validator validator;
	@Autowired
	private DeptService deptService;

	/**
	 * 树
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "areaTree")// ,method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8
	public void areaTree(HttpServletRequest req,HttpServletResponse resp) {
		LOG.info("========>>areaTree");
		Map<String, Object> mapData = new HashMap<String, Object>();
		List<Tree> areaTrees = areaService.getAreaTreeAndCount();
		JSONArray array = new JSONArray();
		mapData.put("content", areaTrees);
		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
		mapData.put("response_code_string", "获取区域树与区域内的教室数量");
		array.put(mapData);
		CommonUtil.println(array, resp);
		LOG.info("areaTree===>获取区域树与区域内的教室数量");
	}
	/**
	 * 教室日常
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "classRooms")//, method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8
	public Map<String, Object> classRooms(HttpServletRequest req,HttpServletResponse resp) {
		LOG.info("========>>classRooms");
		String treeid = req.getParameter("treeid");
		String limitstr = req.getParameter("limit");
		String offsetstr = req.getParameter("offset");
		PageBean pageBean = new PageBean();
		pageBean.setTreeid(treeid);
		 Map<String,Object> page = new HashMap<String, Object>();
		 int limit = Integer.parseInt(limitstr);//每页10个
		 int offset = (Integer.parseInt(offsetstr)-1)*limit;//offset 第二页
		 page.put("limit", limit);
		 page.put("offset", offset);
		 pageBean.setPage(page);
		
		JSONArray array = new JSONArray();
		Page<AreaView> dataPage = areaService.findClassRooms(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		 long total = dataPage.getTotalElements();
		long pageCount = 0;
		if(total%limit == 0){
			pageCount = total/limit;
		}else if(total%limit != 0){
			pageCount = total/limit + 1;
		}
		mapData.put("pageCount", pageCount);
		List<AreaView> list = dataPage.getContent();
		StringBuffer macs = new StringBuffer();
		for(AreaView area:list){
			macs.append(area.getMac()==null?"":area.getMac());
			macs.append(",");
		}
		if(macs.length() > 0){
			macs.delete(macs.length()-1, macs.length());
			String macs_ = macs.toString();
			String message = areaService.refresh(macs_);
			if(message != null){
				message = 	message.replace("{", "").replace("}", "");
				message = 	message.replace("]", "}").replace("[", "{");
			}
			Map<String,String> map = JsonUtil.jsonToObject(message, Map.class);
			for(AreaView area:list){
				if(map == null){
					area.setMacState("0");
					area.setDeviRemain(null);
				}else{
					if(StringUtils.isNotBlank(area.getMac())){
						String info = map.get(area.getMac());
						if(info == null){
							area.setMacState("0");
							area.setDeviRemain(null);
						}else{
							String[] infos = info.split(",,");
							String liveStatus = infos[0];//状态
							String macheFlag = infos[1];//中控录播标志
							String info2 = infos[2];//状态
							String deviRemain = infos[4];//剩余磁盘
							String macState = infos[5];//在线状态
							
							area.setMacState(macState);
							area.setDeviRemain(deviRemain);
						}
						
					}else{
						area.setMacState("0");
						area.setDeviRemain(null);
					}
				}
			}
			
		}
				
				
		if(StringUtils.isNotBlank(treeid)){
			AreaView views = areaService.getDetailById(treeid);
			mapData.put("areaname", views.getTitle());
		}else{
			mapData.put("areaname", "");
		}
		mapData.put("content", list);
		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
		mapData.put("response_code_string", "获取区域对应的教室信息");
		array.put(mapData);
		CommonUtil.println(array, resp);
		return null;
	}

	/**
	 * 根据name查询教室
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "areasByName")//, method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8
	public String areasByName(HttpServletRequest req,HttpServletResponse resp) {
		LOG.info("========>>areasByName");
		Map<String,Object> map = new HashMap<String, Object>();
		String name = req.getParameter("name");
		try {
			if(name != null){
				name = URLDecoder.decode(name,"UTF-8");
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		map.put("name", name);
		List<Map<String, Object>> data = areaService.findByName(map);
		JSONArray array = new JSONArray();
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("content", data);
		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
		mapData.put("response_code_string", "通过名称查询教室");
		array.put(mapData);
		CommonUtil.println(array, resp);
		return null;
	}
	
	@RequestMapping(value = "deptByName")//, method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8
	public List<Map<String, Object>> deptByName(HttpServletRequest req,HttpServletResponse resp) {
		LOG.info("========>>deptByName");
		Map<String,Object> map = new HashMap<String, Object>();
		String name = req.getParameter("name");
		try {
			if(name != null){
				name = URLDecoder.decode(name,"UTF-8");
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		map.put("name", name);
		List<Map<String, Object>> data = deptService.findByName(map);
		JSONArray array = new JSONArray();
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("content", data);
		mapData.put("response_code", AppConstants.MoblieConstants.RESPONSE_CODE_SUCCESS);
		mapData.put("response_code_string", "通过名称查询班级");
		array.put(mapData);
		CommonUtil.println(array, resp);
		return null;
	}
	// 版本列表
		@RequestMapping(value = "/list", method = RequestMethod.POST)
		public Map<String, Object> list(HttpServletRequest req) {
			PageBean pageBean = JsonUtil.jsonToPage(req);
			Page<Map<String, Object>> dataPage = areaService.findVersionPageBy(pageBean);
			Map<String, Object> mapData = new HashMap<String, Object>();
			mapData.put("total", dataPage.getTotalElements());
			mapData.put("data", dataPage.getContent());
			return mapData;
		}
	public static void main(String[] args) {
		String str ="[{\"00E04C73006D\":\"LivingStart,,0,,null,,133.13,,1\"},{\"00096F24A0ED\":\"LivingStart,,0.000000,,null,,734.632886,,1\"},{\"00096F24A0ED\":\"LivingStart,,0.000000,,null,,734.632886,,1\"}]";
		str = 	str.replace("{", "").replace("}", "");
		str = 	str.replace("]", "}").replace("[", "{");
		Map<String,String> map = JsonUtil.jsonToObject(str, Map.class);
		System.out.println(map);
	}

}