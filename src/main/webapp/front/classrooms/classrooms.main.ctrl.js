define(['app','focusMe'], function (app) {
    app.registerController('ClassRoomMainCtrl', ['$scope', '$location'
                                                 ,'SocketService','TreeService',function ($scope, $location,SocketService,TreeService) {
    	
            $scope.active = 0;
            $scope.$parent.mainactive = 2;
            $scope.CurentTime = function(nS)
            { 
           	 if(nS){
    	            var now = new Date(nS);
    	            
    	            var year = now.getFullYear();       //年
    	            var month = now.getMonth() + 1;     //月
    	            var day = now.getDate();            //日
    	            
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
    	    }
            var init = function(){
            	
            	//停止课程巡视画面中的视屏轮询
            	var evt = document.createEvent("HTMLEvents");
            	evt.initEvent("active", false, false);
            	evt.id = 'ClassRoomMainCtrl';
            	window.dispatchEvent(evt);
            	
            	//如果有websocket通道打开，则将其关闭
            	if(SocketService.isConnected()){
            		SocketService.disconnect();
            	}
            	
                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_classrooms_url_view') === -1){
//                    alert("对不起！您没有权限访问。")
                    console.log("+++++++教室管理  您没有权限+++++++++")
//                    window.location.href("dashboard");
                    $location.path('dashboard');

                }
                else{
                	//跳转到第一个
                	var log = window.location.href.split("#");
                    var logHref = log[log.length - 1].split("/");
                    if(logHref[2] != "log"){
                        $location.path('classrooms/daily');
                    }
                };
            };

            init();
        }]);
});
