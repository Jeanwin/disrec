define(['app'], function (app) {
    app.registerController('BindingMainCtrl', ['$scope','$modal',
                                function ($scope,$modal) {
        //绑定邮箱弹出框--最外层
        $scope.openBindingModel = function () {
            console.log("打开绑定邮箱弹窗");
            var modalInstance = $modal.open({
                templateUrl: 'binding/binding.model.html',
                backdrop:'static',
                controller: BindingModalCtrl,
                resolve: {

                }
            }).result.then(
                function(){

                }
            );
        };
        //视频设置弹出框--控制器--最外层
        var BindingModalCtrl = function ($scope,$modalInstance) {

            $scope.ok = function () {

            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };


        var init = function(){

        };
            init();
        }]);
});
