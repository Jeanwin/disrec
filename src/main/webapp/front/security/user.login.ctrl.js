define(['app', 'config'], function (app, config) {
    app.controller('UserLoginCtrl', ['$scope', 'SecurityService', function ($scope, $securityService) {

        $scope.login = function () {
            $securityService.login()
                .then(
                function(user){
                    $scope.global.user.id = user.id;
                },
                function(){

                });
        };

        var init = function () {
            $scope.app = config.app;
            $scope.message = "";
            $scope.isBusy = false;
        };

        init();

    }]);
});