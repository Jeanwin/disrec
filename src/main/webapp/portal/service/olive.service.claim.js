/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {

    angular.module('olive.service.claim', [])
    /**
     * 立案接口,待摊操作
     */
        .constant('ClaimServiceConfig', {
            files:{
                searchClaim: 'data/claim/claim.list.json',
                searchFxoPay:'data/claim/claim.list2.json',
                serarchContract: 'data/claim/claim.list3.json',
                serarchContract2: 'data/claim/claim.edit.list2.json',
                createFxoPay: 'data/claim/claim.edit.list2.json',
                deleteFxoPay:'',
                modifyFxoPay:'',
                queryComShare:'data/settle/settleList.json'
            },
            urls:{
                searchClaim: config.backend.ip + config.backend.base + 'claim/queryClmInfo.do',
                searchFxoPay: config.backend.ip + config.backend.base + 'claim/generateFxoPay.do',
                createFxoPay:config.backend.ip + config.backend.base +  '',
                deleteFxoPay:config.backend.ip + config.backend.base +  '',
                modifyFxoPay:config.backend.ip + config.backend.base +  '',
                queryComShare:config.backend.ip + config.backend.base +  'clm/queryComShare.do'
            }
        })
        .factory('ClaimService',['$http', '$q', 'ClaimServiceConfig', function ($http, $q, claimServiceConfig) {
            return {

                serarchContract : function(keywords, orderByWords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? claimServiceConfig.files.serarchContract : claimServiceConfig.urls.serarchContract;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            orderByWords:orderByWords,
                            pagination:pagination,
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

                serarchContract2 : function(keywords, orderByWords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? claimServiceConfig.files.serarchContract2 : claimServiceConfig.urls.serarchContract2;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            orderByWords:orderByWords,
                            pagination:pagination,
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

                /* 险位分摊---采用查询合同接口 */

                /**
                 * 查询赔案
                 * 【生成 / 维护待摊信息-查询】
                 * @param keywords  查询条件
                 * @param orderByWords   排序
                 * @param pagination    分页
                 * @param user    用户
                 * @param lan    语言
                 * @returns {Function|promise|promise|promise}
                 */
                searchClaim : function(keywords, orderByWords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? claimServiceConfig.files.searchClaim : claimServiceConfig.urls.searchClaim;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            orderByWords:orderByWords,
                            pagination:pagination,
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
                 * 查询待摊
                 * 【生成 / 维护待摊信息-查询】
                 * @param keywords  查询条件
                 * @param orderByWords   排序
                 * @param pagination    分页
                 * @param user    用户
                 * @param lan    语言
                 * @returns {Function|promise|promise|promise}
                 */
                searchFxoPay : function(keywords, orderByWords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? claimServiceConfig.files.searchFxoPay : claimServiceConfig.urls.searchFxoPay;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            orderByWords:orderByWords,
                            pagination:pagination,
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
                 * 生成待摊信息
                 * @param claimNo   立案号
                 * @param riskUnitNo    危险单位号
                 * @param user       用户
                 * @param lan      语言
                 * @returns {Function|promise|promise|promise}
                 */
                createFxoPay : function(claimNo, riskUnitNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? claimServiceConfig.files.createFxoPay : claimServiceConfig.urls.createFxoPay;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            claimNo:claimNo,
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
                 * 删除待摊信息
                 * @param claimNo   立案号
                 * @param riskUnitNo    危险单位号
                 * @param user       用户
                 * @param lan      语言
                 * @returns {Function|promise|promise|promise}
                 */
                deleteFxoPay : function(claimNo, riskUnitNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? claimServiceConfig.files.deleteFxoPay : claimServiceConfig.urls.deleteFxoPay;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            claimNo:claimNo,
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
                 * 修改待摊金额
                 * @param claimNo   立案号
                 * @param riskUnitNo    危险单位号
                 * @param user       用户
                 * @param lan      语言
                 * @returns {Function|promise|promise|promise}
                 */
                modifyFxoPay : function(claimNo, riskUnitNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? claimServiceConfig.files.modifyFxoPay : claimServiceConfig.urls.modifyFxoPay;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            claimNo:claimNo,
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
                 * 理赔分摊查询
                 * @param certiNo  投保单号/批单申请单号
                 * @param clmTms  赔付次数
                 * @param certiType 投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param user
                 * @param lan
                 * @returns
                 */
                queryComShare : function(certiNo, clmTms, certiType, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? claimServiceConfig.files.queryComShare : claimServiceConfig.urls.queryComShare;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	certiNo:certiNo,
                        	clmTms:clmTms,
                        	certiType:certiType,
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