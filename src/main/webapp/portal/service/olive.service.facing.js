define(['angular', 'config'], function (angular, config) {

    angular.module('olive.service.facing', [])
    /**
     * 临分接口
     */
        .constant('FacingServiceConfig', {
            files:{
                showReinsShare: 'data/facing/inquery.share.json',
                searchFacPlyInfo:'data/facing/searchFacPlyInfo.json',
                viewRecertiDetail:'',
                getFacPlyDetail: 'data/facing/inquery.intention.json'
               // showReinsShare:''

            },
            urls:{
                showReinsShare: config.backend.ip + config.backend.base + 'facing/searchFacing.do',
                searchFacPlyInfo:config.backend.ip + config.backend.base + 'fac/searchFacPlyInfo.do',
                viewRecertiDetail:config.backend.ip + config.backend.base +'',
                getFacPlyDetail:config.backend.ip + config.backend.base +''
               // showReinsShare:config.backend.ip + config.backend.base +''

            }
        })
        .factory('FacingService',['$http', '$q', 'FacingServiceConfig', function ($http, $q, facingServiceConfig) {
            return {
                //临分业务--------超赔临分(分出)账务------------------start-----------

                /**
                 * 临分分入业务--分保单查询
                 * @param certiType   投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param riskUnitNo   危险单位号
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                showReinsShare : function(certiType, certiNo, riskUnitNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? facingServiceConfig.files.showReinsShare : facingServiceConfig.urls.showReinsShare;
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

                //临分分入业务--------超赔临分(分出)账务---------------------------------end----------------------

                /* 临分账务-----查询------searchRecertiBill------------ */

              //-----------------------------  临分询价查询--------------------------------start-----------------------

                /**
                 *  临分询价-条件查询
                 * @param keywords   条件
                 * @param pagination   分页
                 * @param user   用户
                 * @param lan    语言
                 * @returns {Function|promise|promise|promise}
                 */
                searchFacPlyInfo : function( keywords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? facingServiceConfig.files.searchFacPlyInfo : facingServiceConfig.urls.searchFacPlyInfo;
                $http({
                    method: config.data.method==='files'? 'GET':'POST',
                    dataType: "json",
                    contentType:'application/json; charset=UTF-8',
                    url: _url,
                    headers: {
                    },
                    data:{
                        keywords:keywords,
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
                 * 分保单信息查看，分保单查询详细
                 * @param certiType    投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param user  用户
                 * @param lan    语言
                 * @returns {Function|promise|promise|promise}
                 */
                viewRecertiDetail : function(certiType, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? facingServiceConfig.files.viewRecertiDetail : facingServiceConfig.urls.viewRecertiDetail;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
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
                },

                /**
                 * 临分---详情
                 * @param facNo   询价单号
                 * @param user   用户
                 * @param lan    语言
                 * @returns {Function|promise|promise|promise}
                 */
                getFacPlyDetail : function(facNo,user,lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? facingServiceConfig.files.getFacPlyDetail : facingServiceConfig.urls.getFacPlyDetail;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            facNo:facNo,
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


                /**
                 * 临分---分保详情
                 * @param certiType  投保单 / 批单申请单  【T 投保单；E 批单申请单】
                 * @param certiNo   投保单号/批单申请单号
                 * @param user     用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                /*
                showReinsShare : function(certiType, certiNo, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? facingServiceConfig.files.showReinsShare : facingServiceConfig.urls.showReinsShare;
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
                }
                */
            //-----------------------------  临分询价查询------------------------------end --------------
            };
        }]);
});
