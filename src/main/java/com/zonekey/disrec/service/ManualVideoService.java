package com.zonekey.disrec.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.DateTermUtil;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.AreaMapper;
import com.zonekey.disrec.dao.DeviceMapper;
import com.zonekey.disrec.dao.ManualVideoMapper;
import com.zonekey.disrec.entity.CourseInfo;
import com.zonekey.disrec.entity.ManualVideo;
import com.zonekey.disrec.entity.ScheduleTask;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeviceView;
import com.zonekey.disrec.vo.PageBean;

@Component
@Transactional(readOnly = true)
public class ManualVideoService extends BaseService{

	@Autowired
	private ManualVideoMapper manualVideoMapper;
	@Autowired
	private SysCodeService sysCodeService;
	@Autowired
	private AreaMapper areaMapper;
	@Autowired
	private DeviceMapper deviceMapper;

	@Transactional(readOnly = false)
	public Map<String, Object> saveManualVideo(ManualVideo manualVideo) {
		String folderName = "";
		String ftpPath = "";
		Map<String, Object> map = new HashMap<String, Object>();
		if(null==manualVideo){
			map.put("state", "0");
			return map;
		}
		String areaId = manualVideo.getAreaId();
		String id = IdUtils.uuid2();
		if (areaId!="") {
			manualVideo.setId(id);
			//通过区域id查找教室编号
			AreaView areaView = areaMapper.findAreaByid(areaId);
			//通过区域Id查找ip
			DeviceView deviceView = deviceMapper.getDeviceView(areaId);
			if (areaView!=null&&deviceView!=null) {
				String ip = deviceView.getIp();
				String innerId = areaView.getInnerid();
				String systime=DateTermUtil.getNowTime().replace(" ", "").replace("-", "").replace(":", "").trim();
				if (innerId!=""&&ip!="") {
					folderName = systime+innerId;
					manualVideo.setFolderName(folderName);
					ftpPath="ftp://"+manualVideo.getIp()+"/"+folderName;
					manualVideo.setFtpPath(ftpPath);
					int flag = manualVideoMapper.saveManualVideo(manualVideo);
					if (flag==1) {
						map.put("state", "1");
						map.put("manualVideo", manualVideo);
						return map;
					}
				}
			}
		}
		map.put("state", "0");
		return map;
	}

	public Page<ManualVideo> findPageBy(PageBean pageBean) {
		long total = manualVideoMapper.count(pageBean);
		List<ManualVideo> list = manualVideoMapper.findByPage(pageBean);
		Page<ManualVideo> page = new PageImpl<ManualVideo>(list,null,total);
		return page;
	}

	@Transactional(readOnly = false)
	public int updateEndTime(String id) {
		return manualVideoMapper.updateEndTime(id);
	}

	@Transactional(readOnly = false)
	public int updateVideoState(String id) {
		return manualVideoMapper.updateVideoState(id);
	}
	
	
	public ManualVideo getManualVideoByAreaId(String areaId){
		return manualVideoMapper.getManualVideoByAreaId(areaId);
	}
	
	

	@Transactional(readOnly = false)
	public int delete(List<Map<String, Object>> list) {
		if(null==list && list.size()==0){
			return 0;
		}
		return manualVideoMapper.deleteManualVideo(list);
	}
	
	/**
	 * 根据教室ID获取手动录像的的基本信息。同课表一块下发到代理中
	 * @param areaId
	 * @return
	 */
	public ScheduleTask getScheduleTaskByAreaId(String areaId) {
		ManualVideo manualVideo=manualVideoMapper.getManualVideoByAreaId(areaId);
		if (manualVideo==null) return null;
		if ("".equals(manualVideo.getEndTime())||"0000-00-00 00:00:00".equals(manualVideo.getEndTime())) return null;
		ScheduleTask scheduleTask=new ScheduleTask();
		CourseInfo courseInfo=new CourseInfo();
		scheduleTask.setDirectoryName(manualVideo.getFolderName());
		courseInfo.setDepartment("无");
		courseInfo.setSubject(manualVideo.getTitle());
		courseInfo.setCourseName("");
		courseInfo.setTeacher(manualVideo.getUserName());
		courseInfo.setGrade("");
		courseInfo.setAddress(manualVideo.getAreaName());
		courseInfo.setDescription("");
		scheduleTask.setCourseInfo(courseInfo);
		scheduleTask.setRecording("true");
			
		String mode=sysCodeService.getModeByCode(manualVideo.getModelValue());
		scheduleTask.setStartTime(manualVideo.getStartTime());
		scheduleTask.setStopTime("");
		scheduleTask.setLiving("true");
		scheduleTask.setLivingMode(mode);
		scheduleTask.setRecordMode(mode);
		scheduleTask.setStartMode("Manual");
	
		
		return scheduleTask;
	}

	@Transactional(readOnly = false)
	public int delManualVideoById(String id) {
		
		return manualVideoMapper.delManualVideoById(id);
	}
	
	
}
