define(['angular', 'config'], function (angular, config) {

    angular.module('olive.service.interface', [])
    /**
     * 接口测试
     */
        .constant('InterfaceServiceConfig', {
            files:{
                searchInterface: 'data/interface/interface.list.json',
                createFxoPay:'',
                deleteFxoPay:'',
                modifyFxoPay:''
            },
            urls:{

            }
        })
        .factory('InterfaceService',['$http', '$q', 'InterfaceServiceConfig', function ($http, $q, interfaceServiceConfig) {
            return {

                searchInterface : function(keywords, orderByWords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? interfaceServiceConfig.files.searchInterface : interfaceServiceConfig.urls.searchInterface;
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
                }

            };
        }]);
});