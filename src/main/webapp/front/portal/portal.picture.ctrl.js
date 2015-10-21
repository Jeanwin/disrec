define(['app','slick'], function (app) {
    app.registerController('PortalPictureCtrl', ['$scope' , function ($scope) {

        var init = function(){
            $scope.$parent.active = 1;
        };

        init();
    }]);
});
