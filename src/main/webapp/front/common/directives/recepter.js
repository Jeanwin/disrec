define(['angular'], function(angular) {
    angular.module("page.recepter", [])
            .directive("recepter", function() {
                return {
                    restrict: "EA",
                    templateUrl: "template/recepter/recepter.html",
                    controller: "RecepterCtrl",
                    scope: {
                        language: "@"
                    },
                    link: function(scope, elm, attrs, ctrl) {
                    }
                }
            })
            .controller("RecepterCtrl", ["$scope", "$element", "$http", function(scope, elm, $http) {

            }]);
});