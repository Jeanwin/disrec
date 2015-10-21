define(['app',
    'angularFileUpload'
], function (app) {
    'use strict';

    app.registerController('DashboardCtrl', ['$scope','$modal','SystemService', function ($scope,$modal,SystemService) {
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
        
        //获取标志
        var getLog = function(){
        	SystemService.getPlateForm().then(
                    function(data){
                        console.log(data);
                    },
                    function(code){
                        return [];
                    }
               )
        }
        
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

//    $scope.users = [{userName:'新消息'},{userName:'系统通知'}];

//        $(document).ready(function(){
//            $(".click-btn").click(function(){
//                $(this).siblings().addClass("round");
//            });
//        });
//
//
    $scope.$parent.mainactive = 1;
    var init = function(){
    	getLog();

    };

    init();
  }]);

});