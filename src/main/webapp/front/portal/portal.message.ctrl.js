define(['app',
    'config'
], function (app,config) {
    app.registerController('PortalMessageCtrl', ['$scope' ,'$modal','$upload', function ($scope,$modal,$upload) {


        //--最外层 打开资源上传，批量上传删除界面的弹窗
        $scope.openUpLogoModal=function(){
            console.log("打开资源上传，批量上传删除界面的弹窗");
            var modalInstance = $modal.open({
                templateUrl: 'portal/message/portal.uplogo.html',
                controller: UploadLogoModalCtrl,
                resolve: {
                    selectedItems: function () {
                        return $scope.selectedItems;
                    }
                }
                /*打开完以后可以加result.then来执行窗口关闭以后的刷新*/
            }).result.then(
                /* 窗口关闭以后执行的方法*/
                function(){
                    console.log("关闭upload删除窗口以后执行的刷新代码21");
                }
            );
        };
        // 批量上传控制器--最外层
        var UploadLogoModalCtrl=function($scope, $modalInstance, selectedItems,growl){
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.onFileSelect = function($files) {
                $scope.file =  $files;
                alert( $scope.file);
                $.each($scope.file,function(index,fils){
                    console.log(fils);
                });

                /*    if ($files.length > 1) {
                 growl.addSuccessMessage('一次只能上传一个文件');
                 }*/

//                if($scope.file.type.indexOf('officedocument.spreadsheet') < 0) {
//                    growl.addErrorMessage('请上传excel文件');
//                    $scope.file = null;
//                    return false;
//                }
                $scope.progress = -1;
                if ($scope.uploadRightAway) {
                    $scope.startUpload();
                }
            };

            $scope.startUpload = function () {

                var url = config.backend.ip + config.backend.base + 'rest/curriculum/curriculum/import';

                $scope.upload = $upload.upload({
                    url: url,
                    data: $scope.impScheduleSet,
                    file: $scope.file
                }).progress(function(evt) {
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('percent: ' + $scope.progress);
                }).success(function(data, status, headers, config) {
                    console.log(data);
                    $modalInstance.close();
                }).error(function(){
                    $scope.error = true;
                });
            };
        };



        var init = function(){
            $scope.$parent.active = 0;
        };

        init();
    }]);
});
