package com.zonekey.disrec.web;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springside.modules.web.MediaTypes;

import com.zonekey.disrec.common.JsonMsg;
import com.zonekey.disrec.common.JsonUtil;
import com.zonekey.disrec.common.exportexcel.ExportSysuserForExcel;
import com.zonekey.disrec.common.utils.CommonUtil;
import com.zonekey.disrec.entity.Card;
import com.zonekey.disrec.entity.SysUser;
import com.zonekey.disrec.service.CardService;
import com.zonekey.disrec.service.ServerService;
import com.zonekey.disrec.service.SysUserService;
import com.zonekey.disrec.vo.PageBean;
import com.zonekey.disrec.vo.SysUserView;

@RestController
@RequestMapping(value = "/card")
public class CardController {

	@Autowired
	private  CardService cardService;
	@Autowired
	private ServerService serverService;
	@Resource
	private SysUserService sysUserService;
	
	@RequestMapping(value="create",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int save(HttpServletRequest req) {
		Card card = JsonUtil.jsonToObject(req, Card.class);
		int flag = cardService.saveCard(card);
		return flag;
	}  
	@RequestMapping(value="delete",method = RequestMethod.POST)
	public int delete(HttpServletRequest req){
		List<Map<String,Object>> list = JsonUtil.jsonToObject(req, List.class);
		return cardService.delete(list);
	}
	@RequestMapping(value="update",method = RequestMethod.POST, produces = MediaTypes.JSON)
	public int update(HttpServletRequest req){
		Card card = JsonUtil.jsonToObject(req, Card.class);
		return cardService.update(card);
	}
	@RequestMapping(value = "cards", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public Map<String, Object> page(HttpServletRequest req) {
		PageBean pageBean = JsonUtil.jsonToPage(req);
		Page<Card> dataPage = cardService.findPageBy(pageBean);
		Map<String, Object> mapData = new HashMap<String, Object>();
		mapData.put("total", dataPage.getTotalElements());
		mapData.put("data", dataPage.getContent());
		return mapData;
	}
	@RequestMapping(value="lossCard",method = RequestMethod.POST)
	public int lossCard(HttpServletRequest req){
		Card card = JsonUtil.jsonToObject(req, Card.class);
		card.setCardState("1");
		return cardService.lossCard(card);
	}
	
	@RequestMapping(value = "import", method = RequestMethod.POST)
	public @ResponseBody
	JsonMsg importCardInfp(@RequestParam(value="file") MultipartFile file,HttpServletRequest request) throws IOException{
		JsonMsg msg = new JsonMsg();
		if (file.isEmpty()) {
		} else {
			// 得到文件名
			//String filename = file.getOriginalFilename();
			try {
				msg = cardService.readExcel(file);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				msg.setId("0");
				msg.setName("导入");
				msg.setOperation("导入失败");
			}
		}
		return msg;
	}
	/**
	 * 导出
	 */
	@RequestMapping(value = "exportErrorCard", method = RequestMethod.GET)
	public @ResponseBody void exportcurriculum(HttpServletRequest req,
			HttpServletResponse rep) {
		String excelbatch=req.getParameter("excelbatch");
		List<Card> cardList = cardService.findCardmid(excelbatch, "1");
		ExportSysuserForExcel excelp = new ExportSysuserForExcel();
		excelp.exportExcelForCard(req, rep, cardList);
	}
	//获取教师列表
	@RequestMapping(value = "teacherList", method = RequestMethod.POST, produces = MediaTypes.JSON_UTF_8)
	public List<SysUserView> getTeacherList(HttpServletRequest req){
		SysUserView sysUserView = JsonUtil.jsonToObject(req,SysUserView.class);
		List<SysUserView> sysuser = sysUserService.getRangeUser(sysUserView);
		return sysuser;
	}
	@RequestMapping(value="checkCardNumber",method = RequestMethod.POST)
	public String checkCardNumber(HttpServletRequest req){
		Card card = JsonUtil.jsonToObject(req, Card.class);
		return cardService.checkCardNumUnique(card.getCardNumber());
	}
	@RequestMapping(value = "specialCardSend", method = RequestMethod.GET, produces = MediaTypes.JSON)
	public Map<String, String> specialCardSend(String mac){
		Map<String, String> mapState = new HashMap<String, String>();
		List<Map<String, String>> list = cardService.getgetAllSpecialCard();
		String cardNumber="";
		String cardState="";
		String normalCard = "";
		String lossCard="";
		if (null!=list&&list.size()>0) {
			mapState.put("state", "1");
			for (Map<String, String> map : list) {
				cardState = map.get("cardState");
				cardNumber = map.get("cardNumber");
				if (cardNumber!=null&&cardNumber!="") {
					//为正常的特殊卡
					if (cardState!=null&&cardState!=""&&"0".equals(cardState)) {
						normalCard+=cardNumber+"/";
					}
					//为挂失的特殊卡
					if (cardState!=null&&cardState!=""&&"1".equals(cardState)) {
						lossCard+=cardNumber+"/";
					}
				}
			}
			String urlString1="http://"+serverService.getWebServer()+"/deviceService/sendCmdToCentralControl";
			String result1 = CommonUtil.sendGet(urlString1, "cmd=CardNumList="+normalCard.substring(0, normalCard.lastIndexOf("/"))+"&mac="+mac);
			Map m1 = JsonUtil.jsonToObject(result1, Map.class);
			if (null!=m1&&null!=m1.get("result")&&"ok".equals(m1.get("result"))) {
				mapState.put("normalCardState", "ok");
			}else {
				mapState.put("normalCardState", "no");
			}
			String urlString2="http://"+serverService.getWebServer()+"/deviceService/sendCmdToCentralControl";
			String result2 = CommonUtil.sendGet(urlString1, "cmd=DelCardNumList="+lossCard.substring(0, lossCard.lastIndexOf("/"))+"&mac="+mac);
			Map m2 = JsonUtil.jsonToObject(result1, Map.class);
			if (null!=m2&&null!=m2.get("result")&&"ok".equals(m2.get("result"))) {
				mapState.put("lossCardState", "ok");
			}else {
				mapState.put("lossCardState", "no");
			}
		}else {
			mapState.put("state", "0");
		}
		return mapState;
	}
	
}














