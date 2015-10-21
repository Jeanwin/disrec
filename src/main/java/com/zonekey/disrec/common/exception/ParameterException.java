package com.zonekey.disrec.common.exception;

import com.zonekey.disrec.common.utils.LogUtilTools;

public class ParameterException extends RuntimeException{
	/**
	 * 参数异常
	 */
	private static final long serialVersionUID = 4509551214232357965L;

	public ParameterException() {  
		
    }  
  
    public ParameterException(String message) {  
        super(message);  
    }  
    public ParameterException(String message,Throwable cause) {  
        super(message);  
    } 
    public ParameterException(Throwable cause) {  
        super(cause);  
    }  
  
    public ParameterException(String message,String objName,Throwable cause) {
    	super(message,cause);  
    	try {
			LogUtilTools.writeLog(message,objName,2);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
    }  
    public ParameterException(String message,String objName) {
    	super(message);  
    	try {
			LogUtilTools.writeLog(objName,message,1);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
    }  
}
