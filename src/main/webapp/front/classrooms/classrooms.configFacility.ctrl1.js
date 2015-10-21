define(['app',
    'config'
], function (app, config) {
    app.registerController('ConfigFacilityCtrl', ['$scope','$modal','$stateParams','$location','growl' ,'TacticsService',
        '$http', '$filter', 'TreeService','$stateParams','TreeService','$timeout',
        function ($scope,$modal,$stateParams,$location,growl ,TacticsService,$http, $filter,TreeService,$stateParams,TreeService,$timeout) {
    	
    	$scope.checkoutPut = function(index){
    		if($scope.alarmList[index].output === '1'){
    			var keywords = {
    					"output":$scope.alarmList[index].output,          
    					"state":$scope.alarmList[index].state,          
    				};
    			var alarmTemp = angular.copy($scope.alarmList);
    			alarmTemp.splice(index,1);
    			TacticsService.CheckOutPut(keywords,alarmTemp).then(
        				function(data){
        					if(data == 1){
        						$scope.stateOnlyOne = false;
        					}
        					if(data == 0){
        						$scope.stateOnlyOne = true;
        						growl.addErrorMessage("输出同时存在两个IO1的情况下,状态不能相同");
        					}
        				}
        		)
    		}
    	}
    	
    	// 获取数据字典里报警配置
    	$scope.getAlarmConfig = function(){
    		TacticsService.GetAlarmConfig().then(
    				function(data){
    					$scope.alarmConfigs = data;                                              
    				}
    		)
           
    	}
        
    	// 报警日志的查询
    	$scope.getAlarmList = function(keywords){
    		TacticsService.getAlarmList2(keywords).then(
    				function(data){
    					$scope.alarmList = data.data;
    					$scope.pagination.totalItems = data.total;
    					for(var i=0;i<$scope.alarmList.length;i++){
       /*                         $scope.alarmList[i].outputName="null";
                                $scope.alarmList[i].output="2";



                            $scope.alarmList[i].outputName=$scope.alarmList[i].outputName?$scope.alarmList[i].outputName:'null';
                            $scope.alarmList[i].output=$scope.alarmList[i].output?$scope.alarmList[i].output:'null';*/



    						$scope.alarmList[i].outputTemp = $scope.alarmList[i].outputName+"-"+$scope.alarmList[i].output;
                            //console.log("$scope.alarmList[i].outputTemp:"+$scope.alarmList[i].outputTemp);
    					   //console.log($scope.alarmList[i].output); 
                        } 
                    },
    				function(){}
    		)
    	}
    	$scope.splitData = function(index,data){
            $scope.alarmList[index].output = data.split('-')[1];
    	}
    	$scope.mainTrees = function(keywords,areaid){
            TreeService.mainTree(keywords,areaid).then(
                function(data){
                    $scope.areaTree = data;
                })
    	}

    	$scope.saveList = function(){
    		var areas = [];
            /*$scope.alarmList2=[];
            $scope.alarmList2.push({               
                "output":$scope.add.output,         //中控输出（数据字典的值）  
                "state":$scope.add.state,           //状态0：高  1：低
                "messageAlarm":$scope.add.messageAlarm,//消息报警 0:启用  1:停用  
                "clues":$scope.add.clues,           //提示语
                "bell":$scope.add.bell,             //铃音对应 数字对应的地址
                "emailUse":$scope.add.emailUse,     //邮箱报警使用 0：启用  1:停用
                "sms":$scope.add.sms,                //短信通知 0：启用  1:停用
                "areaId":$scope.areaId          //所选要配置的教室Id
            });*/
            //$scope.alarmList3=$scope.alarmList2.concat($scope.alarmList);
            //console.info("aaaaaaaaaaaaaaa"+$scope.alarmList3+","+$scope.alarmList2+","+$scope.alarmList);
    		TacticsService.SaveAlarmList($scope.alarmList,areas).then(
				function(data){
					if(data.state == 0){
                        $scope.growl("保存失败",'error');						
					}
					if(data.state == 1){
                        $scope.growl("保存成功",'success');						
					}
				}
    		)
    	}
    	$scope.apply = function(){
    		var modalInstance = $modal.open({
                templateUrl: 'classrooms/configFacility/classrooms.configFacility.modal.html',
                backdrop:'static',
                controller: ApplyConfigModalCtrl,
                resolve: {
                	areaTree:function(){
                		return $scope.areaTree;
                	},
                	alarmList:function(){
                		return $scope.alarmList;
                	}
                }
            }).result.then(
                function(){
                }
            );
        };
        
        var ApplyConfigModalCtrl = function ($scope, $modalInstance,growl,areaTree,alarmList){
        	$scope.alarmList= alarmList;
        	$scope.areaTree = areaTree;
        	$scope.savedisbled = false;
        	$scope.cancel = function(){
        		$modalInstance.close('cancel');
        	};
        	$scope.save = function(){
                $scope.areas = [];
        		$scope.savedisbled = true;
        		getSelectClassrooms($scope.areaTree[0]);
                /*for(var i=0;i<$scope.alarmList.length;i++){
                   if(){
                        TacticsService.SaveAlarmList($scope.alarmList,$scope.areas).then(
                            function(data){
                                $scope.statelist = data.resultState;
                            }
                        )
                    }else{
                        alert("中控输入选项设置不能重复，请重新设置！");
                    } 
                }*/
                TacticsService.SaveAlarmList($scope.alarmList,$scope.areas).then(
                            function(data){
                                $scope.statelist = data.resultState;
                            }
                        )
        	}
        	//获取选中的节点
            var getSelectClassrooms = function(node){
                    if(node.attribute === "Y" && node.isSelected && node.typeid=="2"){                   
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
            	$scope.savedisbled = false;
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
                console.log("+++++++node"+node);
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
            }
                
            
    	}


        var init = function(){
        	$scope.areaId =  $stateParams.id;
        	$scope.selectcontent ="centerWarn";           

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
            $scope.getAlarmList($scope.areaId);
            $scope.getAlarmConfig();
            $scope.mainTrees("deviceSet", "", "");
            //$scope.add={};                      
        };
        init();
      }]);
});
