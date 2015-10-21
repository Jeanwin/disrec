/*
 * mc-apple
 * by Jack MagusCreation
 * Version: 0.1.0 - 2014-09-28
 */

define(['angular'], function (angular) {


    angular.module('mc.validator', [])
        .directive('formValidator', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attrs, fn) {

                    // This is the DOM form element
                    var DOMForm = angular.element(element)[0];


                    // This is the the scope form model
                    // All validation states are contained here
                    var scopeForm = scope[DOMForm.name];




                    // Iterate through the form fields and setup watches on each one
                    var setupWatches = function (formElement) {
                        for (var i = 0; i < formElement.length; i++) {
                            // This ensures we are only watching form fields
                            if (i in formElement) {
                                setupWatch(formElement[i]);
                            }
                        }
                    };

                    // Setup watches on all form fields
                    setupWatches(DOMForm);

                    // Setup $watch on a single formfield
                    function setupWatch(elementToWatch) {


                        // If element is set to validate on blur then update the element on blur
                        if ("validate-on" in elementToWatch.attributes && elementToWatch.attributes["validate-on"].value === "blur") {
                            angular.element(elementToWatch).on('blur', function() {
                                updateValidationMessage(elementToWatch);
                                updateValidationClass(elementToWatch);
                            });
                        }

                        scope.$watch(function() {
                                return elementToWatch.value  + checkElementValididty(elementToWatch) + getDirtyValue(scopeForm[elementToWatch.name]);
                            },
                            function() {
                                // if dirty show
                                if ("validate-on" in elementToWatch.attributes && elementToWatch.attributes["validate-on"].value === "dirty") {
                                    updateValidationMessage(elementToWatch);
                                    updateValidationClass(elementToWatch);
                                }
                                // Update the field immediately if the form is submitted or the element is valid
                                else if ((scopeForm[elementToWatch.name] && scopeForm[elementToWatch.name].$valid)) {
                                    updateValidationMessage(elementToWatch);
                                    updateValidationClass(elementToWatch);
                                }
                            });
                    }


                    // Returns the $dirty value of the element if it exists
                    function getDirtyValue(element) {
                        if (element) {
                            if ("$dirty" in element) {
                                return element.$dirty;
                            }
                        }
                    }



                    function checkElementValididty(element) {
                        // If element has a custom validation function
                        if ("validator" in element.attributes) {
                            // Call the custom validator function
                            var isElementValid = scope.$eval(element.attributes.validator.value);
                            scopeForm[element.name].$setValidity("mcValidator", isElementValid);
                            return isElementValid;
                        }
                    }

                    function getTarget(element){
                        var fg = getFormGroup(element);
                        var ig = getInputGroup(element);
                        var target = fg || ig || element;

                        return getFormGroup(element) || getInputGroup(element) || element;
                    }


                    // Adds and removes an error message as a sibling element of the form field
                    // depending on the validity of the form field and the submitted state of the form.
                    // Will use default message if a custom message is not given
                    function updateValidationMessage(element) {

                        var defaultRequiredMessage = function() {
                            return "<i class='fa fa-times'></i> 此项为必填项";
                        };
                        var defaultInvalidMessage = function() {
                            return "<i class='fa fa-times'></i> 输入的格式有误";
                        };


                        // Make sure the element is a form field and not a button for example
                        // Only form elements should have names.
                        if (!(element.name in scopeForm)) {
                            return;
                        }


                        var scopeElementModel = scopeForm[element.name];

                        var DOMTarget = getTarget(element);


                        // Only add/remove validation messages if the form field is $dirty or the form has been submitted
                        if (scopeElementModel.$dirty) {

                            // Remove all validation messages
                            var validationMessageElement = isValidationMessagePresent(DOMTarget);
                            if (validationMessageElement) {
                                validationMessageElement.remove();
                            }

                            var validationFeedbackElement = isValidationFeedbackPresent(element);
                            if (validationFeedbackElement) {
                                validationFeedbackElement.remove();
                            }


                            if (scopeElementModel.$error.required) {
                                angular.element(element).after(generateErrorFeedback());
                                // If there is a custom required message display it
                                if ("required-message" in element.attributes) {
                                    angular.element(DOMTarget).after(generateErrorMessage(element.attributes['required-message'].value));
                                }
                                // Display the default require message
                                else {
                                    angular.element(DOMTarget).after(generateErrorMessage(defaultRequiredMessage));
                                }
                            } else if (!scopeElementModel.$valid) {
                                angular.element(element).after(generateErrorFeedback());
                                // If there is a custom validation message add it
                                if ("invalid-message" in element.attributes) {
                                    angular.element(DOMTarget).after(generateErrorMessage(element.attributes['invalid-message'].value));
                                }
                                // Display the default error message
                                else {
                                    angular.element(DOMTarget).after(generateErrorMessage(defaultInvalidMessage));
                                }
                            }
                        }
                    }

                    function getFormGroup(element){
                        return angular.element(element).closest('.form-group')[0];
                    }

                    function getInputGroup(element){
                        return angular.element(element).closest('.input-group')[0];
                    }


                    function generateErrorMessage(messageText) {
                        return "<label class='control-label has-error validationMessage'>" + scope.$eval(messageText) + "</label>";
                    }

                    function generateErrorFeedback() {
                        return "";
                        //return "<span class='glyphicon glyphicon-remove form-control-feedback'></span>";
                    }


                    // Returns the validation message element or False
                    function isValidationMessagePresent(element) {
                        var t1 = angular.element(element).next('.validationMessage')[0];


                        //var elementSiblings = angular.element(element).parent().children();
                        //var elementSiblings = element.parent().children();
                        //
                        //for (var i = 0; i < elementSiblings.length; i++) {
                        //    if (angular.element(elementSiblings[i]).hasClass("validationMessage")) {
                        //        return angular.element(elementSiblings[i]);
                        //    }
                        //}
                        return t1 || false;
                    }

                    // Returns the validation feedback element or False
                    function isValidationFeedbackPresent(element) {
                        var t1 = angular.element(element).next('.form-control-feedback')[0];

                        return t1 || false;
                    }


                    // Adds and removes .has-error class to both the form element and the form element's parent
                    // depending on the validity of the element and the submitted state of the form
                    function updateValidationClass(element) {
                        // Make sure the element is a form field and not a button for example
                        // Only form fields should have names.
                        if (!(element.name in scopeForm)) {
                            return;
                        }
                        var formField = scopeForm[element.name];

                        var DOMTarget = getTarget(element);

                        // Only add/remove validation classes if the field is $dirty or the form has been submitted
                        if (formField.$dirty) {
                            if (formField.$valid) {
                                angular.element(DOMTarget).removeClass('has-error');
                                angular.element(DOMTarget).removeClass('has-feedback');

                                // This is extra for users wishing to implement the .has-error class on the field itself
                                // instead of on the parent element. Note that Bootstrap requires the .has-error class to be on the parent element
                                angular.element(element).removeClass('has-error');
                            } else if (formField.$invalid) {
                                angular.element(DOMTarget).addClass('has-error');
                                angular.element(DOMTarget).addClass('has-feedback');

                                // This is extra for users wishing to implement the .has-error class on the field itself
                                // instead of on the parent element. Note that Bootstrap requires the .has-error class to be on the parent element
                                angular.element(element).addClass('has-error');
                            }
                        }
                    }

                }
            };
        })

        .directive('carNoValidator', [function () {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function ($scope, element, attrs, ctrl) {

                    var MAXLENGTH = parseInt(attrs['carNoValidator']) || 6;

                    var capitalize = function (inputValue) {
                        inputValue = inputValue || '';

                        var capitalized = inputValue.toUpperCase();

                        if(capitalized.length > MAXLENGTH) {
                            capitalized = capitalized.slice(0,MAXLENGTH);
                        }

                        if(capitalized.length === MAXLENGTH){
                            ctrl.$setValidity('carNo',true);
                        }else{
                            ctrl.$setValidity('carNo',false);
                        }


                        if(capitalized !== inputValue) {
                            ctrl.$setViewValue(capitalized);
                            ctrl.$render();
                        }
                        return capitalized;
                    };

                    ctrl.$parsers.unshift (capitalize);

                    capitalize($scope[attrs.ngModel]);
                }
            };
        }])

        .directive('mcMaxlength', function() {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModelCtrl) {
                    var maxlength = Number(attrs.mcMaxlength);
                    function fromUser(text) {
                        if (text.length > maxlength) {
                            var transformedInput = text.substring(0, maxlength);
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                            return transformedInput;
                        }
                        return text;
                    }
                    ngModelCtrl.$parsers.push(fromUser);
                }
            };
        })

        .directive('numberOnly', [function () {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function ($scope, element, attrs, ctrl) {

                    var numberOnly = function (inputValue) {
                        inputValue = inputValue || '';
                        var onlyNumber = inputValue.replace(/[^\d]/g,'');
                        if(onlyNumber !== inputValue) {
                            ctrl.$setViewValue(onlyNumber);
                            ctrl.$render();
                        }
                        return onlyNumber;
                    };

                    ctrl.$parsers.unshift (numberOnly);

                    numberOnly($scope[attrs.ngModel]);

                }
            };
        }])

        .directive('uppercase', [function () {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function ($scope, element, attrs, ctrl) {

                    var capitalize = function (inputValue) {
                        inputValue = inputValue || '';

                        var capitalized = inputValue.toUpperCase();

                        if(capitalized !== inputValue) {
                            ctrl.$setViewValue(capitalized);
                            ctrl.$render();
                        }
                        return capitalized;
                    };

                    ctrl.$parsers.unshift (capitalize);

                    capitalize($scope[attrs.ngModel]);
                }
            };
        }]);

});