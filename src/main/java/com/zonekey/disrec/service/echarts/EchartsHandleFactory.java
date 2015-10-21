package com.zonekey.disrec.service.echarts;

import java.util.HashMap;
import java.util.Map;

import org.apache.velocity.app.VelocityEngine;

import com.zonekey.disrec.entity.Report;

public class EchartsHandleFactory {
	private static Map<String, EchartsHandler> map = new HashMap<String, EchartsHandler>();
	private static EchartsHandleFactory factory = new EchartsHandleFactory();
	static {
		//map.put("1", new HighChartHandler(null));
		map.put("2", new EchartsNomalPieHandler());
		//map.put("3", new GridHandler("metrogrid.vm"));
		map.put("4", new EchartsPieHandler());
		//map.put("5", new ColumnChartHandler("metroMsColumn.vm"));
		map.put("6", new GridHandler());
		map.put("7", new EchartsLineHandler());
		//map.put("8", new AjaxGridHandler(null));
		//map.put("9", new JSONGridHandler(null));
		//map.put("10", new JSONHighChartHandler(null));
	}

	public String handler(Report report,VelocityEngine ve) throws Exception {
		return map.get(String.valueOf(report.getPic_type())).handler(report,ve);
	}
	
	public static EchartsHandleFactory getInstance(){
		if(factory==null)
			factory = new EchartsHandleFactory();
		return factory;
	}
}
