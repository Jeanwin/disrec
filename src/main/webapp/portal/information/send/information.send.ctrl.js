define(['app'], function (app) {
    app.registerController('InformationSendCtrl', ['$scope' , function ($scope) {
        var init = function(){
            console.log('InformationSendCtrl loaded');
        };
        init();
    }]);
});