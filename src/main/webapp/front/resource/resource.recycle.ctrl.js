define(['app','config'], function (app,config) {
    app.registerController('ResourceRecycleCtrl', ['$scope','$modal','$filter','$location','growl','ResourceService' ,'CodeService', 'TacticsService','$timeout','$interval',function ($scope,$modal,$filter,$location,growl,ResourceService,CodeService,TacticsService,$timeout,$interval) {
    	//开启点播状态
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
                    growl.addSuccessMessage("转码已开启，预计2-10分钟完成!");
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
    	
    	//视频设置弹出框--最外层
        $scope.openVideoSetModel = function (video) {
            console.log("打开video中的设置弹窗");
            var modalInstance = $modal.open({
                templateUrl: 'resource/video/resource.video.modal.html',
                backdrop:'static',
                controller: VideoSetModalCtrl,
                resolve: {
                    video: function () {
                        return video;
                    }
                }
            }).result.then(
                function(){
                    $scope.resourcevideos("",$scope.pagination,"");
                }
            );
        };
        
        
        //视频设置弹出框--控制器--最外层
        var VideoSetModalCtrl = function ($scope,$modalInstance,video,growl,ResourceService) {
        	$scope.successSave = false;
            $scope.video = angular.copy( video || {name:''});
//            $scope.editingMode = video? true:false;

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            $scope.updateVideos=function(){
                console.log("调用修改videos的服务");
                ResourceService.updateVideos($scope.video).then(
                    function(data){
                        console.log("修改videos中的服务回调成功60");
                        if(angular.isDefined(data)){
                            var url = "/resource/video";
                            growl.addSuccessMessage("设置成功");
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
            //从下拉框中获取选择教师信息（1）
            $scope.selectTeacher = function() {
                var tmp = $scope.video.username.split(',');
                $scope.video.userid = tmp[0];
                $scope.video.username = tmp[1];
            };
            //TODO:自动提示 用户名称stare
            //连带检索用户名称
            $scope.searchTeacher = function(aim,name){
                var temp = aim+"";
                var keywords = {
                    "id":aim,
                    "name":name,
                    "holdFlag": false
                };
                return CodeService.getCodes(keywords,{}).then(
                    function(data){
                        $scope.searchimpowerList = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
                $scope.toggleTreeUser();
            };

            //查询全部的自动提示列表
            $scope.toggleTreeUser = function (flag) {
                if(flag === "ImmediatelyCloseUser"){ //type-select选中后，关闭 自动提示全部列表的代码块
                    $scope.hideTreeUser = true;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTreeUser = !$scope.hideTreeUser;
                    },500);
                }
            };

            //全部查询点击行时设置高亮颜色
            $scope.setColor = function(typeobject){
                if(angular.isDefined($scope.searchimpowerList)){
                    $.each($scope.searchimpowerList, function(index, amy){
                        if(amy === typeobject){
                            amy.getColor = true;
                        } else {
                            amy.getColor = false;
                        }
                    })
                }
            }

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量(2)
            $scope.setautoMessageValueUser = function(autoflag, schedule, typeValue){
            	 $scope.successSave = true;
                if(autoflag === "username") {
                    schedule.username =typeValue.name;
                    schedule.userid =typeValue.id;
                    $scope.hideTreeUser = !$scope.hideTreeUser;
                }
            }

            //验证自动提示框上编辑之后的数据是否在自动提示列表中查询到（鼠标离开时调用1）
            $scope.checkAutoMessageUser = function(autoflag, schedule){
                //遍历自动提示列表，判断输入值是否在列表中存在，不存在的话，清空列表值
                $scope.autoMessageCheck = false;
                if(angular.isDefined($scope.searchimpowerList)){
                    if(angular.isDefined(schedule)){
                        $.each($scope.searchimpowerList, function(index, aimI){
                            if(autoflag === 'username'){
                                if(schedule.username === aimI.name){
                                    $scope.autoMessageCheck = true;
//                                return condition;
                                }
                            }
                        });
                    }
                }
                //不存在的话，清空自动提示框录入值
                if(autoflag === 'username') {
                    if (!$scope.autoMessageCheck) {
                        schedule.username = "";
                    }
                }
            }
            $scope.ok = function (subject,grade,resourcetype) {
            	$scope.video.subject = subject;
            	$scope.video.grade = grade;
            	$scope.video.resourcetype = resourcetype;
                $scope.updateVideos();
//                $modalInstance.close(function(){
//                   /* 进入后台服务器*/
//                  //  $scope.resourcevideos();
//                    alert("1");
//                    $scope.updateVideos( $scope.video);
//                });
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            //初始化学科
            $scope.initsubject = function(){
                TacticsService.code('subject').then(
                    function(data){
                        $scope.subjectList = data;
                        $scope.subject = data[0].value;
                    },
                    function(){

                    }
                );
            };
            //初始化阶段
            $scope.initgrade = function(){
                TacticsService.code('grade').then(
                    function(data){
                        $scope.gradeList = data;
                        $scope.grade = data[0].value;
                    },
                    function(){

                    }
                );
            };
            //初始化轮巡模式
            $scope.initresourcetype = function(){
                TacticsService.code('resourcetype').then(
                    function(data){
                        $scope.resourcetypeList = data;
                        $scope.resourcetype = data[0].value;
                    },
                    function(){

                    }
                );
            };
            var init = function() {
                //默认隐藏自动提示框内容
                $scope.hideTreeUser = true;
                $scope.initresourcetype();
                $scope.initgrade();
                $scope.initsubject();
            };

            init();
        };






        //删除视频的弹窗
        $scope.openDeleteVideoModal=function(index,deleteRevert){
        	/*if(deleteRevert == "revert"){
        		var selectedItems = $scope.selectedItems;
        	}else{
        		var selectedItems = {
            			selectedItems:$scope.selectedItems,
            			flag:true
            	}
        	}*/
        	
        	if(index >= 0){
        		var temp = [];
            	temp.push($scope.videoList[index]);
        		var selectedItems = {
            			selectedItems:temp,
            			flag:true
            	}
        	}else{
        		var selectedItems = {
            			selectedItems:$scope.selectedItems,
            			flag:true
            	}
        	}
        	
            console.log("打开video删除弹窗");
            var modalInstance=$modal.open({
            	
                templateUrl:'resource/video/resource.video.delete.html',
                backdrop:'static',
                controller: DeleteVideoModalCtrl,
                resolve:{
                        selectedItems:function(){
                               return selectedItems;
                        },
                        deleteRevert:function(){
                        		return deleteRevert;
                        }
                }
            }).result.then(
                function(){
                    console.log("viceo删除窗口被关闭以后，要执行的数据刷新");
                    $scope.resourcevideos("",$scope.pagination,"");
                });
        };
        //删除视频的弹窗---控制器
        var DeleteVideoModalCtrl=function($scope,$modalInstance,selectedItems,growl,ResourceService,deleteRevert){
        	/*if(deleteRevert == "revert"){
        		$scope.selectedItems = selectedItems;
        	}else{
        		
        	}*/
        	$scope.deleteRevert = deleteRevert;
        	$scope.selectedItems = selectedItems.selectedItems;
        	
        	
        	//连接后台彻底删除 数据 服务
        	 $scope.completeDeleteResource=function(selectedItems){
                 console.log("调用删除videos的服务");
                 ResourceService.clearResource(selectedItems).then(
                     function(data){
                         console.log("videos中的服务回调成功60");
                     if(angular.isDefined(data)){
                         growl.addSuccessMessage("删除成功");
                         $modalInstance.close();
                     }else
                         growl.addSuccessMessage("删除失败");
//                         alert("删除失败!");
                         console.log(data);
                 },
                 function(code){
                     //处理失败后操作
                     alert("删除失败!");
                 }
                 );
             };
            //连接后台还原的 数据 服务
            $scope.deleteVideos=function(selectedItems,user){
                console.log("调用删除videos的服务");
                ResourceService.deleteVideos(selectedItems,user).then(
                    function(data){
                    if(angular.isDefined(data)){
                        growl.addSuccessMessage("还原成功");
                        $modalInstance.close();
                    }else
                        growl.addSuccessMessage("还原失败");
//                        alert("删除失败!");
                        console.log(data);
                },
                function(code){
                    //处理失败后操作
                    alert("删除失败!");
                }
                );
            };
            /*确认删除功能*/
            $scope.ok=function(){
                $scope.deleteVideos(selectedItems, {});
            };
            
            /*确认删除功能*/
            $scope.deleteResource=function(){
                $scope.completeDeleteResource($scope.selectedItems);
            };
            
             /*删除功能取消按钮*/
            $scope.cancel=function(){
                $modalInstance.dismiss('cancel');
            };
        };
        //视频   发布按钮--最外层
        $scope.openVideoRelease = function (state) {
            var modalInstance = $modal.open({
                templateUrl: 'resource/video/resource.videorelease.html',
//                templateUrl: 'resource/video/resource.videorelease.modal.html',
                backdrop:'static',
                controller: VideoReleaseModalCtrl,
                resolve: {
                    selectedItems: function () {
                        return $scope.selectedItems;
                    }
                }
            }).result.then(
                function(){
                    /*alert("更新成功");*/
                    console.log("执行发布以后刷新");
                    $scope.resourcevideos("",$scope.pagination,"");
                }
            );
        };


        //视频   发布按钮控制器--最外层
        var VideoReleaseModalCtrl = function ($scope,$modalInstance,growl,selectedItems,ResourceService) {
            $scope.selectedItems=$filter('filter')(selectedItems,{publishstate:0});
            $scope.ok = function () {
                $scope.videoRelease( $scope.selectedItems);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            //批量发布方法
            $scope.videoRelease=function(){
                console.log("进入视频资源，批量发布");
            ResourceService.videoRelease($scope.selectedItems).then(
                function(data){
                    console.log("回调released,vido执行成功以后");
                    if(angular.isDefined(data)){
                        growl.addSuccessMessage("发布成功");
                        $modalInstance.close();
                    }else
                        growl.addSuccessMessage("发布失败");
                        console.log(data);
//                        alert("删除失败!");
                },
                function(code){
                    //处理失败后操作
                    alert("删除失败!");
                }
            );
            }
        };

      //视频   取消发布按钮
        $scope.openCancelVideoRelease = function () {
            var modalInstance = $modal.open({
                templateUrl: 'resource/video/resource.CancelVideoRelease.html',
                backdrop:'static',
                controller: CancelVideoReleaseModalCtrl,
                resolve: {
                    selectedItems: function () {
                        return $scope.selectedItems;
                    }
                }
            }).result.then(
                function(){
                    console.log('回调成功以后执行的刷新');
                    $scope.resourcevideos("",$scope.pagination,"");
                }
            );
        };


        //视频   取消发布按钮控制器
        var CancelVideoReleaseModalCtrl = function ($scope,$modalInstance,growl,selectedItems) {
            $scope.selectedItems=$scope.selectedItems=$filter('filter')(selectedItems,{publishstate:1});
            $scope.ok = function () {
                $scope.CancelVideoRelease( $scope.selectedItems);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            //批量取消发布的方法
            $scope.CancelVideoRelease=function(){
                console.log("进入视频资源，取消发布");
                ResourceService.CancelVideoRelease($scope.selectedItems).then(
                    function(data){
                        console.log("回调CancelVideoRelease执行成功以后");
                        if(angular.isDefined(data)){
                            growl.addSuccessMessage("取消成功");
                            $modalInstance.close();
                        }else
                            growl.addSuccessMessage("取消失败");
                            //alert("操作失败!");
                    },
                    function(code){
                        alert('操作失败');
                    }
                );
            }
        };


        //Json资源管理--视频资源--最外层
        $scope.resourcevideos = function(select) {
        	$scope.selectvideo = (select == undefined) ? '1':select;
//            $scope.selectvideo = select;
            console.log("进入resourcevideos得值的服务109");
            ResourceService.resourceVideo($scope.videoResource,$scope.pagination,"").then(
                    function(data){
                        console.log("resourcevideo回调成功以后赋值数据112");
                        if(data.total > 0){
                            $scope.videoList=data.data;
                            $scope.videoList.flag = true;
                            
//                            var addtemp =  function(nodes){
//                            	for(var i in nodes){
//                            		nodes[i].flag = true;   
//                            	}
//                            }
//                            addtemp($scope.videoList);	
                            
                            console.log($scope.pagination,"视频资源的分页的信息");
                            $scope.pagination.totalItems = data.total;
                            $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                        }else{
                            $scope.videoList =[];
//                            $scope.growl("未查找到相关信息",'error');
                        }
                    },
                    function(code) {
                        throw(code);
                    }
                );
            };

        //点击全部选中时设置控制的单选按钮状态
        $scope.checkAllVideo= function (){
            if($scope.videoList.length>0){
            /*当前的选项取反一下,真变假，假变真*/
            $scope.checkAll = !$scope.checkAll;
            /*each遍历第一个是要遍历的对象,function方法中的index是接收下标,video是接收具体的对象*/
            $.each($scope.videoList, function(index, video){
                /*因为遍历了video中的checked属性*/
                video.checked = $scope.checkAll;
            });
            }
        };

        //设置单选按钮响应事件
        $scope.selectedItems=[];
        $scope.$watch('videoList',function(){

            $scope.selectedItems=$filter('filter')($scope.videoList,{checked:true});
            $scope.selectedCount=$scope.selectedItems.length;
            if( $scope.selectedCount === $scope.videoList.length && $scope.videoList.length>0)
                $scope.checkAll = true;
            else
                $scope.checkAll = false;
        },true)

        //根据页码查询--最外层
        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
            }
            if($scope.selectvideo ==='1'){
                $scope.resourcevideos("1"); //调用查询接口
            }else{
                /*$scope.videoResource ='';*/
                $scope.resourcevideos(); //调用查询接口
            }

        };

         //简单查询的方法
//        $scope.inquire=function(select){
//            //……………………………………………………………………查询以后要不要分页…………………………………………………………
//            var condition=angular.copy( $scope.videoResource);
//            $scope.resourcevideos(condition,$scope.pagination,"");
//        };


        //把$scope.hideAdvancedSearch做个联动
        $scope.$watch('hideAdvancedSearch',function(){
            if($scope.hideAdvancedSearch){
                $scope.videoResource.username='';
                $scope.videoResource.startdate='';
                $scope.videoResource.enddate='';
            }else{
                $scope.videoResource.floder='';
            }
        });
        $scope.orderby = function(order){
            if($scope.sort[order] === 'asc'){
                $scope.sort[order] = 'desc';
            }
            else{
                $scope.sort[order] = 'asc';
            }
            $scope.pagination.sort=$scope.sort[order];
            $scope.pagination.order=order;
            $scope.resourcevideos(); //调用查询接口
        };
       

        var init = function(){
            $scope.videoResource ='';
            //设置全选按钮的初始值
            $scope.checkAll=false;
            /*$scope.video.stateShow = '2';*/
            $scope.$parent.active = 5;
            $scope.videoList=[];
            $scope.hideAdvancedSearch = true;

            $scope.video='';
            $scope.sort = {
            		"areaname":"asc",
            		"username":"asc",
            		"createdate":"asc",
            		"publishstate":"asc"
            };
            //定义查询数据于前台文本框做关联查询数据
            $scope.videoResource={
                    "floder":'',
                    "username":'',
                    "startdate":'',
                    "enddate":'',
                    "flag":true
            };
//            $scope.$selecteds=[
//
//            ];
          
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

            console.log($scope.pagination,"分页信息");
            $scope.resourcevideos($scope.videoResource,$scope.pagination,"");
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_resource_recycle_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++视频资源  您没有权限+++++++++")
                $location.path('dashboard');
            };
            //每隔2000秒请求一次，将转码中变为播放状态
           var isCancel = false;
           var timer = $interval(function(){
                $.each($scope.videoList,function(i,video){
                   var status = video.status;
                   var floder = video.floder;
                   if (status == '0') {
                        ResourceService.demand(floder,status).then(
                            function(data){
                                if(data.status == '1'){
                                    
                                    $scope.videoList[i].status = data.status;
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
                    $.each($scope.videoList,function(i,video){
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

            /*$scope.killtimer=function(){
                $.each($scope.videoList,function(i,video){
                    var status = video.status;
                    if (status != '0') {
                       $interval.cancel(timer);
                     }
                })
            };*/
        };
        init();
    }]);
});
