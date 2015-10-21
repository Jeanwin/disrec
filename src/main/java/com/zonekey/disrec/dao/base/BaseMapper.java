/*****************************
* Copyright (c) 2012 by Artron Co. Ltd.  All rights reserved.
****************************/
package com.zonekey.disrec.dao.base;

import java.io.Serializable;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
* @Title: BaseMapper.java
* @Description: <p>数据库公共接口类</p>
* @author <a href="mailto:cuiwx@zonekey.com.cn">崔卫翔</a> 
* @date 2014-7-29 下午2:31:26   
* @version v 1.0
* @param <T>
* @param <PK> 
*/ 
public interface BaseMapper<T ,PK extends Serializable> extends PagingAndSortingRepository<T ,PK> {


	/** 
	 * @Title:findByPage
	 * @Description: <p>查询分页的对象</p>	
	 * @author cuiwx
	 * @date 2014年9月23日 下午2:37:07
	 * @param offset	页数
	 * @param limit	页行
	 * @return
	*/
	List<T> findByPage(@Param("offset")int offset, @Param("limit")int limit);
	
	/** 
	 * @Title:insert
	 * @Description: <p>新增对象</p>
	 * @author cuiwx
	 * @date 2014年9月23日 下午2:37:07
	 * @param entity
	*/
	int insert(T entity);
	
	/** 
	 * @Title:update
	 * @Description: <p>修改对象</p>
	 * @author cuiwx
	 * @date 2014年9月23日 下午2:37:07
	 * @param entity
	*/
	int update(T entity);
	
	/** 
	 * @Title:delete
	 * @Description: <p>逻辑删除对象</p>
	 * @author cuiwx
	 * @date 2014年9月23日 下午2:37:07
	 * @param entity
	*/
	void delete(T entity);
	
	/** 
	 * @Title:del
	 * @Description: <p>逻辑删除对象</p>
	 * @author cuiwx
	 * @date 2014年9月23日 下午2:37:07
	 * @param entity
	*/
	int del(T entity);
	
}
