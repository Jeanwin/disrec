package com.zonekey.disrec.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.EmailMapper;
import com.zonekey.disrec.entity.Email;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;

@Component
@Transactional(readOnly = true)
public class EmailService extends BaseService{

	@Autowired
	private EmailMapper emailMapper;
	
	@Transactional(readOnly = false)
	public int saveEmail(List<Email> emails) {
		if(emails == null || emails.size()==0){
			return 0;
		}
		for (Email email : emails) {
			email.setId(IdUtils.uuid2());
			email.setDeleteFlag("0");
			email.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		}
		return emailMapper.insert(emails);	
		}

	@Transactional(readOnly = false)
	public int updateEmail(Email email) {
		if(email == null || email.getEmail()==null){
			return 0;
		}
		return emailMapper.updateByPrimaryKeySelective(email);
	}

	@Transactional(readOnly = false)
	public int deleteEmail(List<Map<String, Object>> list) {
		if(list == null){
			return 0;
		}
		emailMapper.deleteByKeys(list);
		return 1;
	}

	
	public List<Email> getEmails() {
		List<Email> list = emailMapper.getEmails();
		return list;
	}

}
