/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.zonekey.disrec.common.DateTermUtil;
import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.AreaMapper;
import com.zonekey.disrec.dao.DeptMapper;
import com.zonekey.disrec.dao.SysCodeMapper;
import com.zonekey.disrec.entity.Dept;
import com.zonekey.disrec.entity.SysCode;
import com.zonekey.disrec.entity.Sysimportinfo;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeptView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.Tree;
import com.zonekey.disrec.web.DeptRestController;
import org.slf4j.Logger;
/**
 * @Title: @{#} DeptService.java
 * @Description: <p>
 *               Dept实体业务类
 *               </p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class DeptService extends BaseService {
	private static final Logger LOG = LoggerFactory.getLogger(DeptService.class);
	@Autowired
	private DeptMapper deptMapper;
	@Autowired
	private AreaMapper areaMapper;
	@Autowired
	private SysimportinfoService sysimportinfoService;
	@Autowired
	private AreaService areaService;
	@Autowired
	private SysCodeMapper sysCodeMapper;
	public int excelrow=1;
	public DeptView getDept(String id) {
		return deptMapper.findOne(id);
	}

	public Page<DeptView> findPageBy(PageBean pageBean) {
		long total = deptMapper.count(pageBean);
		List<DeptView> list = deptMapper.findByPage(pageBean);
		Page<DeptView> page = new PageImpl<DeptView>(list, null, total);
		return page;
	}
	public List<Map<String,Object>> findByName(Map<String,Object> map) {
		return deptMapper.findByName(map);
	}
	@Transactional(readOnly = false)
	public int saveDept(DeptView deptView) {
		int flag = 0;
		if(deptView == null || deptView.getName()==null || deptView.getCode() == null || deptView.getParentid() == null || deptView.getAttribute() == null){
			LOG.warn("对象或者相关属性为空,不能保存");
			return flag;
		}
		deptView.setId(IdUtils.uuid2());
		deptView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		flag = deptMapper.insert(deptView);

		updateArea(deptView);
		return flag;
	}

	@Transactional(readOnly = false)
	public int updateDept(DeptView deptView) {
		if(deptView == null || deptView.getId() == null){
			return 0;
		}
		deptView.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		int flag = deptMapper.update(deptView);
		updateArea(deptView);
		return flag;
	}
	//更新默认教室
	public void updateArea(DeptView deptView){
		if(deptView.getAreaid()==null)
			return;
			AreaView areaView = new AreaView();
			areaView.setId(deptView.getAreaid());
			areaView.setDeptid(deptView.getId());
			areaView.setModifyuser(ShiroDbRealm.getCurrentLoginName());
			areaMapper.clearDeptid(areaView);
			areaMapper.update(areaView);
	}
	@Transactional(readOnly = false)
	public int deleteDept(List<Map<String, Object>> list) {
		if(list == null){
			return 0;
		}
		deptMapper.delete(list, ShiroDbRealm.getCurrentLoginName());
		return 1;
	}
	
	public int check(Dept dept) {
		return deptMapper.check(dept);
	}
	public int checkname(Dept dept) {
		return deptMapper.checkname(dept);
	}
	/**
	 * 获取树
	 * 
	 * @return
	 */
	public List<Tree> getDeptTrees() {
		return deptMapper.getDeptRootTrees();
	}
	/**
	 * findDeptSomeMessage
	 */
	public List<Map<String, Object>> findDeptSomeMessage(Dept dept) {
		List<DeptView> list = deptMapper.findDeptSomeMessage(dept);
		List<Map<String, Object>> lists = new ArrayList<Map<String,Object>>();
		 for(DeptView deptView:list){
			 Map<String, Object> resuktmap = new HashMap<String, Object>();
			 resuktmap.put("id", deptView.getId());
			 resuktmap.put("attribute", deptView.getAttribute());
			 resuktmap.put("attributename", deptView.getAttributename());
			 resuktmap.put("name", deptView.getName());
			 lists.add(resuktmap);
		 }
		return lists;
	}

	/**
	 * 获取树
	 * 
	 * @return
	 */
	public List<Tree> getDeptTree() {
		return deptMapper.getDeptRootTree();
	}
	/**
	 * 通过机构代码查这个机构
	 * 
	 * @return
	 */
	public DeptView findDeptByCode(String code){
		return deptMapper.findDeptByCode(code);
	}
	//读取excel，并将数据插入到临时表里(这里可以不返回list，返回批次号也可以，以后看情况改过来)
	@SuppressWarnings("finally")
	@Transactional(readOnly = false)
		public JsonMsg readExcel(DeptView deptViewimport ,MultipartFile file)throws Exception{
		JsonMsg msg = new JsonMsg();
			int flag=0;
			 Workbook book;
			 String systime=DateTermUtil.getNowTime().replace(" ", "").replace("-", "").replace(":", "").trim();
				try {
					book = Workbook.getWorkbook(file .getInputStream());
					 //读取sheet
		             Sheet sheet=book.getSheet(0); 
		             int row = sheet.getRows();
		             excelrow=row-1;
		             a: for(int i = 1; i < row; i++) {
		            	  DeptView deptView=new DeptView();
		            	  deptView.setParentid(deptViewimport.getParentid());
		            	  //日志类
		            	  Sysimportinfo sysimportinfo=new Sysimportinfo();
		            	  sysimportinfo.setImportid(systime);
		            	  sysimportinfo.setExcelid(i);
		            	  //组织机构代码
		            	  String code=sheet.getCell(0,i).getContents();
		            	  //组织机构名称
		            	  String name=sheet.getCell(1,i).getContents();
		            	  //属性
		            	  String attributeName=sheet.getCell(2,i).getContents();
		            	  //默认教室编号
		            	  String areacode=sheet.getCell(3,i).getContents();
		            	//父节点
		            	  String parentname=sheet.getCell(4,i).getContents();
		            	  DeptView errorDeptView=new DeptView();
		            	  errorDeptView.setId(IdUtils.uuid2());
		            	  errorDeptView.setCode(code);
		            	  errorDeptView.setName(name);
		            	  errorDeptView.setAttribute(attributeName);
		            	  errorDeptView.setAreaName(areacode);
		            	  errorDeptView.setParentname(parentname);
		            	  errorDeptView.setExcelbatch(systime);
		            	  errorDeptView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		            	//组织机构代码
		            	  if(StringUtils.isNotEmpty(code)){
		            	  }else{
		            		  //该条数据名字为空，不合法数据，记录到日志
		            		  sysimportinfo.setStatus(1);
		            		  sysimportinfo.setError("该条数据组织机构代码为空，不合法数据");
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            		  //
		            		  errorDeptView.setFlag("1");
		            		  errorDeptView.setErrordescribe("该条数据组织机构代码为空，不合法数据");
		            		  deptMapper.insertdeptmid(errorDeptView);
		            		  flag++;
		            		  continue;
		            	  }
		            	  //组织机构名称
		            	  if(StringUtils.isNotEmpty(name)){
		            		  deptView.setName(name);
		            	  }else{
		            		  //该条数据名字为空，不合法数据，记录到日志
		            		  sysimportinfo.setStatus(1);
		            		  sysimportinfo.setError("该条数据组织机构名称为空，不合法数据");
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            		  //
		            		  errorDeptView.setFlag("1");
		            		  errorDeptView.setErrordescribe("该条数据组织机构名称为空，不合法数据");
		            		  deptMapper.insertdeptmid(errorDeptView);
		            		  flag++;
		            		  continue;
		            	  }
		            	  //属性
		            	  if(StringUtils.isNotEmpty(attributeName)){
		            		  //deptView.setAttributeName(attributeName);
		            		  //如果字典表中不存在，不合法
		            		  //TODO
		            		  //SysCode syscode=sysCodeMapper.findSysid("14",attributeName);
		            		  String value=sysCodeMapper.getCodeByName("institution",attributeName);
		            		  if(value != null){
		            			  deptView.setAttribute(value);
		            		  }else{
		            			  //该条数据属性不存在，记录到日志
			            		  sysimportinfo.setStatus(1);
			            		  sysimportinfo.setError("该条数据属性不存在，不合法数据");
			            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
			            		  //
			            		  errorDeptView.setFlag("1");
			            		  errorDeptView.setErrordescribe("该条数据属性不存在，不合法数据");
			            		  deptMapper.insertdeptmid(errorDeptView);
			            		  flag++;
			            		  continue;
		            		  }
		            		  
		            	  }else{
		            		  //该条数据名字为空，不合法数据，记录到日志
		            		  sysimportinfo.setStatus(1);
		            		  sysimportinfo.setError("该条数据属性为空，不合法数据");
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            		  //
		            		  errorDeptView.setFlag("1");
		            		  errorDeptView.setErrordescribe("该条数据属性为空，不合法数据");
		            		  deptMapper.insertdeptmid(errorDeptView);
		            		  flag++;
		            		  continue;
		            	  }
		            	  //教室编号
		            	  if(StringUtils.isNotEmpty(areacode)){
		            		  //校验
//			            	  Map<String,Object> map=new HashMap<String, Object>();
//			            	  map.put("innerid", areacode);
			            	 //根据教室编号
			            	  AreaView areavo=areaService.findAreaByInnerid(areacode);
			            	  if (areavo == null){
			            		  sysimportinfo.setStatus(1);
			            		  sysimportinfo.setError("该条数据教室编号不存在，不合法数据");
			            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
			            		  //
			            		  errorDeptView.setFlag("1");
			            		  errorDeptView.setErrordescribe("该条数据教室编号不存在，不合法数据");
			            		  deptMapper.insertdeptmid(errorDeptView);
			            		  flag++;
			            		  continue;
			            	  }else{
			            		  deptView.setAreaid(areavo.getId());
			            	  }
		            	  }
		            	  //如果这个父机构名称不为空
		            	  DeptView deptViewparent=new DeptView();
		            	  String pid=deptViewimport.getParentid();
		            	  if(StringUtils.isNotEmpty(parentname)){
		            		  String[] tempparentname=parentname.split("_");
		            		  for(int j=0;j<tempparentname.length;j++){
		            			  deptView.setName(tempparentname[j]);
		            			  deptView.setParentid(pid);
		            			//根据parentid、name查一下，数据库中是否存在这个机构
			            		   deptViewparent=deptMapper.findDeptByName(deptView);
		            			  if(deptViewparent!=null){
		            				  pid=deptViewparent.getId();
		            			  }
		            			  else{
		            				  //该条数据不合法，需要记录到日志表中
				            		  sysimportinfo.setStatus(1);
				            		  sysimportinfo.setError("该条数据子机构:"+tempparentname[j]+"不存在，不合法数据");
				            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
				            		  //
				            		  errorDeptView.setFlag("1");
				            		  errorDeptView.setErrordescribe("该条数据子机构:"+tempparentname[j]+"不存在，不合法数据");
				            		  deptMapper.insertdeptmid(errorDeptView);
				            		  flag++;
				            		  continue a;
		            				 /* //新增这级机构
		            				  //如果不存在这个机构，树上创建这个机构
				            		  DeptView deptViewpid=new DeptView();
				            		  deptViewpid.setId(IdUtils.uuid2());
				            		  deptViewpid.setName(tempparentname[j]);
				            		  deptViewpid.setCode(((Math.random()*9000+1000)+"").substring(0, 4));
				            		  deptViewpid.setParentid(pid);
				            		  //必填项，这里给一个默认值
				            		  deptViewpid.setAttribute(deptView.getAttribute());
				            		  deptViewpid.setState("0");
				            		  saveDept(deptViewpid);
				            		  pid=deptViewpid.getId();*/
		            			  }
		            		  }
		            		  deptView.setParentid(pid);
		            		  deptView.setName(name);
		            		//组织机构名称，同区域下不能重复
		            		  int innercount=checkname(deptView);
		            		  if(innercount>0){
			            		  //该条数据不合法，需要记录到日志表中
			            		  sysimportinfo.setStatus(1);
			            		  sysimportinfo.setError("该条数据组织机构名称重复，不合法数据");
			            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
			            		  //
			            		  errorDeptView.setFlag("1");
			            		  errorDeptView.setErrordescribe("该条数据组织机构名称重复，不合法数据");
			            		  deptMapper.insertdeptmid(errorDeptView);
			            		  flag++;
			            		  continue;
			            	  }
		            		 /* else{
			            		  //第2列名字合法，可以新增或修改
			            		//导到这个新机构下面
				            	  if(codeView != null){
				            		//覆盖
				            		  deptView.setId(codeView.getId());
				            		  deptView.setCode(code);
				            		  LOG.debug("重复的code为："+code);
				            		  deptView.setState("0");
				            		  updateDept(deptView);flag++;
				            		  sysimportinfo.setStatus(0);
				            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
					            	  
				            	  }else{
				            		  //新增
				            		  deptView.setId(IdUtils.uuid2());
				            		  deptView.setCode(code);
				            		  deptView.setState("0");
				            		 // deptView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
				            		  saveDept(deptView);flag++;
				            		  sysimportinfo.setStatus(0);
				            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
					            	  
				            	  } 
				            	  continue;
			            	  }*/
		            	  }else{
		            		  //校验
				            	 //组织机构名称，同区域下不能重复
				            	  int innercount=checkname(deptView);
				            	  if(innercount>0){
				            		  //该条数据不合法，需要记录到日志表中
				            		  sysimportinfo.setStatus(1);
				            		  sysimportinfo.setError("该条数据组织机构名称重复，不合法数据");
				            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
				            		  //
				            		  errorDeptView.setFlag("1");
				            		  errorDeptView.setErrordescribe("该条数据组织机构名称重复，不合法数据");
				            		  deptMapper.insertdeptmid(errorDeptView);
				            		  flag++;
				            		  continue;
				            	  }
		            	  }
		            	  //组织机构代码重复，覆盖；不重复，新增
		            	  DeptView codeView=findDeptByCode(code);
		            	  //导到这个新机构下面
		            	  if(codeView != null){
		            		//覆盖
		            		  deptView.setId(codeView.getId());
		            		  deptView.setCode(code);
		            		  LOG.debug("重复的code为："+code);
		            		  deptView.setState("0");
		            		  updateDept(deptView);
		            		  sysimportinfo.setStatus(0);
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
			            	  
		            	  }else{
		            		  //新增
//		            		  deptView.setId(IdUtils.uuid2());
		            		  deptView.setCode(code);
		            		  deptView.setState("0");
		            		  deptView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		            		  saveDept(deptView);
		            		  sysimportinfo.setStatus(0);
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
			            	  
		            	  }
		            	  
		              }
				} catch (Exception e) {
					flag++;
					e.printStackTrace();
				}finally{
					if(flag >0 && flag< excelrow){
						msg.setId("2");
						msg.setName(systime);
						msg.setOperation("导入部分失败");
					}else if(flag == excelrow){
						msg.setId("0");
						msg.setName(systime);
						msg.setOperation("导入全部失败");
					}else if(flag == 0){
						msg.setId("1");
						msg.setName(systime);
						msg.setOperation("导入成功");
					}
					return msg;
				}
		}

	public List<DeptView> finddeptmid(String excelbatch, String flag) {
		return deptMapper.finddeptmid(excelbatch, flag);
	}

	public List<DeptView> findAreaIdByDeptId(String deptid) {
		
		return deptMapper.findAreaIdByDeptId(deptid);
	}
	@Transactional(readOnly = false)
	public int updateTreeBoot(String desktopName) {
		return deptMapper.updateTreeBoot(desktopName);
		
	}
	@Transactional(readOnly = false)
	public List<Map<String, Object>> findAll(String id) {
		return deptMapper.findAll(id);
		
	}
}
