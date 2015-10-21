/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 分出业务非比例管理
     ------------------------------------------*/
    angular.module('lemon.service.classrooom', [])
        .constant('ClassroomServiceConfig', {
            files:{
                searchClassroom:  'data/classrooms.list.json',
//                searchClassroomTree:  'data/classrooms.list.json',
                save:'data/classnum/addclassnumtable-response.json',
                classroomstate:'data/classroomstate.list.json',

                EditClassroom: {
                    "save" : 'data/classnum/addclassnumtable-response.json',
                    "update":'data/classnum/modifyclassnumtable-response.json'
                },
                DeleteClassroom:  'data/classroom/deleteclassroom-request.json',
                DeleteClass:  'data/classroom/deleteclassroom-request.json',
                CheckAreaName:  'data/classroom/CheckAreaName-request.json',
                CheckAreaNum:  'data/classroom/CheckAreaName-request.json'
            },
            urls:{
                searchClassroom: config.backend.ip + config.backend.base + 'areaView/areas',
//                searchClassroomTree: config.backend.ip + config.backend.base + 'areaView/areaTrees',
                save: config.backend.ip + config.backend.base + 'areaView/save',
                classroomstate: config.backend.ip + config.backend.base + 'syscode/areaType',

                EditClassroom: {
                    "save" : config.backend.ip + config.backend.base + 'areaView/save',
                    "update":config.backend.ip + config.backend.base + 'areaView/update'
                },
                DeleteClassroom: config.backend.ip + config.backend.base + 'areaView/delete',
                DeleteClass: config.backend.ip + config.backend.base + 'rangeView/delete',
                CheckAreaName: config.backend.ip + config.backend.base + 'areaView/areaName',
                CheckAreaNum: config.backend.ip + config.backend.base + 'areaView/inneridCount',
                CardCreat: config.backend.ip + config.backend.base + 'card/create',
                CardholderList: config.backend.ip + config.backend.base + 'card/teacherList',
                checkCardNum: config.backend.ip + config.backend.base + 'card/checkCardNumber',
                CardUpdate: config.backend.ip + config.backend.base + 'card/update',
                CardDelete: config.backend.ip + config.backend.base + 'card/delete',
                CardLose: config.backend.ip + config.backend.base + 'card/lossCard',
                CardsList: config.backend.ip + config.backend.base + 'card/cards',
                /*CardImport: config.backend.ip + config.backend.base + 'card/import',*/
                DutyCreat: config.backend.ip + config.backend.base + 'dutySet/create',
                DutyUpdate: config.backend.ip + config.backend.base + 'dutySet/update',
                DutyCheck: config.backend.ip + config.backend.base + 'dutySet/checkClassroom ',
                DutyDelete: config.backend.ip + config.backend.base + 'dutySet/delete',
                DutyList: config.backend.ip + config.backend.base + 'dutySet/duties',
                GetClassAdminsList: config.backend.ip + config.backend.base + 'dutySet/classAdminsList',
                LightSet: config.backend.ip + config.backend.base + 'lightSet/create',
                LightUpdate: config.backend.ip + config.backend.base + 'lightSet/update',
                LightList: config.backend.ip + config.backend.base + 'lightSet/lights',
                LightExport: config.backend.ip + config.backend.base + 'lightSet/exportLights',
                EmailCreate: config.backend.ip + config.backend.base + 'email/create',
                EmailDelete: config.backend.ip + config.backend.base + 'email/delete',
                EmailUpdate:  config.backend.ip + config.backend.base + 'email/update',
                EmailsList: config.backend.ip + config.backend.base + 'email/emails',
                FixedTaskList: config.backend.ip + config.backend.base + 'timeTask/timeTasks',
                DeleteFixedTask: config.backend.ip + config.backend.base + 'timeTask/delete',
                UpdateFixedTask: config.backend.ip + config.backend.base + 'timeTask/update',
                CreateFixedTask: config.backend.ip + config.backend.base + 'timeTask/create',
                GetfacilityCode: config.backend.ip + config.backend.base + 'syscode/code',
                
            }
        })
        .factory('ClassroomService',['$http', '$q', 'ClassroomServiceConfig', function ($http, $q, ClassroomServiceConfig) {
            return {


                /* 事故分摊	用查询合同接口 */
                /* 条件查询方法 -- 同合同查询 **********************************************************/
                /**
                 * 准备生成预付分保费
                 * 生成对内对外账单
                 * @param contAttr   比例【P】 /非比例 【PS】
                 * @param contFacMrk   合同【0】/临分【1】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param inExMrk   对内【0】/对外【1】
                 * @param billType    账单类型
                 * @param keywords     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
            	GetfacilityCode : function(){
                    var deffered = $q.defer();
                    var _url = ClassroomServiceConfig.urls.GetfacilityCode;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{value:'timeTaskType'},
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
            	CreateFixedTask : function(keywords){
                    var deffered = $q.defer();
                    var _url = ClassroomServiceConfig.urls.CreateFixedTask;
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
            	UpdateFixedTask : function(keywords){
                    var deffered = $q.defer();
                    var _url = ClassroomServiceConfig.urls.UpdateFixedTask;
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
            	DeleteFixedTask : function(keywords){
                    var deffered = $q.defer();
                    var _url = ClassroomServiceConfig.urls.DeleteFixedTask;
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
            	FixedTaskList : function(page){
            		page.offset = page.pageIndex;
               	    page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    var _url = ClassroomServiceConfig.urls.FixedTaskList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	 page:page
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
            	EmailUpdate : function(keywords,page){
            		page.offset = page.pageIndex;
               	    page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.EmailUpdate;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	 keywords:keywords,
                        	 page:page
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
            	EmailUpdate : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.EmailUpdate;
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
            	EmailDelete : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.EmailDelete;
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
            	EmailCreate : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.EmailCreate;
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
            	LightExport : function(keywords,page){
            		page.offset = page.pageIndex;
               	    page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.LightExport;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	 keywords:keywords,
                        	 page: page
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
            	LightList : function(keywords,page){
            		 page.offset = page.pageIndex;
                	 page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.LightList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	 keywords:keywords,
                        	 page: page
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
            	LightUpdate : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.LightUpdate;
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
            	LightSet : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.LightSet;
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
            	GetClassAdminsList : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.GetClassAdminsList;
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
            	DutyList : function(keywords,page){
            	   page.offset = page.pageIndex;
               	   page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.DutyList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	 keywords:keywords,
                        	 page:page
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
            	DutyDelete : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.DutyDelete;
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
            	DutyUpdate : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.DutyUpdate;
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
            	DutyCreat : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.DutyCreat;
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
            	/*CardImport : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.CardImport;
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
                },*/
            	CardLose : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.CardLose;
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
                CardsList : function(keywords,page){
                	 page.offset = page.pageIndex;
                	 page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.CardsList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	 keywords:{keyword:keywords},
                        	 page:page
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
            	CardDelete : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.CardDelete;
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
                DutyCheck : function(oldArea,keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.DutyCheck;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{'oldAreaId':oldArea,'list':keywords},
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
            	CardUpdate : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.CardUpdate;
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
                checkCardNum : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.checkCardNum;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{cardNumber:keywords},
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
            	CardholderList : function(keywords){
                    var deffered = $q.defer();
                    console.log(keywords);
                    var _url = ClassroomServiceConfig.urls.CardholderList;
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
            	CardCreat : function(keywords){
                     var deffered = $q.defer();
                     console.log(keywords);
                     var _url = ClassroomServiceConfig.urls.CardCreat;
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
                searchClassroom : function(keywords, areaid, pagination, user){
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;

                    console.log(keywords);
                    var _url = config.data.method==='files'?ClassroomServiceConfig.files.searchClassroom: ClassroomServiceConfig.urls.searchClassroom;
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
                CheckAreaName : function(_data){
                    console.log("CheckAreaName里service的",_data);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ClassroomServiceConfig.files.CheckAreaName: ClassroomServiceConfig.urls.CheckAreaName;
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
                CheckAreaNum : function(_data){
                    console.log("CheckAreaNum里service的_data用来接收放回过来的data",_data)
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ClassroomServiceConfig.files.CheckAreaNum: ClassroomServiceConfig.urls.CheckAreaNum;
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


                //Json--Tree
                /*classroomTree : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ClassroomServiceConfig.files.classroomTree: ClassroomServiceConfig.urls.classroomTree;
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
                },*/


                /**
                 * 教室数据  删除  输入
                 * 【生成 / 维护待摊信息-查询】
                 * @param keywords  查询条件
                 * @param orderByWords   排序
                 * @param pagination    分页
                 * @param user    用户
                 * @param lan    语言
                 * @returns {Function|promise|promise|promise}
                 */
                //区域删除
                DeleteClassroom : function(node){
                    console.log("DeleteClassroom里service的参数node：",node);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? ClassroomServiceConfig.files.DeleteClassroom : ClassroomServiceConfig.urls.DeleteClassroom;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                               "id": node.id,
                               "attribute": node.attribute
//                            keywords:keywords,
//                            orderByWords:orderByWords,
//                            pagination:pagination,
//                            user:user,
//                            lan:lan
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
                //教室范围删除
                DeleteClass : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? ClassroomServiceConfig.files.DeleteClass : ClassroomServiceConfig.urls.DeleteClass;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            "rangeid": keywords
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

                //添加教室
                save : function(classroom){
                    console.log(classroom,"教室添加");
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ClassroomServiceConfig.files.save: ClassroomServiceConfig.urls.save;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            name:classroom.name,
                            parentid:classroom.parentid,
                            attribute:classroom.attribute,
                            innerid:classroom.innerid,
                            sort:classroom.sort,
                            state:classroom.state
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

                //教室状态state
//                classroomstate : function(classstate){
//                    console.log(classroom,"教室添加");
//                    var deffered = $q.defer();
//                    var _url = config.data.method==='files'?ClassroomServiceConfig.files.classroomstate: ClassroomServiceConfig.urls.classroomstate;
//                    $http({
//                        method: config.data.method==='files'? 'GET':'POST',
//                        dataType: "json",
//                        contentType:'application/json; charset=UTF-8',
//                        url: _url,
//                        headers: {
//                        },
//                        data:{
//                            id:classstate.state
//                        },
//                        timeout:  config.backend.timeout
//                    })
//                        .success(function(data){
//                            deffered.resolve(data);
//                        })
//                        .error(function(e, code){
//                            deffered.reject(code);
//                        });
//                    return deffered.promise;
//                },

                /**
                 * 查询 ----教室状态
                 * @returns {Function|promise|promise|promise}
                 */
                classroomstate: function (classstate) {
                    console.log("classroomstate里service的classstate",classstate);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ClassroomServiceConfig.files.classroomstate: ClassroomServiceConfig.urls.classroomstate;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: ClassroomServiceConfig[config.data.method].classroomstate,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:classstate,
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

                //教室编辑
                EditClassroom : function(editMode, classroom){
                    console.log("EditClassroom编辑/保存servic走向：",editMode);
                    console.log("EditClassroom添加/编辑区域servic参数：",classroom);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'? ClassroomServiceConfig.files.EditClassroom[editMode] : ClassroomServiceConfig.urls.EditClassroom[editMode];
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
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


                /**-------------------------分割线-------------------------------*/

                /**
                 * 显示账单
                 * @param contAttr   比例【P】 /非比例 【PS】
                 * @param contFacMrk   合同【0】/临分【1】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param inExMrk   对内【0】/对外【1】
                 * @param billType    账单类型 [0]:预付保费  [1]:调整保费
                 * @param keywords     数据  [合约编号，账单期]
                 * @param pagination  分页
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                searchBill:function(contAttr, contFacMrk ,inOutMrk, inExMrk, billType, keywords, pagination, user, lan){

                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.searchBill[billType] : billServiceConfig.urls.searchBill;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{

                        },
                        data:{
                            contAttr:contAttr,
                            contFacMrk:contFacMrk,
                            inOutMrk:inOutMrk,
                            inExMrk:inExMrk,
                            billType:billType,
                            keywords:keywords,
                            pagination:pagination,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
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
                 * 账单确认
                 * @param contAttr   比例【P】 /非比例 【PS】
                 * @param contFacMrk   合同【0】/临分【1】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param inExMrk   对内【0】/对外【1】
                 * @param billType    账单类型
                 * @param keywords     数据
                 * @param user       操作用户
                 * @param lan       语言
                 * @returns {Function|promise|promise|promise}
                 */
                confirmBill:function(contAttr, contFacMrk, inOutMrk, inExMrk, billType, keywords, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.confirmBill : billServiceConfig.urls.confirmBill;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            contAttr:contAttr,
                            contFacMrk:contFacMrk,
                            inOutMrk:inOutMrk,
                            inExMrk:inExMrk,
                            billType:billType,
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
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
                 * 超赔临分(分出)账务--条件查询
                 * @param contAttr  非比例【PS】/比例【P】
                 * @param inOutMrk   分入【1】/分出【0】
                 * @param certiType  分保类型
                 * @param keywords
                 * @param pagination
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                searchRecertiBill:function(contAttr, inOutMrk, certiType, keywords, pagination, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.searchRecertiBill[contAttr] : billServiceConfig.urls.searchRecertiBill;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            contAttr:contAttr,
                            inOutMrk:inOutMrk,
                            certiType:certiType,
                            keywords:keywords,
                            pagination:pagination,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
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
                 * 预付费对内 ---导入
                 * @param importType  [自留额：retentImport，浮动手续费；adjustImport , 预付费：prepayImport ]
                 * @param file  文件对象
                 * @param keywords  数据
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 * 龙 ：
                 * @param  importType [自留额：retentImport，浮动手续费；adjustImport , 预付费：prepayImport ]
                 * @param user
                 * @param lan
                 * file  file [所上传的文件]
                 */
                importFhxBill:function(importType,_file, keywords, user, lan){
                    var deffered = $q.defer();
                    console.log("导入类型--start");
                    console.log(importType);
                    console.log("导入类型--end");
                    console.log("文件对象--_file");
                    console.log(_file);
                    console.log("文件对象--_file");
                    var _url = config.data.method==='files'?billServiceConfig.files.importFhxBill : billServiceConfig.urls.importFhxBill;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            importType:importType,
                            file:_file,
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
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
                 * 调整保费---录入实际保费(赔付率)
                 * @param keywords
                 * @param user
                 * @param lan
                 * @returns {Function|promise|promise|promise}
                 */
                getSectionDtl:function(keywords, user, lan){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?billServiceConfig.files.getSectionDtl : billServiceConfig.urls.getSectionDtl;
                    $http({
                        method:config.data.method==='files'?'GET':'POST',
                        dataType:"json",
                        contentType:'application/json:charset=UTF-8',
                        url:_url,
                        headers:{
                        },
                        data:{
                            keywords:keywords,
                            user:user,
                            lan:lan
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e,code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //非比例分出账务处理------------------------------end-----------------------------------------------------
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