define(['app',
    'config'
], function (app, config) {
    app.registerController('logManageCtrl', ['$scope','$modal','$location','growl' ,
        '$http','$timeout',
        function ($scope,$modal,$location,growl ,$http,$timeout) {
    	

	    

            

       

        var init = function(){
            $scope.selectedone = "开关机状态";
            //判断是否有权限
            $scope.$parent.active = 0;
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
            
           

        };

           
        init();
      }]);
});
