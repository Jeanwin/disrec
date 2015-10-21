define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 导播台管理
     ------------------------------------------*/
    angular.module('lemon.service.directorMain', [])
        .constant('DirectorMainServiceConfig', {
            files:{
                searchDirectorMain:  'data/directorMain.list.json',
                changeWindows:'data/directorMain.list.json',
                perset:'data/directorMain.list.json',
                rtspPreview:'data/rtspPreview.data.json',
                setBackendPromise:  'data/director.setBackendPromise.json',
                setIsTimeout:  'data/director.setIsTimeout.json',
                recordingStatus:  'data/director.recordingStatus.json',
                livingStatus:  'data/director.livingStatus.json',
                getDirectorHeaderData:  'data/director.getDirectorHeaderData.json',
                refreshDirectorHeaderData:  'data/director.getDirectorHeaderData.json',
                updateLastTime:  'data/director.updateLastTime.json',
                getServerTime:  'data/director.getServerTime.json'
            },
            urls:{
                searchDirectorMain: config.backend.ip + config.backend.base2 + 'consoleTitile',
                changeWindows:config.backend.ip + config.backend.base2 +'changeWindows',
                perset:config.backend.ip + config.backend.base2 +'perset',
                rtspPreview:config.backend.ip + config.backend.base2 +'rtspPreview',
				newrtspState:config.backend.ip + config.backend.base2 +'queryAllRecordMode?mac=',
				newrtspPreview:config.backend.ip + config.backend.base2 +'getRtspUrlFromZddm?mac=',
				
                picInPic:config.backend.ip + config.backend.base2 +'picInPic',
                ChangeOrClose:config.backend.ip + config.backend.base2 +'picInPic',
                getvideotape:config.backend.ip + config.backend.base2 +'stauts',

                setBackendPromise:  config.backend.ip + config.backend.base2 +'confome?mac=',
                setIsTimeout:  config.backend.ip + config.backend.base2 +'stauts',
                recordingStatus:  config.backend.ip + config.backend.base2 +'recordingStauts',
                livingStatus:  config.backend.ip + config.backend.base2 +'livingStauts',
                getDirectorHeaderData:  config.backend.ip + config.backend.base +'rest/curriculum/findSimpleClassByTimeTwo',
                refreshDirectorHeaderData:  config.backend.ip + config.backend.base +'rest/curriculum/findSimpleClassByTimeTwo',
                updateLastTime:config.backend.ip + config.backend.base2 +'setDeviceTime',
                getServerTime:config.backend.ip + config.backend.base +'rest/curriculum/getSystime',
                permission: config.backend.ip + config.backend.base + '/getUser',
				sendCentralControlCmd:config.backend.ip + config.backend.base2 +'sendCmdToCentralControl?cmd=',
				getCentralControlState:config.backend.ip + config.backend.base2 +'sendCmdToCentralControl?cmd=GetAllState',
                manualVideoAdd:config.backend.ip + config.backend.base +'manualVideo/create',
                consoleHadleRecordStatus: config.backend.ip + config.backend.base2+'sendCmdtoRecord?cmd=',
                teacherList:config.backend.ip + config.backend.base +'/card/teacherList',
                syscode:config.backend.ip + config.backend.base +'/syscode/code',
                updateHandleOverTime:config.backend.ip + config.backend.base +'manualVideo/updateEndTime?id=',
                deleteManualVideo:config.backend.ip + config.backend.base +'manualVideo/delete'
            }
        })
        /*'DirectorMainService'这是调用的服务名字*/
        .factory('DirectorMainService',['$http', '$q', 'DirectorMainServiceConfig', function ($http, $q, DirectorMainServiceConfig) {
            return {
                //手动添加录像
                manualVideoAdd:function(keywords){
                    var deffered=$q.defer();
                    var _url =DirectorMainServiceConfig.urls.manualVideoAdd;
//                    var _url=DirectorMainServiceConfig.urls.recordingStatus;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        data:keywords,
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                }, 
                //手动控制录像状态
                consoleHadleRecordStatus:function(cmd,mac){
                    var deffered=$q.defer();
                    var _url =DirectorMainServiceConfig.urls.consoleHadleRecordStatus+cmd+'&mac='+mac;
                    $http({
                        method:config.data.method==='files'? 'GET':'GET',
                        dataType:"jsonp",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },    
                //教师列表
                teacherList:function(keywords){
                    var deffered=$q.defer();
                    var _url =DirectorMainServiceConfig.urls.teacherList;
//                    var _url=DirectorMainServiceConfig.urls.recordingStatus;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        data:keywords,
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                //系统模式
                syscode:function(keywords){
                    var deffered=$q.defer();
                    var _url =DirectorMainServiceConfig.urls.syscode;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        data:{"value":"livemodel"},
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                updateHandleOverTime:function(id,mac){
                    var deffered=$q.defer();
                    var _url =DirectorMainServiceConfig.urls.updateHandleOverTime+id+'&mac='+mac;
                    $http({
                        method:'GET',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        cache:false,
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                deleteManualVideo:function(keywords){
                    var deffered=$q.defer();
                    var _url =DirectorMainServiceConfig.urls.deleteManualVideo;
//                    var _url=DirectorMainServiceConfig.urls.recordingStatus;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        data:keywords,
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
            	/**
                 * 获取服务器时间
                 */
                getServerTime:function(){
                    var deffered=$q.defer();
                    var _url = config.data.method==='files'?DirectorMainServiceConfig.files.getServerTime: DirectorMainServiceConfig.urls.getServerTime;
//                    var _url=DirectorMainServiceConfig.urls.recordingStatus;
                    $http({
                        method:config.data.method==='files'? 'GET':'GET',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },

                /**
                 * 获取简版导播台表头数据
                 */
                updateLastTime :function(classbatch,endtime,mac){
                    var deffered=$q.defer();
                    var _url = config.data.method==='files'?DirectorMainServiceConfig.files.updateLastTime: DirectorMainServiceConfig.urls.updateLastTime + "?id=" + classbatch + '&endtime=' + endtime + "&mac=" + mac;
//                    var _url=DirectorMainServiceConfig.urls.recordingStatus;
                    $http({
                        method:config.data.method==='files'? 'GET':'GET',
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
            	
            	/**
            	 * 获取简版导播台表头数据
            	 */
            	getDirectorHeaderData :function(classId){
                    var deffered=$q.defer();
                    var _url = config.data.method==='files'?DirectorMainServiceConfig.files.getDirectorHeaderData: DirectorMainServiceConfig.urls.getDirectorHeaderData;
//                    var _url=DirectorMainServiceConfig.urls.recordingStatus;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        data:{
                        	treeid:classId
                        },
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },
                
                /**
            	 * 刷新获取简版导播台表头数据
            	 */
            	refreshDirectorHeaderData :function(classId){
                    var deffered=$q.defer();
                    var _url = config.data.method==='files'?DirectorMainServiceConfig.files.refreshDirectorHeaderData: DirectorMainServiceConfig.urls.refreshDirectorHeaderData;
//                    var _url=DirectorMainServiceConfig.urls.recordingStatus;
                    $http({
                        method:config.data.method==='files'? 'GET':'POST',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        data:{
                        	treeid:classId
                        },
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                            deffered.reject(code);
                        });
                    return deffered.promise;
                },

            	/**
                 * 初始化得到录像的状态
                 */
                getvideotape:function(mac){
                    var deffered=$q.defer();
                    var _url=DirectorMainServiceConfig.urls.getvideotape + "?mac=" + mac;
                    $http({
                        method: 'get',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                        	var errorData = new Array();
                        	errorData[0] = code;
                        	errorData[1] = status;
                            deffered.reject(errorData);
                        });
                    return deffered.promise;
                },

                /**
                 * 记录直播状态方法
                 */
                livingStatus:function(mac){
                    var deffered=$q.defer();
                    var _url = config.data.method==='files'?DirectorMainServiceConfig.files.livingStatus: DirectorMainServiceConfig.urls.livingStatus+"?mac=" + mac;
//                    var _url=DirectorMainServiceConfig.urls.livingStatus;
                    $http({
                        method: 'get',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        headers:{
                        }
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code,status){
                        	var errorData = new Array();
                    		errorData[0] = code;
                    		errorData[1] = status;
                    		deffered.reject(errorData);
                        });
                    return deffered.promise;
                },
                
              //权限
                permission: function(keywords){
                    console.log(keywords);
                    console.log("permission服务中的传值");
                    var deffered = $q.defer();
                    var _url = DirectorMainServiceConfig.urls.permission;
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
                 * 得到后台结果
                 * @returns {promise|exports.promise|Q.promise}
                 */
                setBackendPromise: function (userInformation) {
                    //contAttr = this.exchangeAttr(contAttr);
                    var deffered = $q.defer();

                    var urlValue = DirectorMainServiceConfig.urls.setBackendPromise + userInformation.mac + "&para=" + userInformation.para;
                    var _url = config.data.method==='files'? DirectorMainServiceConfig.files.setBackendPromise : urlValue;
                    $http({
                        method:config.data.method==='files'? 'GET':'GET',
                        url: _url,
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
                 * 初始化 视屏预览
                 * @param para
                 * @returns {promise|exports.promise|Q.promise}
                 * @constructor
                 */
                initrtspPreview:function(mac){
                    var deffered=$q.defer();
                    var _url = config.data.method==='files'?DirectorMainServiceConfig.files.rtspPreview: DirectorMainServiceConfig.urls.rtspPreview + "?mac=" +mac;
                    $http({
                        method: config.data.method==='files'? 'GET':'GET',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        headers:{
                        },
                        data:{
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code){
                            deffered.reject(code);
                        });

                    return deffered.promise;
                },
				
				initNewRtspPreview:function(mac,deviceType){
                    var deffered=$q.defer();
                    var _url = DirectorMainServiceConfig.urls.newrtspPreview + mac + '&deviceType=' + deviceType;
                    $http({
                        method: 'GET',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        headers:{
                        },
                        data:{
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code){
                            deffered.reject(code);
                        });

                    return deffered.promise;
                },
				
				initNewRtspState:function(mac,deviceType){
                    var deffered=$q.defer();
                    var _url = DirectorMainServiceConfig.urls.newrtspState + mac + '&deviceType=' + deviceType;
                    $http({
                        method: 'GET',
                        dataType:"json",
                        contentType:"application/json:charset=UTF-8",
                        url: _url,
                        headers:{
                        },
                        data:{
                        },
                        timeout:config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
                        })
                        .error(function(code){
                            deffered.reject(code);
                        });

                    return deffered.promise;
                },
                
                //初始化得到摄像头的信息
                searchDirectorMain : function(mac){
                    var deffered = $q.defer();
                    var _url = config.data.method==='files'?DirectorMainServiceConfig.files.searchDirectorMain: DirectorMainServiceConfig.urls.searchDirectorMain  + "?mac=" + mac;
                    $http({
                        method: config.data.method==='files'? 'GET':'GET',
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
                        .error(function(code, status){
                        	var errorData = new Array();
                    		errorData[0] = code;
                    		errorData[1] = status;
                    		deffered.reject(errorData);
                        });
                    return deffered.promise;
                },
				
				/**
				* 中控操作指令
				*	@param cmd OpenCSN...
				*   @param ip  CentralControl IP
				*/
				sendCentralControlCmd : function(cmd,mac){
					var deffered = $q.defer();
                    var _url = DirectorMainServiceConfig.urls.sendCentralControlCmd  + cmd +'&mac=' + mac;
                    $http({
                        method: config.data.method==='files'? 'GET':'GET',
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
                        .error(function(code){
                    		deffered.reject(code);
                        });
                    return deffered.promise;	
				},
				/**
				*中控状态
				*
				*/
				getAllCCState:function(mac){
					
					var deffered = $q.defer();
                    var _url = DirectorMainServiceConfig.urls.getCentralControlState +'&mac=' + mac;
                    $http({
                        method: config.data.method==='files'? 'GET':'GET',
                        dataType: "text",
                        contentType:'application/json; charset=UTF-8',
                        url: _url,
                        headers: {
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
							if(data!='null'){
								str = data.info;
								str = str.replace(/\r\n/g,'');
								str = str.replace(/CsnCmd=CsnUpdateState:/g,'');
								var stateObj ={}
								var s =str.split('//')
								if(s.length==1){deffered.reject(null);console.log(str);return;}
								for(var i=0;i<s.length;i++){
									s[i] = s[i].replace(/=/g,'&')
									s[i] = s[i].split('&')
									if(stateObj[s[i][0]]){
										stateObj[s[i][0]].stateMax = Math.max(stateObj[s[i][0]].stateMax,parseInt(s[i][2]));		
									}else{
										stateObj[s[i][0]]={"state":s[i][3],"disc":s[i][4],"name":s[i][1],"stateMax":parseInt(s[i][2])}
									}
								}
//								return stateObj;
								deffered.resolve(stateObj);
							}
							deffered.reject(null);
                        })
                        .error(function(code){
                    		deffered.reject(code);
                        });
                    return deffered.promise;
				}
            };
        }]);

});