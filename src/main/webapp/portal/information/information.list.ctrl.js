define(['app'], function (app) {
    app.registerController('InformationListCtrl', ['$scope' , function ($scope) {
        var init = function(){
            console.log('InformationListCtrl loaded');
        };
        init();
    }]);
});