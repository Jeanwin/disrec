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

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.RangeScopeMapper;
import com.zonekey.disrec.entity.RangeScope;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;

/**
 * @Title: @{#} RangeScopeService.java
 * @Description: <p>
 *               RangeScope实体业务类
 *               </p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class RangeScopeService extends BaseService {

	@Autowired
	private RangeScopeMapper rangescopeMapper;

	public RangeScope getRangeScope(String id) {
		return rangescopeMapper.findOne(id);
	}

	public Page<RangeScope> findPageBy(int pageNo, int pageSize) {
		long total = rangescopeMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize,
				Sort.Direction.ASC, "id");
		List<RangeScope> list = rangescopeMapper.findByPage((pageNo - 1)
				* pageSize, pageSize);
		Page<RangeScope> page = new PageImpl<RangeScope>(list, pageRequest,
				total);

		return page;
	}

	@Transactional(readOnly = false)
	public void saveRangeScope(RangeScope rangescope) {
		rangescope.setId(IdUtils.uuid2());
		rangescope.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		rangescope.setDeleteflag(AppConstants.IS_STATUS_DEFAULT);
		rangescopeMapper.insert(rangescope);
	}

	@Transactional(readOnly = false)
	public void updateRangeScope(RangeScope rangescope) {
		rangescope.setModifydate(new Date());
		rangescope.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		rangescopeMapper.update(rangescope);
	}

	@Transactional(readOnly = false)
	public void deleteRangeScope(String id) {
		RangeScope rangescope = rangescopeMapper.findOne(id);
		rangescope.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		rangescopeMapper.delete(id);
	}
}
