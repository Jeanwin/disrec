define(['app','focusMe'], function (app) {
    app.registerController('ResourceMainCtrl', ['$scope','$stateParams','$location' , 
                                                'SocketService',function ($scope,$stateParams,$location,SocketService) {

        $scope.active = 0;
        $scope.$parent.mainactive = 6;
        var init = function(){
        	
        	//停止课程巡视画面中的视屏轮询
        	var evt = document.createEvent("HTMLEvents");
        	evt.initEvent("active", false, false);
        	evt.id = 'ResourceMainCtrl';
        	window.dispatchEvent(evt);
        	
        	//如果有websocket通道打开，则将其关闭
        	if(SocketService.isConnected()){
        		SocketService.disconnect();
        	}
            
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_resource_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++资源管理  您没有权限+++++++++")
                $location.path('dashboard');
            } else {
            	//跳转到第一个
            	var resourcename = window.location.href.split("#");
                var resourcenameHref = resourcename[resourcename.length - 1].split("/")
                if(resourcenameHref[2] != "resourcename"){
                    $location.path('resource/upload');
                }
            	
            }
        };
        init();
    }]);
});
