define(['app'], function (app) {
    app.registerDirective('ip', function () {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {

                var INTEGER_REGEXP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
                ctrl.$parsers.push (function (viewValue) {

//                    if (INTEGER_REGEXP.test(viewValue)) {
//                        ctrl.$setValidity('ip', true);
//                        return viewValue;
//                    } else {
//                        ctrl.$setValidity('ip', false);
//                        return "您输入的IP格式不正确，必须是000.000.000.000格式";
//                    }

                    if (!INTEGER_REGEXP.exec(viewValue)) {
//                        return "IP格式不正确，必须是000.000.000.000格式";
                        return "IP格式不正确，必须是000.000.000.000格式";
                    }
                    var laststr;
                    laststr = viewValue.split(".");    //用.把字符串str分开
                    var last_patrn = /^\d{1,3}$/;
                    if (parseInt(laststr[0]) > 255 || parseInt(laststr[1]) > 255
                        || parseInt(laststr[2]) > 255 || parseInt(laststr[3]) > 255) //判断IP每位的大小
                    {
                        return "您输入的IP范围不正确，必须是0~255之间";
                    }
                    if (!last_patrn.exec(laststr[3])) {
                        return "您输入的IP格式不正确，必须是000.000.000.000格式";
                    }

                    ctrl.$setValidity('ip-scope-error', true);
                    return viewValue;
                });
            }
        };
    });
});