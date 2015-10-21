/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

import com.zonekey.disrec.common.utils.DateUtils;
import com.zonekey.disrec.entity.Term;


/**
 * @Title: DateTermUtil.java
 * @Description: <p>
 *               </p>
 * @author <a href="mailto:niuxl@zonekey.com.cn">牛喜林</a>
 * @date 2014年9月16日 上午10:27:07
 * @version v 1.0
 */
public class DateTermUtil {
	private static final Logger log = LoggerFactory.getLogger(DateTermUtil.class);
	/**
	 * 判断课节的状态，
	 * 返回状态：0：已开始，1：未开始 ；-1：已结束
	 * 参数：课节开始时间、课节结束时间、当前时间
	 * @return
	 */
	public static String getCurriculumStatus(long startTime,long endTime,long sysTime){
		//如果现在的时间<开始时间，返回未开始
		if(sysTime<startTime){
//			System.out.println("未开始");
			log.debug("未开始");
			return "1";
			//如果现在的时间>开始时间， <结束时间  返回已开始
		}else if(startTime<=sysTime && endTime>=sysTime){
//			System.out.println("已开始");
			log.debug("已开始");
			return "0";
			//如果现在的时间  >结束时间，返回 已结束
		}else if(endTime<sysTime){
//			System.out.println("已结束");
			log.debug("已结束");
			return "-1";
		}
		return null;
	}
	/**
	 * 判断课节的状态，
	 * 返回状态：0：已开始，1：未开始 ；-1：已结束
	 * 参数：课节开始时间、课节结束时间、当前时间
	 * @return
	 */
	public static String getCurriculumStatus_bak(Date startTime,Date endTime,Date sysTime){
		//如果现在的时间<开始时间，返回未开始
		if(DateUtils.isStartBeforeEndTime(sysTime, startTime)){
//			System.out.println("未开始");
			return "1";
			//如果现在的时间>开始时间， <结束时间  返回已开始
		}else if(DateUtils.isStartBeforeEndTime(startTime, sysTime) && DateUtils.isStartBeforeEndTime(sysTime, endTime)){
//			System.out.println("已开始");
			return "0";
			//如果现在的时间  >结束时间，返回 已结束
		}else if(DateUtils.isStartBeforeEndTime(endTime,sysTime)){
//			System.out.println("已结束");
			return "-1";
		}
		return null;
	}
	/**
	 * 根据学期開始時間 、第几周、周几 获取 日期
	 * 
	 * @return
	 */
	public static String getDateByTermAndWeeks(String term, String weeks,
			String weekDay) {
		// 将字符串转换为日期
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");// 定义日期格式
		Date date = null;
		try {
			date = format.parse(term);
		} catch (ParseException e) {
//			System.out.println("输入的日期格式不合理！");
			log.info("输入的日期格式不合理！");
			e.printStackTrace();
		}
		// 算出开学这周的周日是几号
		Date sun = getSundayByBeginData(date);
		// 算出第几周的周日是几号
		// 计算m+(n-1)*7是哪天
		Calendar cal = Calendar.getInstance();
		cal.setTime(sun);
		cal.add(Calendar.DATE, (Integer.parseInt(weeks) - 1) * 7);
		String T2 = format.format(cal.getTime());
//		System.out.println("这周的结束时间：" + T2);
		log.debug("这周的结束时间：" + T2);
		// 例如：星期三 转换为 3
		String day = weekConver(weekDay);

		Calendar cal2 = Calendar.getInstance();
		cal2.setTime(cal.getTime());
		cal2.add(Calendar.DATE, (Integer.parseInt(day) - 7));
		String data = format.format(cal2.getTime());
//		System.out.println("根据学期開始時間 、第几周、周几 获取 日期：" + data);
		log.debug("根据学期開始時間 、第几周、周几 获取 日期：" + data);
		return data;

	}

	/**
	 * 根据 日期 获取第几周，没有获取到的返回0
	 * 
	 * @return
	 */
	public static int getWeeksByDate(Term term,Date date) {
		log.debug("进入DateTermUtil类getWeeksByDate方法中");
		long day = 0;
		// 根据日期，查一下是对应的哪个学期vo,如果vo为null，return 0
		// 如：
		//TODO
//		Term term = new Term();
//		term.setId("1");
//		term.setStartday("2000-02-15");
//		term.setWeeks("10");
		// 根据学期开始时间，推算出开学第一周的周日是哪天
		log.debug("学期的开始时间："+term.getStartday());
		Date sunday = getSundayByBeginData(dateParse(term.getStartday()));
		// 传过来的时间与周日相差几天n
		try {
			day = DateUtils.comparisonDifferenceDays(sunday, date);
			log.debug("开学的第一个周日与今天相差的天数："+day);
		} catch (ParseException e) {
			log.info("根据 日期 获取第几周出现异常");
			e.printStackTrace();
		}
		// n/7 商为整数m 余数=0 则为第m+1周； 商为整数或者0，余数！=0；则为第m+2周；
		// 相差天数
		int intDay = new Long(day).intValue();
//		System.out.println("当前日期和第一周的周日相差天数为：" + day);
		log.debug("当前日期和第一周的周日相差天数为：" + day);
		// 当前日期在学期开始时间和第一周周日之间，为第1周
		if (DateUtils.isStartBeforeEndTime(date, sunday)
				&& DateUtils.isStartBeforeEndTime(
						dateParse(term.getStartday()), date)) {
			return 1;
		} else {
			// 商为整数m 余数=0 则为第m+1周； 商为整数或者0，余数！=0；则为第m+2周；
			// 取余数
			int i = (int) (intDay % 7);
			// 取商
			int j = (int) (intDay / 7);
			if (i == 0) {
				return (j + 1);
			} else if (i != 0) {
				return (j + 2);
			}
			log.debug("余数"+i+"商"+j);
		}
		return 0;

	}
	/**
	 * 根据 日期\学期 获取第几周，没有获取到的返回0
	 * 
	 * @return
	 */
	public static int getWeeksByDateAndTerm(Date date,Term term) {
		long day = 0;
		// 根据学期开始时间，推算出开学第一周的周日是哪天
		Date sunday = getSundayByBeginData(dateParse(term.getStartday()));
		// 传过来的时间与周日相差几天n
		try {
			day = DateUtils.comparisonDifferenceDays(sunday, date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		// n/7 商为整数m 余数=0 则为第m+1周； 商为整数或者0，余数！=0；则为第m+2周；
		// 相差天数
		int intDay = new Long(day).intValue();
//		System.out.println("当前日期和第一周的周日相差天数为：" + day);
		// 当前日期在学期开始时间和第一周周日之间，为第1周
		if (DateUtils.isStartBeforeEndTime(date, sunday)
				&& DateUtils.isStartBeforeEndTime(
						dateParse(term.getStartday()), date)) {
			return 1;
		} else {
			// 商为整数m 余数=0 则为第m+1周； 商为整数或者0，余数！=0；则为第m+2周；
			// 取余数
			int i = (int) (intDay % 7);
			// 取商
			int j = (int) (intDay / 7);
			if (i == 0) {
				return (j + 1);
			} else if (i != 0) {
				return (j + 2);
			}
		}
		return 0;

	}
	/**
	 * 根据日期 获取 周几
	 * 
	 * @return
	 */
	public static String getWeekDayByDate(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("EEEE");
		String week = sdf.format(date);
		return week;

	}

	

	/**
	 * 根据日期 获取 对应学期,如果数据库中查不到返回null
	 * 
	 * @return
	 */
	public static Term getTermByDate(Date date) {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date strdate = null;
		String weeks = "";
//		System.out.println(sdf.format(date).substring(0, 4));
		// 查询表zonekey_term，条件是：startday是以**字段开头的，得到一个学期集合，
		//TODO
		List<Term> termList = new ArrayList<Term>();
		Term term = new Term();
		term.setId("1");
		term.setStartday("2000-02-15");
		term.setWeeks("3");
		Term term1 = new Term();
		term1.setId("2");
		term1.setStartday("2000-09-05");
		term1.setWeeks("15");
		termList.add(term);
		termList.add(term1);
		// 循环集合，遍历每个vo，
		for (Term term2 : termList) {
			try {
				// 学期开始时间
				strdate = sdf.parse(term2.getStartday());
				// 周数
				weeks = term2.getWeeks();
				// 获取学期结束时间
				String enddate = getEndTermByBegin(strdate, weeks);
				// 将结束时间设到对象中
				term2.setEndday(enddate);
				// 开始时间减去1天
				Calendar cal = Calendar.getInstance();
				cal.setTime(strdate);
				cal.add(Calendar.DATE, -1);
				// 结束时间加上1天
				Calendar cal2 = Calendar.getInstance();
				cal2.setTime(sdf.parse(enddate));
				cal2.add(Calendar.DATE, 1);
				if (date.before(cal2.getTime()) && date.after(cal.getTime())) {
					return term2;
				}
			} catch (ParseException e) {

			}
		}
		return null;

	}

	/**
	 * 根据开学时间算出该周的周日是几号
	 * 
	 * @return
	 */
	public static Date getSundayByBeginData(Date date) {
		log.debug("进入DateTermUtil类getSundayByBeginData方法中");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		// 计算学期开始时间是星期几
		String week = getWeekDayByDate(date);
		log.debug("学期开始时间是星期几："+week);
		// 计算出开学时间的周日是几号m
		if (week.equals("星期一") || week.equals("Monday")) {
			cal.add(Calendar.DATE, 6);
		} else if (week.equals("星期二") || week.equals("Tuesday")) {
			cal.add(Calendar.DATE, 5);
		} else if (week.equals("星期三") || week.equals("Wednesday")) {
			cal.add(Calendar.DATE, 4);
		} else if (week.equals("星期四") || week.equals("Thursday")) {
			cal.add(Calendar.DATE, 3);
		} else if (week.equals("星期五") || week.equals("Friday")) {
			cal.add(Calendar.DATE, 2);
		} else if (week.equals("星期六") || week.equals("Saturday")) {
			cal.add(Calendar.DATE, 1);
		} else if (week.equals("星期日") || week.equals("Sunday")) {
			cal.add(Calendar.DATE, 0);
		}
		String T1 = sdf.format(cal.getTime());
//		System.out.println("星期日是几号----------：" + T1);
		log.debug("学期开学时间的星期日是几号："+T1);
		return cal.getTime();
	}

	/**
	 * 根据学期开始时间 和 周数获取 学期结束时间
	 * 
	 * @return
	 */
	public static String getEndTermByBegin(Date date, String weeks) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date sunday = getSundayByBeginData(date);
		// 计算m+(n-1)*7是哪天
		Calendar cal = Calendar.getInstance();
		cal.setTime(sunday);
		cal.add(Calendar.DATE, (Integer.parseInt(weeks) - 1) * 7);
		String data2 = sdf.format(cal.getTime());
//		System.out.println("学期结束时间：" + data2);
		log.debug("学期结束时间：" + data2);
		return data2;
	}

	/**
	 * @Title:weekConver
	 * @Description: <p>
	 *               </p>
	 *               将星期转换为数字
	 * @return
	 */
	public static String weekConver(String weekDay) {
		if (weekDay.equals("星期一")) {
			return "1";
		} else if (weekDay.equals("星期二")) {
			return "2";
		} else if (weekDay.equals("星期三")) {
			return "3";
		} else if (weekDay.equals("星期四")) {
			return "4";
		} else if (weekDay.equals("星期五")) {
			return "5";
		} else if (weekDay.equals("星期六")) {
			return "6";
		} else if (weekDay.equals("星期日")) {
			return "7";
		} else {
			return weekDay;
		}
	}
	/**
	 * date类型转换为String类型
	 * 
	 * @return
	 */
	public static String dateFormat(Date date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(date);
	}

	/**
	 * String类型的时间转换为date类型
	 * 
	 * @return
	 */
	public static Date dateParse(String date) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date2 = null;
		try {
			date2 = sdf.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date2;
	}
	/**
	 * String类型的时间转换为date类型
	 * 
	 * @return
	 */
	public static Date datetimeParse(String datetime) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date2 = null;
		try {
			date2 = sdf.parse(datetime);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date2;
	}
	/** 
	 * @Title:getNowDate
	 * @Description: 得到当前的日期
	 * 	
	 * @author niuxl
	 * @date 2014年9月22日 下午1:30:05
	 * @return
	*/
	public static String getNowDate(){
		SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd");// 定义日期格式
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		String sysTime=format2.format(cal.getTime());
		return sysTime;
	}
	/** 
	 * @Title:getNowDate
	 * @Description: 得到当前的日期带时分秒
	 * 	
	 * @author niuxl
	 * @date 2014年9月22日 下午1:30:05
	 * @return
	*/
	public static String getNowTime(){
		SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 定义日期格式
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		String sysTime=format2.format(cal.getTime());
		log.debug("当前日期为："+sysTime);
		return sysTime;
	}
	/** 
	 * @Title:getNowDate
	 * @Description: 得到当前的日期带时分秒
	 * 	
	 * @author niuxl
	 * @date 2014年9月22日 下午1:30:05
	 * @return
	*/
	public static String getNowTimes(){
		SimpleDateFormat format2 = new SimpleDateFormat("HH:mm:ss");// 定义日期格式
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		String sysTime=format2.format(cal.getTime());
		log.debug("当前时间为："+sysTime);
		return sysTime;
	}
	/** 
	 * @Title:isOrNotTerm
	 * @Description: 当前时间，是否在学期开始时间和结束时间之间
	 * 	
	 * @author niuxl
	 * @date 2014年9月22日 下午3:13:13
	 * @param strTiem
	 * @param endTime
	 * @param now
	 * @return
	*/
	public static boolean isOrNotTerm(String strTiem,String endTime,String now){
		if((DateUtils.isStartBeforeEndTime(dateParse(strTiem), dateParse(now))) && (DateUtils.isStartBeforeEndTime(dateParse(now), dateParse(endTime)))){
			return true;
		}
		return false;
	}
	/** 
	 * @Title:isOrNotClass
	 * @Description: 当前时间，是否在这节课开始时间和结束时间之间
	 * 	
	 * @author niuxl
	 * @date 2014年9月22日 下午3:13:13
	 * @param strTiem
	 * @param endTime
	 * @param now
	 * @return
	*/
	public static boolean isOrNotClass(String strTiem,String endTime,String now){
		if((DateUtils.isStartBeforeEndTime(datetimeParse(strTiem), datetimeParse(now))) && (DateUtils.isStartBeforeEndTime(datetimeParse(now), datetimeParse(endTime)))){
			return true;
		}
		return false;
	}
	/** 
	 * @Title:classconver
	 * @Description: 转换节次
	 * 	
	 * @author niuxl
	 * @date 2014年9月22日 下午3:13:13
	 * @param classid  2-5
	 * @return
	*/
	public static String classconver(String classid){
		String[] classarry;
		String str="";
		String strnum="";
		String strnumret="";
		if(classid .indexOf(",") >0){
			classarry=classid.split(",");
		}else{
			//定义一个一维数组
			classarry=new String[1];
			classarry[0] = classid;
		}
		for(int i=0;i<classarry.length;i++){
			if(classarry[i].indexOf("-") <0){
				str=str+(str==""?str:",")+classarry[i];
			}else{
				int a=Integer.parseInt(classarry[i].split("-")[0]);//2
				
				int b=Integer.parseInt(classarry[i].split("-")[1])-Integer.parseInt(classarry[i].split("-")[0]);//3
				str=str+(str==""?"":",")+a;
				for(int j=1;j<=b;j++){
					str=str+","+(a+j);
					
				}
			}
		}
//		String ss=(classconver("1-2,3-5,4-5"));
		
		 String[] ar = str.split(",");
	        String[] ns = array_unique(ar);
//	        System.out.println(ns.toString());
	        for(String aa : ns) {
	        	strnum=strnum+aa+",";
	           
	        }
	        if(strnum.endsWith(",")){
	        	strnumret=strnum.substring(0,strnum.length()-1);
	        }
		return strnumret;
	}
	/** 
	 * @Title:classconver
	 * @Description: 字符串中去掉重复的数字
	 * 	
	 * @author niuxl
	 * @date 2014年9月22日 下午3:13:13
	 * @param classid  2-5
	 * @return
	*/
	 public static List printMap1(String[] s) {
	        List<String> list =  new LinkedList<String>();
	        List<String> list2 = Arrays.asList(s);
	        list.addAll(list2);
	        return list;
	        
	    }
	 /** 
		 * @Title:classconver
		 * @Description: 字符串中去掉重复的数字(第二种方法)
		 * 	
		 * @author niuxl
		 * @date 2014年9月22日 下午3:13:13
		 * @param classid  2-5
		 * @return
		*/
	    public static String[] array_unique(String[] a) {
	        // array_unique
	        List<String> list = new LinkedList<String>();
	        for(int i = 0; i < a.length; i++) {
	            if(!list.contains(a[i])) {
	                list.add(a[i]);
	            }
	        }
	        return (String[])list.toArray(new String[list.size()]);
	    }
	/** 
	 * @Title:validatWeekNum
	 * @Description: 检验参数中包括-的，后面的数字大于前面的
	 * 	
	 * @author niuxl
	 * @date 2014年10月11日 下午6:18:32
	 * @return
	*/
	public static boolean validatWeekNum(String weeks){
		String[] classarry;
		 if(weeks.indexOf(",") >0){
			
			 classarry=weeks.split(",");
		 }else{
				//定义一个一维数组
				classarry=new String[1];
				classarry[0] = weeks;
			}
		 for(int k=0;k<classarry.length;k++){
			 if(classarry[k].indexOf("-") >0){
				 if(Integer.parseInt(classarry[k].split("-")[1]) <= Integer.parseInt(classarry[k].split("-")[0])){
					return false;
				 }
			 }
		 }
		 return true;
	}
	/**
	 * 判断开始日期是否比结束日期早
	 * 
	 * @param startTime
	 *            开始时间
	 * @param endTime
	 *            结束时间
	 * @return 当开始时间比结束时间早时返回 true
	 */
	public static boolean isStartBeforeEndTime(Date startTime, Date endTime) {
		Assert.notNull(startTime, "StartTime is null");
		Assert.notNull(endTime, "EndTime is null");
		return startTime.getTime() < endTime.getTime();
	}
	
	public static void main(String[] args) {

		// 根据日期 获取 周几
		String strDate = "2014-9-1";// 定义日期字符串
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");// 定义日期格式
		Date date = null;
		try {
			date = format.parse(strDate);// 将字符串转换为日期
//			System.out.println("DATE===========" + date);
		} catch (ParseException e) {
//			System.out.println("输入的日期格式不合理！");
			log.info("输入的日期格式不合理！");
			e.printStackTrace();
		}
		// 根据日期，获取是星期几
		//getWeekDayByDate(date);

		// 测试 根据开学日期、周数 算出学期结束日期
		getEndTermByBegin(date, "20");

		// 根据开学时间 算出这周的周日是几号
		//getSundayByBeginData(date);
		// 根据学期、第几周、日期获取日期
//		getDateByTermAndWeeks(strDate, "13", "星期三");
		// 当前时间为哪个学期
		//System.out.println(getTermByDate(date));

		// 测试当前日期为第几周
		//System.out.println("===========" + getWeeksByDate(date));
		//测试课时是否开始
		SimpleDateFormat format2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 定义日期格式
		String startTime = "2000-2-28 10:00:00";// 定义日期字符串
		String endTime = "2000-2-28 10:45:00";// 定义日期字符串
		String sysTime = "2000-2-28 09:59:59";// 定义日期字符串
		
		//系统时间
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		sysTime=format2.format(cal.getTime());
		
		startTime=startTime.replaceAll("-", "").replace(" ", "").replace(":", "");
		endTime=endTime.replaceAll("-", "").replace(" ", "").replace(":", "");
		sysTime=sysTime.replaceAll("-", "").replace(" ", "").replace(":", "");
		
			getCurriculumStatus(Long.parseLong(startTime),Long.parseLong(endTime),Long.parseLong(sysTime));
			// TODO Auto-generated catch block
			
			String str="2014-9-1";
			String endt="2015-2-2";
			String now ="2015-2-3";
//			System.out.println(isOrNotTerm(str,endt,now));
//			System.out.println(getNowTime().replaceAll("-", "").replace(":", "").replace(" ", ""));
			
			System.out.println("qqqqqqqqqqqqqqqq"+classconver("1-1"));
			
			String s="2014-09-09 00:00:00";
			System.out.println(s.substring(0, 10));
			String str1="2014-5-29";
			String end="2014-5-30";
			
//			System.out.println(isStartBeforeEndTime(DateTermUtil.dateParse(""),DateTermUtil.dateParse(end)));
			String ss=(classconver("1-2,3-4,5"));
			String ss1=(classconver("5-6"));
//			System.out.println(ss);
//			String bb="";
//			 String[] ar = ss.split(",");
//		        String[] ns = array_unique(ar);
////		        System.out.println(ns.toString());
//		        for(String aa : ns) {
//		        	bb=bb+aa+",";
//		           
//		        }
//		        System.out.println(bb);
//		        List list3 = printMap1(ar);
//		        for(Object o : list3) {
//		            System.out.println(o);
//		        }
//			System.out.println(classconver("1-2,3-5,4-5"));
//			System.out.println(validatWeekNum("1-2,3-5,4-5"));
			
			SimpleDateFormat format3 = new SimpleDateFormat("HH:mm:ss");// 定义日期格式
			sysTime=format3.format(cal.getTime());
//			System.out.println(sysTime);
			String s1="090000";
			s1=s1.substring(0, 2)+":"+s1.substring(2, 4)+":"+s1.substring(4, 6);
//			System.out.println(s1);
			String[] ssarray=ss1.split(",");
			char[] ch=ss1.toCharArray();
			for(int i=0;i<ssarray.length;i++){
//				char re=getChar(ss,ssarray[i].toCharArray()[0]);
//				System.out.println(re);
			}
			String a=(Math.random()*9000+1000)+"";
			System.out.println(a);
			System.out.println(a.substring(0, 4));
			
	}

}
