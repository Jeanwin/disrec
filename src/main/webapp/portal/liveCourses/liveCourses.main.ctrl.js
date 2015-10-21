define(['app'], function (app) {
    app.registerController('liveCoursesMainCtrl', ['$scope', '$location','$modal' ,'$stateParams', function ($scope, $location,$modal,$stateParams ) {


        //点击选中的按钮颜色变化
        $scope.LiveCourses = function(index){
            $scope.LiveCoursesSign = index;
        };
        $scope.$parent.action = 1;
        var init = function(){
			$scope.LiveCoursesSign = '1';          
            if ($stateParams.operation === undefined) {
                $location.path('liveCourses/home');
                $scope.active = 'home';
            }
            else{
                $scope.pageFlag = $stateParams.operation;
                $scope.active = $scope.pageFlag;
            }            
            
        };

        init();
      }]);
});
