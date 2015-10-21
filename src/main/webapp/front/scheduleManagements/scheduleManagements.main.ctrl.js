define(['app','focusMe'], function (app) {
    app.registerController('ScheduleManagementMainCtrl', ['$scope','ScheduleService','$location', 
              'SocketService',function ($scope,ScheduleService,$location,SocketService) {

            $scope.active = 0;
            $scope.$parent.mainactive = 3;

            var init = function(){
            	
            	//停止课程巡视画面中的视屏轮询
            	var evt = document.createEvent("HTMLEvents");
            	evt.initEvent("active", false, false);
            	evt.id = 'ScheduleManagementMainCtrl';
            	window.dispatchEvent(evt);
            	
            	//如果有websocket通道打开，则将其关闭
            	if(SocketService.isConnected()){
            		SocketService.disconnect();
            	}
            	
//                $location.path('scheduleManagements/live');
                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_scheduleManagements_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                    console.log("+++++++课表管理  您没有权限+++++++++")
                    $location.path('dashboard');
                } else{
                    var arrAuthentic=['auth_scheduleManagements_live_url_view','auth_scheduleManagements_week_url_view','auth_scheduleManagements_edit_url_view','auth_scheduleManagements_myschedule_url_view','auth_scheduleManagements_manual_url_view'];
                    for(var i=0;i<arrAuthentic.length;i++){
                        var tempAuthentic=arrAuthentic[i];
                        if($scope.global.user.authenticatid.indexOf(tempAuthentic)>=0){
                            switch (i)
                            {
                            case 0:
                               $location.path('scheduleManagements/live');
                               break;
                            case 1:
                               $location.path('scheduleManagements/week');
                               break;
                            case 2:
                               $location.path('scheduleManagements/edit');                                
                               break;
                            case 3:
                               $location.path('scheduleManagements/myschedule');
                               break; 
                            case 4:
                               $location.path('scheduleManagements/handleRecord');                               
                               break;
                            }
                            break ;
                        }
                    }
                }
                //window.location.href='index.html#/scheduleManagements/week';
                /*if($scope.global.user.authenticatid.indexOf('auth_scheduleManagements_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                    console.log("+++++++课表管理  您没有权限+++++++++")
                    $location.path('dashboard');
                } else {
                	$scope.dealLocationValue = window.location.href.split("#");
                    $scope.dealLocationParamValue = $scope.dealLocationValue[1]; 
                    var aFirst = $scope.dealLocationParamValue.split("/")[2];                  
                    if(angular.isUndefined($scope.dealLocationParamValue)){
                    	//跳转到第一个
                    	$location.path('scheduleManagements/live');
                    }


                    if(aFirst != "live"){
                        $location.path('classrooms/daily');
                    }else if(aFirst != "daily"){

                    }

                    $location.path('scheduleManagements/'+aFirst);
                }*/
            };

            init();
        }]);
});
