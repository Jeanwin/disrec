package com.zonekey.disrec.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogUtilTools {
	public static Logger log = null;

	public LogUtilTools() {
		log = LoggerFactory.getLogger(getClass());
	}

	/**
	 * 
	 * @param ObjName className
	 * @param msg
	 * @param logLevel 0 info 1 debug 2 err
	 * @throws ClassNotFoundException
	 */
	public static final void writeLog(String ObjName, String msg, int logLevel) throws ClassNotFoundException {

		try {
			log = LoggerFactory.getLogger(Class.forName(ObjName));
			switch (logLevel) {
			case 0:
				log.info("**************系统记录日志 START**********");
				log.info(msg);
				log.info("**************系统记录日志 END**********");
				break;
			case 1:
				log.debug("**************系统调试日志 START**********");
				log.debug(msg);
				log.debug("**************系统调试日志 END**********");
				break;
			case 2:
				log.error("**************系统异常日志 START**********");
				log.error(msg);
				log.error("**************系统异常日志 END**********");
				break;

			default:
				break;
			}

		} catch (Exception e) {
			throw new ClassNotFoundException();
		}

	}
}
