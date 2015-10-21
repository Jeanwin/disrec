package com.zonekey.disrec.service.echarts.velocity;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.velocity.app.VelocityEngine;

public class VelocityTemplateEngine {

	private static VelocityEngine ve = new VelocityEngine();

	private static Log log = LogFactory.getLog(VelocityTemplateEngine.class);

	/**
	 * 加载配置文件
	 */
	static {
		try {
			URL url = VelocityTemplateEngine.class.getResource("/velocity.properties");
			log.info("tpl's velocity.properties url:" + url);
			File file = new File(url.getFile());
			InputStream inputStream = new FileInputStream(file.getCanonicalFile());

			String parentPath = file.getParentFile().getCanonicalPath();
			log.debug("tpl's configs path:" + parentPath);

			Properties properties = new Properties();
			properties.load(inputStream);

			properties.setProperty("file.resource.loader.path", parentPath + "/com/zonekey/disrec/velocity");
			ve.init(properties);

		} catch (Exception e) {
			e.printStackTrace();
			log.error("tpl's velocity.properties init error!");
		}
	}

	public static VelocityEngine getVelocityEngine() {
		return ve;
	}
}
