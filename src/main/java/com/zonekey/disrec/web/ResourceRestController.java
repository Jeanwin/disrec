/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.web;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Validator;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.util.UriComponentsBuilder;
import org.springside.modules.beanvalidator.BeanValidators;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exception.RestException;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.common.utils.ContinueFTP;
import com.zonekey.disrec.entity.Resource;
import com.zonekey.disrec.service.AreaService;
import com.zonekey.disrec.service.CurriculumService;
import com.zonekey.disrec.service.DeviceService;
import com.zonekey.disrec.service.ResourceService;
import com.zonekey.disrec.service.ServerService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.PageBean;

/**
 * @Title: @{#} ResourceRestController.java
 * @Description: <p>Resource的Restful API的Controller.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */ 
@RestController
@RequestMapping(value = "/rest/resource")
public class ResourceRestController {
	private static final Logger LOG = LoggerFactory.getLogger(ResourceRestController.class);
	
	@Autowired
	private ResourceService resourceService;
	@Autowired
	private ServerService serverService;
	@Autowired
	private Validator validator;
	@Autowired
	private DeviceService deviceService;
	@Autowired
	private CurriculumService curriculumService;
	@Autowired
	private AreaService areaService;
	/** 
	 * @Title:findResourceFromDevice
	 * @Description: 从设备上读取资源，并新增到临时表中
	 * @author niuxl
	 * @date 2014年10月30日 下午1:41:21
	*/
	public int findResourceFromDevice(Resource resourceparam,String ipPort){
		//根据教室id查教室ip
		Map<String,Object> ipmap=new HashMap<String, Object>();
		ipmap.put("areaid", resourceparam.getAreaid());
		//删除临时表中，对应教室的数据
		int delflag=resourceService.deleteResourceupmid(resourceparam);
		//根据教室id，查录播机的mac
		String mac=deviceService.getMacById(ipmap);
		if(StringUtils.isEmpty(mac)){
			return -1;
		}
		//根据mac查ip
		String url="http://"+ipPort+"/deviceService/getIpByMac";
		System.out.println("url = "+ url);
		//调用设备接口，根据mac，返回ip
		String deviceip = CommonUtil.sendGet(url,"mac="+mac);
		//由于上一步现在调不通，现在通过mac到设备中取ip，以后下面这步要注释掉
		deviceip = deviceService.findDeviceByMac(mac).getIp();
		System.out.println("deviceip = "+ deviceip);
		if(StringUtils.isEmpty(deviceip)){
			return -1;
		}
		//查到该教室下面的资源文件夹
//		List<Map<String,Object>> resourceList=curriculumService.findResourcefloderByAraeaid(ipmap);
		int addflag=0;
		List<Resource> resourcelist=new ArrayList<Resource>();
		try {
			ContinueFTP myFtp = new ContinueFTP();
			myFtp.connect(deviceip, 21,"anonymous","3439133302014@qq.com");
			java.util.List<Map> folder_list = myFtp.getFolederList("/"); // 目录
			LOG.debug("文件夹个数："+folder_list.size());
			for (Map map : folder_list) {
				Resource resource=new Resource();
				resource.setName(map.get("name").toString());
				resource.setSize(0);
				resource.setCreatedate(map.get("time").toString());
				resource.setAreaid(resourceparam.getAreaid());
				resourcelist.add(resource);
			}
			
			
		} catch (Exception e) {
			LOG.info("连接FTP超时,mac地址为"+mac);
			return -1;
		}
//		  删除临时表中，对应教室的数据
//		int delflag=resourceService.deleteResourceupmid(resourceparam);
		//将上面读取到的数据，新增到临时表中
		for(Resource resource:resourcelist){
			 addflag=resourceService.insertResourceupmid(resource);
			
		}
		return addflag;
	}
	
	/** 
	 * @Title:findResourceUpload
	 * @Description: 资源上传查询
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	 * @throws UnknownHostException 
	*/
	@RequestMapping(value = "findResourceUpload", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	Map<String, Object> findResourceupLoad(HttpServletRequest req) throws UnknownHostException {
		/*String ip= req.getLocalAddr();    //取得本地IP     
		int port=  req.getLocalPort();    //取得本地端口
*/		
		String ipPort = serverService.getWebServer();
		PageBean pageBean =JsonUtil.jsonToPage(req);
		Resource resource =new Resource();
		 Map<String,Object> mapKey=  pageBean.getKeywords();
		 String temp = null;
		 if(mapKey != null){
			  temp = String.valueOf(mapKey.get("temp")==null?"":mapKey.get("temp"));
		 }
		if(StringUtils.isNotBlank(temp)){
//			不为空，表示机构树，传deptid
			resource.setDeptid(pageBean.getTreeid());
			List<AreaView> areas = areaService.findAreaIdByDeptId(pageBean.getTreeid());
			if(areas.size() > 0){
				resource.setAreaid(areas.get(0).getId());
				pageBean.setTreeid(areas.get(0).getId());
			}else{
//				不确定的treeid
//				resource.setAreaid(pageBean.getTreeid());
//				pageBean.setTreeid("");
			}
		}else{
//			不为空，表示区域树，传areaid
			resource.setAreaid(pageBean.getTreeid());
		}
		

		int flag=findResourceFromDevice(resource,ipPort);
		if(flag<0){
			Map<String ,Object> map= new HashMap<String, Object>();
			map.put("total", 0);
			map.put("data", "");
			return map;
		}
		//从资源临时表中查询对应教室的数据
		return resourceService.findResourceFromDevicemid(pageBean);
	}
	/** 
	 * @Title:findResourceUpload
	 * @Description: 删除之后资源上传查询
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "findResourceupmid", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	Map<String, Object> findResourceupmid(HttpServletRequest req) {
		PageBean pageBean =JsonUtil.jsonToPage(req);
		//从资源临时表中查询对应教室的数据
		return resourceService.findResourceFromDevicemid(pageBean);
	}
	/** 
	 * @Title:deleteResourceupLoad
	 * @Description: 资源上传删除
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "deleteResourceupLoad_bak", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg deleteResourceupLoad_bak(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		int flag= resourceService.deleteResourceupLoad(list);
		if(flag>0){
			msg.setId("1");
			msg.setOperation("删除成功");
		}else{
			msg.setId("0");
			msg.setOperation("删除失败");
		}
		return msg;
	}
	/** 
	 * @Title:deleteResourceupLoad
	 * @Description: 资源上传删除
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "deleteResourceupLoad", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg deleteResourceupLoad(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		List<Resource> reslist=new ArrayList<Resource>();
		for(Map<String,Object> resmap:list){
			Resource resource=new Resource();
			resource.setName(resmap.get("name").toString());
			resource.setUploadisdelete(resmap.get("uploadisdelete").toString());
			reslist.add(resource);
		}
		int flag= resourceService.batchResourceupDelete(reslist);
		if(flag>0){
			msg.setId("1");
			msg.setOperation("资源删除成功");
		}else{
			msg.setId("0");
			msg.setOperation("资源删除失败");
		}
		return msg;
	}
	/** 
	 * @Title:deleteResourceupLoad
	 * @Description: 资源上传
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "batchResourceupLoad", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg batchResourceupLoad(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		List<Resource> reslist=new ArrayList<Resource>();
		for(Map<String,Object> resmap:list){
			Resource resource=new Resource();
			resource.setName(resmap.get("name").toString());
			if(resmap.get("uploadismanual")== null || resmap.get("uploadismanual")==""){
				resmap.put("uploadismanual", "N");
			}
			resource.setUploadismanual(resmap.get("uploadismanual").toString());
			resource.setComeflag(Integer.valueOf(resmap.get("comeflag").toString()));
			reslist.add(resource);
		}
		int flag= resourceService.batchResourceupLoad(reslist);
		if(flag>0){
			msg.setId("1");
			msg.setOperation("资源上传成功");
		}else{
			msg.setId("0");
			msg.setOperation("资源上传失败");
		}
		return msg;
	}
	/** 
	 * @Title:findResourceChilds
	 * @Description: 点击资源展开文件夹
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "findResourceChilds", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody List<Resource> findResourceChilds(HttpServletRequest req){
		Resource resource=JsonUtil.jsonToObject(req, Resource.class);
		List<Resource> resourcelist = resourceService.findResourceChilds(resource);
		return resourcelist;
	}
	/** 
	 * @Title:findMyVideoResource
	 * @Description: 我的视频资源查询
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "findMyVideoResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	Map<String,Object> findMyVideoResource(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		return resourceService.findMyVideoResource(pageBean);
	}
	/** 
	 * @Title:findResourceupLoad
	 * @Description: 视频资源查询
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "findVideoResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
	Map<String,Object> findVideoResource(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Map<String,Object> map = resourceService.findVideoResource(pageBean);
		try {
			 Map<String,String> map2 = CommonUtil.getDesk();
				map.put("totalHD", map2.get("totalHD"));
		    	map.put("usedHD", map2.get("usedHD"));
		    	map.put("lastHD", map2.get("lastHD"));
		} catch (Exception e) {
			e.printStackTrace();
		}		
		return map;
	}
	
	/** 
	 * @Title:issuedVideoResource
	 * @Description: 视频资源发布
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = " issuedVideoResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg issuedVideoResource(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		List<Map<String,Object>> list=JsonUtil.jsonToObject(req, List.class);
//		判断是否已经转码？
		
		 int flag=resourceService.issuedVideoResource(list);
		 if(flag>0){
				msg.setId("1");
				msg.setOperation("发布成功");
			}else{
				msg.setId("0");
				msg.setOperation("发布失败");
			}
			return msg;
	}
	/** 
	 * @Title:cancelissuedVideoResource
	 * @Description: 取消发布视频资源
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "cancelissuedVideoResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg cancelissuedVideoResource(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		List<Map<String,Object>> list=JsonUtil.jsonToObject(req, List.class);
		 int flag=resourceService.cancelissuedVideoResource(list);
		 if(flag>0){
				msg.setId("1");
				msg.setOperation("设置成功");
			}else{
				msg.setId("0");
				msg.setOperation("设置失败");
			}
			return msg;
	}
	/** 
	 * @Title:setupVideoResource
	 * @Description: 视频资源设置
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "setupVideoResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg setupVideoResource(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		Resource resource=JsonUtil.jsonToObject(req, Resource.class);
		 int flag=resourceService.setupVideoResource(resource);
		 if(flag>0){
				msg.setId("1");
				msg.setOperation("设置成功");
			}else{
				msg.setId("0");
				msg.setOperation("设置失败");
			}
			return msg;
	}
	/** 
	 * @Title:setupVideoResource
	 * @Description: 视频资源设置 dai 图片
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "setupVideoResourceWithPic", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg setupVideoResourceWithPic(MultipartHttpServletRequest req,Resource resource) {
		JsonMsg msg=new JsonMsg();
		String filePath = "";
		if(StringUtils.isNotBlank(resource.getUploadPic())){
			filePath = CommonUtil.upload(null, req,resource.getUploadPic());
		}else{
			filePath = CommonUtil.upload(null, req,null);
		}
//		String filePath = CommonUtil.upload(null, req,null);
		resource.setUploadPic(filePath);
		
		 int flag=resourceService.setupVideoResource(resource);
		 if(flag>0){
				msg.setId("1");
				msg.setOperation("发布成功");
			}else{
				msg.setId("0");
				msg.setOperation("发布失败");
			}
			return msg;
	}
	/** 
	 * @Title:deleteVideoResource
	 * @Description: 删除视频资源
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "deleteVideoResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg deleteVideoResource(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		Map<String,Object> map = JsonUtil.jsonToObject(req, Map.class);
		List<Map<String,Object>> list = (List<Map<String, Object>>) map.get("selectedItems");
		
		String temp = map.get("flag")==null?null:String.valueOf(map.get("flag"));
		 int flag=resourceService.deleteVideoResource(list,temp);
		 if(flag>0){
				msg.setId("1");
				msg.setOperation("删除成功");
			}else{
				msg.setId("0");
				msg.setOperation("删除失败");
			}
			return msg;
	}
		
	/** 
	 * @Title:findImageResource
	 * @Description: 图片资源查询
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "findImageResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		Map<String,Object> findImageResource(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		return resourceService.findImageResource(pageBean);
	}
	/** 
	 * @Title:setupImageResource
	 * @Description: 图片资源设置
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "setupImageResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg setupImageResource(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		Resource resource=JsonUtil.jsonToObject(req, Resource.class);
		 int flag=resourceService.setupImageResource(resource);
		 if(flag>0){
				msg.setId("1");
				msg.setOperation("发布成功");
			}else{
				msg.setId("0");
				msg.setOperation("发布失败");
			}
			return msg;
	}
	
	/** 
	 * @Title:deleteImageResource
	 * @Description: 删除图片资源
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "deleteImageResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg deleteImageResource(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		int flag= resourceService.deleteImageResource(list);
		 if(flag>0){
				msg.setId("1");
				msg.setOperation("发布成功");
			}else{
				msg.setId("0");
				msg.setOperation("发布失败");
			}
			return msg;
	}
	
	/** 
	 * @Title:findIssuedResource
	 * @Description: 已发布资源查询
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "findIssuedResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		Map<String,Object> findIssuedResource(HttpServletRequest req) {
		PageBean page= JsonUtil.jsonToPage(req);
		return  resourceService.findIssuedResource(page);
	}
	
	/** 
	 * @Title:setupIssuedResource
	 * @Description: 设置已发布资源
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "setupIssuedResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg setupIssuedResource(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		Resource resource=JsonUtil.jsonToObject(req, Resource.class);
		int flag=resourceService.setupIssuedResource(resource);
		 if(flag>0){
				msg.setId("1");
				msg.setOperation("发布成功");
			}else{
				msg.setId("0");
				msg.setOperation("发布失败");
			}
			return msg;
	}
	/** 
	 * @Title:cancelIssuedResource
	 * @Description: 取消已发布资源
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "cancelIssuedResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg cancelIssuedResource(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
		List<Map<String,Object>> list=JsonUtil.jsonToObject(req, List.class);
		 int flag=resourceService.cancelIssuedResource(list);
		 if(flag>0){
				msg.setId("1");
				msg.setOperation("发布成功");
			}else{
				msg.setId("0");
				msg.setOperation("发布失败");
			}
			return msg;
	}
	
	/** 
	 * @Title:deleteIssuedResource
	 * @Description: 删除已发布资源
	 * @author niuxl
	 * @date 2014年10月22日 下午3:00:27
	 * @param id
	 * @return
	*/
	@RequestMapping(value = "deleteIssuedResource", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public @ResponseBody
		JsonMsg deleteIssuedResource(HttpServletRequest req) {
		JsonMsg msg=new JsonMsg();
			List<Map<String,Object>> list=JsonUtil.jsonToObject(req, List.class);
		 int flag=resourceService.deleteIssuedResource(list);
		 if(flag>0){
				msg.setId("1");
				msg.setOperation("发布成功");
			}else{
				msg.setId("0");
				msg.setOperation("发布失败");
			}
			return msg;
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public Resource get(@PathVariable("id") String id) {
		Resource resource = resourceService.getResource(id);
		if (resource == null) {
			String message = "数据不存在(id:" + id + ")";
			LOG.warn(message);
			throw new RestException(HttpStatus.NOT_FOUND, message);
		}
		return resource;
	}
	@RequestMapping(value = "page/{no}/{size}", method = RequestMethod.GET, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(@PathVariable("no") String no, @PathVariable("size") String size) {
		Page<Resource> dataPage = resourceService.findPageBy(Integer.parseInt(no), Integer.parseInt(size));
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("rows", dataPage.getContent());
		return mapData;
	}

	@RequestMapping(method = RequestMethod.POST, consumes = MediaTypes.JSON)
	public ResponseEntity<?> create(@RequestBody Resource resource, UriComponentsBuilder uriBuilder) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		BeanValidators.validateWithException(validator, resource);

		// 保存新增
		resourceService.saveResource(resource);

		// 按照Restful风格约定，创建指向新任务的url, 也可以直接返回id或对象.
		String id = resource.getId();
		URI uri = uriBuilder.path("/resource/" + id).build().toUri();
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(uri);

		return new ResponseEntity(headers, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaTypes.JSON)
	// 按Restful风格约定，返回204状态码, 无内容. 也可以返回200状态码.
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@RequestBody Resource resource) {
		// 调用JSR303 Bean Validator进行校验, 异常将由RestExceptionHandler统一处理.
		BeanValidators.validateWithException(validator, resource);

		// 保存更新
		resourceService.updateResource(resource);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable("id") String id) {
		resourceService.deleteResource(id);
	}
	
	/**
	 * 点播
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "onDemand",method = RequestMethod.POST, consumes = MediaTypes.JSON)
	public String onDemand(HttpServletRequest req) {
		return resourceService.onDemand(req);
	}
	/**
	 * 彻底删除
	 * @param req
	 * @return
	 */
	@RequestMapping(value = "clearResource",method = RequestMethod.POST, consumes = MediaTypes.JSON)
	public int clearResource(HttpServletRequest req) {
			List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
			 return resourceService.clearResource(list);
			 
	}
	/**
	 * 
	 */
	@RequestMapping(value = "getSpace",method = RequestMethod.GET, consumes = MediaTypes.JSON)
	public Map<String,Object> getSpace(HttpServletRequest req) {
		File win = new File("/home/data");  
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("free", win.getFreeSpace());
		map.put("total", win.getTotalSpace());
        return map;
			 
	}
	
}
