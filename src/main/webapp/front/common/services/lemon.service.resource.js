/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 分出业务非比例管理
     ------------------------------------------*/
    angular.module('lemon.service.resource', [])
        .constant('ResourceServiceConfig', {
            files:{
                resourceImage:       'data/resource/findImageResource_list.json',
                resourceReleaseds:   'data/resource/findIssuedResource_list.json',
                resourceUpload:      'data/resource/findResourceUpload_list.json',
                resourceVideo:       'data/resource/findVideoResource_list.json',
                myresourceVideo:       'data/resource/findVideoResource_list.json',
                deleteUpload:        'data/resource/deleteResourceupLoad_request.json',
                deleteVideos:        'data/resource/deleteVideoResource_request.json',
                deleteImages:        'data/resource/deleteImageResource_request.json',
                deleteReleaseds:     'data/resource/deleteIssuedResource_request.json',
                stateVideos:        'data/resource/setupStateResource_request.json',
                updateVideos:        'data/resource/setupVideoResource_request.json',
                updateImage:         'data/resource/setupImageResource_request.json',
                updateReleased:      'data/resource/setupIssuedResource_request.json',
                CancelReleaseds:      'data/resource/setupIssuedResource_request.json',
                videoRelease:      'data/resource/setupIssuedResource_request.json',
                CancelVideoRelease:      'data/resource/setupIssuedResource_request.json',
                resourceupmid:      'data/resource/setupIssuedResource_request.json'
                }
            ,
            urls:{
            	batchUpload: config.backend.ip + config.backend.base + 'rest/resource/batchResourceupLoad',
                deleteUpload: config.backend.ip + config.backend.base + 'rest/resource/deleteResourceupLoad',
                deleteVideos: config.backend.ip + config.backend.base + 'rest/resource/deleteVideoResource',
                deleteImages: config.backend.ip + config.backend.base + 'rest/resource/deleteImageResource',
                deleteReleaseds: config.backend.ip + config.backend.base + 'rest/resource/deleteIssuedResource',
                resourceImage: config.backend.ip + config.backend.base + 'rest/resource/findImageResource',
                resourceReleaseds: config.backend.ip + config.backend.base + 'rest/resource/findIssuedResource ',
                resourceUpload: config.backend.ip + config.backend.base + 'rest/resource/findResourceUpload',
                resourceVideo: config.backend.ip + config.backend.base + 'rest/resource/findVideoResource',
                myresourceVideo: config.backend.ip + config.backend.base + 'rest/resource/findMyVideoResource',
                stateVideos:config.backend.ip + config.backend.base + 'rest/resource/setupStateResource',
                updateVideos: config.backend.ip + config.backend.base + 'rest/resource/setupVideoResource',
                updateImage: config.backend.ip + config.backend.base + 'rest/resource/setupImageResource',
                updateReleased: config.backend.ip + config.backend.base + 'rest/resource/setupIssuedResource',
                CancelReleaseds: config.backend.ip + config.backend.base + 'rest/resource/cancelIssuedResource',
                videoRelease: config.backend.ip + config.backend.base + 'rest/resource/issuedVideoResource',
                clearResource: config.backend.ip + config.backend.base + 'rest/resource/clearResource',
                CancelVideoRelease: config.backend.ip + config.backend.base + 'rest/resource/cancelissuedVideoResource',
                resourceupmid: config.backend.ip + config.backend.base + 'rest/resource/findResourceupmid',
                demand: config.backend.ip + config.backend.base + 'rest/resource/onDemand'
                }
        })
        .factory('ResourceService',['$http', '$q', 'ResourceServiceConfig', function ($http, $q, ResourceServiceConfig) {
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
                 //图片资源
                resourceImage : function(keywords,pagination, user){
                    console.log("resourceImage里的keywords",keywords);
                    console.log("进入resourceimage服务以后，输出传入的值");
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize*1;
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.resourceImage: ResourceServiceConfig.urls.resourceImage;
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
                /**
                 * 批量上传
                 * @param facilityNo   主键
                 * @param user
                 * @returns {Function|promise|promise|promise}
                 */
                    /*执行删除操作的时候调用数据库连接*/
                batchUpload: function (facilityNo, user) {
                    console.log("进入batchUpload服务中，并且输出传入的值");
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        /*ResourceServiceConfig是对比的顶部的静态变量*/
                        /*config.data.method在config.js中取得的值*/
                        /*.deleteUpload执行这个接口里边的json*/
                        url: config.data.method==='files'?ResourceServiceConfig.files.batchUpload: ResourceServiceConfig.urls.batchUpload,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        /*给后台传的值*/
                        data:facilityNo,
                        /*timeout延迟*/
                        /*在config.js中得到backend中的timeout中的值,做延迟属性*/
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
                    /*执行删除操作的时候调用数据库连接*/
                deleteUpload: function (facilityNo, user) {
                    console.log("deleteUpload里的facilityNo",facilityNo);
                    console.log("deleteUpload里的user",user);
                    console.log("进入delete,upload服务中，并且输出传入的值");
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        /*ResourceServiceConfig是对比的顶部的静态变量*/
                        /*config.data.method在config.js中取得的值*/
                        /*.deleteUpload执行这个接口里边的json*/
                        url: config.data.method==='files'?ResourceServiceConfig.files.deleteUpload: ResourceServiceConfig.urls.deleteUpload,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        /*给后台传的值*/
                        data:facilityNo,
                        /*timeout延迟*/
                        /*在config.js中得到backend中的timeout中的值,做延迟属性*/
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

                 //删除视频连接后台------------
                deleteVideos: function (VideoNo, user) {
                    console.log("deleteVideos里service的VideoNo",VideoNo);
                    console.log("deleteVideos里service的user",user);
                    console.log("进入deleteVideos服务以后输出传值的内容118");
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        /*ResourceServiceConfig是对比的顶部的静态变量*/
                        /*config.data.method在config.js中取得的值*/
                        /*.deleteUpload执行这个接口里边的json*/
                        url: config.data.method==='files'?ResourceServiceConfig.files.deleteVideos: ResourceServiceConfig.urls.deleteVideos,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        /*给后台传的值*/
                        data:VideoNo,
                        /*timeout延迟*/
                        /*在config.js中得到backend中的timeout中的值,做延迟属性*/
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
                //删除资源里边的照片连接后台
                deleteImages: function (ImageNO, user) {
                    console.log("deleteimages里的user",user);
                    console.log("进入delete,iamges服务以后，输出传入的值147");
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        /*ResourceServiceConfig是对比的顶部的静态变量*/
                        /*config.data.method在config.js中取得的值*/
                        /*.deleteUpload执行这个接口里边的json*/
                        url: config.data.method==='files'?ResourceServiceConfig.files.deleteImages: ResourceServiceConfig.urls.deleteImages,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        /*给后台传的值*/
                        data:ImageNO,
                        /*timeout延迟*/
                        /*在config.js中得到backend中的timeout中的值,做延迟属性*/
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
                //取消发布状态的后台
                CancelReleaseds:function (ReleasedNO, user) {
                    console.log(ReleasedNO);
                    console.log("进入CancelReleaseds服务以后传的值");
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        /*ResourceServiceConfig是对比的顶部的静态变量*/
                        /*config.data.method在config.js中取得的值*/
                        /*.deleteUpload执行这个接口里边的json*/
                        url: config.data.method==='files'?ResourceServiceConfig.files.CancelReleaseds: ResourceServiceConfig.urls.CancelReleaseds,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        /*给后台传的值*/
                        data:ReleasedNO,
                        /*timeout延迟*/
                        /*在config.js中得到backend中的timeout中的值,做延迟属性*/
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

                //deleteReleaseds
                /*删除已发布内容的后台*/
                deleteReleaseds: function (ReleasedNO, user) {
                    console.log(ReleasedNO);
                    var deffered = $q.defer();
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        /*ResourceServiceConfig是对比的顶部的静态变量*/
                        /*config.data.method在config.js中取得的值*/
                        /*.deleteUpload执行这个接口里边的json*/
                        url: config.data.method==='files'?ResourceServiceConfig.files.deleteReleaseds: ResourceServiceConfig.urls.deleteReleaseds,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        /*给后台传的值*/
                        data:ReleasedNO,
                        /*timeout延迟*/
                        /*在config.js中得到backend中的timeout中的值,做延迟属性*/
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
                //视频资源点播状态
                stateVideos: function(state){
                    console.log(state);
                    console.log("点播状态的传值");
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.stateVideos: ResourceServiceConfig.urls.stateVideos;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:state,
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
                //视频资源设置的的保存操作
                updateVideos: function(video){
                    console.log(video);
                    console.log("updateVideos服务中的传值");
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.updateVideos: ResourceServiceConfig.urls.updateVideos;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:video,
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
                //图片资源设置的的保存操作
                updateImage: function(Image){
                    console.log(Image);
                    console.log("updateImage服务中的传值");
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.updateImage: ResourceServiceConfig.urls.updateImage;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:Image,
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
                //已发布资源设置的的保存操作
                updateReleased: function(Released){
                    console.log(Released);
                    console.log("updateReleased服务中的传值");
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.updateReleased: ResourceServiceConfig.urls.updateReleased;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:Released,
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
                //图片资源
                resourceImage : function(keywords,pagination, user){
                    console.log("resourceImage里的keywords",keywords);
                    console.log("进入resourceimage服务以后，输出传入的值");
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize*1;
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.resourceImage: ResourceServiceConfig.urls.resourceImage;
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


                //已发布资源
                resourceReleaseds : function(keywords, pagination,user){
                    console.log("resourceReleaseds里service的",keywords);
                    console.log("resourceReleaseds里service的",pagination);
                    console.log('进入resourceReleaseds服务以后传的值');
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.resourceReleaseds: ResourceServiceConfig.urls.resourceReleaseds;
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
                //资源上传批量删除后列表显示
                resourceupmid : function(keywords,areaid,pagination,user){
                    console.log(keywords);
                    console.log(areaid);
                    console.log(pagination);
                    console.log(user);
                    console.log("进入resourceupmid服务然后输出传的参数");
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize*1;
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.resourceupmid: ResourceServiceConfig.urls.resourceupmid;
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

                //资源上传列表显示
                resourceUpload : function(keywords,areaid,pagination, user){
                    console.log(keywords);
                    console.log(pagination);
                    console.log(user);
                    console.log("进入resourceUpload服务然后输出传的参数");
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize*1;
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.resourceUpload: ResourceServiceConfig.urls.resourceUpload;
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
//                            "id":keywords.id,
//                            "name":keywords.name,
//                            "innerid":"4",
//                            "attribute":"4",
//                            "deptid":"4",
//                            "state":"4",
//                            "sort":""
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
                //我的视频资源
                myresourceVideo : function(keywords, pagination, user){
                    console.log("resourceVideo里service的keywords",keywords);
                    console.log("resourceVideo里service的pagination",pagination);
                    console.log("resourceVideo里service的user",user);
                    console.log("计入resourceVideo服务以后输出传入的值269");
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.myresourceVideo: ResourceServiceConfig.urls.myresourceVideo;
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
                //视频资源
                resourceVideo : function(keywords, pagination, user){
                    console.log("resourceVideo里service的keywords",keywords);
                    console.log("resourceVideo里service的pagination",pagination);
                    console.log("resourceVideo里service的user",user);
                    console.log("计入resourceVideo服务以后输出传入的值269");
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize *1;
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.resourceVideo: ResourceServiceConfig.urls.resourceVideo;
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
              //视频资源，发布
                clearResource: function(keywords){
                    console.log("resourceVideo里service的keywords",keywords);
                    console.log("进入videoRelease服务以后输出传入的值");
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.clearResource: ResourceServiceConfig.urls.clearResource;
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
                //视频资源，发布
                videoRelease: function(keywords){
                    console.log("resourceVideo里service的keywords",keywords);
                    console.log("进入videoRelease服务以后输出传入的值");
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?ResourceServiceConfig.files.videoRelease: ResourceServiceConfig.urls.videoRelease;
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
                //视频资源，发布
                demand: function(floder,status){
                    var deffered = $q.defer();
                    var _url = ResourceServiceConfig.urls.demand;
                    $http({
                        method: config.data.method==='files'? 'GET':'POST',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        data:{
                        	floder:floder,
                        	status:status
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
                //视频资源，发布
                CancelVideoRelease:function(keywords){
                console.log("resourceVideo里service的keywords",keywords);
                console.log("进入videoRelease服务以后输出传入的值");
                var deffered = $q.defer();
                var _url = config.data.method==='files'?ResourceServiceConfig.files.CancelVideoRelease: ResourceServiceConfig.urls.CancelVideoRelease;
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