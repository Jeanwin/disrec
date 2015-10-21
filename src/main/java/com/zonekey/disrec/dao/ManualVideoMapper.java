package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.ManualVideo;
import com.zonekey.disrec.vo.PageBean;
@MyBatisRepository
public interface ManualVideoMapper extends BaseMapper<ManualVideo, String>{

	public int saveManualVideo(ManualVideo manualVideo);

	public long count(PageBean pageBean);

	public List<ManualVideo> findByPage(PageBean pageBean);

	public int updateEndTime(String id);

	public int updateVideoState(String id);

	public ManualVideo getManualVideoByAreaId(String areaId);

	public int deleteManualVideo(List<Map<String, Object>> list);

	public int delManualVideoById(String id);

	public int updateManualVideouploadismanual(ManualVideo manualVideo);

}
