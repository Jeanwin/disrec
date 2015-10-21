package com.zonekey.disrec.service;

import java.util.List;
import java.util.Map;

import jxl.Sheet;
import jxl.Workbook;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.zonekey.disrec.common.DateTermUtil;
import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.utils.IdUtils;
import com.zonekey.disrec.dao.CardMapper;
import com.zonekey.disrec.dao.CardmidMapper;
import com.zonekey.disrec.dao.SysUserMapper;
import com.zonekey.disrec.entity.Card;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.entity.Sysimportinfo;
import com.zonekey.disrec.service.base.BaseService;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.SysUserView;

@Component
@Transactional(readOnly = true)
public class CardService extends BaseService {
	@Autowired
	private CardMapper cardMapper;
	@Autowired
	private CardmidMapper cardmidMapper;
	public int excelrow=1;
	@Autowired
	private SysUserMapper sysUserMapper;
	@Autowired
	private SysimportinfoService sysimportinfoService;
	
	@Transactional(readOnly = false)
	public int saveCard(Card card) {
		if(null==card){
			return 0;
		}
		card.setId(IdUtils.uuid2());
		card.setCardState("0");
		String flag = checkCardNumUnique(card.getCardNumber());
		if("0".equals(flag)){
			cardMapper.saveCard(card);
			return 1;
		}
		return 0;
	}
	@Transactional(readOnly = false)
	public int delete(List<Map<String, Object>> list) {
		if(null==list && list.size()>0){
			return 0;
		}
		return cardMapper.deleteByKeys(list);
	}

	@Transactional(readOnly = false)
	public int update(Card card) {
		if(null==card){
			return 0;
		}
		return cardMapper.update(card);
	}

	public String checkCardNumUnique(String cardNumber){
		//0:卡号唯一 1：卡号不唯一
		List<Card> cards =cardMapper.findCardByCardNum(cardNumber);
		if(null!=cards&&cards.size()>0){
			return "1";
		}else{
			return "0";
		}
	}
	public Page<Card> findPageBy(PageBean pageBean) {
		long total = cardMapper.count(pageBean);
		List<Card> list = cardMapper.findByPage(pageBean);
		Page<Card> page = new PageImpl<Card>(list,null,total);
		return page;
	}
	
	@Transactional(readOnly = false)
	public int lossCard(Card card) {
		if(null==card){
			return 0;
		}
		return cardMapper.lossCard(card);
	}

	@SuppressWarnings({ "finally"})
	@Transactional(readOnly = false)
	public JsonMsg readExcel(MultipartFile file) {
		int flag=0;
		 Workbook book;
		 String systime=DateTermUtil.getNowTime().replace(" ", "").replace("-", "").replace(":", "").trim();
		 JsonMsg msg = new JsonMsg();
			try {
				book = Workbook.getWorkbook(file .getInputStream());
				 //读取sheet
	             Sheet sheet=book.getSheet(0); 
	             int row = sheet.getRows();
	             excelrow=row-1;
	             for(int i = 1; i < row; i++) {
	            	  Card card=new Card();
	            	  //日志类
	            	  Sysimportinfo sysimportinfo=new Sysimportinfo();
	            	  sysimportinfo.setImportid(systime);
	            	  sysimportinfo.setImportdate(DateTermUtil.getNowTime());
	            	  sysimportinfo.setExcelid(i);
	            	  String cardNumber=sheet.getCell(0,i).getContents();
	            	  String cardPersonId=sheet.getCell(1,i).getContents();
	            	  String cardPerson=sheet.getCell(2,i).getContents();
	            	  String cardType=sheet.getCell(3,i).getContents();
	            	
	            	  //默认有效
//	            	  addsysUserView.setStatus("20");
	            	  Card errorCard=new Card();
	            	  errorCard.setId(IdUtils.uuid2());
	            	  errorCard.setCardNumber(cardNumber);
	            	  errorCard.setCardPerson(cardPerson);
	            	  errorCard.setCardPersonId(cardPersonId);
	            	  errorCard.setExcelBatch(systime);
	            	  errorCard.setDeleteflag("0");
	            	  errorCard.setCardState("0");
	            	  if("普通卡".equals(cardType.trim())){
	            		  errorCard.setCardType("0");
            		  }
            		  if("特殊卡".equals(cardType.trim())){
            			  errorCard.setCardType("1");
            		  }
	            	  //判断卡号不能为空
	            	  if(StringUtils.isNotEmpty(cardNumber)){
	            		  String f = checkCardNumUnique(cardNumber);
		            	  if("0".equals(f)){
		            		  card.setCardNumber(cardNumber);
		            	  }else{
		            		//该条数据卡号为空，不合法数据，记录到日志
		            		  sysimportinfo.setStatus(1);
		            		  sysimportinfo.setError("该条数据卡号不唯一，不合法数据");
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            		  //
		            		  errorCard.setFlag("1");
		            		  errorCard.setErrorDescribe("该条数据卡号不唯一，不合法数据");
		            		  cardmidMapper.insertCardmid(errorCard);
		            		  flag++;
		            		  continue;
		            	  }
	            	  }else{
	            		  //该条数据卡号为空，不合法数据，记录到日志
	            		  sysimportinfo.setStatus(1);
	            		  sysimportinfo.setError("该条数据卡号为空，不合法数据");
	            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
	            		  //
	            		  errorCard.setFlag("1");
	            		  errorCard.setErrorDescribe("该条数据卡号为空，不合法数据");
	            		  cardmidMapper.insertCardmid(errorCard);
	            		  flag++;
	            		  continue;
	            	  }
	            	  
	            	  //判断持卡人Id不能为空
	            	  if(StringUtils.isNotEmpty(cardPersonId)){
	            		  SysUserView sysUserView = sysUserMapper.finduserByLoginname(cardPersonId);
	            		  if(null!=sysUserView){
	            			  card.setCardPersonId(cardPersonId); 
	            		  }else{
	            			  //该条数据持卡人Id为空，不合法数据，记录到日志
		            		  sysimportinfo.setStatus(1);
		            		  sysimportinfo.setError("该条数据持卡人不存在，不合法数据");
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            		  //
		            		  errorCard.setFlag("1");
		            		  errorCard.setErrorDescribe("该条数据持卡人不存在，不合法数据");
		            		  cardmidMapper.insertCardmid(errorCard);
		            		  flag++;
		            		  continue;
	            		  }
	            	  }else{
	            		  //该条数据持卡人Id为空，不合法数据，记录到日志
	            		  sysimportinfo.setStatus(1);
	            		  sysimportinfo.setError("该条数据持卡人Id为空，不合法数据");
	            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
	            		  //
	            		  errorCard.setFlag("1");
	            		  errorCard.setErrorDescribe("该条数据持卡人Id为空，不合法数据");
	            		  cardmidMapper.insertCardmid(errorCard);
	            		  flag++;
	            		  continue;
	            	  }
	            	//判断持卡人不能为空
	            	  if(StringUtils.isNotEmpty(cardPerson)){
	            		  card.setCardPerson(cardPerson);
	            	  }else{
	            		  //该条数据持卡人为空，不合法数据，记录到日志
	            		  sysimportinfo.setStatus(1);
	            		  sysimportinfo.setError("该条数据用户姓名为空，不合法数据");
	            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
	            		  //
	            		  errorCard.setFlag("1");
	            		  errorCard.setErrorDescribe("该条数据用户姓名为空，不合法数据");
	            		  cardmidMapper.insertCardmid(errorCard);
	            		  flag++;
	            		  continue;
	            	  }
	            	  //卡类型不能为空
	            	  if(StringUtils.isNotEmpty(cardType)){
	            		  if(cardType != null){
	            			  if("普通卡".equals(cardType.trim())){
		            			  card.setCardType("0");
		            		  }else{
		            			  card.setCardType("1");
		            		  }
	            		  }else{
	            			  //该条数据卡类型不存在，记录到日志
		            		  sysimportinfo.setStatus(1);
		            		  sysimportinfo.setError("该条数据卡类型不存在，不合法数据");
		            		  sysimportinfoService.insertSysimportinfo(sysimportinfo);
		            		  //
		            		  errorCard.setFlag("1");
		            		  errorCard.setErrorDescribe("该条数据卡类型不存在，不合法数据");
		            		  cardmidMapper.insertCardmid(errorCard);
		            		  flag++;
		            		  continue;
	            		  }
	            	  }
	            	 try{
	            	 //一人一卡（未删除）
            		  //新增
            		  saveCard(card);
	            	 }catch(Exception e){
	            		 e.printStackTrace();
	            	 }
	            	  sysimportinfo.setStatus(0);
	            	  sysimportinfoService.insertSysimportinfo(sysimportinfo);
	              }
			} catch (Exception e) {
				flag++;
				e.printStackTrace();
			}
			finally{
				if(flag >0 && flag< excelrow){
					msg.setId("2");
					msg.setName(systime);
					msg.setOperation("导入部分失败");
				}else if(flag == excelrow){
					msg.setId("0");
					msg.setName(systime);
					msg.setOperation("导入全部失败");
				}else if(flag == 0){
					msg.setId("1");
					msg.setName(systime);
					msg.setOperation("导入成功");
				}
				return msg;
			}
	}

	/**
	 * 从临时表中找出导出的错误的数据
	 */
	public List<Card> findCardmid(String excelbatch, String flag) {
		return cardmidMapper.findCardmid(excelbatch,flag);
	}

	public List<SysUser> getTeacherList() {
		return cardMapper.getTeacherList();
	}
	public List<Map<String, String>> getgetAllSpecialCard() {
		return cardMapper.getgetAllSpecialCard();
	}
	public Card getCardInformation(String cardNumber) {
		return cardMapper.getCardInformation(cardNumber);
	}

}



















