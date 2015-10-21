package com.zonekey.disrec.common.exportexcel;

import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;

public class Exportexcel {
	/**
	 * ����ɵ�excel���浽����
	 * @param title
	 * @param headers
	 * @param datas
	 * @param amounts
	 * @throws Exception
	 */
	public static void exportEexcel(HttpServletResponse response, HttpServletRequest request, String title, String[] headers, List<Object[]> datas, Boolean[] amounts) throws Exception {
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
		} 
		finally 
		{
		
			out.close();
		}
	}
	// �ж����������
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
