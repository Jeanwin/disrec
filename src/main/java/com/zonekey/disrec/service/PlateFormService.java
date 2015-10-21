/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.PlateFormMapper;
import com.zonekey.disrec.dao.SysMsgStatusMapper;
import com.zonekey.disrec.entity.PlateForm;
import com.zonekey.disrec.entity.SysMsgStatus;

/**
 * xufeixiang 15.04.20
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class PlateFormService extends BaseService {

	@Autowired
	private PlateFormMapper plateFormMapper;
	public PlateFormMapper getPlateFormMapper() {
		return plateFormMapper;
	}

	public void setPlateFormMapper(PlateFormMapper plateFormMapper) {
		this.plateFormMapper = plateFormMapper;
	}

	public PlateForm findOne() {
		PlateForm plate = plateFormMapper.findOne(null);
		return plate;
	}
//
	@Transactional(readOnly = false)
	public void savePlateForm(PlateForm plateForm) {
		plateFormMapper.deleteAll();
		
		plateForm.setId(IdUtils.uuid2());
		plateFormMapper.saveAll(plateForm);
	}
	
//	@Transactional(readOnly = false)
//	public void updateSysMsgStatus(SysMsgStatus sysmsgstatus) {
//		sysmsgstatus.setModifydate(new Date());
//		sysmsgstatus.setModifyuser(ShiroDbRealm.getCurrentLoginName());
//		sysmsgstatusMapper.update(sysmsgstatus);
//	}
//
//	@Transactional(readOnly = false)
//	public void deleteSysMsgStatus(String id) {
//		SysMsgStatus sysmsgstatus = sysmsgstatusMapper.findOne(id);
//		sysmsgstatus.setModifyuser(ShiroDbRealm.getCurrentLoginName());
//		sysmsgstatusMapper.delete(id);
//	}
}
