package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Card;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.vo.PageBean;
@MyBatisRepository
public interface CardMapper  extends BaseMapper<Card, String> {
	public int saveCard(Card card);

	public int deleteByKeys(@Param("list") List<Map<String, Object>> list);

	public int update(Card card);

	public long count(PageBean pageBean);

	public List<Card> findByPage(PageBean pageBean);

	public int lossCard(Card card);

	//获取教师列表
	public List<SysUser> getTeacherList();

	/**
	 *通过卡编号查找
	 */
	public List<Card> findCardByCardNum(String cardNumber);

	/**
	 *获取所有的特殊卡
	 */
	public List<Map<String, String>> getgetAllSpecialCard();

	/**
	 * 
	 * @param cardNumber 根据卡号获取人名和卡类型
	 * @return
	 */
	public Card getCardInformation(String cardNumber);

}