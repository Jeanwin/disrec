define(
    {
        //比例分保基础
        "prop.feeBaseCdes" : [
            {"id": "1", "value": "毛保费"},
            {'id': "0", "value":"净保费"}
        ],

        //比例计算基础
        "prop.contBaseCdes" : [
            {"id": "1", "value": "风险单位总保额"},
            {'id': "3", "value":"自留额"}
        ],

        //非比例恢复保费类型
        "nprop.reinstTypes" : [
            {"id": "1", "value": "free"},
            {'id': "2", "value":"固定比例恢复"},
            {'id': "3", "value":"时间比例恢复"}
        ],

        //比例合同状态
        "prop.contStatus" : [
            {"id": "0", "value": "暂存"},
            {'id': "1", "value":"申请审核"},
            {'id': "2", "value":"返回修改"},
            {"id": "3", "value": "审核通过"},
            {"id": "6", "value": "已关闭"}
        ],

        //比例合同类型
        "prop.contGrpTypCde" : [
            {"id": "A", "value": "法定"},
            {"id": "B", "value": "成数"},
            {"id": "C", "value": "合约自留"},
            {"id": "H", "value": "临分"},
            {"id": "D", "value": "溢额"},
            {"id": "E", "value": "第二溢额"},
            {"id": "I", "value": "opencover"},
            {"id": "Z", "value": "剩余自留"}
        ],

        //比例合同业务类型     ---------------4-29 字段名、id序号
        "prop.inoutMrk" :[
            {"id": "1", "value": "分出"},
            {"id": "0" ,"value": "分入"},
            {"id": "2", "value": "核共体"}
        ],

        //非比例合同业务类型
        "nprop.inoutMrk" :[
            {"id": "1", "value": "分出"},
            {"id": "0" ,"value": "分入"}
        ],

        //比例合同账单期
        "prop.billPeriodCde" :[
            {"id": "1" ,"value": "月度"},
            {"id": "0" ,"value": "季度"},
            {"id": "2" ,"value": "半年"},
            {"id": "3" ,"value": "全年"}
        ],
        "prop.settleTypCde":[
            {"id":"1","value":"runOff"},
            {"id":"2","value":"cleanCut"}
        ],
        //非比例合同状态
        "nprop.stateFlag" : [
            {"id": "0", "value": "暂存"},
            {'id': "1", "value":"申请审核"},
            {'id': "2", "value":"返回修改"},
            {"id": "3", "value": "审核通过"},
            {"id": "6", "value": "已关闭"}
        ],

        //非比例合同类型
        "nprop.treatyType" :  [
            {"id": "U","value": "险位超赔"},
            {"id": "V","value": "事故超赔"},
            {"id": "W","value": "赔付率超赔"},
            {"id": "X","value": "险位事故混合超赔"}
        ],

        //比例账单类型（fuxy edit）
        "prop.billType" : [
            {"id": "06","value": "月度预提账单"}, /*月度预提账单*/
            {"id": "01","value": "季度账单"}, /*季度账单*/
            {"id": "07","value": "浮动手续费账单"}, /*浮动手续费账单*/
            {"id": "04","value": "纯益手续费账单"}, /*纯益手续费账单*/
            {"id": "02","value": "现金赔款账单"} /*现金赔款账单*/
        ],

        //比例浮动手续费账单对内对外
        "prop.07.optType" : [
            {"id": "in", "value": "对内账单"},
            {"id": "out", "value": "对外账单"}
        ],

        //非比例账单类型
        "nprop.billType" : [
            {"id": "08","value": "预付费账单"}, /*预付费账单*/
            {"id": "09","value": "超赔调整账单"}, /*超赔调整账单*/
            {"id": "10","value": "赔付率账单"}  /*赔付率账单*/
        ],

        //非比例预付费账单对内对外
        "nprop.08.optType" : [
            {"id": "in", "value": "对内账单"}
            /*{"id": "out", "value": "对外账单"}*/  /*fxy 0408 dele*/
        ],


        //比例非比例月度账单期
        "2014-01Q.aaa" : [
            "2014-01M",
            "2014-02M",
            "2014-03M"
        ],

        //比例非比例月度账单期
        "2014-02Q.aaa" : [
            "2014-04M",
            "2014-05M",
            "2014-06M"
        ],

        //比例非比例月度账单期
        "2014-03Q.aaa" : [
            "2014-07M",
            "2014-08M",
            "2014-09M"
        ],

        //比例非比例月度账单期
        "2014-04Q.aaa" : [
            "2014-10M",
            "2014-11M",
            "2014-12M"
        ],


        //投保单、批单splitType类型显示
        "splitType" : [
            {"id": "0","value": "按主险拆分"},
            {"id": "1","value": "按标的信息拆分"},
            {"id": "2","value": "按占比拆分"},
            {"id": "3","value": "按地址拆分"},
            {"id": "4","value": "按保单拆分"},
            {"id": "5","value": "按船名加航次拆分"},
            {"id": "B","value": "按标的信息拆分"}
        ],

        //有效标志位
        "validStatus" : [
            {"id": "0","value": "无效"},
            {"id": "1","value": "有效"}
        ],

        //再保人属性
        "reinsType" : [
            {"id": "0","value": "直保公司"},
            {"id": "1","value": "经纪人"},
            {"id": "2","value": "专业再保"}
        ],

        //境内境外
        "locationFlag" :[
            {"id": "1","value": "境内"},
            {"id": "2","value": "境外"}
        ],

        //其他评级
        "assessType":[
            {"id": "03","value": "其他评级"}
        ]
    }
);