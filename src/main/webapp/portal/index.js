define(['app'], function (app) {
    app.registerController('SystemImpowerCtrl', ['$scope','$modal', function ($scope,$modal) {
        $scope.systemopen = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'system/impower/system.impower.modal.html',
                controller: ModalInstanceCtrl,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };
        var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
//            $scope.items = items;
//            $scope.selected = {
//                item: $scope.items[0]
//            };
            $scope.ok = function () {
                $modalInstance.close();
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