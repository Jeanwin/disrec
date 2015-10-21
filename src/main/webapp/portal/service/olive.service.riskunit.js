/**
 * Created by Administrator on 14-3-27.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     *  危险单位
     ------------------------------------------*/
    angular.module('olive.service.riskunit', [])
        .constant('RiskunitServiceConfig', {
            files:{
            	searchRiskUnit:{
                    '1': 'data/riskunit/queryPlyAppRiskUnit.json',
                    '3': 'data/riskunit/queryEdrAppRiskUnit.json',
                    '2': 'data/riskunit/queryPlyAppRiskUnit.json',
                    '4': 'data/riskunit/queryEdrAppRiskUnit.json'
                },
                revertRiskUnit:{
                    '1':'data/riskunit/revertPlyAppRiskUnit.json',
                    '3':'data/riskunit/revertEdrAppRiskUnit.json',
                    '2':'data/riskunit/revertPlyAppRiskUnit.json',
                    '4':'data/riskunit/revertEdrAppRiskUnit.json'
                },
                queryRetentMax:{
                    '1':'data/riskunit/queryRetentMax.json',
                    '3':'data/riskunit/queryRetentMax.json',
                    '2':'data/riskunit/queryRetentMax.json',
                    '4':'data/riskunit/queryRetentMax.json'
                },
                calReinsShare:{
                    '1':'data/riskunit/calComShare.json',
                    '3':'data/riskunit/calComShare.json',
                    '2':'data/riskunit/calComShare.json',
                    '4':'data/riskunit/calComShare.json',
                },
                showRiskPool: 'data/riskunit/calRiskAccumulate.json',
                modifyRiskUnit:{
                    '1': {
						'1':'data/riskunit/splitPlyAppRiskByObject.json',
						'2':'data/riskunit/splitPlyAppRiskByShare.json',
						'3':'data/riskunit/modifyPlyAppRiskUnit.json'
					},
                    '3':{
                        '1':'data/riskunit/splitEdrRiskUnitByObject.json',
                        '2':'data/riskunit/splitEdrRiskUnitByShare.json',
                        '3':'data/riskunit/modifyEdrAppRiskUnit.json'
                    },
                    '2': {
						'1':'data/riskunit/splitPlyAppRiskByObject.json',
						'2':'data/riskunit/splitPlyAppRiskByShare.json',
						'3':'data/riskunit/modifyPlyAppRiskUnit.json'
					},
                    '4':{
                        '1':'data/riskunit/splitEdrRiskUnitByObject.json',
                        '2':'data/riskunit/splitEdrRiskUnitByShare.json',
                        '3':'data/riskunit/modifyEdrAppRiskUnit.json'
                    }
                },
                deleteRiskUnit:'',
                splitRiskUnit:{
                    '1':'data/riskunit/genPlyAppRiskByPolicy.json',
                    '3':'',
                    '2': 'data/riskunit/genPlyAppRiskByPolicy.json',
                    '4':''
                },
                updateRiskUnit:{
                    '1': 'data/riskunit/modifyPlyAppRiskUnit.json',
                    '3':'',
                    '2': 'data/riskunit/modifyPlyAppRiskUnit.json',
                    '4':''
                },
                showReinsShare:{
                    '1':'data/riskunit/queryComShare.json',
                    '3':'data/riskunit/queryComShare.json',
                    '2':'data/riskunit/queryComShare.json',
                    '4':'data/riskunit/queryComShare.json'
                },
                getFacPlyInfo:   'data/riskunit/showFacPlyInfo.json', //临分意向
                saveFacPlyInfo: 'data/riskunit/saveFacPlyInfo.json',
                calLayerAmt: '',
                getFacPayment: {
                	'prop':  'data/riskunit/getEnquiryPayment.json',
                    'nprop':  'data/riskunit/genEnquiryXPayment.json'
                },
                getRiskLvl:'data/riskunit/queryRiskLvls.json',
                queryObjType:{
                    '1':'data/riskunit/queryObjTypeList.json',
                    '3':'data/riskunit/queryObjTypeList.json',
                    '2':'data/riskunit/queryObjTypeList.json',
                    '4':'data/riskunit/queryObjTypeList.json'
                }
            },
            urls:{
                searchRiskUnit:{
                    '1': config.backend.ip + config.backend.base + 'riskunit/queryPlyAppRiskUnit.do',
                    '3': config.backend.ip + config.backend.base + 'riskunit/queryEdrAppRiskUnit.do',
                    '2': config.backend.ip + config.backend.base + 'riskunit/queryPlyAppRiskUnit.do',
                    '4': config.backend.ip + config.backend.base + 'riskunit/queryEdrAppRiskUnit.do'
                },
                revertRiskUnit:{
                    '1':config.backend.ip + config.backend.base +'riskunit/revertPlyAppRiskUnit.do',
                    '3':config.backend.ip + config.backend.base +'riskunit/revertEdrAppRiskUnit.do',
                    '2':config.backend.ip + config.backend.base +'riskunit/revertPlyAppRiskUnit.do',
                    '4':config.backend.ip + config.backend.base +'riskunit/revertEdrAppRiskUnit.do'
                },
                queryRetentMax:{
                    '1':config.backend.ip + config.backend.base +'riskunit/queryRetentMax.do',
                    '3':config.backend.ip + config.backend.base +'riskunit/queryRetentMax.do',
                    '2':config.backend.ip + config.backend.base +'riskunit/queryRetentMax.do',
                    '4':config.backend.ip + config.backend.base +'riskunit/queryRetentMax.do'
                },
                calReinsShare:{
                    '1':config.backend.ip + config.backend.base +'riskunit/calComShare.do',
                    '3':config.backend.ip + config.backend.base +'riskunit/calComShare.do',
                    '2':config.backend.ip + config.backend.base +'riskunit/calComShare.do',
                    '4':config.backend.ip + config.backend.base +'riskunit/calComShare.do',
                },
                showRiskPool: config.backend.ip + config.backend.base +'riskunit/calRiskAccumulate.do',
                modifyRiskUnit:{
                    '1': {
						'1':config.backend.ip + config.backend.base +'riskunit/splitPlyAppRiskByObject.do',
						'2':config.backend.ip + config.backend.base +'riskunit/splitPlyAppRiskByShare.do',
						'3':config.backend.ip + config.backend.base +'riskunit/modifyPlyAppRiskUnit.do'
					},
                    '3':{
                        '1':config.backend.ip + config.backend.base +'riskunit/splitEdrRiskUnitByObject.do',
                        '2':config.backend.ip + config.backend.base +'riskunit/splitEdrRiskUnitByShare.do',
                        '3':config.backend.ip + config.backend.base +'riskunit/modifyEdrAppRiskUnit.do'
                    },
                    '2': {
						'1':config.backend.ip + config.backend.base +'riskunit/splitPlyAppRiskByObject.do',
						'2':config.backend.ip + config.backend.base +'riskunit/splitPlyAppRiskByShare.do',
						'3':config.backend.ip + config.backend.base +'riskunit/modifyPlyAppRiskUnit.do'
					},
                    '4':{
                        '1':config.backend.ip + config.backend.base +'riskunit/splitEdrRiskUnitByObject.do',
                        '2':config.backend.ip + config.backend.base +'riskunit/splitEdrRiskUnitByShare.do',
                        '3':config.backend.ip + config.backend.base +'riskunit/modifyEdrAppRiskUnit.do'
                    }
                },
                deleteRiskUnit:config.backend.ip + config.backend.base + '',
                splitRiskUnit:{
                    '1':config.backend.ip + config.backend.base + 'riskunit/genPlyAppRiskByPolicy.do',
                    '3':config.backend.ip + config.backend.base +'',
                    '2':config.backend.ip + config.backend.base + 'riskunit/genPlyAppRiskByPolicy.do',
                    '4':config.backend.ip + config.backend.base +''
                },
                updateRiskUnit:{
                    '1':config.backend.ip + config.backend.base + 'riskunit/modifyPlyAppRiskUnit.do',
                    '3':config.backend.ip + config.backend.base +'',
                    '2':config.backend.ip + config.backend.base + 'riskunit/modifyPlyAppRiskUnit.do',
                    '4':config.backend.ip + config.backend.base +''
                },
                showReinsShare:{
                    '1':config.backend.ip + config.backend.base +'riskunit/queryComShare.do',
                    '3':config.backend.ip + config.backend.base +'riskunit/queryComShare.do',
                    '2':config.backend.ip + config.backend.base +'riskunit/queryComShare.do',
                    '4':config.backend.ip + config.backend.base +'riskunit/queryComShare.do'
                },
                getFacPlyInfo: config.backend.ip + config.backend.base +  'fac/showFacPlyInfo.do', //临分意向
                saveFacPlyInfo:config.backend.ip + config.backend.base + 'fac/saveFacPlyInfo.do',
                calLayerAmt:config.backend.ip + config.backend.base + '',
                getFacPayment: {
                	'prop': config.backend.ip + config.backend.base + 'fac/getEnquiryPayment.do',
                    'nprop': config.backend.ip + config.backend.base + 'fac/genEnquiryXPayment.do'
                },
                getRiskLvl:config.backend.ip + config.backend.base + 'riskunit/queryRiskLvls.do',
                queryObjType:{
                    '1':config.backend.ip + config.backend.base + 'riskunit/queryObjTypeList.do',
                    '3':config.backend.ip + config.backend.base +'riskunit/queryObjTypeList.do',
                    '2':config.backend.ip + config.backend.base + 'riskunit/queryObjTypeList.do',
                    '4':config.backend.ip + config.backend.base +'riskunit/queryObjTypeList.do'
                }
            }
        })
        .factory('RiskunitService',['$http', '$q', 'RiskunitServiceConfig', function ($http, $q, riskunitServiceConfig) {

            var localElements ={
                "riskunit": {
                    "editing":true,  //新增加标记字段
                    "plyAppNo": "",
                    "plyNo": "",
                    "edrAppNo": "",
                    "edrNo": "",
                    "riskUnitNo": "",
                    "riskUnitNme": "",
                    "riskUnitAddr": "",
                    "zipCde": "",
                    "riskUnitAmt": "",
                    "riskLvlCde": "",
                    "riskKeepAmt": "",
                    "riskLosAmt": "",
                    "remark": "",
                    "prm": "",
                    "rate": "",
                    "amtCur": "",
                    "prmCur": "",
                    "bldTypCde": "",
                    "profitAmt": "",
                    "retentProp": "",
                    "retentStd": "",
                    "retentMas": "",
                    "retentVar": "",
                    "independMrk": "",
                    "quotaObjTypeCde": "",
                    "overObjTypeCde": "",
                    "xTreatyObjTypeCde": "",
                    "riskKeepPrm": "",
                    "itmCls": "",
                    "combin": "",
                    "fstSurplusAmt": "",
                    "openCoverAmt": "",
                    "linkPlyNo": "",
                    "linkEdrNo": "",
                    "dangerCode": "",
                    "dangerDesc": "",
                    "shipCode": "",
                    "voyage": "",
                    "amtRate": "",
                    "coinsFlag": "",
                    "coinsRate": "",
                    "facinFlag": "",
                    "facinRate": "",
                    "eqAmt": "",
                    "eqPrm": "",
                    "dangerFlag": "",
                    "insrnCCde": "",
                    "start": "",
                    "end": "",
                    "occupancy": "",
                    "riskLvlDesc": "",
                    "riskClass": "",
                    "riskClassDesc": "",
                    "amtOri": "",
                    "premOri": "",
                    "amtNew": "",
                    "premNew": "",
                    "flag": "",
                    "quotaSaMrk": "",
                    "quotaSaRemark": "",
                    "overSaMrk": "",
                    "overSaRemark": "",
                    "xTreatySaMrk": "",
                    "xTreatySaRemark": "",
                    "riskItems": [
                        {
                            "plyAppNo": "",
                            "plyNo": "",
                            "edrAppNo": "",
                            "edrNo": "",
                            "riskUnitNo": "",
                            "itemNo": "",
                            "itemCode": "",
                            "itemType": "",
                            "itemName": "",
                            "address": "",
                            "buildType": "",
                            "occupancy": "",
                            "zipCode": "",
                            "shipName": "",
                            "voyageCode": "",
                            "amount": "",
                            "rate": "",
                            "premium": "",
                            "dangerShare": "",
                            "oriAmount": "",
                            "oriPremium": "",
                            "chgAmount": "",
                            "chgPremium": ""
                        }
                    ],
                    "riskCoins": [ ],
                    "riskPlans": [ ]
                }
            };
            return {
                //获取初始化合同时的元素
                getElement : function(keyword){
                    return localElements[keyword];
                },

                //危险单位处理------------------------------start-------------------------------

                /**
                 * 危险单位获取数据（危险单位操作起点--操作危险单位时调用）
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param user    用户
                 * @param lan   语言
                 * @returns {Function|promise|promise|promise}
                 */
                searchRiskUnit : function(certiType, certiNo, user, lan){
                    console.log("service's searchRiskUnit is coming ..");
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.searchRiskUnit[certiType] : riskunitServiceConfig.urls.searchRiskUnit[certiType];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            certiNo:certiNo,
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
                 * 还原风险单位拆分
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param user    用户
                 * @param lan   语言
                 * @returns {Function|promise|promise|promise}
                 */
                revertRiskUnit : function(certiType, certiNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.revertRiskUnit[certiType] : riskunitServiceConfig.urls.revertRiskUnit[certiType];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            certiNo:certiNo,
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
                 * 分保查看  / 点击序号查看
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param riskUnitNo 风险单位号
                 * @param user    用户
                 * @param lan   语言
                 * @returns {Function|promise|promise|promise}
                 */
                showReinsShare : function(certiType, certiNo,riskUnitNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.showReinsShare[certiType] : riskunitServiceConfig.urls.showReinsShare[certiType];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            certiNo:certiNo,
                            riskUnitNo:riskUnitNo,
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
                 *  风险累积
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param riskUnit 危险单位Vo
                 * @param user    用户
                 * @param lan   语言
                 * @returns {Function|promise|promise|promise}
                 */
                showRiskPool : function(certiType, certiNo, riskUnit, user, lan){
                    var deffered = $q.defer();
                    console.log("-----start");
                    console.log(riskUnit);
                    console.log("-----end");
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.showRiskPool : riskunitServiceConfig.urls.showRiskPool;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            certiNo:certiNo,
                        	riskUnit:riskUnit,
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
                 * 保存
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
				 * @param splitType 拆分方式 :1,按标的拆分的保存，2：按占比拆分的保存,3；自动拆分，修改预约限额，溢额限额等信息的保存
                 * @param riskUnit   保存的数据
                 * @param user    用户
                 * @param lan   语言
                 * @returns {Function|promise|promise|promise}
                 */
                modifyRiskUnit : function(certiType, splitType, riskUnit, user, lan){
//                    console.log("按占比拆分所传参数："+"certiType"+certiType+" "+"certiNo:"+certiNo);
                    //删除多余字段
                    $.each(riskUnit,function(index,temp){
                        delete temp._temp;
                        delete temp.editing;
                    });
                    console.log("保存时传递的参数：");
                    console.log(riskUnit);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.modifyRiskUnit[certiType][splitType] : riskunitServiceConfig.urls.modifyRiskUnit[certiType][splitType];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
							splitType : splitType,
                            riskUnit:riskUnit,
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
                 * 删除
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param riskUnitNo 危险单位号
                 * @param user    用户
                 * @param lan   语言
                 * @returns {Function|promise|promise|promise}
                 */
                deleteRiskUnit : function(certiType, certiNo, riskUnitNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.deleteRiskUnit : riskunitServiceConfig.urls.deleteRiskUnit;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            certiNo:certiNo,
                            riskUnitNo:riskUnitNo,
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
                 * 按占比拆分
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param riskUnitNo 危险单位号
                 * @param user    用户
                 * @param lan   语言
                 * @returns {Function|promise|promise|promise}
                 */
                splitRiskUnit : function(certiType, certiNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.splitRiskUnit[certiType] : riskunitServiceConfig.urls.splitRiskUnit[certiType];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            certiNo:certiNo,
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
                 * 保存
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param riskUnit  整个危险单位信息
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                updateRiskUnit : function(certiType, riskUnit, user, lan){
                    //删除多余字段
                    $.each(riskUnit,function(index,temp){
                        delete temp._temp;
                    });
                    console.log("保存时传递的参数：");
                    console.log(riskUnit);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.updateRiskUnit[certiType] : riskunitServiceConfig.urls.updateRiskUnit[certiType];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            riskUnit:riskUnit,
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
                 * 判断危险单位自留额最大值。如果超过最大值则不能进行分保试算
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                queryRetentMax : function(certiType, certiNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.queryRetentMax[certiType] : riskunitServiceConfig.urls.queryRetentMax[certiType];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            certiNo:certiNo,
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
                 * 分保试算 / 等比分出保单
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param equalMrk :0非等比，1等比
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                calReinsShare : function(certiType, certiNo, equalMrk, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.calReinsShare[certiType] : riskunitServiceConfig.urls.calReinsShare[certiType];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            certiNo:certiNo,
                            equalMrk:equalMrk,
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
                //危险单位处理------------------------------end-----------------------------------------------------
                //------临分意向--------------------------start---------------
                /**
                 *点击临分意向---获取数据
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param riskUnitNo   风险单位号
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                getFacPlyInfo : function(certiType, certiNo, riskUnitNo,user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.getFacPlyInfo : riskunitServiceConfig.urls.getFacPlyInfo;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            certiNo:certiNo,
                            riskUnitNo:riskUnitNo,
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
                 *   临分意向--保存
                 * @param keywords (certiType,certiNo）
                 * @param facPlyInfo :传的是比例，非比例全部信息
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                saveFacPlyInfo : function(keywords, facPlyInfo, user, lan){
                    var deffered = $q.defer();
                    console.log("service 临分意向保存");
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.saveFacPlyInfo : riskunitServiceConfig.urls.saveFacPlyInfo;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            facPlyInfo:facPlyInfo,
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
                 *输入全单起赔点-全赔偿限额  使起赔点，赔偿限额改变
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param layerAmt   全单起赔点／全单赔偿限额
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                calLayerAmt : function(certiType,certiNo,layerAmt,user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.calLayerAmt : riskunitServiceConfig.urls.calLayerAmt;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            certiNo:certiNo,
                            layerAmt:layerAmt,
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
                 * 生成缴费计划
                 * @param contAttr     区别比例非比例合同   'P'：比例；  'PS': 非比例
                 * @param planKeywords    投保单 / 批单申请单  【T 投保单；E 批单申请单】(certiType) ; 投保单号 / 批单申请单号(certiNo)
                 * @param facPlyInfo    :传的是比例，非比例全部信息
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                getFacPayment : function(contAttr, planKeywords, facPlyInfo, layerNo, user, lan){
                    var deffered = $q.defer();
                    console.log("service 生成缴费计划");
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.getFacPayment[contAttr] : riskunitServiceConfig.urls.getFacPayment[contAttr];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            contAttr:contAttr,
                            planKeywords:planKeywords,
                            facPlyInfo:facPlyInfo,
                            layerNo:layerNo,
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
                //------临分意向---------------------------end--------------
                /**
                 * 获取风险单位等级  【投保单--编辑--选择风险等级下拉框时调用】
                 * @param insrncCde     险种代码
                 * @param startDate    起保时间
                 * @param currency     币种
                 * @param bldType     建筑类型
                 * @param user
                 * @param lan
                 * @returns   【 riskLvl(风险等级),retentAmt(自留额) 】
                 */
                getRiskLvl : function(insrncCde, startDate, currency, bldType, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.getRiskLvl : riskunitServiceConfig.urls.getRiskLvl;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	insrncCde:insrncCde,
                        	startDate:startDate,
                        	currency:currency,
                        	bldType:bldType,
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
                 * 获取除外责任  【投保单--编辑--除外责任-除外责任下拉框】
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param user
                 * @param lan
                 * @returns   【 objTypeCode(除外责任代码),objTypeDesc(显示内容) 】
                 */
                queryObjType : function(certiType,certiNo ,startDate,user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? riskunitServiceConfig.files.queryObjType[certiType] : riskunitServiceConfig.urls.queryObjType[certiType];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            certiType:certiType,
                            certiNo:certiNo,
                            startDate:startDate,
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