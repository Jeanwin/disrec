/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.PlateForm;

/**
 */
@MyBatisRepository
public interface PlateFormMapper extends BaseMapper<PlateForm, String> {

	public void saveAll(PlateForm plateForm);
}
