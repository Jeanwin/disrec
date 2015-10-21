define(['app'], function (app) {
    app.registerController('ScheduleManagementsEditCtrl', ['$scope','$modal' , function ($scope,$modal) {


        //导入按钮
        $scope.impModal = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'scheduleManagements/addschedule/error/schedule.error.modal.html',
                controller: ImpModalCtrl,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };

        var ImpModalCtrl = function ($scope, $modalInstance, items) {

            $scope.ok = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

            var init = function(){
                $scope.$parent.active = 2;
            };

            init();
        }]);
});
