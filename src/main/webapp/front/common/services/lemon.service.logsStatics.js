/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 分出业务非比例管理
     ------------------------------------------*/
    angular.module('lemon.service.logsStatics', [])
        .constant('LogsStaticsServiceConfig', {
            urls:{
                LogsList: config.backend.ip + config.backend.base + 'alarmLog/alarmLogs',
                ModifyAlarmLogs:config.backend.ip + config.backend.base + 'alarmLog/update',
                voiceCallLogs:config.backend.ip + config.backend.base + 'voiceCallLog/voiceCallLogs',
                update:config.backend.ip + config.backend.base + 'alarmLog/update'
                }
        })
        .factory('LogsStaticsService',['$http', '$q', 'LogsStaticsServiceConfig', function ($http, $q, LogsStaticsServiceConfig) {
            return {
                LogsList : function(keywords,page){
                    page.offset = page.pageIndex;
                    page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    var _url = LogsStaticsServiceConfig.urls.LogsList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            page:page,                            
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

                handleAlarmLogs:function(key){
                    var deffered = $q.defer();
                    var _url = LogsStaticsServiceConfig.urls.update;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:key,
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
                 voiceCallLogs:function(keywords,page){
                    page.offset = page.pageIndex;
                    page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    var _url = LogsStaticsServiceConfig.urls.voiceCallLogs;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            page:page,
                            keywords:keywords
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