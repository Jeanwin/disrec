define(['app',
    'config'
], function (app,config) {
    app.registerController('InformationSentCtrl', ['$scope','InformationSentService' ,
        function ($scope,InformationSentService) {

        //根据页码查询--最外层
        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
            }
            $scope.searchInformationSent("",_pagination,""); //调用查询接口
            console.log("*********","");
        };

        //Json已发送消息----最外层
        $scope.searchInformationSent=function(keywords,pagination,user){
            console.log("进入information得值的服务109");
            InformationSentService.informationeSents(keywords,pagination,user).then(
                function(data){
                    if(data.total > 0){
                        $scope.informationSentList=data.data;
                        $scope.pagination.totalItems = data.total;
                        $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                    }else{
                        $scope.informationSentList =[];
                        $scope.growl("未查找到相关信息",'error');
                    }
                },
                function(code) {
                    throw(code);
                }
            );
        };

        var init = function(){
            console.log('InformationSentCtrl loaded');

            //分页对象
            $scope.pagination = {
                totalItems:0,
                pageIndex:1,
                pageSize:2,
                maxSize:8,
                numPages:4,
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            $scope.searchInformationSent("",$scope.pagination,"");

        };
        init();
    }]);
});