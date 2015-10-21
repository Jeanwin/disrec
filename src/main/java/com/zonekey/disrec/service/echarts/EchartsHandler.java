package com.zonekey.disrec.service.echarts;

import java.text.SimpleDateFormat;

import org.apache.velocity.app.VelocityEngine;
import org.springside.modules.mapper.JsonMapper;

import com.zonekey.disrec.entity.Report;

public interface EchartsHandler {
	JsonMapper jsonMapper = JsonMapper.nonEmptyMapper();
	SimpleDateFormat from = new SimpleDateFormat("yyyy-MM-dd");
	public String handler(Report report,VelocityEngine ve) throws Exception;
}
