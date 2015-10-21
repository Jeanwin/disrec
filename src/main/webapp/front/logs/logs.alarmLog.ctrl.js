define(['app',
    'config'
], function (app, config) {
    app.registerController('logAlarmCtrl', ['$scope','$modal','$location','growl' ,
        '$http','$timeout','LogsStaticsService','TeachSearchService',
        function ($scope,$modal,$location,growl ,$http,$timeout,LogsStaticsService,TeachSearchService) {
            //根据页码查询
            $scope.onSelectPage = function(pageIndex){
                if(!pageIndex){
                    growl.addErrorMessage("此页码不存在");
                }
                $scope.pagination.pageIndex = pageIndex;
                var _pagination = angular.copy($scope.pagination);
                if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                    _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
                }
               if($scope.key){
                    $scope.GetAlarmList($scope.key); //调用查询接口
                }else{
                    $scope.GetAlarmList(""); //调用查询接口
                }
            };
        
            //获取报警日志
            $scope.GetAlarmList = function(keywords){
            LogsStaticsService.LogsList(keywords,$scope.pagination).then(
                    function(data){
                        $scope.alarmLists = data.data;
                        /*for(var i in $scope.alarmLists){
                            $scope.alarmLists[i].createdate = $scope.CurentTime($scope.alarmLists[i].createdate);
                        }*/
                        $scope.pagination.totalItems = data.total;
                        console.log($scope.alarmLists);
                    },
                    function(){
                        
                    }
                )
            }
            //显示已处理以及处理时间
            $scope.handleState=function(index){                    
                        var handleTime=$scope.CurentTime();
                        $scope.alarmLists[index].handelTime= handleTime;
                        $scope.alarmLists[index].state = '1';
                        var key={
                            'id':  $scope.alarmLists[index].id,
                            'state': '1',
                            'handelTime': $scope.alarmLists[index].handelTime
                        }            
                        LogsStaticsService.handleAlarmLogs(key).then(
                            function(data){
                                if(data=="0"){
                                    growl.addErrorMessage("处理失败");
                                }
                                if(data=="1"){
                                    growl.addErrorMessage("处理成功");
                                }
                            }
                        )
            }
            $scope.CurentTime = function()
                            { 
                                var now = new Date();                                
                                var year = now.getFullYear();       //年
                                var month = now.getMonth() + 1;     //月
                                var day = now.getDate();           //日

                                var hh = now.getHours();            //时
                                var mm = now.getMinutes();          //分
                                var ss = now.getSeconds();           //秒
                                
                                var clock = year + "-";
                                
                                if(month < 10)
                                    clock += "0";
                                
                                clock += month + "-";
                                
                                if(day < 10)
                                    clock += "0";
                                    
                                clock += day + " ";
                                
                                if(hh < 10)
                                    clock += "0";
                                    
                                clock += hh + ":";
                                if (mm < 10) clock += '0'; 
                                clock += mm + ":"; 
                                 
                                if (ss < 10) clock += '0'; 
                                clock += ss; 
                                return(clock);                             
                            }  
            /*$scope.GetAlarmList = function(keywords){
                TeachSearchService.GetlistenModal(keywords,$scope.pagination).then(
                    function(data){
                        $scope.alarmLists = data.data;
                        //for(var i in $scope.alarmLists){
                          //  $scope.alarmLists[i].createdate = $scope.CurentTime($scope.alarmLists[i].createdate);
                        //}
                        $scope.pagination.totalItems = data.total;
                        console.log($scope.alarmLists);
                    },
                    function(){
                        
                    }
                )
            }*/
            var init = function(){
                $scope.selectedone = "开关机状态";
                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_system_log_url_view') === -1){
                    console.log("+++++++课表管理  您没有权限+++++++++");                    
                    $location.path('logs/voiceCall');
                } 
                $scope.$parent.active = 0;
                //$scope.searchkey = {};
                $scope.key = {
                        'startTime':"",
                        'endTime':"",
                        "source":"",
                        "dutyroom":"",
                        "content":""
                }
              //分页对象
                $scope.pagination = {
                    totalItems:0,
                    pageIndex:1,
                    pageSize:50,
                    maxSize:8,
                    numPages:4,
                    previousText: config.pagination.previousText,
                    nextText: config.pagination.nextText,
                    firstText: config.pagination.firstText,
                    lastText: config.pagination.lastText
                };
                //$scope.searchkey ="";
                $scope.GetAlarmList("");
            };
            init();
      }]);
});