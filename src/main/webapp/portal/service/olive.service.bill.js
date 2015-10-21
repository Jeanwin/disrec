/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 分出业务非比例管理
     ------------------------------------------*/
    angular.module('olive.service.bill', [])
        .constant('BillServiceConfig', {
            files:{
            	prepareCreateBill: {
                    'nprop.contract.2.2.08': 'data/bill/parepareImportComShare.json',
                    'nprop.contract.2.2.09': 'data/bill/parePareInputPremium.json',
                    'nprop.contract.2.2.10': 'data/bill/parePareInputPremium.json'
                },
                createBill:{

                /*contAttr - 比例【P】 /非比例 【PS】
                contFacMrk   合同【0】/临分【1】
                inOutMrk   分入【1】/分出【0】
                inExMrk   对内【0】/对外【1】 没有的为2
                billType    账单类型*/
                    'nprop.contract.2.2.08':'data/bill/genXsBillMain.json', //预付费对内账单
                    'nprop.contract.2.2.09':'data/bill/genTBAdjustAcc.json', //超赔调整账单生成
                    'prop.contract.0.2.06':'data/bill/genTtyTBBill.json',     //月度预提账单
                    'prop.contract.0.2.01':'data/bill/genTtyTRBill.json'         //季度账单
                },
                deleteBill: {
                	'nprop.contract.2.2.08':'data/bill/deleteTBAccList.json',//删除预付账单类型
                    'nprop.contract.2.2.09':'data/bill/deleteTBAccList.json',//删除调整账单类型
                    'nprop.contract.2.2.10':'data/bill/deleteTBAccList.json',//删除赔付率账单类型
                    'prop.contract.0.2.06':'data/bill/delTtyTBBill.json', //月度预提账单
                	'prop.contract.0.2.01':'data/bill/delTtyTRBill.json'  //季度账单
                },
                searchBill:{
                	'nprop.contract.2.2.08': 'data/bill/showTBAccList.json', //预付费对内账单
                    'nprop.contract.2.2.09': 'data/bill/showTBAccList.json', //超赔调整账单生成
                    'nprop.contract.2.2.10': 'data/bill/showTBAccList.json', //赔付率调整账单
                	'prop.contract.0.2.06': 'data/bill/showTBBillList.json', //月度预提账单
                	'prop.contract.0.2.01': 'data/bill/showTRBillList.json' , //季度账单
                	'prop.fac.0.2.11': 'data/bill/showFacAccOut.json',  //临分分保账单查看
                	'prop.fac.0.2.13': 'data/bill/showFacAccOut.json'  //临分分批账单查看
                } ,
                confirmBill: {
                	'prop.contract.0.2.06':'data/bill/confirmTtyTBBill.json', //月度预提账单
                	'prop.contract.0.2.01':'data/bill/confirmTtyTRBill.json',  //季度账单
//                	'nprop.contract.2.2.08': 'data/bill/comfirmAccList.json', //预付费对内账单审核
                	'nprop.contract.2.2.08': 'data/bill/accToPayment.json', //预付费对内账单送收付
                	'nprop.contract.2.2.09': 'data/bill/accToPayment.json', //调整账单类型
                	'nprop.contract.2.2.10': 'data/bill/showTBAccList.json' //赔付率账单类型
                },
                searchRecertiBill:'',
                importFhxBill: 'data/bill/saveFhxComShareList.json',
                getSectionDtl: 'data/bill/saveActRetenPremium.json',
                getBillDate:{
                	'prop': 'data/bill/getTreatyAccPeriods.json' ,//比例合同账单获取账单期
                	'nprop': 'data/bill/getTreatyAccPeriods.json' //超赔账单获取账单期
                },
                searchBillDetail: 'data/bill/showTRBillItem.json'
            },
            urls:{
                prepareCreateBill: {
                    'nprop.contract.2.2.08': config.backend.ip + config.backend.base + 'xolContBill/parepareImportComShare.do',
                    'nprop.contract.2.2.09': config.backend.ip + config.backend.base + 'xolContBill/parePareInputPremium.do',
                    'nprop.contract.2.2.10': config.backend.ip + config.backend.base + 'xolContBill/parePareInputPremium.do'
                },
                createBill:{

                /*contAttr - 比例【P】 /非比例 【PS】
                contFacMrk   合同【0】/临分【1】
                inOutMrk   分入【1】/分出【0】
                inExMrk   对内【0】/对外【1】 没有的为2
                billType    账单类型*/
                    'nprop.contract.2.2.08':config.backend.ip + config.backend.base + 'xolContBill/genXsBillMain.do', //预付费对内账单
                    'nprop.contract.2.2.09':config.backend.ip + config.backend.base + 'xolContBill/genTBAdjustAcc.do', //超赔调整账单生成
                    'prop.contract.0.2.06':config.backend.ip + config.backend.base + 'contBill/genTtyTBBill.do',     //月度预提账单
                    'prop.contract.0.2.01':config.backend.ip + config.backend.base + 'contBill/genTtyTRBill.do'         //季度账单
                },
                deleteBill: {
                	'nprop.contract.2.2.08':config.backend.ip + config.backend.base + 'xolContBill/deleteTBAccList.do',//删除预付账单类型
                    'nprop.contract.2.2.09':config.backend.ip + config.backend.base + 'xolContBill/deleteTBAccList.do',//删除调整账单类型
                    'nprop.contract.2.2.10':config.backend.ip + config.backend.base + 'xolContBill/deleteTBAccList.do',//删除赔付率账单类型
                    'prop.contract.0.2.06':config.backend.ip + config.backend.base + 'contBill/delTtyTBBill.do', //月度预提账单
                	'prop.contract.0.2.01':config.backend.ip + config.backend.base + 'contBill/delTtyTRBill.do'  //季度账单
                },
                searchBill:{
                	'nprop.contract.2.2.08':config.backend.ip + config.backend.base +  'xolContBill/showTBAccList.do', //预付费对内账单
                    'nprop.contract.2.2.09':config.backend.ip + config.backend.base +  'xolContBill/showTBAccList.do', //超赔调整账单生成
                    'nprop.contract.2.2.10':config.backend.ip + config.backend.base +  'xolContBill/showTBAccList.do', //赔付率调整账单
                	'prop.contract.0.2.06':config.backend.ip + config.backend.base + 'contBill/showTBBillList.do', //月度预提账单
                	'prop.contract.0.2.01':config.backend.ip + config.backend.base + 'contBill/showTRBillList.do' , //季度账单
                	'prop.fac.0.2.11':config.backend.ip + config.backend.base + 'facBill/showFacAccOut.do',  //临分分保账单查看
                	'prop.fac.0.2.13':config.backend.ip + config.backend.base + 'facBill/showFacAccOut.do'  //临分分批账单查看
                } ,
                confirmBill: {
                	'prop.contract.0.2.06':config.backend.ip + config.backend.base + 'contBill/confirmTtyTBBill.do', //月度预提账单
                	'prop.contract.0.2.01':config.backend.ip + config.backend.base + 'contBill/confirmTtyTRBill.do',  //季度账单
//                	'nprop.contract.2.2.08':config.backend.ip + config.backend.base +  'xolContBill/comfirmAccList.do', //预付费对内账单审核
                	'nprop.contract.2.2.08':config.backend.ip + config.backend.base +  'xolContBill/accToPayment.do', //预付费对内账单送收付
                	'nprop.contract.2.2.09':config.backend.ip + config.backend.base +  'xolContBill/accToPayment.do', //调整账单类型
                	'nprop.contract.2.2.10':config.backend.ip + config.backend.base +  'xolContBill/showTBAccList.do' //赔付率账单类型
                },
                searchRecertiBill:'',
                importFhxBill: config.backend.ip + config.backend.base + 'xolContBill/saveFhxComShareList.do',
                getSectionDtl:config.backend.ip + config.backend.base + 'xolContBill/saveActRetenPremium.do',
                getBillDate:{
                	'prop':config.backend.ip + config.backend.base + 'contBill/getTreatyAccPeriods.do' ,//比例合同账单获取账单期
                	'nprop':config.backend.ip + config.backend.base + 'xolContBill/getTreatyAccPeriods.do' //超赔账单获取账单期
                },
                searchBillDetail:config.backend.ip + config.backend.base + 'contBill/showTRBillItem.do'    //查询季度账单详细信息
                	
                	
            }
        })
        .factory('BillService',['$http', '$q', 'BillServiceConfig', function ($http, $q, billServiceConfig) {
            return {
                //非比例分出账务处理------------------------------start-------------------------------

                /* 事故分摊	用查询合同接口 */

                /* 条件查询方法 -- 同合同查询 **********************************************************/

                /**
                 * 准备生成预付分保费
                 * 生成对内对外账单
                 * @param contAttr   比例【P】 /非比例 【PS】
                 * @param contFacMrk   合同【0】/临分【1】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param inExMrk   对内【0】/对外【1】
                 * @param billType    账单类型
                 * @param keywords     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                prepareCreateBill : function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan){
                    var deffered = $q.defer();
                    var urlString = contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType;
                    console.log("urlString 's value is : " + urlString);
                    var _url = config.data.method==='files'? billServiceConfig.files.prepareCreateBill[urlString]: billServiceConfig.urls.prepareCreateBill[urlString];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            contAttr:contAttr,
                            contFacMrk:contFacMrk,
                            inOutMrk:inOutMrk,
                            inExMrk:inExMrk,
                            billType:billType,
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },

                /**
                 * 生成预付分保费
                 * 生成对内对外账单
                 * @param contAttr   比例【P】 /非比例 【PS】
                 * @param contFacMrk   合同【0】/临分【1】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param inExMrk   对内【0】/对外【1】
                 * @param billType    账单类型
                 * @param keywords     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                createBill : function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan){
                    var deffered = $q.defer();
                    var urlString = contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType;
                    console.log("urlString 's value is : " + urlString);
                    var _url = config.data.method==='files'? billServiceConfig.files.createBill[urlString]: billServiceConfig.urls.createBill[urlString];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            contAttr:contAttr,
                            contFacMrk:contFacMrk,
                            inOutMrk:inOutMrk,
                            inExMrk:inExMrk,
                            billType:billType,
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },


                /**
                 * 删除预付分保费
                 * 删除对内对外账单
                 * @param contAttr   比例【P】 /非比例 【PS】
                 * @param contFacMrk   合同【0】/临分【1】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param inExMrk   对内【0】/对外【1】
                 * @param billType    账单类型
                 * @param keywords     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                deleteBill : function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, user, lan){
                    var deffered = $q.defer();
                    if(contAttr === 'prop'){
	                    var _url = config.data.method==='files'? billServiceConfig.files.deleteBill : 
	                    	billServiceConfig.urls.deleteBill[contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType];
                    
                    } else {
                    	var paramV = contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType;
                     	var _url = config.data.method==='files'? billServiceConfig.files.deleteBill : billServiceConfig.urls.deleteBill[paramV];
                    }
                   	console.log(contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType);
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            contAttr:contAttr,
                            contFacMrk:contFacMrk,
                            inOutMrk:inOutMrk,
                            inExMrk:inExMrk,
                            billType:billType,
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },

                /**
                 * 显示账单
                 * @param contAttr   比例【P】 /非比例 【PS】
                 * @param contFacMrk   合同【0】/临分【1】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param inExMrk   对内【0】/对外【1】
                 * @param billType    账单类型 [0]:预付保费  [1]:调整保费
                 * @param keywords     数据  [合约编号，账单期]
                 * @param pagination  分页
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                searchBill:function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, pagination, user, lan){

                    var deffered = $q.defer();
                    if(contAttr === "nprop"){
                    	var paramV = contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType;
                    	console.log("paramV 's value is :" + paramV);
                    
                    	var _url = config.data.method==='files'?billServiceConfig.files.searchBill[paramV] : billServiceConfig.urls.searchBill[paramV];
                    }else{
                    	var _url = config.data.method==='files'?billServiceConfig.files.searchBill[contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType] :
                    		billServiceConfig.urls.searchBill[contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType];
                    }
                   	$http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{

                        },
                        data:{
                            contAttr:contAttr,
                            contFacMrk:contFacMrk,
                            inOutMrk:inOutMrk,
                            inExMrk:inExMrk,
                            billType:billType,
                            keywords:keywords,
                            pagination:pagination,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },

                /**
                 * 账单确认
                 * @param contAttr   比例【P】 /非比例 【PS】
                 * @param contFacMrk   合同【0】/临分【1】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param inExMrk   对内【0】/对外【1】
                 * @param billType    账单类型
                 * @param keywords     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                confirmBill:function(contAttr, contFacMrk, inOutMrk, inExMrk, billType, keywords, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.confirmBill[contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType]:
                    	billServiceConfig.urls.confirmBill[contAttr + "." + contFacMrk + "." + inOutMrk + "." + inExMrk + "." + billType];
                   	console.log("confirmBill interface _url's value is " + _url);
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            contAttr:contAttr,
                            contFacMrk:contFacMrk,
                            inOutMrk:inOutMrk,
                            inExMrk:inExMrk,
                            billType:billType,
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },

                /**
                 * 超赔临分(分出)账务--条件查询
                 * @param contAttr  非比例【PS】/比例【P】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param certiType  分保类型
                 * @param keywords
                 * @param pagination
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                searchRecertiBill:function(contAttr, inOutMrk, certiType, keywords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.searchRecertiBill[contAttr] : billServiceConfig.urls.searchRecertiBill;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            contAttr:contAttr,
                            inOutMrk:inOutMrk,
                            certiType:certiType,
                            keywords:keywords,
                            pagination:pagination,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                /**
                 * 预付费对内 ---导入
                 * @param importType  [自留额：retentImport，浮动手续费；adjustImport , 预付费：prepayImport ]
                 * @param file  文件对象
                 * @param keywords  数据
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 * 龙 ：
                 * @param  importType [自留额：retentImport，浮动手续费；adjustImport , 预付费：prepayImport ]
                 * @param user
                 * @param lan
                 * file  file [所上传的文件]
                 */
                importFhxBill:function(importType,_file, keywords, user, lan){
                    var deffered = $q.defer();
                    console.log("导入类型--start");
                    console.log(importType);
                    console.log("导入类型--end");
                    console.log("文件对象--_file");
                    console.log(_file);
                    console.log("文件对象--_file");
                    var _url = config.data.method==='files'?billServiceConfig.files.importFhxBill : billServiceConfig.urls.importFhxBill;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            importType:importType,
                            file:_file,
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                /**
                 * 调整保费---录入实际保费(赔付率)
                 * @param keywords
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                getSectionDtl:function(keywords, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.getSectionDtl : billServiceConfig.urls.getSectionDtl;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //非比例分出账务处理------------------------------end-----------------------------------------------------
                /**
                 * 获取账单期
                 * @param contractNo  暂存编号
                 */
                getBillDate: function (contAttr, contractNo, user, lan) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? billServiceConfig.files.getBillDate[contAttr]
                    			: billServiceConfig.urls.getBillDate[contAttr];
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //  url: contractServiceConfig[config.data.method].transferContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contractNo:contractNo,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                /**
                 * 查询季度账单详细信息
                 * @billType   账单类型
                 * @tmpBillNo  账单号
                 */
                searchBillDetail: function (billType, tmpBillNo , user, lan) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? billServiceConfig.files.searchBillDetail
                    			: billServiceConfig.urls.searchBillDetail;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //  url: contractServiceConfig[config.data.method].transferContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                        	billType:billType,
                        	tmpBillNo:tmpBillNo,
                            user:user,
                            lan:lan
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                }

            };
        }]);

});