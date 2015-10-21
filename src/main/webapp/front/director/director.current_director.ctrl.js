define(['app','config'], function (app,config) {
    app.registerController('CurrentDirectorCtrl', ['$scope','$modalInstance','$location',
        'DirectorService','TreeService' ,'$timeout','currentDirectorPeople','mac','pageFlag','$interval','currentReqPeople',
        'classId','classbatch','resourcefloder',
        function ($scope,$modalInstance,$location,DirectorService,TreeService,$timeout, currentDirectorPeople,mac,
                  pageFlag,$interval,currentReqPeople,classId,classbatch,resourcefloder) {
    	
    		$scope.activedeviceServiceurl = config.backend.ip+config.backend.base2;

            //重新申请
            $scope.resetConsole = function(){
                $scope.statusFlag = !$scope.statusFlag;

//                var timeoutSetting2 = $timeout(function(){
                    //接口轮询（得到导播台页面当前导播员是否同意被抢占）(5s)
                    //接口轮询 (默认接口轮询)
                    $scope.intervalFlag = 0;
                    
                    $scope.resetDirector=true;
                    
                    //未响应则，再次请求
                    $scope.timerSet = $timeout(function(){
                        $scope.setQuery();
                    },3000);
                    
                    $scope.dealCountTime();
                    
//                    $scope.setQuery();

                    //计数器设置
//                },2000);
            }
    	
    		//ajax调用（get方式）
	    	var exec = function(uri) {
	    	    $.get(uri, { }, function (data, textStatus) {
	    	        }
	    	    );
	    	};
    	
    		//移除reqUserName
    		$scope.removeReqUserName = function(reqUserName){
    			var url = $scope.activedeviceServiceurl + "clearReqUserNameStatus?reqUserName=" + reqUserName;
            	exec(url);    		};

            //接口轮询（得到导播台页面当前导播员是否同意被抢占）
            var getCurrentDirectorPromise = function(reqUserName, mac){
                DirectorService.getCurrentDirectorPromise(reqUserName, mac).then(
                    function(data){
                            if(data.status === "1"){
//                            	$scope.removeReqUserName($scope.currentDirectorPeople);
                            	
                                //同意直接关闭弹出框，进入导播台页面
                                //alert($scope.currentDirectorPeople + "已同意！即将进入导播台页面...");
                            	console.log($scope.currentDirectorPeople + "已同意！即将进入导播台页面...");
                                $interval.cancel(true);
                                //取消超时设置
                                $scope.cancelTimeOut = true;
                                $timeout.cancel($scope.timerSet);

                                $scope.resultDataArray[0] = data.status;
                                $scope.resultDataArray[1] = pageFlag;
                                $scope.resultDataArray[2] = classId;
                                $scope.resultDataArray[3] = classbatch;
                                $scope.resultDataArray[4] = resourcefloder;

                                $modalInstance.close($scope.resultDataArray);

//                                $location.path("director/console/index.html");
//                            window.open('director/console/index.html?size='+size);
                            } else if(data.status === "0"){
//                            	$scope.removeReqUserName($scope.currentDirectorPeople);

                                //不同意得话，浮层显示申请结果块。
                                //$scope.statusFlag = true;
                            	
                                //不同意关闭弹出框
                                //alert($scope.currentDirectorPeople + "不同意！请稍后再试...");
                            	console.log($scope.currentDirectorPeople + "不同意！请稍后再试...");
                                $interval.cancel(true);
                                //取消超时设置
                                $scope.cancelTimeOut = true;
                                $timeout.cancel($scope.timerSet);

                                $scope.resultDataArray[0] = data.status;
                                $scope.resultDataArray[1] = pageFlag;
                                $scope.resultDataArray[2] = classId;
                                $scope.resultDataArray[3] = classbatch;
                                $scope.resultDataArray[4] = resourcefloder;

//                                先不关闭，在页面上先显示返回结果
                                //$scope.statusFlag = true;
                                $modalInstance.close($scope.resultDataArray);

                            } else if(data.status === "2"){
                                //未响应关闭弹出框
                                //alert($scope.currentDirectorPeople + "可能不在电脑旁！请稍后再试...");
//                            	console($scope.currentDirectorPeople + "可能不在电脑旁！请稍后再试...");
                                if($scope.intervalFlag < 2){
                                    //未响应则，再次请求
                                	$scope.timerSet = $timeout(function(){
                                        $scope.setQuery();
                                    },6000);
                                } else {
                                    $scope.cancelTimeOut = true;
                                    setIsTimeout(data.status);
                                    $timeout.cancel($scope.timerSet);
                                    console.log($scope.intervalFlag);
                                }
                            }
                    },
                    function(code){
                        throw(code);
                    }
                );
            };

            //设置轮询
            $scope.setQuery = function(){
                getCurrentDirectorPromise(currentReqPeople, $scope.mac);
                $scope.intervalFlag += 1;

                if($scope.intervalFlag < 5){
                    console.log("轮询次数： 第" + $scope.intervalFlag + "次结束");
                }
            };

            //预处理超时
            $scope.dealTimeOut = function(reqUserName,mac){
            	var url = $scope.activedeviceServiceurl + "control?mac=" + mac + "&reqUserName=" + reqUserName;
            	exec(url);
            };

            //超时关闭弹出框
            var setIsTimeout = function(mac){
                console.log("已超时！");
                //预处理超时
                $scope.dealTimeOut(currentReqPeople, $scope.mac);
                //超时关闭弹出框，进入导播台页面
                $scope.resultDataArray[0] = "1";
                $scope.resultDataArray[1] = pageFlag;
                $scope.resultDataArray[2] = classId;
                $scope.resultDataArray[3] = classbatch;
                $scope.resultDataArray[4] = resourcefloder;
                $modalInstance.close($scope.resultDataArray);
            };

            $scope.closeWindow = function(){
                $timeout.cancel($scope.timerSet);
                $scope.resultDataArray[0] = "0";
                $scope.resultDataArray[1] = pageFlag;
                $scope.resultDataArray[2] = classId;
                $scope.resultDataArray[3] = classbatch;
                $scope.resultDataArray[4] = resourcefloder;
                $modalInstance.close($scope.resultDataArray);
            };

            //设置12s计时器
            $scope.dealCountTime = function(){
            	if($scope.resetDirector){
            		$scope.intervalFlagValue2 = 12;
            		var intervalSetingRest = $interval(function(){
	            		$scope.intervalFlagValue2--;
	                    if($scope.intervalFlagValue2 === 0){
	                        $interval.cancel(intervalSetingRest);
	                    }
            		}, 1000);
            	} else {
            		$scope.intervalFlagValue = 12;
            		
            		var intervalSeting = $interval(function(){
            			$scope.intervalFlagValue--;
                        if($scope.intervalFlagValue === 0){
                            $interval.cancel(intervalSeting);
                        }
            		}, 1000);
            	}
            };

            var init = function(){
                $scope.currentDirectorPeople = currentDirectorPeople;
                $scope.mac = mac;

                //接口轮询（得到导播台页面当前导播员是否同意被抢占）(5s)
                //接口轮询 (默认接口轮询)
                $scope.intervalFlag = 0;
                
//                $scope.setQuery();
                //未响应则，再次请求
                $scope.timerSet = $timeout(function(){
                    $scope.setQuery();
                },6000);

                //窗口回传数据初始化
                $scope.resultDataArray = new Array();

                //计数器设置
                $scope.dealCountTime();
            };

            init();
        }]);
});
