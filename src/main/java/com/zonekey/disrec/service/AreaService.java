/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.zonekey.disrec.common.DateTermUtil;
import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.common.utils.RegexUtils;
import com.zonekey.disrec.dao.AreaMapper;
import com.zonekey.disrec.dao.DeptMapper;
import com.zonekey.disrec.dao.DeviceMapper;
import com.zonekey.disrec.entity.Sysimportinfo;
import com.zonekey.disrec.service.auth.ShiroDbRealm;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeptView;
import com.zonekey.disrec.vo.DeviceView;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.Tree;

/**
 * @Title: @{#} AreaService.java
 * @Description: <p>
 *               Area实体业务类
 *               </p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月20日 下午7:37:47
 * @version v 1.0
 */
@Component
@Transactional(readOnly = true)
public class AreaService extends BaseService {

	@Autowired
	private AreaMapper areaMapper;
	@Autowired
	private DeviceMapper deviceMapper;
	@Autowired
	private SysimportinfoService sysimportinfoService;
	@Autowired
	private DeptMapper deptMapper;
	@Autowired
	private DeviceService deviceService;
	@Autowired
	private ServerService serverService;
	public int excelrow = 1;

	public Page<AreaView> findPageBy(PageBean pageBean) {
		long total = areaMapper.count(pageBean);
		List<AreaView> list = areaMapper.findByPage(pageBean);
		Page<AreaView> page = new PageImpl<AreaView>(list, null, total);
		return page;
	}

	public Page<AreaView> findClassRooms(PageBean pageBean, HttpServletRequest req) {
		long total = areaMapper.count(pageBean);
		List<AreaView> list = areaMapper.findClassRooms(pageBean);
		Page<AreaView> page = new PageImpl<AreaView>(list, null, total);
		return page;
	}
	public Page<AreaView> findClassRooms(PageBean pageBean) {
		long total = areaMapper.countByMobile(pageBean);
		List<AreaView> list = areaMapper.findClassRoomsByMobile(pageBean);
		Page<AreaView> page = new PageImpl<AreaView>(list, null, total);
		return page;
	}

	public List<Map<String, Object>> findByName(Map<String, Object> map) {
		List<Map<String, Object>> list = areaMapper.findByName(map);
		return list;
	}

	public int findCountByName(Map<String, Object> map) {
		return areaMapper.findCountByName(map);
	}

	public AreaView findAreaByName(Map<String, Object> map) {
		return areaMapper.findAreaByName(map);
	}

	public int findByInnerid(Map<String, Object> map) {
		return areaMapper.findByInnerid(map);
	}

	@Transactional(readOnly = false)
	public int saveArea(AreaView areaView) {
		if (areaView == null || areaView.getName() == null || areaView.getAttribute() == null) {
			return 0;
		}
		// areaView.setId(IdUtils.uuid2());
		areaView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
		LOG.info("保存区域成功");
		logAop(1);
		return areaMapper.insert(areaView);
	}

	@Transactional(readOnly = false)
	public int updateArea(AreaView areaView) {
		if (areaView == null || areaView.getId() == null) {
			return 0;
		}
		areaView.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		LOG.info("修改区域成功");
		logAop(1);
		return areaMapper.update(areaView);
	}

	@Transactional(readOnly = false)
	public int deleteArea(AreaView areaView) {
		if (areaView == null || areaView.getId() == null) {
			return 0;
		}
		areaView.setModifyuser(ShiroDbRealm.getCurrentLoginName());
		if ("N".equals(areaView.getAttribute())) {
			
			List<AreaView> list = areaMapper.findAllClassRooms(areaView);
			LOG.info("该区域下有多少间教室："+ list.size());
			for(AreaView areaview:list){
				deviceMapper.deleteBy(areaview);
			}
			areaMapper.deleteBy(areaView);
		}else{
			deviceMapper.deleteBy(areaView);
		}
		LOG.info("删除区域成功");
		logAop(1);
		areaMapper.delete(areaView);
		return 1;
	}

	/**
	 * 获取区域树
	 * 
	 * @return
	 */
	public List<Tree> getAreaTree() {
		return areaMapper.getAreaTree();
	}

	/**
	 * 获取区域树
	 * 
	 * @return
	 */
	public List<Tree> getAreaTrees() {
		return areaMapper.getAreaTrees();
	}

	/**
	 * 导入验证用户,班级,教室是否存在
	 * 
	 * @return
	 */
	public Map<String, Object> getCheck(Map<String, Object> map) {
		return areaMapper.getCheck(map);
	}

	/**
	 * 根据教室编号查教室
	 * 
	 * @return
	 */
	public AreaView findAreaByInnerid(String innerid) {
		return areaMapper.findAreaByInnerid(innerid);
	}

	// 读取excel，并将数据插入到临时表里(这里可以不返回list，返回批次号也可以，以后看情况改过来)
	@SuppressWarnings("finally")
	@Transactional(readOnly = false)
	public JsonMsg readExcel(AreaView areaViewimport, MultipartFile file) throws Exception {
		int flag = 0;
		List<AreaView> list1 = new ArrayList<AreaView>();
		Workbook book;
		String systime = DateTermUtil.getNowTime().replace(" ", "").replace("-", "").replace(":", "").trim();
		JsonMsg msg = new JsonMsg();
		try {
			book = Workbook.getWorkbook(file.getInputStream());
			// 读取sheet
			Sheet[] sheets = book.getSheets();
			Sheet sheet = book.getSheet(0);
			int row = sheet.getRows();
			excelrow = row - 1;
			a: for (int i = 1; i < row; i++) {
				AreaView areaView = new AreaView();
				areaView.setParentid(areaViewimport.getParentid());
				// 日志类
				Sysimportinfo sysimportinfo = new Sysimportinfo();
				sysimportinfo.setImportid(systime);
				// sysimportinfo.setImportdate(DateTermUtil.getNowTime());
				sysimportinfo.setExcelid(i);
				String innerid = sheet.getCell(0, i).getContents();
				String name = sheet.getCell(1, i).getContents();
				// 父节点
				String parentname = sheet.getCell(2, i).getContents();
				String devicename = sheet.getCell(3, i).getContents();
				String ip = sheet.getCell(4, i).getContents();
				String mac = sheet.getCell(5, i).getContents();
				AreaView areaViewerror = new AreaView();
				areaViewerror.setId(IdUtils.uuid2());
				areaViewerror.setInnerid(innerid);
				areaViewerror.setName(name);
				areaViewerror.setParentname(parentname);
				areaViewerror.setDevicename(devicename);
				areaViewerror.setIp(ip);
				areaViewerror.setMac(mac.toUpperCase());
				areaViewerror.setExcelbatch(systime);
				areaViewerror.setCreateuser(ShiroDbRealm.getCurrentLoginName());
				if (StringUtils.isNotEmpty(innerid)) {
					areaView.setInnerid(innerid);
				} else {
					// 该条数据教室编号为空，不合法数据，记录到日志
					sysimportinfo.setStatus(1);
					sysimportinfo.setError("该条数据教室编号为空，不合法数据");
					sysimportinfoService.insertSysimportinfo(sysimportinfo);
					//
					areaViewerror.setFlag("1");
					areaViewerror.setErrordescribe("该条数据教室编号为空，不合法数据");
					areaMapper.insertareamid(areaViewerror);
					flag++;
					continue;
				}
				if (StringUtils.isNotEmpty(name)) {
					areaView.setName(name);
				} else {
					// 该条数据名字为空，不合法数据，记录到日志
					sysimportinfo.setStatus(1);
					sysimportinfo.setError("该条数据教室名字为空，不合法数据");
					sysimportinfoService.insertSysimportinfo(sysimportinfo);
					//
					areaViewerror.setFlag("1");
					areaViewerror.setErrordescribe("该条数据教室名字为空，不合法数据");
					areaMapper.insertareamid(areaViewerror);
					flag++;
					continue;
				}
				// 2015-01-28
				// 如果这个父机构名称不为空
				// DeptView deptViewparent=new DeptView();
				String pid = areaView.getParentid();
				if (StringUtils.isNotEmpty(parentname)) {
					String[] tempparentname = parentname.split("_");
					for (int j = 0; j < tempparentname.length; j++) {
						// DeptView deptView=new DeptView();
						// deptView.setName(tempparentname[j]);
						// deptView.setParentid(pid);
						// 根据parentid、name查一下，数据库中是否存在这个机构
						// deptViewparent=deptMapper.findDeptByName(deptView);
						// 校验
						Map<String, Object> map = new HashMap<String, Object>();
						map.put("attribute", "N");
						map.put("name", tempparentname[j]);
						map.put("parentid", pid);
						// 根据教室编号
						AreaView areaViewpid = findAreaByName(map);
						if (areaViewpid != null) {
							pid = areaViewpid.getId();
						} else {
							// 该条数据不合法，需要记录到日志表中
							sysimportinfo.setStatus(1);
							sysimportinfo.setError("该条数据子机构:" + tempparentname[j] + "不存在，不合法数据");
							sysimportinfoService.insertSysimportinfo(sysimportinfo);
							//
							areaViewerror.setFlag("1");
							areaViewerror.setErrordescribe("该条数据子机构:" + tempparentname[j] + "不存在，不合法数据");
							areaMapper.insertareamid(areaViewerror);
							flag++;
							continue a;
						}
					}
				}
				// 校验
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("attribute", "Y");
				map.put("name", name);
				map.put("parentid", pid);
				map.put("innerid", innerid);
				// 根据教室编号
				int innercount = findByInnerid(map);
				if (innercount > 0) {
					// 该条数据不合法，需要记录到日志表中
					sysimportinfo.setStatus(1);
					sysimportinfo.setError("该条数据教室编号重复，不合法数据");
					sysimportinfoService.insertSysimportinfo(sysimportinfo);
					//
					areaViewerror.setFlag("1");
					areaViewerror.setErrordescribe("该条数据教室编号重复，不合法数据");
					areaMapper.insertareamid(areaViewerror);
					flag++;
					continue;
				}
				// 根据name查询教室
				int namecount = findCountByName(map);
				if (namecount > 0) {
					// 该条数据不合法，需要记录到日志表中
					sysimportinfo.setStatus(1);
					sysimportinfo.setError("该条数据教室名称重复，不合法数据");
					sysimportinfoService.insertSysimportinfo(sysimportinfo);
					//
					areaViewerror.setFlag("1");
					areaViewerror.setErrordescribe("该条数据教室名称重复，不合法数据");
					areaMapper.insertareamid(areaViewerror);
					flag++;
					continue;
				}
				areaView.setParentid(pid);
				areaView.setAttribute("Y");
				areaView.setState("0");
				areaView.setCreateuser(ShiroDbRealm.getCurrentLoginName());
				// 如果设备名称、IP地址，mac均不为空时
				if (StringUtils.isNotEmpty(devicename) && StringUtils.isNotEmpty(ip) && StringUtils.isNotEmpty(mac)) {
					// ip和mac进行正则表达式的校验
					if (RegexUtils.isIP(ip)) {
						if (RegexUtils.isMAC(mac)) {
							// 设备名称是否重复的检验，不用检验
							// mac是否重复的检验
							DeviceView deviceView = new DeviceView();
							deviceView.setName(devicename);
							deviceView.setTypeid("1");
							deviceView.setIp(ip);
							deviceView.setMac(mac.toUpperCase());
							int maccount = deviceService.checkMac(deviceView);
							if (maccount > 0) {// mac重复 不合法
								// 该条数据不合法，需要记录到日志表中
								sysimportinfo.setStatus(1);
								sysimportinfo.setError("该条数据MAC重复，不合法数据");
								sysimportinfoService.insertSysimportinfo(sysimportinfo);
								//
								areaViewerror.setFlag("1");
								areaViewerror.setErrordescribe("该条数据MAC重复，不合法数据");
								areaMapper.insertareamid(areaViewerror);
								flag++;
								continue;
							} else {

								areaView.setId(IdUtils.uuid2());
								saveArea(areaView);
								deviceView.setAreaid(areaView.getId());
								deviceService.saveDevice(deviceView);
								sysimportinfo.setStatus(0);
								sysimportinfoService.insertSysimportinfo(sysimportinfo);
							}
						} else {
							// 该条数据不合法，需要记录到日志表中
							sysimportinfo.setStatus(1);
							sysimportinfo.setError("该条数据MAC格式不规范，不合法数据");
							sysimportinfoService.insertSysimportinfo(sysimportinfo);
							//
							areaViewerror.setFlag("1");
							areaViewerror.setErrordescribe("该条数据MAC格式不规范，不合法数据");
							areaMapper.insertareamid(areaViewerror);
							flag++;
							continue;
						}
					} else {
						// 该条数据不合法，需要记录到日志表中
						sysimportinfo.setStatus(1);
						sysimportinfo.setError("该条数据ip格式不规范，不合法数据");
						sysimportinfoService.insertSysimportinfo(sysimportinfo);
						//
						areaViewerror.setFlag("1");
						areaViewerror.setErrordescribe("该条数据ip格式不规范，不合法数据");
						areaMapper.insertareamid(areaViewerror);
						flag++;
						continue;
					}
				} else {
					areaView.setId(IdUtils.uuid2());
					saveArea(areaView);
					sysimportinfo.setStatus(0);
					sysimportinfoService.insertSysimportinfo(sysimportinfo);
				}

			}

		} catch (BiffException e) {
			// TODO Auto-generated catch block
			flag++;
			e.printStackTrace();
		} finally {
			if (flag > 0 && flag < excelrow) {
				msg.setId("2");
				msg.setName(systime);
				msg.setOperation("导入部分失败");
			} else if (flag == excelrow) {
				msg.setId("0");
				msg.setName(systime);
				msg.setOperation("导入全部失败");
			} else if (flag == 0) {
				msg.setId("1");
				msg.setName(systime);
				msg.setOperation("导入成功");
			}
			return msg;
		}
	}

	/**
	 * 查询导入不合格的数据
	 * 
	 * @param excelbatch
	 * @param flag
	 * @return
	 */
	public List<AreaView> findareamid(String excelbatch, String flag) {
		return areaMapper.findareamid(excelbatch, flag);
	}

	@Transactional(readOnly = false)
	public int insertVersion() {
		return areaMapper.insertVersion();
	}

	public Page<Map<String, Object>> findVersionPageBy(PageBean pageBean) {
		long total = areaMapper.versionCount(pageBean);
		List<Map<String, Object>> list = areaMapper.findVersionByPage(pageBean);
		Page<Map<String, Object>> page = new PageImpl<Map<String, Object>>(list, null, total);
		return page;
	}

	/**
	 * 根据id 查找教室，课程，设备，老师信息
	 * 
	 * @param id
	 * @return
	 */
	@Transactional(readOnly = true)
	public AreaView getDetailById(String id) {
		if (id == null || "".equals(id)) {
			return null;
		} else {
			return areaMapper.findDetailById(id);
		}
	}
public List<AreaView> findAreaIdByDeptId(String deptid) {
		
		return areaMapper.findAreaIdByDeptId(deptid);
	}
@Transactional(readOnly = false)
public int updateTreeBoot(String desktopName) {
	return areaMapper.updateTreeBoot(desktopName);
	
}

public List<Tree> getAreaTreeAndCount() {
	return areaMapper.getAreaTreeAndCount();
}

public String refresh(String macs) {
	String ipPort = serverService.getWebServer();
	String url = "http://"+ipPort+"/deviceService/refresh";
	String message = CommonUtil.sendGet(url,"mac="+macs);
	return message;
}
}
