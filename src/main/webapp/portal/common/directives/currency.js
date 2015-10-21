define(['app', 'jquery', 'locale-zh-cn'], function (app, $) {
    app.registerDirective('currency', ['$compile', '$timeout', function ($compile, $timeout ) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                $(elm).hide()
                    .wrap('<div class="input-group-currency"></div>')
                    .after('<div class="currency-preview">{{' + attrs.ngModel + ' | currency}}</div>')
                    .after('<span></span>');

                var previewElm = $(elm).parent().find('.currency-preview');
                $compile(previewElm.contents())(scope);

                var isValid = true;


                $(elm).on('blur',function(){

                    if(isValid){
                        previewElm.show();
                        $(elm).hide();
                    }
                });

                previewElm.on('click', function(){
                    previewElm.hide();
                    $(elm).show().focus();
                });

                //var FLOAT_REGEXP = /^[+-]?(\d+((\.)\d{1,2})?)?$/;
                //var FLOAT_REGEXP = /^-?\d+$/;
                var FLOAT_REGEXP =  /^[+-]?(\d+((\.)\d{1,2})?)?$/;
                var MAX = 1000000000000;

                var timeout;

                ctrl.$parsers.push (function (viewValue) {

                    $timeout.cancel(timeout);

                    if(FLOAT_REGEXP.test(viewValue)) {
                        if(parseFloat(viewValue) >= MAX){
                            isValid = false;
                            ctrl.$setValidity('currency-over', false);
                            return (viewValue);
                        }else{
                            isValid = true;
                            ctrl.$setValidity('currency-over', true);
                            ctrl.$setValidity('currency', true);
                            var temp = parseFloat(viewValue.replace(',', '.'));
                            return parseFloat((temp + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";

                        }
                    } else {
                        if(viewValue.indexOf('.', viewValue.length - 1) !== -1){
                            timeout = $timeout(function() {
                                ctrl.$setValidity('currency', false);
                                console.log('delay');
                            },1500)

                        }else{
                            ctrl.$setValidity('currency', false);
                        }
                        isValid = false;

                        return (viewValue);
                    }
                });

            }
        };
    }]);
});