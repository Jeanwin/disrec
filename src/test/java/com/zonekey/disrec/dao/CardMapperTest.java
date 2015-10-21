package com.zonekey.disrec.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.entity.Card;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.service.CardService;
import com.zonekey.disrec.vo.PageBean;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationContext.xml"})
public class CardMapperTest extends AbstractJUnit4SpringContextTests {
	
	@Autowired
	private CardMapper cardMapper;
	@Autowired
	private CardmidMapper cardmidMapper;
	@Autowired
	private CardService cardService;
	@Test
	public void run1(){
		//增加或修改
		/*Card card = new Card();
		card.setId("2");
		card.setCardNumber("1002");
		card.setCardType("0");
		card.setCardPerson("qq2");
		card.setCardPersonId("001");
		cardMapper.saveCard(card);*/
		//删除
		/*Map map = new HashMap<String, String>();
		map.put("id", "1");
		List list = new ArrayList<Map<String, Object>>();
		list.add(map);*/
		//cardMapper.deleteByKeys(list);
		//cardMapper.update(card);
		//cardMapper.saveCard(card);
		//System.out.println(cardService.saveCard(card));
		//cardService.delete(list);
		//cardService.update(card);
		//查询
		/*PageBean pageBean = new PageBean();
		Map<String, Object> page = new HashMap<String, Object>();
		page.put("offset", 0);
		page.put("limit", 10);
		pageBean.setPage(page);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("keyword", "100");
		pageBean.setKeywords(map);
		List<Card> cards = cardMapper.findByPage(pageBean);
		long count = cardMapper.count(pageBean);
		System.out.println(cards.size());
		System.out.println(count);*/
		//丢卡
		Card card = new Card();
		card.setId("2dc7e252c9f74881b3f653b03443d1b4");
		card.setCardState("1");
		card.setLossDate("2015/10/22 8:30:8");
		cardMapper.lossCard(card);
	}
	@Test
	public void run2(){
		Card errorCard=new Card();
	  	errorCard.setId(IdUtils.uuid2());
	  	errorCard.setCardNumber("1001");
	  	errorCard.setCardPerson("qq");
	  	errorCard.setCardPersonId("001");
	  	errorCard.setExcelBatch("2015620521131");
	  	errorCard.setDeleteflag("0");
	  	errorCard.setCardState("0");
	  	errorCard.setCardType("0");
	  	errorCard.setFlag("0");
	  	cardmidMapper.insertCardmid(errorCard);
		/*List<Card> cards = cardmidMapper.findCardmid("2015620521131", "0");
		System.out.println(cards.size());*/
		List<SysUser> list = cardMapper.getTeacherList();
		System.out.println(list.size());
  	}
}














