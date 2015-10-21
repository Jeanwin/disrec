define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 个人中心树管理
     ------------------------------------------*/
    angular.module('lemon.service.tree', [])
        .constant('TreeServiceConfig', {
            files:{
                mainTree:  {
                    "classroomSet" : 'data/schedule/scheduleTree-response.json',
                    "deviceSet" :'data/schedule/scheduleTree-response.json',
                    "dailySet" :'data/schedule/scheduleTree-response.json'
                },

                livetree:  'data/schedule/scheduleTree-response.json',
                dotInfo:  'data/videoDot.json',
                systemTree:{
                    "trees":'data/user/system.resourcetree.json',
                    "tree":'data/schedule/scheduleTree-response.json'
                },
                weekTree:  'data/schedule/scheduleTree-response.json',
                editTree:  'data/schedule/scheduleTree-response.json',
                livetreetoID:  'data/schedule/scheduleTree-response.json',
                editTreetoID:  'data/schedule/scheduleTree-response.json',
                weekTreetoID:  'data/schedule/scheduleTree-response.json'
            },
            urls:{
                mainTree: {
                    "classroomSet" :config.backend.ip + config.backend.base + 'areaView/areaTree',
                    "deviceSet" :config.backend.ip + config.backend.base + 'areaView/areaTrees',
                    "dailySet" :config.backend.ip + config.backend.base + 'areaView/areaTrees'
                },
                livetree: config.backend.ip + config.backend.base + 'areaView/areaTrees',
                dotInfo:  config.backend.ip + config.backend.base +'data/videoDot.json',
                systemTree: {
                    "trees":config.backend.ip + config.backend.base + 'deptView/deptTrees',
                    "tree":config.backend.ip + config.backend.base + 'areaView/areaTrees'
                },
                weekTree: config.backend.ip + config.backend.base + 'areaView/areaTrees',
                editTree: config.backend.ip + config.backend.base + 'areaView/areaTrees',
                livetreetoID: config.backend.ip + config.backend.base + 'rest/curriculum/liveCurriculum',
                editTreetoID: config.backend.ip + config.backend.base + '',
                weekTreetoID: config.backend.ip + config.backend.base + ''
            }
        })
        .factory('TreeService',['$http', '$q', 'TreeServiceConfig', function ($http, $q, TreeServiceConfig) {
            return {
                //Json--Tree
                mainTree : function(keywords,areaid){
                    console.log("mainTree里service的keywords",keywords);
                    console.log("mainTree里service的areaid",areaid);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TreeServiceConfig.files.mainTree[keywords]: TreeServiceConfig.urls.mainTree[keywords];
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
                //显示直播课表树
                livetree : function(keywords,areaid){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TreeServiceConfig.files.livetree: TreeServiceConfig.urls.livetree;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            areaid:areaid
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
                //获取树节点信息
                dotInfo: function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TreeServiceConfig.files.dotInfo: TreeServiceConfig.urls.dotInfo;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
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
                },
                //数据字典机构设置树
                systemTree : function(keywords,scope){
                    console.log(keywords,scope);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TreeServiceConfig.files.systemTree[keywords]: TreeServiceConfig.urls.systemTree[keywords];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:scope
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
                //显示周课表树
                weekTree : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TreeServiceConfig.files.weekTree: TreeServiceConfig.urls.weekTree;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
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
                },
                //显示课表编辑树
                editTree : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TreeServiceConfig.files.editTree: TreeServiceConfig.urls.editTree;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
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
                },
                //直播课表根据ID查询树
                livetreetoID : function(keywords,pagination){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TreeServiceConfig.files.livetreetoID: TreeServiceConfig.urls.livetreetoID;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            page:pagination
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
                //周课表根据ID查询树
                weekTreetoID : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TreeServiceConfig.files.weekTreetoID: TreeServiceConfig.urls.weekTreetoID;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
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
                },
                //课表编辑根据ID查询树
                editTreetoID : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TreeServiceConfig.files.editTreetoID: TreeServiceConfig.urls.editTreetoID;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
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