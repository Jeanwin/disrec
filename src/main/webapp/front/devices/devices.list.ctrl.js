define(['app'], function (app) {
    app.registerController('DevicesListCtrl', ['$scope' , function ($scope) {


            var init = function(){
                $scope.$parent.active = 1;
            };

            init();
        }]);
});
