package com.zonekey.disrec.common;

public class EchartsUtil {
	//处理标题
	public static String[] getTitles(String table_sql) {
		table_sql = table_sql.substring(table_sql.indexOf("select"), table_sql.indexOf("from")).replace("'", "");
		String [] titles = table_sql.split(",");
		for(int i=0;i<titles.length;i++){
			String[] arr = titles[i].split(" ");
			titles[i] = arr[arr.length-1];
		}
		return titles;
	}
}
