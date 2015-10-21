package com.zonekey.disrec.dao;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Testl;



@MyBatisRepository
public interface TestlMapper extends BaseMapper<Testl, String> {
	public int insertestl(Testl testl);
}
