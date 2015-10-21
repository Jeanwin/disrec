define(['app',
    'config'
], function (app, config) {
    app.registerController('DutyCtrl', ['$scope','$modal','$location','$upload','growl' ,
        '$http', '$filter','$timeout','TreeService','ClassroomService',
        function ($scope,$modal,$location,$upload,growl ,$http, $filter,$timeout,TreeService,ClassroomService) {
    	
    	//获取值班员列表
        $scope.GetclassAdminsList = function(){
        	ClassroomService.GetClassAdminsList().then(
        			function(data){
        				$scope.dutyUsers = data;
        			}
        	) 
        }
    	
    	$scope.dutyList = function(){
    		ClassroomService.DutyList("",$scope.pagination).then(
    			function(data){
    				$scope.dutyLists = data.data;
    				$scope.pagination.totalItems = data.total;
    			},
    			function(){
    				
    			}
    		
    	)}
    	
    	var mainTrees = function(keywords,areaid){
            TreeService.mainTree(keywords,areaid).then(
                function(data){
                    $scope.areaTree = data;
                })
    	}
       //删除值班室
    	$scope.deleteDuty = function(index){
    		var modalInstance = $modal.open({
                templateUrl: 'classrooms/duty/classrooms.dutyDelete.modal.html',
                backdrop:'static',
                controller: DeleteDutyModalCtrl,
                resolve: {
                	dutyID:function(){
                		return $scope.dutyLists[index].id;
                	}
    				
                }
            }).result.then(
                    function(){
                    	$scope.dutyLists.splice(index,1);
                    	
                    }
                );
    	}
    	var DeleteDutyModalCtrl = function ($scope, $modalInstance,growl,dutyID) {
    		var dutytransfer = [];
    		$scope.cancel = function(){
    			$modalInstance.dismiss('cancel');
    		}
    		dutytransfer.push({'id':dutyID});
    		$scope.save = function(){
    			ClassroomService.DutyDelete(dutytransfer).then(
            			function(data){
                			if(data == '1'){
               					growl.addSuccessMessage("删除成功");
               					$modalInstance.close(true);
               				}
               				if(data == '0'){
               					growl.addErrorMessage("删除失败");
               					$modalInstance.close();
               				}
            				
            			},
            			function(){
            				$modalInstance.close();
            				growl.addErrorMessage("系统发生错误，删除失败");
            			}
            	)
    		}
    		
    	}
        //新建值班室
        $scope.modifyDuty = function(opera,index){
        	var transferdata;
        	if(opera == 'edit'){
        		transferdata = $scope.dutyLists[index];
        	}
             var modalInstance = $modal.open({
                templateUrl: 'classrooms/duty/classrooms.duty.modal.html',
                backdrop:'static',
                controller: ModifyDutyModalCtrl,
                resolve: {
                	areaTree:function(){
                		return $scope.areaTree;
                	},
                	dutyUsers:function(){
                		return $scope.dutyUsers;
                	},
                	transferdata:function(){
                		return transferdata;
                	},
                	opera:function(){
                		return opera;
                	}
                }
            }).result.then(
                    function(){
                    	$scope.dutyList();
                    }
                );
        }; 
        var ModifyDutyModalCtrl = function ($scope, $modalInstance,ClassroomService,$location,growl,areaTree,dutyUsers,transferdata,opera) {
        	$scope.areaTree = angular.copy(areaTree);
        	$scope.dutyUsers = dutyUsers;
        	
        	$scope.okSave = '1';
        	if(opera === 'edit'){
        		$scope.duty = {
            			'Person':transferdata.user.loginname + '-' + transferdata.user.name,
            			'id':transferdata.id,
            			"name": transferdata.name,                                  
            			"telephone": transferdata.telephone,                         
            			"userId": transferdata.userId,                               
            			"warmEmail": transferdata.warmEmail,
            			'areas':transferdata.areas
            		}
        	}else{
        		$scope.duty = {
            			'Person':"",
            			"name": "",                                  
            			"telephone": "",                         
            			"userId": "",                               
            			"warmEmail": "",
            			'areas':[]
            		}
        	}
        	
        	$scope.oldAreas = angular.copy($scope.duty.areas);
        	$scope.areas = [];
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.checkClassroom = function(){
            	getSelectClassrooms($scope.areaTree[0]);
            	$scope.duty.areas = angular.copy($scope.areas);
            	
            	ClassroomService.DutyCheck($scope.oldAreas,$scope.areas).then(
            			function(data){
            				$scope.areas = [];
            				if(data.length == 0){
                				$scope.okSave = '0';
            				}else{
            					$scope.errorLists = data;
            					$scope.okSave = '1';
            				}
            				
            				
            			},
            			function(){
            				$modalInstance.dismiss();
            				growl.addErrorMessage("系统错误");
            			}
            	)
            }
            $scope.save = function(){
            	if($scope.okSave == '0'){
            		delete $scope.duty.Person;
	            	if(opera === 'edit'){
		            	ClassroomService.DutyUpdate($scope.duty).then(
		            			function(data){
		            				if(data == '1'){
		                				$modalInstance.close(true);
		                				growl.addSuccessMessage("新建值班室成功");
		            				}
		            				if(data == '0'){
		            					$modalInstance.dismiss('cancel');
		                				growl.addErrorMessage("新建值班室失败");
		            				}
		            				
		            			},
		            			function(){
		            				$modalInstance.dismiss();
	                				growl.addErrorMessage("系统错误");
		            			}
		            	)
		            }else{
		            	ClassroomService.DutyCreat($scope.duty).then(
		            			function(data){
		            				if(data == '1'){
		                				$modalInstance.close(true);
		                				growl.addSuccessMessage("新建值班室成功");
		            				}
		            				if(data == '0'){
		            					$modalInstance.dismiss('cancel');
		                				growl.addErrorMessage("新建值班室失败");
		            				}
		            				
		            			},
		            			function(){
		            				$modalInstance.dismiss();
	                				growl.addErrorMessage("系统错误");
		            			}
		            	)
		            }
            	}
            }
            
            //获取选中的节点
            $scope.getSelectedHoder = function(){
           	   $scope.duty.userId = $scope.duty.Person.split('-')[0];
            }
            //获取选中的节点
            var getSelectClassrooms = function(node){
                if(node.attribute === "Y" && node.isSelected){
                	$scope.areas.push(
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
            var inScope = function(id){
                var result = false;

                $.each($scope.duty.areas, function(index, classroomScope){
                    if(id===classroomScope.scopeid || id===classroomScope.id){
                        result = true;
                        return false;
                    }
                });
                return result;
            };

            var setSelectedTreeNodes = function(node){
                if(inScope(node.id))
                    node.isSelected = true;
                if(node.nodes){
                    $.each(node.nodes, function(index, childNode){
                        setSelectedTreeNodes(childNode);
                    });
                }
            };
//          全选与半选
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
                console.log($scope.atree);
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
                } else if(_node.nodes.length>0 && i==0){ //过滤掉全没选中的情况
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
                console.log($scope.areaTree);

                if(angular.isDefined($scope.areaTree)){
                    $.each($scope.areaTree, function(index, atree){
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
                                } else {
                                    $.each(_node.nodes, function(index, __node){
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
            var init = function(){
            	if(opera === 'edit'){
            		setSelectedTreeNodes($scope.areaTree[0]);
            		setHalfCheckedStyle($scope.areaTree[0]);
            	}
            };
            init();
            
        }
            

       

        var init = function(){
            
            
            //判断是否有权限
           if($scope.global.user.authenticatid.indexOf('auth_classrooms_duty_url_view') === -1){
                console.log("+++++++教室设置  您没有权限+++++++++");
                $location.path('classrooms/tactics');
            };
            $scope.$parent.active = 7;
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
            $scope.dutyList();
            mainTrees("deviceSet", "", "");
            $scope.GetclassAdminsList();
        };

           
        init();
      }]);
});
