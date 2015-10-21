/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {

    angular.module('olive.service.event', [])
    /**
     * 事故打包接口
     */
        .constant('EventServiceConfig', {
            files:{
                searchEvent: 'data/event/event.list.json',
                setEventExchRate: 'data/event/event.setEventExchRate.json',
                serarchContract: 'data/event/event.list3.json',
                createEvent:'',
                updateEvent:'',
                deleteEvent:''
            },
            urls:{
                searchEvent: config.backend.ip + config.backend.base + 'event/searchEvent.do',
                setEventExchRate: config.backend.ip + config.backend.base + 'event/setEventExchRate.do',
                createEvent:config.backend.ip + config.backend.base + '',
                updateEvent:config.backend.ip + config.backend.base + '',
                deleteEvent:config.backend.ip + config.backend.base + ''
            }
        })
        .factory('EventService',['$http', '$q', 'EventServiceConfig', function ($http, $q, eventServiceConfig) {
            return {

                serarchContract : function(keywords, orderByWords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.serarchContract : eventServiceConfig.urls.serarchContract;
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

                setEventExchRate : function(treatyNo_sectionNo, certiNos){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.setEventExchRate : eventServiceConfig.urls.setEventExchRate;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            treatyNo_sectionNo:treatyNo_sectionNo,
                            certiNos:certiNos
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
                 * 事故 查询
                 * @param keywords
                 * @param pagination
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                searchEvent : function(keywords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.searchEvent : eventServiceConfig.urls.searchEvent;
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
                 * 事故打包
                 * @param keywords  条件【claimNo,riskUnitNo】
                 * @param user    用户
                 * @param lan   语言
                 * @returns {Function|promise|promise|promise}
                 */
                createEvent : function(keywords, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.createEvent : eventServiceConfig.urls.createEvent;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
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
                 * 事故追加
                 * @param keywords  【claimNo, riskUnitNo】
                 * @param user     用户
                 * @param lan    语言
                 * @returns {Function|promise|promise|promise}
                 */
                updateEvent : function(keywords, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.updateEvent : eventServiceConfig.urls.updateEvent;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
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
                 * 删除事故
                 * @param EventCode  事故号
                 * @param user      用户
                 * @param lan     语言
                 * @returns {Function|promise|promise|promise}
                 */
                deleteEvent : function(EventCode, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? eventServiceConfig.files.deleteEvent : eventServiceConfig.urls.deleteEvent;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            EventCode:EventCode,
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