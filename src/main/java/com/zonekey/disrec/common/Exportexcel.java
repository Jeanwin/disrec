package com.zonekey.disrec.common;

import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

import com.zonekey.disrec.entity.Report;

public class Exportexcel {
	public static void formatData(HttpServletResponse res, HttpServletRequest req,Report report){
    	String title = report.getFunctitle();
    	boolean flag = true;
    	
    	List<String> titles=new ArrayList<String>();
    	List data = new ArrayList();
    	for (Map<String,Object> map : report.getList()) {
    		List da = new ArrayList();
			for (Entry<String, Object> entry: map.entrySet()) {
				if(flag){
					titles.add(entry.getKey());
				}
				da.add(entry.getValue());
			}
			data.add(da);
			flag =false;
		}
    	Boolean[] amount = {false,false,false,false};
    	try {
			Exportexcel.exportEexcel(res, req, title, titles.toArray(new String[titles.size()]), data, amount);
		} catch (Exception e) {
			e.printStackTrace();
		}
    
	}
	/**
	 * @param title
	 * @param headers
	 * @param datas
	 * @param amounts
	 * @throws Exception
	 */
	public static void exportEexcel(HttpServletResponse response, HttpServletRequest request, String title, String[] headers, List<List<Object>> datas, Boolean[] amounts) throws Exception {
		HSSFWorkbook workbook=ExportXLSUtil.exportExcel("FinanceDatas", headers, datas, amounts);
		if(workbook==null)
		{
			return;
		}
		OutputStream out = response.getOutputStream();
		try {
			response.setContentType("application/vnd.ms-excel;charset=UTF-8"); 
			if(StringUtils.isNotBlank(title)){  
				int viewType = getBrowingType(request);
				if(1==viewType) {
					title = URLEncoder.encode(title, "UTF-8");
				}else{
					title = new String(title.getBytes("UTF-8"), "ISO-8859-1");
				}
			    response.setHeader("Content-disposition","attachment; filename="+title+".xls");  
			}else{  
			    response.setHeader("Content-disposition","attachment; filename=SheetExcel.xls");  
			}  
            workbook.write(out);
			response.flushBuffer();
			response.setStatus(response.SC_OK); 
		} catch (Exception e) {
			e.printStackTrace();
		} 
		finally 
		{
		
			out.close();
		}
	}
    public static Integer getBrowingType(HttpServletRequest request) {
        String agent = request.getHeader("USER-AGENT");
        if (null != agent && -1 != agent.indexOf("MSIE")) {
            return 1;
        } else if (null != agent && -1 != agent.indexOf("Firefox")) {
            return 2;
        } else if (null != agent && -1 != agent.indexOf("Safari")) {
            return 3;
        } else {
            return 4;
        }
    }

}
