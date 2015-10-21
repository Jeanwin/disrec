define(['app','config'], function (app,config) {
    app.registerController('ClassroomTacticsCtrl', ['$scope','$filter','$modal','$timeout','$location','TacticsService',"growl",'TreeService',
        function ($scope,$filter,$modal,$timeout,$location,TacticsService,growl,TreeService){
    	
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
           if($scope.searchkey){
            	$scope.getLightList($scope.searchkey); //调用查询接口
            }else{
            	$scope.getLightList(""); //调用查询接口
            }

        };
    	
    	//监视contractList中是否有元素被改变状态
        $scope.$watch('lightLists', function(){
            //监测是否有元素被选中
            if(angular.isDefined($scope.lightLists)){
                $scope.selectLightLists= $filter('filter')($scope.lightLists, {checked:true});
                console.log($scope.selectLightLists);
            }
        },true);
    	
        //    
        $scope.checkAllLightList = function(){
                $scope.checkAll = !$scope.checkAll;
                $.each($scope.lightLists, function(index, light){
                	light.checked = $scope.checkAll;
                });
        }
    		//获取登报设置的list
    	
    		$scope.getLightList = function(keywords){
    			TacticsService.lightSetList(keywords,$scope.pagination).then(
    					function(data){
    							$scope.lightLists = data.data;
    							$scope.pagination.totalItems = data.total;    						
    					},function(){}
    			)
    			
    		}
    		//批量设置灯泡使用时长
    		$scope.batchTacticsdataModal = function(type,index){
    			if(type=='1'){
    				var singleLight = $scope.lightLists[index];
    			}else{
    				var singleLight = "";
    			}
    			var modalInstance = $modal.open({
	                templateUrl: 'classrooms/tactics/model/tactics.lightTime.modal.html',
	                backdrop:'static',
	                controller: newBatchModalCtrl,
	                resolve: {
	                	selectLightLists: function () {
	                        return $scope.selectLightLists;
	                    },
	                    singleLight: function () {
	                        return singleLight;
	                    }
	                }
	            }).result.then(
	                function(){
	                	$scope.getLightList("");
	                }
	            );
	        }
	
	        //新增方案弹出  弹框-控制器
	        var newBatchModalCtrl = function ($scope, $modalInstance,growl,selectLightLists,singleLight) {
	        	$scope.transferdata = [];
	        	if(singleLight == ""){  
	        	}else{
	        		$scope.usedTime = singleLight.usedlength;
	        		$scope.totalTime = singleLight.maxlength;
	        	}
	            $scope.save = function(usedTime,totalTime){
	            	if(singleLight == ""){  
			        	for(var i = 0;i<selectLightLists.length;i++){
			        		$scope.transferdata.push({
			        			'usedlength':usedTime,
			        			'maxlength':totalTime,
			        			'areaId':selectLightLists[i].areaId
			        		})
			        	}
		        	}else{
		        		$scope.transferdata.push({
		        			'usedlength':usedTime,
		        			'maxlength':totalTime,
		        			'areaId':singleLight.areaId
		        		})
		        	}
	            	TacticsService.UpdatelightSet($scope.transferdata).then(
	            			function(data){
	            				if(data == 1){
	            					growl.addSuccessMessage("修改成功");
	               					$modalInstance.close(true);
	            				}else{
	            					growl.addErrorMessage("修改失败");
	               					$modalInstance.close();
	            				}
	            			},function(){	            				
	            				growl.addErrorMessage("系统错误");
               					$modalInstance.close();
	            			}
	            	)
	            	
	            }
	            $scope.cancel = function () {
	                $modalInstance.dismiss('cancel');
	            };
	
	        };
    	
    		//生成模板-中控参数同步
	    	$scope.newExampleModal = function(){
	            var modalInstance = $modal.open({
	                templateUrl: 'classrooms/tactics/model/tactics.newExample.modal.html',
	                backdrop:'static',
	                controller: newExampleModalCtrl,
	                resolve: {
	                    areaTree: function () {
	                        return $scope.areaTree;
	                    }
	                }
	            }).result.then(
	                function(){
	
	                }
	            );
	        }
	
	        //新增方案弹出  弹框-控制器
	        var newExampleModalCtrl = function ($scope, $modalInstance,growl,areaTree) {
	            $scope.areaTree = areaTree;
	            $scope.cancel = function () {
	                $modalInstance.dismiss('cancel');
	            };
	
	        };
            //新增策略 -开关机设置
            $scope.newTacticsModal = function(){
                var modalInstance = $modal.open({
                    templateUrl: 'classrooms/tactics/model/tactics.newTactics.modal.html',
                    backdrop:'static',
                    controller: NewTacticsModalCtrl,
                    resolve: {
                        areaTree: function () {
                            return $scope.areaTree;;
                        }
                    }
                }).result.then(
                    function(){

                    }
                );
            }

            //新增方案弹出  弹框-控制器
            var NewTacticsModalCtrl = function ($scope, $modalInstance,growl,areaTree) {
                $scope.areaTree = areaTree;
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

            };

            //新增方案弹出框  --最外层
            $scope.openAddPlanModal = function (editMode) {
                var modalInstance = $modal.open({
                    templateUrl: 'classrooms/tactics/model/tactics.addplan.modal.html',
                    backdrop:'static',
                    controller: AddPlanModalCtrl,
                    resolve: {
                        editMode: function () {
                            return editMode;
                        }
                    }
                }).result.then(
                    function(){

                    }
                );
            };


            //新增方案弹出  弹框-控制器
            var AddPlanModalCtrl = function ($scope, $modalInstance,growl, SystemService) {

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

            };

            //应用到录像方案
            $scope.openVideoSchemModel = function (videoscheam) {
                //初始化选中树的节点
                TacticsService.VideoAreaIds(videoscheam).then(
                    function(data){
                        $scope.treeselectList=data;
                        var modalInstance = $modal.open({
                            templateUrl: 'classrooms/tactics/model/video.applied.modal.html',
                            backdrop:'static',
                            controller: VideoSchemModelCtrl,
                            resolve: {
                                tree: function () {
                                    return $scope.areaTree;
                                },
                                videoscheam: function () {
                                    return videoscheam;
                                },
                                treeselectList : function(){
                                    return $scope.treeselectList
                                }
                            }
                        }).result.then(
                            function(updata){

                            },
                            function(reason){
                                console.log(reason+"reason");
                            }
                        );
                    }
                );
            };
            var VideoSchemModelCtrl = function ($scope, $modalInstance,tree,videoscheam,growl,treeselectList) {
                console.log(treeselectList);
                $scope.videoscheam = videoscheam;
                $scope.areaTree=tree;
                $scope.SelectItem = treeselectList;
                //点击选中时设置控制的单选按钮状态
                var selectedClassrooms = [];
                $scope.areaList=[];

                /* $scope.checkAllApplys = function (node, value){
                 node.isSelected = node.isSelected || false;

                 node.isSelected = value === undefined? !node.isSelected : value;
                 if(node.nodes){
                 $.each(node.nodes, function(index, _node){
                 $scope.checkAllApplys(_node, (node.isSelected));
                 });
                 }
                 };*/
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^不知道的改动
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
                //判断选择的是教室节点
                $scope.checkAllApplys = function (node, value) {
                    node.isSelected = node.isSelected || false;
                    node.isSelected = value === undefined ? !node.isSelected : value;
                    if(node.attribute==='Y'){
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
                    console.log(tree);
//                alert(tree.attribute);
                    var a='';
                    if (tree.isSelected) {
                        if($scope.SelectItem.length>0){
                            $.each($scope.SelectItem,function(index_1,Items){
                                if(Items===tree.id){
//                                    alert('id重复');
                                    a=index_1;
                                }
                            });
                        }else{
//                            alert('进入了push');
                            $scope.SelectItem.push(tree.id);
                            a=1;
                        }
                        if(a===''){
                            $scope.SelectItem.push(tree.id);
                        }

                    } else {
//                    alert('进的splice');
                        $.each($scope.SelectItem, function (index, item) {
                            if (item === tree.id) {
//                            alert('做了删除');
                                $scope.SelectItem.splice(index, 1);
                                return false;
                            }
                        });
                    }
                    /*if ($scope.SelectItem.length > 0) {
                     alert($scope.SelectItem.length);
                     }else{
                     alert('对不起未选中');
                     }*/
                };
                //递归遍历选中树的节点
                var getSelectClassrooms = function(node){
                    if(node.attribute === "Y" && node.isSelected){
                        $scope.areaList.push(
                            {
                                "areaid": node.id
                            }
                        );
                    }
                    if(node.nodes){
                        $.each(node.nodes, function(index, _node){
                            getSelectClassrooms(_node);
                        });
                    }
                };

                $scope.ok = function () {
                    $scope.areaList=[];
                    $scope.data=[];
                    $scope.node=[];
                    //调用树节点ID
                    getSelectClassrooms(tree[0]);
                    //视频源应用
                    
                    TacticsService.videoschemaApply(videoscheam,$scope.areaList).then(
                        function(data){
                            if(data>0) {
                            	growl.addSuccessMessage("应用到保存成功!");
                            }else{
                                growl.addErrorMessage("应用到保存失败!");
                            }
                            $modalInstance.close(true);
                        },
                        function(code){
                            //处理失败后操作
                            alert("添加失败!");
                        }
                    );

                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.treeselectList = treeselectList;
                $scope.isCheckedClassroom = function(id){
                    var check = false;
                    $.each($scope.treeselectList, function (index, _treeList) {
                        if (_treeList === id) {
                            check = true;
                            return false;
                        }
                    });
                    return check;
                };

            };

            //应用到Rtsp方案
            $scope.openRtspSolutionModel = function (rtspscheam) {
                //初始化选中树的节点
                TacticsService.RtspAreaIds(rtspscheam).then(
                    function(data){
                        $scope.treeselectList=data;
                        var modalInstance = $modal.open({
                            templateUrl: 'classrooms/tactics/model/video.applied.modal.html',
                            backdrop:'static',
                            controller: VideoSchemModelCtrl,
                            resolve: {
                                tree: function () {
                                    return $scope.areaTree;
                                },
                                rtspscheam: function () {
                                    return rtspscheam;
                                },
                                treeselectList : function(){
                                    return $scope.treeselectList
                                }
                            }
                        }).result.then(
                            function(updata){

                            },
                            function(reason){
                                console.log(reason+"reason");
                            }
                        );
                    }
                );
            };
            var VideoSchemModelCtrl = function ($scope, $modalInstance,tree,rtspscheam,growl,treeselectList) {
                console.log(treeselectList);
                $scope.rtspscheam = rtspscheam;
                $scope.areaTree=tree;
                $scope.SelectItem = treeselectList;
                //点击选中时设置控制的单选按钮状态
                var selectedClassrooms = [];
                $scope.areaList=[];

                /* $scope.checkAllApplys = function (node, value){
                 node.isSelected = node.isSelected || false;

                 node.isSelected = value === undefined? !node.isSelected : value;
                 if(node.nodes){
                 $.each(node.nodes, function(index, _node){
                 $scope.checkAllApplys(_node, (node.isSelected));
                 });
                 }
                 };*/
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^不知道的改动
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
                //判断选择的是教室节点
                $scope.checkAllApplys = function (node, value) {
                    node.isSelected = node.isSelected || false;
                    node.isSelected = value === undefined ? !node.isSelected : value;
                    if(node.attribute==='Y'){
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
                    console.log(tree);
//                alert(tree.attribute);
                    var a='';
                    if (tree.isSelected) {
                        if($scope.SelectItem.length>0){
                            $.each($scope.SelectItem,function(index_1,Items){
                                if(Items===tree.id){
//                                    alert('id重复');
                                    a=index_1;
                                }
                            });
                        }else{
//                            alert('进入了push');
                            $scope.SelectItem.push(tree.id);
                            a=1;
                        }
                        if(a===''){
                            $scope.SelectItem.push(tree.id);
                        }

                    } else {
//                    alert('进的splice');
                        $.each($scope.SelectItem, function (index, item) {
                            if (item === tree.id) {
//                            alert('做了删除');
                                $scope.SelectItem.splice(index, 1);
                                return false;
                            }
                        });
                    }
                    /*if ($scope.SelectItem.length > 0) {
                     alert($scope.SelectItem.length);
                     }else{
                     alert('对不起未选中');
                     }*/
                };
                //递归遍历选中树的节点
                var getSelectClassrooms = function(node){
                    if(node.attribute === "Y" && node.isSelected){
                        $scope.areaList.push(
                            {
                                "areaid": node.id
                            }
                        );
                    }
                    if(node.nodes){
                        $.each(node.nodes, function(index, _node){
                            getSelectClassrooms(_node);
                        });
                    }
                };

                $scope.ok = function () {
                    $scope.areaList=[];
                    $scope.data=[];
                    $scope.node=[];
                    //调用树节点ID
                    getSelectClassrooms(tree[0]);
                    //视频源应用

                    TacticsService.rtspschemaApply(rtspscheam,$scope.areaList).then(
                        function(data){
                            if(data>0) {
                                growl.addSuccessMessage("应用到保存成功!");
                            }else{
                                growl.addErrorMessage("应用到保存失败!");
                            }
                            $modalInstance.close(true);
                        },
                        function(code){
                            //处理失败后操作
                            alert("添加失败!");
                        }
                    );

                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.treeselectList = treeselectList;
                $scope.isCheckedClassroom = function(id){
                    var check = false;
                    $.each($scope.treeselectList, function (index, _treeList) {
                        if (_treeList === id) {
                            check = true;
                            return false;
                        }
                    });
                    return check;
                };

            };


            //录播应用到机构
            $scope.openVideoSolutionModel = function (Classtime) {
                TacticsService.selectedAreaIds(Classtime).then(
                    function(data){
                        $scope.treeselectList=data;
                        var modalInstance = $modal.open({
                            templateUrl: 'classrooms/tactics/model/video.applied.modal.html',
                            backdrop:'static',
                            controller: VideoSolutionModelCtrl,
                            resolve: {
                                tree: function () {
                                    return $scope.areaTree;
                                },
                                Classtime: function () {
                                    return Classtime;
                                },
                                treeselectList : function(){
                                    return $scope.treeselectList
                                }
                            }
                        }).result.then(
                            function(updata){
                            },
                            function(reason){
                                console.log(reason+"reason");
                            }
                        );
                    }
                );
            };
            var VideoSolutionModelCtrl = function ($scope, $modalInstance,tree,Classtime,growl,treeselectList) {
                $scope.Classtime = Classtime;
                $scope.areaTree=tree;
                $scope.SelectItem = treeselectList;
                //点击选中时设置控制的单选按钮状态
                var selectedClassrooms = [];
                $scope.areaList=[];

                /* $scope.checkAllApplys = function (node, value){
                 node.isSelected = node.isSelected || false;

                 node.isSelected = value === undefined? !node.isSelected : value;
                 if(node.nodes){
                 $.each(node.nodes, function(index, _node){
                 $scope.checkAllApplys(_node, (node.isSelected));
                 });
                 }
                 };*/
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^不知道的改动
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
                $scope.checkAllApplys = function (node, value) {
                    node.isSelected = node.isSelected || false;
                    node.isSelected = value === undefined ? !node.isSelected : value;
                    if(node.attribute==='Y'){
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
//                alert(tree.attribute);
                    var a='';
                    if (tree.isSelected) {
                        if($scope.SelectItem.length>0){
                            $.each($scope.SelectItem,function(index_1,Items){
                                if(Items.id===tree.id){
//                                    alert('id重复');
                                    a=index_1;
                                }
                            });
                        }else{
//                            alert('进入了push');
                            $scope.SelectItem.push(tree);
                            a=1;
                        }
                        if(a===''){
                            $scope.SelectItem.push(tree);
                        }

                    } else {
//                    alert('进的splice');
                        $.each($scope.SelectItem, function (index, item) {
                            if (item.id === tree.id) {
//                            alert('做了删除');
                                $scope.SelectItem.splice(index, 1);
                                return false;
                            }
                        });
                    }
                    /*if ($scope.SelectItem.length > 0) {
                     alert($scope.SelectItem.length);
                     }else{
                     alert('对不起未选中');
                     }*/
                };
                var getSelectClassrooms = function(node){
                    if(node.attribute === "Y" && node.isSelected){
                        $scope.areaList.push(
                            {
                                "id": node.id
                            }
                        );
                    }
                    if(node.nodes){
                        $.each(node.nodes, function(index, _node){
                            getSelectClassrooms(_node);
                        });
                    }
                };

                $scope.ok = function () {
                    $scope.areaList=[];
                    $scope.data=[];
                    $scope.node=[];
                    //调用树节点ID
                    getSelectClassrooms(tree[0]);
                    console.log($scope.areaList);
                    //视频源应用

                    TacticsService.videoApply(Classtime,$scope.areaList).then(
                        function(data){
                            if(data>0) {
                                growl.addSuccessMessage("应用成功");
                            }else{
                                growl.addErrorMessage("应用失败");
                            }
                            $modalInstance.close(true);
                        },
                        function(code){
                            //处理失败后操作
                            alert("添加失败!");
                        }
                    );
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.treeselectList = treeselectList;
                $scope.isCheckedClassroom = function(id){
                    var check = false;
                    $.each($scope.treeselectList, function (index, _treeList) {
                        if (_treeList.areaid === id) {
                            check = true;
                            return false;
                        }
                    });
                    return check;
                };
            };

            //Json--Tree
            var tacticsTrees = function(keywords,areaid){
                TreeService.mainTree(keywords,areaid).then(
                    function(data){
                        $scope.areaTree = data;
                        console.log('通过后台接口获取树接口');
                    },
                    function(){

                    }
                );
            };

    	$scope.initTatics = function(){
    		TacticsService.tactics().then(
                    function(data){
                    	if(data != null){
                    		if(data[0]!=null)
                    			$scope.upload = data[0];
                    		if(data[1]!=null)
                    			$scope.strategy = data[1];
                    		if(data[2]!=null)
                    			$scope.schedule = data[2];
                    		if(data[3]!=null)
                    			$scope.warm = data[3];
                    		
                    	}
                    },
                    function(code){
                        growl.addErrorMessage('发生意外错误');
                    }
                )
    	};
    	
        $scope.editEmail = function(){
            var modalInstance = $modal.open({
                templateUrl: 'classrooms/tactics/model/tactics.editEmail.modal.html',
                backdrop:'static',
                controller: EditEmailModalCtrl,
                resolve: {
                }
            }).result.then(
                    function(DeviceBtnType){
                    }
                );
        };
        var EditEmailModalCtrl = function ($scope, $modalInstance) 
        {

            $scope.ok = function(DeviceBtnType){
               $modalInstance.close(DeviceBtnType);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

    	$scope.save = function(){
    		TacticsService.save($scope.upload,$scope.strategy,$scope.schedule,$scope.warm).then(
                    function(data){
                    	if(data>0){
                    		growl.addSuccessMessage("保存成功");
                    		$scope.initTatics(); 
                    	}else{
                    		growl.addErrorMessage("保存失败");
                    	}
                    },
                    function(){
                    },
                    function(code){
                        growl.addErrorMessage('发生意外错误');
                    }
                )
    	};
    	//初始化视频信息
    	$scope.initVideoInfo = function(data){
    		$scope.videoInfo1={
    				enable:false,
    				code:data.value,
    				sort:1,
    				ismovie:true
    		};
    		$scope.videoInfo2={
    				enable:false,
    				code:data.value,
    				sort:2,
    				ismovie:false
    		};
    		$scope.videoInfo3={
    				enable:false,
    				code:data.value,
    				sort:3,
    				ismovie:false
    		};
    		$scope.videoInfo4={
    				enable:false,
    				code:data.value,
    				sort:4,
    				ismovie:false
    		};
    		$scope.videoInfo5={
    				enable:false,
    				code:data.value,
    				sort:5,
    				ismovie:false
    		};
    		$scope.videoInfo6={
    				enable:false,
    				code:data.value,
    				sort:6,
    				ismovie:false
    		};
    	};
    	//加载视频源
    	$scope.loadVideoInfo = function(data){
    		TacticsService.videoInfo(data).then(function(data){
    			$.each(data,function(index,videoInfo){
    				var sort = videoInfo.sort;
    				if(sort == $scope.videoInfo1.sort){
    					$scope.videoInfo1 = videoInfo;
    				}else if(sort == $scope.videoInfo2.sort){
    					$scope.videoInfo2 = videoInfo;
    				}else if(sort == $scope.videoInfo3.sort){
    					$scope.videoInfo3 = videoInfo;
    				}else if(sort == $scope.videoInfo4.sort){
    					$scope.videoInfo4 = videoInfo;
    				}else if(sort == $scope.videoInfo5.sort){
    					$scope.videoInfo5 = videoInfo;
    				}else if(sort == $scope.videoInfo6.sort){
    					$scope.videoInfo6 = videoInfo;
    				}
    			});
    		},function(){
    			
    		},function(code){
    			growl.addErrorMessage('发生意外错误');
    		});
    	};
    	//初始化录播方案
    	$scope.initPlayScheam = function(){
    		//加载跟踪机
    		TacticsService.deviceCode().then(function(data){
    			$scope.deviceCode = data;
    			$scope.scheam = data[0].value;
    			$scope.initVideoInfo(data[0]);
    		},function(){
    			
    		},function(code){
    			growl.addErrorMessage('发生意外错误');
    		});
    		
    		//加载方案
    		TacticsService.classScheam().then(function(data){
    			if(data != null){
    				$scope.classScheam = data;
    				$scope.loadVideoInfo(data[0].value);
    				
    			}
    		},function(){
    			
    		},function(code){
    			growl.addErrorMessage('发生意外错误');
    		});
    	};
         //改变录像方案进行查询
         $scope.scheamChange = function(value){
                $scope.videoscheam = value;
                 $scope.schem.address1 = $scope.physicsaddress[0].value;
                 $scope.schem.address2 = $scope.physicsaddress[0].value;
                 $scope.schem.address3 = $scope.physicsaddress[0].value;
                 $scope.schem.address4 = $scope.physicsaddress[0].value;
                 $scope.schem.address5 = $scope.physicsaddress[0].value;
                 $scope.schem.address6 = $scope.physicsaddress[0].value;
                 $scope.schem.address7 = $scope.physicsaddress[0].value;

                 $scope.schem.cardType1 = $scope.cardTypeok[0].value;
                 $scope.schem.cardType2 = $scope.cardTypeok[0].value;
                 $scope.schem.cardType3 = $scope.cardTypeok[0].value;
                 $scope.schem.cardType4 = $scope.cardTypeok[0].value;
                 $scope.schem.cardType5 = $scope.cardTypeok[0].value;
                 $scope.schem.cardType6 = $scope.cardTypeok[0].value;
                 $scope.schem.cardType7 = $scope.cardTypeok[0].value;

                 $scope.schem.backEnable1 = $scope.backEnableok[0].value;
                 $scope.schem.backEnable2 = $scope.backEnableok[0].value;
                 $scope.schem.backEnable3 = $scope.backEnableok[0].value;
                 $scope.schem.backEnable4 = $scope.backEnableok[0].value;
                 $scope.schem.backEnable5 = $scope.backEnableok[0].value;
                 $scope.schem.backEnable6 = $scope.backEnableok[0].value;
                 $scope.schem.backEnable7 = $scope.backEnableok[0].value;

                 $scope.schem.backType1 = $scope.backTypeok[0].value;
                 $scope.schem.backType2 = $scope.backTypeok[0].value;
                 $scope.schem.backType3 = $scope.backTypeok[0].value;
                 $scope.schem.backType4 = $scope.backTypeok[0].value;
                 $scope.schem.backType5 = $scope.backTypeok[0].value;
                 $scope.schem.backType6 = $scope.backTypeok[0].value;
                 $scope.schem.backType7 = $scope.backTypeok[0].value;

                 $scope.schem.videoResolution1 = $scope.videoResolutionok[0].value;
                 $scope.schem.videoResolution2 = $scope.videoResolutionok[0].value;
                 $scope.schem.videoResolution3 = $scope.videoResolutionok[0].value;
                 $scope.schem.videoResolution4 = $scope.videoResolutionok[0].value;
                 $scope.schem.videoResolution5 = $scope.videoResolutionok[0].value;
                 $scope.schem.videoResolution6 = $scope.videoResolutionok[0].value;
                 $scope.schem.videoResolution7 = $scope.videoResolutionok[0].value;

                 $scope.schem.videoType1 = $scope.videoTypeok[0].value;
                 $scope.schem.videoType2 = $scope.videoTypeok[0].value;
                 $scope.schem.videoType3 = $scope.videoTypeok[0].value;
                 $scope.schem.videoType4 = $scope.videoTypeok[0].value;
                 $scope.schem.videoType5 = $scope.videoTypeok[0].value;
                 $scope.schem.videoType6 = $scope.videoTypeok[0].value;
                 $scope.schem.videoType7 = $scope.videoTypeok[0].value;

                 $scope.schem.audioType1 = $scope.audioTypeok[0].value;
                 $scope.schem.audioType2 = $scope.audioTypeok[0].value;
                 $scope.schem.audioType3 = $scope.audioTypeok[0].value;
                 $scope.schem.audioType4 = $scope.audioTypeok[0].value;
                 $scope.schem.audioType5 = $scope.audioTypeok[0].value;
                 $scope.schem.audioType6 = $scope.audioTypeok[0].value;
                 $scope.schem.audioType7 = $scope.audioTypeok[0].value;


                 $scope.schem.videoCodeType1 = $scope.videoCodeTypeok[0].value;
                 $scope.schem.videoCodeType2 = $scope.videoCodeTypeok[0].value;
                 $scope.schem.videoCodeType3 = $scope.videoCodeTypeok[0].value;
                 $scope.schem.videoCodeType4 = $scope.videoCodeTypeok[0].value;
                 $scope.schem.videoCodeType5 = $scope.videoCodeTypeok[0].value;
                 $scope.schem.videoCodeType6 = $scope.videoCodeTypeok[0].value;
                 $scope.schem.videoCodeType7 = $scope.videoCodeTypeok[0].value;

                 $scope.schem.auditCodeType1 = $scope.auditCodeTypeok[0].value;
                 $scope.schem.auditCodeType2 = $scope.auditCodeTypeok[0].value;
                 $scope.schem.auditCodeType3 = $scope.auditCodeTypeok[0].value;
                 $scope.schem.auditCodeType4 = $scope.auditCodeTypeok[0].value;
                 $scope.schem.auditCodeType5 = $scope.auditCodeTypeok[0].value;
                 $scope.schem.auditCodeType6 = $scope.auditCodeTypeok[0].value;
                 $scope.schem.auditCodeType7 = $scope.auditCodeTypeok[0].value;

                 $scope.schem.recordProfile1 = $scope.recordProfileok[0].value;
                 $scope.schem.recordProfile2 = $scope.recordProfileok[0].value;
                 $scope.schem.recordProfile3 = $scope.recordProfileok[0].value;
                 $scope.schem.recordProfile4 = $scope.recordProfileok[0].value;
                 $scope.schem.recordProfile5 = $scope.recordProfileok[0].value;
                 $scope.schem.recordProfile6 = $scope.recordProfileok[0].value;
                 $scope.schem.recordProfile7 = $scope.recordProfileok[0].value;


                 $scope.schem.recordLevel1 = $scope.recordLevelok[0].value;
                 $scope.schem.recordLevel2 = $scope.recordLevelok[0].value;
                 $scope.schem.recordLevel3 = $scope.recordLevelok[0].value;
                 $scope.schem.recordLevel4 = $scope.recordLevelok[0].value;
                 $scope.schem.recordLevel5 = $scope.recordLevelok[0].value;
                 $scope.schem.recordLevel6 = $scope.recordLevelok[0].value;
                 $scope.schem.recordLevel7 = $scope.recordLevelok[0].value;


                 $scope.schem.recordEntropy1 = $scope.recordEntropyok[0].value;
                 $scope.schem.recordEntropy2 = $scope.recordEntropyok[0].value;
                 $scope.schem.recordEntropy3 = $scope.recordEntropyok[0].value;
                 $scope.schem.recordEntropy4 = $scope.recordEntropyok[0].value;
                 $scope.schem.recordEntropy5 = $scope.recordEntropyok[0].value;
                 $scope.schem.recordEntropy6 = $scope.recordEntropyok[0].value;
                 $scope.schem.recordEntropy7 = $scope.recordEntropyok[0].value;

                 $scope.schem.recordComplexity1 = $scope.recordComplexityok[0].value;
                 $scope.schem.recordComplexity2 = $scope.recordComplexityok[0].value;
                 $scope.schem.recordComplexity3 = $scope.recordComplexityok[0].value;
                 $scope.schem.recordComplexity4 = $scope.recordComplexityok[0].value;
                 $scope.schem.recordComplexity5 = $scope.recordComplexityok[0].value;
                 $scope.schem.recordComplexity6 = $scope.recordComplexityok[0].value;
                 $scope.schem.recordComplexity7 = $scope.recordComplexityok[0].value;

                 $scope.schem.bitrate1 = $scope.bitrateok[0].value;
                 $scope.schem.bitrate2 = $scope.bitrateok[0].value;
                 $scope.schem.bitrate3 = $scope.bitrateok[0].value;
                 $scope.schem.bitrate4 = $scope.bitrateok[0].value;
                 $scope.schem.bitrate5 = $scope.bitrateok[0].value;
                 $scope.schem.bitrate6 = $scope.bitrateok[0].value;
                 $scope.schem.bitrate7 = $scope.bitrateok[0].value;

                 $scope.schem.format1 = $scope.formatok[0].value;
                 $scope.schem.format2 = $scope.formatok[0].value;
                 $scope.schem.format3 = $scope.formatok[0].value;
                 $scope.schem.format4 = $scope.formatok[0].value;
                 $scope.schem.format5 = $scope.formatok[0].value;
                 $scope.schem.format6 = $scope.formatok[0].value;
                 $scope.schem.format7 = $scope.formatok[0].value;

                 $scope.schem.movieResoluation1 = $scope.movieResoluationok[0].value;
                 $scope.schem.movieResoluation2 = $scope.movieResoluationok[0].value;
                 $scope.schem.movieResoluation3 = $scope.movieResoluationok[0].value;
                 $scope.schem.movieResoluation4 = $scope.movieResoluationok[0].value;
                 $scope.schem.movieResoluation5 = $scope.movieResoluationok[0].value;
                 $scope.schem.movieResoluation6 = $scope.movieResoluationok[0].value;
                 $scope.schem.movieResoluation7 = $scope.movieResoluationok[0].value;

             TacticsService.VideoScheamChange(value).then(
                 function(data){
                     $.each(data,function(index,scheamContent){
                           if(scheamContent.sort === 1){
                                $scope.schem.address1 = scheamContent.address;
                                $scope.schem.cardType1 = scheamContent.cardType;
                                $scope.schem.backEnable1 = scheamContent.backEnable;
                                $scope.schem.backType1 = scheamContent.backType;
                                $scope.schem.videoResolution1 = scheamContent.videoResolution;
                                $scope.schem.videoType1 = scheamContent.videoType;
                                $scope.schem.audioType1 = scheamContent.audioType;
                                $scope.schem.videoCodeType1 = scheamContent.videoCodeType;
                                $scope.schem.auditCodeType1 = scheamContent.auditCodeType;
                                $scope.schem.bFrame1 = scheamContent.bFrame;
                                $scope.schem.recordProfile1 = scheamContent.recordProfile;
                                $scope.schem.recordLevel1 = scheamContent.recordLevel;
                                $scope.schem.recordEntropy1 = scheamContent.recordEntropy;
                                $scope.schem.recordComplexity1 = scheamContent.recordComplexity;
                                $scope.schem.framerate1 = scheamContent.framerate;
                                $scope.schem.format1 = scheamContent.format;
                                $scope.schem.gop1 = scheamContent.gop;
                                $scope.schem.movieResoluation1 = scheamContent.movieResoluation;
                           }
                         if(scheamContent.sort === 2){
                             $scope.schem.address2 = scheamContent.address;
                             $scope.schem.cardType2 = scheamContent.cardType;
                             $scope.schem.backEnable2 = scheamContent.backEnable;
                             $scope.schem.backType2 = scheamContent.backType;
                             $scope.schem.videoResolution2 = scheamContent.videoResolution;
                             $scope.schem.videoType2 = scheamContent.videoType;
                             $scope.schem.audioType2 = scheamContent.audioType;
                             $scope.schem.videoCodeType2 = scheamContent.videoCodeType;
                             $scope.schem.auditCodeType2 = scheamContent.auditCodeType;
                             $scope.schem.bFrame2 = scheamContent.bFrame;
                             $scope.schem.recordProfile2 = scheamContent.recordProfile;
                             $scope.schem.recordLevel2 = scheamContent.recordLevel;
                             $scope.schem.recordEntropy2 = scheamContent.recordEntropy;
                             $scope.schem.recordComplexity2 = scheamContent.recordComplexity;
                             $scope.schem.framerate2 = scheamContent.framerate;
                             $scope.schem.format2 = scheamContent.format;
                             $scope.schem.gop2 = scheamContent.gop;
                             $scope.schem.movieResoluation2 = scheamContent.movieResoluation;
                         }if(scheamContent.sort === 3){
                             $scope.schem.address3 = scheamContent.address;
                             $scope.schem.cardType3 = scheamContent.cardType;
                             $scope.schem.backEnable3 = scheamContent.backEnable;
                             $scope.schem.backType3 = scheamContent.backType;
                             $scope.schem.videoResolution3 = scheamContent.videoResolution;
                             $scope.schem.videoType3 = scheamContent.videoType;
                             $scope.schem.audioType3 = scheamContent.audioType;
                             $scope.schem.videoCodeType3 = scheamContent.videoCodeType;
                             $scope.schem.auditCodeType3 = scheamContent.auditCodeType;
                             $scope.schem.bFrame3 = scheamContent.bFrame;
                             $scope.schem.recordProfile3 = scheamContent.recordProfile;
                             $scope.schem.recordLevel3 = scheamContent.recordLevel;
                             $scope.schem.recordEntropy3 = scheamContent.recordEntropy;
                             $scope.schem.recordComplexity3 = scheamContent.recordComplexity;
                             $scope.schem.framerate3 = scheamContent.framerate;
                             $scope.schem.format3 = scheamContent.format;
                             $scope.schem.gop3 = scheamContent.gop;
                             $scope.schem.movieResoluation3 = scheamContent.movieResoluation;
                         }if(scheamContent.sort === 4){
                             $scope.schem.address4 = scheamContent.address;
                             $scope.schem.cardType4 = scheamContent.cardType;
                             $scope.schem.backEnable4 = scheamContent.backEnable;
                             $scope.schem.backType4 = scheamContent.backType;
                             $scope.schem.videoResolution4 = scheamContent.videoResolution;
                             $scope.schem.videoType4 = scheamContent.videoType;
                             $scope.schem.audioType4 = scheamContent.audioType;
                             $scope.schem.videoCodeType4 = scheamContent.videoCodeType;
                             $scope.schem.auditCodeType4 = scheamContent.auditCodeType;
                             $scope.schem.bFrame4 = scheamContent.bFrame;
                             $scope.schem.recordProfile4 = scheamContent.recordProfile;
                             $scope.schem.recordLevel4 = scheamContent.recordLevel;
                             $scope.schem.recordEntropy4 = scheamContent.recordEntropy;
                             $scope.schem.recordComplexity4 = scheamContent.recordComplexity;
                             $scope.schem.framerate4 = scheamContent.framerate;
                             $scope.schem.format4 = scheamContent.format;
                             $scope.schem.gop4 = scheamContent.gop;
                             $scope.schem.movieResoluation4 = scheamContent.movieResoluation;
                         }if(scheamContent.sort === 5){
                             $scope.schem.address5 = scheamContent.address;
                             $scope.schem.cardType5 = scheamContent.cardType;
                             $scope.schem.backEnable5 = scheamContent.backEnable;
                             $scope.schem.backType5 = scheamContent.backType;
                             $scope.schem.videoResolution5 = scheamContent.videoResolution;
                             $scope.schem.videoType5 = scheamContent.videoType;
                             $scope.schem.audioType5 = scheamContent.audioType;
                             $scope.schem.videoCodeType5 = scheamContent.videoCodeType;
                             $scope.schem.auditCodeType5 = scheamContent.auditCodeType;
                             $scope.schem.bFrame5 = scheamContent.bFrame;
                             $scope.schem.recordProfile5 = scheamContent.recordProfile;
                             $scope.schem.recordLevel5 = scheamContent.recordLevel;
                             $scope.schem.recordEntropy5 = scheamContent.recordEntropy;
                             $scope.schem.recordComplexity5 = scheamContent.recordComplexity;
                             $scope.schem.framerate5 = scheamContent.framerate;
                             $scope.schem.format5 = scheamContent.format;
                             $scope.schem.gop5 = scheamContent.gop;
                             $scope.schem.movieResoluation5 = scheamContent.movieResoluation;
                         }if(scheamContent.sort === 6){
                             $scope.schem.address6 = scheamContent.address;
                             $scope.schem.cardType6 = scheamContent.cardType;
                             $scope.schem.backEnable6 = scheamContent.backEnable;
                             $scope.schem.backType6 = scheamContent.backType;
                             $scope.schem.videoResolution6 = scheamContent.videoResolution;
                             $scope.schem.videoType6 = scheamContent.videoType;
                             $scope.schem.audioType6 = scheamContent.audioType;
                             $scope.schem.videoCodeType6 = scheamContent.videoCodeType;
                             $scope.schem.auditCodeType6 = scheamContent.auditCodeType;
                             $scope.schem.bFrame6 = scheamContent.bFrame;
                             $scope.schem.recordProfile6 = scheamContent.recordProfile;
                             $scope.schem.recordLevel6 = scheamContent.recordLevel;
                             $scope.schem.recordEntropy6 = scheamContent.recordEntropy;
                             $scope.schem.recordComplexity6 = scheamContent.recordComplexity;
                             $scope.schem.framerate6 = scheamContent.framerate;
                             $scope.schem.format6 = scheamContent.format;
                             $scope.schem.gop6 = scheamContent.gop;
                             $scope.schem.movieResoluation6 = scheamContent.movieResoluation;
                         }if(scheamContent.sort === 7){
                             $scope.schem.address7 = scheamContent.address;
                             $scope.schem.cardType7 = scheamContent.cardType;
                             $scope.schem.backEnable7 = scheamContent.backEnable;
                             $scope.schem.backType7 = scheamContent.backType;
                             $scope.schem.videoResolution7 = scheamContent.videoResolution;
                             $scope.schem.videoType7 = scheamContent.videoType;
                             $scope.schem.audioType7 = scheamContent.audioType;
                             $scope.schem.videoCodeType7 = scheamContent.videoCodeType;
                             $scope.schem.auditCodeType7 = scheamContent.auditCodeType;
                             $scope.schem.bFrame7 = scheamContent.bFrame;
                             $scope.schem.recordProfile7 = scheamContent.recordProfile;
                             $scope.schem.recordLevel7 = scheamContent.recordLevel;
                             $scope.schem.recordEntropy7 = scheamContent.recordEntropy;
                             $scope.schem.recordComplexity7 = scheamContent.recordComplexity;
                             $scope.schem.framerate7 = scheamContent.framerate;
                             $scope.schem.format7 = scheamContent.format;
                             $scope.schem.gop7 = scheamContent.gop;
                             $scope.schem.movieResoluation7 = scheamContent.movieResoluation;
                         }
                     });
                 },
                 function(){

                 }
             );

         };
        //初始化加载录像方案
        $scope.initVideoScheam = function(){
            $scope.VideoScheam("videoscheam");
            $scope.VideoScheam("address");
            $scope.VideoScheam("cardType");
            $scope.VideoScheam("backEnable");
            $scope.VideoScheam("backType");
            $scope.VideoScheam("videoResolution");
            $scope.VideoScheam("videoType");
            $scope.VideoScheam("audioType");
            $scope.VideoScheam("videoCodeType");
            $scope.VideoScheam("auditCodeType");
            $scope.VideoScheam("bFrame");
            $scope.VideoScheam("recordProfile");
            $scope.VideoScheam("recordLevel");
            $scope.VideoScheam("recordEntropy");
            $scope.VideoScheam("recordComplexity");
            $scope.VideoScheam("bitrate");
            $scope.VideoScheam("framerate");
            $scope.VideoScheam("format");
            $scope.VideoScheam("movieResoluation");

            $timeout(function(){
                $scope.scheamChange($scope.videoscheamok[0].value);
            },500);
        };

    	//初始化录像方案
    	$scope.VideoScheam = function(keywords){

    		//加载跟踪机
    		TacticsService.code(keywords).then(function(data){
                console.log(data);
                if(keywords === 'videoscheam'){
                    $scope.videoscheamok=data;
                    $scope.videoscheam = data[0].value;
                }
                if(keywords === 'address'){
                    $scope.physicsaddress=data;
                    $scope.schem.address1 = data[0].value;
                    $scope.schem.address2 = data[0].value;
                    $scope.schem.address3 = data[0].value;
                    $scope.schem.address4 = data[0].value;
                    $scope.schem.address5 = data[0].value;
                    $scope.schem.address6 = data[0].value;
                    $scope.schem.address7 = data[0].value;
                }
                if(keywords === 'cardType'){
                    $scope.cardTypeok=data;
                    $scope.schem.cardType1 = data[0].value;
                    $scope.schem.cardType2 = data[0].value;
                    $scope.schem.cardType3 = data[0].value;
                    $scope.schem.cardType4 = data[0].value;
                    $scope.schem.cardType5 = data[0].value;
                    $scope.schem.cardType6 = data[0].value;
                    $scope.schem.cardType7 = data[0].value;
                }
                if(keywords === 'backEnable'){
                    $scope.backEnableok=data;
                    $scope.schem.backEnable1 = data[0].value;
                    $scope.schem.backEnable2 = data[0].value;
                    $scope.schem.backEnable3 = data[0].value;
                    $scope.schem.backEnable4 = data[0].value;
                    $scope.schem.backEnable5 = data[0].value;
                    $scope.schem.backEnable6 = data[0].value;
                    $scope.schem.backEnable7 = data[0].value;
                }
                if(keywords === 'backType'){
                    $scope.backTypeok=data;
                    $scope.backType1 = data[0].value;
                    $scope.backType2 = data[0].value;
                    $scope.backType3 = data[0].value;
                    $scope.backType4 = data[0].value;
                    $scope.backType5 = data[0].value;
                    $scope.backType6 = data[0].value;
                    $scope.backType7 = data[0].value;
                }
                if(keywords === 'videoResolution'){
                    $scope.videoResolutionok=data;
                    $scope.schem.videoResolution1 = data[0].value;
                    $scope.schem.videoResolution2 = data[0].value;
                    $scope.schem.videoResolution3 = data[0].value;
                    $scope.schem.videoResolution4 = data[0].value;
                    $scope.schem.videoResolution5 = data[0].value;
                    $scope.schem.videoResolution6 = data[0].value;
                    $scope.schem.videoResolution7 = data[0].value;
                }
                if(keywords === 'videoType'){
                    $scope.videoTypeok=data;
                    $scope.schem.videoType1 = data[0].value;
                    $scope.schem.videoType2 = data[0].value;
                    $scope.schem.videoType3 = data[0].value;
                    $scope.schem.videoType4 = data[0].value;
                    $scope.schem.videoType5 = data[0].value;
                    $scope.schem.videoType6 = data[0].value;
                    $scope.schem.videoType7 = data[0].value;
                }
                if(keywords === 'audioType'){
                    $scope.audioTypeok=data;
                    $scope.schem.audioType1 = data[0].value;
                    $scope.schem.audioType2 = data[0].value;
                    $scope.schem.audioType3 = data[0].value;
                    $scope.schem.audioType4 = data[0].value;
                    $scope.schem.audioType5 = data[0].value;
                    $scope.schem.audioType6 = data[0].value;
                    $scope.schem.audioType7 = data[0].value;
                }
                if(keywords === 'videoCodeType'){
                    $scope.videoCodeTypeok=data;
                    $scope.schem.videoCodeType1 = data[0].value;
                    $scope.schem.videoCodeType2 = data[0].value;
                    $scope.schem.videoCodeType3 = data[0].value;
                    $scope.schem.videoCodeType4 = data[0].value;
                    $scope.schem.videoCodeType5 = data[0].value;
                    $scope.schem.videoCodeType6 = data[0].value;
                    $scope.schem.videoCodeType7 = data[0].value;
                }
                if(keywords === 'auditCodeType'){
                    $scope.auditCodeTypeok=data;
                    $scope.schem.auditCodeType1 = data[0].value;
                    $scope.schem.auditCodeType2 = data[0].value;
                    $scope.schem.auditCodeType3 = data[0].value;
                    $scope.schem.auditCodeType4 = data[0].value;
                    $scope.schem.auditCodeType5 = data[0].value;
                    $scope.schem.auditCodeType6 = data[0].value;
                    $scope.schem.auditCodeType7 = data[0].value;
                }

                if(keywords === 'recordProfile'){
                    $scope.recordProfileok=data;
                    $scope.schem.recordProfile1 = data[0].value;
                    $scope.schem.recordProfile2 = data[0].value;
                    $scope.schem.recordProfile3 = data[0].value;
                    $scope.schem.recordProfile4 = data[0].value;
                    $scope.schem.recordProfile5 = data[0].value;
                    $scope.schem.recordProfile6 = data[0].value;
                    $scope.schem.recordProfile7 = data[0].value;
                }
                if(keywords === 'recordLevel'){
                    $scope.recordLevelok=data;
                    $scope.schem.recordLevel1 = data[0].value;
                    $scope.schem.recordLevel2 = data[0].value;
                    $scope.schem.recordLevel3 = data[0].value;
                    $scope.schem.recordLevel4 = data[0].value;
                    $scope.schem.recordLevel5 = data[0].value;
                    $scope.schem.recordLevel6 = data[0].value;
                    $scope.schem.recordLevel7 = data[0].value;
                }
                if(keywords === 'recordEntropy'){
                    $scope.recordEntropyok=data;
                    $scope.schem.recordEntropy1 = data[0].value;
                    $scope.schem.recordEntropy2 = data[0].value;
                    $scope.schem.recordEntropy3 = data[0].value;
                    $scope.schem.recordEntropy4 = data[0].value;
                    $scope.schem.recordEntropy5 = data[0].value;
                    $scope.schem.recordEntropy6 = data[0].value;
                    $scope.schem.recordEntropy7 = data[0].value;
                }
                if(keywords === 'recordComplexity'){
                    $scope.recordComplexityok=data;
                    $scope.schem.recordComplexity1 = data[0].value;
                    $scope.schem.recordComplexity2 = data[0].value;
                    $scope.schem.recordComplexity3 = data[0].value;
                    $scope.schem.recordComplexity4 = data[0].value;
                    $scope.schem.recordComplexity5 = data[0].value;
                    $scope.schem.recordComplexity6 = data[0].value;
                    $scope.schem.recordComplexity7 = data[0].value;
                }
                if(keywords === 'bitrate'){
                    $scope.bitrateok=data;
                    $scope.schem.bitrate1 = data[0].value;
                    $scope.schem.bitrate2 = data[0].value;
                    $scope.schem.bitrate3 = data[0].value;
                    $scope.schem.bitrate4 = data[0].value;
                    $scope.schem.bitrate5 = data[0].value;
                    $scope.schem.bitrate6 = data[0].value;
                    $scope.schem.bitrate7 = data[0].value;
                }

                if(keywords === 'format'){
                    $scope.formatok=data;
                    $scope.schem.format1 = data[0].value;
                    $scope.schem.format2 = data[0].value;
                    $scope.schem.format3 = data[0].value;
                    $scope.schem.format4 = data[0].value;
                    $scope.schem.format5 = data[0].value;
                    $scope.schem.format6 = data[0].value;
                    $scope.schem.format7 = data[0].value;
                }
                if(keywords === 'movieResoluation'){
                    $scope.movieResoluationok=data;
                    $scope.schem.movieResoluation1 = data[0].value;
                    $scope.schem.movieResoluation2 = data[0].value;
                    $scope.schem.movieResoluation3 = data[0].value;
                    $scope.schem.movieResoluation4 = data[0].value;
                    $scope.schem.movieResoluation5 = data[0].value;
                    $scope.schem.movieResoluation6 = data[0].value;
                    $scope.schem.movieResoluation7 = data[0].value;
                }

    		},function(){

    		},function(code){
    			growl.addErrorMessage('发生意外错误');
    		});

    	};
        //保存录像方案
        $scope.SaveVideoSchem = function(){
            var keywords = {
                "scheam":$scope.videoscheam,
                "videos":[
                    {
                        sort:1,
                        address:$scope.schem.address1,
                        cardType:$scope.schem.cardType1,
                        backEnable:$scope.schem.backEnable1,
                        backType:$scope.schem.backType1,
                        videoResolution:$scope.schem.videoResolution1,
                        videoType:$scope.schem.videoType1,
                        audioType:$scope.schem.audioType1,
                        videoCodeType:$scope.schem.videoCodeType1,
                        auditCodeType:$scope.schem.auditCodeType1,
                        bFrame:$scope.schem.bFrame1 === undefined ? '' : $scope.schem.bFrame1,
                        recordProfile:$scope.schem.recordProfile1,
                        recordLevel:$scope.schem.recordLevel1,
                        recordEntropy:$scope.schem.recordEntropy1,
                        recordComplexity:$scope.schem.recordComplexity1,
                        gop:$scope.schem.gop1 === undefined ? '': $scope.schem.gop1,
                        framerate:$scope.schem.framerate1 === undefined ? '': $scope.schem.framerate1,
                        bitrate:$scope.schem.bitrate1,
                        format:$scope.schem.format1,
                        movieResoluation:$scope.schem.movieResoluation1

                    },{
                        sort:2,
                        address:$scope.schem.address2,
                        cardType:$scope.schem.cardType2,
                        backEnable:$scope.schem.backEnable2,
                        backType:$scope.schem.backType2,
                        videoResolution:$scope.schem.videoResolution2,
                        videoType:$scope.schem.videoType2,
                        audioType:$scope.schem.audioType2,
                        videoCodeType:$scope.schem.videoCodeType2,
                        auditCodeType:$scope.schem.auditCodeType2,
                        bFrame:$scope.schem.bFrame2 === undefined ? '' : $scope.schem.bFrame2,
                        recordProfile:$scope.schem.recordProfile2,
                        recordLevel:$scope.schem.recordLevel2,
                        recordEntropy:$scope.schem.recordEntropy2,
                        recordComplexity:$scope.schem.recordComplexity2,
                        gop:$scope.schem.gop2 === undefined ? '': $scope.schem.gop2,
                        framerate:$scope.schem.framerate2 === undefined ? '': $scope.schem.framerate2,
                        bitrate:$scope.schem.bitrate2,
                        format:$scope.schem.format2,
                        movieResoluation:$scope.schem.movieResoluation2

                    },{
                        sort:3,
                        address:$scope.schem.address3,
                        cardType:$scope.schem.cardType3,
                        backEnable:$scope.schem.backEnable3,
                        backType:$scope.schem.backType3,
                        videoResolution:$scope.schem.videoResolution3,
                        videoType:$scope.schem.videoType3,
                        audioType:$scope.schem.audioType3,
                        videoCodeType:$scope.schem.videoCodeType3,
                        auditCodeType:$scope.schem.auditCodeType3,
                        bFrame:$scope.schem.bFrame3 === undefined ? '' : $scope.schem.bFrame3,
                        recordProfile:$scope.schem.recordProfile3,
                        recordLevel:$scope.schem.recordLevel3,
                        recordEntropy:$scope.schem.recordEntropy3,
                        recordComplexity:$scope.schem.recordComplexity3,
                        gop:$scope.schem.gop3 === undefined ? '': $scope.schem.gop3,
                        framerate:$scope.schem.framerate3 === undefined ? '': $scope.schem.framerate3,
                        bitrate:$scope.schem.bitrate3,
                        format:$scope.schem.format3,
                        movieResoluation:$scope.schem.movieResoluation3

                    },{
                        sort:4,
                        address:$scope.schem.address4,
                        cardType:$scope.schem.cardType4,
                        backEnable:$scope.schem.backEnable4,
                        backType:$scope.schem.backType4,
                        videoResolution:$scope.schem.videoResolution4,
                        videoType:$scope.schem.videoType4,
                        audioType:$scope.schem.audioType4,
                        videoCodeType:$scope.schem.videoCodeType4,
                        auditCodeType:$scope.schem.auditCodeType4,
                        bFrame:$scope.schem.bFrame4 === undefined ? '' : $scope.schem.bFrame4,
                        recordProfile:$scope.schem.recordProfile4,
                        recordLevel:$scope.schem.recordLevel4,
                        recordEntropy:$scope.schem.recordEntropy4,
                        recordComplexity:$scope.schem.recordComplexity4,
                        gop:$scope.schem.gop4 === undefined ? '': $scope.schem.gop4,
                        framerate:$scope.schem.framerate4 === undefined ? '': $scope.schem.framerate4,
                        bitrate:$scope.schem.bitrate4,
                        format:$scope.schem.format4,
                        movieResoluation:$scope.schem.movieResoluation4

                    },{
                        sort:5,
                        address:$scope.schem.address5,
                        cardType:$scope.schem.cardType5,
                        backEnable:$scope.schem.backEnable5,
                        backType:$scope.schem.backType5,
                        videoResolution:$scope.schem.videoResolution5,
                        videoType:$scope.schem.videoType5,
                        audioType:$scope.schem.audioType5,
                        videoCodeType:$scope.schem.videoCodeType5,
                        auditCodeType:$scope.schem.auditCodeType5,
                        bFrame:$scope.schem.bFrame5 === undefined ? '' : $scope.schem.bFrame5,
                        recordProfile:$scope.schem.recordProfile5,
                        recordLevel:$scope.schem.recordLevel5,
                        recordEntropy:$scope.schem.recordEntropy5,
                        recordComplexity:$scope.schem.recordComplexity5,
                        gop:$scope.schem.gop5 === undefined ? '': $scope.schem.gop5,
                        framerate:$scope.schem.framerate5 === undefined ? '': $scope.schem.framerate5,
                        bitrate:$scope.schem.bitrate5,
                        format:$scope.schem.format5,
                        movieResoluation:$scope.schem.movieResoluation5

                    },{
                        sort:6,
                        address:$scope.schem.address6,
                        cardType:$scope.schem.cardType6,
                        backEnable:$scope.schem.backEnable6,
                        backType:$scope.schem.backType6,
                        videoResolution:$scope.schem.videoResolution6,
                        videoType:$scope.schem.videoType6,
                        audioType:$scope.schem.audioType6,
                        videoCodeType:$scope.schem.videoCodeType6,
                        auditCodeType:$scope.schem.auditCodeType6,
                        bFrame:$scope.schem.bFrame6 === undefined ? '' : $scope.schem.bFrame6,
                        recordProfile:$scope.schem.recordProfile6,
                        recordLevel:$scope.schem.recordLevel6,
                        recordEntropy:$scope.schem.recordEntropy6,
                        recordComplexity:$scope.schem.recordComplexity6,
                        gop:$scope.schem.gop6 === undefined ? '': $scope.schem.gop6,
                        framerate:$scope.schem.framerate6 === undefined ? '': $scope.schem.framerate6,
                        bitrate:$scope.schem.bitrate6,
                        format:$scope.schem.format6,
                        movieResoluation:$scope.schem.movieResoluation6

                    },{
                        sort:7,
                        address:$scope.schem.address7,
                        cardType:$scope.schem.cardType7,
                        backEnable:$scope.schem.backEnable7,
                        backType:$scope.schem.backType7,
                        videoResolution:$scope.schem.videoResolution7,
                        videoType:$scope.schem.videoType7,
                        audioType:$scope.schem.audioType7,
                        videoCodeType:$scope.schem.videoCodeType7,
                        auditCodeType:$scope.schem.auditCodeType7,
                        bFrame:$scope.schem.bFrame7 === undefined ? '' : $scope.schem.bFrame7,
                        recordProfile:$scope.schem.recordProfile7,
                        recordLevel:$scope.schem.recordLevel7,
                        recordEntropy:$scope.schem.recordEntropy7,
                        recordComplexity:$scope.schem.recordComplexity7,
                        gop:$scope.schem.gop7 === undefined ? '': $scope.schem.gop7,
                        framerate:$scope.schem.framerate7 === undefined ? '': $scope.schem.framerate7,
                        bitrate:$scope.schem.bitrate7,
                        format:$scope.schem.format7,
                        movieResoluation:$scope.schem.movieResoluation7

                    }

                ]
            };
            TacticsService.SaveVideoSchem(keywords).then(
                function(data){
                    if(data>0){
                        growl.addSuccessMessage('添加成功');
                    }else{
                        growl.addErrorMessage('添加失败');
                    }

                },
                function(){

                }
            );
        };
    	//选择方案
    	$scope.selectScheam = function(scheam){
    		$scope.initVideoInfo($scope.deviceCode[0]);
    		$scope.loadVideoInfo(scheam)
    	};
    	$scope.ismovie1 = function(){
    		$scope.videoInfo2.ismovie = false;
    		$scope.videoInfo3.ismovie = false;
    		$scope.videoInfo4.ismovie = false;
    		$scope.videoInfo5.ismovie = false;
    		$scope.videoInfo6.ismovie = false;
    	};
    	$scope.ismovie2 = function(){
    		$scope.videoInfo1.ismovie = false;
    		$scope.videoInfo3.ismovie = false;
    		$scope.videoInfo4.ismovie = false;
    		$scope.videoInfo5.ismovie = false;
    		$scope.videoInfo6.ismovie = false;
    	};
    	$scope.ismovie3 = function(){
    		$scope.videoInfo1.ismovie = false;
    		$scope.videoInfo2.ismovie = false;
    		$scope.videoInfo4.ismovie = false;
    		$scope.videoInfo5.ismovie = false;
    		$scope.videoInfo6.ismovie = false;
    	};
    	$scope.ismovie4 = function(){
    		$scope.videoInfo1.ismovie = false;
    		$scope.videoInfo2.ismovie = false;
    		$scope.videoInfo3.ismovie = false;
    		$scope.videoInfo5.ismovie = false;
    		$scope.videoInfo6.ismovie = false;
    	};
    	$scope.ismovie5 = function(){
    		$scope.videoInfo1.ismovie = false;
    		$scope.videoInfo2.ismovie = false;
    		$scope.videoInfo3.ismovie = false;
    		$scope.videoInfo4.ismovie = false;
    		$scope.videoInfo6.ismovie = false;
    	};
    	$scope.ismovie6 = function(){
    		$scope.videoInfo1.ismovie = false;
    		$scope.videoInfo2.ismovie = false;
    		$scope.videoInfo3.ismovie = false;
    		$scope.videoInfo4.ismovie = false;
    		$scope.videoInfo5.ismovie = false;
    	};
    	//保存视频源
    	$scope.saveScheam = function(scheam){
    		var data = [];
    		$scope.checkVideoInfo(data,$scope.videoInfo1);
    		$scope.checkVideoInfo(data,$scope.videoInfo2);
    		$scope.checkVideoInfo(data,$scope.videoInfo3);
    		$scope.checkVideoInfo(data,$scope.videoInfo4);
    		$scope.checkVideoInfo(data,$scope.videoInfo5);
    		$scope.checkVideoInfo(data,$scope.videoInfo6);
    		console.log(data);
    		if(data!=null)
    		TacticsService.updateScheam(scheam,data).then(function(data){
    			if(data>0){
    				growl.addSuccessMessage("保存成功");
    			}else{
    				growl.addErrorMessage('发生意外错误');
    			}
    		},function(code){
    			growl.addErrorMessage('发生意外错误');
    		});
    	};
    	$scope.checkVideoInfo = function(data,videoInfo){
    		if(videoInfo.name != null&&videoInfo.filename!=null&&videoInfo.enable==true){
    			
    			data[data.length]=videoInfo;
    		}
    	};

        //初始化RTSP方案
        $scope.RtspScheam = function(keywords){

            //加载跟踪机
            TacticsService.code(keywords).then(function(data){
                console.log(data);
                if(keywords === 'rtspscheam'){
                    $scope.rtspscheamok=data;
                    $scope.rtspscheam = data[0].value;
                }

                if(keywords === 'videoCodeType'){
                    $scope.videoCodeTypeok=data;
                    $scope.schem.videoCodeType1 = data[0].value;
                    $scope.schem.videoCodeType2 = data[0].value;
                    $scope.schem.videoCodeType3 = data[0].value;
                    $scope.schem.videoCodeType4 = data[0].value;
                    $scope.schem.videoCodeType5 = data[0].value;
                    $scope.schem.videoCodeType6 = data[0].value;
                    $scope.schem.videoCodeType7 = data[0].value;
                }
                if(keywords === 'auditCodeType'){
                    $scope.auditCodeTypeok=data;
                    $scope.schem.auditCodeType1 = data[0].value;
                    $scope.schem.auditCodeType2 = data[0].value;
                    $scope.schem.auditCodeType3 = data[0].value;
                    $scope.schem.auditCodeType4 = data[0].value;
                    $scope.schem.auditCodeType5 = data[0].value;
                    $scope.schem.auditCodeType6 = data[0].value;
                    $scope.schem.auditCodeType7 = data[0].value;
                }

                if(keywords === 'recordProfile'){
                    $scope.recordProfileok=data;
                    $scope.schem.recordProfile1 = data[0].value;
                    $scope.schem.recordProfile2 = data[0].value;
                    $scope.schem.recordProfile3 = data[0].value;
                    $scope.schem.recordProfile4 = data[0].value;
                    $scope.schem.recordProfile5 = data[0].value;
                    $scope.schem.recordProfile6 = data[0].value;
                    $scope.schem.recordProfile7 = data[0].value;
                }
                if(keywords === 'recordLevel'){
                    $scope.recordLevelok=data;
                    $scope.schem.recordLevel1 = data[0].value;
                    $scope.schem.recordLevel2 = data[0].value;
                    $scope.schem.recordLevel3 = data[0].value;
                    $scope.schem.recordLevel4 = data[0].value;
                    $scope.schem.recordLevel5 = data[0].value;
                    $scope.schem.recordLevel6 = data[0].value;
                    $scope.schem.recordLevel7 = data[0].value;
                }
                if(keywords === 'recordEntropy'){
                    $scope.recordEntropyok=data;
                    $scope.schem.recordEntropy1 = data[0].value;
                    $scope.schem.recordEntropy2 = data[0].value;
                    $scope.schem.recordEntropy3 = data[0].value;
                    $scope.schem.recordEntropy4 = data[0].value;
                    $scope.schem.recordEntropy5 = data[0].value;
                    $scope.schem.recordEntropy6 = data[0].value;
                    $scope.schem.recordEntropy7 = data[0].value;
                }
                if(keywords === 'recordComplexity'){
                    $scope.recordComplexityok=data;
                    $scope.schem.recordComplexity1 = data[0].value;
                    $scope.schem.recordComplexity2 = data[0].value;
                    $scope.schem.recordComplexity3 = data[0].value;
                    $scope.schem.recordComplexity4 = data[0].value;
                    $scope.schem.recordComplexity5 = data[0].value;
                    $scope.schem.recordComplexity6 = data[0].value;
                    $scope.schem.recordComplexity7 = data[0].value;
                }
                if(keywords === 'bitrate'){
                    $scope.bitrateok=data;
                    $scope.schem.bitrate1 = data[0].value;
                    $scope.schem.bitrate2 = data[0].value;
                    $scope.schem.bitrate3 = data[0].value;
                    $scope.schem.bitrate4 = data[0].value;
                    $scope.schem.bitrate5 = data[0].value;
                    $scope.schem.bitrate6 = data[0].value;
                    $scope.schem.bitrate7 = data[0].value;
                }

                if(keywords === 'movieResoluation'){
                    $scope.movieResoluationok=data;
                    $scope.schem.movieResoluation1 = data[0].value;
                    $scope.schem.movieResoluation2 = data[0].value;
                    $scope.schem.movieResoluation3 = data[0].value;
                    $scope.schem.movieResoluation4 = data[0].value;
                    $scope.schem.movieResoluation5 = data[0].value;
                    $scope.schem.movieResoluation6 = data[0].value;
                    $scope.schem.movieResoluation7 = data[0].value;
                }

            },function(){

            },function(code){
                growl.addErrorMessage('发生意外错误');
            });

        };


        //初始化RTMP方案
        $scope.RtmpScheam = function(keywords){

            //加载跟踪机
            TacticsService.code(keywords).then(function(data){
                console.log(data);
                if(keywords === 'rtmpscheam'){
                    $scope.rtmpscheamok=data;
                    $scope.rtmpscheam = data[0].value;
                }
                if(keywords === 'videoCodeType'){
                    $scope.videoCodeTypeok=data;
                    $scope.schem.videoCodeType = data[0].value;
                }
                if(keywords === 'auditCodeType') {
                    $scope.auditCodeTypeok = data;
                    $scope.schem.auditCodeType = data[0].value;
                }
                if (keywords === 'recordProfile') {
                    $scope.recordProfileok = data;
                    $scope.schem.recordProfile = data[0].value;
                }
                if (keywords === 'recordLevel') {
                    $scope.recordLevelok = data;
                    $scope.schem.recordLevel = data[0].value;
                }
                if (keywords === 'recordEntropy') {
                    $scope.recordEntropyok = data;
                    $scope.schem.recordEntropy = data[0].value;
                }
                if (keywords === 'recordComplexity') {
                    $scope.recordComplexityok = data;
                    $scope.schem.recordComplexity = data[0].value;
                }
                if (keywords === 'bitrate') {
                    $scope.bitrateok = data;
                    $scope.schem.bitrate = data[0].value;
                }

                if (keywords === 'movieResoluation') {
                    $scope.movieResoluationok = data;
                    $scope.schem.movieResoluation = data[0].value;
                }
            },function(){

            },function(code){
                growl.addErrorMessage('发生意外错误');
            });

        };
        $scope.initLightSet = function(){
        	$scope.getLightList("");
        }
        $scope.initRTMPSchem = function(){
            $scope.RtmpScheam("rtmpscheam");
            $scope.RtmpScheam("videoCodeType");
            $scope.RtmpScheam("auditCodeType");
            $scope.RtmpScheam("bFrame");
            $scope.RtmpScheam("recordProfile");
            $scope.RtmpScheam("recordLevel");
            $scope.RtmpScheam("recordEntropy");
            $scope.RtmpScheam("recordComplexity");
            $scope.RtmpScheam("bitrate");
            $scope.RtmpScheam("framerate");
            $scope.RtmpScheam("movieResoluation");

            $timeout(function(){
                $scope.RtmpscheamChange($scope.rtmpscheamok[0].value);
            },500);

        };

        //改变RTMP方案进行变化
        $scope.RtmpscheamChange = function(value){
            $scope.rtmpscheam = value;

            $scope.schem.videoCodeType = $scope.videoCodeTypeok[0].value;
            $scope.schem.auditCodeType = $scope.auditCodeTypeok[0].value;
            $scope.schem.recordProfile = $scope.recordProfileok[0].value;
            $scope.schem.recordLevel = $scope.recordLevelok[0].value;
            $scope.schem.recordEntropy = $scope.recordEntropyok[0].value;
            $scope.schem.recordComplexity = $scope.recordComplexityok[0].value;
            $scope.schem.bitrate = $scope.bitrateok[0].value;
            $scope.schem.movieResoluation = $scope.movieResoluationok[0].value;
            $scope.schem.bFrame = '';
            $scope.schem.gop = '';
            $scope.schem.framerate = '';
                TacticsService.RTMPScheamChange(value).then(
                function(data){
                    if(data !== ''){
                        $scope.schem.videoCodeType = data.videoCodeType;
                        $scope.schem.auditCodeType = data.auditCodeType;
                        $scope.schem.bFrame = data.bFrame;
                        $scope.schem.recordProfile = data.recordProfile;
                        $scope.schem.recordLevel = data.recordLevel;
                        $scope.schem.recordEntropy = data.recordEntropy;
                        $scope.schem.recordComplexity = data.recordComplexity;
                        $scope.schem.framerate = data.framerate;
                        $scope.schem.movieResoluation = data.movieResoluation;
                        $scope.schem.gop = data.gop;
                    }
                },
                function(){

                }
            );

        };

        //Rtsp方案初始化查询
        $scope.initRTSPSchem = function(){

            $scope.RtspScheam("rtspscheam");
            $scope.RtspScheam("videoCodeType");
            $scope.RtspScheam("auditCodeType");
            $scope.RtspScheam("bFrame");
            $scope.RtspScheam("recordProfile");
            $scope.RtspScheam("recordLevel");
            $scope.RtspScheam("recordEntropy");
            $scope.RtspScheam("recordComplexity");
            $scope.RtspScheam("bitrate");
            $scope.RtspScheam("framerate");
            $scope.RtspScheam("movieResoluation");

            $timeout(function(){
                $scope.RtspscheamChange($scope.rtspscheamok[0].value);
            },500);
        };
        //改变RTSP方案进行变化
            $scope.RtspscheamChange = function(value){
                $scope.rtspscheam = value;

                $scope.schem.bFrame1 = '';
                $scope.schem.gop1 = '';
                $scope.schem.framerate1 = '';

                $scope.schem.bFrame2 = '';
                $scope.schem.gop2 = '';
                $scope.schem.framerate2 = '';

                $scope.schem.bFrame3 = '';
                $scope.schem.gop3 = '';
                $scope.schem.framerate3 = '';

                $scope.schem.bFrame4 = '';
                $scope.schem.gop4 = '';
                $scope.schem.framerate4 = '';

                $scope.schem.bFrame5 = '';
                $scope.schem.gop5 = '';
                $scope.schem.framerate5 = '';

                $scope.schem.bFrame6 = '';
                $scope.schem.gop6 = '';
                $scope.schem.framerate6 = '';

                $scope.schem.bFrame7 = '';
                $scope.schem.gop7 = '';
                $scope.schem.framerate7 = '';

                $scope.schem.videoCodeType1 = $scope.videoCodeTypeok[0].value;
                $scope.schem.videoCodeType2 = $scope.videoCodeTypeok[0].value;
                $scope.schem.videoCodeType3 = $scope.videoCodeTypeok[0].value;
                $scope.schem.videoCodeType4 = $scope.videoCodeTypeok[0].value;
                $scope.schem.videoCodeType5 = $scope.videoCodeTypeok[0].value;
                $scope.schem.videoCodeType6 = $scope.videoCodeTypeok[0].value;
                $scope.schem.videoCodeType7 = $scope.videoCodeTypeok[0].value;

                $scope.schem.auditCodeType1 = $scope.auditCodeTypeok[0].value;
                $scope.schem.auditCodeType2 = $scope.auditCodeTypeok[0].value;
                $scope.schem.auditCodeType3 = $scope.auditCodeTypeok[0].value;
                $scope.schem.auditCodeType4 = $scope.auditCodeTypeok[0].value;
                $scope.schem.auditCodeType5 = $scope.auditCodeTypeok[0].value;
                $scope.schem.auditCodeType6 = $scope.auditCodeTypeok[0].value;
                $scope.schem.auditCodeType7 = $scope.auditCodeTypeok[0].value;

                $scope.schem.recordProfile1 = $scope.recordProfileok[0].value;
                $scope.schem.recordProfile2 = $scope.recordProfileok[0].value;
                $scope.schem.recordProfile3 = $scope.recordProfileok[0].value;
                $scope.schem.recordProfile4 = $scope.recordProfileok[0].value;
                $scope.schem.recordProfile5 = $scope.recordProfileok[0].value;
                $scope.schem.recordProfile6 = $scope.recordProfileok[0].value;
                $scope.schem.recordProfile7 = $scope.recordProfileok[0].value;


                $scope.schem.recordLevel1 = $scope.recordLevelok[0].value;
                $scope.schem.recordLevel2 = $scope.recordLevelok[0].value;
                $scope.schem.recordLevel3 = $scope.recordLevelok[0].value;
                $scope.schem.recordLevel4 = $scope.recordLevelok[0].value;
                $scope.schem.recordLevel5 = $scope.recordLevelok[0].value;
                $scope.schem.recordLevel6 = $scope.recordLevelok[0].value;
                $scope.schem.recordLevel7 = $scope.recordLevelok[0].value;


                $scope.schem.recordEntropy1 = $scope.recordEntropyok[0].value;
                $scope.schem.recordEntropy2 = $scope.recordEntropyok[0].value;
                $scope.schem.recordEntropy3 = $scope.recordEntropyok[0].value;
                $scope.schem.recordEntropy4 = $scope.recordEntropyok[0].value;
                $scope.schem.recordEntropy5 = $scope.recordEntropyok[0].value;
                $scope.schem.recordEntropy6 = $scope.recordEntropyok[0].value;
                $scope.schem.recordEntropy7 = $scope.recordEntropyok[0].value;

                $scope.schem.recordComplexity1 = $scope.recordComplexityok[0].value;
                $scope.schem.recordComplexity2 = $scope.recordComplexityok[0].value;
                $scope.schem.recordComplexity3 = $scope.recordComplexityok[0].value;
                $scope.schem.recordComplexity4 = $scope.recordComplexityok[0].value;
                $scope.schem.recordComplexity5 = $scope.recordComplexityok[0].value;
                $scope.schem.recordComplexity6 = $scope.recordComplexityok[0].value;
                $scope.schem.recordComplexity7 = $scope.recordComplexityok[0].value;

                $scope.schem.bitrate1 = $scope.bitrateok[0].value;
                $scope.schem.bitrate2 = $scope.bitrateok[0].value;
                $scope.schem.bitrate3 = $scope.bitrateok[0].value;
                $scope.schem.bitrate4 = $scope.bitrateok[0].value;
                $scope.schem.bitrate5 = $scope.bitrateok[0].value;
                $scope.schem.bitrate6 = $scope.bitrateok[0].value;
                $scope.schem.bitrate7 = $scope.bitrateok[0].value;

                $scope.schem.movieResoluation1 = $scope.movieResoluationok[0].value;
                $scope.schem.movieResoluation2 = $scope.movieResoluationok[0].value;
                $scope.schem.movieResoluation3 = $scope.movieResoluationok[0].value;
                $scope.schem.movieResoluation4 = $scope.movieResoluationok[0].value;
                $scope.schem.movieResoluation5 = $scope.movieResoluationok[0].value;
                $scope.schem.movieResoluation6 = $scope.movieResoluationok[0].value;
                $scope.schem.movieResoluation7 = $scope.movieResoluationok[0].value;

                TacticsService.RTSPScheamChange(value).then(
                    function(data){
                        $.each(data,function(index,scheamContent){
                            if(scheamContent.sort === 1){

                                $scope.schem.videoCodeType1 = scheamContent.videoCodeType;
                                $scope.schem.auditCodeType1 = scheamContent.auditCodeType;
                                $scope.schem.bFrame1 = scheamContent.bFrame;
                                $scope.schem.recordProfile1 = scheamContent.recordProfile;
                                $scope.schem.recordLevel1 = scheamContent.recordLevel;
                                $scope.schem.recordEntropy1 = scheamContent.recordEntropy;
                                $scope.schem.recordComplexity1 = scheamContent.recordComplexity;
                                $scope.schem.framerate1 = scheamContent.framerate;
                                $scope.schem.movieResoluation1 = scheamContent.movieResoluation;
                                $scope.schem.gop1 = scheamContent.gop;
                            }
                            if(scheamContent.sort === 2){
                                $scope.schem.videoCodeType2 = scheamContent.videoCodeType;
                                $scope.schem.auditCodeType2 = scheamContent.auditCodeType;
                                $scope.schem.bFrame2 = scheamContent.bFrame;
                                $scope.schem.recordProfile2 = scheamContent.recordProfile;
                                $scope.schem.recordLevel2 = scheamContent.recordLevel;
                                $scope.schem.recordEntropy2 = scheamContent.recordEntropy;
                                $scope.schem.recordComplexity2 = scheamContent.recordComplexity;
                                $scope.schem.framerate2 = scheamContent.framerate;
                                $scope.schem.movieResoluation2 = scheamContent.movieResoluation;
                                $scope.schem.gop2 = scheamContent.gop;
                            }if(scheamContent.sort === 3){
                                $scope.schem.videoCodeType3 = scheamContent.videoCodeType;
                                $scope.schem.auditCodeType3 = scheamContent.auditCodeType;
                                $scope.schem.bFrame3 = scheamContent.bFrame;
                                $scope.schem.recordProfile3 = scheamContent.recordProfile;
                                $scope.schem.recordLevel3 = scheamContent.recordLevel;
                                $scope.schem.recordEntropy3 = scheamContent.recordEntropy;
                                $scope.schem.recordComplexity3 = scheamContent.recordComplexity;
                                $scope.schem.framerate3 = scheamContent.framerate;
                                $scope.schem.movieResoluation3 = scheamContent.movieResoluation;
                                $scope.schem.gop3 = scheamContent.gop;
                            }if(scheamContent.sort === 4){

                                $scope.schem.videoCodeType4 = scheamContent.videoCodeType;
                                $scope.schem.auditCodeType4 = scheamContent.auditCodeType;
                                $scope.schem.bFrame4 = scheamContent.bFrame;
                                $scope.schem.recordProfile4 = scheamContent.recordProfile;
                                $scope.schem.recordLevel4 = scheamContent.recordLevel;
                                $scope.schem.recordEntropy4 = scheamContent.recordEntropy;
                                $scope.schem.recordComplexity4 = scheamContent.recordComplexity;
                                $scope.schem.framerate4 = scheamContent.framerate;
                                $scope.schem.movieResoluation4 = scheamContent.movieResoluation;
                                $scope.schem.gop4 = scheamContent.gop;
                            }if(scheamContent.sort === 5){
                                ;
                                $scope.schem.videoCodeType5 = scheamContent.videoCodeType;
                                $scope.schem.auditCodeType5 = scheamContent.auditCodeType;
                                $scope.schem.bFrame5 = scheamContent.bFrame;
                                $scope.schem.recordProfile5 = scheamContent.recordProfile;
                                $scope.schem.recordLevel5 = scheamContent.recordLevel;
                                $scope.schem.recordEntropy5 = scheamContent.recordEntropy;
                                $scope.schem.recordComplexity5 = scheamContent.recordComplexity;
                                $scope.schem.framerate5 = scheamContent.framerate;
                                $scope.schem.movieResoluation5 = scheamContent.movieResoluation;
                                $scope.schem.gop5 = scheamContent.gop;
                            }if(scheamContent.sort === 6){

                                $scope.schem.videoCodeType6 = scheamContent.videoCodeType;
                                $scope.schem.auditCodeType6 = scheamContent.auditCodeType;
                                $scope.schem.bFrame6 = scheamContent.bFrame;
                                $scope.schem.recordProfile6 = scheamContent.recordProfile;
                                $scope.schem.recordLevel6 = scheamContent.recordLevel;
                                $scope.schem.recordEntropy6 = scheamContent.recordEntropy;
                                $scope.schem.recordComplexity6 = scheamContent.recordComplexity;
                                $scope.schem.framerate6 = scheamContent.framerate;
                                $scope.schem.movieResoluation6 = scheamContent.movieResoluation;
                                $scope.schem.gop6 = scheamContent.gop;
                                $scope.schem.movieResoluation6 = scheamContent.movieResoluation;
                            }if(scheamContent.sort === 7){

                                $scope.schem.videoCodeType7 = scheamContent.videoCodeType;
                                $scope.schem.auditCodeType7 = scheamContent.auditCodeType;
                                $scope.schem.bFrame7 = scheamContent.bFrame;
                                $scope.schem.recordProfile7 = scheamContent.recordProfile;
                                $scope.schem.recordLevel7 = scheamContent.recordLevel;
                                $scope.schem.recordEntropy7 = scheamContent.recordEntropy;
                                $scope.schem.recordComplexity7 = scheamContent.recordComplexity;
                                $scope.schem.framerate7 = scheamContent.framerate;
                                $scope.schem.movieResoluation7 = scheamContent.movieResoluation;
                                $scope.schem.gop7 = scheamContent.gop;
                            }
                        });
                    },
                    function(){

                    }
                );

            };
            //保存Rtsp方案
            $scope.SaveRtspSchem = function(){
                var keywords = {
                    "scheam":$scope.rtspscheam,
                    "videos":[
                        {
                            sort:1,

                            videoCodeType:$scope.schem.videoCodeType1,
                            auditCodeType:$scope.schem.auditCodeType1,
                            bFrame:$scope.schem.bFrame1 === undefined ? '' : $scope.schem.bFrame1,
                            recordProfile:$scope.schem.recordProfile1,
                            recordLevel:$scope.schem.recordLevel1,
                            recordEntropy:$scope.schem.recordEntropy1,
                            recordComplexity:$scope.schem.recordComplexity1,
                            gop:$scope.schem.gop1 === undefined ? '': $scope.schem.gop1,
                            framerate:$scope.schem.framerate1 === undefined ? '': $scope.schem.framerate1,
                            bitrate:$scope.schem.bitrate1,
                            movieResoluation:$scope.schem.movieResoluation1

                        },{
                            sort:2,

                            videoCodeType:$scope.schem.videoCodeType2,
                            auditCodeType:$scope.schem.auditCodeType2,
                            bFrame:$scope.schem.bFrame2 === undefined ? '' : $scope.schem.bFrame2,
                            recordProfile:$scope.schem.recordProfile2,
                            recordLevel:$scope.schem.recordLevel2,
                            recordEntropy:$scope.schem.recordEntropy2,
                            recordComplexity:$scope.schem.recordComplexity2,
                            gop:$scope.schem.gop2 === undefined ? '': $scope.schem.gop2,
                            framerate:$scope.schem.framerate2 === undefined ? '': $scope.schem.framerate2,
                            bitrate:$scope.schem.bitrate2,
                            movieResoluation:$scope.schem.movieResoluation2

                        },{
                            sort:3,

                            videoCodeType:$scope.schem.videoCodeType3,
                            auditCodeType:$scope.schem.auditCodeType3,
                            bFrame:$scope.schem.bFrame3 === undefined ? '' : $scope.schem.bFrame3,
                            recordProfile:$scope.schem.recordProfile3,
                            recordLevel:$scope.schem.recordLevel3,
                            recordEntropy:$scope.schem.recordEntropy3,
                            recordComplexity:$scope.schem.recordComplexity3,
                            gop:$scope.schem.gop3 === undefined ? '': $scope.schem.gop3,
                            framerate:$scope.schem.framerate3 === undefined ? '': $scope.schem.framerate3,
                            bitrate:$scope.schem.bitrate3,
                            movieResoluation:$scope.schem.movieResoluation3

                        },{
                            sort:4,

                            videoCodeType:$scope.schem.videoCodeType4,
                            auditCodeType:$scope.schem.auditCodeType4,
                            bFrame:$scope.schem.bFrame4 === undefined ? '' : $scope.schem.bFrame4,
                            recordProfile:$scope.schem.recordProfile4,
                            recordLevel:$scope.schem.recordLevel4,
                            recordEntropy:$scope.schem.recordEntropy4,
                            recordComplexity:$scope.schem.recordComplexity4,
                            gop:$scope.schem.gop4 === undefined ? '': $scope.schem.gop4,
                            framerate:$scope.schem.framerate4 === undefined ? '': $scope.schem.framerate4,
                            bitrate:$scope.schem.bitrate4,
                            movieResoluation:$scope.schem.movieResoluation4

                        },{
                            sort:5,

                            videoCodeType:$scope.schem.videoCodeType5,
                            auditCodeType:$scope.schem.auditCodeType5,
                            bFrame:$scope.schem.bFrame5 === undefined ? '' : $scope.schem.bFrame5,
                            recordProfile:$scope.schem.recordProfile5,
                            recordLevel:$scope.schem.recordLevel5,
                            recordEntropy:$scope.schem.recordEntropy5,
                            recordComplexity:$scope.schem.recordComplexity5,
                            gop:$scope.schem.gop5 === undefined ? '': $scope.schem.gop5,
                            framerate:$scope.schem.framerate5 === undefined ? '': $scope.schem.framerate5,
                            bitrate:$scope.schem.bitrate5,
                            movieResoluation:$scope.schem.movieResoluation5

                        },{
                            sort:6,

                            videoCodeType:$scope.schem.videoCodeType6,
                            auditCodeType:$scope.schem.auditCodeType6,
                            bFrame:$scope.schem.bFrame6 === undefined ? '' : $scope.schem.bFrame6,
                            recordProfile:$scope.schem.recordProfile6,
                            recordLevel:$scope.schem.recordLevel6,
                            recordEntropy:$scope.schem.recordEntropy6,
                            recordComplexity:$scope.schem.recordComplexity6,
                            gop:$scope.schem.gop6 === undefined ? '': $scope.schem.gop6,
                            framerate:$scope.schem.framerate6 === undefined ? '': $scope.schem.framerate6,
                            bitrate:$scope.schem.bitrate6,
                            movieResoluation:$scope.schem.movieResoluation6

                        },{
                            sort:7,

                            videoCodeType:$scope.schem.videoCodeType7,
                            auditCodeType:$scope.schem.auditCodeType7,
                            bFrame:$scope.schem.bFrame7 === undefined ? '' : $scope.schem.bFrame7,
                            recordProfile:$scope.schem.recordProfile7,
                            recordLevel:$scope.schem.recordLevel7,
                            recordEntropy:$scope.schem.recordEntropy7,
                            recordComplexity:$scope.schem.recordComplexity7,
                            gop:$scope.schem.gop7 === undefined ? '': $scope.schem.gop7,
                            framerate:$scope.schem.framerate7 === undefined ? '': $scope.schem.framerate7,
                            bitrate:$scope.schem.bitrate7,
                            movieResoluation:$scope.schem.movieResoluation7

                        }

                    ]
                };
                TacticsService.SaveRtspSchem(keywords).then(
                    function(data){
                        if(data>0){
                            growl.addSuccessMessage('添加成功');
                        }else{
                            growl.addErrorMessage('添加失败');
                        }

                    },
                    function(){

                    }
                );
            };

            //保存Rtsp方案
            $scope.SaveRtmpSchem = function(){
                var keywords = {
                        scheam: $scope.rtmpscheam,
                        videoCodeType: $scope.schem.videoCodeType,
                        auditCodeType: $scope.schem.auditCodeType,
                        bFrame: $scope.schem.bFrame === undefined ? '' : $scope.schem.bFrame,
                        recordProfile: $scope.schem.recordProfile,
                        recordLevel: $scope.schem.recordLevel,
                        recordEntropy: $scope.schem.recordEntropy,
                        recordComplexity: $scope.schem.recordComplexity,
                        gop: $scope.schem.gop === undefined ? '' : $scope.schem.gop,
                        framerate: $scope.schem.framerate === undefined ? '' : $scope.schem.framerate,
                        bitrate: $scope.schem.bitrate,
                        movieResoluation: $scope.schem.movieResoluation
                    }
                TacticsService.SaveRtmpSchem(keywords).then(
                    function(data){
                        if(data>0){
                            growl.addSuccessMessage('添加成功');
                        }else{
                            growl.addErrorMessage('添加失败');
                        }

                    },
                    function(){

                    }
                );
            };

            //应用到Rtsp方案
            $scope.openRtmpSolutionModel = function (rtmpscheam) {
                //初始化选中树的节点
                TacticsService.RtmpAreaIds(rtmpscheam).then(
                    function(data){
                        $scope.treeselectList=data;
                        var modalInstance = $modal.open({
                            templateUrl: 'classrooms/tactics/model/video.applied.modal.html',
                            backdrop:'static',
                            controller: RtmpSchemModelCtrl,
                            resolve: {
                                tree: function () {
                                    return $scope.areaTree;
                                },
                                rtmpscheam: function () {
                                    return rtmpscheam;
                                },
                                treeselectList : function(){
                                    return $scope.treeselectList
                                }
                            }
                        }).result.then(
                            function(updata){

                            },
                            function(reason){
                                console.log(reason+"reason");
                            }
                        );
                    }
                );
            };
            var RtmpSchemModelCtrl = function ($scope, $modalInstance,tree,rtmpscheam,growl,treeselectList) {
                console.log(treeselectList);
                $scope.rtmpscheam = rtmpscheam;
                $scope.areaTree=tree;
                $scope.SelectItem = treeselectList;
                //点击选中时设置控制的单选按钮状态
                var selectedClassrooms = [];
                $scope.areaList=[];

                /* $scope.checkAllApplys = function (node, value){
                 node.isSelected = node.isSelected || false;

                 node.isSelected = value === undefined? !node.isSelected : value;
                 if(node.nodes){
                 $.each(node.nodes, function(index, _node){
                 $scope.checkAllApplys(_node, (node.isSelected));
                 });
                 }
                 };*/
                //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^不知道的改动
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
                //判断选择的是教室节点
                $scope.checkAllApplys = function (node, value) {
                    node.isSelected = node.isSelected || false;
                    node.isSelected = value === undefined ? !node.isSelected : value;
                    if(node.attribute==='Y'){
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
                    console.log(tree);
//                alert(tree.attribute);
                    var a='';
                    if (tree.isSelected) {
                        if($scope.SelectItem.length>0){
                            $.each($scope.SelectItem,function(index_1,Items){
                                if(Items===tree.id){
//                                    alert('id重复');
                                    a=index_1;
                                }
                            });
                        }else{
//                            alert('进入了push');
                            $scope.SelectItem.push(tree.id);
                            a=1;
                        }
                        if(a===''){
                            $scope.SelectItem.push(tree.id);
                        }

                    } else {
//                    alert('进的splice');
                        $.each($scope.SelectItem, function (index, item) {
                            if (item === tree.id) {
//                            alert('做了删除');
                                $scope.SelectItem.splice(index, 1);
                                return false;
                            }
                        });
                    }
                    /*if ($scope.SelectItem.length > 0) {
                     alert($scope.SelectItem.length);
                     }else{
                     alert('对不起未选中');
                     }*/
                };
                //递归遍历选中树的节点
                var getSelectClassrooms = function(node){
                    if(node.attribute === "Y" && node.isSelected){
                        $scope.areaList.push(
                            {
                                "areaid": node.id
                            }
                        );
                    }
                    if(node.nodes){
                        $.each(node.nodes, function(index, _node){
                            getSelectClassrooms(_node);
                        });
                    }
                };

                $scope.ok = function () {
                    $scope.areaList=[];
                    $scope.data=[];
                    $scope.node=[];
                    //调用树节点ID
                    getSelectClassrooms(tree[0]);
                    //视频源应用
                    
                    TacticsService.rtmpschemaApply(rtmpscheam,$scope.areaList).then(
                        function(data){
                            if(data>0) {
                                growl.addSuccessMessage("应用到保存成功!");
                            }else{
                                growl.addErrorMessage("应用到保存失败!");
                            }
                            $modalInstance.close(true);
                        },
                        function(code){
                            //处理失败后操作
                            alert("添加失败!");
                        }
                    );

                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                $scope.treeselectList = treeselectList;
                $scope.isCheckedClassroom = function(id){
                    var check = false;
                    $.each($scope.treeselectList, function (index, _treeList) {
                        if (_treeList === id) {
                            check = true;
                            return false;
                        }
                    });
                    return check;
                };

            };

        var init = function(){
            $scope.schem = {
                address1:""
            };
            tacticsTrees("deviceSet",$scope.setTreeid);
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
            $scope.$parent.active = 3;
            //资源上传策略
            $scope.upload = {
            		typeid:"2",
            		starttime:"",
            		endtime:"",
	    			starttime1:"",
	        		endtime1:""	
            };
            //资源删除策略
            $scope.strategy = {
            		typeid:"1",
            		space:"",
            		days:""
            };
            //课表同步
            $scope.schedule = {
            		typeid:"1",
            		week:"1"
            };
            //报警策略
            $scope.warm = {
            		typeid:"1",
            		space:"",
            		times:""
            };
            $scope.initTatics();
            };

            /*//判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_classrooms_tactics_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++教室设置  您没有权限+++++++++");
                $location.path('classrooms/setup');
//                window.location.href("login");
            }*/

        init();
    }]);
});
