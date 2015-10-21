define(['app',
    'config',
    'directorSeize'
], function (app,config) {
    app.registerController('DailyCtrl', ['$scope','$rootScope','$modal','$location',
        'DailyService','TreeService', '$filter','$rootScope','$timeout','growl','$http','$interval'
        ,function ($scope,$rootScope,$modal,$location,DailyService,TreeService,  $filter,$rootScope,$timeout,growl,$http,$interval) {
        
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
            if($scope.activeAreaTreeNode.id==='')
                $scope.activeAreaTreeNode.id = temp[0].id;
                $scope.activeAreaTreeNode.title = temp[0].title;
                $scope.setActiveAreaTreeNode(
                    {
                       
                            id:temp[0].id,
                            title: temp[0].title
                        
                    });
        }
        
        //toggleArea
        $scope.toggleArea1 = function(){
            if($scope.toggleArea == false){
                $scope.areaTree = angular.copy($scope.areaTreecopy);
            }else{
                $scope.areaTree = angular.copy($scope.organTree);
                $scope.daily.temp = 'hideOrganTree';
            }
            initFirstNode($scope.areaTree);
            
        }
        
        
        //设置打开新标签
        $scope.setopenNewWindow = function(flag,id){
            if(flag === "resource"){
                window.open('index.html#/resource/upload?para=' + id);
            } else {
                window.open('index.html#/scheduleManagements/week?para=' + id);
            }
        };
        
        //根据页码查询
        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
            }
            $scope.searchDaily("","",_pagination,"");
        };

        //点击全部选中时设置控制的单选按钮状态
        $scope.checkAllDailyList = function (){
            $scope.checkAll = !$scope.checkAll;
            $.each($scope.dailyList, function(index, daily){
                daily.checked = $scope.checkAll;
            });
        };

        //监视contractList中是否有元素被改变状态
        $scope.$watch('dailyList', function(){
            //监测是否有元素被选中
            if(angular.isDefined($scope.dailyList)){
                var _temp = $filter('filter')($scope.dailyList, {checked:true});
                $scope.selectedCount = _temp.length;
//                $.each(_temp, function(index, daily){
                for(var j=0; j<_temp.length;j++){
                    if(_temp[j].state == 1){
                        $scope.flag = true;
                        break;
                    }else{
                        $scope.flag = false;
                    };
                };
                /*for(var j=0; j<_temp.length;j++){
                        $scope.flag = _temp[j].device;
                        
                };*/
                $scope.macListRecord=[];
                $scope.macListCenter=[];
                $scope.macTotal = [];
                $.each(_temp, function(index, daily){
                    for(var i in daily.device){
                    	$scope.macTotal.push(daily.device[i].mac);
                        if(daily.device[i].typeid == '1'){
                            $scope.macListRecord.push(daily.device[i].mac);
                        }
                        if(daily.device[i].typeid == '2'){
                        	$scope.macListCenter.push(daily.device[i].mac);
                        } 
                    }
                }); 
                
            	
                $scope.showM = _temp.length > 0 && $scope.flag;
//                $scope.showM = _temp.length > 0 && _temp[_temp.length-1].state==1;                
                if(_temp.length === $scope.dailyList.length)
                    $scope.checkAll = true;
                else
                    $scope.checkAll = false;
            }
        },true);

        //设置当前选中的树节点--在最外面
        $scope.setActiveAreaTreeNode = function (dailytree) {

            $scope.activeAreaTreeNode.id = dailytree.id;
            $scope.activeAreaTreeNode.title = dailytree.title;
            if($scope.areaTree[0].temp){
                $scope.daily.temp = "hideOrganTree";
            }else{
                $scope.daily.temp = "";
            }
            console.log("that点击树时用来接收页面node传过来的：",dailytree);
            console.log("setActiveAreaTreeNode的",$scope.activeAreaTreeNode);
            //点击树tree节点调用查询接口  --相应列表分页等。。。 因此查询
            $scope.init_first = $scope.init_first + 1;
            $scope.searchDaily($scope.daily, $scope.activeAreaTreeNode.id, $scope.pagination,"");

             //左边树自适应与右边内容高度                   
            $timeout(function(){
                max_height = $("#rightContent-height").height();  
                // console.log("右边内容高度max_height"+max_height);              
                $("#tree-root").css('max-height',function(){
                return max_height + 85;
                // alert()
            });
            },500);    
        };

        //日常列表查询
        $scope.searchDaily = function (keywords,areaid,pagination, user){
           
            DailyService.searchDaily(keywords,areaid,pagination, user).then(
                function(data){
                    if(data.data.length > 0){
                        $scope.dailyList = data.data;
                        pagination.totalItems = data.total;
                        //根据数据是否有录播和中控添加icon状态
                        /*if($scope.init_first == 1){*/
	                        $.each($scope.dailyList, function(index, daily){
								daily.recordedBroadcastIcon = daily.centerControllerIcon = false;
	                            for(var i in daily.device){
									switch(daily.device[i].typeid){
										case "1":
											daily.recordedBroadcastIcon = true;
											daily.remac = daily.device[i].mac
										break;
										case "2":
											daily.centerControllerIcon = true;
											daily.ccmac = daily.device[i].mac
										break;
									}
									
	                                /*if(daily.device[i].typeid == '1'){
	                                	daily.recordedBroadcastIcon = true;
	                                }else{
	                                	daily.recordedBroadcastIcon = false;
	                                }
	                                if(daily.device[i].typeid == '2'){
	                                	daily.centerControllerIcon = true;
	                                }else {
	                                	daily.centerControllerIcon = false;
	                                }*/
	                            }
	                        }); 
                        /*}*/
                        //重新刷新列表状态
						console.log('classroomList:', $scope.dailyList)
                        $scope.deviceRefresh();
                    }else{
                        $scope.dailyList =[];
//                        $scope.$emit('notification', {message:'未查找到相关信息', delay:3000, type:'error'});
                    }
                    console.log("-------------------");
                    console.log($scope.dailyList);
                    
                    //设备刷新
//                    $scope.deviceRefresh();
                },
                function(code){
                    throw(code);
                }
            );
        };

        //刷新按钮
        $scope.deviceRefresh = function(freshFlag){
            
            var macListParam = []
            //传列表mac，得到在线列表
            $.each($scope.dailyList, function(index, daily){
                for(var i in daily.device){
                    if(daily.device[i].typeid == '1'||daily.device[i].typeid == '2'){
                        macListParam.push(daily.device[i].mac);
                    }
                }
            }); 
            
            
            $http.get($scope.activedeviceServiceurl + "refresh?mac=" + macListParam)
                .success(function(data){
                    if(angular.isDefined(data)) {
                        $scope.updateListState(true,data);
                    }
                })
                .error(function(data,status,headers,config){
                    if(status === 500){
                    }
                    throw(status);
                });
            
            //请求完之后，按钮30s不可用
            if(freshFlag == '1'){
                $scope.deviceResfreshSet = true;
                var deviceResfreshSetTime = $timeout(function(){
                    $scope.deviceResfreshSet = false;
                },30000);
                growl.addSuccessMessage("刷新按钮30秒后才可用!")
            }
            
        };
        var deviceListResfresh = $interval(function(){
           if($scope.classroomlistinfo == true){
        	 var macListParam = [];
        	 var macListOnLine = [];
        	 var memeryMac = [];
             //传列表mac，得到在线列表
             $.each($scope.dailyList, function(index, daily){
	                 for(var i in daily.device){
	                     if(daily.device[i].typeid == '1'||daily.device[i].typeid == '2'){                    	
	                         macListParam.push(daily.device[i].mac);
	                         memeryMac.push({'index':index,'mac':daily.device[i].mac})
	                     }
	                 }
             	
             }); 
        	 $http.get($scope.activedeviceServiceurl + "refresh?mac=" + macListParam)
             .success(function(data){
                 if(angular.isDefined(data)) {
                	 $scope.updateListState(true,data);
                	 for(var t in $rootScope.webDataDeal){
                		 if($rootScope.webDataDeal[t].deviceType === 'centralcontroller'){
                    			macListOnLine.push($rootScope.webDataDeal[t].mac);
                    	}
                	 }
                     $http.get($scope.activedeviceServiceurl + "selectCentralStateFromEache?mac=" + macListOnLine)
                     .success(function(d){
                        	 if(angular.isDefined(d)) {
                             	for(var j in macListOnLine){
                                		for(var i in memeryMac){               		
                                			if(memeryMac[i].mac == macListOnLine[j]){
                                				var index = memeryMac[i].index;
                                				$scope.dailyList[index].CustomLightingState = $scope.spliteData(d[j].value.CustomLightingState);
	                                      		$scope.dailyList[index].CustomLockState = $scope.spliteData(d[j].value.CustomLockState);
	                                      		$scope.dailyList[index].CustomPanelState = $scope.spliteData(d[j].value.CustomPanelState);
	                                      		$scope.dailyList[index].CustomPcState = $scope.spliteData(d[j].value.CustomPcState);
	                                      		$scope.dailyList[index].CustomProjectorState = $scope.spliteData(d[j].value.CustomProjectorState);
	                                      		$scope.dailyList[index].MicMute = $scope.spliteData(d[j].value.MicMute);
	                                		}
                                		}
                                		
                                	}
                             }                        
                     })
                     .error(function(data,status,headers,config){
                         if(status === 500){
                         }
                         throw(status);
                     });
                 
                 }
             })
             .error(function(data,status,headers,config){
                 if(status === 500){
                 }
                 throw(status);
             });
        	}
        },10000);
        
        //截取返回来的中控数据
        $scope.spliteData = function(data){
        	var tempdata = data.split('&')[2].split('=')[0];
        	return tempdata;
        }
        //刷新deviceList 按钮
        $scope.deviceListRefresh = function(freshFlag){
            
            var macListParam = [];
            var macListOnLine = [];
            var memeryMac = [];
            //传列表mac，得到在线列表
            $.each($scope.dailyList, function(index, daily){
                for(var i in daily.device){
                    if(daily.device[i].typeid == '1'||daily.device[i].typeid == '2'){                    	
                        macListParam.push(daily.device[i].mac);
                        memeryMac.push({'index':index,'mac':daily.device[i].mac})
                    }
                }
            }); 
            
            
            $http.get($scope.activedeviceServiceurl + "refresh?mac=" + macListParam)
            .success(function(data){
                if(angular.isDefined(data)) {
               	 $scope.updateListState(true,data);
               	for(var t in $rootScope.webDataDeal){
               		if($rootScope.webDataDeal[t].deviceType === 'centralcontroller'){
               			macListOnLine.push($rootScope.webDataDeal[t].mac);
               		}
	           		
	           	 }
               	
                    $http.get($scope.activedeviceServiceurl + "selectCentralState?mac=" + macListOnLine)
                    .success(function(d){
                        if(angular.isDefined(d)) {
                        	for(var j in macListOnLine){
                           		for(var i in memeryMac){               		
                           			if(memeryMac[i].mac == macListOnLine[j]){
                           				var index = memeryMac[i].index;
                           				$scope.dailyList[index].CustomLightingState = $scope.spliteData(d[j].value.CustomLightingState);
                                 		$scope.dailyList[index].CustomLockState = $scope.spliteData(d[j].value.CustomLockState);
                                 		$scope.dailyList[index].CustomPanelState = $scope.spliteData(d[j].value.CustomPanelState);
                                 		$scope.dailyList[index].CustomPcState = $scope.spliteData(d[j].value.CustomPcState);
                                 		$scope.dailyList[index].CustomProjectorState = $scope.spliteData(d[j].value.CustomProjectorState);
                                 		$scope.dailyList[index].MicMute = $scope.spliteData(d[j].value.MicMute);
                           			}
                           		}
                           		
                           	}
                        }
                    })
                    .error(function(data,status,headers,config){
                        if(status === 500){
                        }
                        throw(status);
                    });
                
                }
            })
            .error(function(data,status,headers,config){
                if(status === 500){
                }
                throw(status);
            });
            
            //请求完之后，按钮30s不可用
            if(freshFlag == '2'){
                $scope.deviceListResfreshSet = true;
                var deviceResfreshSetTime = $timeout(function(){
                    $scope.deviceListResfreshSet = false;
                },30000);
                growl.addSuccessMessage("刷新按钮30秒后才可用!")
            }
            
        };
        $scope.checkselecte1 = function(){
        	$scope.centerChecked = true; 
        	$scope.recordChecked = false;
        }
        $scope.checkselecte2 = function(){
        	$scope.recordChecked = true; 
        	$scope.centerChecked = false;
        }
        //定是否重启关机复位弹框
        $scope.deviceDialog = function (DeviceBtnType) {
        	console.log($scope.centerChecked);
        	/*console.log(recordChecked);*/
            var modalInstance = $modal.open({
                templateUrl: 'classrooms/daily/classrooms.deviceOperation.modal.html',
                backdrop:'static',
                controller: DeviceBtnModalCtrl,
                resolve: {
                    DeviceBtnType: function () {
                        return DeviceBtnType;
                    }
                }
            }).result.then(
                    function(DeviceBtnType){
                       console.log(DeviceBtnType);
                        if (DeviceBtnType == '重启') {
                            $scope.deviceRestart();
                        } else if(DeviceBtnType == '关机'){
                            $scope.deviceClose();
                        } else if(DeviceBtnType == '复位'){
                            $scope.deviceReset();
                        } else if(DeviceBtnType == '上课'){
                            $scope.schemeOpen();
                        } else if(DeviceBtnType == '下课'){
                            $scope.schemeClose();
                        }
                    }
                );
        };
        var DeviceBtnModalCtrl = function ($scope, $modalInstance,DeviceBtnType) 
        {

            $scope.DeviceBtnType = DeviceBtnType;
            $scope.ok = function(DeviceBtnType){
               $modalInstance.close(DeviceBtnType);
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        //重启按钮
        $scope.deviceRestart = function(){ 
            
            //过滤选中的记录，同时筛选出状态为在线的记录，赋值给另外一个数组变量mac
            var _onLinetemp = $filter('filter')($scope.dailyList, {checked:true});
            var mac = [];
            if(_onLinetemp.length>0){
                $.each(_onLinetemp, function(index, online){
                    /*if(online.state === "1"){
                        mac.push(online.mac);
                    }*/
                    for(var i in online.device){
                        if(daily.device[i].typeid == '1'){
                            mac.push(daily.device[i].mac);
                        }
                    }
                });
            }
            
            exec($scope.activedeviceServiceurl + "shutdownAndRestart?para=restart&mac=" + mac);
            /*DailyService.shutdownAndRestart().then(
                    function(data){
                    },
                    function(code){
                    }
                ); */           
        }
        
      //关闭按钮
        $scope.deviceClose = function(){
            
            //过滤选中的记录，同时筛选出状态为在线的记录，赋值给另外一个数组变量mac
            var _onLinetemp = $filter('filter')($scope.dailyList, {checked:true});
            var mac = [];
            if(_onLinetemp.length>0){
                $.each(_onLinetemp, function(index, online){
                    for(var i in online.device){
                        if(daily.device[i].typeid == '1'){
                            mac.push(daily.device[i].mac);
                        }
                    }
                    
                });
            }
            exec($scope.activedeviceServiceurl + "shutdownAndRestart?para=shutdown&mac=" + mac);
            /*DailyService.shutdownAndRestart().then(
                    function(data){
                    },
                    function(code){
                    }
                );   */         
        }
        
      //复位按钮
        $scope.deviceReset = function(){          
            //过滤选中的记录，同时筛选出状态为在线的记录，赋值给另外一个数组变量mac
            var _onLinetemp = $filter('filter')($scope.dailyList, {checked:true});
            var mac = [];
            if(_onLinetemp.length>0){
                $.each(_onLinetemp, function(index, online){
                    for(var i in online.device){
                        if(daily.device[i].typeid == '1'){
                            mac.push(daily.device[i].mac);
                        }
                    }
                });
            }
            exec($scope.activedeviceServiceurl + "perset?para=1&mac=" + mac);       
        }
      //上课按钮
        $scope.schemeOpen = function(){    
        	/*if($scope.recordChecked==true){
        		$scope.macListTemp = $scope.macListRecord;       		
        	}
        	if($scope.centerChecked == true){
        		$scope.macListTemp = $scope.macListCenter;
        	}
        	if($scope.centerChecked == true && $scope.recordChecked==true){
        		$scope.macListTemp = $scope.macTotal;
        	}
            exec($scope.activedeviceServiceurl + "sendCmdtoCentralControl?cmd= CsnGroupCmd :OpenCSN&mac=" + $scope.macListTemp);   */
        	/*if($scope.recordChecked==true){
        		$scope.macListTemp = $scope.macListRecord;
        		exec($scope.activedeviceServiceurl + "sendCmdToCentralRecord?cmd=CsnGroupCmd:OpenCSN&mac=" + $scope.macListTemp);
        	}*/
        	if($scope.centerChecked == true){
        		$scope.macListTemp = $scope.macListCenter;
        		exec($scope.activedeviceServiceurl + "sendCmdToCentralControl?cmd=CsnGroupCmd:OpenCSN&mac=" + $scope.macListTemp);
        	}
        }
      //下课按钮
        $scope.schemeClose = function(){    
        	/*if($scope.recordChecked==true){
        		$scope.macListTemp = $scope.macListRecord;
        		exec($scope.activedeviceServiceurl + "sendCmdToCentralRecord?cmd=CsnGroupCmd:CloseCSN&mac=" + $scope.macListTemp);
        	}*/
        	if($scope.centerChecked == true){
        		$scope.macListTemp = $scope.macListCenter;
        		exec($scope.activedeviceServiceurl + "sendCmdToCentralControl?cmd=CsnGroupCmd:CloseCSN&mac=" + $scope.macListTemp);
        	}
        	/*if($scope.centerChecked == true && $scope.recordChecked==true){
        		$scope.macListTemp = $scope.macTotal;
        	}*/
        	/*else{
        		$scope.macListTemp = "";
        	}
            exec($scope.activedeviceServiceurl + "sendCmdtoCentralControl?cmd= CsnGroupCmd :CloseCSN&mac=" + $scope.macListTemp);    */         
        }

        $scope.commentReplay = function(){
            alert("commentReplay",$scope.commentReplay);
            console.log("commentReplay",$scope.commentReplay);
        }

        //Json--Tree  -- 最外面  没有在var  $scope 里
        var mainTrees = function(keywords,areaid){
            TreeService.mainTree(keywords,areaid).then(
                function(data){
                    $scope.areaTree = data;
                    console.log('通过后台接口获取树接口');
                    $scope.areaTreecopy = data;
                    $scope.areaTree = $scope.areaTreecopy;
                    initFirstNode($scope.areaTreecopy);
                    /*if($scope.activeAreaTreeNode.id==='')
                        $scope.setActiveAreaTreeNode({id:$scope.areaTree[0].id,title: $scope.areaTree[0].title});*/
                },
                function(){

                }
            );
        };


        $rootScope.$on('event:socket-message', function(event, data) {
            console.log('监听到的数据' + data);               
            lemonData = data.split('&');
            $scope.devicedata = lemonData[lemonData.length-2];
            // alert( $scope.devicedata);
//                setConsole(data);
            //模拟websocket设置状态
            $scope.updateListState(false,data);
        });
        window.onresize = function () {
            min_height =  window.innerHeight;
            $("#rightContent-height").css('min-height',function(){
                return min_height - 335;
             });
            $("#tree-root").css('max-height',function(){               
                return window.innerHeight - 280;                
            });                          
        }
        var setTreeHeight = function(){               
                                 
            $timeout(function(){
                max_height = $("#rightContent-height").height();  
                min_height =  window.innerHeight;
                // alert("window.innerHeight"+window.innerHeight);
                $("#rightContent-height").css('min-height',function(){
                    return min_height - 335;
                 });
                 // alert("窗体高度mix_height"+$('#rightContent-height').css('min-height')); 
                $("#tree-root").css('max-height',function(){
                    return max_height + 90;                
                  });              
            },1000);
        };
        
        //处理websocket推送过来的mac,deviRemain
        $scope.enumaKey = function(data){  
            
            var webData = eval(data);
            
            $rootScope.webDataDeal = [];
            
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
                
//              macDeal.mac = JSON.stringify(webD).split(":")[0].split("\"")[1]; //分隔符右侧取内容
//              macDeal.deviMsg = JSON.stringify(webD).split(":")[1]; //分隔符右侧取内容
                
                //如果第4个位置获取不到。则表示，该名字服务无设备信息
                if(angular.isUndefined(macDeal.deviMsg.split(",,")[4])){
                    macDeal.deviRemain = ""; //无设备信息
                } else {
                    macDeal.deviRemain = macDeal.deviMsg.split(",,")[4];//",,"左侧分隔取内容
                }
                if(angular.isUndefined(macDeal.deviMsg.split(",,")[1])){
                    macDeal.deviceType = ""; //无设备信息
                } else {
                    macDeal.deviceType = macDeal.deviMsg.split(",,")[1];//",,"左侧分隔取内容
                }
                
                //如果第5个位置获取不到。则表示，该名字服务无提示信息，则获取第一个位置的状态
                if(angular.isUndefined(macDeal.deviMsg.split(",,")[5])){
                    macDeal.state = macDeal.deviMsg.split(",,")[0].split("\"")[1];
                } else {
                    macDeal.state = macDeal.deviMsg.split(",,")[5].split("\"")[0];//",,"左侧分隔取内容
                }
                
                $rootScope.webDataDeal.push(macDeal);
            });
        }; 
        
        
        //验证在线教室有几个
        var checkDeviceStateNumber = function(dailyListArray){
            var i = 0;
            $.each(dailyListArray, function(index, listD){
                if(listD.state == "1"){
                    i++;
                }
            });
            return i;
        };
        
        //验证清空后在线状态的数据，如果为0则正常
        var checkDeleteAllDeviceStateNumber = function(dailyListArray){
            var j = 0;
            $.each(dailyListArray, function(index, listD){
                if(listD.state == "1"){
                    j++;
                }
            });
            return j;
        };
        
        //websocket推送消息完成状态设置
        $scope.updateListState = function(isRefresh,data){
            
            if(isRefresh){
                data = JSON.stringify(data);
            }
//console.log('测试用在线数据 只有203在线')
//data = "[{'00096F24A0C3':'LivingStart,,0,,auto,,62.01,,1'}]";
            if(angular.isUndefined(data) || data === "[]" || data === "" || data === null || data.length <= 0){
                return;
            } else {
                
                var dataCheckArray = data.split(":");
                var dataCheckFlag = dataCheckArray[0];
                if(dataCheckFlag === "connectId"){
                } else {
                    
//                  $scope.webData = eval('(' + data + ')');
//                  $scope.webData = data;
                    
                    $scope.enumaKey(data);
                    //遍历传递过来的mac状态,与列表数据作比较，如果查找到，则将该记录的state状态值设置为1
                    $timeout(function(){
                        
                        //判断在线状态的有几个
                        var i = checkDeviceStateNumber($scope.dailyList);
                        
                        
                        //清空在线状态的数据
                        //将后台返回数据做处理，有就置状态，无就不管
                        $.each($scope.dailyList, function(index, listD){
							//全在线
                            listD.state = "0";
                        });
                        
                        //验证清空后在线状态的数据，如果为0则正常
                        var j = checkDeleteAllDeviceStateNumber($scope.dailyList);
                        
                        console.log("$rootScope.webDataDeal",$rootScope.webDataDeal,i,j);
                        $.each($rootScope.webDataDeal, function(index, webD){
                            $.each($scope.dailyList, function(index, listD){
                                if(webD.mac === listD.mac){
                                    listD.state = webD.state;
                                    listD.deviRemain = webD.deviRemain;
                                    return false ;
                                }
								$.each(listD.device, function(index, device){
									if(webD.mac==device.mac){
										if(device.typeid=="1"){listD.recordedBroadcaststate = webD.state;}
										if(device.typeid=="2"){listD.centerControllerstate = webD.state;console.log("ahua"+webD.mac)}
										listD.deviRemain = webD.deviRemain;
										listD.mac=webD.mac;									
                                    	return false ;
									}
								})
                            });
                        });
                        console.log("$scope.classroomList",$scope.dailyList);
                        //将列表数据做处理，只要state不是字符串1,全部赋值为0
                        $.each($scope.dailyList, function(index, listD){
                            if(listD.state != "1"){
                                listD.state = "0";
                            }
                        });                       
                    },1000);
                }
            }         
        };
        
        var init = function(){
            
            var evt = document.createEvent("HTMLEvents");

            evt.initEvent("active", false, false);
            evt.id = 'DailyCtrl';
            window.dispatchEvent(evt);

            $scope.init_first = 0;
            //请求地址公共变量
            $scope.activedeviceServiceurl = config.backend.ip + config.backend.base2;

            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_classrooms_daily_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++教室设置  您没有权限+++++++++")
//                window.location.href("login");
                $location.path('classrooms/setup');
            };
            $scope.$parent.active = 2;
            $scope.classroomList = [];
            $scope.classroomlistinfo = false;
            //全选按钮设置为未选中状态（不初始化为false）
            $scope.checkAll = false;


            $scope.areaTree =[];
            //最外面树tree初始化  将id; title赋值给 activeAreaTreeNode.node
            $scope.activeAreaTreeNode = {
//                node:{
                    id: '',
                    title:''
//                }
            };
            //最外面树tree初始化--写在var init = function(){} 里
            mainTrees("dailySet", "");

            console.log('获取日常管理列表');

            $scope.options = {
                "status" : "",
                "state" : ""
            };
            $scope.recordChecked = false;
            $scope.centerChecked = false;
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

            $scope.daily = {
                "name":"",
                "innerid":"",
                "state":"",
                'temp':''
            };
            userTrees("trees",'');
            //日常列表查询进来时传的
//            $scope.searchDaily("","",$scope.pagination,"");
            
            //模拟websocket设置状态
//            $scope.updateListState();
            
            /*var socketTimer = $timeout(function(){
                var datasocket = "[{'00001111AAAA':'LivingStart,,0,,auto,,62.01,,1'},{'00E04C730071':'LivingStart,,276,,auto,,78.39,,1'},{'00E04C680001':'LivingStart,,276,,auto,,71.26,,1'}]";
                $scope.updateListState(false,datasocket);
                $timeout.cancel(socketTimer);
            },5000);*/
            
        };
        setTreeHeight();
            init();
        }]);
});

function exec(uri) {
//    alert(uri);
    $.get(uri, { }, function (data, textStatus) {
//      alert('11');
//            $("#resText").html(data); // 把返回的数据添加到页面上
        }
    );
}
