define(['app','config'], function (app,config) {
    app.registerController('PersonalSetCtrl', ['$scope','$modal' , function ($scope,$modal ) {


        //是否显示个人信息和密码修改
        $scope.showmodal = function(index){
            $scope.Myinformation = index;
            $scope.Mypassword = index;
        };
        var init = function(){
            $scope.Myinformation = '1';
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
            $scope.$parent.active = 4;
        };

        init();
      }]);
});
