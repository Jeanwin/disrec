define(['app','config'], function (app,config) {
    app.registerController('ResourceReleasedCtrl', ['$scope','$interval','$modal','$filter','$location','$timeout','growl','ResourceService' , function ($scope,$interval,$modal,$filter,$location,$timeout,growl,ResourceService) {

        //查询数据时执行的方法--最外层
//        $scope.issuedResource=function(){
//            var condition=angular.copy( $scope.releasedResource);
//            $scope.resourceReleaseds(condition,$scope.pagination,'');
//        };
    	$scope.openVideoState = function(status,floder,index){
    		
    		ResourceService.demand(floder,status).then(
                    function(data){
                    	if(data.status != '4' && data.status != '3'){
                            
                    		$scope.videoList[index].status = data.status;
                    	}
                    	$scope.privateStatus = data.status;
                    },
                    function(code){
                        return [];
                    }
               )
           $timeout(function(){
                if($scope.privateStatus == 3 || $scope.privateStatus == 4){
                    growl.addErrorMessage("转码队列已满或服务异常，请稍后再试!");
                 }
                if($scope.privateStatus == 0){
                        growl.addErrorMessage("转码已开启，预计2-10分钟完成!");
                   }
            },800)
    	}
    	//小于10M的资源不能进入点播页面
        $scope.openClickVideo = function(para){
    		 var modalInstance = $modal.open({
                 templateUrl: 'resource/video/resource.clickVideo.modal.html',
                 backdrop:'static',
                 controller: openClickVideoCtrl,
                 resolve: {
                     para: function () {
                         return para;
                     }
                 }
             }).result.then(
             );
        }
    
    	//小于10M的资源不能进入点播页面-控制器
       var openClickVideoCtrl = function ($scope,$modalInstance,para){
    	   $scope.para = para;
    	   $scope.ok = function(){
    		   $modalInstance.dismiss(true);
    	   }
       }
       
        //把$scope.hideAdvancedSearch做个联动
        $scope.$watch('hideAdvancedSearch',function(){
            if($scope.hideAdvancedSearch){
                $scope.releasedResource.username='';
                $scope.releasedResource.startdate='';
                $scope.releasedResource.enddate='';
                $scope.releasedResource.areaname='';
            }else{
                $scope.releasedResource.resourcename='';
            }
        });

        //定义查询数据于前台文本框做关联查询数据
        $scope.releasedResource={
            "resourcename":'',
            "username":'',
            "startdate":'',
            "enddate":'',
            "areaname":''
        };

//--最外层-设置按钮  弹出框
        $scope.openReleased = function (released) {
            var modalInstance = $modal.open({
                templateUrl: 'resource/released/resource.released.modal.html',
                backdrop:'static',
                controller: ReleasedModalCtrl,
                resolve: {
                    released: function () {
                        return released;
                    }
                }
            }).result.then(
                function(){
                    $scope.resourceReleaseds('',$scope.pagination,'');
                }
            );
        };
//--最外层-设置按钮  弹出框控制器
        var ReleasedModalCtrl = function ($scope, $modalInstance,growl, released) {
            $scope.released=angular.copy(released);
            $scope.updateReleased = function(){
                /*then在serve中调用完了用来执行返回的值，真就执行data假就执行code*/
                ResourceService.updateReleased($scope.released).then(
                    function(data){
                        console.log("回调updateReleased执行成功以后");
                        if(angular.isDefined(data)){
                                var url = "/resource/released";
                            growl.addSuccessMessage("设置成功");
//                            init();
//                            $location.path(url);
                            $modalInstance.close();
                        }else
                            growl.addSuccessMessage("信息设置失败");
                        console.log(data);
                    },
                    function(code){
                        //处理失败后操作
                        alert("设置失败!");
                    }
                );
            };

        $scope.ok = function () {
            $scope.updateReleased();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };


        //Json资源管理--已发布资源-最外层
        $scope.resourceReleaseds=function(select){
            $scope.selectreleased = select;
            ResourceService.resourceReleaseds($scope.releasedResource,$scope.pagination,'').then(
                function(data){
                    if(data.total > 0){
                        $scope.releasedList=data.data;
                        $scope.pagination.totalItems=data.total;
                        $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                    }else{
                        $scope.releasedList =[];
                        $scope.growl("未查找到相关信息",'error');
                    }
                },
                function(code) {
                    throw(code);
                }
            );
        };

        //打开取消发布窗口--最外层
        $scope.openCancelReleasedModal=function(){
            var modalInstance=$modal.open({
                templateUrl:'resource/released/resource.released.Cancel.html',
                backdrop:'static',
                controller: CancelReleasedModalCtrl,
                resolve:{
                    selectedItems:function(){
                        return $scope.selectedItems;
                    }
                }
            }).result.then(
                function(){
                    $scope.resourceReleaseds('',$scope.pagination,'');
                })
        };

        //Cancel取消发布状态.released弹窗的控制器--最外层
        var CancelReleasedModalCtrl=function($scope, $modalInstance,selectedItems,ResourceService){
            $scope.selectedItems=selectedItems;

            $scope.ok=function(selectedItems){
                $scope.CancelReleaseds($scope.selectedItems,{});
            };
            $scope.cancel=function(){
                $modalInstance.dismiss('cancel');
            };


            //连接后台数据服务
            $scope.CancelReleaseds=function(selectedItems,user) {
                console.log("调用取消发布状态released的服务");
                ResourceService.CancelReleaseds(selectedItems, user).then(
                    function (data) {
                        if (angular.isDefined(data)) {
                            $modalInstance.close();
                        } else
                            alert("操作失败!");
                    },
                    function (code) {
                        //处理失败后操作
                        alert(selectedItems);
                        alert("操作失败!");
                    }
                )
            }
        };

        //删除released弹窗
        $scope.openDeleteReleasedModal=function(){
            var modalInstance=$modal.open({
                templateUrl:'resource/released/resource.released.delete.html',
                backdrop:'static',
                controller: DeleteReleasedModalCtrl,
                resolve:{
                    selectedItems:function(){
                        return $scope.selectedItems;
                    }
                }
            }).result.then(
                function(){
                    $scope.resourceReleaseds('',$scope.pagination,'');
                })
        };

        //delete.released弹窗的控制器
        var DeleteReleasedModalCtrl=function($scope, $modalInstance,selectedItems,growl,ResourceService){
            $scope.selectedItems=selectedItems;

            $scope.ok=function(selectedItems){
                    $scope.deleteReleaseds($scope.selectedItems,{});
            }
            $scope.cancel=function(){
                $modalInstance.dismiss('cancel');
            }


            //连接后台数据服务
            $scope.deleteReleaseds=function(selectedItems,user) {
                console.log("调用删除released的服务");

                ResourceService.deleteReleaseds(selectedItems, user).then(
                    function (data) {
                        if (angular.isDefined(data)) {
                            growl.addSuccessMessage("删除成功");
                            $modalInstance.close();
                        } else
                            growl.addSuccessMessage("删除失败");
                            console.log(data);
                    },
                    function (code) {
                        //处理失败后操作
                        alert(selectedItems);
                        alert("删除失败!");
                    }
                )
            }
        };

        /*全选按钮的命令*/
           $scope.checkAllResource=function(){
               if($scope.releasedList.length>0){
               $scope.checkAll=!$scope.checkAll;
               $.each($scope.releasedList,function(index,released){
                   released.checked=$scope.checkAll;
               });
               }
           };
            //定义接收选中项变量
             $scope.selectedItems=[];
            $scope.$watch('releasedList',function(){
                $scope.selectedItems=$filter('filter')($scope.releasedList,{checked:true});
                $scope.selectedCount= $scope.selectedItems.length;
                if($scope.selectedCount===$scope.releasedList.length && $scope.releasedList.length>0){
                    $scope.checkAll=true;
                }else{
                    $scope.checkAll=false;
                }
            },true);
        //根据页码查询
        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
            }
            if($scope.selectreleased ==='1'){
                $scope.resourceReleaseds($scope.releasedResource,$scope.pagination,''); //调用查询接口
            }else{
                $scope.releasedResource = '';
                $scope.resourceReleaseds($scope.releasedResource,$scope.pagination,''); //调用查询接口
            }

        };
        $scope.orderby = function(order){
            if($scope.sort[order] === 'asc'){
                $scope.sort[order] = 'desc';
            }
            else{
                $scope.sort[order] = 'asc';
            }
            $scope.pagination.sort=$scope.sort[order];
            $scope.pagination.order=order;
            $scope.resourceReleaseds(); //调用查询接口
        };
//--进入页面  初始化  最外层
        var init = function(){
            $scope.checkAll=false;
            $scope.$parent.active = 3;
            $scope.releasedList=[];
            $scope.hideAdvancedSearch = true;
            $scope.sort = {
            		"resourcename":"asc",
            		"username":"asc",
            		"publishdate":"asc",
            		"resourcetype":"asc"
            }

            //分页对象
            $scope.pagination = {
                totalItems:0,
                pageIndex:1,
                pageSize:10,
                maxSize:8,
                numPages:4,
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText,
                order:"",
                sort:""
            };

            $scope.resourceReleaseds('',$scope.pagination,'');
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_resource_released_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++已发布资源  您没有权限+++++++++");
                //没有权限的话，跳转到下一个功能块
                $location.path('resource/myresource');
            };
             //每隔30秒请求一次，将转码中变为播放状态
          $interval(function(){
                $.each($scope.releasedList,function(i,video){
                    var status = video.status;
                    if (status == '0') {
                        ResourceService.demand(status).then(
                            function(data){
                                if(data.status == '1'){
                                    
                                    $scope.releasedList[i].status = data.status;
                                }
                            },
                            function(code){
                                return [];
                            }
                        )
                     }
                })

                //销毁定时转码请求定时器
                var timeoutVideo =$timeout(function(){
                    $.each($scope.releasedList,function(i,video){
                        var status = video.status;
                        if (status != '1') 
                        {
                            isCancel = true;
                        }
                    })
                    if(isCancel == false){
                        $interval.cancel(timer);
                        $timeout.cancel(timeoutVideo);
                    }
                },2000)
            },30000)
        };

        init();
    }]);
});
