package com.zonekey.disrec.common.exportexcel;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.vo.AreaView;

public class ExportAreaForExcel {
	/**
	 * 生成页面上的数据
	 * @param context
	 * @return
	 */
	public void exportExcelForPerson(HttpServletRequest request, HttpServletResponse response,List<AreaView> areaList){
		String[] headers = {"教室编号","教室名称","所属子机构","设备名称","IP地址","mac地址","错误描述"};
		List<Object[]> datas = new ArrayList<Object[]>();
		for(AreaView ao : areaList)
		{
			Object[] obj=new Object[7];
			obj[0]=ao.getInnerid();
			obj[1]=ao.getName();
			obj[2]=ao.getParentname();
			obj[3]=ao.getDevicename();
			obj[4]=ao.getIp();
			obj[5]=ao.getMac();
			obj[6]=ao.getErrordescribe();
			
			datas.add(obj);
		}
		Boolean[] amounts = {false, false, false, false};
		String title="教室导入错误输出";
		try {
			Exportexcel.exportEexcel(response, request,title, headers,datas, amounts);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
