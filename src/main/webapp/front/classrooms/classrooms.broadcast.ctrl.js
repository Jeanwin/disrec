define(['app',
    'config',
    'common/directives/ip',
    'common/directives/mac'
], function (app, config) {
    app.registerController('BroadCastCtrl', ['$scope','$modal','$location','$upload','growl','FacilityService' ,'TacticsService',
        '$http', '$filter', 'TreeService','$timeout',
        function ($scope,$modal,$location,$upload,growl,FacilityService ,TacticsService,$http, $filter,TreeService,$timeout) {
    	var mainTrees = function(keywords,areaid){
            TreeService.mainTree(keywords,areaid).then(
                function(data){
                    $scope.areaTree = data;
                })
    	}
    	//创建广播
	    $scope.newBroadCast = function(){
	         var modalInstance = $modal.open({
	            templateUrl: 'classrooms/broadcast/classrooms.newBroadCast.modal.html',
	            backdrop:'static',
	            controller: NewBroadCastModalCtrl,
	            resolve: {
	                areaTree: function(){
	                    return $scope.areaTree;
	                }
	            }
	        }).result.then(
	                function(){
	                    
	                }
	            );
	    };
	    var NewBroadCastModalCtrl = function ($scope, $modalInstance,$location,growl,areaTree) {
	        $scope.areaTree = areaTree;
	        $scope.cancel = function () {
	            $modalInstance.dismiss('cancel');
	        };
	    }
	    
	  //创建广播
	    $scope.microphoneBroadCast = function(){
	         var modalInstance = $modal.open({
	            templateUrl: 'classrooms/broadcast/classrooms.MicrophoneBroadCast.modal.html',
	            backdrop:'static',
	            controller: MicrophoneBroadCastModalCtrl,
	            resolve: {
	                areaTree: function(){
	                    return $scope.areaTree;
	                }
	            }
	        }).result.then(
	                function(){
	                    
	                }
	            );
	    };
	    var MicrophoneBroadCastModalCtrl = function ($scope, $modalInstance,$location,growl,areaTree) {
	        $scope.areaTree = areaTree;
	        $scope.cancel = function () {
	            $modalInstance.dismiss('cancel');
	        };
	    }


	    

            

       

        var init = function(){
            
            
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_classrooms_version_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++教室设置  您没有权限+++++++++");
                $location.path('classrooms/tactics');
            };
            $scope.$parent.active = 5;
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
            
            mainTrees("deviceSet", "", "");
           

        };

           
        init();
      }]);
});
