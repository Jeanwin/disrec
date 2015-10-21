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
import com.zonekey.disrec.entity.Email;
import com.zonekey.disrec.service.EmailService;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.SysUserView;

@RestController
@RequestMapping(value = "/email")
public class EmailController {

	@Autowired
	private EmailService emailService;
	@RequestMapping(value="create",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int save(HttpServletRequest req) {
		
		List<Email> emails = JsonUtil.jsonToObject(req, List.class);
		int flag = emailService.saveEmail(emails);
		return flag;
	}
	
	@RequestMapping(value = "modify", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int modify(HttpServletRequest req) {
		Email email = JsonUtil.jsonToObject(req, Email.class);
		return emailService.updateEmail(email);
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	public int delete(HttpServletRequest req) {
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		return emailService.deleteEmail(list);
	}
	
	@RequestMapping(value = "emails", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		List<Email> list = emailService.getEmails();
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("data", list);
		return mapData;
	}
}
