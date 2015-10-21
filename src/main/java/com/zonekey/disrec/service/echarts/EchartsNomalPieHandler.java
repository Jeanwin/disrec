package com.zonekey.disrec.service.echarts;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;

import com.zonekey.disrec.entity.Report;


public class EchartsNomalPieHandler implements EchartsHandler {
	private String template = "echartsNomalPie.vm";
	
	public EchartsNomalPieHandler() {
		
	}
	
	public EchartsNomalPieHandler(String template) {
		if (template != null) {
			this.template = template;
		}
	}
	
	public String handler(Report report,VelocityEngine ve) throws Exception {
		Template template = ve.getTemplate(this.template);

		VelocityContext context = new VelocityContext();
		context.put("id", report.getId());
		// 饼图标题
		context.put("functitle",report.getFunctitle());
		
		//图例标题
		List<String> legend = new ArrayList<String>();
		List<Map<String,Object>> data = new ArrayList<Map<String,Object>>();
		for (Map<String,Object> map : report.getList()) {
			Map<String,Object> m = new HashMap<String, Object>();
			
			for (Entry<String, Object> entry: map.entrySet()) {
				try{
					Integer.parseInt(entry.getValue()+"");
					m.put("value", entry.getValue());
				}catch(Exception e){
					m.put("name", entry.getValue());
					legend.add(entry.getValue()+"");
				}
			}
			data.add(m);
		}
		context.put("legend", jsonMapper.toJson(legend));//图例
		context.put("data", jsonMapper.toJson(data));//数据
		StringWriter stringWriter = new StringWriter();
		template.merge(context, stringWriter);

		return stringWriter.toString();
	}
}
