define(['app','config'], function (app,config) {
    app.registerController('ResourceImageCtrl', ['$scope','$modal','$filter','$location','ResourceService' , function ($scope,$modal,$filter,$location,ResourceService) {
        //实例--图片设置
        $scope.openImage = function (image) {
            var modalInstance = $modal.open({
                templateUrl: 'resource/image/resource.release.modal.html',
                backdrop:'static',
                controller: ImageModalCtrl,
                resolve: {
                    image: function () {
                        return image;
                    }
                }
//                controller: function($scope, $modalInstance){
//                    $scope.cancel = function () {
//                        $modalInstance.dismiss('cancel');
//                    };
//                }
            }).result.then(
                /*关闭弹出的设置窗口*/
                function(data){
                    $scope.resourceimages("",$scope.pagination,"");
                }
            )
        };

        //图片设置
        /*$scope.openImage = function (image) {
            var modalInstance = $modal.open({
                templateUrl: 'resource/image/resource.release.modal.html',
                controller: ImageModalCtrl,
                resolve: {
                    image: function () {
                        return image;
                    }
                }
            }).result.then(
                *//*关闭弹出的设置窗口*//*
                function(data){
                    $scope.resourceimages("",$scope.pagination,"");
                }
            )
        };*/


        //图片设置控制器
        var ImageModalCtrl = function ($scope, $modalInstance,image,growl,ResourceService) {
            $scope.image=angular.copy(image);

            $scope.ok = function () {
                $scope.updateImage($scope.image)
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.updateImage=function(selectedItems){
                console.log("调用修改Image的服务");
                ResourceService.updateImage($scope.image).then(
                    function(data){
                        console.log("修改image中的服务回调成功60");
                        if(angular.isDefined(data)){
                            var url = "/resource/image";
                            growl.addSuccessMessage("设置成功");
//                            init();
//                            $location.path(url);
                            $modalInstance.close();
//                            alert("修改成功");
//                            $modalInstance.close();
                        }else
                            growl.addSuccessMessage("信息设置失败");
                        console.log(data);
                    },
                    function(code){
                        //处理失败后操作
                        alert("修改失败!");
                    }
                )
            }
        };
        //图片名称弹框
        $scope.openImageName = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'resource/image/resource.imagenameopen.modal.html',
                controller: ModalInstanceCtrl,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };

        //Json资源管理--图片资源
        $scope.resourceimages=function(select){
            $scope.selectimage = select;
            console.log("进入resourceimage服务");
            ResourceService.resourceImage($scope.imageResource,$scope.pagination,"").then(
                function(data){
                    console.log("resourceimage服务回调成功给数据赋值");
                    if(data.total > 0) {
                        $scope.imageList = data.data;
                        console.log($scope.pagination,"图片资源的分页信息");
                        $scope.pagination.totalItems =  data.total;
                    }else{
                        $scope.imageList =[];
                        $scope.growl("未查找到相关信息",'error');
                    }
//                    $scope.imageList=data;
            },
                function(){

                }
            );
        };

        //删除按钮弹窗
        $scope.openDeleteImageModal=function(){
            var modalInstance=$modal.open({
                templateUrl:'resource/image/resource.image.delete.html',
                backdrop:'static',
                controller: DeleteImageModalCtrl,
                resolve:{
                    selectedItems:function(){
                        return $scope.selectedItems;
                    }
                }
            }).result.then(
                function(){
                    $scope.resourceimages("",$scope.pagination,"");
                })
        }
        //删除按钮弹窗控制器
        var DeleteImageModalCtrl=function($scope,$modalInstance,selectedItems,growl,ResourceService){
            $scope.selectedItems=selectedItems;
            $scope.ok=function(){
                $scope.deleteImages($scope.selectedItems,{});
            }
            $scope.cancel=function(){
                $modalInstance.dismiss('cancel');
            }

            $scope.deleteImages=function(selectedItems,user){
                console.log("调用img删除后台");
                ResourceService.deleteImages(selectedItems,user).then(
                    function(data){
                        if(angular.isDefined(data)){
                            growl.addSuccessMessage("删除成功");
                            $modalInstance.close();
                        }else
                            growl.addSuccessMessage("***删除失败");
//                            alert("删除失败****!");
                            console.log(data);
                    },
                    function(code){
                        //处理失败后操作
                        alert("**删除失败!");
                    }
                )
            }
        }

        //根据页码查询
        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
            }
            if($scope.selectimage ==='1'){
                $scope.resourceimages($scope.imageResource,_pagination,""); //调用查询接口
            }else{
                $scope.imageResource = '';
                $scope.resourceimages($scope.imageResource,_pagination,""); //调用查询接口
            }
        };

        //全选按钮
        $scope.checkAllimage=function(){
            if($scope.imageList.length>0){
            $scope.checkAll=!$scope.checkAll;
            $.each($scope.imageList,function(index,image){
                image.checked=$scope.checkAll;
            })
            }
        }
        $scope.selectedItems=[];
        $scope.$watch('imageList',function(){
            $scope.selectedItems=$filter('filter')($scope.imageList,{checked:true});
            $scope.selectedCount=$scope.selectedItems.length;
            if($scope.selectedCount===$scope.imageList.length && $scope.imageList.length>0){
                $scope.checkAll=true;
            }else{
                $scope.checkAll=false;
            }

        },true);

        //查询数据时执行的方法
//        $scope.inquire=function(){
//            var condition=angular.copy( $scope.imageResource);
//            $scope.resourceimages(condition,$scope.pagination,"");
////        }
        //把$scope.hideAdvancedSearch做个联动
        $scope.$watch('hideAdvancedSearch',function(){
            if($scope.hideAdvancedSearch){
                $scope.imageResource.username='';
                $scope.imageResource.areaname='';
                $scope.imageResource.startdate='';
                $scope.imageResource.enddate='';
            }else{
                $scope.imageResource.name='';
            }
        });
        $scope.imageResource={
            "name":'',
            "username":'',
            "areaname":'',
            "startdate":'',
            "enddate":''
        }
        var init = function(){
            $scope.selectimage = '';
            //定义全选按钮为未选中状态
            $scope.checkAll=false;
            $scope.$parent.active = 2;
            $scope.imageList=[];
            $scope.hideAdvancedSearch = true;
            //对象
            $scope.pagination = {
                totalItems:0,
                pageIndex:1,
                pageSize:10,
                maxSize:8,
                numPages:4,
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };
            $scope.resourceimages("",$scope.pagination,"");
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_resource_image_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++图片资源  您没有权限+++++++++")
                $location.path('resource/released');
            };
        };
        init();
    }]);
});
