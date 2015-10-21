define(['app',
    'config',
    'common/directives/ip',
    'common/directives/mac'
], function (app, config) {
    app.registerController('FacilityCtrl', ['$scope','$modal','$location','growl','FacilityService' ,'TacticsService',
        '$http', '$filter', 'TreeService','$timeout',
        function ($scope,$modal,$location,growl,FacilityService ,TacticsService,$http, $filter,TreeService,$timeout) {

//        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    	//    切换树
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
        	if($scope.activeAreaTreeNode.node.id==='')
        		$scope.activeAreaTreeNode.node.id = temp[0].id;
    		    $scope.activeAreaTreeNode.node.title = temp[0].title;
                $scope.setActiveAreaTreeNode(
                    {
                        node:{
                            id:temp[0].id,
                            title: temp[0].title                            
                         }
                    });
        }
        
        //toggleArea
        $scope.toggleArea1 = function(){
        	if($scope.toggleArea == false){
        		$scope.areaTree = $scope.areaTreecopy;
        	}else{
        		$scope.areaTree = $scope.organTree;
        		$scope.facility.temp = 'hideOrganTree';
        	}
        	initFirstNode($scope.areaTree);
        	
        }
    	
        //详细查询图片切换
        $scope.setCheckMode = function(mode) {
            $scope.checkMode = mode;
        };

//        配置
        $scope.facilityConfig = function(index){
        	var modalInstance = $modal.open({
                templateUrl: 'classrooms/facility/classrooms.facilityConfig.modal.html',
                backdrop:'static',
                controller: ConfigFacilityModalCtrl,
                resolve: {
                    facility: function () {
                        return $scope.facilityList[index];
                    }
                }
            }).result.then(
                    function(){
                        $scope.searchFacility("",$scope.setTreeid,$scope.pagination,"");
                    }
                );
        };
        var ConfigFacilityModalCtrl = function ($scope, $modalInstance,$location,
                                                facility,growl) {
            $scope.facility = facility;
        }
        //删除弹出框
        $scope.openDeleteFacilityModal = function (facility) {
            var modalInstance = $modal.open({
                templateUrl: 'classrooms/facility/classrooms.deleteFacility.modal.html',
                backdrop:'static',
                controller: DeleteFacilityModalCtrl,
                resolve: {
                    facility: function () {
                        //var _temp = $filter('filter')(facilityList, {checked:true});
                        return facility;
                    }
                }
            }).result.then(
//                  function(callback){
                    function(){
                        $scope.searchFacility("",$scope.setTreeid,$scope.pagination,"");
                    }
                );
        };
        var DeleteFacilityModalCtrl = function ($scope, $modalInstance,$location,
                                                facility,growl, FacilityService) {

            $scope.facility = facility;
            //删除设备接口调用
            $scope.deleteFacilitys = function(){
                FacilityService.deleteFacilitys($scope.facility.id, "").then(
                    function(data){
                        if(angular.isDefined(data)){
                            var url = "/classrooms/facility";
                            growl.addSuccessMessage("删除成功");
                            init();
                            $modalInstance.close();
                        }else
                        	 growl.addSuccessMessage("删除失败");
                        console.log(data);
                    },
                    function(code){
                        //处理失败后操作
                        alert("删除失败!");
                    }
                );
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };



        //添加或编辑设备弹出框
        $scope.editFacilityModal = function (operationFlag, facility) {
            //所属教室接口调用
            var modalInstance = $modal.open({
                templateUrl: 'classrooms/facility/classrooms.editFacility.modal.html',
                backdrop:'static',
                controller: EditFacilityModalCtrl,
                resolve: {
                    facility: function () {
                        return facility;
                    },
                    operationFlag: function(){
                        return operationFlag;
                    },
                    treeid:function(){
                        return $scope.treeid;
                    },
                    activeAreaTreeNode:function(){
                        return $scope.activeAreaTreeNode;
                    },
                    deviceDepartment:function(){
                    	return $scope.deviceDepartment;
                    }
                }
            })
            .result.then(
//                function(callback){
                function(){
                    $scope.searchFacility("",$scope.setTreeid,$scope.pagination,"");
                }
            );
        };

            //添加或编辑设备弹出框---控制器
        var EditFacilityModalCtrl = function ($scope, $modalInstance, $location, growl,facility,treeid,operationFlag,activeAreaTreeNode,deviceDepartment,
                                              FacilityService, CodeService, $timeout) {
            
            console.log($scope.facility);
            if(facility == "" && activeAreaTreeNode.node.attribute == 'Y'){
            	$scope.facility = {
            			'areaname':activeAreaTreeNode.node.title,
            			'areaid':activeAreaTreeNode.node.id,
            			'mostly':"1"
            	}
            }else{
            	$scope.facility = angular.copy(facility);
            }
            $scope.activeAreaTreeNode = activeAreaTreeNode;
            $scope.deviceDepartment = deviceDepartment;
           
            var mostly = facility.mostly;
            var name = facility.name;
            var mac = facility.mac;
            $scope.checkMostly = function(parentDevices,facility){
                $.each(parentDevices,function(index,device){
                	if(device.mostly === "0"&&mostly != "0"){
                        $scope.showFacilityMinError = device.mostly === "0";
//                		 growl.addErrorMessage('该教室已存在主设备');
                		 return;
                	}
                })
            };
            //点击  否 事件
            $scope.checkMostlyNo = function(){
                $scope.showFacilityMinError = "";
            }
            //选中所属教室后，查询父设备
            $scope.searchParentDevice = function(areaname){
                console.log("选中所属教室后，查询父设备$scope.searchParentDevice = function(areaname):" + areaname);
                var areaId = {
                    "id" : ""
                };
                if(areaname === "initParentDevice"){
                    if(angular.isDefined($scope.facility.areaid)){
                        areaId.id = $scope.facility.areaid;
                        $scope.deviceByClassroom(areaId, "");
                    }else if($scope.activeAreaTreeNode.node.length <= 0){
                    	$scope.facility = {
                    		areaname:$scope.activeAreaTreeNode.node.title,
                    		areaid:$scope.activeAreaTreeNode.node.id,
                    		mostly:"1"
                    	};
                    	 areaId.id = $scope.activeAreaTreeNode.node.id;
                         $scope.deviceByClassroom(areaId, "");
                    }
                } else {
                    //通过所属教室查询父设备信息1111-名称
                    var belongClassroom = areaname.split("-");
                    areaId.id = belongClassroom[0];
                    $scope.facility.areaname = belongClassroom[1];
                    $scope.deviceByClassroom(areaId, "");
                }
            };

            //查询设备名称是否匹配--编辑设备/添加设备弹出框里的
            $scope.checkFacilityName = function(parentDevices){
                if($scope.facility.name !== ''){
                	$scope.showFacilityNameError = false;
                	$.each(parentDevices,function(index,node){
                		console.log(node);
                		if(node.value===$scope.facility.name&&name != $scope.facility.name){
                			console.log(node.value+"-"+$scope.facility.name);
                			$scope.showFacilityNameError = true;
                		}
                	})
                }
            };
            var checkType = $scope.facility.typeid;
            //检测设备类型
            $scope.checkType = function(){
            	$scope.showFacilityType = false;
            	if($scope.facility.typeid==checkType)
            		return;
            	if($scope.facility.typeid==''||!angular.isDefined($scope.facility.typeid))
            		return;
            	var data = {
            			areaid:$scope.facility.areaid,
            			typeid:$scope.facility.typeid
            	}
            	 FacilityService.checkType(data).then(function(data){
            		 $scope.showFacilityType = data >0;
            	 });
            }
            var checkMac = $scope.facility.mac;
            $scope.checkMac = function(){
            	$scope.showMacRequired = false;
            	if($scope.facility.mac==checkMac)
            		return;
            	if($scope.facility.mac==''||!angular.isDefined($scope.facility.mac))
            		return;
            	var data = {
            			mac:$scope.facility.mac,
            			id:$scope.facility.id
            	}
            	 FacilityService.checkMac(data).then(function(data){
            		 $scope.showMacRequired = data >0;
            	 });
            }

            //TODO:  自动提示
            //查询时需要返回值 --接受人、最终接受人、续转合同代码查询
            $scope.getByReturn = function(aim,condition){
                var temp = aim+"";
                var keywords = {"id":aim,"value":condition, "holdFlag": false};
                return CodeService.getCodes(keywords,{}).then(
                    function(data){
                        $scope.autoMessageArray = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
            };

            //查询全部的自动提示列表
            $scope.toggleTree = function (flag) {
                if(flag === "ImmediatelyClose"){ //type-select选中后，关闭 自动提示全部列表的代码块
                    $scope.hideTree = true;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTree = !$scope.hideTree;
                    },200);
                }
            };

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量
            $scope.setautoMessageValue = function(autoflag, facility, typeValue){
                if(autoflag === "areaname") {
                    facility.areaname = typeValue.value;
                    facility.areaid = typeValue.id;
                    $scope.hideTree = !$scope.hideTree;
                }
            }

            //验证自动提示框上编辑之后的数据是否在自动提示列表中查询到
            $scope.checkAutoMessage = function(autoflag, facility){
                //遍历自动提示列表，判断输入值是否在列表中存在，不存在的话，清空列表值
                $scope.autoMessageCheck = false;
                if(angular.isDefined($scope.autoMessageArray)){
                    if(angular.isDefined(facility)){
                        $.each($scope.autoMessageArray, function(index, aimI){
                            if(autoflag === 'areaname'){
                                if(facility.areaname === aimI.value){
                                    $scope.autoMessageCheck = true;
//                                return condition;
                                }
                            }
                        });
                    }
                }
                //不存在的话，清空自动提示框录入值
                if(autoflag === 'areaname') {
                    if (!$scope.autoMessageCheck) {
                        facility.areaname = "";
                    }
                }
            }
            //TODO: 自动提示END


            //添加设备保存接口
            $scope.createFacility = function(facility, user){
                console.log(facility);
                console.log('sssssssssssssssssssssssssssss');
                FacilityService.createFacility(facility, user).then(
                    function(data){
                        if(angular.isDefined(data)){
                            //console.log("添加成功!");
                           // var url = "/classrooms/facility";
                           // init();
                           if(data>0){
                        	   growl.addSuccessMessage("信息添加成功");
                           }else{
                        	   growl.addErrorMessage("信息添加失败");
                           }
                           $modalInstance.close();
                        }else
                        	 growl.addSuccessMessage("信息添加失败");
                    },
                    function(code){
                        //处理失败后操作
                        alert("添加失败!");
                    }
                );
            };

            //编辑设备保存接口
            $scope.updateFacility = function(facility, user){
                console.log(facility);
                FacilityService.updateFacility(facility, user).then(
                    function(data){
                        if(angular.isDefined(data)){
                            //console.log("编辑成功!");
                           // var url = "/classrooms/facility";
                            if(data>0){
                            	growl.addSuccessMessage('信息已更新');
                            }else{
                            	growl.addErrprMessage('信息更新失败');
                            }
                           // init();
                            $modalInstance.close();
                        }else
                        	growl.addErrorMessage('信息更新失败');
                    },
                    function(code){
                        //处理失败后操作
                        alert("编辑失败!");
                    }
                );
            };

            //通过所属教室查询父设备信息接口
            $scope.deviceByClassroom = function(facility, user){
                FacilityService.deviceByClassroom(facility, user).then(
                    function(data){
                        if(angular.isDefined(data)){
                        	
                        	$.each(data,function(index,item){
                        		if(item.id===$scope.facility.id){
                        			data.splice(index,1);
                        			$scope.parentDevices = data;
                                    $scope.parentDeviceId = $scope.parentDevices[0].id;
                                    return;
                        		}
                        	});
                        	$scope.parentDevices = data;
                            
                        }
                    },
                    function(code){
                        //处理失败后操作
                        throw(code);
                    }
                );
            };

        

            //全部查询点击行时设置高亮颜色
            $scope.setColor = function(typeobject){
                if(angular.isDefined($scope.autoMessageArray)){
                    $.each($scope.autoMessageArray, function(index, amy){
                        if(amy === typeobject){
                            amy.getColor = true;
                        } else {
                            amy.getColor = false;
                        }
                    })
                }
            }


            //设备 新增，编辑
            $scope.Facilitysave = function (facility) {
            	
            	facility.mac = facility.mac.toUpperCase();
            	facility.camera = parseInt(facility.camera)

                //TODO:调用接口提交数据
                if(angular.isDefined($scope.belongClassroom)){
                    facility.areaid = $scope.belongClassroom[0];
                }
               
                console.log("----------"+facility.parentid);
//                if(facility.mostly === true){
//                    facility.mostly = "0";
//                } else {
//                    facility.mostly = "1";
//                }
                if($scope.operationFlag === 'update'){
                    //预处理所属教室，父设备
                    $scope.updateFacility(facility, "");
                } else {
                    $scope.createFacility(facility, "");
                }
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.treeid = treeid;
            if(angular.isDefined($scope.treeid)){
            } else {
                $scope.treeid = "";
            }

            $scope.save = function () {
                
                $scope.facility.parentid = $scope.setTreeid;
                $scope.facility.attribute = "Y";
                $scope.updateFacility($scope.operationFlag, $scope.facility);
                //TODO: 调用接口提交数据
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            //添加编辑设备初始化方法
            var init = function(){
                //点击编辑时，通过areaId 初始化 父设备
                $scope.searchParentDevice("initParentDevice");
                //点击添加编辑时，默认查询设备机构查询字典接口初始化
                
                $scope.operationFlag = operationFlag;
                //初始化树tree结构
//                mainTrees("deviceSet", "", $scope.treeid);

                //默认隐藏自动提示框内容
                $scope.hideTree = true;
            };
            init();
        };

            //通过所属教室查询父设备信息接口--最外层  详细查询里的设备类型
            $scope.getDeviceDepartment = function(value){
            	TacticsService.code(value).then(
                    function(data){
                        if(angular.isDefined(data)){
                        	console.log(data);
                            $scope.deviceDepartment = data;
                        }   
                    },
                    function(code){
                        //处理失败后操作
                        throw(code);
                    }
                );
            };

            //通过所属教室查询父设备信息接口--最外层  详细查询里的运行状态
            $scope.getStateList = function(value){
            	TacticsService.code(value).then(
                    function(data){
                        if(angular.isDefined(data)){
                        	console.log(data);
                            $scope.StateList = data;
                        }
                    },
                    function(code){
                        //处理失败后操作
                        throw(code);
                    }
                );
            };
        //服务
        $scope.serveModal = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'classrooms/facility/classrooms.serve.modal.html',
                controller: ServeModalCtrl,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };

        var ServeModalCtrl = function ($scope, $modalInstance, items) {

            $scope.ok = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        $scope.activeArea = {id:'',title:'', parent:{id:'',title:''}};
        $scope.setActiveArea = function (node, parents, topnode) {
            $scope.activeArea = node;
//            if(node.id.length === topnode.id.length-1){
//                $scope.activeArea = topnode.title;
//            }
            $scope.topareaTitle = topnode;
            $scope.parentsTitle = parents;
            $scope.searchFacility(node,$scope.pagination,"");
        };

        //预处理mac参数
        var dealMacList = function(){
        	var _dealMac = [];
//        	$timeout(function(){
        		if($scope.facilityList.length>0){
        			$.each($scope.facilityList,function(index,facility){
            			_dealMac.push(facility.mac);
                    });
        		}
        		return _dealMac;
//        	},1000);
        };
        
        //预处理数据结构
        /*var dealDataFormat = function(data){
//        	data = [{"00E04C730075":"1"},{"00E04C730071":"1"}];
        	
        	//将data结构重组，然后赋值给dataFormatList
        	$scope.dataFormatList = [];
        	if(angular.isDefined(data) && data.length>0){
        		$.each(data, function(index, d){
        			var mac;
        			var state;
        			for(var i in d){
        				mac = i;
        				state = d[i]
        			}
        			
        			var dataFormat = {
    					"mac" : mac,
    					"state": state
        			};
        			dataFormat.mac = JSON.stringify(d).split(":")[0].split("\"")[1]; //分隔符右侧取内容
        			dataFormat.state = JSON.stringify(d).split(":")[1].split("\"")[1]; //分隔符右侧取内容
        			$scope.dataFormatList.push(dataFormat);
        		});
        	}
        };*/
        
      //处理websocket推送过来的mac,deviRemain
        $scope.enumaKey = function(data){  
        	
        	var webData = eval(data);
        	
        	$scope.webDataDeal = [];
        	
        	$.each(webData, function(index, webD){
        		
        		for(web in webD){
        			
        			var macDeal = {
                    		"mac" : "",
                    		"deviRemain" : "",
                    		"state": ""
                    	};
        			macDeal.mac = web;
            		macDeal.deviMsg = JSON.stringify(webD[web]);
        		}
            	
            	//如果第4个位置获取不到。则表示，该名字服务无设备信息
            	if(angular.isUndefined(macDeal.deviMsg.split(",,")[4])){
            		macDeal.deviRemain = ""; //无设备信息
            	} else {
            		macDeal.deviRemain = macDeal.deviMsg.split(",,")[4];//",,"左侧分隔取内容
            	}
            	
            	//如果第5个位置获取不到。则表示，该名字服务无提示信息，则获取第一个位置的状态
            	if(angular.isUndefined(macDeal.deviMsg.split(",,")[5])){
            		macDeal.state = macDeal.deviMsg.split(",,")[0].split("\"")[1];
            	} else {
            		macDeal.state = macDeal.deviMsg.split(",,")[5].split("\"")[0];//",,"左侧分隔取内容
            	}
            	
            	$scope.webDataDeal.push(macDeal);
            });
        }; 
        
        //websocket推送消息完成状态设置
        var updateListState = function(isRefresh, data, dataList){
        	
        	if(isRefresh){
        		data = JSON.stringify(data);
        	}
        	
        	data = JSON.stringify(data);
//        	data = "[{'000000000002':'LivingStart,,0,,auto,,62.01,,1'},{'00E04C730071':'LivingStart,,276,,auto,,78.39,,1'},{'00E04C680001':'LivingStart,,276,,auto,,71.26,,0'}]";
        	if(angular.isUndefined(data) || data === "[]" || data === "" || data === null || data.length <= 0){
        		return;
        	} else {
        		
        		var dataCheckArray = data.split(":");
                var dataCheckFlag = dataCheckArray[0];
                if(dataCheckFlag === "connectId"){
                } else {
            		
            		$scope.enumaKey(data);
            		//遍历传递过来的mac状态,与列表数据作比较，如果查找到，则将该记录的state状态值设置为1
        			//将后台返回数据做处理，有就置状态，无就不管
        			$.each($scope.webDataDeal, function(index, webD){
            			$.each(dataList, function(index, listD){
            				if(webD.mac === listD.mac){
                				listD.state = webD.state;
                				listD.deviRemain = webD.deviRemain;
                				return false ;
                			}
            			});
            		});
        			
        			//将列表数据做处理，只要state不是字符串1,全部赋值为0
        			$.each(dataList, function(index, listD){
        				if(listD.state != "1"){
            				listD.state = "0";
            			}
        			});
        			
        			console.log("处理后的数据为 start ...");
        			console.log(dataList);
        			console.log("处理后的数据为 end ...");
        			
        			//返回处理后的数组
        			return dataList;
                }
        	}
        };
        
        //处理列表状态
        var getListState = function(){
        	//接受mac参数，向后台请求状态信息
            $scope.macListParam = dealMacList();
            $http.get($scope.activedeviceServiceurl + "refresh?mac=" + $scope.macListParam)
                .success(function(data){
//                    if(angular.isDefined(data)) {
                    	if(data.length>0) {	
                    	//预处理数据结构
                    	//dealDataFormat(data);
                    	
//                    	data = "[{'00E04C73006D':'LivingStart,,0,,auto,,62.01,,1'},{'00E04C680001':'LivingStart,,276,,auto,,78.39,,1'},{'00E04C24099A':'LivingStart,,276,,auto,,71.26,,0'}]";
                    	
                    	//将返回值遍历，并且设置state状态
                    	/*if($scope.dataFormatList.length>0){
                    		$.each($scope.dataFormatList, function(index, d){
                    			$.each($scope.facilityList, function(index, facility){
                    				if(d.mac === facility.mac){
                    					facility.state = d.state;
                    				}
                        		});
                    		});
                    		
                    		$.each($scope.facilityList, function(index, facility){
                				if(facility.state != "1"){
                					facility.state = "0";
                				}
                    		});
                    	}*/
                    	
                    	var updateListStateTimer = $timeout(function(){
                    		$scope.facilityList = updateListState("", data, $scope.facilityList);
                    	},1000);
                    	
                    	
                    	console.log("deal end is start....");
                    	console.log($scope.facilityList);
                    	console.log("deal end is end....");
                    }
                })
                .error(function(data,status,headers,config){
                	if(status === 500){
                		//alert($scope.activedeviceServiceurl + "recordingStauts method is error: " + "网络未连接。。");
                	}
                	throw(status);
//                        alert($scope.activedeviceServiceurl + "recordingStauts" + code);
                });
        }
        
        //设备列表查询--在最外面
        $scope.searchFacility = function (select){
        	$scope.selectfacility = (select == undefined) ? '1':select;
//            $scope.selectfacility = select;
            console.log('通过后台接口查询设备');
            FacilityService.searchFacility($scope.facility, $scope.activeAreaTreeNode.node.id, $scope.pagination, "").then(
                function(data){
//                        $scope.facilityList = data.data;
                    $scope.facilityList = data.data;
                    $scope.pagination.totalItems = data.total;
                    $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                    $.each($scope.facilityList,function(index,facility){
                        if(facility.mostly === "0"){
//                                alert("教室已经有主设备");
//                                $scope.schedule.video = schema.id;
                        }
                        if(facility.mostly === "1"){
//                                alert("教室没有主设备");
//                                $scope.schedule.livemodel = schema.id;
                        }
                    });
                    
                    //处理列表状态
                    getListState();
                },
                function(code){

                }
            );
        };

        //查询字典
        var searchFlag = true;
        $scope.searchList = [];
        $scope.getCode = function(keywords,user,searcher){
            var temp = angular.copy({keywords:keywords,searcher:searcher});
            $scope.searchList.push(temp);
            if(searchFlag && $scope.searchList.length > 0){
                ralSearch(user);
            }
        };
        var ralSearch = function(user){
            if(searchFlag && $scope.searchList.length > 0){
                searchFlag = false;
                $scope.getCodes($scope.searchList[0].keywords,user).then(
                    function(data){
                        $scope[$scope.searchList[0].searcher] = data;
                        searchFlag = true;
                        $scope.searchList.splice(0,1);
                        ralSearch();
                    },
                    function(code){
                        console.log("error  "+code);
                        searchFlag = true;
                        if(angular.equals(code,"bussy")){
                            $scope.searchList.push($scope.searchList[0]);
                            $scope.searchList.splice(0,1);
                        }else{
                            $scope[$scope.searchList[0].searcher] = [];
                            $scope.searchList.splice(0,1);
                        }
                        ralSearch();
                    }
                );
            }
        };



//在setup里放在 var 里 这是放在最外面
        $scope.activeAreaTreeNode = {
            node:{
                id: '',
                title:'',
                attribute:''
            }
        };

        //设置当前选中的树节点--外面页面的tree
        $scope.setActiveAreaTreeNode = function (that) {
            $scope.activeAreaTreeNode.node.id = that.node.id;
            $scope.activeAreaTreeNode.node.title = that.node.title;
            if(that.node.nodes && that.node.nodes.length < 1){
            	$scope.activeAreaTreeNode.node.attribute = "Y";
            }
            if($scope.areaTree[0].temp){
            	$scope.facility.temp = "hideOrganTree";
            }else{
            	$scope.facility.temp = "";
            }
            //调用查询接口   对相应的列表进行查询
            $scope.searchTreeData($scope.facility, $scope.activeAreaTreeNode.node.id, $scope.pagination,"");

            $timeout(function(){
                max_height = $("#rightContent-height").height();  
                // console.log("右边内容高度max_height"+max_height);              
                $("#tree-root").css('max-height',function(){
                return max_height + 55;
                // alert()
            });
            },500);
        };
        //设备列表查询--在最外面
        $scope.searchTreeData = function (){
            console.log('通过后台接口查询设备');
            FacilityService.searchFacility($scope.facility, $scope.activeAreaTreeNode.node.id, $scope.pagination, "").then(
                function(data){
//                    $scope.facilityList = data.data;
                    $scope.facilityList = data.data;
                    $scope.pagination.totalItems = data.total;
                    $.each($scope.facilityList,function(index,facility){
                        if(facility.mostly === "0"){
//                            alert("教室已经有主设备");
//                            $scope.schedule.video = schema.id;
                        }
                        if(facility.mostly === "1"){
//                            alert("教室没有主设备");
//                            $scope.schedule.livemodel = schema.id;
                        }
                    });
                    
                    //处理列表状态
                    getListState();
                },
                function(code){

                }
            );
        };

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
            if($scope.selectfacility === '1'){
                $scope.searchFacility(); //调用查询接口
            }else{
                $scope.facility = '';
                $scope.searchFacility(); //调用查询接口
            }

        };

        //点击全部选中时设置控制的单选按钮状态
        $scope.checkAllFacilitys = function (){
            $scope.checkAll = !$scope.checkAll;
            $.each($scope.facilityList, function(index, facility){
                facility.checked = $scope.checkAll;
            });
        };

        //监视contractList中是否有元素被改变状态
        $scope.$watch('facilityList', function(){
            //监测是否有元素被选中
            var _temp = $filter('filter')($scope.facilityList, {checked:true});
            $scope.selectedCount = _temp.length;
            if(_temp.length === $scope.facilityList.length)
                $scope.checkAll = true;
            else
                $scope.checkAll = false;
        },true);


            //Json--Tree   写在最外面  没有在var  $scope 里
            var mainTrees = function(keywords,areaid){
                TreeService.mainTree(keywords,areaid).then(
                    function(data){
                        $scope.areaTree = data;
                        console.log('通过var mainTrees = function(areaid)方法 获取树接口',areaid);
                        $scope.areaTreecopy = data;
                        $scope.areaTree = $scope.areaTreecopy;
                        initFirstNode($scope.areaTreecopy);
                        /*if($scope.activeAreaTreeNode.node.id==='') {
                            $scope.setActiveAreaTreeNode(
                                {
                                    node: {
                                        id: $scope.areaTree[0].id,
                                        title: $scope.areaTree[0].title,
                                        attribute: $scope.areaTree[0].attribute
                                    }
                                });
                        }*/

                        /* fxy edit 树形结构样式判断 (添加parentid字段，用于图标显示)*/
                        if(angular.isDefined($scope.areaTree)){
                            $.each($scope.areaTree, function(index, at){
                                at.parentid = "";
                            });
                        }
                    },
                    function(){

                    }
                );
            };
        //状态翻译状态码
        $scope.initStatus = function(state){
        	var name ="";
        	$.each($scope.deviceDepartment,function(index,data){
        		if(data.value == state){
        			name = data.name;
        			return false;
        		}
        	});
        	return name;
        };

        window.onresize = function () {
            min_height =  window.innerHeight;
            $("#rightContent-height").css('min-height',function(){
                return min_height - 320;
             });
            $("#tree-root").css('max-height',function(){               
                return window.innerHeight - 310;                
            });                          
        }
        var setTreeHeight = function(){               
                                 
            $timeout(function(){
                max_height = $("#rightContent-height").height();  
                min_height =  window.innerHeight;
                // alert("window.innerHeight"+window.innerHeight);
                $("#rightContent-height").css('min-height',function(){
                    return min_height - 320;
                 });
                 // alert("窗体高度mix_height"+$('#rightContent-height').css('min-height')); 
                $("#tree-root").css('max-height',function(){
                    return max_height + 70;                
                  });              
            },2000);
        };
        //排序方法
        $scope.orderby = function(order){
            if($scope.sort[order] === 'asc'){
                $scope.sort[order] = 'desc';
            }
            else{
                $scope.sort[order] = 'asc';
            }
            $scope.pagination.sort=$scope.sort[order];
            $scope.pagination.order=order;
            $scope.searchFacility();
        };

        var init = function(){
        	
        	//停止课程巡视画面中的视屏轮询
        	var evt = document.createEvent("HTMLEvents");
        	evt.initEvent("active", false, false);
        	evt.id = 'FacilityCtrl';
        	window.dispatchEvent(evt);

            $scope.selectfacility = '';
            
            //请求地址公共变量
    		$scope.activedeviceServiceurl = config.backend.ip + config.backend.base2;

            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_classrooms_facility_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++教室设置  您没有权限+++++++++")
                $location.path('classrooms/fixedTask');
//                window.location.href("login");
            };
            $scope.$parent.active = 1;
            $scope.checkMode = 'play';
            $scope.facilityList = [];

            //数据字典差寻条件
            $scope.keywords = {
                "id":"",
                "value":"",
                "other1":"",
                "name":'',
                "state":'',
                'temp':''
            };

            //添加设备-所属教室
            var key = angular.copy($scope.keywords);
            key.id="classroomCode";
            key.value="";
            $scope.getCode(key,{},"classroomCode");

            //全选按钮设置为未选中状态（不初始化为false）
            $scope.checkAll = false;


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
                order:"name",
                sort:"asc"
            };
            
            $scope.sort = {
            	"name":"asc",
            	"areaname":"asc",
            	"typeid":"asc"
            };




            //最外层在var init 里--点击详细查询时  设备类型数据字典接口初始化
            $scope.getDeviceDepartment("deviceType");
            //最外层在var init 里--点击详细查询时  运行状态数据字典接口初始化
            $scope.getStateList('deviceStatus');

            $scope.facility = {
                "name":"",
                "state":"",
                "mac":"",
                "ip":"",
                "runStats":"",
                'temp':''
            };

            $scope.hideAdvancedSearch = true;
            $scope.areaTree =[];
            $scope.setTreeid = "";
            userTrees("trees",'');
            //初始化树tree结构  多的
            mainTrees("deviceSet", "", $scope.setTreeid);

//            $scope.searchFacility("",$scope.setTreeid,$scope.pagination,"");
            console.log('获取教室列表');

        };

            $scope.selectPage = function(event) {
                console.log(event);
            };
        setTreeHeight();
        init();
      }]);
});
