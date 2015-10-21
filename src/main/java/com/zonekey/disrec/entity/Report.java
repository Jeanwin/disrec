package com.zonekey.disrec.entity;

import java.util.List;
import java.util.Map;

public class Report {
	private String id;
	
	private String functitle;
	
	private String table_sql;
	
	private String pic_type;
	
	private String format;
	
	private String callback;
	
	private String param_format;

	private List<Map<String,Object>> list;
	
	private List<List<Object>> data;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFunctitle() {
		return functitle;
	}

	public void setFunctitle(String functitle) {
		this.functitle = functitle;
	}

	public String getTable_sql() {
		return table_sql;
	}

	public void setTable_sql(String tableSql) {
		table_sql = tableSql;
	}

	public List<Map<String, Object>> getList() {
		return list;
	}

	public void setList(List<Map<String, Object>> list) {
		this.list = list;
	}

	public String getPic_type() {
		return pic_type;
	}

	public void setPic_type(String picType) {
		pic_type = picType;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public String getCallback() {
		return callback;
	}

	public void setCallback(String callback) {
		this.callback = callback;
	}

	public String getParam_format() {
		return param_format;
	}

	public void setParam_format(String paramFormat) {
		param_format = paramFormat;
	}

	public List<List<Object>> getData() {
		return data;
	}

	public void setData(List<List<Object>> data) {
		this.data = data;
	}
	
	
}
