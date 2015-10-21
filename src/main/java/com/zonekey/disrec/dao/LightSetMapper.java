package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.LightSet;
import com.zonekey.disrec.vo.PageBean;
@MyBatisRepository
public interface LightSetMapper extends BaseMapper<LightSet, String>{

	public int saveLightSet(LightSet lightSet);

	public int updateLightSet(LightSet lightSet);

	public long count(PageBean pageBean);

	public List<Map<String, Object>> findByPage(PageBean pageBean);


	/**
	 *通过教室id查找灯泡设置(教室唯一)
	 */
	public LightSet getLightSet(String areaId);

	public List<Map<String, Object >> findLightSet();


}
