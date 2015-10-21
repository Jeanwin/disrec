 /*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.common;

public class MobileMsg {

	public String response_code;//响应参数 1 错误 0 正确
	public String describe;//请求功能描述
	public  String response_code_string;//响应描述
	public  String content;//返回主内容


	
	public String getDescribe() {
		return describe;
	}


	public void setDescribe(String describe) {
		this.describe = describe;
	}


	public String getResponse_code() {
		return response_code;
	}


	public void setResponse_code(String response_code) {
		this.response_code = response_code;
	}


	public String getResponse_code_string() {
		return response_code_string;
	}


	public void setResponse_code_string(String response_code_string) {
		this.response_code_string = response_code_string;
	}


	public String getContent() {
		return content;
	}


	public void setContent(String content) {
		this.content = content;
	}


	@Override
	public String toString() {
		return "MobileMsg [response_code=" + response_code + ", response_code_string=" + response_code_string + 
				", describe=" + describe + ", content="
				+ content + ", getClass()=" + getClass() + ", hashCode()="
				+ hashCode() + ", toString()=" + super.toString() + "]";
	}
	
	
	
	
}
