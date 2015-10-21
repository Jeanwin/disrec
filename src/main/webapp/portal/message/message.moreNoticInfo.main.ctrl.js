define(['app','config'], function (app,config) {
    app.registerController('MoreNoticInfoCtrl', ['$scope','$modal' ,'$location','$stateParams', function ($scope,$modal,$location,$stateParams ) {

        //标记选中的选项
        $scope.allNotice =function(index){
            $scope.sign = index;
        };

        $scope.$parent.action = 3;
        var init = function(){
            $scope.sign = '1';
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

            if ($stateParams.operation === undefined) {
                $location.path('NoticInfo/home');
                $scope.active = 'home';
            }
            else{
                $scope.pageFlag = $stateParams.operation;
                $scope.active = $scope.pageFlag;
            }  
        };

        init();
      }]);
});
