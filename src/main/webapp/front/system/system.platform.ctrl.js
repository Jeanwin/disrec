define(['app','config'], function (app,config) {
    app.registerController('SystemPlatFormCtrl', ['$scope','$modal', 'growl','$location','SystemService','$upload' , '$timeout',function ($scope,$modal, growl,$location,SystemService,$upload,$timeout) {
        
    	$scope.onFileSelect = function($files) {

            $scope.file = $files[0];

            if($files.length > 1) {
                growl.addSuccessMessage('一次只能上传一个文件');
            }

            if($scope.file.type.indexOf('image') < 0) {
                growl.addErrorMessage('请上传图片文件');
                $scope.file = null;
                return false;
            }

            var fileReader = new FileReader();
            fileReader.readAsDataURL($scope.file);
            var loadFile = function(fileReader) {
                fileReader.onload = function(e) {
                    $timeout(function() {
                		$scope.plateForm.uintPictureurl = e.target.result;
                		$scope.imgCheck.flag = true;
                    },1000);
                }
            }(fileReader);
            
            $scope.progress = -1;
            if ($scope.uploadRightAway) {
                $scope.save();
            }
        };
        $scope.onFileSelect1 = function($files) {

            $scope.file1 = $files[0];

            if($files.length > 1) {
                growl.addSuccessMessage('一次只能上传一个文件');
            }

            if($scope.file1.type.indexOf('image') < 0) {
                growl.addErrorMessage('请上传图片文件');
                $scope.file1 = null;
                return false;
            }

            var fileReader = new FileReader();
            fileReader.readAsDataURL($scope.file1);
            var loadFile = function(fileReader) {
                fileReader.onload = function(e) {
                    $timeout(function() {
                        $scope.plateForm.desktopPictureurl = e.target.result;
                    },1000);
                }
            }(fileReader);
            
            $scope.progress = -1;
            if ($scope.uploadRightAway) {
                $scope.save();
            }
        };
         $scope.sumit = function () {
                /*SystemService.plateForm($scope.plateForm).then(
                    function(data){
                        if(data >0){
                            growl.addSuccessMessage("平台信息添加成功！");
                            $modalInstance.close(true);
                        }else{
                            growl.addErrorMessage("平台信息添加失败！");
                        }
                    },
                    function(){

                    }
                );*/
        	 $scope.files = [];
        	 if($scope.file){
        		 $scope.files.push($scope.file);
        	 }
        	 if($scope.file1){
        		 $scope.files.push($scope.file1);
        	 }
        	 if($scope.files.length > 0) {
                 var url = config.backend.ip + config.backend.base + 'plateForm/save';
                 var data =  $scope.plateForm;
                 $scope.upload = $upload.upload({
                     url: url,
                     method: 'POST',
                     data: data,
                     file: $scope.files
                 }).progress(function (evt) {
                     $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                 }).success(function (data, status, headers, config) {
                     growl.addSuccessMessage("修改成功！");
                 }).error(function () {
                     $scope.error = true;
                 });
             }else{
            	 var data = {
                		 desktopName:$scope.plateForm.desktopName,
                		 unitName:$scope.plateForm.unitName
                 }
                 SystemService.plateForm(data).then(
                     function(data){
                         if(data >0){
                             growl.addSuccessMessage("保存成功！");
                             $modalInstance.close(true);
                         }else{
                             growl.addErrorMessage("保存失败！");
                         }
                     },
                     function(){

                     }
                 );
             }
         };

       //获取标志
	        var getLog = function(){
	        	SystemService.getPlateForm().then(
	                    function(data){
	                        console.log(data);
	                        $scope.logoInfo = data[0];
	                        $scope.plateForm = data[0];
	                    },
	                    function(code){
	                        return [];
	                    }
	               )
	        }
	        
        var init = function(){

            $scope.file;
            getLog();
            $scope.plateForm = {
                "url" : ""
            };
            $scope.imgCheck = {
                "flag" : false
            };

            $scope.$parent.active = 8;
            if($scope.global.user.authenticatid.indexOf('auth_system_platform_url_view') === -1){
                console.log("+++++++数据字典  您没有权限+++++++++")
                $location.path('dashboard');
            };
        };
        init();
      }]);
});