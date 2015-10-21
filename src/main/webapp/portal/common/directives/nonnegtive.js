define(['app', 'jquery'], function (app, $) {
    app.registerDirective('nonnegtive', ['$compile', function ($compile) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
            	$(elm).hide()
                        .wrap('<div class="input-group-nonnegtive"></div>')
                        .after('<div class="nonnegtive-preview">{{' + attrs.ngModel + '}}</div>')
                        .after('<span></span>');

                    var previewElm = $(elm).parent().find('.nonnegtive-preview');
                    $compile(previewElm.contents())(scope);
                    
                    
                    var hideFlag = true;
                    $(elm).on('blur',function(){
                    	if(hideFlag){
                    		  previewElm.show();
                    		  $(elm).hide();
                    	}
                    });

                    previewElm.on('click', function(){
                        previewElm.hide();
                        $(elm).show().focus();
                    });

                    var YEAR_REGEXP = /^(\d*)?$/;
                    ctrl.$parsers.push (function (viewValue) {
                        if (YEAR_REGEXP.test(viewValue)) {
                        	hideFlag = true;
                            ctrl.$setValidity('nonnegtive', true);
                            return viewValue;
                        } else {
                        	hideFlag = false;
                            ctrl.$setValidity('nonnegtive', false);
                            return (viewValue);
                        }
                    });
                }
        };
    }]);
});