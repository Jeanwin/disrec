package com.zonekey.disrec.common;

import java.util.Date;
import java.util.Comparator;

import com.zonekey.disrec.common.utils.DateUtils;
import com.zonekey.disrec.vo.DirectorVo;

public class DirectorComparator implements Comparator<DirectorVo> {
	public int compare(DirectorVo arg0, DirectorVo arg1) {
		Date d1,d2;
		d1 = DateUtils.parsenew(arg1.getTime().substring(0,16)+":00", "yyyy-MM-dd HH:mm:ss");
		d2=DateUtils.parsenew(arg0.getTime().substring(0,16)+":00", "yyyy-MM-dd HH:mm:ss");
		return d1.compareTo(d2);
	}
}
