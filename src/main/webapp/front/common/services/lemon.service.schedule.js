/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config','codes'], function (angular, config,codes) {

    angular.module('lemon.service.schedule', [])
        .constant('ScheduleServiceConfig', {
            files:{
                searchEvent:  'data/schedule/searchscheduletimetable-response.json',
                searchWeektime:  'data/schedule/searchscheduletimetable-response.json',
                searchMyEvent:  'data/schedule/searchscheduletimetable-response.json',
                searchMyWeektime:  'data/schedule/searchscheduletimetable-response.json',
                startweek:  'data/schedule/selectweeks.json',
                searchTermSet:  'data/term/searchterm-response.json',
                searchClasstime:  'data/classnum/searchclassnumtable-response.json',
                delClasstime:  'data/classnum/searchclassnumtable-response.json',
                updateClassTime:  'data/classnum/searchclassnumtable-response.json',
                findClassTime:  'data/classnum/selectClassTime.json',
                searchSchedule:  'data/teacher.list.json',
                delSchedule:  'data/teacher.list.json',
                DeleteEdit:  'data/teacher.list.json',
                createCurrentTerm:  'data/term/searchterm-response.json',
//                CheckAreaWeekName:  'data/term/searchterm-response.json',
                CheckAreaSchemeName:  'data/classnum/searchclassnumtable-response.json',
                selectTnitAddScheme:  'data/classnum/selectInitAddScheme.json',
                createEdit:  'data/teacher.list.json',
                createAdd:  'data/teacher.list.json',
                createEditTerm:  'data/term/searchterm-response.json',
                CheckAreaTimeName:  'data/teacher.list.json',
                createAddTerm:  'data/teacher.list.json',
                CheckAreaName:  'data/term/searchterm-response.json',
                imModel:  'data/term/searchterm-response.json',
                selectTerm:  'data/term/import-searchterm-response.json',
                selectNowTerm:  'data/term/searchtermAndweeks.json',
                selectSchedulebyweek:  'data/schedule/selectweeks.json',
                searchLive:  'data/schedule/live.list.json',
                LiveEditSave:  'data/schedule/live.list.json',
                DeleteLive:  'data/schedule/live.list.json',
                createApply:  'data/schedule/applylive.list.json',
                searchTermTime:  'data/classnum/modifyclassnumtable-request.json',
                AddnewScheme:  'data/classnum/modifyclassnumtable-request.json',
                EditnewScheme:  'data/classnum/modifyclassnumtable-request.json',
                TermTime:  'data/classnum/modifyclassnumtable-request.json',
                searchApply:  'data/classnum/modifyclassnumtable-request.json',
                playmode:  'data/teacher.list.json',
                selectschema : 'data/code/addScheduleData.json',
                Classtimetree:  'data/schedule/schedule.classtime.list.json',
                ClassroomTime:  'data/schedule/schedule.ClassroomTime.list.json',
                findWeekTimes:  'data/schedule/schedule.WeekTime.list.json',
                updateweek:  'data/schedule/schedule.WeekTime.list.json',
                createLive:  'data/schedule/live.list.json'
                },
            urls:{
            	
            	cancelLive: config.backend.ip + config.backend.base + 'rest/curriculum/cancelLiveCurriculum',
            	searchEvent: config.backend.ip + config.backend.base + 'rest/curriculum/findWeekCurriculumList',
                searchWeektime: config.backend.ip + config.backend.base + 'rest/curriculum/findWeekCurriculumList',
                searchMyEvent: config.backend.ip + config.backend.base + 'rest/curriculum/findMyWeekCurriculumList',
                searchMyWeektime: config.backend.ip + config.backend.base + 'rest/curriculum/findMyWeekCurriculumList',
                startweek: config.backend.ip + config.backend.base + 'rest/term/findAllWeeksForShearch',
                searchTermSet: config.backend.ip + config.backend.base + 'rest/curriculum/findAllTerm',
                searchClasstime: config.backend.ip + config.backend.base + 'rest/curriculum/findAllCurriculumbase',
                delClasstime: config.backend.ip + config.backend.base + 'rest/curriculum/deleteCurriculumbase',
                updateClassTime: config.backend.ip + config.backend.base + 'rest/curriculum/insertCurriculumbase',
                findClassTime: config.backend.ip + config.backend.base + 'rest/curriculum/findMaxClass',
                searchSchedule: config.backend.ip + config.backend.base + 'rest/curriculum/findEditCurriculum',
                delSchedule: config.backend.ip + config.backend.base + 'rest/curriculum/deleteEditCurriculum',
                DeleteEdit: config.backend.ip + config.backend.base + 'rest/curriculum/deleteEditCurriculum',
                createCurrentTerm: config.backend.ip + config.backend.base + 'rest/curriculum/editiscurrent',
                createEdit: config.backend.ip + config.backend.base + 'rest/curriculum/updateEditCurriculum',
                updateweek: config.backend.ip + config.backend.base + 'rest/curriculum/updateWeekCurriculum',
                createAdd: config.backend.ip + config.backend.base + 'rest/curriculum/insertCurriculum',
                createEditTerm: config.backend.ip + config.backend.base + 'rest/curriculum/editTerm',
                CheckAreaTimeName: config.backend.ip + config.backend.base + 'rest/curriculum/checkTermDate',
//                CheckAreaWeekName: config.backend.ip + config.backend.base + 'rest/curriculum/checkCurriculumType',
                CheckAreaSchemeName: config.backend.ip + config.backend.base + 'rest/curriculum/checkCurriculumType',
                selectTnitAddScheme: config.backend.ip + config.backend.base + 'rest/curriculum/initInsertCurriculumbase',
                createAddTerm: config.backend.ip + config.backend.base + 'rest/curriculum/insertTerm',
                CheckAreaName: config.backend.ip + config.backend.base + 'rest/curriculum/checkTermName',
                imModel: config.backend.ip + config.backend.base + 'rest/curriculum/curriculum/import',
                selectTerm: config.backend.ip + config.backend.base + 'rest/term/findAllTermForShearch',
                selectNowTerm: config.backend.ip + config.backend.base + '/rest/term/findTermtips',
                selectSchedulebyweek: config.backend.ip + config.backend.base + 'rest/term/findAllWeeksForShearch',
                searchLive: config.backend.ip + config.backend.base + 'rest/curriculum/liveCurriculum',
                LiveEditSave: config.backend.ip + config.backend.base + 'rest/curriculum/updateLiveCurriculum',
                DeleteLive: config.backend.ip + config.backend.base + 'rest/curriculum/deleteLiveCurriculum',
                createApply: config.backend.ip + config.backend.base + 'rest/curriculum/insertUsedarea',
                searchTermTime: config.backend.ip + config.backend.base + 'rest/curriculum/deleteLiveCurriculum',
                AddnewScheme: config.backend.ip + config.backend.base + 'rest/curriculum/insertCurriculumbase',
                EditnewScheme: config.backend.ip + config.backend.base + 'rest/curriculum/updateCurriculumbase',
                TermTime: config.backend.ip + config.backend.base + 'rest/curriculum/queryCurriculumbase',
                searchApply: config.backend.ip + config.backend.base + '',
                playmode: config.backend.ip + config.backend.base + '',
                selectschema: config.backend.ip + config.backend.base + 'syscode/recordType',
                Classtimetree: config.backend.ip + config.backend.base + 'rest/curriculum/findAreaByCurriculumbase',
                ClassroomTime: config.backend.ip + config.backend.base + 'rest/curriculum/findAreaCurriculumbase',
                findWeekTimes: config.backend.ip + config.backend.base + 'rest/term/findWillWeeksForShearch',
                createLive: config.backend.ip + config.backend.base + 'rest/curriculum/updateLiveCurriculum',
                manualVideos: config.backend.ip + config.backend.base + 'manualVideo/manualVideos',
                manualVideoDelete:config.backend.ip + config.backend.base + 'manualVideo/delete'
                }
        })
        .factory('ScheduleService',['$http', '$q', 'ScheduleServiceConfig', function ($http, $q, ScheduleServiceConfig) {


            var bussy = false;
            var readCode = function (_codeType, _id) {
                console.log("readCode的_codeType参数：",_codeType);
                $.each(codes[_codeType], function(index, code){
                    if(code.id === _id){
                        return code.value;
                    }
                });
                return '';
            };
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
                //周课表按周查询
                searchWeektime : function(live,record,isresource,keywords,treeid){
                    console.log(record,isresource,live,keywords,treeid);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.searchWeektime: ScheduleServiceConfig.urls.searchWeektime;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            live:live,
                            record:record,
                            isresource:isresource,
                            weeks:keywords.weeks,
                            areaid:treeid
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
              //我的课表按周查询
                searchMyWeektime : function(live,record,isresource,keywords,treeid){
                    console.log(record,isresource,live,keywords,treeid);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.searchMyWeektime: ScheduleServiceConfig.urls.searchMyWeektime;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            live:live,
                            record:record,
                            isresource:isresource,
                            weeks:keywords.weeks,
                            areaid:treeid
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
                //按照开课周进行查询
                startweek : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.startweek: ScheduleServiceConfig.urls.startweek;
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
                //周课表查询
                searchEvent : function(live,video,isresource,keywords,treeid, pagination, user){
                    console.log(live,video,isresource,treeid,keywords, pagination, user);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.searchEvent: ScheduleServiceConfig.urls.searchEvent;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            live:live,
                            video:video,
                            isresource:isresource,
                            weeks:keywords.weeks,
                            areaid:treeid,
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
              //我的课表查询
                searchMyEvent : function(live,video,isresource,keywords,treeid, pagination, user){
                    console.log(live,video,isresource,treeid,keywords, pagination, user);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.searchMyEvent: ScheduleServiceConfig.urls.searchMyEvent;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            live:live,
                            video:video,
                            isresource:isresource,
                            weeks:keywords.weeks,
                            areaid:treeid,
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
                //学期设置
                searchTermSet : function(keywords, pagination, user){
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.searchTermSet: ScheduleServiceConfig.urls.searchTermSet;
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
                },
                //节次设置
                searchClasstime : function(keywords, pagination, user){
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.searchClasstime: ScheduleServiceConfig.urls.searchClasstime;
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
                },
                //节次修改保存
                updateClassTime : function(termtime,classtype,datebegin,dateend){
                    console.log(classtype,datebegin,dateend);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.updateClassTime: ScheduleServiceConfig.urls.updateClassTime;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	classtype:classtype,
                            datebegin:datebegin,
                            dateend:dateend
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
                //节次初始化下拉框
                findClassTime : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.findClassTime: ScheduleServiceConfig.urls.findClassTime;
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
                //节次删除设置
                delClasstime : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.delClasstime: ScheduleServiceConfig.urls.delClasstime;
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
                //直播编辑保存设置
                searchLive : function(keywords,treeid, pagination, user){
                    console.log(keywords,treeid, pagination, user);
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.searchLive: ScheduleServiceConfig.urls.searchLive;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	keywords:keywords,
                            treeid:treeid,
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
                //直播编辑保存设置--无图片时
                LiveEditSave : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.LiveEditSave: ScheduleServiceConfig.urls.LiveEditSave;
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
              //直播编辑保存
                createLive : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.createLive: ScheduleServiceConfig.urls.createLive;
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
                //节次时间显示
                searchTermTime : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.searchTermTime: ScheduleServiceConfig.urls.searchTermTime;
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
                //节次新方案
                AddnewScheme : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.AddnewScheme: ScheduleServiceConfig.urls.AddnewScheme;
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
                //节次方案编辑
                EditnewScheme : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.EditnewScheme: ScheduleServiceConfig.urls.EditnewScheme;
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
                //节次方案编辑
                TermTime : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.TermTime: ScheduleServiceConfig.urls.TermTime;
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
                //课表编辑查询
                searchSchedule : function(keywords,treeid, pagination, user){
                    console.log(keywords,treeid, pagination, user);
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.searchSchedule: ScheduleServiceConfig.urls.searchSchedule;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:keywords,
                            treeid:treeid,
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
                //批量删除课表信息
                delSchedule : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.delSchedule: ScheduleServiceConfig.urls.delSchedule;
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
                //课表编辑查询
                searchApply : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize;
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.searchApply: ScheduleServiceConfig.urls.searchApply;
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
                //导入课表数据初始化导入
                playmode : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.playmode: ScheduleServiceConfig.urls.playmode;
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
                //录播模式的数据字典
                selectschema : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.selectschema: ScheduleServiceConfig.urls.selectschema;
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
                //节次设置树节点的初始值
                Classtimetree : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.Classtimetree: ScheduleServiceConfig.urls.Classtimetree;
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
                //根据教室查询该教室的节次方案
                ClassroomTime : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.ClassroomTime: ScheduleServiceConfig.urls.ClassroomTime;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            areaid:keywords
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
                //添加课表--选择周次的范围
                findWeekTimes : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.findWeekTimes: ScheduleServiceConfig.urls.findWeekTimes;
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
                //导入课表
                imModel : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.imModel: ScheduleServiceConfig.urls.imModel;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'enctype="multipart/form-data',
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
                //导入学期
                selectTerm : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.selectTerm: ScheduleServiceConfig.urls.selectTerm;
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
                //显示当前学期
                selectNowTerm : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.selectNowTerm: ScheduleServiceConfig.urls.selectNowTerm;
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
                //获取课表周次接口
                selectSchedulebyweek : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.selectSchedulebyweek: ScheduleServiceConfig.urls.selectSchedulebyweek;
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
                //删除课表
                DeleteEdit : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.DeleteEdit: ScheduleServiceConfig.urls.DeleteEdit;
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
                //学期设置编辑
                createEditTerm : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.createEditTerm: ScheduleServiceConfig.urls.createEditTerm;
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
                //学期添加
                createAddTerm : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.createAddTerm: ScheduleServiceConfig.urls.createAddTerm;
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
                //学期添加后台校验
                CheckAreaName : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.CheckAreaName: ScheduleServiceConfig.urls.CheckAreaName;
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
                //学期添加开始时间后台校验
                CheckAreaTimeName : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.CheckAreaTimeName: ScheduleServiceConfig.urls.CheckAreaTimeName;
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
                //学期添加填写总周数后台校验
//                CheckAreaWeekName : function(keywords){
//                    console.log(keywords);
//                    var deffered = $q.defer();
//                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.CheckAreaWeekName: ScheduleServiceConfig.urls.CheckAreaWeekName;
//                    $http({
//                        method: config.data.method==='files'? 'GET':'POST',
//                        dataType: "json",
//                        contentType:'application/json; charset=UTF-8',
//                        url: _url,
//                        headers: {
//                        },
//                        data:keywords,
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
                //节次新方案添加后台校验
                CheckAreaSchemeName : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.CheckAreaSchemeName: ScheduleServiceConfig.urls.CheckAreaSchemeName;
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
                //初始化新增的时候调用的数据
                selectTnitAddScheme : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.selectTnitAddScheme: ScheduleServiceConfig.urls.selectTnitAddScheme;
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
                //当前学期设定
                createCurrentTerm : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.createCurrentTerm: ScheduleServiceConfig.urls.createCurrentTerm;
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
//                //删除课表
//                DeleteEdit : function(id){
//                    console.log(id);
//                    var deffered = $q.defer();
//                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.DeleteEdit: ScheduleServiceConfig.urls.DeleteEdit;
//                    $http({
//                        method: config.data.method==='files'? 'GET':'POST',
//                        dataType: "json",
//                        contentType:'application/json; charset=UTF-8',
//                        url: _url,
//                        headers: {
//                        },
//                        data:{
//                            // keywords:keywords
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
                //取消直播
                cancelLive : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.cancelLive: ScheduleServiceConfig.urls.cancelLive;
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
                //编辑课表
                createEdit : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.createEdit: ScheduleServiceConfig.urls.createEdit;
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
                //编辑周课表
                updateweek : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.updateweek: ScheduleServiceConfig.urls.updateweek;
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
                //添加课表
                createAdd : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.createAdd: ScheduleServiceConfig.urls.createAdd;
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
                //删除列表
                DeleteLive : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.DeleteLive: ScheduleServiceConfig.urls.DeleteLive;
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
                //方案应用到
                createApply : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ScheduleServiceConfig.files.createApply: ScheduleServiceConfig.urls.createApply;
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
                //手动录像任务的查询
                manualVideos: function (pagination) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                    var _url = ScheduleServiceConfig.urls.manualVideos;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        url: _url,
                        headers: {
                        },
                        data:{page:pagination},
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
                //手动录像任务的删除
                manualVideoDelete: function (keywords) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();                   
                    var _url = ScheduleServiceConfig.urls.manualVideoDelete;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
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