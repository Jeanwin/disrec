define(['app',
    'config',
    'common/directives/ip',
    'common/directives/mac'
], function (app, config) {
    app.registerController('VersionCtrl', ['$scope','$modal','$location','$upload','growl','FacilityService' ,'TacticsService',
        '$http', '$filter', 'TreeService','$timeout',
        function ($scope,$modal,$location,$upload,growl,FacilityService ,TacticsService,$http, $filter,TreeService,$timeout) {

        $scope.versionList = function(uploadTime,pagination, user){
            var keywords = {
                    "createDate":uploadTime
                };
            FacilityService.versionList(keywords,$scope.pagination,user).then(
                function(data){
                    console.log(data.data);
                    $scope.versionlists = data.data;
                     $scope.pagination.totalItems = data.total;
                    // return data.data;
                },
                function(code){
                }
            );
        }
        //根据时间查找版本信息
        $scope.searchVersionInfo = function(searchUploadTime){
        	$scope.versionList(searchUploadTime,$scope.pagination,"");
        }
	      //根据页码查询
	        $scope.onSelectPage = function(pageIndex){
	            if(!pageIndex){
	                growl.addErrorMessage("此页码不存在");
	            }
	            $scope.pagination.pageIndex = pageIndex;
	            var _pagination = angular.copy($scope.pagination);
	            if(angular.isDefined(_pagination.pageIndex.pageIndex)){
	                _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
	            }
//	            if($scope.selectfacility === '1'){
//	                $scope.versionList(); //调用查询接口
//	            }else{
//	                $scope.versionlists = '';
	                $scope.versionList(); //调用查询接口
//	            }
	
	        };
        
        //上传安装包 弹框
         $scope.uploadVersion = function (data) {
            var modalInstance = $modal.open({
                templateUrl: 'classrooms/version/classrooms.upload.modal.html',
                backdrop:'static',
                controller: UploadVersionCtrl,
                resolve: {
                    // ve rsionData: function () {
                       
                    //     return data;
                    // }
                }
            }).result.then(
                function(){
                  $scope.versionList("", $scope.pagination,"");
              }
            );
        };
        var UploadVersionCtrl = function ($scope, $modalInstance,$location,growl) {
            $scope.file ;
            $scope.onFileSelect = function($files) {
                $scope.file = $files;
                if($scope.file.length !== 2){
                	growl.addErrorMessage('必须上传两个文件');
               	 	$scope.file = null;
                    return false;
                }
                $scope.firstName = $scope.file[0].name.split(".")[0];
                $scope.secondName = $scope.file[1].name.split(".")[0];
                var suffix1 = $scope.file[0].name.split(".")[$scope.file[0].name.split(".").length - 1];
                var suffix2 = $scope.file[1].name.split(".")[$scope.file[1].name.split(".").length - 1];
                
                 if($scope.file[0].name.split(".")[0] !== $scope.file[1].name.split(".")[0]){
                	 growl.addErrorMessage('两个文件名必须相同且后缀分别为zip和txt');
                	 $scope.file = null;
                     return false;
                 }
                 if(!(suffix1 == 'zip' || suffix1 == 'txt')) {
                     growl.addErrorMessage('仅限zip与txt格式');
                     $scope.file = null;
                     return false;
                 }
                 if(!(suffix2 == 'zip' || suffix2 == 'txt')) {
                     growl.addErrorMessage('仅限zip与txt格式');
                     $scope.file = null;
                     return false;
                 }
//                 if($scope.file[1].type !== 'text/plain') {
//                     growl.addErrorMessage('请上传txt文件');
//                     $scope.file[1] = null;
//                     return false;
//                 }
            }
            //上传
            $scope.importVersion = function(data){

                var url = config.backend.ip + config.backend.base + 'areaView/upload';

                $scope.upload = $upload.upload({
                    url: url,
                    file: $scope.file
                }).progress(function(evt) {
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('percent: ' + $scope.progress);
                }).success(function(data, status, headers, config) {
                    if(data == "true"){
                        growl.addSuccessMessage("上传成功");
                        $modalInstance.close(true);
                        return true;
                    }else{
                        growl.addErrorMessage("上传失败");
                        $modalInstance.close(true);
                    }
                     
                }).error(function(){
                    growl.addErrorMessage("上传失败");
                });
            };
            //取消
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }

            

       

        var init = function(){
            
            
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_classrooms_version_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++教室设置  您没有权限+++++++++");
                $location.path('classrooms/tactics');
            };
            $scope.$parent.active = 4;
          //分页对象
            $scope.pagination = {
                totalItems:0,
                pageIndex:1,
                pageSize:50,
                maxSize:8,
                numPages:4,
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            $scope.versionList("",$scope.pagination,"");
            


        };

           
        init();
      }]);
});
