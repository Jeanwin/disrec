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
import com.zonekey.disrec.entity.Active;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.entity.LectureChildren;
import com.zonekey.disrec.service.ActiveService;
import com.zonekey.disrec.service.AreaService;
import com.zonekey.disrec.service.LectureChildrenService;
import com.zonekey.disrec.service.LectureService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.LectureView;
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
@RequestMapping(value = "/rest/active")
public class ActiveController {
	private static final Logger LOG = LoggerFactory.getLogger(ActiveController.class);
	@Autowired
	private ActiveService activeService;
	
	/**
	 * 获取听课表模板
	 */
	@RequestMapping(value = "activeModal")
	public @ResponseBody
	Map<String,Object> activeModal(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		if(pageBean.getKeywords() !=null){
			if(pageBean.getKeywords().containsKey("status")){
				String status = (String) pageBean.getKeywords().get("status");
				if(status.equals("报名中")){
					pageBean.getKeywords().put("statusOne", "true");
				}else if(status.equals("评审中")){
					pageBean.getKeywords().put("statusTwo", "true");
				}else if(status.equals("已结束")){
					pageBean.getKeywords().put("statusThree", "true");
				}
			}
			
		}
		
		return activeService.findPageBy(pageBean);
	}
	/**
	 * 删除听课表模板
	 */
	@RequestMapping(value = "deleteActiveModal")
	public @ResponseBody
	int deleteActiveModal(HttpServletRequest req){
		//将json转化为对象
		Active active = JsonUtil.jsonToObject(req, Active.class);
		 return activeService.deleteActive(active.getId());
	}
	
}