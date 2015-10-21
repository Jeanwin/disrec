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

import org.eclipse.jetty.util.log.Log;
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
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exception.RestException;
import com.zonekey.disrec.common.exportexcel.ExportAreaForExcel;
import com.zonekey.disrec.common.exportexcel.ExportSysuserForExcel;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.common.utils.MD5Utils;
import com.zonekey.disrec.common.utils.RegexUtils;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.service.SysUserService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.SysUserView;
import com.zonekey.disrec.vo.UserModPassView;

/**
 * @Title: @{#} SysUserRestController.java
 * @Description: <p>SysUser的Restful API的Controller.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@RestController
@RequestMapping(value = "/userView")
public class SysUserRestController {
	private static final Logger LOG = LoggerFactory.getLogger(SysUserRestController.class);
	
	@Autowired
	private SysUserService sysuserService;

	@Autowired
	private Validator validator;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public SysUser get(@PathVariable("id") String id) {
		SysUser sysuser = sysuserService.getSysUser(id);
		if (sysuser == null) {
			String message = "数据不存在(id:" + id + ")";
			LOG.warn(message);
			throw new RestException(HttpStatus.NOT_FOUND, message);
		}
		return sysuser;
	}
	
	@RequestMapping(value = "users", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Page<SysUserView> dataPage = sysuserService.findPageBy(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}

	@RequestMapping(value="save",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int create(MultipartHttpServletRequest req, SysUserView sysUserView) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
//		BeanValidators.validateWithException(validator, sysuser);
//		SysUserView sysUserView = JsonUtil.jsonToObject(req, SysUserView.class);
		String filePath = CommonUtil.upload(null, req,null);
		sysUserView.setPictureurl(filePath);
		// 保存新增
		return sysuserService.saveSysUser(sysUserView);
	}

	@RequestMapping(value = "update", method = RequestMethod.POST, produces = MediaTypes.JSON)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	//@ResponseStatus(HttpStatus.NO_CONTENT)
	public int update(SysUser sysUser,MultipartHttpServletRequest req) {
		String filePath = CommonUtil.upload(null, req,sysUser.getPictureurl());
		sysUser.setPictureurl(filePath);
		// 保存更新
		return sysuserService.updateSysUserMessage(sysUser);
	}
	//no upload
	@RequestMapping(value="create",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int save(HttpServletRequest req) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		//BeanValidators.validateWithException(validator, sysuser);
		SysUserView sysUserView = JsonUtil.jsonToObject(req, SysUserView.class);
		int flag = sysuserService.saveSysUser(sysUserView);
		return flag;
	}
	//no upload
	@RequestMapping(value = "modify", method = RequestMethod.POST, produces = MediaTypes.JSON)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	//@ResponseStatus(HttpStatus.NO_CONTENT)
	public int modify(HttpServletRequest req) {
		SysUserView sysUserView = JsonUtil.jsonToObject(req, SysUserView.class);
		return sysuserService.updateSysUserMessage(sysUserView);
	}
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	//@ResponseStatus(HttpStatus.NO_CONTENT)
	public int delete(HttpServletRequest req) {
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		return sysuserService.deleteSysUser(list);
	}
	//校验字段是否重复
	@RequestMapping(value = "check", method = RequestMethod.POST)
	//@ResponseStatus(HttpStatus.NO_CONTENT)
	public int check(HttpServletRequest req) {
		SysUser sysUser = JsonUtil.jsonToObject(req, SysUser.class);
		return sysuserService.check(sysUser);
	}
	/**
	 * 导入
	 * 
	 * @param person
	 * @return
	 */
	@RequestMapping(value = "/user/import", method = RequestMethod.POST)
	public @ResponseBody
	JsonMsg importcurriculum(@ModelAttribute("sysUserView " )SysUserView sysUserView , @RequestParam(value="file") MultipartFile file,HttpServletRequest request) throws IOException{
		JsonMsg msg = new JsonMsg();
		if (file.isEmpty()) {
		} else {
			// 得到文件名
			String filename = file.getOriginalFilename();
			try {
				msg = sysuserService.readExcel(sysUserView, file);
			} catch (Exception e) {
				// TODO Auto-generated catch block
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
	@RequestMapping(value = "/exportuser", method = RequestMethod.GET)
	public @ResponseBody void exportcurriculum(HttpServletRequest req,
			HttpServletResponse rep) {
		String excelbatch=req.getParameter("excelbatch");
		List<SysUserView> userList = sysuserService.findsysusermid(excelbatch, "1");
		ExportSysuserForExcel excelp = new ExportSysuserForExcel();
		excelp.exportExcelForPerson(req, rep, userList);
	}
	/*
	 * 修改用户密码
	 * url: /userView/modifyPassword
	 */
	@RequestMapping(value = "/modifyPassword", method = RequestMethod.POST)
	public @ResponseBody JsonMsg modifyPassword(HttpServletRequest req, HttpServletResponse res){
	    UserModPassView user = JsonUtil.jsonToObject(req, UserModPassView.class);
	    JsonMsg msg = new JsonMsg();
	    if(user.getId() == null || "".equals(user.getId()) 
		     ||user.getOldPassword() == null || "".equals(user.getOldPassword())
		     ||user.getNewPassword() == null || "".equals(user.getNewPassword())
		     ||user.getRepPassword() == null || "".equals(user.getRepPassword())){
		msg.setId("0");
		msg.setName("密码修改");
		msg.setOperation("请输入正确的密码");
		return msg;
	    }else if(sysuserService.getSysUser(user.getId()) !=null ){
		SysUser existUser = sysuserService.getSysUser(user.getId());
		msg.setId("1");
		msg.setName("密码修改");
		if(MD5Utils.md5(user.getOldPassword()).equals(existUser.getPassword())  && user.getNewPassword().equals(user.getRepPassword()) && RegexUtils.isPassword(user.getNewPassword())){
		    SysUser sysUser = new SysUser();
		    sysUser.setId(user.getId());
		    sysUser.setLoginname(existUser.getLoginname());
		    sysUser.setUsertype(existUser.getUsertype());
		    sysUser.setPassword(MD5Utils.md5(user.getNewPassword()));
		    int flag = sysuserService.updateSysUser(sysUser);
		    if(flag>0){
			msg.setOperation("密码修改成功");
		    }else{
			msg.setOperation("密码修改失败，请重试");
		    }
		}else if(!MD5Utils.md5(user.getOldPassword()).equals(existUser.getPassword())){
//		    System.out.println(MD5Utils.md5("123")+user.getOldPassword()+","+existUser.getPassword());
		    msg.setOperation("原密码输入错误");
		}else if(!user.getNewPassword().equals(user.getRepPassword())){
		    msg.setOperation("两次密码输入不一致");
		}else if(!RegexUtils.isPassword(user.getNewPassword())){
		    msg.setOperation("新密码格式为以字母开头，6~18位字母、数字、下划线");
		}else{
		    msg.setOperation("密码修改失败");
		}
		return msg;
	    }else{
		msg.setId("2");
		msg.setName("密码修改");
		msg.setOperation("密码修改失败");
		return msg;
	    }
	}    
}
