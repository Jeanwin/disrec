/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 分出业务非比例管理
     ------------------------------------------*/
    angular.module('lemon.service.tactics', [])
        .constant('TacticsServiceConfig', {
            files:{
                tacticsAppliedTree:  'data/schedule/schedule.classtime.list.json',
                code:  'data/classroom/classrooms.tactics.json',
                SaveVideoSchem:  'data/classroom/classrooms.tactics.json',
                SaveRtspSchem:  'data/classroom/classrooms.tactics.json',
                SaveRtmpSchem:  'data/classroom/classrooms.tactics.json',
                VideoAreaIds:  'data/classroom/classrooms.selectvideoschem.json',
                RtspAreaIds:  'data/classroom/classrooms.selectvideoschem.json',
                RtmpAreaIds:  'data/classroom/classrooms.selectvideoschem.json',
                selectedAreaIds:  'data/classroom/classrooms.selectvideoschem.json',
                VideoScheamChange:  'data/classroom/classrooms.videoScheam.json',
                rtspschemaApply:  'data/classroom/classrooms.videoScheam.json',
                rtmpschemaApply:  'data/classroom/classrooms.videoScheam.json',
                RTSPScheamChange:  'data/classroom/classrooms.videoScheam.json',
                RTMPScheamChange:  'data/classroom/classrooms.videoScheam.json'

            },
            urls:{
            	tactics: config.backend.ip + config.backend.base + 'tactics/tactics',
                VideoAreaIds: config.backend.ip + config.backend.base + 'tactics/videosAreaIds',
                RtspAreaIds: config.backend.ip + config.backend.base + 'tactics/rtspAreaIds',
                RtmpAreaIds: config.backend.ip + config.backend.base + 'tactics/rtmpAreaIds',
                selectedAreaIds: config.backend.ip + config.backend.base + 'tactics/selectedAreaIds',
            	save: config.backend.ip + config.backend.base + 'tactics/update',
                SaveVideoSchem: config.backend.ip + config.backend.base + 'tactics/updateVideoParams',
                SaveRtspSchem: config.backend.ip + config.backend.base + 'tactics/updateRtspParams',
                SaveRtmpSchem: config.backend.ip + config.backend.base + 'tactics/updateRtmpParams',
            	classScheam: config.backend.ip + config.backend.base + 'syscode/classScheam',
            	deviceCode: config.backend.ip + config.backend.base + 'syscode/deviceCode',
            	code: config.backend.ip + config.backend.base + 'syscode/code',
                RTSPScheamChange: config.backend.ip + config.backend.base + 'tactics/getRtspParams',
                RTMPScheamChange: config.backend.ip + config.backend.base + 'tactics/getRtmpParams',
                VideoScheamChange: config.backend.ip + config.backend.base + 'tactics/getVideoParams',
                rtspschemaApply: config.backend.ip + config.backend.base + 'tactics/applyRtspParams',
                rtmpschemaApply: config.backend.ip + config.backend.base + 'tactics/applyRtmpParams',
            	videoInfo: config.backend.ip + config.backend.base + 'tactics/videoInfo',
            	updateScheam: config.backend.ip + config.backend.base + 'tactics/updateVideo',//保存录播方案
                videoschemaApply: config.backend.ip + config.backend.base + 'tactics/applyVideoParams',//保存录像方案
            	videoApply: config.backend.ip + config.backend.base + 'tactics/videoApply',
            	lightSetList: config.backend.ip + config.backend.base + 'lightSet/lights',
            	UpdatelightSet: config.backend.ip + config.backend.base + 'lightSet/update',
            	CreatelightSet: config.backend.ip + config.backend.base + 'lightSet/create',
            	GetAlarmConfig: config.backend.ip + config.backend.base + 'syscode/code',
            	GetAlarmList: config.backend.ip + config.backend.base + 'deviceAlarm/deviceAlarmList',
                GetAlarmList2: config.backend.ip + config.backend.base + 'deviceAlarm/findDeviceAlarmListWithCode',
            	SaveAlarmList: config.backend.ip + config.backend.base + 'deviceAlarm/saveAlarm',
            	CheckOutPut: config.backend.ip + config.backend.base + 'deviceAlarm/checkDeviceAlarmUnique'
            	
            }
        })
        .factory('TacticsService',['$http', '$q', 'TacticsServiceConfig', function ($http, $q, TacticsServiceConfig) {
            return {
            	CheckOutPut : function(keywords,alarmList){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.CheckOutPut;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: keywords,
                        data:{
                        	keywords:keywords,
                        	list:alarmList
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
            	//保存
            	SaveAlarmList : function(alarmList,keywords){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.SaveAlarmList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        data:{
                        	list:alarmList,
                        	areas:keywords
                        },
                        url: _url,
                        headers: {
                        },
                        timeout: config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
            	//修改灯泡设置
            	GetAlarmList : function(keywords){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.GetAlarmList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        data:{
                        	areaId:keywords
                        },
                        url: _url,
                        headers: {
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
                getAlarmList2 : function(keywords){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.GetAlarmList2;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        data:{
                            areaId:keywords
                        },
                        url: _url,
                        headers: {
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
            	//修改灯泡设置
            	GetAlarmConfig : function(){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.GetAlarmConfig;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        data:{
                        	value:"deviceAlarmConfig"
                        },
                        url: _url,
                        headers: {
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
            	//修改灯泡设置
            	CreatelightSet : function(keywords){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.CreatelightSet;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        data:keywords,
                        url: _url,
                        headers: {
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
            	//修改灯泡设置
            	UpdatelightSet : function(keywords){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.UpdatelightSet;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        data:keywords,
                        url: _url,
                        headers: {
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
            	//灯泡设置
            	lightSetList : function(keywords,page){
            		page.offset = page.pageIndex;
               	    page.limit = page.pageSize *1;
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.lightSetList;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        data:{
                        	page:page,
                        	keywords:{'areaName':keywords}
                        	},
                        url: _url,
                        headers: {
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
                
                tactics : function(){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.tactics;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
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
                save : function(upload,strategy,schedule,warm){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.save;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        data:{
                        	upload:upload,
                        	strategy:strategy,
                        	schedule:schedule,
                        	warm:warm
                        },
                        url: _url,
                        headers: {
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
                //录播方案的保存操作
                SaveVideoSchem : function(keywords){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.SaveVideoSchem;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        data:keywords,
                        url: _url,
                        headers: {
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
                //Rtsp方案的保存操作
                SaveRtspSchem : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.SaveRtspSchem;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        data:keywords,
                        url: _url,
                        headers: {
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
                //Rtmp方案的保存操作
                SaveRtmpSchem : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.SaveRtmpSchem;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        data:keywords,
                        url: _url,
                        headers: {
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
                //教室方案
                classScheam : function(){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.classScheam;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
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
                //跟踪机编号
                deviceCode : function(){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.deviceCode;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
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
                //录播方案初始化
                code : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TacticsServiceConfig.files.code: TacticsServiceConfig.urls.code;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            value:keywords
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
                //改变录播方案列表变化
                VideoScheamChange : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TacticsServiceConfig.files.VideoScheamChange: TacticsServiceConfig.urls.VideoScheamChange;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            value:keywords
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
                //改变RTSP方案列表变化
                RTSPScheamChange : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TacticsServiceConfig.files.RTSPScheamChange: TacticsServiceConfig.urls.RTSPScheamChange;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            value:keywords
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
                //改变RTMP方案列表变化
                RTMPScheamChange : function(keywords){
                    console.log(keywords);
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TacticsServiceConfig.files.RTMPScheamChange: TacticsServiceConfig.urls.RTMPScheamChange;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                            value:keywords
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
              //视频源
                videoInfo : function(keyword){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.videoInfo;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        data:{
                        	value:keyword
                        },
                        headers: {
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
                //保存录播方案
                updateScheam : function(scheam,data){
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.updateScheam;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        data:{
                        	scheam:scheam,
                        	videos:data
                        },
                        headers: {
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
                //保存录像方案
                videoApply : function(scheam,data){
                    console.log(scheam,data);
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.videoApply;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        data:{
                        	scheam:scheam,
                            areaids:data
                        },
                        headers: {
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
                //保存应用到录像方案
                videoschemaApply : function(scheam,data){
                    console.log(scheam,data);
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.videoschemaApply;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        data:{
                        	scheam:scheam,
                            areaids:data
                        },
                        headers: {
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
                //保存应用到RTSP方案
                rtspschemaApply : function(scheam,data){
                    console.log(scheam,data);
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.rtspschemaApply;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        data:{
                        	scheam:scheam,
                            areaids:data
                        },
                        headers: {
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
                //保存应用到RTMP方案
                rtmpschemaApply : function(scheam,data){
                    console.log(scheam,data);
                    var deffered = $q.defer();
                    var _url = TacticsServiceConfig.urls.rtmpschemaApply;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        data:{
                        	scheam:scheam,
                            areaids:data
                        },
                        headers: {
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
                //录播应用到树节点的初始值
                selectedAreaIds : function(keyword){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TacticsServiceConfig.files.selectedAreaIds: TacticsServiceConfig.urls.selectedAreaIds;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	value:keyword
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
                //录像应用到树节点的初始值
                VideoAreaIds : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TacticsServiceConfig.files.VideoAreaIds: TacticsServiceConfig.urls.VideoAreaIds;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	value:keywords
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
                //RTSP应用到树节点的初始值
                RtspAreaIds : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TacticsServiceConfig.files.RtspAreaIds: TacticsServiceConfig.urls.RtspAreaIds;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	value:keywords
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
                //RTMP应用到树节点的初始值
                RtmpAreaIds : function(keywords){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?TacticsServiceConfig.files.RtmpAreaIds: TacticsServiceConfig.urls.RtmpAreaIds;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	value:keywords
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