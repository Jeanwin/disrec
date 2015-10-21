 /*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.common;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
* @Title: AppConstants.java
* @Description: <p>公共常量类，定义使用的一些常用常量</p>
* @author <a href="mailto:cuiwx@zonekey.com.cn">崔卫翔</a> 
* @date 2014-7-24 下午2:09:40   
* @version v 1.0 
*/ 
public class AppConstants {
	/**
	 * 点播url
	 */
	public static final String DEMAND_URL = "/vod/vodrequest";
	/**
	 * 截图存放相对路径
	 */
	public static final String POLLING_IMAGE_PATH = File.separatorChar+"home"+File.separatorChar+"tomcat"+File.separatorChar+"images";
	/**
	 * 轮询截图url
	 */
	public static final String POLLING_IMAGE_URL = "/deviceService/polling/cutPic";
	/**
	 * 轮询截图url
	 */
	public static final String POLLING_VIDEO_URL = "/deviceService/polling/video";
	/**
	 * 记录有效状态0 正常(审核通过)
	 */
	public static final String IS_STATUS_DEFAULT = "0";

	/**
	 * 记录有效状态1 逻辑删除
	 */
	public static final String IS_STATUS_DELETE = "1";

	/**
	 * 记录有效状态2 过期
	 */
	public static final String IS_STATUS_EXPIRED = "2";

	/**
	 * 记录有效状态3 冻结
	 */
	public static final String IS_STATUS_FREEZE = "3";
	/**
	 * 图片资源存放路径
	 */
	//public static final String resource_path="E:\\eclipse2\\workspace\\disrec\\src\\main\\webapp\\resource";
	//图片路径
//	public static final String IMAGE_PATH = File.separatorChar+"home"+File.separatorChar+"tomcat"+File.separatorChar+"images"+File.separatorChar;
	
	public static final String IMAGE_PATH = File.separatorChar + "home" + File.separatorChar + "mfsdate" + File.separatorChar;
	
	public static final String ASSETS_PATH = File.separatorChar+"front"+File.separatorChar+"assets"+File.separatorChar+"img"+File.separatorChar;
//			"\\front\\assets\\img\\";
	
	public static final String ASSETS_PATH_GET = "/front/assets/img/";
	/**
	 * 图片的服务路径
	 */
	//public static final String Imageurl="/disrec/resource/image/";
	/**
	 * 默认图片的服务路径
	 */
	public static final String defaultImageurl=File.separatorChar+"defaultimage.jpg";
	/**
	 * 图片扩展名
	 */
	public static final List<String> EXT_LIST= new ArrayList<String>(){
		private static final long serialVersionUID = -6340094436493008215L;
		{
			add(".jpg");  
	        add(".jpeg");  
	        add(".bmp");  
	        add(".gif");  
	        add(".png");
		}
	};
	/**
	 * 图片扩展名
	 */
	public static final List<String> IMG_EXT_LIST = new ArrayList<String>() {
		private static final long serialVersionUID = -6340094436493008215L;
		{
			add(".jpg");
			add(".jpeg");
			add(".bmp");
			add(".gif");
			add(".png");
		}
	};
	/**
	 * 视频扩展名
	 * ('avi','rmvb','mp4','mkv','wmv','rm','asf','divx','mpg','mpeg','mpe','vob','3gp','swf')
	 */
	public static final List<String> VIDEO_EXT_LIST = new ArrayList<String>() {
		private static final long serialVersionUID = -6340094436493008215L;
		{
			add(".avi");
			add(".rmvb");
			add(".mp4");
			add(".mkv");
			add(".wmv");
			add(".rm");
			add(".asf");
			add(".divx");
			add(".mpg");
			add(".mpeg");
			add(".mpe");
			add("vob");
			add(".3gp");
			add(".swf");
		}
	};
	/**
	 * 文档扩展名
	 */
	public static final List<String> DOC_EXT_LIST = new ArrayList<String>() {
		private static final long serialVersionUID = -6340094436493008215L;
		{
			add(".pdf");
			add(".html");
			add(".txt");
			add(".doc");
			add(".docx");
			add(".xlsx");
			add(".xls");
			add(".ppt");
			add(".rar");
			add(".zip");
			add(".exe");
			add(".iso");
		}
	};
	/**
	 * 相对路径
	 */
	public static final List<String> TYPE_PATH_LIST = new ArrayList<String>() {
		private static final long serialVersionUID = -6340094436493008215L;
		{
			add("image"+File.separator);
			add("video"+File.separator);
			add("doc"+File.separator);
			add("other"+File.separator);
		}
	};
    /**
     *服务器类型 
     *1：web服务器	
     *2：转码服务器
     *3:分发服务器
     *4:中继服务器
     *5:存储服务器
     *6:点播服务器
     *7:FTP服务器中控DB同步使用
     *8:CMS
     *9:语音转发服务器
     */
	public static final String TYPE_SERVER_WEB = "1";
	public static final String TYPE_SERVER_CODE = "2";
	public static final String TYPE_SERVER_SEND = "3";
	public static final String TYPE_SERVER_MIDDLE = "4";
	public static final String TYPE_SERVER_STORE = "5";
	public static final String TYPE_SERVER_DEMAND = "6";
	public static final String TYPE_SERVER_FTP = "7";
	public static final String TYPE_SERVER_CMS="8";
	public static final String TYPE_SERVER_VOICE="9";
	/**
	 * 性别:男
	 */
	public static final String TYPE_SEX_MALE = "0";
	/**
	 * 性别:女
	 */
	public static final String TYPE_SEX_FEMALE = "1";
	/**
	 * 教室:是
	 */
	public static final String TYPE_CLASSROOM_Y = "Y";
	/**
	 * 教室:否
	 */
	public static final String TYPE_CLASSROOM_N = "N";
	/**
	 * 服务器类型：web
	 */
	public static final String TYPE_SERVERSTYPE_WEB = "1";
	/**
	 * 服务器类型：转码
	 */
	public static final String TYPE_SERVERSTYPE_ZHUANMA = "2";
	/**
	 * 服务器类型：分发
	 */
	public static final String TYPE_SERVERSTYPE_FENFA = "3";
	/**
	 * 服务器类型：中继
	 */
	public static final String TYPE_SERVERSTYPE_ZHONGJI = "4";
	/**
	 * 服务器类型：存储
	 */
	public static final String TYPE_SERVERSTYPE_CUNCHU = "5";
	/**
	 * 轮巡机位命名：教师
	 */
	public static final String TYPE_ROUNDROBIN_TEACHER = "card0";
	/**
	 * 轮巡机位命名：教师全景
	 */
	public static final String TYPE_ROUNDROBIN_TEACHERALL = "card1";
	/**
	 * 轮巡机位命名：学生
	 */
	public static final String TYPE_ROUNDROBIN_STUDENT = "card2";
	/**
	 * 轮巡机位命名：学生全景
	 */
	public static final String TYPE_ROUNDROBIN_STUDENTALL = "card4";
	/**
	 * 轮巡机位命名：VGA
	 */
	public static final String TYPE_ROUNDROBIN_VGA = "card3";
	/**
	 * 轮巡机位命名：板书
	 */
	public static final String TYPE_ROUNDROBIN_BLACKBOARD = "card5";
	/**
	 * 轮巡分屏：2*2
	 */
	public static final String TYPE_SPLITSCREEN_TWO = "4";
	/**
	 * 轮巡分屏：3*3
	 */
	public static final String TYPE_SPLITSCREEN_THREE = "9";
	/**
	 * 轮巡分屏：4*4
	 */
	public static final String TYPE_SPLITSCREEN_FOUR = "16";
	/**
	 * 适用阶段：其他
	 */
	public static final String TYPE_SPLITSCREEN_OTHER = "0";
	/**
	 * 适用阶段：初中
	 */
	public static final String TYPE_SPLITSCREEN_JUNIOR = "3";
	/**
	 * 适用阶段：小学
	 */
	public static final String TYPE_SPLITSCREEN_SMALL = "4";
	/**
	 * 适用阶段：高中
	 */
	public static final String TYPE_SPLITSCREEN_HIGH = "6";
	/**
	 * 资源类型：其他
	 */
	public static final String TYPE_RESOURCETYPE_OTHER= "0";
	/**
	 * 资源类型：学案
	 */
	public static final String TYPE_RESOURCETYPE_LEARNCASE = "1";
	/**
	 * 资源类型：教案
	 */
	public static final String TYPE_RESOURCETYPE_LESSONPLAN = "2";
	/**
	 * 学科：其它
	 */
	public static final String TYPE_SUBJECT_OTHER = "0";
	/**
	 * 学科：数学
	 */
	public static final String TYPE_SUBJECT_MATHS = "Maths";
	/**
	 * 学科：语文
	 */
	public static final String TYPE_SUBJECT_CHINESE = "Chinese";
	/**
	 * 学科：英语
	 */
	public static final String TYPE_SUBJECT_ENGLISH = "English";
	/**
	 * 学科：物理
	 */
	public static final String TYPE_SUBJECT_PHYSICS = "Physics";
	/**
	 * 系统状态：有效
	 */
	public static final String TYPE_STATUS_EFFECTIVE = "0";
	/**
	 * 系统状态：无效
	 */
	public static final String TYPE_STATUS_INVALID = "1";
	
	/**
	 * 设备类型：录播机
	 */
	public static final String TYPE_DEVICETYPE_RECORD = "1";
	/**
	 * 设备类型：中控设备
	 */
	public static final String TYPE_DEVICETYPE_CENTRAL = "2";
	/**
	 * 设备类型：大屏
	 */
	public static final String TYPE_DEVICETYPE_SCREEN = "3";
	/**
	 * 身份：老师
	 */
	public static final String TYPE_IDENTITY_TEACHER = "1";
	/**
	 * 身份：学生
	 */
	public static final String TYPE_IDENTITY_STUDENT= "2";
	/**
	 * 状态：可用
	 */
	public static final String TYPE_STATE_AVAILABLE= "0";
	/**
	 * 状态：停用
	 */
	public static final String TYPE_STATE_DISABLE= "1";
	/**
	 * 设备状态：启动
	 */
	public static final String TYPE_EQUIPMENTSTATE_AVAILABLE= "0";
	/**
	 * 设备状态：停止
	 */
	public static final String TYPE_EQUIPMENTSTATE_DISABLE= "1";
	/**
	 * 录像模式：电影
	 */
	public static final String TYPE_EQUIPMENTSTATE_FILM= "film";
	/**
	 * 录像模式：资源
	 */
	public static final String TYPE_EQUIPMENTSTATE_RESOURCE= "resource";
	/**
	 * 录像模式：电影+资源
	 */
	public static final String TYPE_EQUIPMENTSTATE_FILMRESC= "filmResc";
	/**
	 * 消息分类：系统消息
	 */
	public static final String TYPE_MESSAGE_SYSTEM= "1";
	/**
	 * 消息分类：设备消息
	 */
	public static final String TYPE_MESSAGE_EQUIPMENT= "2";
	/**
	 * 消息分类：用户消息
	 */
	public static final String TYPE_MESSAGE_USER= "3";
	/**
	 * 消息分类：通知
	 */
	public static final String TYPE_MESSAGE_NOTICE= "4";
	/**
	 * 机构属性：年级
	 */
	public static final String TYPE_INSTITUTION_GRADE= "1";
	/**
	 * 机构属性：班级
	 */
	public static final String TYPE_INSTITUTION_CLASS= "2";
	/**
	 * 机构属性：学院
	 */
	public static final String TYPE_INSTITUTION_COLLEGE= "3";
	/**
	 * 机构属性：教研室
	 */
	public static final String TYPE_INSTITUTION_TEACHING= "4";
	/**
	 * 机构属性：部门
	 */
	public static final String TYPE_INSTITUTION_DEPARTMENT= "5";
	/**
	 * 机构属性：专业
	 */
	public static final String TYPE_INSTITUTION_PROFESSIONAL= "6";
	/**
	 * 手机接口所需的参数
	 * @author flowSnow
	 *
	 */
	public  interface MoblieConstants{
		
		/**
		 * 返回码：成功
		 */
		public static final String  RESPONSE_CODE_SUCCESS = "0";
		/**
		 * 返回码：失败
		 */
		public static final String  RESPONSE_CODE_FAILED = "1";
		/**
		 * 返回码：成功
		 */
		public static final String  RESPONSE_CODE_STRING_SUCCESS = "SUCCESS";
		/**
		 * 返回码：失败
		 */
		public static final String  RESPONSE_CODE_STRING_FAILED = "FAILED";
	}
	
	/**
	 * 评课相关 1 需要 0不需要
	 */
	public static final int  ASSESS_YES = 1;
	public static final int  ASSESS_NO = 0;
	/**
	 * 打分方式  0 五分制 1 分值 
	 */
	
	public static final String  MARKTYPE_WU = "0";
	public static final String  MARKTYPE_FEN = "1";
	
	public static final int  LIMIT_DATE = 27;
}  
