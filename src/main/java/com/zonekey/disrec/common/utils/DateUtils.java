package com.zonekey.disrec.common.utils;

import org.apache.commons.lang.StringUtils;
import org.springframework.util.Assert;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.text.DateFormat;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.Properties;
import java.util.TimeZone;

/**
 * @{# DateUtils.java Create on 2011-2-16 下午04:11:46
 * <p>
 * 日期Util类
 * </p>
 * @author <a href="mailto:cwx@artron.net">cuiwx</a>
 * @version v 0.1
 */
public class DateUtils {

	private static String defaultDatePattern = "yyyy-MM-dd";
	/** 1天对应的毫秒数 */
	public static final long oneDayMillSeconds = 24 * 60 * 60 * 1000;

	/**
	 * 获得默认的 date pattern
	 */
	public static String getDatePattern() {
		return defaultDatePattern;
	}

	/**
	 * 返回预设Format的当前日期字符串
	 */
	public static String getToday() {
		Date today = new Date();
		return format(today);
	}

	/**
	 * 使用预设Format格式化Date成字符串
	 */
	public static String format(Date date) {
		return date == null ? "" : format(date, getDatePattern());
	}

	/**
	 * 使用参数Format格式化Date成字符串
	 */
	public static String format(Date date, String pattern) {
		return date == null ? "" : new SimpleDateFormat(pattern).format(date);
	}

	/**
	 * 使用预设格式将字符串转为Date
	 */
	public static Date parse(String strDate) throws ParseException {
		return StringUtils.isBlank(strDate) ? null : parse(strDate,
				getDatePattern());
	}

	/**
	 * 使用参数Format将字符串转为Date
	 */
	public static Date parse(String strDate, String pattern)
			throws ParseException {
		return StringUtils.isBlank(strDate) ? null : new SimpleDateFormat(
				pattern).parse(strDate);
	}
	
	public static Date parsenew(String strDate, String pattern) {
		Date d1=new Date();
		try {
			d1=StringUtils.isBlank(strDate) ? null : new SimpleDateFormat(
					pattern).parse(strDate);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return d1;
	}

	/**
	 * 根据年月日获得指定的日期
	 * 
	 * @param year
	 *            年份
	 * @param month
	 *            月份
	 * @param day
	 *            日期
	 * @return 相应的 Date 型日期
	 */
	public static Date getDate(int year, int month, int day) {
		Calendar cal = Calendar.getInstance();
		cal.set(year, month - 1, day, 0, 0, 0);
		return cal.getTime();
	}

	/**
	 * 判断给定日期是否为当月的最后一天
	 * 
	 * @param date
	 *            指定的日期
	 * @return 当该日期为当月最后一天则返回 true
	 */
	public static boolean isEndOfTheMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int maxDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		return cal.get(Calendar.DATE) == maxDay;
	}

	/**
	 * 判断给定日期是否为当年的最后一天
	 * 
	 * @param date
	 *            指定的日期
	 * @return 当该日期为当年最后一天则返回 true
	 */
	public static boolean isEndOfTheYear(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return (11 == cal.get(Calendar.MONTH))
				&& (31 == cal.get(Calendar.DATE));
	}

	/**
	 * 获得给定日期的月份的最后一天
	 * 
	 * @param date
	 *            指定的日期
	 * @return 指定日期月份的最后一天
	 */
	public static int getLastDayOfTheMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.getActualMaximum(Calendar.DAY_OF_MONTH);
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
		return startTime.getTime() <= endTime.getTime();
	}

	/**
	 * 比较两个日期相差天数
	 * 
	 * @param startTime
	 *            开始时间
	 * @param endTime
	 *            结束时间
	 * @return 相差天数
	 */
	public static long comparisonDifferenceDays(Date startTime, Date endTime)
			throws ParseException {
		Assert.notNull(startTime, "StartTime is null");
		Assert.notNull(endTime, "EndTime is null");

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(startTime);
		long timethis = calendar.getTimeInMillis();
		calendar.setTime(endTime);
		long timeend = calendar.getTimeInMillis();
		long theday = (timeend - timethis) / (1000 * 60 * 60 * 24);
		return theday;
	}

	/**
	 * 判断给定日期是否为对应日期月份的第一天
	 * 
	 * @param date
	 *            给定日期
	 * @return 当给定日期是否为对应日期月份的第一天返回 true
	 */
	public static boolean isStartOfTheMonth(Date date) {
		Assert.notNull(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return 1 == cal.get(Calendar.DATE);
	}

	/**
	 * 判断给定日期是否为对应日期年份的第一天
	 * 
	 * @param date
	 *            给定日期
	 * @return 当给定日期是否为对应日期年份的第一天返回 true
	 */
	public static boolean isStartOfTheYear(Date date) {
		Assert.notNull(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return (1 == cal.get(Calendar.MONTH)) && (1 == cal.get(Calendar.DATE));
	}

	/**
	 * 获取给定日期的月份
	 * 
	 * @param date
	 *            给定日期
	 * @return 给定日期的月份
	 */
	public static int getMonth(Date date) {
		Assert.notNull(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.MONTH);
	}

	/**
	 * 获取给定日期的年份
	 * 
	 * @param date
	 *            给定日期
	 * @return 给定日期的年份
	 */
	public static int getYear(Date date) {
		Assert.notNull(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return cal.get(Calendar.YEAR);
	}

	/**
	 * 获取不含不含小时分钟秒的系统日期
	 * 
	 * @return 系统当前日期，不含小时分钟秒
	 */
	public static Date getSystemDate() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		return new java.sql.Date(cal.getTime().getTime());
	}

	/**
	 * 获取系统的 Timestamp
	 * 
	 * @return 系统当前时间的 Timestamp
	 */
	public static Timestamp getSystemTimestamp() {
		return new Timestamp(System.currentTimeMillis());
	}
	/**
	 * 返回日期字符串
	 * @param pattern
	 * @return
	 */
	public static String getFormat(String pattern){
		SimpleDateFormat format = new SimpleDateFormat(pattern);
		try{
			return format.format(Calendar.getInstance().getTime());
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 获取现在的时间上加n分钟
	 * 
	 */
	public static String AddTime(String time,int count){
		 SimpleDateFormat dft=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");     
		try {
			 Date date = dft.parse(time);
			Calendar   dar=Calendar.getInstance();     
			dar.setTime(date);   
			dar.add(java.util.Calendar.MINUTE, +count);    
			return dft.format(dar.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
			return dft.format(new Date());
		}
	}
	/**
	 * 获取现在的时间上加一个小时
	 * 
	 * @return 获取现在的时间上加一个小时
	 */
	public static String getOneHours(){
		 SimpleDateFormat dft=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");     
		 Date date = new Date();     
		 Calendar   dar=Calendar.getInstance();     
		 dar.setTime(date);     
		 dar.add(java.util.Calendar.HOUR_OF_DAY, +1);    
		 return dft.format(dar.getTime());
	}
	/**
	 * 获取现在的时间上加n天
	 * @param enddate 
	 * @param count 
	 * 
	 * @return 获取现在的时间上加n天
	 */
	public static String AddOneDays(String enddate, int count){
		 SimpleDateFormat dft=new SimpleDateFormat("yyyy-MM-dd");     
		 Date date;
		try {
			date = dft.parse(enddate);
			Calendar   dar=Calendar.getInstance();     
			dar.setTime(date);     
			dar.add(java.util.Calendar.DATE, +count);    
			return dft.format(dar.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
			return enddate;
		}
	}
	/**
	 * 获取现在的时间上加n天
	 * @param enddate 
	 * @param count 
	 * 
	 * @return 获取现在的时间上加n天
	 */
	public static String AddOneDaysByDft(String enddate, int count){
		 SimpleDateFormat dft=new SimpleDateFormat("yyyy-MM-dd");     
		 Date date;
		try {
			date = dft.parse(enddate);
			Calendar   dar=Calendar.getInstance();     
			dar.setTime(date);     
			dar.add(java.util.Calendar.DATE, +count);    
			return dft.format(dar.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
			return enddate;
		}
	}
	/**
	 * 获取现在的时间上减一周
	 * @param enddate 
	 * 
	 * @return 获取现在的时间上减一周
	 */
	public static String getOneWeeks(String enddate){
		 SimpleDateFormat dft=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");     
		 Date date;
		try {
			date = dft.parse(enddate);
			Calendar   dar=Calendar.getInstance();     
			dar.setTime(date);     
			dar.add(java.util.Calendar.WEEK_OF_MONTH, -1);    
			return dft.format(dar.getTime());
		} catch (ParseException e) {
			e.printStackTrace();
			return enddate;
		}
	}
	/**
	 * 获取现在的时间上减一月
	 * 
	 * @return 获取现在的时间上减一月
	 */
	public static String getOneMouths(String enddate){
		 SimpleDateFormat dft=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");     
		 Date date;
			try {
		 date = dft.parse(enddate);     
		 Calendar   dar=Calendar.getInstance();     
		 dar.setTime(date);     
		 dar.add(java.util.Calendar.MONTH, -1);    
		 return dft.format(dar.getTime());
			} catch (ParseException e) {
				e.printStackTrace();
				return enddate;
			}
	}
	/**
	 * 获取现在的时间上减一年
	 * 
	 * @return 获取现在的时间上减一年
	 */
	public static String getOneYears(String enddate){
		 SimpleDateFormat dft=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");    
		 Date date;
			try {
		 date = dft.parse(enddate);    
		 Calendar   dar=Calendar.getInstance();     
		 dar.setTime(date);     
		 dar.add(java.util.Calendar.YEAR, -1);    
		 return dft.format(dar.getTime());
			} catch (ParseException e) {
				e.printStackTrace();
				return enddate;
			}
	}
	 public static String getWeek(Date date) {
		 Calendar g = Calendar.getInstance();     
		  g.setTime(date);
		  int count = g.get(Calendar.WEEK_OF_YEAR);//获得周数
		  return format(date, "yyyy") + count ;
		 }
	
	public static void main(String[] args) {
//		Date date = new Date();     
//		 String startdate = DateUtils.format(date, "yyyy-MM-dd HH:mm:ss");
//		int count = getWeek(new Date());
//		 System.out.println(getWeek(new Date()));
		 System.out.println(AddOneDaysByDft("2015-07-06 16:32:11",10));
//		 System.out.println(getOneWeeks());
//		 System.out.println(getOneMouths());
//		 System.out.println(getOneYears());
//		 int m = (int) (14/7 + 1);
//		 System.out.println(m);
	}
}
