define(['app'], function (app) {
    app.registerController('CourseTourMainCtrl', ['$scope','$modal' , function ($scope,$modal) {
        $scope.coursetouropen = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'coursetour/coursetourmain/coursetourmain.html',
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
            $scope.save = function () {
                $modalInstance.close();
            };
        };

        var init = function(){

        };

        init();
    }]);
});