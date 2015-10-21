package com.zonekey.disrec.service.echarts;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;

import com.zonekey.disrec.entity.Report;

public class EchartsLineHandler implements EchartsHandler{
	private String template = "echartsLine.vm";
	public EchartsLineHandler() {
		
	}
	
	public EchartsLineHandler(String template) {
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
		Set<String> legend = new HashSet<String>(report.getList().get(0).keySet());
		
		legend.remove("时间");
		//装载数据
		List<Map<String,Object>> data = new ArrayList<Map<String,Object>>();
		//x轴数据展示
		List xData = new ArrayList();
		boolean flag = true;
		for (String xtitle : legend) {
			Map<String,Object> m = new HashMap<String, Object>();
			List l = new ArrayList();
			for(Map<String,Object> map : report.getList()){
				l.add(map.get(xtitle));
				
				if(flag){
					String time = map.get("时间")+"";
					time = time.substring(0, 10);
					xData.add(time);
				}
			}
			m.put("name", xtitle);
			m.put("type", "line");
			m.put("data", l);
			
			data.add(m);
			flag = false;
		}
		context.put("xData", jsonMapper.toJson(xData));
		context.put("legend", jsonMapper.toJson(legend));//图例
		context.put("data", jsonMapper.toJson(data));//数据
		StringWriter stringWriter = new StringWriter();
		template.merge(context, stringWriter);

		return stringWriter.toString();
	}
}
