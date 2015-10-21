/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 分出业务非比例管理
     ------------------------------------------*/
    angular.module('lemon.service.permission', [])
        .constant('PermissionServiceConfig', {
            files:{

                permission:      'data/permissions.list.json',
                resourceupmid:      'data/resource/setupIssuedResource_request.json'
                }
            ,
            urls:{

                permission: config.backend.ip + config.backend.base + '/getUser',
                resourceupmid: config.backend.ip + config.backend.base + 'rest/resource/findResourceupmid',
                modifyPassword: config.backend.ip + config.backend.base + 'userView/modifyPassword'
                }
        })
        .factory('PermissionsService',['$http', '$q', 'PermissionServiceConfig', function ($http, $q, PermissionServiceConfig) {
            return {


                //图片资源设置的的保存操作
                //权限
                permission: function(keywords){
                    console.log(keywords);
                    console.log("permission服务中的传值");
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?PermissionServiceConfig.files.permission: PermissionServiceConfig.urls.permission;
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
                //非比例分出账务处理------------------------------end-----------------------------------------------------
               
                //修改用户密码
                modifyPassword: function(keywords){
                    console.log(keywords);
                    console.log("permission服务中的传值");
                    var deffered = $q.defer();
                    var _url = PermissionServiceConfig.urls.modifyPassword;
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
                /**
                 * 获取账单期
                 * @param contractNo  暂存编号
                 */
                getBillDate: function (contAttr, contractNo, user, lan) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var _url = config.data.method==='files'? billServiceConfig.files.getBillDate : billServiceConfig.urls.getBillDate;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        //  url: contractServiceConfig[config.data.method].transferContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            contAttr:contAttr,
                            contractNo:contractNo,
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