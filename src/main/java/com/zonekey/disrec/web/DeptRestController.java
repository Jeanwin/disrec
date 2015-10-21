/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Validator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exception.RestException;
import com.zonekey.disrec.common.exportexcel.ExportDeptForExcel;
import com.zonekey.disrec.common.exportexcel.ExportSysuserForExcel;
import com.zonekey.disrec.entity.Dept;
import com.zonekey.disrec.service.DeptService;
import com.zonekey.disrec.vo.DeptView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.SysUserView;
import com.zonekey.disrec.vo.Tree;

/**
 * @Title: @{#} DeptRestController.java
 * @Description: <p>Dept的Restful API的Controller.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@RestController
@RequestMapping(value = "/deptView")
public class DeptRestController {
	private static final Logger LOG = LoggerFactory.getLogger(DeptRestController.class);
	
	@Autowired
	private DeptService deptService;

	@Autowired
	private Validator validator;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public Dept get(@PathVariable("id") String id) {
		Dept dept = deptService.getDept(id);
		if (dept == null) {
			String message = "数据不存在(id:" + id + ")";
			LOG.warn(message);
			throw new RestException(HttpStatus.NOT_FOUND, message);
		}
		return dept;
	}
	/**
	 * 树
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "deptTrees", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Tree> getTrees(HttpServletRequest req) {
		return deptService.getDeptTrees();
	}
	
	/**
	 * 树
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "deptTree", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Tree> getTree(HttpServletRequest req) {
		return deptService.getDeptTree();
	}
	@RequestMapping(value = "depts", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Page<DeptView> dataPage = deptService.findPageBy(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}
	
	@RequestMapping(value = "deptByName", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<Map<String, Object>> deptByName(HttpServletRequest req) {
		Map<String,Object> map = JsonUtil.jsonToObject(req, Map.class);
		return deptService.findByName(map);
	}
	@RequestMapping(value="save",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int create(HttpServletRequest req, UriComponentsBuilder uriBuilder) {
		DeptView deptView = JsonUtil.jsonToObject(req, DeptView.class);
		// 保存新增
		return deptService.saveDept(deptView);
	}

	@RequestMapping(value = "update", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	//@ResponseStatus(HttpStatus.NO_CONTENT)
	public int update(HttpServletRequest req) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		//BeanValidators.validateWithException(validator, dept);
		DeptView deptView = JsonUtil.jsonToObject(req, DeptView.class);
		// 保存更新
		return deptService.updateDept(deptView);
	}

	@RequestMapping(value = "delete", method = RequestMethod.POST)
	//@ResponseStatus(HttpStatus.NO_CONTENT)
	public int delete(HttpServletRequest req) {
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		return deptService.deleteDept(list);
	}
	//校验组织机构是否重复
	@RequestMapping(value = "check", method = RequestMethod.POST)
	//@ResponseStatus(HttpStatus.NO_CONTENT)
	public int check(HttpServletRequest req) {
		Dept dept = JsonUtil.jsonToObject(req, Dept.class);
		return deptService.check(dept);
	}
	/**
	 * 导入
	 * 
	 * @param person
	 * @return
	 */
	@RequestMapping(value = "/dept/import", method = RequestMethod.POST)
	public @ResponseBody
	JsonMsg importcurriculum(@ModelAttribute("deptView " )DeptView deptView , @RequestParam(value="file") MultipartFile file,HttpServletRequest request) throws IOException{
		JsonMsg msg = new JsonMsg();
		int flag = 0;
		if (file.isEmpty()) {
		} else {
			// 得到文件名
			String filename = file.getOriginalFilename();
			LOG.debug("文件名：" + filename);
			try {
				msg = deptService.readExcel(deptView, file);
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
	@RequestMapping(value = "/exportdept", method = RequestMethod.GET)
	public @ResponseBody void exportcurriculum(HttpServletRequest req,
			HttpServletResponse rep) {
		String excelbatch=req.getParameter("excelbatch");
		List<DeptView> userList = deptService.finddeptmid(excelbatch, "1");
		ExportDeptForExcel excelp = new ExportDeptForExcel();
		excelp.exportExcelForPerson(req, rep, userList);
	}
	/**
	 * 获取属性 名称
	 */
	@RequestMapping(value = "/findDeptSomeMessage", method = RequestMethod.POST)
	public List<Map<String, Object>> findDeptSomeMessage(HttpServletRequest req,
			HttpServletResponse rep) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Map<String, Object> map = pageBean.getKeywords();
		Dept dept = new Dept();
		dept.setName((String)map.get("name"));
		return deptService.findDeptSomeMessage(dept);
	}
}
