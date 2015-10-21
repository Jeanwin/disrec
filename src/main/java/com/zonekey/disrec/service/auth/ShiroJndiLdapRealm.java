/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service.auth;

import javax.naming.NamingException;
import javax.naming.ldap.LdapContext;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.realm.ldap.JndiLdapRealm;
import org.apache.shiro.realm.ldap.LdapContextFactory;
import org.apache.shiro.realm.ldap.LdapUtils;

/**
 * @Title: ShiroJndiLdapRealm.java
 * @Description: <p>ShiroJndiLdapRealm</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年8月26日 下午4:23:39
 * @version v 1.0
 */
public class ShiroJndiLdapRealm extends JndiLdapRealm {

	@Override
	protected AuthenticationInfo queryForAuthenticationInfo(
			AuthenticationToken token, LdapContextFactory ldapContextFactory)
			throws NamingException {

		// 从页面提交的用户名“root”
		Object principal = token.getPrincipal();
		// 从页面提交的口令“123456”
		Object credentials = token.getCredentials();


		// 将用户名拼成DN“cn=lisi,ou=产品研发部,ou=研发中心,dc=example,dc=com”
		principal = getLdapPrincipal(token);

		LdapContext ctx = null;
		try {
			// 进行认证
			ctx = ldapContextFactory.getLdapContext(principal, credentials);
			// context was opened successfully, which means their credentials
			// were valid. Return the AuthenticationInfo:
			return createAuthenticationInfo(token, principal, credentials, ctx);
		} finally {
			LdapUtils.closeContext(ctx);
		}
	}
}
