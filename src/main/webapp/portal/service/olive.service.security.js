define(['angular', 'config', 'menus'], function (angular, config, menus) {
    /*-----------------------------------------
     *  登录安全
     ------------------------------------------*/
    angular.module('olive.service.security', [])

        .constant('SecurityServiceConfig', {
            files:{
                login: 'data/security/user.login.success.json',
                getUserMenu: 'data/security/user.menu.json'
            },
            urls:{
                login: config.backend.ip + config.backend.base + 'login.do',
                getUserMenu: config.backend.ip + config.backend.base + 'mainAction/main.do'
            }
        })
        .factory('SecurityService',['$http', '$q', 'SecurityServiceConfig', function ($http, $q, $securityServiceConfig) {

            var parseUserMenu = function(_bigMenu, _userMenu) {

                _bigMenu.menu = filterUserMenu(_bigMenu.menu, _userMenu);
                _bigMenu.admin = filterUserMenu(_bigMenu.admin, _userMenu);

//                console.log(_bigMenu.menu);
                return _bigMenu;
            };

            var filterUserMenu = function (_bigMenu, _userMenu) {

                var result = _bigMenu;

//                console.log(result);

                $.each(result, function(index, menu){
                    if(angular.isDefined(menu.menus)){
                        filterUserMenu(menu.menus, _userMenu);
                    }else{
                        if ($.inArray(menu.id, _userMenu) === -1)
                            menu.hide = true;
                    }
                });

                if(angular.isDefined(result.menus))
                    return false;

                return result;
            };

            return {
                /**
                 * 用户登录
                 * @param user  用户信息
                 */
//                login: function (user) {
//
//                    var deffered = $q.defer();
//                    $http({
//                        method: config.data.method==='files'? 'GET':'POST',
//                        url: $securityServiceConfig[config.data.method].login,
//                        headers: {
//                        },
//                        data:{
//                            user: user
//                        },
//                        timeout: config.backend.timeout
//                    })
//                    .success(function(data){
//                        deffered.resolve(data);
//                    })
//                    .error(function(e, code){
//                        deffered.reject(code);
//                    });
//                    return deffered.promise;
//                },
//
//                logout: function (user) {
//
//                },

                getUserMenu: function (user) {
                    var deffered = $q.defer();

                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        url: $securityServiceConfig[config.data.method].getUserMenu,
                        headers: {
                        },
                        data:{
                            user: user
                        },
                        timeout: config.backend.timeout
                    })
                    .success(function(data){
                        deffered.resolve(parseUserMenu(menus, data));
                    })
                    .error(function(e, code){
                        deffered.reject(code);
                    });

                    return deffered.promise;
                }
            };
        }]);
});