define(['angular', 'mcDatePicker'], function(angular, mcDatePicker) {
    angular.module("ui.mc",["ui.mc.datepicker"]),

    angular.module("mc.datepicker", [])
        .directive("datepicker2", function() {
            return {
                restrict: "EA",
                templateUrl: "template/datepicker2/datepicker.html",
                controller: "DatePickerCtrl",
                replace: true,
                scope: {
                    language: "@"
                },
                link: function(scope, elm, attrs, ctrl) {
                }
            }
        })
        .directive("datepicker3", function() {
            return {
                restrict: "EA",
                templateUrl: "template/datepicker2/datetimepicker.html",
                controller: "DatetimePickerCtrl",
                replace: true,
                scope: {
                    language: "@"
                },
                link: function(scope, elm, attrs, ctrl) {
                }
            }
        })
        .controller("DatetimePickerCtrl", ["$scope", "$element", "$http", function(scope, elm, $http) {
            elm.datetimepicker({
            	format: 'yyyy-mm-dd hh:ii'
            })
        }])
        .controller("DatePickerCtrl", ["$scope", "$element", "$http", function(scope, elm, $http) {
            elm.datepicker({
                autoclose: true,
                format: 'yyyy-mm-dd',
                todayHighlight: true,
                todayBtn: true
            });
        }]);
});