/*****************************
 * Copyright (c) 2012 by Artron Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;












import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.entity.PlateForm;
import com.zonekey.disrec.service.AreaService;
import com.zonekey.disrec.service.DeptService;
import com.zonekey.disrec.service.PlateFormService;

/**
 * PlateFormController负责平台设置页面，
 * @author <a href="">徐飞翔</a>
 * @version v 1.0
 */
@Controller
@RequestMapping(value = "/plateForm")
public class PlateFormController {   

    private static final Logger LOG = LoggerFactory.getLogger(PlateFormController.class);
    @Autowired
	private PlateFormService plateFormService;
    @Autowired
	private AreaService areaService; 
    @Autowired
   	private DeptService deptService;
    @RequestMapping(value = "list", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody List<PlateForm> list(HttpServletRequest req) {
    	PlateForm  plateForm = plateFormService.findOne();
//    	LOG.info("因为就是一条数据，每次取值就是一条");
    	List<PlateForm> plist = new ArrayList<PlateForm>();
    	plist.add(plateForm);
		return plist;
	}
    @RequestMapping(value="save",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody String save(MultipartHttpServletRequest req, PlateForm plateForm ) {
    	
    	if(plateForm != null && plateForm.getDesktopName() != null){
    		int flag = areaService.updateTreeBoot(plateForm.getUnitName());
    		if(flag == 1){
    			deptService.updateTreeBoot(plateForm.getUnitName());
    		}
    	}
    	
    	if(plateForm.getDesktopPictureurl().startsWith("data") && !plateForm.getUintPictureurl().startsWith("data")){
//    		String uintPictureurl = CommonUtil.uploadImage(null, req,"ptlogo.png","file1");
    		String uintPictureurl = CommonUtil.uploadImage(null, req,"ptlogo.png","file0");
    		LOG.info("上传一图"+uintPictureurl);
    		plateForm.setDesktopPictureurl(uintPictureurl);
    		
    	}else if(!plateForm.getDesktopPictureurl().startsWith("data") && plateForm.getUintPictureurl().startsWith("data")){
    		String desktopPictureurl = CommonUtil.uploadImage(null, req,"logo.png","file0");
    		LOG.info("上传二图"+desktopPictureurl);
    		plateForm.setUintPictureurl(desktopPictureurl);
    		
    	}else if(!plateForm.getDesktopPictureurl().startsWith("data") && !plateForm.getUintPictureurl().startsWith("data")){
    		
    	}else if(plateForm.getDesktopPictureurl().startsWith("data") && plateForm.getUintPictureurl().startsWith("data")){
    		String desktopPictureurl = CommonUtil.uploadImage(null, req,"logo.png","file0");
    		String uintPictureurl = CommonUtil.uploadImage(null, req,"ptlogo.png","file1");
    		
    		LOG.info("上传二图"+desktopPictureurl);
    		plateForm.setUintPictureurl(desktopPictureurl);
    		
    		LOG.info("上传一图"+uintPictureurl);
    		plateForm.setDesktopPictureurl(uintPictureurl);
    		
    	}
		// 保存新增
		plateFormService.savePlateForm(plateForm);
		
		return "1";
	}
    
    @RequestMapping(value="create",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public @ResponseBody String create(HttpServletRequest req ) {
    	
    	PlateForm plateForm = JsonUtil.jsonToObject(req, PlateForm.class);
    	
    	if(plateForm != null && plateForm.getDesktopName() != null){
    		int flag = areaService.updateTreeBoot(plateForm.getUnitName());
    		if(flag == 1){
    			deptService.updateTreeBoot(plateForm.getUnitName());
    		}
    	}
    	PlateForm plate = plateFormService.findOne();
    	plateForm.setDesktopPictureurl(plate.getDesktopPictureurl());
    	plateForm.setUintPictureurl(plate.getUintPictureurl());
		// 保存新增
		plateFormService.savePlateForm(plateForm);
		
		return "1";
	}
    
}
