define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     *  登录安全
     ------------------------------------------*/
    angular.module('olive.service.security', [], function($provide, $httpProvider){
        $provide.factory('myHttpInterceptor', function($q) {
            return function(promise) {
                // convert JSON
                var converJson = function (data) {
                    //return JSON.parse(eval('(' + data + ')'));
                };

                return promise.then(
                    function(response) {
                        //if(config.data.method === "urls" && response.config.url.indexOf('.html') < 0)
                        //    response.data = converJson(response.data);
                        return response;
                    }, function(response) {
                        return $q.reject(response);
                    });
            }
        });
        $httpProvider.responseInterceptors.push('myHttpInterceptor');
    })

        .constant('SecurityServiceConfig', {
            files:{
                login: 'data/security/user.login.success.json'
            },
            urls:{
                login: config.backend.ip + config.backend.base + 'login.do'
            }
        })
        .factory('SecurityService',['$http', '$q', 'SecurityServiceConfig', function ($http, $q, $securityServiceConfig) {
            var user = {};

            return {
                /**
                 * 用户登录
                 * @param user  用户信息
                 */
                login: function (user) {

                    var deffered = $q.defer();
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: $securityServiceConfig[config.data.method].login,
                        headers: {
                        },
                        data:{
                            user: user
                        },
                        timeout: config.backend.timeout
                    })
                    .success(function(data){
                        deffered.resolve(data);
                    })
                    .error(function(e, code){
                        deffered.reject(code);
                    });
                    return deffered.promise;
                },

                logout: function (user) {

                },

                getUser: function () {

                }
            };
        }]);
});