package com.zonekey.disrec.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexUtils {
    public static boolean isEmail(String email) {
	String str = "^([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\\.][A-Za-z]{2,3}([\\.][A-Za-z]{2})?$";
	Pattern p = Pattern.compile(str);
	Matcher m = p.matcher(email);
	return m.matches();
    }

    public static boolean isMAC(String mac) {
	String str = "^[A-F\\d]{2}[A-F\\d]{2}[A-F\\d]{2}[A-F\\d]{2}[A-F\\d]{2}[A-F\\d]{2}$";
	Pattern p = Pattern.compile(str);
	Matcher m = p.matcher(mac);
	return m.matches();
    }

    public static boolean isIP(String ip) {
	String str = "^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$";
	Pattern p = Pattern.compile(str);
	Matcher m = p.matcher(ip);
	return m.matches();
    }

    // 验证用户密码："^[a-zA-Z0-9]{6,16}$"正确格式为：以字母开头，长度在6~18之间，只能包含字符、数字和下划线。
    public static boolean isPassword(String password){
        String str = "^[a-zA-Z0-9]{6,16}$";
        Pattern p = Pattern.compile(str);
        Matcher m = p.matcher(password);
        return m.matches();
    }
}
