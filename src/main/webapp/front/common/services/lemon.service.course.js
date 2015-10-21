/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 课程轮询管理
     ------------------------------------------*/
    angular.module('lemon.service.course', [])
        .constant('CourseServiceConfig', {
            files:{
                searchCourse:  'data/coursepatrol1.list.json',
                setPolling:'data/coursepatrol.list.json',
                CoursetourNum:'data/initcoursepatrol.list.json',
                getLivingAddress:'data/getLivingAddress.list.json',
                getMacByTreeId:'data/getMacByTreeId.list.json',
                getDetailById:'data/getDetailById.list.json'
                },
            urls:{
                searchCourse: config.backend.ip + config.backend.base + 'rest/devicePoling/findDevicePolingSetByAreaid',
                CoursetourNum: config.backend.ip + config.backend.base + 'rest/devicePoling/initDevicePoling',
                setPolling:config.backend.ip + config.backend.base + 'rest/devicePoling/setDevicePoling',
                getLivingAddress:config.backend.ip + config.backend.base2 + 'living',
                getMacByTreeId:config.backend.ip + config.backend.base + 'deviceView/getMacById',
                getDetailById:config.backend.ip + config.backend.base + 'areaView/getDetailById '
                }
        })
        .factory('CourseService',['$http', '$q', 'CourseServiceConfig', function ($http, $q, CourseServiceConfig) {
            return {
            	
            	/**
            	 * 通过树形结构id获取mac
            	 */
            	getMacByTreeId:function(id,temp){
                    console.log('进入getMacByTreeId的服务以后传的值',id);
                    var deffered=$q.defer();
                    var _url=config.data.method==='files'?CourseServiceConfig.files.getMacByTreeId:CourseServiceConfig.urls.getMacByTreeId;
                    $http({
                        method: config.data.method==='files'?'GET':'POST',
                        dataType:   'json',
                        contentType:    'application/json; charset=UTF-8',
                        url: _url,
                        data:{
                        	areaid:id,
                        	temp: temp
                        },
                        headers:{
                        },
                        timeout: config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
            	/**
                 * 通过树id获取mac,教室信息
                 */
                getDetailById:function(id){
                    var deffered=$q.defer();
                    var _url=config.data.method==='files'?CourseServiceConfig.files.getDetailById:CourseServiceConfig.urls.getDetailById;
                    $http({
                        method: config.data.method==='files'?'GET':'POST',
                        dataType:   'json',
                        contentType:    'application/json; charset=UTF-8',
                        url: _url,
                        data:{
                            id:id
                        },
                        headers:{
                        },
                        timeout: config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
            	/**
            	 * 课程巡视获取直播流方法
            	 */
            	getLivingAddress:function(mac,isLive){
                    console.log('进入getLivingAddress的服务以后传的值',mac);
                    var deffered=$q.defer();
                    var _url=config.data.method==='files'?CourseServiceConfig.files.getLivingAddress:CourseServiceConfig.urls.getLivingAddress+"?mac=" 
                    		+ mac + "&isLive=" + isLive;
                    $http({
                        method: config.data.method==='files'?'GET':'GET',
                        dataType:   'json',
                        contentType:    'application/json; charset=UTF-8',
                        url: _url,
                        headers:{
                        },
                        timeout: config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },

            	/**
            	 * 设置轮询
            	 */
                setPolling:function(keywords){
                    console.log('进入setPolling的服务以后传的值',keywords);
                    var deffered=$q.defer();
                    var _url=config.data.method==='files'?CourseServiceConfig.files.setPolling:CourseServiceConfig.urls.setPolling;
                    $http({
                        method: config.data.method==='files'?'GET':'POST',
                        dataType:   'json',
                        contentType:    'application/json; charset=UTF-8',
                        url: _url,
                        headers:{
                        },
                        data:keywords,
                        timeout: config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                
                /**
                 * 查询课程巡视
                 */
                searchCourse : function(keywords){
                    console.log(keywords);
                    console.log("进入课程巡视的分页");
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?CourseServiceConfig.files.searchCourse: CourseServiceConfig.urls.searchCourse;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            areainfo:keywords
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
                 * 初始化进行课程巡视的值遍历
                 */
                CoursetourNum : function(keywords){
                    console.log(keywords);
                    console.log("进入课程巡视的分页");
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?CourseServiceConfig.files.CoursetourNum: CourseServiceConfig.urls.CoursetourNum;
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
                }

            };
        }]);

});