package com.zonekey.disrec.common.exportexcel;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zonekey.disrec.entity.Curriculum;
import com.zonekey.disrec.vo.AreaView;
import com.zonekey.disrec.vo.DeptView;
import com.zonekey.disrec.vo.SysUserView;

public class ExportDeptForExcel {
	/**
	 * 生成页面上的数据
	 * @param context
	 * @return
	 */
	public void exportExcelForPerson(HttpServletRequest request, HttpServletResponse response,List<DeptView> deptList){
		String[] headers = {"组织机构代码","组织机构名称","属性","默认教室编号","所属子机构","错误描述"};
		List<Object[]> datas = new ArrayList<Object[]>();
		for(DeptView ao : deptList)
		{
			Object[] obj=new Object[6];
			obj[0]=ao.getCode();
			obj[1]=ao.getName();
			obj[2]=ao.getAttribute();
			obj[3]=ao.getAreaName();
			obj[4]=ao.getParentname();
			obj[5]=ao.getErrordescribe();
			
			datas.add(obj);
		}
		Boolean[] amounts = {false, false, false, false, false, false,};
		String title="机构导入错误输出";
		try {
			Exportexcel.exportEexcel(response, request,title, headers,datas, amounts);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
