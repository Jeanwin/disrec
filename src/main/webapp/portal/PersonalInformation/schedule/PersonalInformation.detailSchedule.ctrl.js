define(['app','config'], function (app,config) {
    app.registerController('PersonalInformationDetailCtrl', ['$scope','$modal','growl','TreeService' , function ($scope,$modal,growl,TreeService) {


        //初始化加载树
        var userTrees = function(keywords){
            TreeService.systemTree(keywords).then(
                function(data){
                    $scope.areaTree = data;
                },
                function(){

                }
            );
        };
        //editcontent
        $scope.editcontent = function(index){
            $scope.editconditionpencil = index;
        }
        //学生是否可见
        $scope.visibility = function(){
            $scope.visibilityModal = !$scope.visibilityModal;
        };
        $scope.visibility1 = function(){
            $scope.visibilityModal1 = !$scope.visibilityModal1;
        };
        //是否收藏视频资源
        $scope.collectShow = function(){
            $scope.collectShowModal = !$scope.collectShowModal
        };
        //鼠标移上去的时候出现操作按钮
        $scope.showOperation = function(){
            $scope.showOperationmodal = true;
        };
        //鼠标离开的时候隐藏操作按钮
        $scope.hiddenOperation = function(){
            $scope.showOperationmodal = false;
        };
        //新建文件弹框界面
        $scope.AddFileDoc = function(){
            var modalInstance = $modal.open({
                templateUrl: 'PersonalInformation/schedule/PersonalInformation.AddFileDoc.Modal.html',
                backdrop:'static',
                controller: AddFileDocModalCtrl,
                resolve: {
                    Tree:function(){
                        return $scope.areaTree
                    }
                }
            }).result.then(
                function(data){
                }
            );
        };
        var AddFileDocModalCtrl = function($scope,$modalInstance,growl,Tree){
            $scope.areaTree = Tree;
            $scope.uploadingModal = false;
            $scope.ImportDataModal = true;

            //导入资料
            $scope.ImportData = function(){
                $scope.ImportDataModal = true;
                $scope.uploadingModal = false;
            };
            //上传
            $scope.uploading = function(){
                $scope.uploadingModal = true;
                $scope.ImportDataModal = false;
            };

            $scope.dropSupported = true;
            $scope.file;
            $scope.progress = -1;
            $scope.upload;
            $scope.error = false;
            $scope.uploadRightAway = false;

            $scope.onFileSelect = function($files) {
                $scope.showImportok = false;

                $scope.file = $files[0];

                if($files.length > 1) {
                    growl.addSuccessMessage('一次只能上传一个文件');
                }

                if($scope.file.type !== 'application/vnd.ms-excel') {
                    growl.addErrorMessage('请上传excel文件');
                    $scope.file = null;
                    return false;
                }
                $scope.progress = -1;
                if ($scope.uploadRightAway) {
                    $scope.startUpload();
                }

            };

            $scope.cancel = function(){
                $modalInstance.close();
            };
        };


        var init = function(){
            $scope.collectShowModal = false;
            $scope.visibilityModal1 = false;
            $scope.visibilityModal = false;
            $scope.showOperationmodal = false;

            userTrees('trees');
        };

        init();
      }]);
});
