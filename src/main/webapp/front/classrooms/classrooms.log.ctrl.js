define(['app',
    'config',
    'common/directives/ip',
    'common/directives/mac'
], function (app, config) {
    app.registerController('LogCtrl', ['$scope','$modal','$stateParams','$location','growl','FacilityService' ,'TacticsService',
        '$http', '$filter', 'TreeService','$timeout',
        function ($scope,$modal,$stateParams,$location,growl,FacilityService ,TacticsService,$http, $filter,TreeService,$timeout) {
    	//时间戳的转换
//        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        $scope.getLocalTime = function(nS) {     
           return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');     
        }     
        //时间戳的转换
        $scope.transdate = function(endTime){
            var date=new Date();
            date.setFullYear(endTime.substring(0,4));
            date.setMonth(endTime.substring(5,7)-1);
            date.setDate(endTime.substring(8,10));
            date.setHours(endTime.substring(11,13));
            date.setMinutes(endTime.substring(14,16));
            date.setSeconds(endTime.substring(17,19));
            return Date.parse(date)/1000;
        }
        
        //查找日志
        $scope.searchLog = function(){
        	var stamp_begin = "";
        	var stamp_end = "";
	        if($scope.stamp_begin != ""){
	        	var stamp_begin = $scope.transdate($scope.stamp_begin) - 3600;
	        }
	        if($scope.stamp_end != ""){
	        	var stamp_end = $scope.transdate($scope.stamp_end) - 3600;
	        }
//          var stamp_end = $scope.transdate($scope.stamp_end) - 3600
          $http.get($scope.activedeviceServiceurl + "log/query?project=" + $scope.project + "&level=" + $scope.level + "&stamp_begin=" + stamp_begin + "&stamp_end=" + stamp_end)
                .success(function(data){
                  $scope.logDatas = data.value.data;
                 $scope.logDatas.forEach(function(logDatastime){  
                      logDatastime.stamp = new Date(parseInt(logDatastime.stamp) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
                      console.log(logDatastime.stamp); 
                  })
                })
                .error(function(data,status,headers,config){
                  if(status === 500){
                  }
                  throw(status);

                });

        }
        
        //排序
        var orderBy = $filter('orderBy');
        $scope.order = function(predicate, reverse) {        	 
            $scope.logDatas = orderBy($scope.logDatas, predicate, reverse);
         };
        var init = function(){
         $scope.project="";
         $scope.level="";
         $scope.stamp_begin="";
         $scope.stamp_end="";
         $scope.ip = $stateParams.ipInfo;
         $scope.activedeviceServiceurl = 'http://' + $scope.ip + ":10005/" ;
         $scope.searchLog();
         
        };
        init();
      }]);
});
