define(['app','config'], function (app,config) {
    app.registerController('PersonalInformationCtrl', ['$scope','$modal' ,'$timeout', function ($scope,$modal,$timeout ) {

         $scope.active = 0;
        var setTreeHeight = function(){    
            $timeout(function(){
                $("#personal-left").css('height',function(){
                    return $("#personal-right").height();
                 });         
            },500);
            
        };
         
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
            setTreeHeight();
        };

        init();
      }]);
});
