/*****************************
 * Copyright (c) 2014 by Zonekey Co. Ltd.  All rights reserved.
 ****************************/
package com.zonekey.disrec.service.auth.ldap;

import java.util.Enumeration;
import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.BasicAttribute;
import javax.naming.directory.BasicAttributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.ModificationItem;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @Title: LdapTest.java
 * @Description: <p>
 *               Ldap Test
 *               </p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date 2014年9月15日 下午8:13:02
 * @version v 1.0
 */
public class LdapTest {

	private final static Logger LOG = LoggerFactory.getLogger(LdapTest.class);
			
	public static void main(String[] args) {
		String account = "root";
		String password = "123456";
		String root = "dc=zonekey,dc=com"; // root

		Hashtable<String, Object> env = new Hashtable<String, Object>();
		env.put(Context.INITIAL_CONTEXT_FACTORY,
				"com.sun.jndi.ldap.LdapCtxFactory");
		env.put(Context.PROVIDER_URL, "ldap://192.168.12.105:389/" + root);
		env.put(Context.SECURITY_AUTHENTICATION, "simple");
		env.put(Context.SECURITY_PRINCIPAL, "cn=" + account + "," + root);
		env.put(Context.SECURITY_CREDENTIALS, password);

		DirContext ctx = null;
		try {
			// 链接ldap
			ctx = new InitialDirContext(env);
			System.out.println("ldap认证成功");

//			add(ctx, "hby");
//			add(ctx, "qaz", "123");
//			edit(ctx, "asdf", "wasd");
			find(ctx, "uid=hby");//"cn=user2"
//			delete(ctx, "asdf");
		} catch (javax.naming.AuthenticationException e) {
			LOG.warn("认证失败");
		} catch (Exception e) {
			LOG.warn("认证出错：");
		}

		if (ctx != null) {
			try {
				ctx.close();
			} catch (NamingException e) {
				// ignore
			}
		}
//		System.exit(0);
	}
	
	/** 
	 * @Title:add
	 * @Description: <p>添加节点</p>	
	 * @author cuiwx
	 * @date 2014年9月16日 上午10:03:43
	 * @param ctx
	 * @param newUserName
	 * @throws NamingException
	*/
	public static void add(DirContext ctx, String newUserName) throws NamingException {
		BasicAttributes attrsbu = new BasicAttributes();
		BasicAttribute objclassSet = new BasicAttribute("objectclass");
		objclassSet.add("person");
		objclassSet.add("top");
		objclassSet.add("organizationalPerson");
		objclassSet.add("inetOrgPerson");
		attrsbu.put(objclassSet);
		attrsbu.put("sn", newUserName);
		attrsbu.put("uid", newUserName);
		attrsbu.put("userPassword", "123");
		ctx.createSubcontext("cn=" + newUserName + ",ou=distributedt,ou=soft,ou=zonekey", attrsbu);
	}
	
	/** 
	 * @Title:add
	 * @Description: <p>添加节点</p>	
	 * @author cuiwx
	 * @date 2014年9月16日 上午10:03:43
	 * @param ctx
	 * @param uid
	 * @param password
	 * @throws NamingException
	*/
	public static void add(DirContext ctx, String uid, String password) throws NamingException {
		BasicAttributes attrsbu = new BasicAttributes();
		BasicAttribute objclassSet = new BasicAttribute("objectclass");
		objclassSet.add("account");
		objclassSet.add("top");
		objclassSet.add("posixAccount");
		objclassSet.add("shadowAccount");
		attrsbu.put(objclassSet);
		attrsbu.put("gidNumber", 1);
		attrsbu.put("uidNumber", 1);
		attrsbu.put("homeDirectory", "/" + uid);
		attrsbu.put("sn", uid);
		attrsbu.put("uid", uid);
		attrsbu.put("userPassword", password);
		ctx.createSubcontext("cn=" + uid + ",ou=distributedt,ou=soft,ou=zonekey,dc=zonekey,dc=com", attrsbu);
	}
	
	/** 
	 * @Title:edit
	 * @Description: <p>修改节点</p> 	
	 * @author cuiwx
	 * @date 2014年9月16日 上午10:03:48
	 * @param ctx
	 * @param account
	 * @param newDisplayName
	 * @throws NamingException
	*/
	public static void edit(DirContext ctx, String account, String newDisplayName) throws NamingException {
		ModificationItem modificationItem[] = new ModificationItem[1];
		modificationItem[0] = new ModificationItem(
				DirContext.REPLACE_ATTRIBUTE, new BasicAttribute(
						"displayName", newDisplayName));
		ctx.modifyAttributes("cn=" + account, modificationItem);
	}
	
	/** 
	 * @Title:find
	 * @Description: <p>查询节点</p>
	 * @author cuiwx
	 * @date 2014年9月16日 上午10:11:46
	 * @param ctx
	 * @param filter
	 * @throws NamingException
	*/
	public static void find(DirContext ctx, String filter) throws NamingException {
		SearchControls constraints = new SearchControls();
		constraints.setSearchScope(SearchControls.SUBTREE_SCOPE);
		// constraints.setSearchScope(SearchControls.ONELEVEL_SCOPE);
		NamingEnumeration<?> en = ctx.search("", filter, constraints); // 查询所有用户
		while (en != null && en.hasMoreElements()) {
			Object obj = en.nextElement();
			if (obj instanceof SearchResult) {
				SearchResult si = (SearchResult) obj;
				LOG.info("name:   " + si.getName());
				Attributes attrs = si.getAttributes();
				if (attrs == null) {
					LOG.info("No   attributes");
				} else {
					for (NamingEnumeration<?> ae = attrs.getAll(); ae
							.hasMoreElements();) {
						Attribute attr = (Attribute) ae.next();
						String attrId = attr.getID();

						for (Enumeration<?> vals = attr.getAll(); vals
								.hasMoreElements();) {
							LOG.info(attrId + ":   ");
							Object o = vals.nextElement();
							if (o instanceof byte[])
								LOG.warn(o.toString());// new
							// String((byte[])o)
							else
								LOG.warn(o.toString());
						}
					}
				}
			} else {
				LOG.info(obj.toString());
			}
			LOG.info(" ");
		}
	}
	
	/** 
	 * @Title:delete
	 * @Description: <p>删除节点</p>
	 * @author cuiwx
	 * @date 2014年9月16日 上午10:18:18
	 * @param ctx
	 * @param account
	 * @throws NamingException
	*/
	public static void delete(DirContext ctx, String account) throws NamingException {
		ctx.destroySubcontext("cn=" + account);
	}
}
