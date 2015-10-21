/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 分出业务非比例管理
     ------------------------------------------*/
    angular.module('lemon.service.teachSearch', [])
        .constant('TeachSearchServiceConfig', {
            files:{
                searchTeacher:  'data/teacher.list.json'
                }
            ,
            urls:{
                // 获取评课模板
                GetclassEvaluationModal: config.backend.ip + config.backend.base + 'rest/reviewView/classEvaluationModal',
                // 获取子评课模板
                GetclassEvaluationChildModal: config.backend.ip + config.backend.base + 'rest/reviewView/classEvaluationChildModal',
                // 新增评课模板
                InsertclassEvaluationModal: config.backend.ip + config.backend.base + 'rest/reviewView/insertListenModal',
                // 修改评课模板
                UpdateclassEvaluationModal: config.backend.ip + config.backend.base + 'rest/reviewView/updateListenModal',
                 // 删除评课模板
                DeleteclassEvaluationModal: config.backend.ip + config.backend.base + 'rest/reviewView/deleteListenModal',
                  // 获取听课表模板
                GetlistenModal: config.backend.ip + config.backend.base + 'rest/lectureView/listenModal',
                 // 获取听课子表模板
                GetlistenChildModal: config.backend.ip + config.backend.base + 'rest/lectureView/lectureChildModel',
                // 新增听课表模板
                InsertlistenModal: config.backend.ip + config.backend.base + 'rest/lectureView/insertListenModal',
                // 修改听课表模板
                UpdatelistenModal: config.backend.ip + config.backend.base + 'rest/lectureView/updateListenModal',
                // 删除听课表模板
                DeleteListenModal: config.backend.ip + config.backend.base + 'rest/lectureView/deleteListenModal',
                // 活动列表
                GetActiveListModal: config.backend.ip + config.backend.base + 'rest/active/activeModal',
                // 删除活动
                DeleteActiveModal: config.backend.ip + config.backend.base + 'rest/active/deleteActiveModal',
                // 听课记录             
                RecordListModal: config.backend.ip + config.backend.base + 'rest/studyRecordView/getStudyRecordViewList',
                // 统计          
                StatisticListModal: config.backend.ip + config.backend.base + 'rest/studyRecordView/getViewList',
                DepartStatList: config.backend.ip + config.backend.base + 'deptView/findDeptSomeMessage',
                ChangeStatus: config.backend.ip + config.backend.base + 'rest/lectureView/changeStatus'
                

            }
            
        })
        .factory('TeachSearchService',['$http', '$q', 'TeachSearchServiceConfig', function ($http, $q, TeacherServiceConfig) {
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
            	ChangeStatus : function(keywords){
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.ChangeStatus;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {},
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
            	DepartStatList : function(keywords){
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.DepartStatList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: keywords,
                        data:{
                        	keywords:{'name':keywords}
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
            	StatisticListModal : function(keywords){
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.StatisticListModal;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: keywords,
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
            	RecordListModal : function(keywords,page){
            		page.offset = page.pageIndex;
               	    page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.RecordListModal;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: keywords,
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
            	DeleteActiveModal : function(keywords,page){
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.DeleteActiveModal;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: keywords,
                        data:{
                        	id:keywords,
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
            	GetActiveListModal : function(keywords,page){
            		page.offset = page.pageIndex;
               	    page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.GetActiveListModal;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {},
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
            	DeleteclassEvaluationModal : function(keywords){
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.DeleteclassEvaluationModal;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: keywords,
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
            	InsertclassEvaluationModal : function(keywords){
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.InsertclassEvaluationModal;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {},
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
            	UpdateclassEvaluationModal : function(keywords){
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.UpdateclassEvaluationModal;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        	keywords:keywords
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
            	DeleteListenModal : function(keywords){
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.DeleteListenModal;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{id:keywords},
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
            	UpdatelistenModal : function(keywords){
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.UpdatelistenModal;
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
                GetlistenModal : function(keywords,page){
                	page.offset = page.pageIndex;
               	    page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.GetlistenModal;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:{lectureName:keywords},
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
                InsertlistenModal : function(keywords){
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.InsertlistenModal;
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
                GetclassEvaluationModal : function(keywords,page){
                	page.offset = page.pageIndex;
               	    page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    var _url = TeacherServiceConfig.urls.GetclassEvaluationModal;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            keywords:{name:keywords},
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
                }
                
            };
        }]);

});