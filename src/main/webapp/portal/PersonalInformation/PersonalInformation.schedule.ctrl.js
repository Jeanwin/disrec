define(['app','config'], function (app,config) {
    app.registerController('PersonalInformationScheduleCtrl', ['$scope','$modal' , function ($scope,$modal ) {


        var init = function(){
            $scope.pagination = {
                totalItems:0,
                pageIndex:1,
                pageSize:10,
                maxSize:8,
                numPages:4,
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            $scope.$parent.active = 2;
        };

        init();
      }]);
});
