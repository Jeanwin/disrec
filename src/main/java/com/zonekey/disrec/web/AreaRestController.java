/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.web;

import java.io.IOException;
import java.net.NoRouteToHostException;
import java.net.SocketTimeoutException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Validator;

import org.apache.batik.gvt.text.ArabicTextHandler;
import org.jasig.cas.client.authentication.AttributePrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.beanvalidator.BeanValidators;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exportexcel.ExportAreaForExcel;
import com.zonekey.disrec.common.utils.ContinueFTP;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.service.AreaService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.Tree;

/**
 * @Title: @{#} AreaRestController.java
 * @Description: <p>
 *               Area的Restful API的Controller.
 *               </p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@RestController
@RequestMapping(value = "/areaView")
public class AreaRestController {
	private static final Logger LOG = LoggerFactory.getLogger(AreaRestController.class);
	@Autowired
	private AreaService areaService;

	@Autowired
	private Validator validator;

	/**
	 * 树
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "areaTree", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Tree> get(HttpServletRequest req) {
		return areaService.getAreaTree();
	}

	/**
	 * 树
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "areaTrees", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Tree> gets(HttpServletRequest req) {
		return areaService.getAreaTrees();
	}

	/**
	 * 分页查询教室
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "areas", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Page<AreaView> dataPage = areaService.findPageBy(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}

	/**
	 * 教室日常
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "classRooms", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> classRooms(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Page<AreaView> dataPage = areaService.findClassRooms(pageBean, req);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}

	/**
	 * 根据name查询教室
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "areasByName", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String, Object>> areasByName(HttpServletRequest req) {
		Map<String, Object> map = JsonUtil.jsonToObject(req, Map.class);
		List<Map<String, Object>> data = areaService.findByName(map);
		return data;
	}

	/**
	 * 验证innerid是否重复
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "inneridCount", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int inneridCount(HttpServletRequest req) {
		Map<String, Object> map = JsonUtil.jsonToObject(req, Map.class);
		return areaService.findByInnerid(map);
	}

	/**
	 * 根据name查询教室名称是否重复
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "areaName", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public int areaName(HttpServletRequest req) {
		Map<String, Object> map = JsonUtil.jsonToObject(req, Map.class);
		int count = areaService.findCountByName(map);
		return count;
	}

	@RequestMapping(value = "save", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int create(HttpServletRequest req, UriComponentsBuilder uriBuilder) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		AreaView areaView = JsonUtil.jsonToObject(req, AreaView.class);
		BeanValidators.validateWithException(validator, areaView);
		areaView.setId(IdUtils.uuid2());
		// 保存新增
		return areaService.saveArea(areaView);

	}

	@RequestMapping(value = "/update", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	public int update(HttpServletRequest req) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		// BeanValidators.validateWithException(validator, AreaView);
		// 保存更新
		AreaView areaView = JsonUtil.jsonToObject(req, AreaView.class);
		return areaService.updateArea(areaView);
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public int delete(HttpServletRequest req) {
		AreaView areaView = JsonUtil.jsonToObject(req, AreaView.class);
		return areaService.deleteArea(areaView);

	}

	/**
	 * 导入
	 */
	@RequestMapping(value = "/importarea", method = RequestMethod.GET)
	public String importarea() {
		return "importarea";
	}

	/**
	 * 导入
	 * 
	 * @param person
	 * @return
	 */
	@RequestMapping(value = "/area/import", method = RequestMethod.POST)
	public @ResponseBody
	JsonMsg importcurriculum(@ModelAttribute("areaView ") AreaView areaView, @RequestParam(value = "file") MultipartFile file, HttpServletRequest request) throws IOException {
		// 测试后注掉
		// AreaView areaViewerr=new AreaView();
		// areaView.setParentid("8723d0a8ea1947e88256fbd5917ebc79");
		JsonMsg msg = new JsonMsg();
		int flag = 0;
		if (file.isEmpty()) {
		} else {
			try {
				msg = areaService.readExcel(areaView, file);
			} catch (Exception e) {
				e.printStackTrace();
				msg.setId("0");
				msg.setName("导入");
				msg.setOperation("导入失败");
			}
		}
		return msg;
	}

	/**
	 * 导出
	 */
	@RequestMapping(value = "/exportarea", method = RequestMethod.GET)
	public @ResponseBody
	void exportcurriculum(HttpServletRequest req, HttpServletResponse rep) {
		String excelbatch = req.getParameter("excelbatch");
		List<AreaView> areaList = areaService.findareamid(excelbatch, "1");
		ExportAreaForExcel excelp = new ExportAreaForExcel();
		excelp.exportExcelForPerson(req, rep, areaList);
	}

	// 版本上传
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public @ResponseBody
	boolean upload(@RequestParam(value = "file0") MultipartFile file, @RequestParam(value = "file1") MultipartFile file1, HttpServletRequest req) {
		ContinueFTP ftp = new ContinueFTP();
		MultipartFile[] files = new MultipartFile[2];
		files[0] = file;
		files[1] = file1;
		try {
			boolean flag = ftp.connect(req.getLocalAddr(), 21, "anonymous", "123456");
			if (flag) {
				flag = ftp.upload(files);
				if (flag) {
					areaService.insertVersion();
				}
				return flag;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				ftp.disconnect();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return false;
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

	/**
	 * 根据id查找教室详情
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/getDetailById", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	AreaView findDetailById(HttpServletRequest req) {
		AreaView areaView = JsonUtil.jsonToObject(req, AreaView.class);
		return areaService.getDetailById(areaView.getId());
	}
}