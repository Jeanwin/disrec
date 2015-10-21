define(['app',
    'config'
], function (app, config) {
    app.registerController('VoiceCallCtrl', ['$scope','$modal','$location','growl' ,
        '$http','$timeout','LogsStaticsService',
        function ($scope,$modal,$location,growl ,$http,$timeout,LogsStaticsService) {
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
                    $scope.GetVoiceCallList($scope.key); //调用查询接口
                }else{
                    $scope.GetVoiceCallList(""); //调用查询接口
                }

            };
            //获取语音呼叫列表
            $scope.GetVoiceCallList = function(keywords){
            LogsStaticsService.voiceCallLogs(keywords,$scope.pagination).then(
                    function(data){
                        $scope.voiceCallLists = data.data;
                        /*for(var i in $scope.voiceCallLists){ //时间转化
                            $scope.voiceCallLists[i].createdate = $scope.CurentTime($scope.voiceCallLists[i].createdate); 
                        }*/
                        $scope.pagination.totalItems = data.total;
                        console.log($scope.voiceCallLists);
                    },
                    function(){
                        
                    }
                )
            }





            var init = function(){
                $scope.selectedone = "开关机状态";
                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_system_voice_call_url_view') === -1){
                    console.log("+++++++课表管理  您没有权限+++++++++")
                    $location.path('dashboard');
                } 
                
                $scope.$parent.active = 1;
                //$scope.searchkey = {};
                $scope.key = {
                        'startTime':"",
                        'endTime':"",
                        "callerPerson":"",
                        "calledPerson":"",
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
                $scope.searchkey ="";
                $scope.GetVoiceCallList("");
            };
            init();
      }]);
});