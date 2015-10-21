/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.web;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Comparator;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.zonekey.disrec.common.DirectorComparator;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.DateUtils;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.service.CurriculumService;
import com.zonekey.disrec.service.DeviceService;
import com.zonekey.disrec.vo.DirectorVo;
import com.zonekey.disrec.vo.PageBean;

/**
 * @Title: AreaFormController.java
 * @Description: <p>
 *               Area Form Controller
 *               </p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月21日 下午7:36:48
 * @version v 1.0
 */
@RestController
@RequestMapping
public class DirectorController {

	@SuppressWarnings("unused")
	private static final Logger log = LoggerFactory
			.getLogger(DirectorController.class);

	@Autowired
	private CurriculumService curriculumService;

	@Autowired
	private DeviceService deviceService;

	@RequestMapping(value = "director/list")
	public @ResponseBody
	Map<String, Object> findWeekCurriculum(HttpServletRequest req) {
		PageBean pagebean = JsonUtil.jsonToPage(req);
		return genSelectTreeList(pagebean.getTreeid(), pagebean);

	}

	// @RequestMapping(value = "director/list", method = RequestMethod.POST)
	// public String areaForm(Model model) {
	// List<DirectorVo> list=new ArrayList<DirectorVo>();
	// DirectorVo vo=new DirectorVo();
	// vo.setTime("14:00:00_15:00:00");
	// vo.setName("203");
	// vo.setStuts("高一1班_李梅_数学");
	// vo.setLive("否");
	// vo.setAutodirector("否");
	// vo.setRecord("否");
	// vo.setLivestuts("进行中");
	// vo.setRecordstuts("进行中");
	// vo.setDirectorstuts("自动");
	// list.add(vo);
	//
	// return "admin/areaForm";
	// }

	private Map<String, Object> genSelectTreeList(String treeid,
			PageBean pagebean) {
		int i = 0;
		Integer pageSize = Integer.parseInt(pagebean.getPage().get("pageSize")
				.toString());
        final String sort=(String) pagebean.getPage().get("sort");
		DirectorVo vo;
		Map<String, List<Curriculum>> weekmap;
		Map<String, Object> map;

		String[] ss = treeid.split("__");
		List<DirectorVo> listDirectorVo = new ArrayList<DirectorVo>();
		List<DirectorVo> NoTasklistDirectorVo = new ArrayList<DirectorVo>();
		Integer cameraNum = 0;
		for (i = ((Integer) pagebean.getPage().get("pageIndex") - 1) * 10; i < ss.length; i++) {
			if (i >= ((Integer) pagebean.getPage().get("pageIndex") - 1) * 10
					+ pageSize)
				break;

			vo = new DirectorVo();
			String[] classRoom = ss[i].split(",");
			vo.setId(classRoom[0]);
			vo.setName(classRoom[1]);

			pagebean.setTreeid(classRoom[0]);
			weekmap = curriculumService.findClassByTime(pagebean);
			map = new HashMap<String, Object>();
			if (weekmap != null && weekmap.get("data").size() > 0) {
				Curriculum curriculum = weekmap.get("data").get(0);
				map.put("id", curriculum.getAreaid());
				// map.put("mostly", "0");
				map.put("typeid", "1");
				String cmin = curriculum.getStarttime();
				String date_ = curriculum.getDate();
				String cmax = curriculum.getEndtime();
				vo.setLive(curriculum.getLive());
				vo.setCurriculumId(curriculum.getId());
				vo.setRecord(curriculum.getRecord());
				vo.setResourcefloder(curriculum.getResourcefloder());
				vo.setEditclassbatch(curriculum.getEditclassbatch());
				List<Map<String, Object>> l = deviceService.findDevice(map);
				for (Map<String, Object> map2 : l) {
					int num = 0;
					if (map2.get("camera") != null
							|| !"".equals(map2.get("camera"))) {
						num = (Integer) map2.get("camera");
						vo.setCameraNo(0);
					}
					vo.setCameraNo((Integer) map2.get("camera"));
					cameraNum += num;
				}
				if (l.size() > 0) {
					vo.setMac((String) l.get(0).get("MAC"));
				}
				try {
					vo.setTime(date_.toString() + " " + cmin.substring(0, 2)
							+ ":" + cmin.substring(2, 4) + "-"
							+ cmax.substring(0, 2) + ":" + cmax.substring(2, 4));
					vo.setStuts(curriculum.getUsername());
				} catch (Exception e) {
					e.printStackTrace();
				}
				listDirectorVo.add(vo);
			} else {
				map.put("id", classRoom[0]);
				map.put("typeid", "1");

				List<Map<String, Object>> l = deviceService.findDevice(map);
				System.out.println(l);
				for (Map<String, Object> map2 : l) {
					int num = 0;
					if (map2.get("camera") != null
							|| !"".equals(map2.get("camera"))) {
						num = (Integer) map2.get("camera");
						vo.setCameraNo(0);
					}
					vo.setCameraNo((Integer) map2.get("camera"));
					cameraNum += num;
				}
				if (l.size() > 0) {
					vo.setMac((String) l.get(0).get("MAC"));
				}   
				NoTasklistDirectorVo.add(vo);
			}
			Comparator<DirectorVo> ascDirectorComparator = new DirectorComparator();
			if("asc".equals(sort)){
			  Collections.sort(listDirectorVo, ascDirectorComparator);
			} else {
			Comparator<DirectorVo> descComparator = Collections.reverseOrder(ascDirectorComparator);
			Collections.sort(listDirectorVo, descComparator);
			}
		}
		listDirectorVo.addAll(NoTasklistDirectorVo);
		Map<String, Object> retmap = new HashMap<String, Object>();
		retmap.put("total", ss.length);
		retmap.put("cameraNum", Integer.valueOf(cameraNum));
		retmap.put("data", listDirectorVo);
		return retmap;
	}

	// 【获取当前导播员】 :申请者 1 存在使用者 :0 无使用者
	@RequestMapping(value = "director/getCurrent", method = RequestMethod.GET)
	public Map<String, Object> getCurrentDirector(String username) {
		Map<String, Object> map = new HashMap();
		map.put("result", "1");
		map.put("username", "admin");
		return map;
	}

	// 【获取当前导播员的反馈】:申请者
	@RequestMapping(value = "director/getPromise")
	public @ResponseBody
	Map<String, Object> getCurrentDirectorPromise() {
		Map<String, Object> map = new HashMap();
		map.put("result", "1");
		map.put("status", "1");
		return map;

	}

	// 【超时状态传给后台】:申请者
	@RequestMapping(value = "director/setTimeout", method = RequestMethod.GET)
	public Map<String, Object> setIsTimeout(String username) {
		Map<String, Object> map = new HashMap();
		map.put("result", "1");
		return map;

	}

	// 【当前导播员反馈结果传给后台】 当前导播者
	@RequestMapping(value = "director/setPromise", method = RequestMethod.GET)
	public Map<String, Object> setBackendPromise(String isPromise) {
		Map<String, Object> map = new HashMap();
		map.put("result", "1");
		return map;

	}

}
