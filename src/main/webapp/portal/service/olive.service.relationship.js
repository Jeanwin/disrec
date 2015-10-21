/**
 * Created by fuxy on 14-2-26.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     *  合同关系管理
     ------------------------------------------*/

    angular.module('olive.service.relationship', [])

        .constant('RelationshipServiceConfig', {
            files:{
                searchRelationship: 'data/relationship/relationship.list.json',
                queryRelationship: 'data/relationship/relationship.detail.json',
                createRelationship: '',
                updateRelationship: 'data/relationship/relationship.detail.json',
                deleteRelationships: ''
            },
            urls:{
                searchRelationship: config.backend.ip + config.backend.base + 'relationship/searchRelationship.do',
                queryRelationship: config.backend.ip + config.backend.base + 'relationship/queryRelationship.do',
                createRelationship: config.backend.ip + config.backend.base + 'relationship/createRelationship.do',
                updateRelationship: config.backend.ip + config.backend.base + 'relationship/updateRelationship.do',
                deleteRelationships: config.backend.ip + config.backend.base + 'relationship/deleteRelationship.do'
            }
        })
        .factory('RelationshipService',['$http', '$q', 'RelationshipServiceConfig', function ($http, $q, relationshipServiceConfig) {

            return {
                /**
                 *  条件查看关系管理
                 * @param keywords  查询数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 */
                searchRelationship: function (keywords, pagination, user) {
                    var deffered = $q.defer();
                    console.log("_____ url is coming..");
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].searchRelationship,
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
                 * 新增合约关系
                 * @param relationship
                 * @param user
                 */
                createRelationship: function (relationship, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].createRelationship,
                        headers: {
                        },
                        data:{
                            relationship:relationship,
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
                 * 查看详细
                 * @param relationshipNo  主键
                 * @param user
                 */
                queryRelationship: function (relationshipNo, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].queryRelationship,
                        headers: {
                        },
                        data:{
                            relationshipNo:relationshipNo,
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
                 * 修改合约关系
                 * @param relationship   合约关系
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                updateRelationship: function (relationship, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].updateRelationship,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            relationship:relationship,
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
                 * 批量删除
                 * @param relationshipNo   主键
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                deleteRelationships: function (relationshipNo, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: relationshipServiceConfig[config.data.method].deleteRelationships,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                            relationshipNo:relationshipNo,
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