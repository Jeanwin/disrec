package com.zonekey.disrec.common.exception;

import com.zonekey.disrec.common.utils.LogUtilTools;

/**
 * 设备异常
 * @author window
 *
 */
public class DeviceException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7424024288016262580L;
	
	public DeviceException() {
		super();
    }  
  
    /** 
     * @param message 
     */  
    public DeviceException(String message) {  
        super(message);  
    }  
  
    /** 
     * @param cause 
     */  
    public DeviceException(Throwable cause) {  
        super(cause);  
    }  
  
    /** 
     * @param message 
     * @param cause 
     */  
    public DeviceException(String message, String objName) {  
    	super(message);
    	try {
			LogUtilTools.writeLog(objName,message,1);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
    }  

}
