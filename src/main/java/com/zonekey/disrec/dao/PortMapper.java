package com.zonekey.disrec.dao;

import java.util.List;
import java.util.Map;

import com.zonekey.disrec.dao.base.BaseMapper;
import com.zonekey.disrec.dao.base.MyBatisRepository;
import com.zonekey.disrec.entity.Port;
/**
 * @Title: PortMapper
 * @Description: <p>通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.方法名称必须与Mapper.xml中保持一致.</p>
 * @author <a href="mailto:cuiwx@zonekey.com.cn">cuiwx</a>
 * @date  2014年12月15日
 * @version v 1.0
 */
@MyBatisRepository
public interface PortMapper extends BaseMapper<Port, String> {
	//根据服务器serverid查找端口
	public List<Port> getByServerId( String serverId );
	/**
	 *根据服务id查询端口号，并去除当前修改的端口号记录
	 */
	public List<Port> getByServerIdRest( Port port );
}
