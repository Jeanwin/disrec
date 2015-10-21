define(['app'], function (app) {
    app.registerController('PortalMainCtrl', ['$scope','$location' , function ($scope,$location) {
        $scope.active=0;
        $scope.$parent.mainactive = 7;
        var init = function(){
            $location.path('portal/message');
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_portal_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++课表编辑  您没有权限+++++++++")
                $location.path('dashboard');
            };
        };
        init();
    }]);
});