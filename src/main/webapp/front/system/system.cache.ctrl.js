define(['app'], function (app) {
    app.registerController('SystemCacheCtrl', ['$scope','$location' , function ($scope,$location) {
        var init = function(){
            $scope.$parent.active = 6;
        };
        init();
    }]);
});