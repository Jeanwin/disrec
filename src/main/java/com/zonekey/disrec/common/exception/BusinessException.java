package com.zonekey.disrec.common.exception;

import com.zonekey.disrec.common.utils.LogUtilTools;

/**
 * 业务异常
 * @author window
 *
 */
public class BusinessException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4509551214232357965L;

	public BusinessException() {  
		
    }  
  
    public BusinessException(String message) {  
        super(message);  
    }  
  
    public BusinessException(Throwable cause) {  
        super(cause);  
    }  
  
    public BusinessException(String message,String objName) {
    	super(message);  
    	try {
			LogUtilTools.writeLog(objName,message,1);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
    }  
	
}
