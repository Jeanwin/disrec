package com.zonekey.disrec.common;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springside.modules.mapper.JsonMapper;

import com.zonekey.disrec.vo.PageBean;

public class JsonUtil {
	 private static JsonMapper jsonMapper = JsonMapper.nonDefaultMapper();
	    
	    public static void main(String[] args) {
			String str = "[{'id': '141840a76e5b4a35bf6454a8aa2c6f25','score': '舒服' },{'id': '7cd20d196eab4270b40965ffc61325f7','score': '松岛枫'}]";
//			 List<Map<String,Object>> mapListJson = (List)jsonToArray(str);  
			List<Map<String,Object>> mapListJson = jsonToObject(str.replace("'", "\""), List.class);
			System.out.println(mapListJson);
	    }
	    
//	    public static <T> T jsonToArray(Object json) {
//	    	JSONArray jsonArray = JSONArray.fromObject(json);
//			return (T) jsonArray;
//	    }
	    
//	    public static JSONArray ListTojson(List list) {
//	    	JSONArray json = new JSONArray();  
//	        json.addAll(list);  
//			return json;
//	    }
	    
	    /**
	     * 
	     * @param object
	     * @return
	     */
    public static String toJson(Object object) {
        String json = jsonMapper.toJson(object);
        return json;
    }
    /**
     * 
     * @param json
     * @param clazz
     * @return
     */
    public static <T> T jsonToObject(Object json, Class<T> clazz) {
    	if(json instanceof HttpServletRequest){
    		HttpServletRequest req = (HttpServletRequest) json;
    		try {
				String str = new BufferedReader(new InputStreamReader(req.getInputStream(),"utf-8")).readLine();
				return jsonMapper.fromJson(str, clazz);
			} catch (Exception e) {
				return null;
			}
    	}
        return jsonMapper.fromJson(String.valueOf(json), clazz);
    }
    
   
    /**
     * 分页查找
     * @param json
     * @return
     */
    @SuppressWarnings("unchecked")
	public static PageBean jsonToPage(HttpServletRequest req) {
    	PageBean pageBean = new PageBean();
		try {
			String str = new BufferedReader(new InputStreamReader(req.getInputStream(),"utf-8")).readLine();
			Map<String,Object> map = jsonToObject(str, Map.class);
			
			if(map.get("keywords") != null&&!"".equals(map.get("keywords"))){
				 pageBean = jsonMapper.fromJson(str, PageBean.class);
			}
			if(map.get("treeid")!= null&&map.get("treeid")!=""){
				pageBean.setTreeid(String.valueOf(map.get("treeid")));
			}
			 Map<String,Object> page = (Map<String, Object>) map.get("page");
			 if(page !=null){
				 int limit = Integer.parseInt(page.get("limit").toString());
				 int offset = (Integer.parseInt(page.get("offset").toString())-1)*limit;
				 page.put("offset", offset);
				 pageBean.setPage(page);
			 }
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return pageBean;
    }
    /**
     * 分页查找
     * @param json
     * @return
     */
    @SuppressWarnings("unchecked")
	public static PageBean jsonToPage2(HttpServletRequest req) {
    	PageBean pageBean = new PageBean();
		try {
			String str = new BufferedReader(new InputStreamReader(req.getInputStream(),"utf-8")).readLine();
			Map<String,Object> map = jsonToObject(str, Map.class);
			
			if(map.get("keywords") != null&&!"".equals(map.get("keywords"))){
				 pageBean = jsonMapper.fromJson(str, PageBean.class);
			}
			if(map.get("treeid")!= null&&map.get("treeid")!=""){
				pageBean.setTreeid(String.valueOf(map.get("treeid")));
			}
			 Map<String,Object> page = (Map<String, Object>) map.get("page");
			 int limit = Integer.parseInt(page.get("pageSize").toString());
			 int offset = (Integer.parseInt(page.get("pageIndex").toString())-1)*limit;
			 page.put("limit", limit);
			 page.put("offset", offset);
			 pageBean.setPage(page);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return pageBean;
    }
    
}
