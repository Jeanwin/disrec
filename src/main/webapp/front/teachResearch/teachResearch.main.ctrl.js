define(['app'], function (app) {
    app.registerController('TeachResearchMainCtrl', ['$scope','$location',function ($scope,$location) {

    	// 将时间戳换成时间
     	  $scope.getLocalTime = function(nS) {   	  
            var t = new Date(parseInt(nS) * 1000); 
            return (t.getHours()<18?'0':'')+(t.getHours()-8)+':'+(t.getMinutes()>9?t.getMinutes():'0'+t.getMinutes())+':'+(t.getSeconds()>9?t.getSeconds():'0'+t.getSeconds());
               
         };  
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
                /*$scope.active = 0;*/
                $scope.$parent.mainactive = 10;
                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_teachResearch_url_view') === -1){
                    console.log("+++++++课表管理  您没有权限+++++++++")
                    $location.path('dashboard');
                }else{
                    $location.path('teachResearch/listenModal');
                } 
                
            };

            init();
        }]);
});
