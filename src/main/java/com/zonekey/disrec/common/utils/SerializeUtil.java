/*****************************
 * Copyright (c) 2013 by Artron Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.common.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

/**
 * @Title: SerializeUtil.java
 * @Description: <p>
 *               序列化工具类，来提供对象的序列化和反序列化的工作。
 *               </p>
 * @author <a href="mailto:cwx@artron.com">崔卫翔</a>
 * @date 2013-7-9 下午5:05:04
 * @version v 1.0
 */
public class SerializeUtil {
	
	public static byte[] serialize(Object object) {
		ObjectOutputStream oos = null;
		ByteArrayOutputStream baos = null;
		try {
			// 序列化
			baos = new ByteArrayOutputStream();
			oos = new ObjectOutputStream(baos);
			oos.writeObject(object);
			byte[] bytes = baos.toByteArray();
			return bytes;
		} catch (Exception e) {

		}
		return null;
	}

	public static Object unserialize(byte[] value, Class<Object> cls) {
		ByteArrayInputStream bais = null;
		try {
			// 反序列化
			bais = new ByteArrayInputStream(value);
			ObjectInputStream ois = new ObjectInputStream(bais);
			return ois.readObject();
		} catch (Exception e) {

		}
		return null;
	}
}
