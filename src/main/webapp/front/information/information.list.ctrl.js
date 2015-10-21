define(['app',
    'config'
], function (app,config) {
    app.registerController('InformationListCtrl', ['$scope','$modal','$location','growl','InformationService' ,
        function ($scope,$modal,$location,growl,InformationService) {


        //点击删除消息图标弹出弹出框
        $scope.openDeleteInformationModal = function (information) {
//                alert(information.id);
            var modalInstance = $modal.open({
                templateUrl: 'information/modal/information.delete.modal.html',
                backdrop:'static',
                controller: DeleteInformationModalCtrl,
                resolve: {
                    information: function () {
                        return information;
                    }
                }
            }).result.then(
                function(){
                    $scope.searchInformations("",$scope.pagination,"");
                }
            );
        };
        //点击删除消息图标弹出弹出框--控制器
        var DeleteInformationModalCtrl = function ($scope, $modalInstance,growl, information) {
            console.log(information,"这里是消息");
            $scope.information = angular.copy(information);
            $scope.ok = function () {
                InformationService.DeleteInformation(information).then(
                    function(data){
                        if(data>0){
                            growl.addSuccessMessage("删除成功");
                        }else{
                            growl.addErrorMessage("删除失败");
                        }
                        $modalInstance.close();
                    },function(){

                    }
                )
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        //根据页码查询--最外层
        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
            }
            $scope.searchInformations("",_pagination,""); //调用查询接口
            console.log("*********","");
        };

        //Json消息----最外层
        $scope.searchInformations=function(keywords,pagination,user){
            console.log("进入information得值的服务109");
            InformationService.informationes(keywords,pagination,user).then(
                function(data){
                    if(data.total > 0){
                        $scope.informationList=data.data;
                        $scope.pagination.totalItems = data.total;
                        $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                    }else{
                        $scope.informationList =[];
                        $scope.growl("未查找到相关信息",'error');
                    }
                },
                function(code) {
                    throw(code);
                }
            );
        };


        $scope.$parent.mainactive = 9;

        var init = function(){
            console.log('InformationListCtrl loaded');


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
            $scope.searchInformations("",$scope.pagination,"");

            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_information_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++课程巡视  您没有权限+++++++++")
//                window.location.href("login");
                $location.path('dashboard');
            };
        };
        init();
    }]);
});