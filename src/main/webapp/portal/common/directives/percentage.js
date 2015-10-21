define(['app', 'jquery'], function (app, $) {
    app.registerDirective('percentage', ['$compile', '$timeout', function ($compile, $timeout) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function linkFn(scope, elm, attrs, ctrl) {
            
            	if(angular.isUndefined(attrs.size) || attrs.size === ""){
            		attrs.size = 20;
            	}
            
            	$(elm).hide()
                        .wrap('<div class="input-group input-group-percentage"></div>')
                        .after('<span class="input-group-addon">%</span>')
                        .after('<div class="percentage-preview" style="width: ' + attrs.size*7.5 + 'px">{{' + attrs.ngModel + '| formatPercent }}</div>')
                        .after('<span></span>');

					//console.log("------------attrs.size's is : " + attrs.size);
                    var previewElm = $(elm).parent().find('.percentage-preview');

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

                    var FLOAT_REGEXP = /^(\d+((\.|\,)\d{1,4})?)?$/;
                    var MAX = 100.0;
                    var timeout;
                    
                    ctrl.$parsers.push (function (viewValue) {
                    	$timeout.cancel(timeout);

	                    if(FLOAT_REGEXP.test(viewValue)) {
	                        if(parseFloat(viewValue) > MAX){
	                            isValid = false;
                        		// ctrl.$setValidity('percentage', false);
	                       		ctrl.$setValidity('percentage-over', false);
	                       		return (viewValue);
	                        }else{
	                            isValid = true;
                                ctrl.$setValidity('percentage', true);
                                ctrl.$setValidity('percentage-over', true);
                                return parseFloat(viewValue.replace(',', '.'));
	
	                        }
	                    } else {
	                        if(viewValue.indexOf('.', viewValue.length - 1) !== -1){
	                            timeout = $timeout(function() {
	                                ctrl.$setValidity('percentage', false);
	                                console.log('delay');
	                            },1500)
	
	                        }else{
	                            ctrl.$setValidity('percentage', false);
	                        }
	                        isValid = false;
	
	                        return (viewValue);
	                    }
                    });
            }

        };
    }]);
});