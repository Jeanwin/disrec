//新增一个字段 0 表示最近一周  1 表示最近一月 2 表示最近一年 3表示其他         ---xufx 添加于2015-07-06
alter table study_record add timeflag char(36) DEFAULT '0';
//添加资源ID(凡是MP4文件才存在)                            ---xufx 添加于2015-07-06
alter table zonekey_resource add resourceid char(100);
//创建数据库 zonekey_device_server
DROP TABLE IF EXISTS `zonekey_device_server`;
CREATE TABLE `zonekey_device_server` (
  `id` char(36) NOT NULL,
  `deviceid` char(36) DEFAULT NULL,
  `serverid` char(36) DEFAULT NULL,
  `deleteflag` char(2) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 
