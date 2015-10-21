package com.zonekey.disrec.web;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.entity.Port;
import com.zonekey.disrec.service.PortService;

@RestController
@RequestMapping(value="/port")
public class PortController {
     @Autowired
     private PortService portService;
     @Autowired
     private Validator validator;
     //添加端口号
     @RequestMapping(value="savePort", method = RequestMethod.POST, produces= MediaTypes.JSON_UTF_8 )
     public int createPort( HttpServletRequest req ){
    	 Port port = JsonUtil.jsonToObject(req, Port.class);
    	 return portService.savePort(port);
     }
     //修改端口
     @RequestMapping(value="updatePort", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
     public int updatePort(HttpServletRequest req){
    	 Port port = JsonUtil.jsonToObject(req, Port.class);
    	 return portService.updatePort(port);
     }
     //删除端口
     @RequestMapping(value="deletePort", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
     public int deletePort(HttpServletRequest req){
    	 Port port = JsonUtil.jsonToObject(req, Port.class);
    	 return portService.deletePort(port);
     }
}
