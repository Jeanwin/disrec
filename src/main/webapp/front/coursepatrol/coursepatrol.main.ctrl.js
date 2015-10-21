define(['app',
        'config',
        'directorSeize'
        ], function (app,config) {
    app.registerController('CourseTourMainCtrl', ['$scope','$rootScope','$modal','$location','$timeout','$stateParams','CourseService','TreeService','TacticsService','growl','$filter' ,
        '$interval', '$http','SocketService', function ($scope,$rootScope,$modal,$location,$timeout,$stateParams,CourseService,TreeService,
        		TacticsService,growl,$filter,$interval,$http,SocketService) {

//      切换树
    	//JSON 机构树
        var userTrees = function(keywords,areaid){
            TreeService.systemTree(keywords,areaid).then(
                function(data){
                    $scope.organTree = data;
                    var addtemp =  function(nodes){
                    	for(var i in nodes){
                    		if(nodes[i].title){
                    			nodes[i].temp = "hideOrganTree";
                    			if(nodes[i].nodes){
                    				addtemp(nodes[i].nodes);	
                    			}                   			
                    		}
                    	}
                    }
                    addtemp($scope.organTree);	
                    
                },
                function(){

                }
            );
        };
    	//初始化第一个节点
        var initFirstNode = function(temp){
        	/*if($scope.activeArea.id==='')*/
                $scope.setActiveAreaTreeNode(temp[0]);
        }
        
        //toggleArea
        $scope.toggleArea1 = function(){
        	$scope.int_ = 0;
        	$scope.toggleArea=!$scope.toggleArea;
        	if($scope.toggleArea == false){
        		$scope.areaTree = $scope.areaTreecopy;
        	}else{
        		$scope.areaTree = $scope.organTree;
        		/*$scope.liveList.temp = 'hideorganTree';*/
        	}
        	initFirstNode($scope.areaTree);
        	
        }
    	//通过树形结构id获取mac
    	var getMacByTreeId = function(id){
    		//切回直播页面
    		$scope.livingFlag = false;
    		//关闭轮询页面定时器
//    		$interval.cancel($scope.pollingSet);
    		CourseService.getMacByTreeId(id,$scope.liveList.temp).then(
                    function(data){
                    	if(angular.isDefined(data)){
                    		$scope.mac = data;
                    		//获取直播流
                    		getLivingAddress($scope.mac, "0");
                    		
                    	}
                    },
                    function(code,e){
                        growl.addErrorMessage('通过树形结构id获取mac意外中断，失败！');
                        console.log(code+","+e);
                    }
                );
    	}
    	
    	
        //进入导播间的命令
        $scope.openConsole = function (size) {
            window.open('director/console/index.html?size='+size);
        };

        //抓拍功能
        $scope.photograph = function(id){
                console.log("抓拍对象的id:"+id);
        };

        $scope.openPatrolOptionModal = function () {
            $modal.open({
                templateUrl: 'coursepatrol/coursetourmain/coursetourmain.html',
                backdrop:'static',
                controller: PatrolOptionModalCtrl,
                resolve: {
                    tree: function () {
                        return $scope.areaTree;
                    },
                    AreaTree:function(){
                        return $scope.activeAreaTreeNode;
                    }

                }
            }).result.then(function(roundType){
            	//設置輪詢保存接口可以正常返回值后，可以判斷返回值，然後切換頁面
            	if(roundType == "pictureType"){
                	$scope.livingFlag = true;
                	$scope.isImg = true;
                }
                else{
                	$scope.livingFlag = false;
                	$scope.isImg = false;
                	$scope.startPollingFlag = true;
                }
            	$scope.livingFlagbtn = false;
            });
        };
        
        var PatrolOptionModalCtrl = function ($scope, $modalInstance, tree,AreaTree) {
            $scope.areaTree = tree;
            $scope.activeAreaTreeNode = AreaTree;
            $scope.node = {
                isSelected:false
            };
            console.log(AreaTree);
            $scope.coursetour = {
                "polingset":'',
                "roundType":''
                	
            };
            
            //初始化点击轮训设置与树过来的值对比打钩
//            var getSelectAreaTrees = function(__node){
//                if($scope.activeAreaTreeNode !==''){
//                    if($scope.activeAreaTreeNode.id === __node.id){
//                           __node.isSelected = true;
//                    }
//                };
//                if(__node.nodes){
//                    $.each(__node.nodes, function(index, _node){
//                        getSelectAreaTrees(_node);
//                    });
//                }
//            };
            //遍历树的节点
            var getSelectClassrooms = function(node){
                if(node.nodes.length <= 0 && node.isSelected){
                    $scope.areainfoList.push(
                        {
                            "id": node.innerid
                        }
                    );
                }
                if(node.nodes){
                    $.each(node.nodes, function(index, _node){
                        getSelectClassrooms(_node);
                    });
                }
            };
            //选择机位按钮
            var getSelectReservations = function(node){
                if(node.deviceinfoList){
                    $scope.deviceinfoList.push(
                        {
                            "id": node.value
                        }
                    );
                }
            };
            //响应保存按钮的事件
            $scope.save = function (coursetour,roundType,polingset) {
                $scope.keywords = {};
                $scope.areainfoList=[];
                $scope.deviceinfoList = [];
                $scope.reservationButton=$filter('filter')($scope.reservationList,{deviceinfoList:true});
                getSelectClassrooms(tree[0]);
                $.each($scope.reservationButton,function(index,reservation){
                    getSelectReservations(reservation);
                });
                $scope.keywords.areainfoList = $scope.areainfoList;
                $scope.keywords.deviceinfoList = $scope.deviceinfoList;
                $scope.keywords.polingset = polingset;
                $rootScope.polingset = polingset;
                $scope.keywords.roundType = roundType;
                $rootScope.roundType = roundType; 
                $scope.keywords.polingtime = coursetour.polingtime === undefined?'':coursetour.polingtime;
                
                CourseService.setPolling($scope.keywords).then(
                    function(data){
                        if(data.id === '1'){
                            growl.addSuccessMessage(data.operation);
                            $modalInstance.close(roundType);
                            console.log("设置轮询成功以后返回的值");
                            console.log(roundType);
                            $scope.livingFlag = true;
                        }
                        if(data.id === '0'){
                            growl.addErrorMessage('轮巡设置保存失败');
                        }
//                        $modalInstance.close("ok");
                    },
                    function(code,e){
                        growl.addErrorMessage('设置轮询意外中断，失败！');
                        console.log(code+","+e);
                    }
                );
            };

            //初始化查询分屏设置
            $scope.initcoursetour = function(){
                TacticsService.code('splitScreen').then(
                    function(data){
                        $scope.coutsetourList = data;
                        $scope.coursetour.polingset = data[0].value;
                        $scope.polingset = data[0].value;
                    },
                    function(){

                    }
                );
            };
            //初始化查询机位名称
            $scope.reservation = function(){
                TacticsService.code('RoundRobin').then(
                    function(data){
                        $scope.reservationList = data;
                    },
                    function(){

                    }
                );
            };
            //初始化轮巡模式
            $scope.initroundType = function(){
                TacticsService.code('roundType').then(
                    function(data){
                        $scope.roundTypeList = data;
                        $scope.roundType = data[0].value;
                    },
                    function(){

                    }
                );
            };
            //响应取消按钮的事件
            $scope.cancel = function(){
               $modalInstance.close('cancel');
            };

            $scope.SplitChange = function(SplitChange){
                $scope.SplitScreen=SplitChange;
            };
            $scope.turntimeChange = function(turntime){
                //加一个校验，只能输入数字
                $scope.turntime=turntime;
            };
            //自下而上，遍历树
            $scope.checkAllParent = function(node, value){
                console.log(node);
                console.log($scope.areaTree);

                if(angular.isDefined($scope.areaTree)){
                    $.each($scope.areaTree, function(index, atree){
                        if(atree.nodes){
                            $.each(atree.nodes, function(index, _node){
                                if(node === _node){
                                    if($scope.checkParentInnerChildIsChecked(atree) && atree.isSelected){
                                    } else {
                                        atree.isSelected = !atree.isSelected;
                                    }
                                    console.log(atree.name);
                                    console.log(atree.isSelected);
                                } else {
                                    $.each(_node.nodes, function(index, __node){
                                        console.log(__node);
                                        if(node === __node){
                                            if ($scope.checkParentInnerChildIsChecked(_node) && _node.isSelected) {
                                            } else {
                                                _node.isSelected = !(_node.isSelected);
                                            }
                                            console.log(_node.name);
                                            console.log(_node.isSelected);
                                            console.log("找到的话，把找到的父节点框，作为查询条件，再查询父节点的父节点");
                                            //找到的话，把找到的父节点框，作为查询条件，再查询父节点的父节点
                                            $scope.checkAllParent(_node, node.isSelected);
                                        } else {
                                            $scope.getNodePostion(node,__node, node.isSelected);
                                        }
                                    });
                                }

                            });
                        }
                    });

                }

            };
            //反向递归查找节点
            $scope.getNodePostion = function(node, _node, value){

                if(_node.nodes) {
                    $.each(_node.nodes, function (index, __node) {
                        if (node === __node) {
                            if ($scope.checkParentInnerChildIsChecked(_node) && _node.isSelected) {
                            } else {
                                _node.isSelected = !(_node.isSelected);
                            }
                            console.log(_node.name);
                            //找到的话，把找到的父节点框，作为查询条件，再查询父节点的父节点
                            $scope.checkAllParent(_node, node.isSelected);
                        } else {
                            $scope.getNodePostion(node, __node);
                        }
                    });
                }
            };
            //验证父节点下的子节点是否有被选中的，返回值为true/false
            $scope.checkParentInnerChildIsChecked = function(_node){
                var checkParentInnerChildIsCheckedFlag = false;
                if(_node.nodes){
                    $.each(_node.nodes, function(index, nodeCheck){
                        if(nodeCheck.isSelected){
                            checkParentInnerChildIsCheckedFlag = true;
                        }
                    });
                }
                return checkParentInnerChildIsCheckedFlag;
            };
            //结构树选择（自下而上，自上而下）
            $scope.checkAllTrees = function(node, value){

                //结构树选择（自上而下）
                $scope.checkAllApplys(node, value);

                //延时加载（结构树选择（自下而上）
                $timeout(function(){
                    $scope.checkAllParent(node);
                },200);

            };
            //选择轮询的教室
            $scope.checkAllApplys = function (node, value) {
                node.isSelected = node.isSelected || false;
                node.isSelected = value === undefined ? !node.isSelected : value;
                if(node.nodes.length <= 0){
                        $scope.allItems(node);
                }
                if (node.nodes) {
                    $.each(node.nodes, function (index, _node) {
                        $scope.checkAllApplys(_node, (node.isSelected));
                    });
                }
            };
            // 做数组的添加和删除
            $scope.allItems = function (tree) {
//                console.log(tree.attribute);
                var a='';
                if (tree.isSelected) {
                        if($scope.SelectItem.length>0){
                            $.each($scope.SelectItem,function(index_1,Items){
                                if(Items.id===tree.id){
                                    a=index_1;
                                }
                            });
                        }else{
                            $scope.SelectItem.push(tree);
                            a=1;
                        }
                    if(a===''){
                        $scope.SelectItem.push(tree);
                    }

                } else {
                    $.each($scope.SelectItem, function (index, item) {
                        if (item.id === tree.id) {
                            $scope.SelectItem.splice(index, 1);
                            return false;
                        }
                    });
                }
            };

            //初始化课程巡视的值
            $scope.initCoursetours =function(){
                CourseService.CoursetourNum().then(
                    function(data){
                        if(data !== ""){
                            $scope.areainfoList1 = data.areainfoList;
    //                        $scope.CoursetourList = data;
                            $scope.polingset = data.polingset;
                            $scope.coursetour.polingtime = data.polingtime;
                            $scope.roundType = data.roundType;

                            if(angular.isDefined(data.deviceinfoList) && data.deviceinfoList != null) {
                            	$.each(data.deviceinfoList,function(index,_node){
                                    $.each($scope.reservationList,function(_index,__node){
                                        if(_node.id === __node.value){
                                            $scope.reservationList[_index].deviceinfoList = true;
                                        }
                                    });
                                });
                            }
                            $scope.treeNode(tree[0]);
                        }
                    },function(){

                    }
                );
            };
            //匹配树节点
            $scope.treeNode = function(treenode){
            	if(angular.isDefined($scope.areainfoList1) && $scope.areainfoList1 != null){
            		$.each($scope.areainfoList1,function(index,node_){
                        if(node_.id === treenode.innerid){
                            treenode.isSelected = true;
                        }
                    });
                    if(treenode.nodes){
                        $.each(treenode.nodes,function(index,__node){
                            $scope.treeNode(__node);
                        });
                    }
            	}
            };
            //初始化遍历树选择上
//            $scope.isCheckedCourse = function(id){
//                var check = false;
//                $.each($scope.areainfoList1, function (index, _treeList) {
//                    if (_treeList.id === id) {
//                        check = true;
//                        return false;
//                    }
//                });
//                return check;
//            };
            var init = function(){
            	
            	//停止课程巡视画面中的视屏轮询
            	var evt = document.createEvent("HTMLEvents");
            	evt.initEvent("active", false, false);
            	evt.id = 'PatrolOptionModalCtrl';
            	window.dispatchEvent(evt);
            	
                $scope.coursetour.deviceinfoList = false;
//                getSelectAreaTrees(tree[0]);
                $scope.reservation();
                $scope.initcoursetour();
                $scope.initroundType();


                $scope.SelectItem = [];
                $scope.InquireVideo=[{'id':'1',"_check":true},{'id':'2',"_check":true},
                {'id':'3',"_check":true},{'id':'4',"_check":true},{'id':'5',"_check":true},{'id':'6',"_check":true}];
                $scope.SplitScreen="4";
                $scope.turntime='';


                $timeout(function(){
                    //初始化课程巡视的值
                $scope.initCoursetours();
                },100);
            };
            init();
        };


        //初始教室轮巡页面

        var initFirstClasspatrol = function(){
            
        }

        //初始化树的信息
        var mainTrees = function(keywords,areaid){
            TreeService.mainTree(keywords,areaid).then(
                function(data){
                    $scope.areaTreecopy = data;
                    $scope.areaTree = $scope.areaTreecopy;
                    
                   $scope.setActiveAreaTreeNode($scope.areaTree[0]);
//                    console.log('通过var mainTrees = function(areaid)方法 获取树接口',areaid);
                },
                function(code){
                    console.log('初始化树的信息失败');
                }
            );
        };

        //选中第一个教室的递归嵌套
        $scope.selectOnetree=function(tree){
        	//选中第一个教室的递归嵌套
                if(tree.nodes.length >= 1 ) {
                    $.each(tree.nodes, function (index, tree_1) {
                        $scope.selectOnetree(tree_1);
                    })
                }else{
                    if($scope.int_===0 && tree.nodes.length <= 0 ){
                    //     $scope.activeAreaTreeNode = tree;
                    //     mockLoadTrees(tree.innerid);
                    //     $scope.int_=1;
                        if($scope.activeNode == '0'){
                            $scope.activeAreaTreeNode.title = tree.title;
                            $scope.activeAreaTreeNode.id = tree.id;
                            mockLoadTrees(tree.innerid);
                            $scope.int_=1;
                        }else{
                            $scope.int_=1;
                            CourseService.getDetailById($scope.activeNode).then(
                                function(data){
                                	$scope.activeAreaTreeNode.id = data.id;
                                	$scope.activeAreaTreeNode.title = data.title;
                                    mockLoadTrees(data.innerid);
                                },
                                function(code){
                                    console.log('初始化树的信息失败');
                                }
                            );
                        }
                        
                    }

                }
        };

        //选择页码和翻页
        $scope.onSelectPage = function(pageIndex){
            console.log(pageIndex);
            /* 把分页的下标传值给$scope.pagination.pageIndex*/
            if(pageIndex === '4'){
                $scope.coursepatorlObject.initCss(2,2);
            } if(pageIndex === '9'){
                $scope.coursepatorlObject.initCss(3,3);
            } if(pageIndex === '16'){
                $scope.coursepatorlObject.initCss(4,4);
            }
//            if(!pageIndex){
//                growl.addErrorMessage("此页码不存在");
//            }else{
//            $scope.pagination.pageIndex = pageIndex;
//            var _pagination = angular.copy($scope.pagination);
//            if(angular.isDefined(_pagination.pageIndex.pageIndex)){
//                _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
//            }
//            console.log("选择分页");
//            mockLoadTrees($scope.activeAreaTreeNode.id);
//            }
        };
        
        //课程巡视获取直播流方法
        var getLivingAddress = function(mac,isLive){
        	
            CourseService.getLivingAddress(mac,isLive).then(
                function(data){
//                	$scope.livingFlag = true;
//                    $scope.livingAddress=data;
                	$scope.livingFirst = !$scope.livingFirst;
                    
                    $scope.videoPreviewObject = data;
                    $scope.pollingcacheNumber = 0;
                    if($scope.videoPreviewObject != ""){
                    	$scope.livingAddress1 = $scope.videoPreviewObject[0].card0;
                    	if(angular.isUndefined($scope.livingAddress1)){
                    		$scope.livingAddress1 = "";
                    	}
                    	
                    	/*$scope.livingAddress2 = $scope.videoPreviewObject[0].card1;
                        if(angular.isUndefined($scope.livingAddress2)){
                        	$scope.livingAddress2 = "";
                    	}*/
                    	
                        $scope.livingAddress3 = $scope.videoPreviewObject[0].card2;
                        if(angular.isUndefined($scope.livingAddress3)){
                        	$scope.livingAddress3 = "";
                    	}
                        $scope.livingAddress4 = $scope.videoPreviewObject[0].card4;
                        if(angular.isUndefined($scope.livingAddress4)){
                        	$scope.livingAddress4 = "";
                    	}
                        
                		//重新加载直播流
                		var livingTimeSet = $timeout(function(){
                			onRtmpPlayerloadMethod();
                			$timeout.cancel(livingTimeSet);
                		},2000);
                    } else {
                    	
                    	//预处理错误视屏流
                		var deallivingTimeSet = $timeout(function(){
                			$scope.livingAddress1 = "";
//                			$scope.livingAddress2 = "";
                        	$scope.livingAddress3 = "";
                        	$scope.livingAddress4 = "";
                			onRtmpPlayerloadMethod();
                			$timeout.cancel(deallivingTimeSet);
                		},500);
                    	
                    	/*[
                    	 	{
                	 			"card0":"rtmp://192.168.12.117:51935/zonekey/00e04c730075_teacher",
	                    		"card2":"rtmp://192.168.12.117:51935/zonekey/00e04c730075_student",
	                    		"card4":"rtmp://192.168.12.117:51935/zonekey/00e04c730075_vga"
	                    			}
                	 	]*/
                    	/*$scope.livingAddress1 = "rtmp://192.168.12.133/vod/flvs/1";
                        $scope.livingAddress2 = undefined;
                        $scope.livingAddress3 = "rtmp://192.168.12.133/vod/flvs/4";
                        $scope.livingAddress4 = undefined;
                        
                        //pollingcacheNumber setValue
                        if(angular.isDefined($scope.livingAddress1)){
                    		$scope.pollingcacheNumber = $scope.pollingcacheNumber + 1;
                    	}
                        if(angular.isDefined($scope.livingAddress2)){
                    		$scope.pollingcacheNumber = $scope.pollingcacheNumber + 1;
                    	}
                        if(angular.isDefined($scope.livingAddress3)){
                    		$scope.pollingcacheNumber = $scope.pollingcacheNumber + 1;
                    	}
                        if(angular.isDefined($scope.livingAddress4)){
                    		$scope.pollingcacheNumber = $scope.pollingcacheNumber + 1;
                    	}*/
                    }
                    
//                    $scope.pagination.totalItems = data.total;
//                    $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                },
                function(code){
                    console.log('没有后台的返回数据错误error（alert）');
                    
                    //预处理错误视屏流
            		var deallivingTimeSet = $timeout(function(){
            			$scope.livingAddress1 = "";
//            			$scope.livingAddress2 = "";
                    	$scope.livingAddress3 = "";
                    	$scope.livingAddress4 = "";
            			onRtmpPlayerloadMethod();
            			$timeout.cancel(deallivingTimeSet);
            		},500);
                }
            );
        };


        //选中树的操作
        $scope.setActiveAreaTreeNode = function (that) {
        	if(that.nodes.length == 0){
        		//延时显示教室标题，保持与视屏显示同步
        		var setActiveTreeNodeTimeout = $timeout(function(){
        			$scope.activeAreaTreeNode.id = that.id;
        			$scope.activeAreaTreeNode.title = that.title;
        			$timeout.cancel(setActiveTreeNodeTimeout);
        		},2000);
        		//隐藏轮询页面
            	$scope.pollingPageDisplay = false;
        	};
        	 if(that.nodes.length >= 1) {
        		 $scope.selectOnetree(that);
             }
        	if($scope.areaTree[0].temp){
            	$scope.liveList.temp = "hideOrganTree";
            }else{
            	$scope.liveList.temp = "";
            }
        	//默认不让树形结构的视屏初始化方法执行
        	$scope.activeAreaFlag = true;
        	
        	//改为手动轮询
        	$scope.conditionFlag = 0;
        	$scope.livingFlagbtn = false;
            
            console.log("显示当前区域that:", that); 
            console.log('选择树，选中班级');
            //that.mac = "00E04C680001";
            
//        	$scope.livingAddress1 = "rtmp://192.168.12.133/vod/flvs/4";
//          $scope.livingAddress2 = "";
//          $scope.livingAddress3 = "rtmp://192.168.12.133/vod/flvs/1";
//          $scope.livingAddress4 = "";
            
            //先加载视屏流，显示正在等待的视屏
            $scope.livingAddress1 = "rtmp://1.1.1.122/vod/flvs/1";
//            $scope.livingAddress2 = "";
            $scope.livingAddress3 = "rtmp://1.1.1.122/vod/flvs/1";
            $scope.livingAddress4 = "rtmp://1.1.1.122/vod/flvs/1";
            onRtmpPlayerloadMethod();
            
            //延迟查询mac，直播流
            $timeout(function(){
                getMacByTreeId(that.id);
            },1000);
        };


        //课程巡视后台查询数据信息
        var mockLoadTrees=function(keywords){
            CourseService.searchCourse(keywords).then(
                function(data){
                    $scope.keywords=data;
//                    $scope.pagination.totalItems = data.total;
//                    $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                },
                function(code){
                    console.log('没有后台的返回数据错误error（alert）');
                }
            );
        };
        //初始化分屏设置
        $scope.initcourseportal = function(){
            TacticsService.code('splitScreen').then(
                function(data){
                    $scope.coutseportalList = data;
                    $scope.pagination.pageSize = data[0].value;
                },
                function(){

                }
            );
        };
        $scope.active = 0;
        $scope.$parent.mainactive = 5;
        
    	var CourseLivingCtrl = function ($scope, $modalInstance, imgMac) {
    		
			$scope.cancel = function(){
				$modalInstance.close();
			};
			
    		//课程巡视获取直播流方法
            var getLivingAddress = function(mac,isLive){
                CourseService.getLivingAddress(mac,isLive).then(
                    function(data){
                    	$scope.livingFlag = true;
//                        $scope.livingAddress=data;
                    	$scope.livingFirst = !$scope.livingFirst;
                        
                        $scope.videoPreviewObject = data;
                        if($scope.videoPreviewObject != ""){
                        	$scope.livingAddress1 = $scope.videoPreviewObject[0].card0;
                            $scope.livingAddress2 = $scope.videoPreviewObject[0].card1;
                            $scope.livingAddress3 = $scope.videoPreviewObject[0].card2;
                            $scope.livingAddress4 = $scope.videoPreviewObject[0].card4;
                        } else {
                        	$scope.livingAddress1 = "";
                            $scope.livingAddress2 = "";
                            $scope.livingAddress3 = "";
//                            $scope.livingAddress3 = "rtmp://192.168.12.117:51935/zonekey/00e04c680001_student";
                            $scope.livingAddress4 = "";
                        }
                        
//                        $scope.pagination.totalItems = data.total;
//                        $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                    },
                    function(code){
                        console.log('没有后台的返回数据错误error（alert）');
                    }
                );
            };

            var init = function(){
            	//获取直播流
        		getLivingAddress(imgMac, "0");
                //重新加载直播流
        		if($scope.initNoStart){
        			onRtmpPlayerloadMethod();
        		}
            };

            init();
        };
        
        $scope.openImgLivingModal = function () {
            $modal.open({
                templateUrl: 'coursepatrol/livingModel/coursepatrol.livingModel.tpl.html',
                backdrop:'static',
                controller: CourseLivingCtrl,
                resolve: {
                	imgMac: function () {
                        return $scope.imgMac;
                    }
                }
            })
        };
        
        
        //开始轮询查询流信息
        $scope.pollingMsg = function(pageIndex){
        	
//        	$scope.activeServiceurl = "http://192.168.12.214:8080/disrec/";
        	$http.get($scope.activeServiceurl + "deviceView/polling?page="+pageIndex)
	            .success(function(data){
	                if(angular.isDefined(data)) {
	                	if(angular.isUndefined(data.url)){
	                		//视屏轮询去掉
	                	} else {
	                		console.log("图片轮询");
	                		$scope.isImg = true;
	                		$scope.pollingMsgData = data;
	                	}
	                	//分屏设置(现在以4为例)
                		$scope.pollingScreenSet = data.polingset;
	                }
	            })
	            .error(function(data,status,headers,config){
	            	if(status === 500){
	            		//console.log($scope.activedeviceServiceurl + "recordingStauts method is error: " + "网络未连接。。");
	            	}
	            	throw(status);
	//                console.log($scope.activedeviceServiceurl + "recordingStauts" + code);
	            });
        };
        
        //关闭全屏设置
        $scope.closeFullScreen = function(){
        	//退出全屏设置
        	$scope.fullScreenSet = false;
        };
        
        //开启全屏设置
        $scope.openFullScreen = function(){
        	//开启全屏设置
        	$scope.fullScreenSet = true;
        };
        
        //开始轮询
        $scope.startPolling = function(flag){
        	
        	//显示教室全景页面
        	$scope.pollingPageDisplay = true;
        	
        	//设置定时器变量
        	$scope.pollingSet;
        	
        	if(flag === "1"){
//        		//显示轮询暂停
//        		$scope.conditionFlag = "1";
        		
        		/*$scope.stopTimeSet = true;
            	var stopTimeSetP = $timeout(function(){
            		$scope.stopTimeSet = false;
            		
            		$timeout.cancel(stopTimeSetP);
            	},5000);*/
        		
        		if($scope.isImg){
        			 //开始轮询查询流信息
                    $scope.pollingMsg($scope.pageIndex);
        		} else {
//        			var requestpath = "http://192.168.12.214:8080/disrec/deviceView/polling?";
        			
        			//设置开始轮询，继续轮询
	        		if($scope.startPollingFlag){
	        			try{if(SwfContcrlor.interFace().a['pll'].list.length>0){
	        				SwfContcrlor.interFace().start();
	        					return;
	        				}
	        			}catch(e){}
	        			
	        			var requestpath = $scope.activeServiceurl + "deviceView/polling?";
	            		SwfContcrlor.interFace().init(requestpath,"pll",4, function(data){
	            			console.log("标题数据为： start ...");
	            			console.log(data);
	            			document.getElementById("livingAddressTitle1").innerHTML = data[0];
	            			document.getElementById("livingAddressTitle2").innerHTML = data[1];
	            			document.getElementById("livingAddressTitle3").innerHTML = data[2];
	            			document.getElementById("livingAddressTitle4").innerHTML = data[3];
	            			
	            			//$scope.livingAddressTitle = data;
	//            			$scope.livingAddressTitle1 = data[0];
	//                        $scope.livingAddressTitle2 = data[1];
	//                        $scope.livingAddressTitle3 = data[2];
	//                        $scope.livingAddressTitle4 = data[3];
	            		},"CourseTourMainCtrl");
	            		//设置开始轮询标志位
	                	$scope.startPollingFlag = false;
        			} else {
        				//继续轮询
        				SwfContcrlor.interFace().resume();
        				//设置开始轮询标志位
//	                	$scope.startPollingFlag = true;
        			}
        		}
        		
//        		SwfContcrlor.interFace().start();
                
        	} else if(flag === "2"){
//        		//显示轮询开始
//        		$scope.conditionFlag = "2";
        		
        		//开始和暂停轮询，点击后5s可用
            	/*$scope.startTimeSet = true;
            	var startTimeSetP = $timeout(function(){
            		$scope.startTimeSet = false;
            		
            		$timeout.cancel(startTimeSetP);
            	},5000);*/
        		
        		//暂停轮询
//        		$interval.cancel($scope.pollingSet);
        		//隐藏轮询页面
//            	$scope.pollingPageDisplay = false;
        		if($scope.isImg){
        			$scope.coursepatorlObject.stop();
        		} else {
        			SwfContcrlor.interFace().pause();
        		}
        	} 
        };
        
        var init = function(){
        	
            $scope.activeNode =$stateParams.activeNode;

        	//如果有websocket通道打开，则将其关闭
        	if(SocketService.isConnected()){
        		SocketService.disconnect();
        	}
        	
        	//设置开始轮询标志位
        	$scope.startPollingFlag = true;
        	
        	var evt = document.createEvent("HTMLEvents");
        	evt.initEvent("active", false, false);
        	evt.id = 'CourseTourMainCtrl';
        	window.dispatchEvent(evt);
        	
        	//请求地址公共变量
            $scope.activeServiceurl = config.backend.ip + config.backend.base;
        	
        	$rootScope.roundType = "";
            $scope.initcourseportal();
            
            $scope.isImg = false;
            $scope.liveList = {'temp':""};
            $timeout(function(){
            	$scope.coursepatorlObject = new coursepatorlmain('view',100,90,2,2, function(data){
     	    	   console.log("AGL:"+data);
     	    	   console.log("分屏数据为 ： " + Math.sqrt($scope.pollingScreenSet));
     	    	   if(data === ""){
     	    		   console.log("无可用mac!");
     	    	   } else {
     	    		   $scope.imgMac = data;
     	    		   $scope.openImgLivingModal(); 
     	    	   }
             	   
                 });
            	if($scope.isImg){
            		console.log("图片轮询 start...");
            		//调用开始方法
//                	$scope.coursepatorlObject.start(JSON.stringify($scope.pollingMsgData));
            	}
            },1000);
            console.log("2");
            $scope.conditionFlag = 0;
            $scope.getMac = $scope.coursepatorlObject
//            obj.initCss(2,2);

//            initCoursePortalMain();
            $scope.areaTree =[];
            $scope.activeAreaTreeNode={'id':"",'title':""};
            $scope.int_=0;
            $scope.pagination = {
                totalItems:0,
                pageIndex:1,
                pageSize:4,
                maxSize:8,
                numPages:4,
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };

            console.log("3");
            //初始化树tree结构  多的
            mainTrees("deviceSet", $scope.activeNode);
            $timeout(function(){
            	$scope.initNoStart = true;
            	getMacByTreeId($scope.activeAreaTreeNode.id);
            },2000);
            $scope.videoList=[];
            $scope.hideAdvancedSearch = true;
            userTrees("trees",'');
//            mockLoadTrees('','',$scope.pagination,'');
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_coursepatrol_url_view') === -1){
//                console.log("对不起！您没有权限访问。")
                console.log("+++++++课程巡视  您没有权限+++++++++")
//                window.location.href("login");
                $location.path('dashboard');
            };
            
            $scope.pollingFlag = "0";
            
            $scope.pollingcacheCount = 0;
            
            $scope.initNoStart = false;
            
            $scope.pageIndex = 0;
            
            //隐藏教室全景页面
        	$scope.pollingPageDisplay = false;

        };

        init();
    }]);
});