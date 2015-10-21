define(['app','config'], function (app,config) {
    app.registerController('ResourceVideoCtrl', ['$scope','$modal','$filter','$upload','$location','growl','ResourceService' ,'CodeService', 'TacticsService','$timeout','$interval',function ($scope,$modal,$filter,$upload,$location,growl,ResourceService,CodeService,TacticsService,$timeout,$interval) {
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
        	var selectListData = {
        			subjectList:$scope.subjectList,
        			gradeList:$scope.gradeList,
        			resourcetypeList:$scope.resourcetypeList,
        			selfType1List:$scope.selfType1List,
        			selfType2List:$scope.selfType2List,
        			selfType3List:$scope.selfType3List,
        	}
            console.log("打开video中的设置弹窗");
            var modalInstance = $modal.open({
                templateUrl: 'resource/video/resource.video.modal.html',
                backdrop:'static',
                controller: VideoSetModalCtrl,
                resolve: {
                    video: function () {
                        return video;
                    },
                    selectListData:function(){
            			return selectListData;
            		}
            		
                }
            }).result.then(
                function(){
                    $scope.resourcevideos("",$scope.pagination,"");
                }
            );
        };
        
        
        //视频设置弹出框--控制器--最外层
        var VideoSetModalCtrl = function ($scope,$modalInstance,video,growl,ResourceService,selectListData) {
        	$scope.iptemp =  config.backend.tempIp;
        	$scope.successSave = false;
        	$scope.selectListData = selectListData;
            $scope.video = angular.copy( video || {name:''});
            $scope.video.subjectTemp = $scope.video.subjectname + "," + $scope.video.subject;
            $scope.video.gradeTemp = $scope.video.gradename + "," + $scope.video.grade;
            $scope.video.resourcetypeTemp = $scope.video.resourcetypename + "," + $scope.video.resourcetype;
            $scope.video.selfType1Temp = $scope.video.selfType1name + "," + $scope.video.selfType1;
            $scope.video.selfType2Temp = $scope.video.selfType2name + "," + $scope.video.selfType2;
            $scope.video.selfType3Temp = $scope.video.selfType3name + "," + $scope.video.selfType3;
           
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            $scope.splitData = function(type,data){
            	switch (type){
	        	case "subject":
	        		$scope.video.subject = data.split(',')[1];
	        		$scope.video.subjectname = data.split(',')[0];
	        		break;
	        	case "grade":
	        		$scope.video.grade = data.split(',')[1];
	        		$scope.video.gradename = data.split(',')[0];
	        		break;
	        	case "resourcetype":
	        		$scope.video.resourcetype = data.split(',')[1];
	        		$scope.video.resourcetypename = data.split(',')[0];
	        		break;
	        	case "selfType1":
	        		$scope.video.selfType1 = data.split(',')[1];
	        		$scope.video.selfType1name = data.split(',')[0];
	        		break;
	        	case "selfType2":
	        		$scope.video.selfType2 = data.split(',')[1];
	        		$scope.video.selfType2name = data.split(',')[0];
	        		break;
	        	case "selfType3":
	        		$scope.video.selfType3 = data.split(',')[1];
	        		$scope.video.selfType3name = data.split(',')[0];
	        		break;
            	}
            }
                        $scope.uploadRightAway = false;
            
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
                            $scope.imgDataurl = e.target.result;
                            $scope.imgCheckflag = true;
                        },1000);
                    }
                }(fileReader);
                
                $scope.progress = -1;
                if ($scope.uploadRightAway) {
                    $scope.save();
                }
            };

            
            
            $scope.updateVideos=function(video){
                console.log("调用修改videos的服务");
                ResourceService.updateVideos(video).then(
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
                            growl.addSuccessMessage("设置失败");
                            $modalInstance.close();
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
            $scope.ok = function (subject,grade,resourcetype,selfType1,selfType2,selfType3) {
            	delete $scope.video.subjectTemp;
            	delete $scope.video.gradeTemp;
            	delete $scope.video.resourcetypeTemp;
            	delete $scope.video.selfType1Temp;
            	delete $scope.video.selfType2Temp;
            	delete $scope.video.selfType3Temp;
                 var video = $scope.video;
                	 /*{
                        subject:subject,
                        grade:grade,
                        resourcetype:resourcetype,
                        selfType1:selfType1,
                        selfType2:selfType2,
                        selfType3:selfType3,
                }*/
                if($scope.file) {
                    var url = config.backend.ip + config.backend.base + 'rest/resource/setupVideoResourceWithPic';
                   
                    $scope.upload = $upload.upload({
                        url: url,
                        method: 'POST',
                        data: video,
                        file: $scope.file
                    }).progress(function (evt) {
                        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    }).success(function (data, status, headers, config) {
                        growl.addSuccessMessage("设置成功！");
                        $modalInstance.close();
                    }).error(function () {
                        $scope.error = true;
                        $modalInstance.close();
                        growl.addErrorMessage("设置失败！");
                    });
                }else{
                    $scope.updateVideos(video);
                }

            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
           
            var init = function() {
                //默认隐藏自动提示框内容
                $scope.hideTreeUser = true;
//                $scope.initresourcetype();
//                $scope.initgrade();
//                $scope.initsubject();
//                $scope.initselfType1();
//                $scope.initselfType2();
//                $scope.initselfType3();
            };

            init();
        };






        //删除视频的弹窗
        $scope.openDeleteVideoModal=function(){
        	var selectedItems = {
        			selectedItems:$scope.selectedItems
        	}
            console.log("打开video删除弹窗");
            var modalInstance=$modal.open({
                templateUrl:'resource/video/resource.video.delete.html',
                backdrop:'static',
                controller: DeleteVideoModalCtrl,
                resolve:{
                        selectedItems:function(){
                               return selectedItems;
                        }
                }
            }).result.then(
                function(){
                    console.log("viceo删除窗口被关闭以后，要执行的数据刷新");
                    $scope.resourcevideos("",$scope.pagination,"");
                });
        };
        //删除视频的弹窗---控制器
        var DeleteVideoModalCtrl=function($scope,$modalInstance,selectedItems,growl,ResourceService){
            $scope.selectedItems = selectedItems.selectedItems;
            //连接后台删除的 数据 服务
            $scope.deleteVideos=function(selectedItems,user){
                console.log("调用删除videos的服务");
                ResourceService.deleteVideos(selectedItems,user).then(
                    function(data){
                        console.log("videos中的服务回调成功60");
                    if(angular.isDefined(data)){
                        growl.addSuccessMessage("删除成功");
                        $modalInstance.close();
                    }else
                        growl.addSuccessMessage("删除失败");
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


       $scope.initSearchData = function(){
        	 //初始化学科
            TacticsService.code('subject').then(
                function(data){
                    $scope.subjectList = data;
                    $scope.subject = data[0].value;
                },
                function(){

                }
            );
        
            //初始化阶段
            TacticsService.code('grade').then(
                function(data){
                    $scope.gradeList = data;
                    $scope.grade = data[0].value;
                },
                function(){

                }
            );
            //初始类型
             TacticsService.code('resourcetype').then(
                    function(data){
                        $scope.resourcetypeList = data;
                        $scope.resourcetype = data[0].value;
                    },
                    function(){

                    }
                );
          //初始化自定义类型1
            TacticsService.code('selfType1').then(
                function(data){
                    $scope.selfType1List = data;
                    $scope.selfType1 = data[0].value;
                },
                function(){

                }
            );
          //初始化自定义类型2
            TacticsService.code('selfType2').then(
                function(data){
                    $scope.selfType2List = data;
                    $scope.selfType2 = data[0].value;
                },
                function(){

                }
            );	
          //初始化自定义类型3
            TacticsService.code('selfType3').then(
                function(data){
                    $scope.selfType3List = data;
                    $scope.selfType3 = data[0].value;
                },
                function(){

                }
            );
        }
        
        //学科转化
       /* $scope.subjectTransfor =  function(type,id){
        	console.log("test subjectTransfor");        	
        		switch (type){
	        	case "subject":
	        		for(var sub in $scope.subjectList){
	        			if($scope.subjectList[sub].value == id){
	        				return $scope.subjectList[sub].name;
	        			}
	        		}
	        		break;
	        	case "grade":
	        		for(var sub in $scope.gradeList){
	        			if($scope.gradeList[sub].value == id){
	        				return $scope.gradeList[sub].name;
	        			}
	        		}
	        		break;
	        	case "resourcetype":
	        		for(var sub in $scope.resourcetypeList){
	        			if($scope.resourcetypeList[sub].value == id){
	        				return $scope.resourcetypeList[sub].name;
	        			}
	        		}
	        		break;
	        	case "selfType1":
	        		for(var sub in $scope.selfType1List){
	        			if($scope.selfType1List[sub].value == id){
	        				return $scope.selfType1List[sub].name;
	        			}
	        		}
	        		break;
	        	case "selfType2":
	        		for(var sub in $scope.selfType2List){
	        			if($scope.selfType2List[sub].value == id){
	        				return $scope.selfType2List[sub].name;
	        			}
	        		}
	        		break;
	        	case "selfType3":
	        		for(var sub in $scope.selfType3List){
	        			if($scope.selfType3List[sub].value == id){
	        				return $scope.selfType3List[sub].name;
	        			}
	        		}
	        		break;
	        	default:
	        	document.write("");
        	}	
        }*/
        //Json资源管理--视频资源--最外层
        $scope.resourcevideos = function(select) {
        	$scope.selectvideo = (select == undefined) ? '1':select;
//            $scope.selectvideo = select;
            console.log("进入resourcevideos得值的服务109");
            ResourceService.resourceVideo($scope.videoResource,$scope.pagination,"").then(
                    function(data){
                        console.log("resourcevideo回调成功以后赋值数据112");
                        $scope.usedHd = data.usedHD;
                    	$scope.totalHD = data.totalHD;
                        if(data.total > 0){
                            $scope.videoList=data.data;
                            $scope.getDataReady = true;
                            /*$scope.videoList.stateShow = "2";*/
//                            $scope.videoList.publishstate=parseInt($scope.videoList);
//                            $scope.subjectTransfor();
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
                $scope.resourcevideos(); //调用查询接口
            }else{
                $scope.videoResource ='';
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
        //定义查询数据于前台文本框做关联查询数据
        $scope.videoResource={
                "floder":'',
                "username":'',
                "startdate":'',
                "enddate":'',
                "subject":'',
                "grade":'',
                "resourcetype":'',
                "selfType1":'',
                "selfType2":'',
                "selfType3":'',
                "publishstate":''
        };

        var init = function(){
        	
            $scope.videoResource ='';
            //设置全选按钮的初始值
            $scope.checkAll=false;
            /*$scope.video.stateShow = '2';*/
            $scope.$parent.active = 1;
            $scope.videoList=[];
            $scope.hideAdvancedSearch = true;

            $scope.video='';
            $scope.sort = {
            		"areaname":"asc",
            		"username":"asc",
            		"createdate":"asc",
            		"publishstate":"asc",
            		"subject":"asc",
            		"grade":"asc",
            		"resourcetype":"asc",
            		"selfType1":"asc",
            		"selfType2":"asc",
            		"selfType3":"asc"
            }
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
			//Json资源管理--视频资源--最外层
        	$scope.clearVideoObj = function(z){
				var o={};
				o.resourcename=z.resourcename;
				o.username=z.username;
				o.createdate=z.createdate;
				o.floder=z.floder;
				return o;
			}

            console.log($scope.pagination,"分页信息");
            $scope.resourcevideos("",$scope.pagination,"");
            //延时加载字典里的数据
           /* var searchDataTimer = $timeout(function(){
            	
            	console.log("initSearchData")
            },5000)*/
            
            //销魂定时器
            
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_resource_video_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++视频资源  您没有权限+++++++++")
                $location.path('resource/released');
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
//                $timeout.cancel(searchDataTimer);
            },30000)
            $scope.initSearchData();
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
