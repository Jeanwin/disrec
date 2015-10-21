define(['app'], function (app) {
    app.registerController('ExcellentCourseMainCtrl', ['$scope', '$location','$stateParams', function ($scope, $location,$stateParams) {


            //点击选中的按钮颜色变化
            $scope.Excellent = function(index){
                $scope.excellentSign = index;
            };
            $scope.$parent.action = 2;
            var init = function(){
                $scope.excellentSign = '1';          
                if ($stateParams.operation === undefined) {
                        $location.path('excellentCourse/home');
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
