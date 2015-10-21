define(['app','focusMe'], function (app) {
    app.registerController('SystemMainCtrl', ['$scope','$location' , function ($scope,$location) {

        $scope.active = 0;
        $scope.$parent.mainactive = 8;
        var init = function(){
            
            
            //停止课程巡视画面中的视屏轮询
        	var evt = document.createEvent("HTMLEvents");
        	evt.initEvent("active", false, false);
        	evt.id = 'SystemMainCtrl';
        	window.dispatchEvent(evt);

            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_system_url_view') === -1){
              alert("对不起！您没有权限访问。")
                console.log("+++++++系统设置  您没有权限+++++++++")
//                window.location.href("login");
                $location.path('dashboard');
            }else{
                $location.path('system/user/{{}}/{{}}');
            };
        };

        init();
    }]);
});