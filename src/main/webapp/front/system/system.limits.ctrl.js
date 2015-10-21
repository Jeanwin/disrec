define(['app'], function (app) {
    app.registerController('SystemLimitsCtrl', ['$scope','$modal','$filter','$timeout','SystemService' ,'$location',
        function ($scope,$modal,$filter,$timeout,SystemService,$location) {

            //点击删除教室图标弹出弹出框
            $scope.openDeleteLimitsModal = function (roles) {
                var modalInstance = $modal.open({
                    templateUrl: 'system/limits/system.deletelimits.modal.html',
                    backdrop:'static',
                    controller: DeleteLimitsModalCtrl,
                    resolve: {
                        roles: function () {
                            return roles;
                        }
                    }
                }).result.then(
                    function(){
                        //初始化的时候显示左边角色权限
                        $scope.selectroles();
                        //初始化的时候显示右边角色名称
                        $scope.selectrolename();
                    }
                );
            };
            //点击删除教室图标弹出弹出框--控制器
            var DeleteLimitsModalCtrl = function ($scope, $modalInstance,growl, roles) {
                $scope.error = false;
                $scope.roles = angular.copy(roles);
                $scope.ok = function () {
                    $scope.error = false;
                    SystemService.Deletelimit(roles).then(
                        function(data){
                            if(data === '-1'){
                                growl.addErrorMessage("有用户使用该权限不能删除！");
                                $modalInstance.close();
                            }else if(data === '1'){
                                growl.addSuccessMessage("删除成功！");
                                $modalInstance.close();
                            }else{
                                growl.addErrorMessage("删除失败！");
                                $scope.error = true;
                            }
                        },function(error){
                            growl.addErrorMessage("删除失败！");
                        }
                    )
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

            //点击全部选中时设置控制的单选按钮状态-最外层
            $scope.checkAllLimits = function (){
                if($scope.rolesList.length>0){
                    $scope.checkAll = !$scope.checkAll;
                    $.each($scope.rolesList, function(index, upload){
                        upload.checked = $scope.checkAll;
                    });
                }
            };

            //--最外层
            $scope.selectedItems = [];
            //监视rolesList中是否有元素被改变状态--最外层
            $scope.$watch('rolesList', function(){
                var rolesListTimer = $timeout(function(){
                	//监测是否有元素被选中
                    $scope.selectedItems = $filter('filter')($scope.rolesList, {checked:true});
                    $scope.selectedCount =  $scope.selectedItems.length;
//                    alert($scope.selectedCount)
                    if( $scope.selectedCount === $scope.rolesList.length && $scope.rolesList.length>0)
                        $scope.checkAll = true;
                    else
                        $scope.checkAll = false;
                    $timeout.cancel(rolesListTimer);
                },1000);
            },true);

            //添加角色权限
            $scope.AddRoleLimit = function(rolename){
                var modalInstance = $modal.open({
                    templateUrl: 'system/limits/system.addLimits.modal.html',
                    backdrop:'static',
                    controller: ModalRoleLimitCtrl,
                    resolve: {
                        rolename: function () {
                            return rolename;
                        },
                        roleList:function(){
                            return $scope.rolenameList;//$filter('filter')($scope.rolenameList, {checkbox:true});
                        }
                    }
                }).result.then(
                    function(updata){
                    },
                    function(reason){
                        console.log('reason is '+ reason);
                    }
                );
            };
            var ModalRoleLimitCtrl = function($scope,$modalInstance,growl,rolename,roleList){
                $scope.roleList = roleList;
                $scope.rolename = rolename;
                $scope.rolename.functions=[];
                $scope.ok = function() {
                	
                	selectTreeNode($scope.roleList[0]);
                    //添加用户权限接口
                    SystemService.Addlimitsname($scope.rolename).then(
                        function (data) {
                            growl.addSuccessMessage('保存成功!');
                            $modalInstance.close(true);
                        },
                        function (code) {
                            //处理失败后操作s
                            alert("保存失败!");
                        }
                    );
                };
                var selectTreeNode = function(node){
                    if(node.isSelected === true || node.halfFlag === true){
                    	
                    	//转义一下，如果是undefined，则赋值为true,否则为""
                    	if(angular.isUndefined(node.halfFlag) || !node.halfFlag){
                    		node.isSelected = true;
                    	} else {
                    		node.isSelected = "";
                    	}
                    	
                    	$scope.rolename.functions.push(
                            {
                                "id":node.id,
                                "isChecked":node.isSelected
                            }
                        );
                    }
                    if(node.nodes){
                        $.each(node.nodes,function(index,_node){
                            selectTreeNode(_node)
                        });
                    }
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

                /*$scope.selectTreeNode = function(nodes){
                    $.each(nodes,function(index,node){

                        if(node.isSelected === true){

                            $scope.rolename.functions.push(
                                {
                                    "id":node.id
                                }
                            );
                        }
                        if(node.nodes){
                            $scope.selectTreeNode(node.nodes);
                        }
                    });

                };*/
                var init = function(){

                    selectTreeNode(roleList);
                };
                init();
            };

            //添加角色
            $scope.addroles = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'system/limits/system.limits.modal.html',
                    backdrop:'static',
                    controller: ModalInstanceCtrl,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                }).result.then(
                    function(updata){
                        //初始化的时候显示左边角色权限
                        $scope.selectroles();
                        //初始化的时候显示右边角色名称
                        $scope.selectrolename();
                    },
                    function(reason){
                        console.log('reason is '+ reason);
                    }
                );
            };
            var ModalInstanceCtrl = function ($scope, $modalInstance,growl) {
                $scope.ok = function (rolename) {
                    //添加用户权限接口
                    SystemService.Addlimits(rolename).then(
                        function(data){
                            growl.addSuccessMessage('角色添加成功！');
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
            };
            //初始化的时候显示左边角色权限
            $scope.selectroles = function(){
                SystemService.sysrole_roles().then(
                    function(data){
                        $scope.rolesList=data;
                        $scope.roles = data[0];
                    }
                );
            };
            //点击左边角色名称设置权限范围
            $scope.setlimits = function(roles){
                $scope.initSecelected($scope.rolenameList);
                $.each(roles.functions,function(_index,data){
                    $scope.isSelected($scope.rolenameList,data.id);
                });
                $scope.roles = roles;
                
                //更新样式
                $timeout(function(){
                	
                    //查找选中的节点，如果是父节点的话，是否其子节点都选中，如果，没有的话，加上半选中样式
                    setHalfCheckedStyle($scope.rolenameList[0]);
                    console.log($scope.rolenameList);
                },800);
            };
            //判断是否选中
            $scope.isSelected = function(nodes,id){
                $.each(nodes,function(index,data){
                    if(data.id==id){
                        data.isSelected = true;
                    }else{

                        if(data.nodes!=null){
                            $scope.isSelected(data.nodes,id);
                        }
                    }
                });
            };
            //初始化树的选中状态
            $scope.initSecelected = function(nodes){
                $.each(nodes,function(index,data){
                    data.isSelected = false;
                    data.halfFlag = false;
                    if(data.nodes != null){
                        $scope.initSecelected(data.nodes);
                    }
                });
            };
            
            
          //选择树的节点（自上而下）
            $scope.checkAllApplys = function (node, value){
                node.isSelected = node.isSelected || false;
                
                //如果选中的话，则将halfFlag的标志位改为false，去掉半选中样式
                if(node.halfFlag){
                	node.halfFlag = false;
                }

                node.isSelected = value === undefined? !node.isSelected : value;
                if(node.nodes){
                    $.each(node.nodes, function(index, _node){
                        $scope.checkAllApplys(_node, (node.isSelected));
                    });
                }
            };

            //结构树选择（自下而上，自上而下）
            $scope.checkAllTrees = function(node, value){

                //结构树选择（自上而下）
                $scope.checkAllApplys(node, value);

                //延时加载（结构树选择（自下而上）
                $timeout(function(){
                    $scope.checkAllParent(node);
                },200);
                
                console.log("$scope.checkAllTrees's value is start");
                console.log($scope.rolenameList);
                console.log("$scope.checkAllTrees's value is end");

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
                
                //如果没有被选中的话，就将是否半选状态的字段设置为false
                if(!checkParentInnerChildIsCheckedFlag){
                	_node.halfFlag = false;
                }
                return checkParentInnerChildIsCheckedFlag;
            };
            
            //验证父节点下的子节点是否全被选中的，返回值为true/false
            $scope.checkParentInnerChildIsHalfChecked = function(_node){
                var checkParentInnerChildIsHalfCheckedFlag = false;
                var i = 0;
                if(_node.nodes){
                    $.each(_node.nodes, function(index, nodeCheck){
                    	//必须判断半选标志也为false，才可进行未选中记录技术，否则，会使根节点的半选状态失效（防止处理时出现纰漏）
                    	//范围管理没事，是因为根节点下有选中的子节点，所以不满足根结点字条数与未选中条数相等的情况。
                    	//所以在判断未选中条数时，要把未勾选和未半选两种情况都满足作为判断条件才可以。
                        if(!nodeCheck.isSelected && !nodeCheck.halfFlag){
                        	checkParentInnerChildIsHalfCheckedFlag = true;
                        	i ++;
                        }
                        
                        //只要有半选中状态的记录，就认为有未选中的。
                        if(nodeCheck.halfFlag){
                        	checkParentInnerChildIsHalfCheckedFlag = true;
                        }
                        
                        //如果有选中，并且未全选的，则表示未全选
                        if(nodeCheck.isSelected && !nodeCheck.isAllUnchecked){
                        	checkParentInnerChildIsHalfCheckedFlag = true;
                        }
                        
                    });
                }
                //对于只有一个选项的记录，则不存在选中一半的情况(拿变量i判断不准，有多个子节点选中，只剩下一个未选中的记录，然后操作跟只有一个未选中的情况相同。所以拿父节点的长度比较合适)
                if(_node.nodes.length == 1){
                	checkParentInnerChildIsHalfCheckedFlag = false;
                	
                	_node.isAllUnchecked = false; //对于只有一个选项的记录，则不存在选中一半的情况,必须做选中未选中处理
                	
                	/*if(i == 1){ //对于只有一个选项的记录，则不存在选中一半的情况,必须做选中未选中处理
                		_node.isAllUnchecked = false;
                	} else {
                		_node.isAllUnchecked = true;	
                	}*/
                } else if(_node.nodes.length == i){ //过滤掉全没选中的情况
                	checkParentInnerChildIsHalfCheckedFlag = false;
                	_node.isAllUnchecked = true;
                } else if(_node.nodes.length >0 && i==0){ //过滤掉全没选中的情况
                	checkParentInnerChildIsHalfCheckedFlag = false;
                	_node.isAllChecked = true;
                } else {
                	_node.isAllUnchecked = false; //不加的话，会造成，子节点全选后，父节点不自动勾选
                }
                
                
                return checkParentInnerChildIsHalfCheckedFlag;
            };


            //树操作（自上而下）
            $scope.checkAllParent = function(node, value){
                console.log(node);
                console.log($scope.rolenameList);

                if(angular.isDefined($scope.rolenameList)){
                    $.each($scope.rolenameList, function(index, atree){
                        if(atree.nodes){
                            $.each(atree.nodes, function(index, _node){
                                if(node === _node){
                                        if($scope.checkParentInnerChildIsChecked(atree) && atree.isSelected){
                                        	//如果没有全部选中的话，将添加halfFlag字段(如果底下有被选中的节点并且是已选中状态，则判断是否全部节点都选中)
                                        	if($scope.checkParentInnerChildIsHalfChecked(atree)){
                                        		atree.halfFlag = true;
                                        		
                                        		//只有父节点下的子节点全部选中，才给父节点选中,否则算父节点没选中
                                        		atree.isSelected = !atree.isSelected;
                                        	} else {
                                        		atree.halfFlag = false;
                                        	}
                                        	
                                        } else {
                                        	
//                                        	atree.isSelected = !atree.isSelected;
                                        	
                                        	//如果没有全部选中的话，将添加halfFlag字段（如果没有子节点选中，并且状态为未选中，则当匹配上之后，赋值为选中状态，同时判断，
                                        		//如果是父节点的话，是否其子节点都被选中）
                                        	if($scope.checkParentInnerChildIsHalfChecked(atree)){
                                        		atree.halfFlag = true;
                                        	} else {
                                        		atree.halfFlag = false;
                                        		
                                        		//如果全不选的话，就不做选中不选中的处理
                                        		if((!atree.isAllUnchecked) || atree.isAllChecked) {
                                        			//只有父节点下的子节点全部选中，才给父节点选中
                                            		atree.isSelected = !atree.isSelected;
                                        		}
                                        	}
                                        }
                                        console.log(atree.name);
                                        console.log(atree.isSelected);
                                } else {
                                    $.each(_node.nodes, function(index, __node){
                                        console.log(__node);
                                        if(node === __node){
                                                if ($scope.checkParentInnerChildIsChecked(_node) && _node.isSelected) {
                                                	//如果没有全部选中的话，将添加halfFlag字段
                                                	if($scope.checkParentInnerChildIsHalfChecked(_node)){
                                                		_node.halfFlag = true;
                                                		
                                                		//只有父节点下的子节点全部选中，才给父节点选中,否则算父节点没选中
                                                		_node.isSelected = !(_node.isSelected);
                                                	} else {
                                                		_node.halfFlag = false;
                                                	}
                                                	
                                                } else {
                                                	
//                                                    _node.isSelected = !(_node.isSelected);
                                                    
                                                    //如果没有全部选中的话，将添加halfFlag字段
                                                	if($scope.checkParentInnerChildIsHalfChecked(_node)){
                                                		_node.halfFlag = true;
                                                	} else {
                                                		_node.halfFlag = false;
                                                		
                                                		//如果全不选的话，就不做选中不选中的处理
                                                		if((!_node.isAllUnchecked) || _node.isAllChecked) {
    	                                            		//只有父节点下的子节点全部选中，才给父节点选中
    	                                            		_node.isSelected = !(_node.isSelected);
                                                		}
                                                	}
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
                                	//如果没有全部选中的话，将添加halfFlag字段
                                	if($scope.checkParentInnerChildIsHalfChecked(_node)){
                                		_node.halfFlag = true;
                                		
                                		//只有父节点下的子节点全部选中，才给父节点选中,否则算父节点没选中
                                		_node.isSelected = !(_node.isSelected);
                                		
                                	} else {
                                		_node.halfFlag = false;
                                	}
                                	
                                } else {
                                	
//                                    _node.isSelected = !(_node.isSelected);
                                    
                                    //如果没有全部选中的话，将添加halfFlag字段
                                	if($scope.checkParentInnerChildIsHalfChecked(_node)){
                                		_node.halfFlag = true;
                                		
                                	} else {
                                		_node.halfFlag = false;
                                		
                                		//如果全不选的话，就不做选中不选中的处理
                                		if((!_node.isAllUnchecked) || _node.isAllChecked) {
    	                            		//只有父节点下的子节点全部选中，才给父节点选中
    	                            		_node.isSelected = !(_node.isSelected);
                                		}
                                	}
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
            
            /*//自下而上，遍历树
            $scope.checkAllParent = function(node, value){
                console.log(node);
                console.log($scope.rolenameList);

                if(angular.isDefined($scope.rolenameList)){
                    $.each($scope.rolenameList, function(index, atree){
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
            //选择树的节点，自上而下
            $scope.checkAllApplys = function (node, value){
                node.isSelected = node.isSelected || false;
                console.log(node);
                console.log(value);
                node.isSelected = value === undefined? !node.isSelected : value;
                if(node.nodes){
                    $.each(node.nodes, function(index, _node){
                        $scope.checkAllApplys(_node, (node.isSelected));
                    });
                }
            };*/
            //初始化的时候显示右边角色名称
            $scope.selectrolename = function(){
                SystemService.select_rolename().then(
                    function(data){
                        $scope.rolenameList=data;
                        $scope.setlimits($scope.roles);
                    },
                    function(){

                    }
                );
                
                $timeout(function(){
                	
                    //查找选中的节点，如果是父节点的话，是否其子节点都选中，如果，没有的话，加上半选中样式
                    setHalfCheckedStyle($scope.rolenameList[0]);
                    console.log($scope.rolenameList);
                },800);
            };
            
            ////查找选中的节点，如果是父节点的话，是否其子节点都选中，如果，没有的话，加上半选中样式
            var setHalfCheckedStyle = function(treeDate){
            	if(treeDate.isSelected){
            		//判断是否其子节点都选中，如果没有的话，加上半选中样式
            		if($scope.checkParentInnerChildIsHalfChecked(treeDate)){
            			treeDate.halfFlag = true;
            			treeDate.isSelected = !treeDate.isSelected;
            		} else {
            			treeDate.halfFlag = false;
            		}
            	}
            	
            	if(treeDate.nodes){
        			$.each(treeDate.nodes, function(index, tree){
        				//递归查找
    					setHalfCheckedStyle(tree);
        			});
        		}
            };
            
            var init = function(){
                //全选按钮设置为未选中状态（不初始化为false）
                $scope.checkAll = false;
                //初始化的时候显示左边角色权限
                $scope.selectroles();
                //初始化的时候显示右边角色名称
                $scope.selectrolename();
                $scope.$parent.active = 2;
                $scope.rolenameList=[];
                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_system_limits_url_view') === -1){
                        console.log("+++++++权限管理  您没有权限+++++++++")
                        $location.path('system/scope');
                }
            };
            init();
        }]);
});