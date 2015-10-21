/**
 * Created by Wanghan on 20150708.
 */
define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     * 分出业务非比例管理
     ------------------------------------------*/
    angular.module('lemon.service.websocketLog', [])
        .constant('WebsocketLogServiceConfig', {
            urls:{
				//报警
				//获取报警详细信息
            	GetDeviceAlarm: config.backend.ip + config.backend.base + 'centerController/getDeviceAlarm',
				GetDutyPerson: config.backend.ip + config.backend.base + 'centerController/getDutyPersonByMac'
                }
        })
        .factory('WebsocketLogService',['$http', '$q', 'WebsocketLogServiceConfig', function ($http, $q, WebsocketLogServiceConfig) {
            return {
				GetDeviceAlarm : function(mac,output,state){
					var deffered = $q.defer();
                    $http({
                        method: 'GET',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url:WebsocketLogServiceConfig.urls.GetDeviceAlarm,
						data:{
                        	mac:mac,
							output:output,
							state:state,
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
							deffered.promise.then(
								function(data){
									console.log('get1 success',WebsocketLogService,this);
									return GetDutyPerson(mac,data);									
								},
								function(){}
							)
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return null;
					//deffered.promise;
				},
				GetDutyPerson:function(mac,deviceData){
					var deffered = $q.defer();
                    $http({
                        method: 'GET',
                        dataType: "json",
                        contentType:'application/json; charset=UTF-8',
                        url: WebsocketLogServiceConfig.urls.GetDutyPerson+'?mac='+mac,
						data:{
                        	mac:mac,
							output:output,
							state:state,
                        },
                        timeout:  config.backend.timeout
                    })
                        .success(function(data){
                            deffered.resolve(data);
							deffered.promise.then(
								function(data){
									console.log('get2 success',deviceData,data)
									//this.$broadcast('requireClassroomListSuccess');
									data.clues = deviceData.clues
									return data;
								},
								function(){}
							)
                        })
                        .error(function(e, code){
                            deffered.reject(code);
                        });
                    return null;	
				}
			};
        }]);

});