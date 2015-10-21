define(['app','jquery'], function (app,$) {
    app.registerDirective('year', ['$compile', function ($compile) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                    $(elm).hide()
                        .wrap('<div class="input-group-year"></div>')
                        .after('<div class="year-preview">{{' + attrs.ngModel + '}}</div>')
                        .after('<span></span>');

                    var previewElm =$(elm).parent().find('.year-preview');
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

                    var YEAR_REGEXP = /^([0-9]{4,4})?$/;
                    ctrl.$parsers.push (function (viewValue) {
                        if (YEAR_REGEXP.test(viewValue)) {
                        	hideFlag = true;
                            ctrl.$setValidity('year', true);
                            if(isNaN(parseInt(viewValue))){
                            	return viewValue;
                            }else{
                            	return 	(parseInt(viewValue+"")+"");
                            }
                          
                        } else {
                        	hideFlag = false;
                            ctrl.$setValidity('year', false);
                            return (viewValue);
                        }
                    });
                }
        };
    }]);
});