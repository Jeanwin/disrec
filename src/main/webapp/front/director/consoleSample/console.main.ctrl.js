define([
        'app',
        'config',
        '../console/director.current_director.ctrl'
], function (app, config) {
    app.registerController('ConsoleMainCtrl', ['$scope', '$http', '$q','$cookieStore','$interval', 'DirectorMainService',
        'SocketService','DirectorMainService', '$rootScope', '$timeout','$modal','growl','$cacheFactory',
        function ($scope, $http, $q, $cookieStore,$interval, DirectorMainService, SocketService,DirectorMainService, $rootScope, $timeout,$modal,growl,$cacheFactory) {
    	    
        $scope.codeValue = function(){
            DirectorMainService.syscode().then(
                function(data){
                    $scope.schemaList=data;  
                    /*handleInfo.modelValue = data[0].value;    */                      
                },  
                function(){}
            )
        }

        /*$scope.setStartRecordDataCookieinfo= function () {
            $cookieStore.put('recordDataId',$scope.id);   //-----------》设置一个cookie值
         }

        $scope.getStartRecordDataCookieinfo= function () {
            var favoriteCookie = $cookieStore.get('recordDataId');    //--------------》得到这个设置的cookie值
            console.log("getStartRecordDataCookieinfo",favoriteCookie);
            return favoriteCookie;
        }
        $scope.removeStartRecordDataCookieinfo= function () {
            $cookieStore.remove('name');               //----------------------》和之前的操作差不多，在这里是移除这个cookie值
        }*/
        //开始录像弹框
        $scope.openStartRecordModal = function (opera,index) {
            var transferdata;  
             //$scope.handleInfo.areaId=$scope.areaId;
             $scope.handleInfo.innerId=$scope.innerId;
             $scope.handleInfo.areaName=$scope.className;
              
            var modalInstance = $modal.open({
                templateUrl: 'template/modal/openStartRecordModal.html',
                backdrop:'static',
                controller: OpenStartRecordModalCtrl,
                resolve: {
                    transferdata:function(){
                        return transferdata;
                    },
                    opera:function(){
                        return opera;
                    },
                    handleInfo:function(){
                        return $scope.handleInfo;
                    },
                    schemaList:function(){
                        return $scope.schemaList;
                    }
                }
            }).result.then(
                    function(temp){
                        $scope.temp =  temp;
                        $scope.recordStatus=temp.result;
                        if(temp.courseName!=""){
                           $scope.courseName=temp.courseName; 
                        }
                        if(temp.teacherName!=""){
                           $scope.teacherName=temp.teacherName;
                        } 
                        $scope.recordStateSet = temp.recordStateSet; 
                        $scope.id=temp.id;
                        //$scope.setStartRecordDataCookieinfo();                                           
                    }

            );
        };
        var OpenStartRecordModalCtrl = function($scope, $modalInstance,growl,opera,transferdata,handleInfo,schemaList){  
            $scope.schemaList = schemaList;
            $scope.handleInfo = handleInfo;
            //TODO:添加课表控制器里--自动查询教师stare
            //连带检索用户名称--添加课表控制器里
            $scope.searchTeacher = function(aim,name){
                var temp = aim+"";
                var keywords = {                    
                    "name":name                    
                };
                return  DirectorMainService.teacherList(keywords).then(
                    function(data){
                        $scope.searchUserList = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
            };
           /* $scope.selectTeacher = function() {                
                var tmp = $scope.handleInfo.username.split(',');
                $scope.handleInfo.userId = tmp[0];
                $scope.handleInfo.userName = tmp[1];
            };*/
            //全部查询点击行时设置高亮颜色
            $scope.setColorUser = function(typeobject){
                if(angular.isDefined($scope.searchUserList)){
                    $.each($scope.searchUserList, function(index, amy){
                        if(amy === typeobject){
                            amy.getColor = true;
                        } else {
                            amy.getColor = false;
                        }
                    })
                }
            }

            //查询全部的自动提示列表
            $scope.toggleTreeUser = function (flag) {
                if(flag === "ImmediatelyCloseUser"){ //type-select选中后，关闭 自动提示全部列表的代码块
                    $scope.hideTreeUser = false;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTreeUser = !$scope.hideTreeUser;
                    },500);
                }
            };

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量
            $scope.setautoMessageValueUser = function(autoflag, handleInfo, typeValueUser){
                if(autoflag === "username") {
                    handleInfo.userName = typeValueUser.name;
                    handleInfo.userId = typeValueUser.id;
                    $scope.hideTreeUser = !$scope.hideTreeUser;
                }
            }

            //验证自动提示框上编辑之后的数据是否在自动提示列表中查询到
            $scope.checkAutoMessageUser = function(autoflag, handleInfo){
                //遍历自动提示列表，判断输入值是否在列表中存在，不存在的话，清空列表值
                $scope.autoMessageCheck = false;
                if(angular.isDefined($scope.searchUserList)){
                    if(angular.isDefined(handleInfo)){
                        $.each($scope.searchUserList, function(index, aimI){
                            if(autoflag === 'username'){
                                if(handleInfo.userName === aimI.name){
                                    $scope.autoMessageCheck = true;
                                    handleInfo.userId = aimI.id;
                                }
                            }
                        });
                    }
                }
                //不存在的话，清空自动提示框录入值
                if(autoflag === 'username') {
                    if (!$scope.autoMessageCheck) {
                        handleInfo.userName = "";
                    }
                }
            }
            //TODO:添加课表控制器里--自动查询教师end
            $scope.cancel=function(){
                $modalInstance.dismiss('cancel');
            }
            $scope.save = function(){                    
                for(var i=0;i<$scope.schemaList.length;i++){
                    if(handleInfo.modelValue==$scope.schemaList[i].value){
                    handleInfo.modelName=$scope.schemaList[i].name;
                    }
                }  
                if(handleInfo.mac!="") {
                   DirectorMainService.manualVideoAdd(handleInfo).then(
                        function(data){
                            if(data.state == 1){
                                if(data.recordState=="ok"){
                                    var temp ={
                                        'courseName':data.manualVideo.title,
                                        'teacherName':data.manualVideo.userName,
                                        'result':1,
                                        'recordStateSet':true,
                                        'id': data.manualVideo.id                                       
                                    };                                
                                    $modalInstance.close(temp);
                                    growl.addSuccessMessage("开始录像成功");
                                }else if(data.recordState=="no"){
                                     /* var temp2 ={                                        
                                        'result':0,
                                        'recordStateSet':false,                                                                          
                                    };  */                                 
                                    $modalInstance.dismiss();                                    
                                    alert("开始录像失败");
                                }else if(data.recordState=="manualDelete"){                                   
                                    alert("失败，请手动删除该条记录");
                                }                                
                            }else{
                                $modalInstance.dismiss();   
                                alert("保存失败");
                            }                            
                        },  
                        function(){}
                    )   
                }       
                            
            }       

        }         

    	//暂停录像
        $scope.PauseRecord = function(){  
        console.log("$scope.recordStatus:"+$scope.recordStatus);         
             DirectorMainService.consoleHadleRecordStatus('RecordCmd=PauseRecord',$scope.mac).then(
                        function(data){                           
                            if(data.result=="ok"){                           
                                $scope.recordStatus=2;
                                $scope.cache.put($scope.recordStatus,'2'); 
                                $scope.cache.put($scope.recordStatus,'2'); 
                            }else{
                                $scope.recordStatus=1;

                            }
                        },  
                        function(){}
                )            
        }
        
        //停止录像
        $scope.StopRecord=function(){
            $http.get($scope.updateEndTimeUrl+$scope.classId+'&mac='+$scope.mac)
                        .success(function(data){
                            if(data.recordState=="ok"){
                                    if(data.state==1){                                        
                                        $http.get($scope.activedeviceServiceurl + "getRecordStatus?mac=" + $scope.mac)
                                            .success(function(data){
                                                if(angular.isDefined(data)) {
                                                    $scope.recordStatus=0;
                                                    $scope.recordStateSet = false;
                                                    $scope.cache.remove($scope.recordStatus);
                                                    //预处理数据结构
                                                    //dealDataFormat("recordStatusSet", data);

                                                }
                                            })
                                            .error(function(data,status,headers,config){
                                                if(status === 500){
                                                    //alert($scope.activedeviceServiceurl + "recordingStauts method is error: " + "网络未连接。。");
                                                }
                                                throw(status);
                            //                        alert($scope.activedeviceServiceurl + "recordingStauts" + code);
                                            });                  
                                        growl.addSuccessMessage("停止录像并且修改时间成功");
                                    }else{
                                        alert("修改时间失败");
                                    }
                                }else{
                                    //growl.addErrorMessage("停止录像失败");
                                    alert("error！停止录像失败");
                                }
                            })
         }            

        //恢复录像
        $scope.ResumeRecord=function(){
            DirectorMainService.consoleHadleRecordStatus('RecordCmd=ResumeRecord',$scope.mac).then(
                        function(data){
                            if(data.result=="ok"){
                                $scope.recordStatus=1;
                                /*$scope.cache.put($scope.recordStatus,'1');*/
                                growl.addSuccessMessage("恢复录像成功");
                            }else{
                                //growl.addErrorMessage("恢复录像失败");
                                alert("恢复录像失败");
                            }
                        },  
                        function(){
                            alert("error");
                        }
                )
        }
    	//鼠标跟踪
    	$scope.mouseFollow = function(width,high,x,y){
    		// console.log("鼠标跟踪",vw,vh,x,y);
//            var coordinate = {
//                x:x,
//                y:y
//            }
//            console.log(coordinate);
            if($scope.isShow == true){               
            
                $http.get($scope.activedeviceServiceurl + "mouseTrace?mac=" + $scope.mac + "&cardInfo=" + $scope.livingCardPara + "&width=" + width + "&high=" + high + "&x=" + x + "&y=" + y)
                    .success(function(data){
                        
                    })
                    .error(function(data,status,headers,config){
                        if(status === 500){
                            //alert($scope.activedeviceServiceurl + "recordingStauts method is error: " + "网络未连接。。");
                        }
                        throw(status);
    //                        alert($scope.activedeviceServiceurl + "recordingStauts" + code);
                });
            }
    	} 
    	
    	
    	
    	//刷新获取正确的视频状态
        $scope.freshState = function(){
            console.log("刷新导播状态");
            //接受mac参数，向后台请求状态信息
            $http.get($scope.activedeviceServiceurl + "consoleFlush?mac=" + $scope.mac)
                .success(function(data){
                    if(data.length>0) { 
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
        
    	//返回首页
		$scope.backMain = function(){
			window.open('../../index.html#/director', "_self");
		};
    	
        //倒计时修改时间保存接口(待后台提供)
        $scope.updateLastTime = function(classbatch, endtime){
//        	DirectorMainService.updateLastTime(classbatch,$scope.ymdendTime + " " + endtime,$scope.mac).then(
        	DirectorMainService.updateLastTime(classbatch,endtime,$scope.mac).then(
                    function(data){
                        if(angular.isDefined(data)) {
                        	if(data.result === "ok"){
                        		//更新成功
                        		//1.向后台设备发送请求(待后台提供)
                        		//2.重新查询结束时间
                        		refreshDirectorHeaderData($scope.classId);
                        		//重新刷新录像状态
//                            	getListState();
                        	}
                        }
                    },
                    function(code){
                        throw(code);
                    }
                );
        	
//            var url = $scope.activedeviceServiceurl + 'setDeviceTime?classbatch=' + classbatch + '&endtime=' + $scope.ymdendTime + " " + endtime + "&mac=" + $scope.mac;
//            exec(url);
        };

    	//得到导播台表头数据
        var getDirectorHeaderData = function(classId){
            DirectorMainService.getDirectorHeaderData(classId).then(
                function(data){
                    if(angular.isDefined(data) && data != "") {
                        $scope.areaId=data.areaid;
                        $scope.innerId=data.classid;
                        $scope.className = data.areaname;
                        $scope.courseName = data.subject;
                        $scope.teacherName = data.username;
                        //$scope.endTime = data.endtime;
//                        data.endtime = "2019-12-26 23:59:00";
                        $scope.endTime = data.endtime.split(" ")[1];
                        $scope.ymdendTime = data.endtime.split(" ")[0];
//                        data.endtime.split(" ")[1];
//                        $scope.startTime = "2015-01-15 13:50:00";
                        $scope.startTime = data.starttime;
                    }
                },
                function(code){
                    throw(code);
                }
            );
        };

      //刷新获取导播台表头数据
        var refreshDirectorHeaderData = function(classId){
            DirectorMainService.refreshDirectorHeaderData(classId).then(
                function(data){
                    if(angular.isDefined(data) && data != "") {
                    	if(angular.isUndefined(data.subject) || data.subject === "" || data.subject === null){
                    		console.log("没有查到最新课程信息");
                    		return ;
                    	}
                        $scope.className = data.areaname;
                        $scope.courseName = data.subject;
                        $scope.teacherName = data.username;
                        //$scope.endTime = data.endtime;
//                        data.endtime = "2019-12-26 23:59:00";
                        $scope.endTime = data.endtime.split(" ")[1];
                        $scope.ymdendTime = data.endtime.split(" ")[0];
//                        data.endtime.split(" ")[1];
//                        $scope.startTime = "2015-01-15 13:50:00";
                        $scope.startTime = data.starttime;
                    }
                },
                function(code){
                    throw(code);
                }
            );
        };
        
        //预处理数据结构
        var dealDataFormat = function(stateFlag, data){
//        	data = [{"00E04C730075":"1"},{"00E04C730071":"1"}];           
        	$http.get($scope.recordingStatus + $scope.mac)
                    .success(function(data){
                        if(data=="RecordPaused") { 
                            $scope.recordStateSet = true;
                            $scope.recordStatus=2;
                        }/*else if(data=="Recording"){
                            $scope.recordStatus=1;
                        }*/
                    })
                    .error(function(){

                    });
        	//将data结构重组，然后赋值给dataFormatList
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
        			if(stateFlag === "recordStatusSet"){
        				if(dataFormat.state === "1"){
            				$scope.recordStateSet = true;
                            $http.get($scope.recordingStatus + $scope.mac)
                                .success(function(data){
                                    if(data=="RecordPaused") { 
                                        $scope.recordStatus=2;
                                    }else if(data=="Recording"){
                                        $scope.recordStatus=1;
                                    }
                                })
                                .error(function(){

                                });
                            
            			} else {
            				$scope.recordStateSet = false;
                            $scope.recordStatus=0;
            			}                        
                	} else {
                		if(dataFormat.state === "1"){
            				$scope.liveStatusSet = true;
                            $scope.recordStatus=1;
            			} else {
            				$scope.liveStatusSet = false;
                            $scope.recordStatus=0;
            			}
                	}
        		});
        	}
        };
        /*var dealRecordStatus=function(){
            if(data==RecordStopped){
                            $scope.recordStateSet = 0;
                            $scope.recordStatus=0;
                        }else if(data==Recording){
                            $scope.recordStateSet = 1;
                            $scope.recordStatus=1;
                        }else{
                            $scope.recordStateSet = 2;
                            $scope.recordStatus=2;
           }
        }*/
        //处理列表状态
        var getListState = function(){
        	//接受mac参数，向后台请求状态信息
            /*$http.get($scope.activedeviceServiceurl + "recordingStauts?mac=" + $scope.mac)*/
           $http.get($scope.activedeviceServiceurl + "getRecordStatus?mac=" + $scope.mac)
                .success(function(data){
                    /*if(angular.isDefined(data)&&data!="RecordStopped") {*/
                    if(angular.isDefined(data)){    
                        //预处理数据结构
                        dealDataFormat("recordStatusSet", data);
                    }
                })
                .error(function(data,status,headers,config){
                    if(status === 500){
                        //alert($scope.activedeviceServiceurl + "recordingStauts method is error: " + "网络未连接。。");
                    }
                    throw(status);
//                        alert($scope.activedeviceServiceurl + "recordingStauts" + code);
                });
            
            $timeout(function(){
            	$http.get($scope.activedeviceServiceurl + "getLiveStatus?mac=" + $scope.mac)
                .success(function(data){
                    if(angular.isDefined(data)) {
                    	
                    	//预处理数据结构
                    	dealDataFormat("liveStatusSet", data);
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
        };
    	
        //得到结束时间
        $scope.countLastTime = function(minus,secons){


            var currentHours   = new Date().getHours();
            var currentMinutes = new Date().getMinutes();
            var currentSeconds = new Date().getSeconds();

            var endHours = $scope.remainHours*1 + currentHours*1;
            var endMinus = minus*1 + currentMinutes*1;
            var endSecos = secons*1 + currentSeconds*1;

            if(endHours < 0 ){
                $scope.lastTimeFlag = true;

            } else {
                //如果分钟为负数，则加一小时。
                if(endMinus > 60) {
                    endMinus = endMinus*1 - 60;
                    endHours = endHours*1 + 1;
                }
                //如果秒数为负数，则加一分钟。
                if(endSecos > 60) {
                    endSecos = endSecos*1 - 60;
                    endMinus = endMinus*1 + 1;
                }

                $scope.endTime = endHours + ":" + endMinus
                    + ":" + endSecos;
            }
        };
    	
    	//预处理倒计时编辑
    	$scope.dealLastTime = function(operationFlag){
    		if(operationFlag === "add"){
    			if($scope.lastTimeObject.LastTimeModel*1 < 9){
        			lastTimeModel = $scope.lastTimeObject.LastTimeModel*1 + 1;
        			lastTimeModel = "0" + lastTimeModel;
        		} else {
                    //分钟最大59
                    if($scope.lastTimeObject.LastTimeModel*1 < 59){
                        lastTimeModel = $scope.lastTimeObject.LastTimeModel*1 + 1;
                    }
        		}
    		} else {
    			if($scope.lastTimeObject.LastTimeModel*1 < 9){
    				if($scope.lastTimeObject.LastTimeModel*1 < 1){
    					lastTimeModel = "00";
    				} else {
    					lastTimeModel = $scope.lastTimeObject.LastTimeModel*1 - 1;
            			lastTimeModel = "0" + lastTimeModel;
    				}
        		} else {
        			lastTimeModel = $scope.lastTimeObject.LastTimeModel*1 - 1;
                    //当分钟减少到一位数时，增加一个0
                    if(lastTimeModel < 10){
                        lastTimeModel = "0" + lastTimeModel;
                    }
        		}
    		}
    		
    		//增加不能超过60分钟
    		if(lastTimeModel*1 > 60){
    			lastTimeModel = 60;
    		}
    		
    		return lastTimeModel;
    	}

        //得到websocket推送消息后，打開是否同意抢占的弹出框
        //进入导播间的命令
        $scope.openIsAgreenWindow = function (reqUserName) {
        	//打开弹框之后，将页面隐藏
        	$scope.directorFighting = true;

            $modal.open({
                templateUrl: '../console/director.current_director.tpl.html',
                controller: 'CurrentConsoleDirectorCtrl',
                backdrop:'static',
                windowClass: 'modal-big',
                width: '1000px',
                resolve: {
                    currentDirectorPeople: function () {
                        return reqUserName;
                    },
                    mac: function(){
                        return $scope.mac;
                    },
                    classid: function(){
                        return $scope.classId;
                    }
                }
            })
            .result.then(function(isPromise){
                if(isPromise === "0"){
                	//不同意的话，将隐藏的页面显示
                	$scope.directorFighting = false;
                }
            });
//            window.open('director/console/index.html?size='+size);
        };
        
        //得到视频源地址
        var initVideoPreview = function(){
/*//原rtmp代码
            DirectorMainService.initrtspPreview($scope.mac).then(
                function(data){
                	if(angular.isDefined(data) && data != "") {
                        $scope.videoPreviewObject = data;
                        $scope.urlParam1 = $scope.videoPreviewObject[0].card0;
                        $scope.urlParam2 = $scope.videoPreviewObject[0].card1;
                        
                        $scope.urlParam3 = $scope.videoPreviewObject[0].card2;
                        $scope.urlParam4 = $scope.videoPreviewObject[0].card4;
                        //如果获取不到，则置为空串
                        if(angular.isUndefined($scope.urlParam1)){
                        	$scope.urlParam1 = "";
                        }
                        if(angular.isUndefined($scope.urlParam2)){
                        	$scope.urlParam2 = "";
                        }
                        if(angular.isUndefined($scope.urlParam3)){
                        	$scope.urlParam3 = "";
                        }
                        if(angular.isUndefined($scope.urlParam4)){
                        	$scope.urlParam4 = "";
                        }
                    }
                },
                function(code){
                    throw(code);
                }
            );*/
			var deviceType = $scope.centerControllerstate=='1'?'centralcontroller':($scope.recordedBroadcaststate=='1'?'recording':'null')
			if(!deviceType){return;}
			DirectorMainService.initNewRtspPreview($scope.mac,deviceType).then(
                function(data){
                	initVideoState(data);
                },
                function(code){
                    throw(code);
                }
            );
			//initNewRtspPreview
        };
		
		var initVideoState = function(urls){
			var deviceType = $scope.centerControllerstate=='1'?'centralcontroller':($scope.recordedBroadcaststate=='1'?'recording':'null')
			if(!deviceType){return;}
			if(urls.info){
				console.log(urls.info)
				urls.info = /[A-Za-z0-9&=.:_\/]+/g.exec(urls.info)[0]
				console.log(urls.info)
				var info = urls.info.split('&');
				urls={'teacher':info[0],'vga':info[1],'students':info[2]}
			}
			 DirectorMainService.initNewRtspState($scope.mac,deviceType).then(
                function(data){
					console.log('statedata:',data,data.RecordMode)
                	switch(data.RecordMode){
						case 'Resource':
						case 'recordMode=Resource':
						case 'All':
						case 'recordMode=All':
						case 'recordMode=all':
						case 'Film':
						case 'recordMode=Film':
							$scope.urlParam1 = urls['teacher'];
	                    	$scope.urlParam3 = urls['students'];
    	                	$scope.urlParam4 = urls['vga'];
						break;
					}
                },
                function(code){
                    throw(code);
                }
            );
		}

        //$scope.activePicInPicMode = "";
        //录像的方法
        $scope.videotape = function (id) {
            alert(id);
            if (id === 'StopRecord') {
                $scope.videotapeId = 'PauseRecord';
                $scope.recording(id);
            } else {
                $scope.videotapeId = id;
                $scope.recording(id);
            }
        };

        //接口recording,传值para=[StartRecord开始,StopRecord停止,PauseRecord暂停,ResumeRecord恢复]

        $scope.recording = function (para) {
            var url_ = $scope.activedeviceServiceurl + "recording?para=" + para;
            exec(url_);
        };


        //主画
        $scope.setMain = function (index) {
            if ($scope.mainVideo !== index && $scope.deputyVideo != index) {
                $scope.mainVideo = index;
//                alert('主窗口的切换');
                $scope.changeWindows($scope.activeEffect, index);
            }
        };

        //调用后台服务,实现主窗口的特效切换
        $scope.changeWindows = function (activeEffect, index) {
            var url = $scope.activedeviceServiceurl + "changeWindows?type=" + activeEffect + "&port=" + index+ "&mac=" + $scope.mac;
            exec(url);
        };


//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^设置记忆功能和定位
        $scope.operConsole = function (para) {
            //如果para为0 并且和上次的传值不一样则赋值为0
            if (para == '-1') {
                $scope.perset(para, $scope.activeMem);
                return;
            }
            if ($scope.activeMem === '0') {
                if (para == 0) {
                    $scope.activeMem = '';
                } else {
                    $scope.perset(para, $scope.activeMem);
                    $scope.activeMem = '';
                }
            } else {
                if (para == 0) {
                    $scope.activeMem = para;
                } else {
                    $scope.perset(para, $scope.activeMem);
                }
            }
        };

        //执行记忆和回调记忆的时候执行的后台服务
        $scope.perset = function (para, activeMem) {
        	//默认控制第一个
        	if(angular.isUndefined($scope.livingCardPara)){
        		$scope.livingCardPara = "card0";
        	}
        	
            var url = $scope.activedeviceServiceurl + "perset?para=" + para + "&mem=" + activeMem + "&mac=" + $scope.mac
            	+ "&cardInfo=" + $scope.livingCardPara;
            exec(url);
        };

        //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^执行副画面时候做的操作
        //副画面控制
        $scope.setMainOrSub = function (port) {
            if (port !== $scope.mainVideo && $scope.deputyVideo !== port) {
//                alert("副画面选中的操作");
                $scope.deputyVideo = port;
                if ($scope.PIP !== '') {
                    $scope.picInPic();
                }
            } else {
                if ($scope.deputyVideo === port) {
//                    alert("副画面执行反选时候的操作");
                    $scope.deputyVideo = '';
                    if ($scope.PIP !== '') {
                        $scope.ChangAndClose("close");
                    }
                    $scope.PIP = '';
//                        alert('画中画取消的操作');

                }
            }
        };


        $scope.clearPosAndSize = function () {
            $scope.pos = '';
            $scope.size = '';
        };

        $scope.getPosAndSize = function (currPos, locaSize) {
            switch (currPos) {
                case 'RU':
                {
//                    alert('RU');
                    switch (locaSize) {
                        case '1':
                        {
//                            return '&pos=0.8,0&size=0.2,0.2';
                            $scope.pos = '0.8,0';
                            $scope.size = '0.2,0.2';
                            break;
                        }
                        case '2':
                        {
//                            return '&pos=0.7,0&size=0.3,0.3';
                            $scope.pos = '0.7,0';
                            $scope.size = '0.3,0.3';
                            break;
                        }
                        case '3':
                        {
//                            return '&pos=0.6,0&size=0.4,0.4';
                            $scope.pos = '0.6,0';
                            $scope.size = '0.4,0.4';
                            break;
                        }
                        default:
                        {
//                            return '&pos=0.5,0&size=0.5,0.5';
                            $scope.pos = '0.5,0';
                            $scope.size = '0.5,0.5';
                            break;
                        }
                    }
                }
                    break;
                case 'LD':
                {
//                    alert('LD');
                    switch (locaSize) {
                        case '1':
                        {
//                            return '&pos=0,0.8&size=0.2,0.2';
                            $scope.pos = '0,0.8';
                            $scope.size = '0.2,0.2';
                            break;
                        }
                        case '2':
                        {
//                            return '&pos=0,0.7&size=0.3,0.3';
                            $scope.pos = '0,0.7';
                            $scope.size = '0.3,0.3';
                            break;
                        }
                        case '3':
                        {
//                            return '&pos=0,0.6&size=0.4,0.4';
                            $scope.pos = '0,0.6';
                            $scope.size = '0.4,0.4';
                            break;
                        }
                        default:
                        {
//                            return '&pos=0,0.5&size=0.5,0.5';
                            $scope.pos = '0,0.5';
                            $scope.size = '0.5,0.5';
                            break;
                        }
                    }
                }
                    break;
                case 'RD':
                {
//                    alert('RD');
                    switch (locaSize) {
                        case '1':
                        {
//                            return '&pos=0.8,0.8&size=0.2,0.2';
                            $scope.pos = '0.8,0.8';
                            $scope.size = '0.2,0.2';
                            break;
                        }
                        case '2':
                        {
//                            return '&pos=0.7,0.7&size=0.3,0.3';
                            $scope.pos = '0.7,0.7';
                            $scope.size = '0.3,0.3';
                            break;
                        }
                        case '3':
                        {
//                            return '&pos=0.6,0.6&size=0.4,0.4';
                            $scope.pos = '0.6,0.6';
                            $scope.size = '0.4,0.4';
                            break;
                        }
                        default:
                        {
//                            return '&pos=0.5,0.5&size=0.5,0.5';
                            $scope.pos = '0.5,0.5';
                            $scope.size = '0.5,0.5';
                            break;
                        }
                    }
                }
                    break;
                default:
                {
//                    alert('LU');
                    switch (locaSize) {
                        case '1':
                        {
//                            return '&pos=0,0&size=0.2,0.2';
                            $scope.pos = '0,0';
                            $scope.size = '0.2,0.2';
                            break;
                        }
                        case '2':
                        {
//                            return '&pos=0,0&size=0.3,0.3';
                            $scope.pos = '0,0';
                            $scope.size = '0.3,0.3';
                            break;
                        }
                        case '3':
                        {
//                            return '&pos=0,0&size=0.4,0.4';
                            $scope.pos = '0,0';
                            $scope.size = '0.4,0.4';
                            break;
                        }
                        default:
                        {
//                            return '&pos=0,0&size=0.5,0.5';
                            $scope.pos = '0,0';
                            $scope.size = '0.5,0.5';
                            break;
                        }
                    }
                }
            }
        };

        //记录直播状态方法
        $scope.livingStatus = function(){
            DirectorMainService.livingStatus($scope.mac).then(
                function(data){
                    if(angular.isDefined(data)) {
                        $scope.livingStatusParam = data;
                    }
                },
                function(errorMsg){
                	if(errorMsg[1] === 500){
                		//alert($scope.activedeviceServiceurl + "livingStatus method is error: " + "网络未连接。。");
                	}
//                	throw(status);
//                        throw(code);
                }
            );
        };

        //接口recording,传值para=[StartRecord开始,StopRecord停止,PauseRecord暂停,ResumeRecord恢复]

        $scope.recordingliveMode = function (mac, para) {
        	var url_ = $scope.activedeviceServiceurl + "living?mac=" + mac + "&para=" + para + "&endTime=" + $scope.ymdendTime + " " +$scope.endTime;
            exec(url_);
        };

        //直播
        $scope.setLiveMode = function (mode) {
            //记录直播状态方法
            $scope.livingStatus();

            $timeout(function(){

                //预处理一下直播状态
                if($scope.livingStatusParam === "LivingStart"){
                    id = "stop";
                } else {
                    id = "start";
                }

                //如果是start, start图标灰化，stop图标正常点击，否则，反之
                if(id === "start"){
                    $scope.livingStartOperationDisable = "LivingStart";
                    $scope.livingStopOperationDisable = "able";
                } else {
                    $scope.livingStartOperationDisable = "able";
                    $scope.livingStopOperationDisable = "LivingStop";
                }

//                alert(id);
//                if (id === 'stop') {
//                    $scope.liveMode = 'stop';
//                    $scope.recordingliveMode($scope.mac, id);
//                } else {
//                    $scope.liveMode = id;
                $scope.recordingliveMode($scope.mac, id);
//                }
            },1000);
        };

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^导播台 云台操作
        $scope.setVideo2 = function (id) {
//            alert(id);
            $scope.activeVideo2 = id;
            if (id !== '') {
                var consoleOperationInfo = id;
                $.get($scope.activedeviceServiceurl + "consoleOperationInfo", {
                    consoleOperationInfo: consoleOperationInfo
                }, function (data, textStatus) {
                    $("#resText").html(data); // 把返回的数据添加到页面上
                });
            }
        };
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^特效的设置生效方法
        var execute = function (type, port) {
            if (0 > type || type > 11)type = '11';
            if (3000 > port || port > 3005)port = '3000';
            exec($scope.activedeviceServiceurl + "changeWindows?type=" + type + "&port=" + port + "&mac=" + $scope.mac);
        };


//……………………………………………………………………………………………………………………………………………………获得当前时间的变化

        var dataDeal;
        //获取服务器时间
        $scope.getServerTime = function(){
        	
            if(angular.isDefined(dataDeal)){
            	
            	//如果$scope.infoSet为true，证明是非谷歌浏览器
            	if($scope.infoSet){
            		var yearServer = parseInt(dataDeal.split(" ")[0].split("-")[0]);
                	var monthServer = parseInt(dataDeal.split(" ")[0].split("-")[1])-1;
                	var dayServer = parseInt(dataDeal.split(" ")[0].split("-")[2]);
                	
                	var hourServer = parseInt(dataDeal.split(" ")[1].split(":")[0])-8;
                	var minuteServer = parseInt(dataDeal.split(" ")[1].split(":")[1]);
                	var secondServer = parseInt(dataDeal.split(" ")[1].split(":")[2]);
                	console.log("后台传入值为 : " + dataDeal);
                	dataDeal = (new Date(Date.UTC(yearServer,monthServer,dayServer,hourServer,minuteServer,secondServer))).getTime(); //得到毫秒数
                	dataDeal = dataDeal + 1000; //设置新时间比旧时间多一秒钟
                	console.log("得到毫秒值为 : " + dataDeal);
                	
                	//用来计算倒计时的系统时间（时分秒）
                	dataDealResult = new Date(dataDeal).Format("yyyy/MM/dd hh:mm:ss");
                    $scope.clock = dataDealResult.split(" ")[1];
                    
                    //更新显示系统时间变量，与开始时间作比较
                    var sysClockDeal = new Date(dataDeal).Format("yyyy-MM-dd hh:mm:ss");
                    $scope.sysClock = sysClockDeal;
                    
                    //还原毫秒时间为年月日 时分秒格式，用于下次计算
                    dataDeal = sysClockDeal;
                	console.log("还原毫秒时间为年月日 时分秒格式 为： " + dataDeal);
            	} else {
            		dataDeal = (new Date(dataDeal)).getTime(); //得到毫秒数
                	dataDeal = dataDeal + 1000; //设置新时间比旧时间多一秒钟
                	
                	//用来计算倒计时的系统时间（时分秒）
                	dataDealResult = new Date(dataDeal).Format("yyyy/MM/dd hh:mm:ss");
                    $scope.clock = dataDealResult.split(" ")[1];
                    
                    //更新显示系统时间变量，与开始时间作比较
                    var sysClockDeal = new Date(dataDeal).Format("yyyy-MM-dd hh:mm:ss");
                    $scope.sysClock = sysClockDeal;
            	}
            	
            	
            } else {
            	DirectorMainService.getServerTime().then(
                        function(data){
                            if(angular.isDefined(data)) {
                            	dataDeal = data;
                            	$scope.sysClock = data;
                                $scope.clock = data.split(" ")[1];
                            }
                        },
                        function(code){
                            throw(code);
                        }
                    );
            }
        };

//        var updateTime = function () {
//            $scope.clock = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
//        };
//……………………………………………………………………………………………………………………………………………………得到后台摄像头数据
        
      //开始时间与系统时间做判断得到是否有后续课程
        $scope.getLaterCourse = function(startTime,sysTime){
        	
        	//如果$scope.infoSet值为true的话，则证明是非谷歌浏览器，需对new Data做处理
        	if($scope.infoSet){
        		
        		var stYearServer = parseInt(startTime.split(" ")[0].split("-")[0]);
            	var stMonthServer = parseInt(startTime.split(" ")[0].split("-")[1])-1;
            	var stDayServer = parseInt(startTime.split(" ")[0].split("-")[2]);
            	
            	var stHourServer = parseInt(startTime.split(" ")[1].split(":")[0])-8;
            	var stMinuteServer = parseInt(startTime.split(" ")[1].split(":")[1]);
            	var stSecondServer = parseInt(startTime.split(" ")[1].split(":")[2]);
        		
        		//得到开始时间
            	var startTime = (new Date(Date.UTC(stYearServer,stMonthServer,stDayServer,stHourServer,stMinuteServer,stSecondServer))).getTime(); //得到毫秒数
            	
            	console.log("非谷歌下的startTime " + startTime);
            	
            	var syYearServer = parseInt(sysTime.split(" ")[0].split("-")[0]);
            	var syMonthServer = parseInt(sysTime.split(" ")[0].split("-")[1])-1;
            	var syDayServer = parseInt(sysTime.split(" ")[0].split("-")[2]);
            	
            	var syHourServer = parseInt(sysTime.split(" ")[1].split(":")[0])-8;
            	var syMinuteServer = parseInt(sysTime.split(" ")[1].split(":")[1]);
            	var sySecondServer = parseInt(sysTime.split(" ")[1].split(":")[2]);
            	
            	//得到系统时间
            	var sysTime = (new Date(Date.UTC(syYearServer,syMonthServer,syDayServer,syHourServer,syMinuteServer,sySecondServer))).getTime(); //得到毫秒数
        		
            	console.log("非谷歌下的sysTime " + sysTime);
            	
        	} else {
        		//得到开始时间
            	var startTime = (new Date(startTime)).getTime(); //得到毫秒数
            	
            	//得到系统时间
            	var sysTime = (new Date(sysTime)).getTime(); //得到毫秒数
        	}
        	
        	if((startTime - sysTime) > 0){
        		console.log("有后续 课程");
        		$scope.laterCourseFlag = true;
        		startTime = new Date(startTime).Format("yyyy-MM-dd hh:mm:ss");
        		$scope.courseStartTime = "" + startTime;
        	} else {
        		$scope.laterCourseFlag = false;
        		
        		//重新获取录像状态
        		//getListState();
        	}
        	
//            $scope.ymdstartTime = startTime.split(" ")[0];
//            $scope.ymdstartTimeYear = $scope.ymdstartTime.split("-")[0];
//            $scope.ymdstartTimeMonth = $scope.ymdstartTime.split("-")[1];
//            $scope.ymdstartTimeDay = $scope.ymdstartTime.split("-")[2];
//            
//            if(angular.isDefined($scope.sysClock)){
//                var ymdsystemTime   = $scope.sysClock.split(" ")[0];
//                $scope.ymdsystemTimeYear = ymdsystemTime.split("-")[0];
//                $scope.ymdsystemTimeMonth = ymdsystemTime.split("-")[1];
//                $scope.ymdsystemTimeDay = ymdsystemTime.split("-")[2];
//            }
            //判断如果开始时间 > 系统时间的话，显示 开始时间日期
//            if($scope.ymdstartTimeYear*1 > $scope.ymdsystemTimeYear*1 ||
//            		$scope.ymdstartTimeMonth*1 > $scope.ymdsystemTimeMonth*1 ||
//            			$scope.ymdstartTimeDay*1 > $scope.ymdsystemTimeDay*1){
//            	console.log("有后续 课程");
//            	$scope.laterCourseFlag = true;
//            	$scope.courseStartTime = "" + startTime;
//            } else {
//            	$scope.laterCourseFlag = false;
//            }
        };

        


        //得到倒计时时间
        $scope.getLastTime = function() {
        	
        	//开始时间与系统时间做判断得到是否有后续课程
            $scope.getLaterCourse($scope.startTime, $scope.sysClock);

            var sysTime = $scope.clock;

            if(angular.isDefined(sysTime)){
                var currentHours   = sysTime.split(":")[0];
                var currentMinutes = sysTime.split(":")[1];
                var currentSeconds = sysTime.split(":")[2];

                var endTime;
                if(angular.isUndefined($scope.endTime)){
                	endTime = "23:59:00";
                } else {
                	endTime = $scope.endTime;
                }
                var getHours = endTime.split(":")[0];
                var getMinus = endTime.split(":")[1];
                var getSecos = endTime.split(":")[2];

                $scope.remainHours = getHours - currentHours;
                $scope.remainMinus = getMinus - currentMinutes;
                $scope.remainSecos = getSecos - currentSeconds;

                if($scope.remainHours < 0 ){
                    $scope.lastTimeFlag = true;
                    $scope.remainHours = "00";
                    $scope.remainMinus = "0";
                    $scope.remainSecos = "00";
                    $scope.remainTime = "00:00:00";
                } else {
                    //如果分钟为负数，则加一小时。
                    if($scope.remainMinus < 0) {
                    	if($scope.remainHours > 0){
                    		$scope.remainMinus = 60 + $scope.remainMinus;
                        	$scope.remainHours = $scope.remainHours - 1;
                    	} else {
                    		$scope.remainHours = 0;
                    		$scope.remainMinus = 0;
                    	}
                    }
                    //如果秒数为负数，则加一分钟。
                    if($scope.remainSecos < 0) {
                    	if($scope.remainMinus > 0){
	                        $scope.remainSecos = 60 + $scope.remainSecos;
	                        $scope.remainMinus = $scope.remainMinus - 1;
                    	} else {
                    		if($scope.remainHours > 0){
                            	$scope.remainSecos = 60 + $scope.remainSecos;
                            	$scope.remainMinus = $scope.remainMinus + 60 - 1;
                            	$scope.remainHours = $scope.remainHours - 1;
                        	} else {
	                    		$scope.remainMinus = 0;
	                    		$scope.remainSecos = 0;
                        	}
                    	}
                    }

                    //显示样式处理，时分秒都显示两位
                    var remainHoursDisp,remainMinusDisp,remainSecosDisp;
                    if($scope.remainHours < 10){
                    	remainHoursDisp = "0" + $scope.remainHours;
                    } else {
                    	remainHoursDisp = $scope.remainHours;
                    }
                    
                    if($scope.remainMinus < 10){
                    	remainMinusDisp = "0" + $scope.remainMinus;
                    } else {
                    	remainMinusDisp = $scope.remainMinus;
                    }
                    if($scope.remainSecos < 10){
                    	remainSecosDisp = "0" + $scope.remainSecos;
                    } else {
                    	remainSecosDisp = $scope.remainSecos;
                    }
                    $scope.remainTime = remainHoursDisp + ":" + remainMinusDisp
                        + ":" + remainSecosDisp;
                    
                }
                //如果倒计时为0的话，在做一次表头数据的查询
                if($scope.remainTime === "0:0:0" || $scope.remainTime === "00:00:00"){
                	//重新查询结束时间
                	refreshDirectorHeaderData($scope.classId);
                	
                	//重新刷新录像状态
                	//getListState();
                }
            }
        };
        //……………………………………………………………………………………………………………………………………………………得到底部标题
        var getopen = function () {
            DirectorMainService.searchDirectorMain($scope.mac).then(
                function (data) {
//                    $scope.VideosInformations = data;
                	
                	data =  {
                            "a0": "教师",
                            "a1": "学生",
                            "a2": "教师全景",
                            "a3": "VGA"
                	}
                    $scope.VideosInformations[0].title = data.a0;
                    $scope.VideosInformations[1].title = data.a1;
                    $scope.VideosInformations[2].title = data.a2;
                    $scope.VideosInformations[3].title = data.a3;
                },
                function(errorMsg){
                	if(errorMsg[1] === 500){
                		//alert("searchDirectorMain 网络未连接！");
                	}
                }
            );
        };

        function setConsole(data) {
            if (data === 'server open...') return;
            $scope.String_ = data.split(',,');
        }

        //预处理数据绑定
        $scope.dealDataBing = function(connnectId, mac, reqUserName){
            var url = $scope.activedeviceServiceurl + 'bind?connectId=' + connnectId + '&mac=' + mac + "&reqUserName=" + reqUserName;
            exec(url);
        };
        
        //得到websocket推送消息，打开导播台权限认证页面
        $scope.openDirectorCheck = function(reqUserName) {
            $scope.openIsAgreenWindow(reqUserName);
        };

        //导播台抢占初始化
        $scope.initDirectorSeize = function(data){
            if(angular.isDefined(data)){
                var dataCheckArray = data.split(":");
                var dataCheckFlag = dataCheckArray[0];
                if(dataCheckFlag === "connectId"){  //获取推送的connectId,然后与mac,reqUserName一块传入后台，后台做绑定 1）
                    $scope.dealDataBing(dataCheckArray[1], $scope.mac, $scope.reqUserName);
                } else if(dataCheckFlag === "reqUserName"){ //获取当前申请者 2）
                    $scope.openDirectorCheck(dataCheckArray[1]);
                } else if(dataCheckFlag === "closeWindow") { //获取关闭窗口的标示 3）
                    window.opener=null;
                    window.open('','_self');
                    window.close();
                } else {
                    //获取视频源地址
                    setConsole(data);
                }
            }
        };
        
      //预处理mac,reqUserName参数值
        $scope.dealMacReqUserValue = function(){
//    	$scope.urlParamArray = window.location.href;
//    	$scope.mac = $scope.urlParamArray[1];

/*            $scope.dealLocationValue = window.location.href.split("?");
            $scope.dealLocationParamValue = $scope.dealLocationValue[1];
            //将以&分割的数据拆分开来
            $scope.dealLocationParamArray = $scope.dealLocationParamValue.split("&");
            //获取地址栏上的mac,reqUserName
            $scope.mac = $scope.dealLocationParamArray[0].split("=")[1];
//            $scope.mac = "123";
            $scope.reqUserName = $scope.dealLocationParamArray[1].split("=")[1];
            $scope.classId = $scope.dealLocationParamArray[2].split("=")[1];
            //添加classbatch参数。为结束时间更新做准备
            $scope.classbatch = $scope.dealLocationParamArray[3].split("=")[1];
            //添加resourcefloder参数。为录像做准备
            $scope.resourcefloder = $scope.dealLocationParamArray[4].split("=")[1];
			//ip
			$scope.ip = $scope.dealLocationParamArray[5].split("=")[1].split("#")[0];*/
			//将url上附带的信息写入scope
			var urlInfo = /\?[A-Za-z0-9&=.-]+/g.exec(window.location.href)[0].slice(1).split("&")
			for(var i=0;i<urlInfo.length;i++){
				var info = urlInfo[i].split('=');
				$scope[info[0]]=info[1]
			}
            
            //设置svg图片默认mac值
            var svgDoc = document.getElementById("svgmapctrl").getSVGDocument();
            var macValue = svgDoc.getElementById("macValue");
            macValue.setAttribute("value",$scope.mac);
            var urlAdressValue = svgDoc.getElementById("urlAdressValue");
            urlAdressValue.setAttribute("value",$scope.activedeviceServiceurl);

        };

        //服务器推送过来的数据,通过这个监听方法，event接收的是方法,data是接收的数据
        $rootScope.$on('event:socket-message', function (event, data) {
            console.log('监听到的数据' + data);

            //导播台抢占初始化
            $scope.initDirectorSeize(data);
        });


        //初始化得到录像的状态,//接口stauts
        $scope.getvideotape = function () {

            //跨域用jsonp写法
            /*  var url='http://192.168.12.46:8080/deviceService/stauts?callback=?';
             $.ajax({
             url:url,
             dataType:'jsonp',
             processData: false,
             type:'get',
             success:function(data){
             alert(data.name);
             },
             error:function(XMLHttpRequest, textStatus, errorThrown) {
             alert(XMLHttpRequest.status);
             alert(XMLHttpRequest.readyState);
             alert(textStatus);
             }});*/

            /*  c_url =   'http://192.168.12.46:8080/deviceService/stauts';
             // 注意下面只需一个问号，不用具体的函数名
             c_url +=   '?jsonp=? ';
             // 注意是getJSON 哦
             $.getJSON(c_url, function (data){
             alert(data);
             alert('11');
             });*/

            /* $.ajax({
             success: function(data) {
             alert("1"+data);
             },
             error: function(code){
             alert(code);
             }
             });*/

            DirectorMainService.getvideotape().then(
                function (data) {
                    alert("2" + data);
                    $scope.videotapeId = data;
                    //接口recording,传值para=[StartRecord开始,StopRecord停止,PauseRecord暂停,ResumeRecord恢复]

                    switch ($scope.videotapeId) {
                        case 'StartRecort':
                            $scope.videotapeId = 'PauseRecord';
                            break;
                        case 'StopRecord':
                            $scope.videotapeId = 'PauseRecord';
                            break;
                        case 'PauseRecord':
                            $scope.videotapeId = 'PauseRecord';
                            break;
                    }
                },
                function (code) {
                    alert('xxx:error' + code);
                }
            );
        };


        //转换live状态
        $scope.toggleCondition = function(index, indexMain){
            // alert("aa");
            // $scope.bDanger = false;
            $scope.bDanger = index;
            $scope.setMain(indexMain);
        }
        
        //修改直播结束时间
        $scope.changeTime = function(){
            if($scope.remainMinus < 10){
                $scope.remainMinus = "0" + $scope.remainMinus;
            }
            $scope.lastTimeObject = {
                "LastTimeModel": $scope.remainMinus,
                "LastSecos" : $scope.remainSecos
            };
        	$scope.changTime = !$scope.changTime;
        }




       //成功修改时间
        $scope.changeTimeOk = function(minPara,secPara){


            //算出结束时间
            $scope.countLastTime(minPara,secPara);
            //向后台发请求更新结束时间
            $scope.updateLastTime($scope.classbatch, $scope.endTime);

            //重新查询结束时间（回导致倒计时修改失效）
            /*$timeout(function(){
            	refreshDirectorHeaderData($scope.classId);
            },3000);*/

            //切换倒计时为不可编辑状态
        	$scope.changTime = !$scope.changTime;
        }

        //取消修改时间
        $scope.changeTimeCancel = function(){
        	$scope.changTime = !$scope.changTime;
        }
        //切换云台控制
        $scope.toggleCloud = function(title,index){
        	
        	//改用index判断，防止单选按钮切换，标题值没有实时更新问题
        	if(index === "3"){
        		title = "教师全景";
        	} else if(index === "2"){
        		title = "学生";
        	} else if(index === "1"){
        		title = "教师";
        	}
        	
//            var index_num = Number(index) - 1;            
//            $scope.couldControl = $scope.VideosInformations[index_num]; 
        	//防止vga的标题清空其他之前的视频标题
        	if(title != ""){
        		$scope.bCloud = index;
        		$scope.couldControl = {
                        "title": title
                    };
        	}
        	
            
            var svgDoc = document.getElementById("svgmapctrl").getSVGDocument();
            
            //传递当前视屏 title和mac值
            var titleValue = svgDoc.getElementById("titleValue");
            titleValue.setAttribute("value",title);
            var macValue = svgDoc.getElementById("macValue");
            macValue.setAttribute("value",$scope.mac);
            
            //云台控制参数id与cardId互转
            if(title === "教师"){
            	$scope.livingCardPara = "card0";
//            	$scope.videoid = "card0";
            }
            if(title === "教师全景"){
            	$scope.livingCardPara = "card1";
            }
            if(title === "学生"){
            	$scope.livingCardPara = "card2";
            }
            if(title === "VGA"){
            	$scope.livingCardPara = "card3";
            }
            
        }
        //修改屏幕大小
        $scope.resizeVedio = function(title, index){
        	
        	//切换云台控制
            $scope.toggleCloud(title, index);
        	
        	var index_num = Number(index) - 1;     
        	
        	//防止vga切换之后，重置之前视屏标题相关的样式
    		//$scope.bCloud = index;     	
        	
            $scope.isShow = !$scope.isShow;
            //$scope.isActive = index;
        	// alert("aa");
            // $scope.isActive1 = ! $scope.isActive1;
            // $scope.isShow5 = !$scope.isShow5;
            switch(index){
                case '1':
                    // $scope.isShow1 = true;
                    $scope.isActive1 = true;                  
                    $scope.isShow2 = true;
                    $scope.isShow3 = true;
                    $scope.isShow4 = true;
                    $scope.couldControl = $scope.VideosInformations[index_num];  
                    break;
                case '2':
                    $scope.isActive2 = true;
                    
                    $scope.isShow1 = true;
                    // $scope.isShow2 = true;
                    $scope.isShow3 = true;
                    $scope.isShow4 = true;
                    $scope.couldControl = $scope.VideosInformations[index_num];  
                    break;
                case '3':
                    $scope.isActive3 = true;
                    
                    $scope.isShow1 = true;
                    $scope.isShow2 = true;
                    // $scope.isShow3 = true;
                    $scope.isShow4 = true;
                    $scope.couldControl = $scope.VideosInformations[index_num];  
                    break;
                case '4':
                    
                    $scope.isActive4 = true;
                    $scope.isShow1 = true;
                    $scope.isShow2 = true;
                    $scope.isShow3 = true;
                    // $scope.isShow4 = true;
                    break;
            }


        }

        $scope.resizeSmallVedio = function(index){
            $scope.isShow = !$scope.isShow;
            //$scope.isActive =  $scope.isActive
            switch(index){
                case '1':
                    $scope.isActive1 = false;                  
                    $scope.isShow2 = false;
                    $scope.isShow3 = false;
                    $scope.isShow4 = false;
                    break;
                case '2':
                    $scope.isActive2 = false;                    
                    $scope.isShow1 = false;
                    $scope.isShow3 = false;
                    $scope.isShow4 = false;
                    break;
                case '3':
                    $scope.isActive3 = false;                    
                    $scope.isShow1 = false;
                    $scope.isShow2 = false;
                    $scope.isShow4 = false;
                    break;
                case '4':
                    
                    $scope.isActive4 = false;
                    $scope.isShow1 = false;
                    $scope.isShow2 = false;
                    $scope.isShow3 = false;
                    break;
            }
        }
        
        //验证浏览器方法
        function check(r){  
        	var ua = navigator.userAgent.toLowerCase();  
      	  	return r.test(ua);  
      	}; 
        
        //验证浏览器版本
        $scope.checkBrowserType = function(){
        	var browserName;  
      	  	var isOpera = check(/opera/);  
      	  	var isChrome = check(/chrome/);  
      	  	var isFirefox = check(/firefox/);  
      	  	var isWebKit = check(/webkit/);  
      	  	var isSafari = !isChrome && check(/safari/);  
      	  	var isIE = !isOpera && check(/msie/);  
      	  	var isIE7 = isIE && check(/msie 7/);  
      	  	var isIE8 = isIE && check(/msie 8/);  
      	  	if(isIE8) {  
      	  		browserName = "IE8";    
      	  	} else if(isIE7) {  
      	  		browserName = "IE7";  
      	  	} else if(isIE)  {  
      	  		browserName = "IE";  
      	  	} else if(isChrome) {  
          	  		browserName = "Chrome";  
      	  	} else if(isFirefox) {  
      	  		browserName = "Firefox";  
      	  	} else if(isOpera) {  
      		  	browserName = "Opera";  
      	  	} else if(isWebKit) {  
      	  		browserName = "WebKit";  
      	  	} else if(isSafari)  {  
      	  		browserName = "Safari";  
      	  	} else  {  
      		  	browserName = "Others";  
      	  	}  
      	  	return browserName;  
        };
		
		$scope.clearTimeOut = function(){
			$scope.CcStateLock = true;			
		}
		$scope.CcStateLock = true;
		

$scope.showColor = function(){	
	for(var i=0;i<arguments.length;i++){
		if(arguments[i]==$scope.CustomScreenState){
			return {'background-color':'#428bca'};
		}
	}
	return {};
}

		$scope.sendCentralControlCmd = function(cmd){
			if($scope.timeOutState){
				clearTimeout($scope.timeOutState)	
			}
			$scope.CcStateLock = false;
			var bool = cmd.indexOf('Volume')>-1;
			var cmd0 = (!bool)?'CsnGroupCmd:':''
			cmd = cmd0+cmd;
			if(cmd.indexOf('Screen')>-1){
				$scope.CustomScreenState=-1;	
			}
			$scope.timeOutState =setTimeout(function(func){func();},3000,$scope.clearTimeOut)
			DirectorMainService.sendCentralControlCmd(cmd,$scope.mac).then(
                function(data){
					console.log('send CC cmd answer:',data)
                    if(angular.isDefined(data) && data != "") {
                        
                    }
                },
                function(code){
                    throw(code);
                }
            );
		}
		
		$scope.$watch('mic', function(){
			if(!$scope.mic){return;}
			$scope.sendCentralControlCmd('SetMicVolume:'+$scope.mic)
		})
		$scope.$watch('vol', function(){
			if(!$scope.vol){return;}
			$scope.sendCentralControlCmd('SetSoundVolume:'+$scope.vol)
		})
		
		$scope.updateCCstate = function(mac){
			DirectorMainService.getAllCCState(mac).then(
				function(data){
					if(data){
						if(!$scope.CcStateLock){return;}						
						var strObj={'0':'Middle','1':'Left'}
						$scope.radioModel4 = strObj[data.CustomPanelState.state]
						$scope.radioModel3 = strObj[data.CustomPcState.state]
						$scope.radioModel2= strObj[data.CustomLockState.state]
						$scope.radioModel1= strObj[data.CustomProjectorState.state]
						
						$scope.CustomScreenState = data.CustomScreenState.state;
						
						if($scope.vol != data.SetSoundVolume.state){$scope.vol = data.SetSoundVolume.state}
						if($scope.mic != data.SetMicVolume.state){$scope.mic = data.SetMicVolume.state}
						console.log(data)						
					}	
				},
				function(code){
					throw(code);
				}
			)
		}

        var init = function () {
            $scope.cache = $cacheFactory("");
        	DirectorMainService.permission().then(
                    function(data){
                        $scope.user = data;
                        console.log('data',data);
                    },
                    function(){
                    }
                );
            //监听windows
            window.addEventListener('cameramovebyclick',function(e){$scope.mouseFollow(e.vw,e.vh,e.x,e.y)})
            window.addEventListener('mouseWheelOnTheVideo',function(e){				
				$http.get($scope.activedeviceServiceurl + "consoleOperationInfo?mac=" + $scope.mac + "&cardInfo=" + $scope.livingCardPara + "&consoleOperationInfo=" +(e.v>0?1:3))
				.success(function(data){})
                .error(function(data,status,headers,config){
                        if(status === 500){
                            //alert($scope.activedeviceServiceurl + "recordingStauts method is error: " + "网络未连接。。");
                        }
                        throw(status);
    //                        alert($scope.activedeviceServiceurl + "recordingStauts" + code);
                });});
					
//http://192.168.12.46:8080/deviceService/consoleOperationInfo?cardInfo=card0&mac=00E04C730075&consoleOperationInfo=1
//http://192.168.12.46:8080/deviceService/consoleOperationInfo?cardInfo=card0&mac=00E04C730075&consoleOperationInfo=3

        	
        	//停止课程巡视画面中的视屏轮询
        	var evt = document.createEvent("HTMLEvents");
        	evt.initEvent("active", false, false);
        	evt.id = 'ConsoleMainCtrl';
        	window.dispatchEvent(evt);
        	
        	Date.prototype.Format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            };
        	
        	//请求地址公共变量
    		$scope.activedeviceServiceurl = config.backend.ip + config.backend.base2;
    		
    		//预处理mac参数值
            $scope.dealMacReqUserValue();
            
            //初始化默认数据
            $scope.videoPreviewObject = [
                                         {
                                             "card0": "urlParam1",
                                             "card1": "urlParam2",
                                             "card2": "urlParam3",
                                             "card4": "urlParam4"
                                         }
                                     ];
            $scope.urlParam1 = $scope.videoPreviewObject[0].card0;
            $scope.urlParam2 = $scope.videoPreviewObject[0].card1;
            $scope.urlParam3 = $scope.videoPreviewObject[0].card2;
            $scope.urlParam4 = $scope.videoPreviewObject[0].card4;

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^初始化 视屏预览 start

            initVideoPreview();

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^初始化 视屏预览 end

            $scope.videotapeId = 'PauseRecord';

            //接收教室的传值
            var reg = new RegExp("(^|&)" + 'size' + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r !== null)
                var size = decodeURIComponent(r[2]);
            $scope.className = size;
            //得到数据库的视频信息(默认模板数据)
            $scope.VideosInformations = [
                {
                    "title": "教师",
                    "id": "3000"
                },
                {
                    "title": "学生",
                    "id": "3002"
                },
                {
                    "title": "教师全景",
                    "id": "3001"
                },
                {
                    "title": "VGA",
                    "id": "3003"
                }
            ];

            $scope.handleInfo= {
                    'areaId':$scope.classId,
                    "innerId":"",
                    "ip":$scope.ip,                    
                    'userId':"",
                    'title':"",
                    'modelValue':'34',
                    "modelName":"资源",
                    "areaName":"",
                    "userName":"",
                    "mac":$scope.mac
            };
            
            $scope.toggleCondition();
            $scope.resizeVedio();
            $scope.resizeSmallVedio();
            $scope.isShow = false;
            $scope.isShow1 = false;          
            $scope.isShow2 = false;
            $scope.isShow3 = false;
            $scope.isShow4 = false;
            $scope.messages = [];

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^画中画效果初始值定义

            //传值的具体值
            $scope.pos = '';
            $scope.size = '';

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^主副画面的初始值定义

            //云台记忆初始化为空
            $scope.activeMem = '';

            $scope.activeHolder = '0';
            $scope.activeVideo2 = '0';
            $scope.liveMode = 'play';
            $scope.today = new Date();
            $scope.clock = '';
            $scope.volume = 5;
            
            //视屏流地址模拟
            /*$scope.videoPreviewObject = [
							    {
							        "card0": "rtmp://192.168.12.117:51935/zonekey/00e04c680001_teacher",
							        "card2": "rtmp://192.168.12.117:51935/zonekey/00e04c680001_student",
							        "card4": "rtmp://192.168.12.117:51935/zonekey/00e04c730075_vga"
							    }
							];
            $scope.urlParam1 = $scope.videoPreviewObject[0].card0;
            $scope.urlParam2 = $scope.videoPreviewObject[0].card1;
            $scope.urlParam3 = $scope.videoPreviewObject[0].card2;
            $scope.urlParam4 = $scope.videoPreviewObject[0].card4;*/
            
            //初始化云台控制标题
            $scope.couldControl = {
                    "title": $scope.VideosInformations[0].title
                };
            $scope.bCloud = '1';  
            $scope.recordInformation={
                title:"",
                techerName:""
            };
            
            var lastLoad = $timeout(function(){
            	
            	SocketService.connect('');
            	
            	//查询录像，直播状态(60s一次)
            	getListState();
            	$interval(function () {
            		getListState();
            	},60000);
            	
            	//得到导播台表头数据
            	getDirectorHeaderData($scope.classId);
            	
            	//判断是否是非谷歌浏览器
            	if($scope.checkBrowserType() != "Chrome"){
            		$scope.infoSet = true;
//            		alert("非谷歌");
            	}
            	
            	$interval(function () {
	//                  updateTime();
	                  $scope.getServerTime();
	                  var courseTimeSet = $timeout(function(){
	                	//开始时间与系统时间做判断得到是否有后续课程
		                $scope.getLaterCourse($scope.startTime, $scope.sysClock);
		                $timeout.cancel(courseTimeSet);
		                  
		                //重新得到导播台表头数据（会导致表头信息错误）
//		              	refreshDirectorHeaderData($scope.classId);
	                  },500);
            	}, 1000);
	
            	$timeout(function(){
            		$interval(function () {
                		$scope.getLastTime();
                	}, 1000);
            	},1000);
            	
            	getopen();
                
                //记录直播状态方法
                $scope.livingStatus();
                
              //弹出框模拟
//              $scope.openDirectorCheck("admin");
                
                $timeout.cancel(lastLoad);
            },5000);
			$scope.updateCCstate($scope.mac)
			$scope.interval = setInterval(function(fun,mac){fun(mac)},10000,$scope.updateCCstate,$scope.mac);
//			$scope.mac
            // if($scope.recordStateSet == true){
            //     $scope.recordStatus=1;
            // }else{
            //     $scope.recordStatus=0;
            // }  
            $scope.recordStatus=0;          
            $scope.codeValue();
            $scope.updateEndTimeUrl=config.backend.ip + config.backend.base +'manualVideo/updateEndTime?id=';
            $scope.recordingStatus=config.backend.ip + config.backend.base2 +'recordingStauts?mac='
        };
        
        init();
    }]);
});


function exec(uri) {
    $.get(uri, { }, function (data, textStatus) {
//    	alert('11');
            $("#resText").html(data); // 把返回的数据添加到页面上
        }
    );
}