/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 分出业务非比例管理
     ------------------------------------------*/
    angular.module('lemon.service.message', [])
        .constant('MessageServiceConfig', {
            urls:{
                MesssageList: config.backend.ip + config.backend.base + 'messageList/messageList',
                DeleteMessageModal:config.backend.ip + config.backend.base + 'messageList/delete',
                ReadUpdate:config.backend.ip + config.backend.base + 'messageList/update'
                }
        })
        .factory('MessageService',['$http', '$q', 'MessageServiceConfig', function ($http, $q, MessageServiceConfig) {
            return {
                ReadUpdate : function(keywords){
                    var deffered = $q.defer();
                    var _url = MessageServiceConfig.urls.ReadUpdate;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{"id":keywords},
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
                DeleteMessageModal : function(keywords){
                    var deffered = $q.defer();
                    var _url = MessageServiceConfig.urls.DeleteMessageModal;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:keywords,
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
                MessageList : function(page){
                    page.offset = page.pageIndex;
                    page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    var _url = MessageServiceConfig.urls.MesssageList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            page:page                          
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