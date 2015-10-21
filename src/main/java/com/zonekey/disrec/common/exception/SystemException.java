package com.zonekey.disrec.common.exception;

import com.zonekey.disrec.common.utils.LogUtilTools;

/**
 * 系统异常
 * @author window
 *
 */
public class SystemException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4509551214232357965L;

	public SystemException() {  
		
    }  
  
    public SystemException(String message) {  
        super(message);  
    }  
  
    public SystemException(Throwable cause) {  
        super(cause);  
    }  
  
    public SystemException(String message,String objName) {
    	super(message);  
    	try {
			LogUtilTools.writeLog(objName,message,1);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
    }  
	
}
