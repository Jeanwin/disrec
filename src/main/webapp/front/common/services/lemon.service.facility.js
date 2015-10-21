define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 教室设备管理
     ------------------------------------------*/
    angular.module('lemon.service.facility', [])
        .constant('FacilityServiceConfig', {
            files:{
                searchFacility:  'data/device/searchdevice-response.json',
                createFacility: 'data/device/createdevice-response.json',
                updateFacility: 'data/device/modifydevice-response.json',
                deleteFacilitys: 'data/device/deletedevice-response.json',
                deviceByClassroom: 'data/device/deviceByClassroom-response.json',
                getDeviceDepartment: 'data/device/getDeviceDepartment-response.json',
                CheckFacilityName: 'data/device/getDeviceDepartment-response.json'
//                classroomsFacilityTree:  'data/schedule/scheduleTree-response.json'
            },
            urls:{
                searchFacility: config.backend.ip + config.backend.base + 'deviceView/devices',
                createFacility: config.backend.ip + config.backend.base + 'deviceView/save',
                updateFacility: config.backend.ip + config.backend.base + 'deviceView/update',
                deleteFacilitys: config.backend.ip + config.backend.base + 'deviceView/delete',
                deviceByClassroom: config.backend.ip + config.backend.base + 'deviceView/devicesByAreaId',
                getDeviceDepartment: config.backend.ip + config.backend.base + 'syscode/diviceType',
                CheckFacilityName: config.backend.ip + config.backend.base + 'areaView/areasByName',
                checkType: config.backend.ip + config.backend.base + 'deviceView/checkType',
                checkMac:config.backend.ip + config.backend.base + 'deviceView/checkMac',
                versionList:config.backend.ip + config.backend.base + 'areaView/list'
//                classroomsFacilityTree: config.backend.ip + config.backend.base + 'xolContBill/parepareImportComShare.do'
            }
        })
        .factory('FacilityService',['$http', '$q', 'FacilityServiceConfig', function ($http, $q, FacilityServiceConfig) {
            return {


                /* 设备列表	查询接口 */
                /* 条件查询方法 -- 同设备列表查询 **********************************************************/
                /**
                 * @param keywords  查询数据
                 * @param pagination 分页信息
                 * @param user  操作用户信息
                 * @returns {Function|promise|promise|promise}
                 */
                searchFacility : function(keywords,areaid,pagination, user){
                    console.log("这里是keywords参数：",keywords);
                    console.log("这里是areaid参数：",areaid);
                    console.log("这里是pagination参数：",pagination);
                    console.log("这里是user参数：",user);
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize*1;
                    var _url = config.data.method==='files'?FacilityServiceConfig.files.searchFacility: FacilityServiceConfig.urls.searchFacility;
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
                },

                /**
                 * 新增设备
                 * @param facility
                 * @param user
                 */
                createFacility: function (facility, user) {
                    var data = {
                        areaid:facility.areaid,
                        name:facility.name,
                        typeid:facility.typeid,
                        parentid:facility.parentid,
                        ip:facility.ip,
                        mac:facility.mac,
                        mostly:facility.mostly
                    };
                    console.log("新增设备");
                    console.log(data);
                    console.log(JSON.stringify(data));
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: FacilityServiceConfig[config.data.method].createFacility,
                        headers: {
                        },
                        data:data,
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
                 * @param facilityNo  主键
                 * @param user
                 */
                queryFacility: function (facilityNo, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: FacilityServiceConfig[config.data.method].queryFacility,
                        headers: {
                        },
                        data:{
                            facilityNo:facilityNo,
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
                 * 修改设备信息
                 * @param facility   设备信息
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                updateFacility: function (facility, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: FacilityServiceConfig[config.data.method].updateFacility,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:facility,
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
                 * @param facilityNo   主键
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                deleteFacilitys: function (id, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: FacilityServiceConfig[config.data.method].deleteFacilitys,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
                        	id:id
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
                 * 通过所属教室查询父设备信息
                 * @param classroom   所属教室
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                deviceByClassroom: function (classroom, user) {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: FacilityServiceConfig[config.data.method].deviceByClassroom,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:classroom,
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
                 * 查询设备机构
                 * @returns {Function|promise|promise|promise}
                 */
                getDeviceDepartment: function () {
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: FacilityServiceConfig[config.data.method].getDeviceDepartment,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
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

                //编辑设备同教室设备不能同名称---
                CheckFacilityName : function(_data){

                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?FacilityServiceConfig.files.CheckFacilityName: FacilityServiceConfig.urls.CheckFacilityName;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:_data,
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
                //mac不能同名
                checkMac : function(_data){
                    var deffered = $q.defer();
                    var _url = FacilityServiceConfig.urls.checkMac;
                    $http({
                        method: 'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:_data,
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
                //mac不能同名
                checkType : function(_data){
                    var deffered = $q.defer();
                    var _url = FacilityServiceConfig.urls.checkType;
                    $http({
                        method: 'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:_data,
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

                //版本管理 上传安装包
                // versionList : function(_data){

                // 	var deffered = $q.defer();
                //     var _url = FacilityServiceConfig.urls.versionList;
                //     $http({
                //         method: 'POST',
                //         dataType: "json",
                //         contentType:'application/json; charset=UTF-8',
                //         url: _url,
                //         headers: {
                //         },
                //         data:_data,
                //         timeout:  config.backend.timeout
                //     })
                //         .success(function(data){
                //             deffered.resolve(data);
                //         })
                //         .error(function(e, code){
                //             deffered.reject(code);
                //         });
                //     return deffered.promise;
                // } 
                versionList : function(keywords,pagination, user){
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                   var _url = FacilityServiceConfig.urls.versionList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
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
                /*classroomsFacilityTree : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?FacilityServiceConfig.files.classroomsFacilityTree: FacilityServiceConfig.urls.classroomsFacilityTree;
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