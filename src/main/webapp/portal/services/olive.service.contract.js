define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 比例 非比例合约，基础数据处理
     ------------------------------------------*/
    angular.module('olive.service.contract', [])

        .constant('ContractServiceConfig', {
            files:{
                searchContract: {
                    'P': 'data/contract/contract.prop.list.json',
                    'PS': 'data/contract/contract.nprop.list.json'
                },

                getContract: {
                    'P': 'data/prop.detail.json',
                    'PS': 'data/contract.detail.json'
                },
                createContract: '',
                updateContract: '',
                updateContractsState: '',
                deleteContracts: '',
                copyContracts: '',
                transferContracts: ''
                

            },
            urls:{
                searchContract: config.backend.ip + config.backend.base + 'treatyManage/searchContract.do',
                getContract: config.backend.ip + config.backend.base + 'treatyManage/queryContract.do',
                createContract: config.backend.ip + config.backend.base + 'treatyManage/createContract.do',
                updateContract: config.backend.ip + config.backend.base + 'treatyManage/updateContract.do',
                updateContractsState: config.backend.ip + config.backend.base + 'treatyManage/updateContractsState.do',
                deleteContracts: config.backend.ip + config.backend.base + 'treatyManage/deleteContracts.do',
                copyContracts: config.backend.ip + config.backend.base + 'treatyManage/copyContracts.do',
                transferContracts:config.backend.ip + config.backend.base + 'treatyManage/transferContract.do'
               
                
            }
        })
        .factory('ContractService',['$http', '$q', '$filter', 'ContractServiceConfig', function ($http, $q, $filter, contractServiceConfig) {
            var localElements = {

                //层信息
                "intention" : {
				            "plyAppNo": "",
				            "plyNo": "",
				            "edrAppNo": "",
				            "edrNo": "",
				            "facNo": "",
				            "layerNo": "A",
				            "dangerNo": 0,
				            "currency": "",
				            "excessLoss": 0,
				            "layerQuota": 0,
				            "totalQuota": 0,
				            "layerPremium": 0,
				            "layerchgPremium": 0,
				            "shareRate": 0,
				            "layerrePreium": 0,
				            "reinstTimes": 0,
				            "reinsTrate": 0,
				            "residualReinstsum": 0,
				            "reinstType": "",
				            "startDate": "",
				            "endDate": "",
				            "remarks": "",
				            "flag": "",
				            "endorTimes": 0,
				            "absExcessLoss": "",
				            "absLayerQuota": "",
				            "abShareRate": "",
				            "feoXPlans": [
				            ],
				            "feoXReinss": [
				                {
				                    "facNo": "",
				                    "layerNo": 0,
				                    "facRiComCde": "",
				                    "freinsCode": "",
				                    "reinsName": "",
				                    "brokerFlag": "",
				                    "freinsName": "",
				                    "payCode": "",
				                    "payName": "",
				                    "shareRate": 0,
				                    "premium": 0,
				                    "chgPreium": 0,
				                    "remarks": "",
				                    "memo": "",
				                    "flag": "",
				                    "associateFlag": "",
				                    "clntNme": "",
				                    "tel": "",
				                    "fax": "",
				                    "mail": "",
				                    "addr": "",
				                    "zip": "",
				                    "feoXFReinsVos": [
				                    ]
				                }
				            ]
				        },

                //添加接收人（危险单位- 比例- 临分意向）
                "intentionRecepterProp" : {
                    "facNo": "",
                    "facRiComCde": "",
                    "plyAppNo": "",
                    "plyNo": "",
                    "edrappNo": "",
                    "edrNo": "",
                    "facComAmt": 0,
                    "facComPrm": 0,
                    "facComComm": 0,
                    "facComTax": 0,
                    "facComBroke": 0,
                    "facComExt": 0,
                    "facComDisc": 0,
                    "facComOther": 0,
                    "facComBalance": 0,
                    "facComIns": 0,
                    "linkPlyNo": "0",
                    "linkEdrNo": "0",
                    "modeMrk": "0",
                    "clntNme": "0",
                    "tel": "0",
                    "fax": "0",
                    "mail": "0",
                    "addr": "0",
                    "zip": "0",
                    "faccomSharerate": 1,
                    "rate": "0",
                    "insGrntAmt": "",
                    "ppwDate": 0,
                    "difReins": "",
                    "freinsName": "",
                    "signedLine": "",
                    "faccomOriAmt": "",
                    "faccomOriPrm": "",
                    "faccomOriComm": "",
                    "faccomOriTax": "",
                    "faccomOriBroke": "",
                    "faccomOriExt": "",
                    "faccomOriDisc": "",
                    "faccomOriOther": "",
                    "faccomOriBalance": "",
                    "faccomChgAmt": "",
                    "faccomChgPrm": "",
                    "faccomChgComm": "",
                    "faccomChgTax": "",
                    "faccomChgBroke": "",
                    "faccomChgExt": "",
                    "faccomChgDisc": "",
                    "faccomChgOther": "",
                    "faccomChgBalance": "",
                    "facPlyFComShareVos": [
                    ],
                    "nfaccomOriDisc": ""
                },

                //添加最终接收人（危险单位- 比例- 临分意向）
                "intentionFinalRecepterProp" : {
                    "facNo": "",
                    "facRiComCde": "",
                    "facRiFComCde": "",
                    "crtCde": "",
                    "crtTm": 0,
                    "updCde": "",
                    "updTm": 0,
                    "facComShareRate": 0,
                    "facAbsComShare" : 0,
                    "facFComShareRate": 0,
                    "facFComAmt": "",
                    "facFComOther": "",
                    "facFComPrm": "",
                    "facFComIns": "",
                    "facFComComm": "",
                    "facFComTax": "",
                    "facFComBroke": "",
                    "facFComExt": "",
                    "facFComDisc": "",
                    "facFComBalance": "",
                    "rowId": "",
                    "rate": 0,
                    "insGrntAmt": "",
                    "ppwDate": "",
                    "difReins": "",
                    "freinsName": "",
                    "signedLine": 0,
                    "freinsCode": ""
                },

                //添加分期信息（危险单位- 比例- 临分意向）
                "intentionPlanProp" :  {
                    "plyAppNo": "001210025042004000034",
                    "edrAppNo": "123",
                    "termNo": "1",
                    "plyNo": "123",
                    "edrNo": "123",
                    "contNo": "OPH200410",
                    "sectNo": "123",
                    "stages": 0,
                    "reinsCode": "123",
                    "payStrtTm": 1087142400000,
                    "payLmtTm": 1088438400000,
                    "planshare": "123",
                    "accMrk": "0",
                    "facComPrm": "123",
                    "facComComm": "123",
                    "facComTax": "123",
                    "facComBroke": "123",
                    "facComOther": "123",
                    "insGrntAmt": "123",
                    "facComBalance": "123",
                    "riCur": "01",
                    "riComAmt": 6621520,
                    "riComCde": "121",
                    "planShare": "123",
                    "insrncCde": "2504",
                    "rdrCde": "**",
                    "dptCde": "90121",
                    "calTm": 1087278754000,
                    "edrappNo": "123",
                    "insrnBgnTm": 1054396800000,
                    "riComFee": 25002.73,
                    "feeCde": "C1",
                    "billDtlsId": 0,
                    "linkDocNo": "123",
                    "linkType": "123",
                    "cancelMrk": "0",
                    "bu": "123",
                    "bizYear": "123",
                    "accTm": 1136542877000,
                    "currRate": "123",
                    "rmbRiComFee": "123",
                    "sendMrk": "1",
                    "sendTm": 1136543052000,
                    "facNo": "001210025042004000034"
                },

                //添加接收人（危险单位- 非比例- 临分意向）
                "intentionRecepterNprop" : {
                    "facNo": "",
                    "layerNo": 0,
                    "facRiComCde": "",
                    "freinsCode": "",
                    "reinsName": "",
                    "brokerFlag": "",
                    "freinsName": "",
                    "payCode": 0,
                    "payName": 0,
                    "shareRate": 1,
                    "premium": 0,
                    "chgPreium": 0,
                    "remarks": "",
                    "memo": 0,
                    "flag": "",
                    "associateFlag": "",
                    "clntNme": null,
                    "tel": null,
                    "fax": null,
                    "mail": null,
                    "addr": null,
                    "zip": null,
                    "feoXFReinsVos": [
                    ]
                },

                //添加最终接收人（危险单位- 非比例- 临分意向）
                "intentionFinalRecepterNprop" : {
                    "facNo": "",
                    "layerNo": 0,
                    "facRiComCde": "",
                    "freinsCode": "",
                    "reinsName": "",
                    "brokerFlag": "",
                    "freinsName": "",
                    "shareRate": 0
                },

                //添加分期信息（危险单位- 非比例- 临分意向）
                "intentionPlanNprop" : {
                    "facNo": "001210025042004000034",
                    "layerNo": 1,
                    "payTimes": 1,
                    "planDate": 1396281600000,
                    "currency": "01",
                    "payValue": 1000,
                    "flag": "0"
                },

                //添加期次
                "npropPay" : {
                    "id": {
                        "tmpTreatyNo": "",
                        "sectionNo": "",
                        "layerNo": "",
                        "payNo": ""
                    },
                    "payTimes": "",
                    "treatyNo": "",
                    "planDate": "",
                    "currency": "",
                    "payValue": "",
                    "flag": ""
                },

               //比例合同初始化元素集
                "prop" : {
                    "tmpContNo":"",
                    "contNo":"",
                    "refNme":"",
                    "bsnsTyp":"",
                    "contGrpTypCde":"",
                    "contNme":"",
                    "contEnm":"",
                    "origContNo":"",
                    "contBaseCde":"1",
                    "cancelTm":"",
                    "contYear":"",
                    "contBgnTm":"",
                    "contEndTm":"",
                    "extendDate":"",
                    "feeBaseCde":"1",
                    "accDay":"",
                    "payDay":"",
                    "isFixedRate":"",
                    "fixedRate":"",
                    "billPeriodCde":"M",
                    "overheadRate":"",
                    "settleTypCde":"1",
                    "cleanYear":"",
                    "unearndPrm":"",
                    "pendOut":"",
                    "unearndPrmoutRate":"",
                    "pendOutRate":"",
                    "deductible":"",
                    "lossSharing":"",
                    "contStatus":"0",
                    "contOutInssects":[
                        {
                            "tmpContNo":"",
                            "contNo":"",
                            "sectNo":"a",
                            "sectNme":"",
                            "sectEnm":"",
                            "currency":"01",
                            "currencyName":"",
                            "qsRate":"",
                            "contQuota":"",
                            "hurricaneLimit":"",
                            "floodLimit":"",
                            "earthquakeLimit":"",
                            "reten":"",
                            "taxRate":"",
                            "commRate":"",
                            "surplusLines":"",
                            "gteateLoss":"",
                            "cashLoss":"",
                            "othRate":"",
                            "brokeRate":'',
                            "eqsectNo":0,
                            "eqCommRate":"",
                            "contOutInssectDtls":[],
                            "contOutInssectEqDtls":[],
                            "contOutprptAdjustcomms":[]
                        }

                    ],
                    "contOutComShares":[
						{
						    "tmpContNo":"",
						    "contNo":"",
						    "ricomCde":"",
						    "share":"",
						    "brokerFlag":"",
						    "isPrireins":"",
						    "ttyLinker":"",
						    "ttyMobile":"",
						    "ttyPhone":"",
						    "ttyFax":"",
						    "ttyEmail":"",
						    "ttyAddress":"",
						    "ttyPost":"",
						    "contOutFComShares":[]
						}
                    ]
                }
                ,

                //比例合同分项初始化元素集
                "propSection" : {
                    "tmpContNo":"",
                    "contNo":"",
                    "sectNo":"",
                    "sectNme":"",
                    "sectEnm":"",
                    "currency":"01",
                    "currencyName":0,
                    "qsRate":"",
                    "contQuota":"",
                    "hurricaneLimit":"",
                    "floodLimit":"",
                    "earthquakeLimit":"",
                    "reten":"",
                    "taxRate":"",
                    "commRate":"",
                    "surplusLines":"",
                    "gteateLoss":"",
                    "cashLoss":"",
                    "othRate":"",
                    "brokeRate":"",
                    "eqsectNo":0,
                    "eqCommRate":"",
                    "contOutInssectDtls":[],
                    "contOutInssectEqDtls":[],
                    "contOutprptAdjustcomms":[]
                },

                //比例合同地震险元素
                "propAjusts":{
                    "tmpContNo":"",
                    "sectNo":"",
                    "insrncCde":"",
                    "rdrCde":"",
                    "insrncName":"",
                    "rdrName":"",
                    "contNo":""
                },

                //添加最终接收人 (比例)
                "propFinalRecepter" :  {
                    "tmpContNo":"",
                    "contNo":"",
                    "ricomCde":"",
                    "rifcomCde":"",
                    "fshare":"",
                    "isPrireins":"",
                    "remark":0
                },

                //增加接收人（比例）
                "propRecepter" :  {
                    "tmpContNo":"",
                    "contNo":"",
                    "ricomCde":"",
                    "share":"",
                    "brokerFlag":"",
                    "isPrireins":"",
                    "ttyLinker":"",
                    "ttyMobile":"",
                    "ttyPhone":"",
                    "ttyFax":"",
                    "ttyEmail":"",
                    "ttyAddress":"",
                    "ttyPost":"",
                    "contOutFComShares":[]
                },

                //比例适用险种
                "propRisk" :   {
                    "tmpContNo":"",
                    "sectNo":"",
                    "insrncCde":"",
                    "rdrCde":"**",
                    "insrncName":"",
                    "rdrName":"",
                    "contNo":"",
                    "contOutprptPropexps":[]
                } ,

                //比例除外责任
                "propExclusion":{
                    "tmpContNo":"",
                    "sectNo":"",
                    "insrncCde":"",
                    "rdrCde":"**",
                    "insrncCdeName":0,
                    "rdrCdeName":0,
                    "contNo":"",
                    "objTypeCde":"",
                    "objTypeCdeName":0
                },

                //浮动手续费费率
                "propAdjustrate" :  {
                    "tmpContNo":"",
                    "contNo":"",
                    "sectNo":"",
                    "lossRate":'',
                    "adjustRate":''
                },
                //非比例合同初始化元素集
                "nprop" : {
                    "tmpTreatyNo": "",
                    "treatyNo": "",
                    "exTreatyNo": "",
                    "refNo": "",
                    "treatyName": "",
                    "treatyEname": "",
                    "treatyType": "U",
                    "uwYear": "",
                    "startDate": "",
                    "endDate": "",
                    "closeDate": "",
                    "currency": "01",
                    "extendDate": "",
                    "extendFlag": "",
                    "stateFlag": "0",
                    "flag": "",
                    "updaterCode": "",
                    "updaterTime": "",
                    "reMarks": "",
                    "inoutMrk": "",
                    "fhxSectionList": [
                        {
                            "id": {
                                "tmpTreatyNo": "",
                                "sectionNo": "a"
                            },
                            "treatyNo": "",
                            "sectionCdesc": "",
                            "sectionEdesc": "",
                            "currency": "01",
                            "fhxRiskList": [],
                            "fhxLayerList":
                                [
                                    {
                                        "id":
                                        {
                                            "tmpTreatyNo": "",
                                            "sectionNo": "",
                                            "layerNo": "1"
                                        },
                                        "treatyNo": "",
                                        "layerType": "",
                                        "layerCdesc": "",
                                        "layerEdesc": "",
                                        "currency": "01",
                                        "excessLoss": "",
                                        "layerQuota": "",
                                        "totalQuota": "",
                                        "egnpi": "",
                                        "gnpi": "",
                                        "rate": "",
                                        "rol": "",
                                        "mdpRate": "",
                                        "mdp": "",
                                        "layerPremium": "",
                                        "shareRate": "0",
                                        "reinstTimes": "0",
                                        "reinstRate": "",
                                        "resiDualReinstSum": "",
                                        "reinstType": "1",
                                        "reMarks": "",
                                        "updaterCode": "",
                                        "updaterDate": "",
                                        "flag": "",
                                        "rwp": "",
                                        "expireLoss": "",
                                        "payTimes": "",
                                        "adrwp": "",
                                        "adgnpi": "",
                                        "annd": "",
                                        "usedd": "",
                                        "fhxReinsList":
                                            [
                                                {
                                                    "id": {
                                                        "tmpTreatyNo": "",
                                                        "sectionNo": "",
                                                        "layerNo": "1",
                                                        "reinsCode": ""
                                                    },
                                                    "treatyNo": "",
                                                    "reinsName": "",
                                                    "brokerFlag": "",
                                                    "payCode": "",
                                                    "payName": "",
                                                    "shareRate": "",
                                                    "ispriReinsx": "",
                                                    "ttyLinker": "",
                                                    "ttyMobile": "",
                                                    "ttyPhone": "",
                                                    "ttyFax": "",
                                                    "ttyEmail": "",
                                                    "ttyAddress": "",
                                                    "ttyPost": "",
                                                    "reMarks": "",
                                                    "fhxFinalReinsList":[ ]
                                                }
                                            ],
                                        "fhxPlanList":  []
                                    }
                                ]
                        }
                    ]
                },

                 //非比例合同分项初始化元素集
                "npropSection" :  {
                    "id": {
                    "tmpTreatyNo": "",
                        "sectionNo": "1"
                    },
                    "treatyNo": "",
                    "sectionCdesc": "",
                    "sectionEdesc": "",
                    "currency": "01",
                    "fhxRiskList":[ ],
                    "fhxLayerList":
                    [
                        {
                            "id":
                            {
                                "tmpTreatyNo": "",
                                "sectionNo": "a",
                                "layerNo": "1"
                            },
                            "treatyNo": "",
                            "layerType": "",
                            "layerCdesc": "",
                            "layerEdesc": "",
                            "currency": "01",
                            "excessLoss": "",
                            "layerQuota": "",
                            "totalQuota": "",
                            "egnpi": "",
                            "gnpi": "",
                            "rate": "",
                            "rol": "",
                            "mdpRate": "",
                            "mdp": "",
                            "layerPremium": "",
                            "shareRate": "",
                            "reinstTimes": "0",
                            "reinstRate": "",
                            "resiDualReinstSum": "",
                            "reinstType": "",
                            "reMarks": "",
                            "updaterCode": "",
                            "updaterDate": "",
                            "flag": "",
                            "rwp": "",
                            "expireLoss": "",
                            "payTimes": "",
                            "adrwp": "",
                            "adgnpi": "",
                            "annd": "",
                            "usedd": "",
                            "fhxReinsList":
                                [
                                    {
                                        "id": {
                                            "tmpTreatyNo": "",
                                            "sectionNo": "",
                                            "layerNo": "",
                                            "reinsCode": ""
                                        },
                                        "treatyNo": "",
                                        "reinsName": "",
                                        "brokerFlag": "",
                                        "payCode": "",
                                        "payName": "",
                                        "shareRate": "",
                                        "ispriReinsx": "",
                                        "ttyLinker": "",
                                        "ttyMobile": "",
                                        "ttyPhone": "",
                                        "ttyFax": "",
                                        "ttyEmail": "",
                                        "ttyAddress": "",
                                        "ttyPost": "",
                                        "reMarks": "",
                                        "fhxFinalReinsList":[]
                                    }
                                ],
                            "fhxPlanList":
                                [
                                    {
                                        "id": {
                                            "tmpTreatyNo": "",
                                            "sectionNo": "",
                                            "layerNo": "",
                                            
                                            "payNo": ""
                                        },
                                        "payTimes": "",
                                        "treatyNo": "",
                                        "planDate": "",
                                        "currency": "01",
                                        "payValue": "",
                                        "flag": ""
                                    }
                                ]
                        }
                    ]
                },

                //非比例层
                 "npropLayer" : {
                     "id":
                     {
                         "tmpTreatyNo": "",
                         "sectionNo": "",
                         "layerNo": ""
                     },
                     "treatyNo": "",
                     "layerType": "",
                     "layerCdesc": "",
                     "layerEdesc": "",
                     "currency": "01",
                     "excessLoss": "",
                     "layerQuota": "",
                     "totalQuota": "",
                     "egnpi": "",
                     "gnpi": "",
                     "rate": "",
                     "rol": "",
                     "mdpRate": "",
                     "mdp": "",
                     "layerPremium": "",
                     "shareRate": "",
                     "reinstTimes": "0",
                     "reinstRate": "",
                     "resiDualReinstSum": "",
                     "reinstType": "1",
                     "reMarks": "",
                     "updaterCode": "",
                     "updaterDate": "",
                     "flag": "",
                     "rwp": "",
                     "expireLoss": "",
                     "payTimes": "",
                     "adrwp": "",
                     "adgnpi": "",
                     "annd": "",
                     "usedd": "",
                     "fhxReinsList":
                         [
                             {
                                 "id": {
                                     "tmpTreatyNo": "",
                                     "sectionNo": "",
                                     "layerNo": "",
                                     "reinsCode": ""
                                 },
                                 "treatyNo": "",
                                 "reinsName": "",
                                 "brokerFlag": "",
                                 "payCode": "",
                                 "payName": "",
                                 "shareRate": "",
                                 "ispriReinsx": "",
                                 "ttyLinker": "",
                                 "ttyMobile": "",
                                 "ttyPhone": "",
                                 "ttyFax": "",
                                 "ttyEmail": "",
                                 "ttyAddress": "",
                                 "ttyPost": "",
                                 "reMarks": "",
                                 "fhxFinalReinsList":[ ]
                             }
                         ],
                     "fhxPlanList":
                         [
                             {
                                 "id": {
                                     "tmpTreatyNo": "",
                                     "sectionNo": "",
                                     "layerNo": "",
                                     
                                     "payNo": ""
                                 },
                                 "payTimes": "",
                                 "treatyNo": "",
                                 "planDate": "",
                                 "currency": "01",
                                 "payValue": "",
                                 "flag": ""
                             }
                         ]
                 },

                //非比例最终接收人
                "npropFinalRecepter" : {
                    "id": {
                        "tmpTreatyNo": "",
                        "sectionNo": "",
                        "layerNo": "",
                        "reinsCode": "",
                        "freinsCode": ""
                    },
                    "treatyNo": "",
                    "reinsName": "",
                    "freinsName": "",
                    "payCode": "",
                    "payName": "",
                    "shareRate": "",
                    "ispriReinsx": "",
                    "reMarks": ""
                },

                //非比例接受人
                "npropRecepter" : {
                    "id": {
                        "tmpTreatyNo": "",
                        "sectionNo": "",
                        "layerNo": "",
                        "reinsCode": ""
                    },
                    "treatyNo": "",
                    "reinsName": "",
                    "brokerFlag": "",
                    "payCode": "",
                    "payName": "",
                    "shareRate": "",
                    "ispriReinsx": "",
                    "ttyLinker": "",
                    "ttyMobile": "",
                    "ttyPhone": "",
                    "ttyFax": "",
                    "ttyEmail": "",
                    "ttyAddress": "",
                    "ttyPost": "",
                    "reMarks": "",
                    "fhxFinalReinsList": []
                },

                //非比例适用险种
                "npropRisk" :    {
                "id": {
                    "tmpTreatyNo": "",
                    "sectionNo": "",
                    "riskCode": ""
                },
                "treatyNo": "",
                "fhxExItemKindList": []
                 },

                //非比例除外责任
                "npropExclusion":{
                    "id": {
                        "tmpTreatyNo": "",
                        "sectionNo": "",
                        "riskCode": "",
                        "itemKind": ""
                    },
                    "treatyNo": "",
                    "itemKindDesc": "",
                    "flag": ""
                }
            };

            var cleanContractData = function (contAttr, data) {
                switch(contAttr){
                    case('P'):
                        data.cancelTm = $filter('date')(data.cancelTm, config.display.dateFormat);
                        data.contBgnTm = $filter('date')(data.contBgnTm, config.display.dateFormat);
                        data.contEndTm = $filter('date')(data.contEndTm, config.display.dateFormat);
                        break;
                    case('PS'):
                        break;
                }

                return data;
            };

            return {
                //修改向后台传值时合同类型参数
                exchangeAttr : function(contAttr){
                    if(contAttr === "prop"){
                        return "P";
                    }else{
                        return "PS"
                    }
                },

                //获取初始化合同时的元素
                getElement : function(keyword){
                    return localElements[keyword];
                },
                /**
                 *  条件查看
                 * @param contAttr   区别比例非比例合同   'P'：比例；  'PS': 非比例
                 * @param keywords  查询数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
                searchContract: function (contAttr, keywords, pagination, user) {
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? contractServiceConfig.files.searchContract[contAttr] : contractServiceConfig.urls.searchContract;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            contAttr:contAttr,
                            keywords:keywords,
                            pagination:pagination,
                            user:user
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
                 *  查看合同详细
                 * @param contAttr   区别比例非比例合同
                 * @param contractNo  合同主键
                 * @param user  操作用户信息
                 */
                getContract: function (contAttr, contractNo, user) {
                   contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? contractServiceConfig.files.getContract[contAttr] : contractServiceConfig.urls.getContract;

                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{
                            contAttr:contAttr,
                            contractNo:contractNo,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                        	deffered.resolve(data);
                      //      deffered.resolve(cleanContractData(contAttr, data));
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                /**
                 * 新增
                 * @param contAttr   区别比例非比例合同
                 * @param contract  合同数据
                 * @param user  操作用户信息
                 */
                createContract: function (contAttr, contract, user) {
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();
                    console.log("即将新建合同：=======");
                    console.log(contract);
                    var _url = config.data.method==='files'? contractServiceConfig.files.createContract : contractServiceConfig.urls.createContract;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //url: contractServiceConfig[config.data.method].createContract,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contract:contract,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            //data = eval('('+data+')');
                            //data = JSON.parse(data);
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                },
                /**
                 * 编辑合同
                 * @param contAttr   区别比例非比例合同
                 * @param contract  合同数据
                 * @param user   操作用户信息
                 */
                updateContract: function (contAttr, contract, user) {
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();
                    console.log("即将更新合同：=======");
                    console.log(contract);
                    var _url = config.data.method==='files'? contractServiceConfig.files.updateContract : contractServiceConfig.urls.updateContract;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //url: contractServiceConfig[config.data.method].updateContract,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contract:contract,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            //data = eval('('+data+')');
                            //data = JSON.parse(data);
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                },
                /**
                 *设置状态
                 * @param contAttr   区别比例非比例合同
                 * @param contracts  根据主键修改状态【包括contractNo,state】
                 * @param user  操作用户信息
                 */
                updateContractsState: function (contAttr, contracts, user) {
                    console.log("setState : "+contAttr);
                    console.log(contracts);
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? contractServiceConfig.files.updateContractsState : contractServiceConfig.urls.updateContractsState;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url:_url,
                       // url: contractServiceConfig[config.data.method].updateContractsState,
                        headers: {
                        },
                        data:{
                            contAttr:contAttr,
                            contracts:contracts,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            //data = eval('('+data+')');
                            //data = JSON.parse(data);
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                },
                /**
                 * 批量删除合同
                 * @param contAttr   区别比例非比例合同
                 * @param contracts  批量删除主键[contractNo]
                 * @param user  操作用户信息
                 */
                deleteContracts: function (contAttr, contracts, user) {
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? contractServiceConfig.files.deleteContracts : contractServiceConfig.urls.deleteContracts;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        // url: contractServiceConfig[config.data.method].deleteContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contracts:contracts,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            //data = eval('('+data+')');
                            //data = JSON.parse(data);
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                },
                /**
                 * 批量复制合同
                 * @param contAttr   区别比例非比例合同
                 * @param contracts  合同主键[contractNo]
                 * @param user   操作用户信息
                 */
                copyContracts: function (contAttr, contracts, user) {
                    contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? contractServiceConfig.files.copyContracts : contractServiceConfig.urls.copyContracts;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //  url: contractServiceConfig[config.data.method].copyContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contracts:contracts,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            //data = eval('('+data+')');
                            //data = JSON.parse(data);
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                },
                /**
                 * 续传合同
                 * @param contAttr   区别比例非比例合同
                 * @param contracts  合同主键[contractNo]
                 * @param user   操作用户信息
                 */
                transferContracts: function (contAttr, contracts, user) {
                   contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? contractServiceConfig.files.transferContracts : contractServiceConfig.urls.transferContracts;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //  url: contractServiceConfig[config.data.method].transferContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contracts:contracts,
                            user:user
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                            //deffered.resolve([{contractNo:'00001',
                            //contractName:'abc'}]);
                        });
                    return deffered.promise;
                }
                //非比例分出账务处理------------------------------start-------------------------------
                
            };
        }]);

});