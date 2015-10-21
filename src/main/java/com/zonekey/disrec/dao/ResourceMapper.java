/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Resource;
import com.zonekey.disrec.vo.PageBean;

/**
 * @Title: @{#} ResourceMapper.java
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@MyBatisRepository
public interface ResourceMapper extends BaseMapper<Resource, String> {
	/** 
	 * @Title:findResourceupLoadCount
	 * @Description: 查询资源上传条数
	 * @author niuxl
	*/
	public long findResourceUploadCount(PageBean pageBean);
	/** 
	 * @Title:findResourceupLoadCount
	 * @Description: 查询资源上传
	 * @author niuxl
	*/
	public List<Resource> findResourceUpload(PageBean pageBean);
	/** 
	 * @Title:findResourceupLoadCount
	 * @Description: 删除资源上传
	 * @author niuxl
	*/
	public int deleteResourceupLoad(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser);
	/** 
	 * @Title:findResourceupLoadCount
	 * @Description: 删除资源上传（废弃）
	 * @author niuxl
	*/
	public int deleteResourceupsmid(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser);
	/** 
	 * @Title:findResourceChilds
	 * @Description: 点击资源上传文件夹
	 * @author niuxl
	*/
	public List<Resource> findResourceChilds(Resource resource);
	/** 
	 * @Title:findVideoResource
	 * @Description: 视频资源查询
	 * @author niuxl
	*/
	public List<Resource> findVideoResource(PageBean pageBean);
	public long findVideoResourceCount(PageBean pageBean);
	/** 
	 * @Title:findVideoResource
	 * @Description: 我的视频资源查询
	 * @author niuxl
	*/
	public List<Resource> findMyVideoResource(PageBean pageBean);
	public long findMyVideoResourceCount(PageBean pageBean);
	
	/** 
	 * @Title:issuedVideoResource
	 * @Description: 视频资源发布
	 * @author niuxl
	*/
	public int issuedVideoResource(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser);
	/** 
	 * @Title:cancelissuedVideoResource
	 * @Description: 取消发布视频资源
	 * @author niuxl
	*/
	public int cancelissuedVideoResource(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser);
	/** 
	 * @Title:setupVideoResource
	 * @Description: 设置视频资源
	 * @author niuxl
	*/
	public int setupVideoResource(Resource resource);
	/** 
	 * @Title:deleteVideoResource
	 * @Description: 删除视频资源
	 * @author niuxl
	*/
	public int deleteVideoResource(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser,@Param("temp")String temp);
	
	public int clearResource(@Param("list")List<Map<String,Object>> list);
	/** 
	 * @Title:findImageResource
	 * @Description: 图片资源查询
	 * @author niuxl
	*/
	public List<Resource> findImageResource(PageBean pageBean);
	public long findImageResourceCount(PageBean pageBean);
	/** 
	 * @Title:setupImageResource
	 * @Description: 图片资源设置
	 * @author niuxl
	*/
	public int  setupImageResource(Resource resource);
	/** 
	 * @Title:deleteImageResource
	 * @Description: 删除图片资源
	 * @author niuxl
	*/
	public int  deleteImageResource(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser);
	/** 
	 * @Title:findIssuedResource
	 * @Description: 已发布资源查询
	 * @author niuxl
	*/
	public List<Resource>  findIssuedResource(PageBean page);
	public long  findIssuedResourceCount(PageBean page);
	/** 
	 * @Title:setupIssuedResource
	 * @Description: 设置已发布资源
	 * @author niuxl
	*/
	public int  setupIssuedResource(Resource resource);
	/** 
	 * @Title:cancelIssuedResource
	 * @Description: 取消已发布资源
	 * @author niuxl
	*/
	public int  cancelIssuedResource(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser);
	/** 
	 * @Title:deleteIssuedResource
	 * @Description: 删除已发布资源
	 * @author niuxl
	*/
	public int  deleteIssuedResource(@Param("list")List<Map<String,Object>> list,@Param("modifyuser")String modifyuser);
	/** 
	 * @Title:deleteIssuedResource
	 * @Description: 删除资源临时表数据
	 * @author niuxl
	*/
	public int  deleteResourceupmid(Resource resource);
	/** 
	 * @Title:deleteIssuedResource
	 * @Description: 新增资源临时表
	 * @author niuxl
	*/
	public int  insertResourceupmid(Resource resource);
	public long findResourceFromDevicemidcount(PageBean page);
	/** 
	 * @Title:deleteIssuedResource
	 * @Description: 从资源临时表查询
	 * @author niuxl
	*/
	public List<Resource> findResourceFromDevicemid(PageBean page);
	
	public List<Map<String,Object>> getMp4(@Param("map")Map<String,Object> map);
	public int getUploadCount(@Param("status")String status);
	public void updateStatus(List<Map<String,Object>> list);
	public void updateStatusByFloder(@Param("map")Map<String,Object> map,@Param("status")String status);
}
