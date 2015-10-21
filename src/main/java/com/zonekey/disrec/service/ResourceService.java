/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.AppConstants;
import com.zonekey.disrec.common.HttpSend;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.CurriculumMapper;
import com.zonekey.disrec.dao.ManualVideoMapper;
import com.zonekey.disrec.dao.ResourceMapper;
import com.zonekey.disrec.dao.ServerMapper;
import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.entity.ManualVideo;
import com.zonekey.disrec.entity.Resource;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.vo.PageBean;

/**
 * @Title: @{#} ResourceService.java
 * @Description: <p>
 *               Resource实体业务类
 *               </p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class ResourceService {

	private Logger logger = LoggerFactory.getLogger(Resource.class);
	@Autowired
	private ManualVideoMapper manualVideoMapper;
	@Autowired
	private CurriculumMapper curriculumMapper;
	@Autowired
	private ResourceMapper resourceMapper;
	@Autowired
	private ServerMapper serverMapper;
	@Autowired
	private ServerService serverService;

	public Resource getResource(String id) {
		return resourceMapper.findOne(id);
	}

	/**
	 * @Title:findResourceUpload
	 * @Description: 资源上传查询
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> findResourceUpload(PageBean pageBean) {
		long total = resourceMapper.findResourceUploadCount(pageBean);
		List<Resource> list = resourceMapper.findResourceUpload(pageBean);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("data", list);
		return map;
	}

	/**
	 * @Title:deleteResourceupLoad
	 * @Description: 资源上传删除
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int deleteResourceupLoad(List<Map<String, Object>> list) {
		// resource.setModifydate();
		int flag = resourceMapper.deleteResourceupLoad(list,
				ShiroDbRealm.getCurrentLoginName());

		return flag;
	}

	/**
	 * @Title:deleteResourceupLoad
	 * @Description: 资源上传删除(废弃)
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int deleteResourceupsmid(List<Map<String, Object>> list) {
		// resource.setModifydate();
		int flag = resourceMapper.deleteResourceupsmid(list,
				ShiroDbRealm.getCurrentLoginName());

		return flag;
	}

	/**
	 * @Title:batchResourceupDelete
	 * @Description: 资源批量删除
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int batchResourceupDelete(List<Resource> reslist) {
		int flag = 0;
		// 循环list，逐条修改课表中对应文件夹的状态upload_is_manual
		List<Curriculum> clist = new ArrayList<Curriculum>();
		for (Resource resource : reslist) {
			// 2014-12-31加个判断，如果该资源的删除状态 ！=Y，执行以下操作
			if (!"Y".equals(resource.getUploadisdelete())) {
				Curriculum curriculum = new Curriculum();
				curriculum.setResourcefloder(resource.getName());
				clist.add(curriculum);
			}
		}
		for (Curriculum curriculum : clist) {
			flag = curriculumMapper.updateCurriculumuploadisdelete(curriculum);
		}

		return flag;
	}

	/**
	 * @Title:deleteResourceupLoad
	 * @Description: 资源批量上传
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int batchResourceupLoad(List<Resource> reslist) {
		int flag = 0;
		// 循环list，逐条修改课表中对应文件夹的状态upload_is_manual
		for (Resource resource : reslist) {
				// 2014-12-31加个判断，如果该资源的上传状态 ！=Y，执行以下操作
				if (!"Y".equals(resource.getUploadismanual())) {
					
					if(resource.getComeflag() == 0){
						Curriculum curriculum = new Curriculum();
						curriculum.setResourcefloder(resource.getName());
						flag = curriculumMapper.updateCurriculumuploadismanual(curriculum);
					}else if(resource.getComeflag() == 1){
						ManualVideo manualVideo = new ManualVideo();
						manualVideo.setFolderName(resource.getName());
						flag = manualVideoMapper.updateManualVideouploadismanual(manualVideo);
					}
				}else{
					flag = 2;
				}
		}

		return flag;
	}

	/**
	 * @Title:findResourceChilds
	 * @Description: 点击资源上传的文件夹
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public List<Resource> findResourceChilds(Resource resource) {
		List<Resource> reslist = resourceMapper.findResourceChilds(resource);

		return reslist;
	}

	/**
	 * @Title:findVideoResource
	 * @Description: 视频资源查询
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> findVideoResource(PageBean pageBean) {
		long total = resourceMapper.findVideoResourceCount(pageBean);
		List<Resource> list = resourceMapper.findVideoResource(pageBean);
		for (Resource resource : list) {
			if ("0".equals(resource.getDeleteflag())) {
				resource.setUploaddeletestatus("0");
			} else {
				resource.setUploaddeletestatus("1");
			}
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("data", list);
		return map;
	}

	/**
	 * @Title:findMyVideoResource
	 * @Description: 我的视频资源查询
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> findMyVideoResource(PageBean pageBean) {
		pageBean.getPage().put("loginname", ShiroDbRealm.getCurrentLoginName());
		// pageBean.getPage().put("loginname","wangyy1");
		long total = resourceMapper.findMyVideoResourceCount(pageBean);
		List<Resource> list = resourceMapper.findMyVideoResource(pageBean);
		for (Resource resource : list) {
			if ("0".equals(resource.getDeleteflag())) {
				resource.setUploaddeletestatus("");
			} else {
				resource.setUploaddeletestatus("正在删除");
			}
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("data", list);
		return map;
	}

	/**
	 * @Title:issuedVideoResource
	 * @Description: 视频资源发布
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int issuedVideoResource(List<Map<String, Object>> list) {
		int flag = resourceMapper.issuedVideoResource(list,
				ShiroDbRealm.getCurrentLoginName());

		return flag;
	}

	/**
	 * @Title:cancelissuedVideoResource
	 * @Description: 取消发布视频资源
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int cancelissuedVideoResource(List<Map<String, Object>> list) {
		int flag = resourceMapper.cancelissuedVideoResource(list,
				ShiroDbRealm.getCurrentLoginName());

		return flag;
	}

	/**
	 * @Title:setupVideoResource
	 * @Description: 设置视频资源
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int setupVideoResource(Resource resource) {
		resource.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		int flag = resourceMapper.setupVideoResource(resource);

		return flag;
	}

	/**
	 * @Title:deleteVideoResource
	 * @Description: 删除视频资源
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int deleteVideoResource(List<Map<String, Object>> list,String temp) {
		int flag = resourceMapper.deleteVideoResource(list,
				ShiroDbRealm.getCurrentLoginName(),temp);

		return flag;
	}
	/**
	 * @Title:deleteVideoResource
	 * @Description: 彻底删除
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int clearResource(List<Map<String, Object>> list) {
		int flag = resourceMapper.clearResource(list);
		return flag;
	}
	/**
	 * @Title:findImageResource
	 * @Description: 图片资源查询
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> findImageResource(PageBean pageBean) {
		long total = resourceMapper.findImageResourceCount(pageBean);
		List<Resource> list = resourceMapper.findImageResource(pageBean);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("data", list);
		return map;
	}

	/**
	 * @Title:setupImageResource
	 * @Description: 图片资源设置
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int setupImageResource(Resource resource) {
		int flag = resourceMapper.setupImageResource(resource);

		return flag;
	}

	/**
	 * @Title:deleteImageResource
	 * @Description: 删除图片资源
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int deleteImageResource(List<Map<String, Object>> list) {
		int flag = resourceMapper.deleteImageResource(list,
				ShiroDbRealm.getCurrentLoginName());
		return flag;
	}

	/**
	 * @Title:findIssuedResource
	 * @Description: 已发布资源查询
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> findIssuedResource(PageBean page) {
		long total = resourceMapper.findIssuedResourceCount(page);
		List<Resource> relist = resourceMapper.findIssuedResource(page);
		for(Resource r:relist){
			if(StringUtils.isBlank(r.getResourcetype()) || r.getResourcetype().equals("null")){
				r.setResourcetype(null);
			}
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("data", relist);
		return map;
	}

	/**
	 * @Title:setupIssuedResource
	 * @Description: 设置已发布资源
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int setupIssuedResource(Resource resource) {
		int flag = resourceMapper.setupIssuedResource(resource);
		return flag;
	}

	/**
	 * @Title:cancelIssuedResource
	 * @Description: 取消已发布资源
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int cancelIssuedResource(List<Map<String, Object>> list) {
		int flag = resourceMapper.cancelIssuedResource(list,
				ShiroDbRealm.getCurrentLoginName());
		return flag;
	}

	/**
	 * @Title:deleteIssuedResource
	 * @Description: 删除已发布资源
	 * @author niuxl
	 */
	@Transactional(readOnly = false)
	public int deleteIssuedResource(List<Map<String, Object>> list) {
		int flag = resourceMapper.deleteIssuedResource(list,
				ShiroDbRealm.getCurrentLoginName());
		return flag;
	}

	public Page<Resource> findPageBy(int pageNo, int pageSize) {
		long total = resourceMapper.count();
		PageRequest pageRequest = new PageRequest(pageNo, pageSize,
				Sort.Direction.ASC, "id");
		List<Resource> list = resourceMapper.findByPage(
				(pageNo - 1) * pageSize, pageSize);
		Page<Resource> page = new PageImpl<Resource>(list, pageRequest, total);

		return page;
	}

	@Transactional(readOnly = false)
	public void saveResource(Resource resource) {
		resource.setId(IdUtils.uuid2());
		resource.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		resource.setDeleteflag(AppConstants.IS_STATUS_DEFAULT);
		resourceMapper.insert(resource);
	}

	@Transactional(readOnly = false)
	public void updateResource(Resource resource) {
		// resource.setModifydate(new Date());
		resource.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		resourceMapper.update(resource);
	}

	@Transactional(readOnly = false)
	public void deleteResource(String id) {
		Resource resource = resourceMapper.findOne(id);
		resource.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		resourceMapper.delete(id);
	}

	/**
	 * @Title:deleteResourceupmid
	 * @Description: 删除
	 * @author niuxl
	 * @date 2014年10月30日 下午2:56:23
	 * @param resource
	 * @return
	 */
	@Transactional(readOnly = false)
	public int deleteResourceupmid(Resource resource) {
		return resourceMapper.deleteResourceupmid(resource);
	}

	/**
	 * @Title:insertResourceupmid
	 * @Description: 新增
	 * @author niuxl
	 * @date 2014年10月30日 下午2:55:54
	 * @param resource
	 * @return
	 */
	@Transactional(readOnly = false)
	public int insertResourceupmid(Resource resource) {
		resource.setId(UUID.randomUUID().toString());
		return resourceMapper.insertResourceupmid(resource);
	}

	/**
	 * @Title:findResourceFromDevicemid
	 * @Description: 查询
	 * @author niuxl
	 * @date 2014年10月30日 下午2:56:08
	 * @param pagebean
	 * @return
	 */
	@Transactional(readOnly = false)
	public Map<String, Object> findResourceFromDevicemid(PageBean pagebean) {
		long total = resourceMapper.findResourceFromDevicemidcount(pagebean);
		List<Resource> resourcelist = resourceMapper
				.findResourceFromDevicemid(pagebean);
		for (Resource resource : resourcelist) {
			// 截取时间
			if (StringUtils.isNotEmpty(resource.getCreatedate())) {
				resource.setCreatedate(resource.getCreatedate()
						.substring(0, 19));
			}
			if (("N".equals(resource.getUploadismanual()) || StringUtils
					.isEmpty(resource.getUploadismanual()))
					&& ("0".equals(resource.getUploadstate()) || StringUtils
							.isEmpty(resource.getUploadstate()))) {
				resource.setUploadstate("未上传");
			} else if (resource.getUploadismanual().equals("Y")
					&& ("0".equals(resource.getUploadstate()) || StringUtils
							.isEmpty(resource.getUploadstate()))) {
				resource.setUploadstate("已提交到上传任务");
			} else if ("1".equals(resource.getUploadstate())) {
				resource.setUploadstate("正在上传");
			} else if ("2".equals(resource.getUploadstate())) {
				resource.setUploadstate("上传成功");
			} else if ("3".equals(resource.getUploadstate())) {
				resource.setUploadstate("上传失败");
			}
		}
		for (Resource resource : resourcelist) {
			// 如果upload_is_delete=Y and uploaddeletestatus="" 显示正在删除
			if ("Y".equals(resource.getUploadisdelete())) {
				resource.setUploaddeletestatus("已加入删除队列");
			} else {
				if (resource.getUploaddeletestatus() != null
						&& resource.getUploaddeletestatus().equals("0")) {
					resource.setUploaddeletestatus("");
				} else if (resource.getUploaddeletestatus() != null
						&& resource.getUploaddeletestatus().equals("1")) {
					resource.setUploaddeletestatus("正在删除");
				} else if (resource.getUploaddeletestatus() != null
						&& resource.getUploaddeletestatus().equals("2")) {
					resource.setUploaddeletestatus("删除成功");
				} else if (resource.getUploaddeletestatus() != null
						&& resource.getUploaddeletestatus().equals("3")) {
					resource.setUploaddeletestatus("删除失败");
				}
			}

		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("total", total);
		map.put("data", resourcelist);
		return map;
	}

	@Transactional(readOnly = false)
	public String onDemand(HttpServletRequest req) {
		Map<String, Object> resultData = new HashMap<String, Object>();
		Map<String, Object> map = JsonUtil.jsonToObject(req, Map.class);
//		List<Map<String, Object>> list = null;
		// 查询正在上传个数
//		int num = 0;
//		num = resourceMapper.getUploadCount("0");
//		if ("2".equals(map.get("status")) && num > 3) {
//			resultData.put("status", "3");
//			return JsonUtil.toJson(resultData);
//		}
		List<Map<String, Object>> data = resourceMapper.getMp4(map);
		if(data.size() > 0){
			for(int i=0;i<data.size();i++){
//				resultData.put("data", data);
				String file_name = (String) data.get(i).get("file_name");
				file_name = file_name.substring(file_name.lastIndexOf("/")+1,file_name.indexOf(".mp4"));
				String ServerPath=serverService.getDEMANDServer().split(":")[0];
				String resultName = CommonUtil.getConfig("resourcePath");
				
				String map4_url = "http://"+ServerPath+resultName+data.get(i).get("resourcePath")+data.get(i).get("file_name");
				logger.info("===== >"+map4_url);
				resultData.put(file_name,map4_url); 
			}
			//resourcePath + file_name   /video/2015/20150616/20150604001997005/vga.mp4
		}
//		String ipPort = serverMapper
//				.getServerByType(AppConstants.TYPE_SERVER_DEMAND);
//		if (ipPort != null) {
//			String url = "http://" + ipPort + AppConstants.DEMAND_URL;
//			String result = HttpSend.post(url, data);
//			Map<String, Object> resultMap = JsonUtil.jsonToObject(result,
//					Map.class);
//			if (resultMap != null
//					&& "0".equals(resultMap.get("response_code") + "")) {
//				list = (List<Map<String, Object>>) resultMap.get("content");
//				if (list.size() == 0) {
//					resourceMapper.updateStatusByFloder(map, "0");
//					resultData.put("status", "0");
//				} else {
//					resourceMapper.updateStatusByFloder(map, "1");
//					resultData.put("status", "1");
//					resultData.put("data", list);
//				}
//			} else {
//				resultData.put("status", "4");
//			}
//		} else {
//			resultData.put("status", "4");
//		}
		return JsonUtil.toJson(resultData);

	}
}
