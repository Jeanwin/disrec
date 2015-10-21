package com.zonekey.disrec.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.DeviceMapper;
import com.zonekey.disrec.dao.LightSetMapper;
import com.zonekey.disrec.entity.LightSet;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.DeviceView;
import com.zonekey.disrec.vo.PageBean;

@Component
@Transactional(readOnly = true)
public class LightSetService extends BaseService{

	@Autowired
	private LightSetMapper lightSetMapper;
	@Autowired
	private DeviceMapper deviceMapper;
	
	@Transactional(readOnly = false)
	public int updateLightSet(List<Map<String, Object>> lightSets) {
		String uLength = "";
		String mLength = "";
		double usedLength = 0.00;
		double maxLength = 0.00;
		if(null==lightSets&&lightSets.size()==0){
			return 0;
		}
		for (Map<String, Object> map : lightSets) {
			String areaId = (String) map.get("areaId");
			LightSet lightSet = new LightSet();
			if (null!=map.get("usedlength")&&null!=map.get("maxlength")) {
				uLength = map.get("usedlength").toString();
				mLength = map.get("maxlength").toString();
				if (uLength!=""&&mLength!="") {
					usedLength = Double.parseDouble(uLength);
					maxLength = Double.parseDouble(mLength);
					if (maxLength*0.9<usedLength) {
						lightSet.setIsUse("1");
					}else{
						lightSet.setIsUse("0");
					}
				}
			}
			lightSet.setUsedlength(usedLength);
			lightSet.setMaxlength(maxLength);
			lightSet.setAreaId(areaId);
			int flag = checkAreaExist(lightSet.getAreaId());
			//灯泡设置有相应教室的设置
			if(flag==0){
				lightSetMapper.updateLightSet(lightSet);
			}else{
				lightSet.setId(IdUtils.uuid2());
				lightSetMapper.saveLightSet(lightSet);
			}
		}
		return 1;
	}
	
	public Page<Map<String, Object>> findPageBy(PageBean pageBean) {
		long total = lightSetMapper.count(pageBean);
		List<Map<String, Object>> list = lightSetMapper.findByPage(pageBean);
		Page<Map<String, Object>> page = new PageImpl<Map<String, Object>>(list,null,total);
		return page;
	}
	
	@Transactional(readOnly = false)
	public int creatOrUpdate(String mac,Double usedLength,Double maxLength) {
		LightSet lightSet = new LightSet();
		lightSet.setMac(mac);
		lightSet.setUsedlength(usedLength);
		lightSet.setMaxlength(maxLength);
		//判断是否报废
		if (maxLength*0.9<usedLength) {
			lightSet.setIsUse("1");
		}else{
			lightSet.setIsUse("0");
		}
		DeviceView deviceView = deviceMapper.findDeviceByMac(mac);
		if(null!=deviceView){
			//获取教室的id
			String areaId = deviceView.getAreaid();
			lightSet.setAreaId(areaId);
			int flag = checkAreaExist(areaId);
			//该教室已经设置
			if(flag==0){
				lightSetMapper.updateLightSet(lightSet);
			}else{
				lightSet.setId(IdUtils.uuid2());
				lightSetMapper.saveLightSet(lightSet);
			}
			return 1;
		}
		return 0;
	}
	
	public int checkAreaExist(String areaId){
		LightSet light = lightSetMapper.getLightSet(areaId);
		if(null!=light){
			return 0;
		}else{
			return 1;
		}
	}

	public List<Map<String, Object>> findLightSet() {
		return lightSetMapper.findLightSet();
	}
	
}
