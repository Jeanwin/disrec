define(['app'], function (app) {
    app.registerController('KernCtrl', ['$scope','$modal' , function ($scope,$modal ) {

        //关于系统
        $scope.kernModal = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'kern/list/termSet.add.modal.html',
                controller: KernModalCtrl,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };

        var KernModalCtrl = function ($scope, $modalInstance, items) {

            $scope.ok = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        var init = function(){
            $scope.$parent.active = 1;
        };

        init();
      }]);
});
