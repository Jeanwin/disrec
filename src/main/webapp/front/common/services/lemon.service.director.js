/**
 * Created by Administrator on 14-3-20.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 导播台管理
     ------------------------------------------*/
    angular.module('lemon.service.director', [])
        .constant('DirectorServiceConfig', {
            files:{
                searchDirector:  'data/director/director.list.json',
                getCurrentDirector:  'data/director/director.getCurrentDirector.json',
                getCurrentDirectorPromise:  'data/director/director.getCurrentDirectorPromise.json',
                setIsTimeout:  'data/director/director.setIsTimeout.json'
                }
            ,
            urls:{
              //searchDirector: config.backend.ip + config.backend.base + 'xolContBill/parepareImportComShare.do'
                searchDirector: config.backend.ip + config.backend.base + 'director/list',
                getCurrentDirector: config.backend.ip + '/deviceService/perConsole?mac=', //得到当前导播员状态，姓名
                getCurrentDirectorPromise: config.backend.ip + '/deviceService/loop?reqUserName=', //轮询当前导播员结果
                setIsTimeout: config.backend.ip + '/deviceService/control?mac=', //将超时信息传入后台
                }
        })
        .factory('DirectorService',['$http', '$q', 'DirectorServiceConfig', function ($http, $q, DirectorServiceConfig) {
            return {


                //导播台 列表 查询
                searchDirector : function(keywords,treeid, pagination, user){
                    console.log(keywords);
                    console.log(treeid);
                    console.log(pagination);
                    console.log('进入查询列表以后传的值');
                    var deffered = $q.defer();
                    pagination.offset = pagination.pageIndex;
                    pagination.limit = pagination.pageSize*1;
                    var _url = config.data.method==='files'?DirectorServiceConfig.files.searchDirector: DirectorServiceConfig.urls.searchDirector;
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

                /**
                 * 得到当前导播员
                 * @param user
                 * @returns {promise|exports.promise|Q.promise}
                 */
                getCurrentDirector: function (user) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var urlValue = DirectorServiceConfig.urls.getCurrentDirector + user.mac + "&reqUserName=" + user.loginname;
                    var _url = DirectorServiceConfig.files.getCurrentDirector
					//config.data.method==='files'? DirectorServiceConfig.files.getCurrentDirector : urlValue;
                    $http({
                        method:config.data.method==='files'? 'GET':'GET',
                        url: urlValue,
                        //  url: contractServiceConfig[config.data.method].transferContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{},
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
                 * 接口轮询（得到导播台页面当前导播员是否同意被抢占）
                 * @returns {promise|exports.promise|Q.promise}
                 */
                getCurrentDirectorPromise: function (reqUserName, mac) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var urlValue = DirectorServiceConfig.urls.getCurrentDirectorPromise + reqUserName + "&mac=" + mac;
                    var _url = DirectorServiceConfig.files.getCurrentDirectorPromise//config.data.method==='files'? DirectorServiceConfig.files.getCurrentDirectorPromise : urlValue;
                    $http({
                        method:config.data.method==='files'? 'GET':'GET',
                        url: urlValue,
                        //  url: contractServiceConfig[config.data.method].transferContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
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
                 * 超时关闭弹出框
                 * @returns {promise|exports.promise|Q.promise}
                 */
                setIsTimeout: function (mac) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var urlValue = DirectorServiceConfig.urls.setIsTimeout + mac;
                    var _url = config.data.method==='files'? DirectorServiceConfig.files.setIsTimeout : urlValue;
                    $http({
                        method:config.data.method==='files'? 'GET':'GET',
                        url: _url,
                        //  url: contractServiceConfig[config.data.method].transferContracts,
                        headers: {
                            //PICC__RequestVerificationToken: user.verificationToken
                        },
                        data:{
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