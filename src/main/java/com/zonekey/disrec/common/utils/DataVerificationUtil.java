package com.zonekey.disrec.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

/**
 * 
* @ProjectName:wjjs
* @ClassName: DataVerificationUtil 
* @Description: 数据验证工具类 
* @author qiulina
* @date 2014-11-5 上午9:04:33 
* @version V1.0
 */
public class DataVerificationUtil {
	/**
	* @Title: checkString 
	* @Description:验证字符串中是否有特殊字符(字符串中只包含数字、字母)
	* @param str 待验证的字符串
	* @return 验证结果 (true--验证通过 false--验证没有通过)
	 */
	public static boolean checkString(String str){
		return checkRegex(str,"[0-9a-zA-Z]+");
	}
	/**
	* @Title checkUnderlineLetterNumber 
	* @Description 验证字符串中是否有特殊字符(字符串中只包含数字、字母、下划线)
	* @param str
	* @return
	 */
	public static boolean checkUnderlineLetterNumber(String str){
		return checkRegex(str,"[a-zA-Z0-9_]+");
	}
	/**
	* @Title checkUnderlineNumber 
	* @Description 验证字符串中是否有特殊字符(字符串中只包含数字、下划线)
	* @param str
	* @return
	 */
	public static boolean checkUnderlineNumber(String str){
		return checkRegex(str,"[0-9_]+");
	}
	/**
	 * 
	* @Title: checkStatus 
	* @Description: 验证0或者1状态的标记(比如性别,知名学者标识,是否重点教师等)
	* @param str
	* @return
	 */
//	public static boolean checkStatus(String str){
//		return checkRegex(str,"[0,1]");
//	}
	
	/**
	 * 
	* @Title: checkAlphabet 
	* @Description: 验证字符串只接受英文字母大小写
	* @param str 待验证的字符串 
	* @return
	 */
	public static boolean checkAlphabet(String str){
		return checkRegex(str,"[a-zA-Z]+");
	}
	
	/**
	 * 
	* @Title: checkPhone 
	* @Description: 验证固定电话或者是移动电话 
	* @param str 待验证的字符串 
	* @return
	 */
	public static boolean checkPhone(String str){
		return checkRegex(str,"([\\+][0-9]{1,3}([ \\.\\-])?)?([\\(][0-9]{1,6}[\\)])?([0-9 \\.\\-]{1,32})(([A-Za-z \\:]{1,11})?[0-9]{1,4}?)");
	}
	/**
	 * 
	* @Title: checkEmail 
	* @Description: 验证邮箱地址
	* @param str 待验证的字符串
	* @return
	 */
	public static boolean checkEmail(String str){
		return checkRegex(str,"[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+");
	}
	/**
	 * 
	* @Title: checkNUmber 
	* @Description: 验证只能为数字
	* @param str 待验证的字符串
	* @return
	 */
	public static boolean checkNumber(String str){
		return checkRegex(str,"[0-9]*");
	}
	
	public static boolean checkInteger(String str){
		return checkRegex(str,"[1-9]\\d*");
	}
	/**
	 * 
	* @Title: checkLength 
	* @Description: 检查输入的字符串是否在规定的长度中
	* @param str 待验证的字符串
	* @param length 固定的长度
	* @return
	 */
	public static boolean checkLength(String str,int length){
		int  len = 0;
		boolean flag = false;
		if(StringUtils.isNotBlank(str)) {
			str = str.trim();
			for ( int  i = 0; i < str.length(); i++) {
				char c = str.charAt(i);
				if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'z')
						|| (c >= 'A' && c <= 'Z')) {
						//字母, 数字
						len++;
				} else {
					if (Character.isLetter(c)) { //中文
						len += 2;
					} else { //符号或控制字符
						len++;
					}
				}
			}
		}
		if(len == 0){
			flag =  false;
		}else{
			if(len <= length){
				flag =  true;
			}
		} 
			return flag;
	}
	/**
	* @Title: checkDate 
	* @Description: 验证字符串是否是规定的日期格式
	* @param str
	* @param format
	* @return
	 */
	public static boolean checkDate(String str,String format){
		boolean flag = false;
		if(StringUtils.isNotBlank(format)){
			if("yyyy-MM-dd".equals(format)){
				flag = checkRegex(str,"\\d{4}[\\/\\-](0?[1-9]|1[012])[\\/\\-](0?[1-9]|[12][0-9]|3[01])");
			}else if("yyyy-MM-dd HH:mm:ss".equals(format)){
				flag = checkRegex(str,"\\d{4}[\\/\\-](0?[1-9]|1[012])[\\/\\-](0?[1-9]|[12][0-9]|3[01])\\s+([0-1][0-9]|[2][0-3]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}");
			}else{
				flag = false;
			}
		}
		return flag;
	}
	/**
	 * 
	* @Title: checkRegex 
	* @Description: 验证字符串是否符合给定的正则表达式
	* @param str
	* @param reg
	* @return
	 */
	private  static boolean checkRegex(String str,String reg){
		boolean flag = false;
		if(StringUtils.isNotBlank(str)) {
			str = str.trim();
			Pattern p = Pattern.compile(reg);
			Matcher m = p.matcher(str);
			flag = m.matches();
		}else{
			flag = false;
		}
		return flag;
	}
	
	
}
