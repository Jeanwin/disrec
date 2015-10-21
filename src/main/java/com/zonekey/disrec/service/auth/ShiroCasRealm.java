 /*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service.auth;

import java.util.HashSet;
import java.util.Set;

import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cas.CasRealm;
import org.apache.shiro.subject.PrincipalCollection;

/**
 * @Title: ShiroCasRealm.java
 * @Description: <p>ShiroCasRealm</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">崔卫翔</a> 
 * @date 2014-7-30 下午7:14:44   
 * @version v 1.0 
 */
public class ShiroCasRealm extends CasRealm {
	
	/*private UserService userService;  
    
	public void setUserService(UserService userService) {  
        this.userService = userService;  
    }*/
	
    @Override  
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {  
        String username = (String)principals.getPrimaryPrincipal();  
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        
        Set<String> roles = new HashSet<String>();
        roles.add("Role_admin");
        authorizationInfo.setRoles(roles);
        
        Set<String> perms = new HashSet<String>();
        perms.add("user:add");
        perms.add("user:del");
        authorizationInfo.setStringPermissions(perms);
        
//        authorizationInfo.setRoles(userService.findRoles(username));  
//        authorizationInfo.setStringPermissions(userService.findPermissions(username));  
        return authorizationInfo;  
    }  
}
