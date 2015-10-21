package com.zonekey.disrec.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Card;

@MyBatisRepository
public interface CardmidMapper extends BaseMapper<Card, String> {

	/**
	 * 导入发生错误插入临时表
	 */
	public void insertCardmid(Card errorCard);
	/**
	 从临时表中查出有错误的数据
	 */
	public List<Card> findCardmid(@Param("excelBatch")String excelbatch,@Param("flag")String flag);
}
