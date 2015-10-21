package com.zonekey.disrec.common.exportexcel;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zonekey.disrec.entity.Card;
import com.zonekey.disrec.vo.SysUserView;

public class ExportSysuserForExcel {
	/**
	 * 生成页面上的数据
	 * @param context
	 * @return
	 */
	public void exportExcelForPerson(HttpServletRequest request, HttpServletResponse response,List<SysUserView> userList){
		String[] headers = {"用户账号","密码","用户姓名","性别","身份","入学年份","邮箱","电话","所属子机构","错误描述"};
		List<Object[]> datas = new ArrayList<Object[]>();
		for(SysUserView ao : userList)
		{
			Object[] obj=new Object[10];
			obj[0]=ao.getLoginname();
			obj[1]=ao.getPassword();
			obj[2]=ao.getName();
			obj[3]=ao.getSexName();
			obj[4]=ao.getUsertypeName();
			obj[5]=ao.getSchoolyear();
			obj[6]=ao.getEmail();
			obj[7]=ao.getPhone();
			obj[8]=ao.getDeptName();
			obj[9]=ao.getErrordescribe();
			
			datas.add(obj);
		}
		Boolean[] amounts = {false, false, false, false, false, false, false, false, false, false};
		String title="用户导入错误输出";
		try {
			Exportexcel.exportEexcel(response, request,title, headers,datas, amounts);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void exportExcelForCard(HttpServletRequest req,HttpServletResponse rep, List<Card> cardList) {
		String[] headers = {"卡号","持卡人id","持卡人","卡类型","错误描述"};
		List<Object[]> datas = new ArrayList<Object[]>();
		for(Card card : cardList)
		{
			Object[] obj=new Object[5];
			obj[0]=card.getCardNumber();
			obj[1]=card.getCardPersonId();
			obj[2]=card.getCardPerson();
			String cardType = card.getCardType();
			if("0".equals(cardType)){
				obj[3]="普通卡";
			}else{
				obj[3]="特殊卡";
			}
			obj[4] = card.getErrorDescribe();
			datas.add(obj);
		}
		Boolean[] amounts = {false, false, false, false,false};
		String title="卡信息导入错误输出";
		try {
			Exportexcel.exportEexcel(rep, req,title, headers,datas, amounts);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	public void exportExcelForLightSet(HttpServletRequest req,HttpServletResponse rep, List<Map<String, Object>> lightList) {
		String[] headers = {"教室","已使用时间","寿命","是否即将报废"};
		List<Object[]> datas = new ArrayList<Object[]>();
		for(Map<String, Object> map : lightList)
		{
			Object[] obj=new Object[4];
			obj[0]=map.get("name");
			obj[1]=map.get("usedlength");
			obj[2]=map.get("maxlength");
			obj[3]=map.get("isUse");
			datas.add(obj);
		}
		Boolean[] amounts = {false, false, false,false};
		String title="灯泡寿命的设置";
		try {
			Exportexcel.exportEexcel(rep, req,title, headers,datas, amounts);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	
}
