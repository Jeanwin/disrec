package com.zonekey.disrec.common.exportexcel;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.zonekey.disrec.entity.Curriculum;

public class ExportCurriculumForExcel {
	/**
	 * 生成页面上的数据
	 * @param context
	 * @return
	 */
	public void exportExcelForPerson(HttpServletRequest request, HttpServletResponse response,List<Curriculum> curriculumList){
		String[] headers = {"教师工号","教师名称","教室编号","教室名称","课程名称","班级编号","班级名称","第几周","周几","节次","直播","直播模式","录像","录像模式","课节录像","互动课程","资源自动上传","错误描述"};
		List<Object[]> datas = new ArrayList<Object[]>();
		for(Curriculum co : curriculumList)
		{
			Object[] obj=new Object[18];
			obj[0]=co.getUserno();
			obj[1]=co.getUsername();
			obj[2]=co.getAreano();
			obj[3]=co.getAreaname();
			obj[4]=co.getSubject();
			obj[5]=co.getDeptno();
			obj[6]=co.getDeptname();
			obj[7]=co.getWeeksbefore();
			obj[8]=co.getWeekdate();
			obj[9]=co.getSameclass();
			obj[10]=co.getLive();
			obj[11]=co.getLivemodel();
			obj[12]=co.getRecord();
			obj[13]=co.getVideo();
			obj[14]=co.getClassniddlerecord();
			obj[15]=co.getIntercourse();
//			obj[16]=co.getVideoupload();
			obj[16]=co.getIsupload();
			obj[17]=co.getErrordescribe();
			
			datas.add(obj);
		}
		Boolean[] amounts = {false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false};
		String title="课表导入错误输出";
		try {
			Exportexcel.exportEexcel(response, request,title, headers,datas, amounts);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
