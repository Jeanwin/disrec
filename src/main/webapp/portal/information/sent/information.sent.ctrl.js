define(['app'], function (app) {
    app.registerController('InformationSentCtrl', ['$scope' , function ($scope) {
        var init = function(){
            console.log('InformationSentCtrl loaded');
        };
        init();
    }]);
});