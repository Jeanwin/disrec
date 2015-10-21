/**
 * Created by fuxy on 14-2-26.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     *   自留额管理
     ------------------------------------------*/

    angular.module('olive.service.retention', [])

        .constant('RetentionServiceConfig', {
            files:{
                searchRetention: 'data/retention/retention.list.json',
                queryRetention: 'data/retention/retention.detail.json',
                createRetention: '',
                updateRetention: '',
                deleteRetentions: ''
            },
            urls:{
                searchRetention: config.backend.ip + config.backend.base + 'retention/searchRetention.do',
                queryRetention: config.backend.ip + config.backend.base + 'retention/queryRetention.do',
                createRetention: config.backend.ip + config.backend.base + 'retention/createRetention.do',
                updateRetention: config.backend.ip + config.backend.base + 'retention/updateRetention.do',
                deleteRetentions: config.backend.ip + config.backend.base + 'retention/deleteRetentions.do'
            }
        })
        .factory('RetentionService',['$http', '$q', 'RetentionServiceConfig', function ($http, $q, retentionServiceConfig) {
            return {
                /**
                 *  条件查看自留额
                 * @param keywords  查询数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
                searchRetention: function (keywords, pagination, user) {
                    var deffered = $q.defer();
                    console.log("_____ url is coming..");
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: retentionServiceConfig[config.data.method].searchRetention,
                        headers: {
                        },
                        data:{
                            keywords: keywords,
                            pagination: pagination,
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
                 * 新增自留额
                 * @param retention  自留额数据
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                createRetention: function (retention, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: retentionServiceConfig[config.data.method].createRetention,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            retention:retention,
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
                 * 查询详细自留额
                 * @param retentionNo 主键
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                queryRetention: function (retentionNo, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: retentionServiceConfig[config.data.method].queryRetention,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            retentionNo:retentionNo,
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
                 * 修改自留额
                 * @param retention  自留额数据
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                updateRetention: function (retention, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: retentionServiceConfig[config.data.method].updateRetention,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            retention:retention,
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
                 * 批量删除自留额
                 * @param retentionNo  主键数组
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                deleteRetentions: function (retentionNo, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: retentionServiceConfig[config.data.method].deleteRetentions,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            retentionNo:retentionNo,
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
                }
            };
        }]);
});