define(['app'], function (app) {
    app.registerDirective('mac', function () {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                var INTEGER_REGEXP = /[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/;
                ctrl.$parsers.push (function (viewValue) {

                    if (INTEGER_REGEXP.test(viewValue)) {
                        ctrl.$setValidity('mac', true);
                        return viewValue;
                    } else {
                        ctrl.$setValidity('mac', false);
                        return "mac地址格式不正确！mac地址格式为00:24:21:19:BD:E4";
                    }
                });
            }
        };
    });
});