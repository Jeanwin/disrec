package com.zonekey.disrec.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.TimeTaskMapper;
import com.zonekey.disrec.entity.TimeTask;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.PageBean;

@Component
@Transactional(readOnly = true)
public class TimeTaskService extends BaseService{

	@Autowired
	private TimeTaskMapper timeTaskMapper;
	
	@Transactional(readOnly = false)
	public int saveTimeTask(TimeTask timeTask) {
		if(null==timeTask){
			return 0;
		}
		timeTask.setId(IdUtils.uuid2());
		String week = getWeek(timeTask);
		timeTask.setWeek(week);
		timeTaskMapper.saveTimeTask(timeTask);
		saveTimeTaskArea(timeTask);
		return 1;
	}

	@Transactional(readOnly = false)
	public int saveTimeTaskArea(TimeTask timeTask){
		List<Map<String, Object>> list = timeTask.getAreas();
		for (Map<String, Object> map : list) {
			map.put("id1", IdUtils.uuid2());
		}
		return timeTaskMapper.saveTimeTaskArea(timeTask);
	}
	
	@Transactional(readOnly = false)
	public int updateTimeTask(TimeTask timeTask) {
		if(null==timeTask){
			return 0;
		}
		String week = getWeek(timeTask);
		timeTask.setWeek(week);
		timeTaskMapper.updateTimeTask(timeTask);
		timeTaskMapper.deleteTimeTaskArea(timeTask);
		saveTimeTaskArea(timeTask);
		return 1;
	}

	@Transactional(readOnly = false)
	public int deleteTimeTask(List<Map<String, Object>> list) {
		if(null==list && list.size()>0){
			return 0;
		}
		timeTaskMapper.deleteTimeTask(list);
		timeTaskMapper.deleteTimeArea(list);
		return 1;
	}

	public Page<TimeTask> findPageBy(PageBean pageBean) {
		long total = timeTaskMapper.count(pageBean);
		List<TimeTask> list = timeTaskMapper.findByPage(pageBean);
		for (TimeTask timeTask : list) {
			Map<String, Object> map = new HashMap<String, Object>();
			String w = timeTask.getWeek();
			if(null!=w&&w!=""){
				String[] weeks = w.split("、");
				for (String week : weeks) {
					if("一".equals(week)){
						map.put("Mon", true);
					}else {
						map.put("Mon", false);
					}
					if("二".equals(week)){
						map.put("Tues", true);
					}else{
						map.put("Tues", false);
					}
					if("三".equals(week)){
						map.put("Wed", true);
					}else{
						map.put("Wed", false);
					}
					if("四".equals(week)){
						map.put("Thur", true);
					}else{
						map.put("Thur", false);
					}
					if("五".equals(week)){
						map.put("Fri", true);
					}else {
						map.put("Fri", false);
					}
					if("六".equals(week)){
						map.put("Sat", true);
					}else {
						map.put("Sat", false);
					}
					if("日".equals(week)){
						map.put("Sun", true);
					}else{
						map.put("Sun", false);
					}
					timeTask.setWeekMap(map);
				}
			}
		}
		Page<TimeTask> page = new PageImpl<TimeTask>(list,null,total);
		return page;
	}
	
	public String getWeek(TimeTask timeTask){
		Map<String, Object> weekMap = timeTask.getWeekMap();
		String week = "";
		if(null!=weekMap.get("Mon")&&(Boolean) weekMap.get("Mon")==true){
			week+="一"+"、";
		}
		if(null!=weekMap.get("Tues")&&(Boolean) weekMap.get("Tues")==true){
			week+="二"+"、";
		}
		if(null!=weekMap.get("Wed")&&(Boolean) weekMap.get("Wed")==true){
			week+="三"+"、";
		}
		if(null!=weekMap.get("Thur")&&(Boolean) weekMap.get("Thur")==true){
			week+="四"+"、";
		}
		if(null!=weekMap.get("Fri")&&(Boolean) weekMap.get("Fri")==true){
			week+="五"+"、";
		}
		if(null!=weekMap.get("Sat")&&(Boolean) weekMap.get("Sat")==true){
			week+="六"+"、";
		}
		if(null!=weekMap.get("Sun")&&(Boolean) weekMap.get("Sun")==true){
			week+="日"+"、";
		}
		return week.substring(0,week.lastIndexOf("、"));
	}
}
