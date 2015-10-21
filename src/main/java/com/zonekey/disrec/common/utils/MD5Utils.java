package com.zonekey.disrec.common.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/** 
 * @{#} MD5.java Create on Sep 5, 2008 4:54:43 PM 
 * <p>
 *  MD5 加密.
 * </p>
 * @author <a href="mailto:cwx714@hotmail.com">cuiwx</a>
 * @version v 0.1
 */
public class MD5Utils {
	
	public static final int OXFF = 0xff;
	public static final int OX10 = 0x10;
	
	/**
	 * 
	 */
	private MD5Utils() {
		
	}
	
    /**
     * Encodes a string.
     *
     * @param str String to encode
     * @return Encoded String
     * @throws NoSuchAlgorithmException java.security.NoSuchAlgorithmException
     */
    public static String md5(String str) {
        if (str == null || str.length() == 0) {
            return null;
        }

        StringBuffer buf = new StringBuffer();

        MessageDigest md = null;
		try {
			md = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
        md.update(str.getBytes());
        byte[] hash = md.digest();

        for (byte aHash : hash) {
            if ((OXFF & aHash) < OX10) {
            	buf.append("0").append(Integer.toHexString((OXFF & aHash)));
            } else {
            	buf.append(Integer.toHexString(OXFF & aHash));
            }
        }

        return buf.toString();
    }
}
