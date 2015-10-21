define(['app'], function (app) {
    app.registerController('LogsMainCtrl', ['$scope', '$location',function ($scope, $location) {
            var init = function(){            	
            	$scope.active = 0;
                $scope.$parent.mainactive = 11;
                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_logstatistical_url_view') === -1){
                    console.log("+++++++系统日志 您没有权限+++++++++")
                    $location.path('dashboard');

                }else{
                	$location.path('logs/alarmLog');
                }                
            };
            init();
        }]);
});