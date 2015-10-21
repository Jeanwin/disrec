package com.zonekey.disrec.service.auth;

import org.apache.shiro.authc.UsernamePasswordToken;

public class Token extends UsernamePasswordToken {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String code;
	private String username;
	private char[] password;
	
	public Token(final String username, final String password,final String code){
		 this.username = username;
	     this.password = password != null?password.toCharArray():null;
	     this.code = code;
	}
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public char[] getPassword() {
		return password;
	}
	public void setPassword(char[] password) {
		this.password = password;
	}
}
