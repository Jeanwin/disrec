package com.zonekey.disrec.service.echarts;

import java.io.StringWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;

import com.zonekey.disrec.common.EchartsUtil;
import com.zonekey.disrec.entity.Report;


public class GridHandler implements EchartsHandler {
	private String template = "grid.vm";
	
	public GridHandler() {
	}
	
	public GridHandler(String template) {
		if (template != null) {
			this.template = template;
		}
	}

	public String handler(Report report,VelocityEngine ve) throws Exception {

		Template template = ve.getTemplate(this.template);

		VelocityContext context = new VelocityContext();

		// 表格标题
		context.put("functitle", report.getFunctitle());

		// 表格的id
		context.put("gridindex", report.getId());
		context.put("callback", report.getCallback());
		context.put("param_format", report.getParam_format());
		context.put("format", report.getFormat());

		// 表格的数据生成时间
		context.put("init_time", DateFormatUtils.format(new Date(), "yyyy年-MM月-dd日 HH时:mm分:ss秒"));


		List<Map<String, Object>> list = report.getList();

		if (list != null) {
			Map<String, Object> jsonMap = new HashMap<String, Object>();
			jsonMap.put("total", list.size());
			jsonMap.put("rows", list);
			context.put("jsonData", jsonMapper.toJson(jsonMap));
			
			context.put("titles", EchartsUtil.getTitles(report.getTable_sql()));
			context.put("titlesLength", list.get(0).keySet().size());
		}

		StringWriter stringWriter = new StringWriter();
		template.merge(context, stringWriter);

		return stringWriter.toString();
	}
}
