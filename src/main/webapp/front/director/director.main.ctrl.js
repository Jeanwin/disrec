define(['app',
    'config',
    'directorSeize'
], function (app,config) {
    app.registerController('DirectorMainCtrl', ['$scope','$modal','$location','DirectorService','TreeService' 
            ,'$timeout', '$http',
        function ($scope,$modal,$location,DirectorService,TreeService,$timeout,$http ) {

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
                $scope.setActiveArea(temp[0]);
        }
        
        //toggleArea
        $scope.toggleArea1 = function(){
        	$scope.int_ = 0;
        	$scope.toggleArea=!$scope.toggleArea;
        	if($scope.toggleArea == false){
        		$scope.areaTree = $scope.areaTreecopy;
        	}else{
        		$scope.areaTree = $scope.organTree;
        	}
        	initFirstNode($scope.areaTree);
        	
        }
    	
         //查询教室信息
        $scope.inquire = function() {
           //执行查询接口调用
            if($scope.InquireData.name!=''){
            $scope.pagination.pageIndex=1;
            $scope.searchDirector($scope.InquireData,$scope.treeItems,$scope.pagination,'');
            }
        };

        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
            };
            $scope.searchDirector($scope.InquireData,$scope.treeItems,_pagination,""); //调用查询接口
        };

        //得到树的信息
        var liveTrees = function(){
            TreeService.livetree().then(
                function(data){
                    $scope.areaTree = data;
                    $scope.areaTreecopy = data;
                    $scope.areaTree = $scope.areaTreecopy;
                    
                    console.log('通过后台接口获取树接口');
                    if($scope.activeArea.id==='') {
                    	$scope.activeArea = {
                                        id:$scope.areaTree[0].id,
                                        title: $scope.areaTree[0].title
                                };
                    }
                   $scope.setActiveArea($scope.areaTree[0]);
                        
                   /* $scope.selectOnetree($scope.areaTree);*/
                    
//                    $.each($scope.areaTree,function(index,tree){
//                        $scope.selectOnetree(tree);
//                    })
                },
                function(){
                }
            );
        };

        //判断选择第一个教室的位置--选中树做的查询
        $scope.selectOnetree=function(tree){
            if(tree.nodes.length <= 0 ) {
                $.each(tree.nodes, function (index, tree_1) {
                    $scope.selectOnetree(tree_1);
                })
            }else{
                if($scope.int_===0 && tree.nodes.length >= 1){
                    $scope.activeArea = angular.copy(tree);
                    $scope.int_=1;
                }
            }
        };

        //当在页面中选中树的时候执行的方法
        //接收传值的内容
        $scope.treeItems=[];
        $scope.setActiveArea = function (node) {
            //控制页面中实现反选操作的变量
            $scope.activeArea = angular.copy(node);
            //清楚查询框中的数据
            $scope.clearInquire();
            if($scope.areaTree[0].temp){
            	$scope.InquireData.temp = "hideOrganTree";
            }else{
            	$scope.InquireData.temp = "";
            }
          //如果传值为的attribute为Y的话，不进入循环
            if(node.nodes.length <= 0) {
                $scope.treeItems=node.id+','+node.title+'__';
            }else{
            	$scope.treeItems='';
                $scope.selectOnTree(node);
            }
          $scope.searchDirector($scope.InquireData, $scope.treeItems, $scope.pagination, "");
        };

        $scope.selectOnTree = function(tree){
            if(tree.nodes.length <= 0){
                if(tree.id!=null && tree.id!='' && tree.title!=null && tree.title!=''){
                    $scope.treeItems=$scope.treeItems+tree.id+','+tree.title+'__';
                }
                
            }
            else{
                $.each(tree.nodes, function (index, _node) {
                    $scope.selectOnTree(_node);
                });
            }
        };

        //遍历文件得到班级信息
        $scope.select = function(tree){
//        	$scope.treeItems=tree.id;
            if(tree.nodes.length <= 0){
//                $scope.treeItems.push({'id':tree.id,'name':tree.title});
            }
            else{
                $.each(tree.nodes, function (index, _node) {
                    $scope.select(_node);
                });
            }
        };
         //按年份排序查询列表
        $scope.orderby = function(order){
            if($scope.sort[order] === 'asc'){
                $scope.sort[order] = 'desc';
            }
            else{
                $scope.sort[order] = 'asc';
            }
            $scope.pagination.sort=$scope.sort[order];
            $scope.pagination.order=order;
            $scope.searchDirector($scope.InquireData,$scope.treeItems,$scope.pagination,'');
        };
      //预处理mac参数
        var dealMacList = function(){
        	var _dealMac = [];
//        	$timeout(function(){
        		if($scope.directorList.length>0){
        			$.each($scope.directorList,function(index,director){
            			_dealMac.push(director.mac);
                    });
        		}
        		return _dealMac;
//        	},1000);
        };
        
      //预处理数据结构
        var dealDataFormat = function(data){
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
/*        			dataFormat.mac = JSON.stringify(d).split(":")[0].split("\"")[1]; //分隔符右侧取内容
        			dataFormat.state = JSON.stringify(d).split(":")[1].split("\"")[1];*/ //分隔符右侧取内容
        			$scope.dataFormatList.push(dataFormat);
        		});
        	}
        };
        
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
            	
//            	macDeal.mac = JSON.stringify(webD).split(":")[0].split("\"")[1]; //分隔符右侧取内容
//            	macDeal.deviMsg = JSON.stringify(webD).split(":")[1]; //分隔符右侧取内容
            	
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
        //处理列表状态
        var getListState = function(){
        	//接受mac参数，向后台请求状态信息
            $scope.macListParam = dealMacList();
            $http.get($scope.activedeviceServiceurl + "getRecordStatus?mac=" + $scope.macListParam)
                .success(function(data){
                    if(angular.isDefined(data)) {
                    	
                    	//预处理数据结构
                    	dealDataFormat(data);
                    	
                    	//将返回值遍历，并且设置state状态
                    	if($scope.dataFormatList.length>0){
                    		$.each($scope.dataFormatList, function(index, d){
                    			$.each($scope.directorList, function(index, director){
                    				if(d.mac === director.mac){
                    					director.recordstuts = d.state;
                    				}
                        		});
                    		});
                    	}
                    }
                })
                .error(function(data,status,headers,config){
                	if(status === 500){
                	}
                	throw(status);
                });
            
            $timeout(function(){
            	$http.get($scope.activedeviceServiceurl + "getLiveStatus?mac=" + $scope.macListParam)
                .success(function(data){
                    if(angular.isDefined(data)) {
                    	
                    	//预处理数据结构
                    	dealDataFormat(data);
                    	
                    	//将返回值遍历，并且设置state状态
                    	if($scope.dataFormatList.length>0){
                    		$.each($scope.dataFormatList, function(index, d){
                    			$.each($scope.directorList, function(index, director){
                    				if(d.mac === director.mac){
                    					director.livestuts = d.state;
                    				}
                        		});
                    		});
                    	}
                    }
                })
                .error(function(data,status,headers,config){
                	if(status === 500){
                		//alert($scope.activedeviceServiceurl + "recordingStauts method is error: " + "网络未连接。。");
                	}
                	throw(status);
//                        alert($scope.activedeviceServiceurl + "recordingStauts" + code);
                });
            },200);
            
            $timeout(function(){
            	$http.get($scope.activedeviceServiceurl + "refresh?mac=" + $scope.macListParam)
                .success(function(data){
                    if(angular.isDefined(data)) {
                    	
                    	//预处理数据结构
                    	$scope.enumaKey(data);
                    	
                    	//将返回值遍历，并且设置state状态
                    	if($scope.webDataDeal.length>0){
                    		$.each($scope.webDataDeal, function(index, d){
                    			$.each($scope.directorList, function(index, director){
                    				if(d.mac === director.mac){
                    					director.refreshstuts = d.state;
                    				}
                        		});
                    		});
                    	}
                    }
                })
                .error(function(data,status,headers,config){
                	if(status === 500){
                		//alert($scope.activedeviceServiceurl + "recordingStauts method is error: " + "网络未连接。。");
                	}
                	throw(status);
//                        alert($scope.activedeviceServiceurl + "recordingStauts" + code);
                });
            },200);
            console.log($scope.directorList);
        };

        //查询当前教室的视频信息
        $scope.searchDirector = function (InquireData,copyAcTiveArea,pagination,user){
            console.log('通过后台接口查询直播数据');
            console.log(copyAcTiveArea);
            DirectorService.searchDirector(InquireData,copyAcTiveArea,pagination,user).then(
                function(data){
                    console.log('searchDirector执行成功以后的回调传值');
                    $scope.directorList = data.data;
                    $scope.pagination.totalItems = data.total;
                    
                    //告诉页面数据已经加载完毕
                    $scope.getDataReady = true;
                    
                    //处理列表状态
                    getListState();                    
                },
                function(code) {
                    throw(code);
                }
            );
        };
        //查询的时候传过去的数组和页面中查询text是做绑定的
        //因为以前传值是6个现在是4个注掉的那两个还不确定，
        $scope.clearInquire = function(){
            $scope.InquireData={
                //"name":'',
                "live":'',
                "record":'',
                "livestuts":'',
                "recordstuts":'',
                "temp":""
                	/*,
                "directorstuts":''*/
            };
        };
        
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
                    return min_height - 305;
                 });
                 // alert("窗体高度mix_height"+$('#rightContent-height').css('min-height')); 
                $("#tree-root").css('max-height',function(){
                    return max_height + 90;                
                  });              
            },1000);
        };
        
        $scope.$parent.mainactive = 4;
        var init = function(){
        	
        	//请求地址公共变量
    		$scope.activedeviceServiceurl = config.backend.ip + config.backend.base2;
        	
    		$scope.activeArea = {
                      id: '',
                      title:''
              };
    		
            liveTrees();
            $scope.clearInquire();
            $scope.sort = {
                "dateTime":"asc"
            };
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
                order:"dateTime",
                sort:"asc"
            };

            $scope.int_=0;
            $scope.$parent.active = 0;
            $scope.checkMode = 'play';
            $scope.hideAdvancedSearch = true;
            $scope.directorList = [];
            $scope.areaTree = [];
            userTrees("trees",'');
            setTreeHeight();

//            console.log('获取教室列表');
//            searchDirectorss("",$scope.setTreeid,$scope.pagination,"");
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_director_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++导播台  您没有权限+++++++++")
//                window.location.href("login");
                $location.path('dashboard');
            };
        };

        init();
    }]);
});
