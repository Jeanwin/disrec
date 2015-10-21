/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.mapper.JsonMapper;

import com.zonekey.disrec.common.cache.MemcachedObjectType;
import com.zonekey.disrec.common.cache.SpyMemcachedClient;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.SysCodeMapper;
import com.zonekey.disrec.entity.SysCode;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.SysCodeView;

/**
 * @Title: @{#} SysCodeService.java
 * @Description: <p>SysCode实体业务类</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class SysCodeService extends BaseService {

	@Autowired
	private SysCodeMapper syscodeMapper;
	
	@Autowired(required = false)
	private SpyMemcachedClient memcachedClient;
	
	private final JsonMapper jsonMapper = JsonMapper.nonDefaultMapper();
	
	public SysCode getSysCode(String id) {
		if (memcachedClient != null) {
			return getSysCodeWithMemcached(id);
		} else {
			return syscodeMapper.findOne(id);
		}
	}
	
	public String  getModeByCode(String code) {
		List<Map<String,Object>> livemodelmap=getCode("livemodel");
		String filmval="";String voideval="";String allval="";
		for(Map<String,Object> m:livemodelmap){
			if("电影".equals(m.get("name"))){
				 filmval=m.get("value").toString();
			}else if("资源".equals(m.get("name"))){
				 voideval=m.get("value").toString();
			}else{
				 allval=m.get("value").toString();
			}
		}
		if (code.equals(filmval)) return "Movie";
		if (code.equals(voideval)) return "Resource";
		if (code.equals(allval)) return "All";
		return "";
	}
	
	public Page<SysCodeView> findPageBy(PageBean pageBean) {
		String id = pageBean.getTreeid();
		SysCode sysCode = syscodeMapper.findOne(id);
		if(sysCode != null &&"0".equals(sysCode.getParentid()))
			pageBean.setTreeid(null);
		long total = syscodeMapper.count(pageBean);
		List<SysCodeView> list = syscodeMapper.findPageBy(pageBean);
		Page<SysCodeView> page = new PageImpl<SysCodeView>(list, null, total);
		
		return page;
	}

	@Transactional(readOnly = false)
	public int saveSysCode(SysCode syscode) {
		syscode.setId(IdUtils.uuid2());
		syscode.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		return syscodeMapper.insert(syscode);
	}
	
	@Transactional(readOnly = false)
	public int updateSysCode(SysCode syscode) {
		if(syscode.getId()==null){
			return saveSysCode(syscode);
		}else
		syscode.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		return syscodeMapper.update(syscode);
	}

	@Transactional(readOnly = false)
	public int deleteSysCode(SysCode sysCode) {
		if(sysCode==null || sysCode.getId()==null)
			return 0;
		sysCode.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		syscodeMapper.delete(sysCode);
		syscodeMapper.deleteChilds(sysCode);
		return 1;
	}
	
	public int checkName(SysCode sysCode){
		return syscodeMapper.checkCount(sysCode);
	}
	public int checkValue(SysCode sysCode){
		return syscodeMapper.checkCount(sysCode);
	}
	@Transactional(readOnly = false)
	public  List<Map<String,Object>> findDiviceType() {
		return syscodeMapper.findDiviceType();
		
	}
	public  List<Map<String,Object>> getDicTree() {
		return syscodeMapper.getDicTree();
		
	}
	@Transactional(readOnly = false)
	public List<SysCode> findSopeAll(String id) throws Exception {
		return syscodeMapper.findSopeAll(id);
	}
	
	public List<Map<String,Object>> findType(String id)  {
		return syscodeMapper.findType(id);
	}
	public List<Map<String,Object>> getCode(String value)  {
		return syscodeMapper.getCode(value);
	}
	/**
	 * 先访问Memcached, 使用JSON字符串存放对象以节约空间.
	 */
	private SysCode getSysCodeWithMemcached(String id) {
		String key = MemcachedObjectType.USER.getPrefix() + id;

		String jsonString = memcachedClient.get(key);

		if (jsonString != null) {
			return jsonMapper.fromJson(jsonString, SysCode.class);
		} else {
			SysCode sysCode = syscodeMapper.findOne(id);
			if (sysCode != null) {
				jsonString = jsonMapper.toJson(sysCode);
				memcachedClient.set(key, MemcachedObjectType.USER.getExpiredTime(), jsonString);
			}
			return sysCode;
		}
	}
}
