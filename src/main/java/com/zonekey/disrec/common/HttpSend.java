package com.zonekey.disrec.common;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
/**
 * 用于远程访问数据
 * @author gly
 *
 */
public class HttpSend {
	private static String send(HttpResponse response,Object param){
		String result = "";
		BufferedReader rd = null;
		try {
			if(response.getStatusLine().getStatusCode() == HttpStatus.SC_OK){
				rd = new BufferedReader(
						new InputStreamReader(response.getEntity()
								.getContent(), "utf-8"));
				String line = "";
				while ((line = rd.readLine()) != null) {
					result += line;
				}
				return result;
			}
			}catch(Exception e){
				e.printStackTrace();
			}finally {
				try {
					if (rd != null) {
						rd.close();
					}
				} catch (Exception e2) {
					e2.printStackTrace();
				}
			}
		return null;
	}
	/**
	 * post方式远程获取数据
	 * @param url
	 * @param param
	 * @return
	 */
	public static String post(String url,Object param) {
		HttpPost post = new HttpPost(url);
		try {
			post.setEntity(new StringEntity(JsonUtil.toJson(param)));
			HttpResponse response = new DefaultHttpClient().execute(post);
			return send(response, param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * get方式远程获取数据
	 * @param url
	 * @param param
	 * @return
	 */
	public static String get(String url) {
		HttpGet get = new HttpGet(url);
		try {
			HttpResponse response = new DefaultHttpClient().execute(get);
			return send(response, null);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * put方式远程获取数据
	 * @param url
	 * @param param
	 * @return
	 */
	public static String put(String url,Object param) {
		HttpPut put = new HttpPut(url);
		try {
			put.setEntity(new StringEntity(JsonUtil.toJson(param)));
			HttpResponse response = new DefaultHttpClient().execute(put);
			return send(response, param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
