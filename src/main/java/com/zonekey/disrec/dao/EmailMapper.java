package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.entity.Email;

public interface EmailMapper {


    public int updateByPrimaryKeySelective(Email record);

    public int deleteByKeys(@Param("list")List<Map<String, Object>> list);

	public List<Email> getEmails();

	public int insert(List<Email> emails);

}