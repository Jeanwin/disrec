define(['app'], function (app) {
    app.registerController('LoginMainCtrl', ['$scope','$modal','growl','PermissionsService',
                                function ($scope,$modal,growl,PermissionsService) {


            //下拉列表里的背景色
//            $scope.setColor = function(mode) {
//                $scope.ColorMode = mode;
//                $.each($scope.ColorMode, function(index, color){
//                    return color;
//                    if(color === 'setColor'){
//                        $scope.ColorMode = '!setColor'
//                    };
//                });
//            };
            $scope.setColor = function(mode,data) {
                $scope.ColorMode = mode;
                $scope.autoMessageArray = data;
                $.each($scope.autoMessageArray, function(index, color){
//                                return color;
                    if(color.value === typeValue.value){
                        $scope.ColorMode = false;
//                        $scope.ColorMode = '!setColor'
                    }else{
                        $scope.ColorMode = true;
                    };
                });
            };

        //--最外层 立即登录
        $scope.openPermissionsModal=function(){
            console.log("权限************");
            var modalInstance = $modal.open({
//                templateUrl: 'resource/upload/resource.upload.modal.html',
                backdrop:'static',
                controller: PermissionsModalCtrl,
                resolve: {

                }
            }).result.then(
                function(){
                    console.log("关闭窗口以后执行的刷新代码21");
                }
            );
        };
        // 批量上传视频控制器--最外层
        //--最外层 立即登录控制器--最外层
        var PermissionsModalCtrl=function($scope, $modalInstance, PermissionsService,growl){
            $scope.permissions = function(userList, user){
                PermissionsService.permission(userList,user).then(
                    function(data){
                        $scope.getUser = data;
                        console.log('通过后台接口获取权限接口');
//                        $.each($scope.areaTree,function(index,tree){
//                            $scope.selectOnetree(tree);
//                        })
                    },
                    function(){
                    }
                );
            };
        };

//权限初始化
        $scope.permissions = function(keywords){
            PermissionsService.permission(keywords).then(
                function(data){
                    $scope.getUser = data;
                    console.log('**********通过后台获取权限接口*********');
                    console.log(data);
                },
                function(){
                }
            );
        };

        var init = function(){
            //初始化权限
            $scope.permissions();

        };
        init();
    }]);
});
