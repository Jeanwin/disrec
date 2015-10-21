package com.zonekey.disrec.common;

import java.util.List;

import javax.annotation.Resource;

import net.spy.memcached.MemcachedClient;

import com.zonekey.disrec.dao.SysCodeMapper;

public class CacheUtil {
	@Resource
	SysCodeMapper mapper;
	MemcachedClient memcache;
	int REF_SECONDS = 3*60;
	/**
	 * 获取缓存数据
	 * @param key
	 * @return
	 */
	public  String get(String key){
		String value = (String) memcache.get(key);
		return value;
	}
	
	
	/**
	 * 更新缓存数据
	 * @param key
	 * @return
	 */
	public  void update(String key){
		String value = get(key);
		
		memcache.set(key, REF_SECONDS, value);
	}
	
	/**
	 * 删除缓存数据
	 * @param key
	 * @return
	 */
	public  void delete(String key){
		memcache.delete(key);
	}
	
	/**
	 * 添加缓存数据
	 * @param key
	 * @return
	 */
	public  void add(String key,String json){
		memcache.add(key, REF_SECONDS, json);
	}
	
	/**
	 * 添加缓存数据
	 * @param key
	 * @return
	 */
	public  void add(String key,Object o){
		memcache.add(key, REF_SECONDS, o);
	}


	public void setMemcache(MemcachedClient memcache) {
		this.memcache = memcache;
		/*List<String> list = mapper.findParentId();
		for (String parentId : list) {
			String json = JsonUtil.toJson(mapper.findAll(parentId));
			add(parentId, json);
		}*/
	}


	public void setREF_SECONDS(int rEF_SECONDS) {
		REF_SECONDS = rEF_SECONDS;
	}
	
}
