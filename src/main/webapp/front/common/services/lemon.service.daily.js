define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 教室日常管理
     ------------------------------------------*/
    angular.module('lemon.service.daily', [])
        .constant('DailyServiceConfig', {
            files:{
                searchDaily:  'data/daily/searchdaily-response.json'
//                classroomsDailyTree:  'data/schedule/scheduleTree-response.json'
            },
            urls:{
                searchDaily: config.backend.ip + config.backend.base + 'areaView/classRooms'
//                classroomsDailyTree: config.backend.ip + config.backend.base + 'xolContBill/parepareImportComShare.do'
            }
        })
        .factory('DailyService',['$http', '$q', 'DailyServiceConfig', function ($http, $q, DailyServiceConfig) {
            return {

                /* 日常列表	查询接口 */
                /* 条件查询方法 -- 同设备列表查询 **********************************************************/
                /**
                 * @param keywords  查询数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 * @returns {Function|promise|promise|promise}
                 */
                searchDaily : function(keywords,areaid,pagination, user){
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                    var _url = config.data.method==='files'?DailyServiceConfig.files.searchDaily: DailyServiceConfig.urls.searchDaily;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            treeid:areaid,
                            page:pagination,
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

                //Json--Tree
                /*classroomsDailyTree : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?DailyServiceConfig.files.classroomsDailyTree: DailyServiceConfig.urls.classroomsDailyTree;
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
                }*/
            };
        }]);

});