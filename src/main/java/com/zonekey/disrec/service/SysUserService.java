/*****************************
* Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.jsoup.Connection;
import org.jsoup.Connection.Method;
import org.jsoup.Connection.Response;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.zonekey.disrec.common.DateTermUtil;
import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.common.utils.MD5Utils;
import com.zonekey.disrec.dao.DeptMapper;
import com.zonekey.disrec.dao.SysCodeMapper;
import com.zonekey.disrec.dao.SysUserMapper;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.entity.SysUserRole;
import com.zonekey.disrec.entity.Sysimportinfo;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.DeptView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.SysUserView;

/**
 * @Title: @{#} SysUserService.java
 * @Description: <p>SysUser实体业务类</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class SysUserService extends BaseService {

	@Autowired
	private SysUserMapper sysuserMapper;
	@Autowired
	private SysimportinfoService sysimportinfoService;
	@Autowired
	private SysUserRoleService sysUserRoleService;
	@Autowired
	private SysCodeMapper sysCodeMapper;
	@Autowired
	private DeptMapper deptMapper;
	
    @Autowired
	private ServerService serverService;
	
	public int excelrow=1;
	public SysUser getSysUser(String id) {
		return sysuserMapper.findOne(id);
	}
	
	public Page<SysUserView> findPageBy(PageBean pageBean) {
		long total = sysuserMapper.count(pageBean);
		List<SysUserView> list = sysuserMapper.findByPage(pageBean);
		Page<SysUserView> page = new PageImpl<SysUserView>(list,null,total);
		return page;
		
	}

	@Transactional(readOnly = false)
	public int saveSysUser(SysUserView sysUserView) {
		if(sysUserView == null || sysUserView.getLoginname()==null|| sysUserView.getPassword()==null||sysUserView.getName()==null||sysUserView.getDeptid()==null){
			return 0;
		}
		sysUserView.setId(IdUtils.uuid2());
		sysUserView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		String password = MD5Utils.md5(sysUserView.getPassword());
		sysUserView.setPassword(password);
		SysUserRole sysUserRole = new SysUserRole();
		sysUserRole.setUserid(sysUserView.getLoginname());
		//'1'角色为老师
		if("1".equals(sysUserView.getUsertype())){
		    sysUserRole.setRoleid("1");
		    sysUserRoleService.saveUserRole(sysUserRole);
		}
//		//'2'角色为学生
		else if("2".equals(sysUserView.getUsertype())){
//		    sysUserRole.setRoleid("flowSnow");
		}
//		//默认为老师
//		else{
//		    sysUserRole.setRoleid("1");
//		}
		return sysuserMapper.insert(sysUserView);
	}
	
	@Transactional(readOnly = false)
	public int updateSysUser(SysUser sysUser) {
		if(sysUser == null || sysUser.getLoginname()==null){
			return 0;
		}
//		if(sysUser.getPassword() != null){
//			String password = MD5Utils.md5(sysUser.getPassword());
//			sysUser.setPassword(password);
//		}
		
		sysUser.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		//获得被修改用户的用户登录名
		String loginname = sysUser.getLoginname();
		//用户类型"1"为老师，"3"为学生
		String userType = sysUser.getUsertype();
		//如果修改用户角色为老师，将入学年份置为空
		if("1".equals(userType)){
		    sysUser.setSchoolyear(null);
		}
		//修改用户默认的角色
		sysUserRoleService.modifyUserRole(loginname,userType);
		return sysuserMapper.update(sysUser);
	}
	@Transactional(readOnly = false)
	public int updateSysUserMessage(SysUser sysUser) {
		if(sysUser == null || sysUser.getLoginname()==null){
			return 0;
		}
		if(sysUser.getPassword() != null){
			String password = MD5Utils.md5(sysUser.getPassword());
			sysUser.setPassword(password);
		}
		
		sysUser.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		//获得被修改用户的用户登录名
		String loginname = sysUser.getLoginname();
		//用户类型"1"为老师，"3"为学生
		String userType = sysUser.getUsertype();
		//如果修改用户角色为老师，将入学年份置为空
		if("1".equals(userType)){
		    sysUser.setSchoolyear(null);
		}
		//修改用户默认的角色
		sysUserRoleService.modifyUserRole(loginname,userType);
		return sysuserMapper.update(sysUser);
	}
	
	@Transactional(readOnly = false)
	public int updateLoginDateAndIp(String loginName,String ip){
		if(loginName == null || "".equals(loginName) || null == ip || "".equals(ip)){
			return 0;
		}
		return sysuserMapper.updateLoginDateAndIp(loginName,ip);
	}

	@Transactional(readOnly = false)
	public int deleteSysUser(List<Map<String,Object>> list) {
		if(list == null){
			return 0;
		}
		sysuserMapper.delete(list,ShiroDbRealm.getCurrentLoginName());
		return 1;
	}
	
	
	public Map<String,String> loginCMS(String username,String password) {
		Map<String, String> datas=new HashMap<String, String>();
		String urlString="http://"+serverService.getCMSServer()+"/zonekeyeos/a/login";
		Connection con=Jsoup.connect(urlString).timeout(120000);//获取连接
		con.header("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:29.0) Gecko/20100101 Firefox/29.0");//配置模拟浏览器
		Response rs = null;
		try {
			rs = con.execute();
		} catch (IOException e1) {
			e1.printStackTrace();
		}//获取响应
		Document doc=Jsoup.parse(rs.body());//转换为Dom树
		List<Element> et= doc.select("form");//获取form表单，可以通过查看页面源码代码得知
		for(Element e:et.get(0).getAllElements()){
		   if(e.attr("name").equals("username")){
			   e.attr("value", "thinkgem");//设置用户名
		   }
		   if(e.attr("name").equals("password")){
			   e.attr("value","admin"); //设置用户密码
		   }
		   if(e.attr("name").length()>0){//排除空值表单属性
			   datas.put(e.attr("name"), e.attr("value"));  
		   }
		 }
	 
		 /**
		  * 第二次请求，post表单数据，以及cookie信息
		  * 
		  * **/
		 Connection con2=Jsoup.connect(urlString);
		 con2.header("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:29.0) Gecko/20100101 Firefox/29.0");
		 //设置cookie和post上面的map数据
		 Response login = null;
		try {
			login = con2.data(datas).method(Method.POST).execute();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		  return login.cookies();
	}
	
	public int check(SysUser sysUser) {
		return sysuserMapper.check(sysUser);
	}
	
	public Page<SysUserView> findRangeByPage(PageBean pageBean) {
		
		long total = sysuserMapper.rangeCount(pageBean);
		List<SysUserView> sysUsers = sysuserMapper.findRangeByPage(pageBean);
		Page<SysUserView> page = new PageImpl<SysUserView>(sysUsers,null,total);
		return page;
	}
	public List<SysUserView> getRangeUser(SysUserView sysUserView) {
		List<SysUserView> sysUsers = sysuserMapper.findRangeUser(sysUserView);
		return sysUsers;
	}
	
	public SysUserView findByLoginname(String loginname,String password) {
		return sysuserMapper.findByLoginname(loginname,password);
	}
	
	public SysUserView finduserByLoginname(String loginname) {
		return sysuserMapper.finduserByLoginname(loginname);
	}
	public Map<String,Object> getValidate(String loginname){
		return sysuserMapper.getValidate(loginname);
	}
	@Transactional(readOnly = false)
	public int addEmailCode(String loginname,String validateCode){
		return sysuserMapper.addEmailCode(loginname,validateCode);
	}
	
	@Transactional(readOnly = false)
	public int modifyPwd(SysUser user){
		return sysuserMapper.modifyPwd(user);
	}
	//读取excel，并将数据插入到临时表里(这里可以不返回list，返回批次号也可以，以后看情况改过来)
	@SuppressWarnings("finally")
	@Transactional(readOnly = false)
		public JsonMsg readExcel(SysUserView sysUserView ,MultipartFile file)throws Exception{ 
			int flag=0;
			 Workbook book;
			 String systime=DateTermUtil.getNowTime().replace(" ", "").replace("-", "").replace(":", "").trim();
			 JsonMsg msg = new JsonMsg();
				try {
					book = Workbook.getWorkbook(file .getInputStream());
					 //读取sheet
		             Sheet sheet=book.getSheet(0); 
		             int row = sheet.getRows();
		             excelrow=row-1;
		              a:for(int i = 1; i < row; i++) {
		            	  SysUserView addsysUserView=new SysUserView();
		            	  addsysUserView.setDeptid(sysUserView.getDeptid());
		            	  //日志类
		            	  Sysimportinfo sysimportinfo=new Sysimportinfo();
		            	  sysimportinfo.setImportid(systime);
		            	  sysimportinfo.setImportdate(DateTermUtil.getNowTime());
		            	  sysimportinfo.setExcelid(i);
		            	  String loginname=sheet.getCell(0,i).getContents();
		            	  String password=sheet.getCell(1,i).getContents();
		            	  String name=sheet.getCell(2,i).getContents();
		            	  String sexName=sheet.getCell(3,i).getContents();
		            	  String usertypeName=sheet.getCell(4,i).getContents();
		            	  String schoolyear=sheet.getCell(5,i).getContents();
		            	  String email=sheet.getCell(6,i).getContents();
		            	  String phone=sheet.getCell(7,i).getContents();
		            	//父节点
		            	  String parentname=sheet.getCell(8,i).getContents();
		            	  addsysUserView.setEmail(email);
		            	  addsysUserView.setPhone(phone);
		            	  //默认有效
//		            	  addsysUserView.setStatus("20");
		            	  SysUserView errorSysUserView=new SysUserView();
		            	  errorSysUserView.setId(IdUtils.uuid2());
		            	  errorSysUserView.setLoginname(loginname);
		            	  errorSysUserView.setPassword(password);
		            	  errorSysUserView.setName(name);
		            	  errorSysUserView.setSexName(sexName);
		            	  errorSysUserView.setUsertypeName(usertypeName);
		            	  errorSysUserView.setSchoolyear(schoolyear);
		            	  errorSysUserView.setEmail(email);
		            	  errorSysUserView.setPhone(phone);
		            	  errorSysUserView.setDeptName(parentname);
		            	  errorSysUserView.setExcelbatch(systime);
		            	  errorSysUserView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		            	  //判断用户账号不能为空
		            	  if(StringUtils.isNotEmpty(loginname)){
		            		  addsysUserView.setLoginname(loginname);
		            	  }else{
		            		  //该条数据教室编号为空，不合法数据，记录到日志
		            		  sysimportinfo.setStatus(1);
		            		  sysimportinfo.setError("该条数据用户账号为空，不合法数据");
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            		  //
		            		  errorSysUserView.setFlag("1");
		            		  errorSysUserView.setErrordescribe("该条数据用户账号为空，不合法数据");
		            		  sysuserMapper.insertsysusermid(errorSysUserView);
		            		  flag++;
		            		  continue;
		            	  }
		            	  //判断用户账号不能为空
		            	  if(StringUtils.isNotEmpty(password)){
		            		  addsysUserView.setPassword(MD5Utils.md5(password));
		            	  }else{
		            		  //该条数据教室编号为空，不合法数据，记录到日志
		            		  sysimportinfo.setStatus(1);
		            		  sysimportinfo.setError("该条数据用户密码为空，不合法数据");
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            		  //
		            		  errorSysUserView.setFlag("1");
		            		  errorSysUserView.setErrordescribe("该条数据用户密码为空，不合法数据");
		            		  sysuserMapper.insertsysusermid(errorSysUserView);
		            		  flag++;
		            		  continue;
		            	  }
		            	//判断用户姓名不能为空
		            	  if(StringUtils.isNotEmpty(name)){
		            		  addsysUserView.setName(name);
		            	  }else{
		            		  //该条数据名字为空，不合法数据，记录到日志
		            		  sysimportinfo.setStatus(1);
		            		  sysimportinfo.setError("该条数据用户姓名为空，不合法数据");
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            		  //
		            		  errorSysUserView.setFlag("1");
		            		  errorSysUserView.setErrordescribe("该条数据用户姓名为空，不合法数据");
		            		  sysuserMapper.insertsysusermid(errorSysUserView);
		            		  flag++;
		            		  continue;
		            	  }
		            	  //用户性别不能为空
		            	  if(StringUtils.isNotEmpty(sexName)){
		            		  //addsysUserView.setSexName(sexName);
		            		  //SysCode syscode=sysCodeMapper.findSysid("25",sexName);
		            		  String value=sysCodeMapper.getCodeByName("sex",sexName);
		            		  if(value != null){
		            			  addsysUserView.setSex(value);
		            		  }else{
		            			  //该条数据属性不存在，记录到日志
			            		  sysimportinfo.setStatus(1);
			            		  sysimportinfo.setError("该条数据性别不存在，不合法数据");
			            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
			            		  //
			            		  errorSysUserView.setFlag("1");
			            		  errorSysUserView.setErrordescribe("该条数据性别不存在，不合法数据");
			            		  sysuserMapper.insertsysusermid(errorSysUserView);
			            		  flag++;
			            		  continue;
		            		  }
		            	  }else{
		            		  //该条数据用户性别为空，不合法数据，记录到日志
		            		  sysimportinfo.setStatus(1);
		            		  sysimportinfo.setError("该条数据用户性别为空，不合法数据");
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            		  //
		            		  errorSysUserView.setFlag("1");
		            		  errorSysUserView.setErrordescribe("该条数据用户性别为空，不合法数据");
		            		  sysuserMapper.insertsysusermid(errorSysUserView);
		            		  flag++;
		            		  continue;
		            	  }
		            	  //用户类型不能为空
		            	  if(StringUtils.isNotEmpty(usertypeName)){
		            		  //SysCode syscode=sysCodeMapper.findSysid("d20987a74f9347a2a34acf400580af7c",usertypeName);
		            		  String value=sysCodeMapper.getCodeByName("identity",usertypeName);
		            		  if(value != null){
		            			  addsysUserView.setUsertype(value);
		            		  }else{
		            			  //该条数据属性不存在，记录到日志
			            		  sysimportinfo.setStatus(1);
			            		  sysimportinfo.setError("该条数据用户类型不存在，不合法数据");
			            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
			            		  //
			            		  errorSysUserView.setFlag("1");
			            		  errorSysUserView.setErrordescribe("该条数据用户类型不存在，不合法数据");
			            		  sysuserMapper.insertsysusermid(errorSysUserView);
			            		  flag++;
			            		  continue;
		            		  }
		            		//如果用户类型为学生，入学年份必填
		            		  if(usertypeName.equals("学生")){
		            			  if(StringUtils.isNotEmpty(schoolyear)){
			            			  addsysUserView.setSchoolyear(schoolyear);
			            		  }else{
			            			  //该条数据用户类型为空，不合法数据，记录到日志
				            		  sysimportinfo.setStatus(1);
				            		  sysimportinfo.setError("该条数据入学年份为空，不合法数据");
				            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
				            		  //
				            		  errorSysUserView.setFlag("1");
				            		  errorSysUserView.setErrordescribe("该条数据入学年份为空，不合法数据");
				            		  sysuserMapper.insertsysusermid(errorSysUserView);
				            		  flag++;
				            		  continue;
			            		  }
		            		  }
		            		 
		            	  }else{
		            		  //该条数据用户类型为空，不合法数据，记录到日志
		            		  sysimportinfo.setStatus(1);
		            		  sysimportinfo.setError("该条数据用户类型为空，不合法数据");
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            		  //
		            		  errorSysUserView.setFlag("1");
		            		  errorSysUserView.setErrordescribe("该条数据用户类型为空，不合法数据");
		            		  sysuserMapper.insertsysusermid(errorSysUserView);
		            		  flag++;
		            		  continue;
		            	  }
		            	  //2015-01-28
		            	  //如果这个父机构名称不为空
		            	  DeptView deptViewparent=new DeptView();
		            	  String pid=sysUserView.getDeptid();
		            	  if(StringUtils.isNotEmpty(parentname)){
		            		  String[] tempparentname=parentname.split("_");
		            		  for(int j=0;j<tempparentname.length;j++){
		            			  DeptView deptView=new DeptView();
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
				            		  errorSysUserView.setFlag("1");
				            		  errorSysUserView.setErrordescribe("该条数据子机构:"+tempparentname[j]+"不存在，不合法数据");
				            		  sysuserMapper.insertsysusermid(errorSysUserView);
				            		  flag++;
				            		  continue a;
		            			  }
		            		  }
		            	  }
		            	 try{
		            	 //根据用户账号查询用户信息，如果存在则更新，不存在心中
		            	  SysUserView sysUserVo=finduserByLoginname(loginname);
		            	  if(sysUserVo !=null){
		            		  //更新
		            		  addsysUserView.setId(sysUserVo.getId());
		            		  addsysUserView.setDeptid(pid);
		            		  addsysUserView.setStatus("0");
		            		  updateSysUser(addsysUserView);
		            	  }else{
		            		  //新增
		            		  addsysUserView.setStatus("0");
		            		  addsysUserView.setDeptid(pid);
		            		  saveSysUser(addsysUserView);
		            	  }
		            	 }catch(Exception e){
		            		 e.printStackTrace();
		            	 }
		            	  sysimportinfo.setStatus(0);
		            	  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            	  
		            	 
		              }
				} catch (Exception e) {
					flag++;
					e.printStackTrace();
				}
				finally{
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
	public List<SysUserView> findsysusermid(String excelbatch,String flag){
		return sysuserMapper.findsysusermid(excelbatch, flag);
	}
}
