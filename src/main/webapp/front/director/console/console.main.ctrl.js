define(['app',
    'config',
    'director.current_director.ctrl'
], function (app,config) {
    app.registerController('ConsoleMainCtrl', ['$scope', '$http', '$q', '$interval','$timeout',
        'DirectorMainService', 'SocketService', '$rootScope','$modal',
        function ($scope, $http, $q, $interval, $timeout, DirectorMainService, SocketService, $rootScope,$modal) {

    		//返回首页
    		$scope.backMain = function(){
    			window.open('../../index.html#/director', "_self");
    		};
    	
	    	//得到导播台表头数据
	        var getDirectorHeaderData = function(curriculumId){
	            DirectorMainService.getDirectorHeaderData(curriculumId).then(
	                function(data){
	                    if(angular.isDefined(data)) {
	                        $scope.endTime = data;
	                    }
	                },
	                function(code){
//	                    throw(code);
	                }
	            );
	        };
    	
            //记录录像状态方法
            $scope.recordingStatus = function(para){
            	console.log($scope.activedeviceServiceurl);

                $http.get($scope.activedeviceServiceurl + "recordingStauts?mac=" + $scope.mac)
                    .success(function(data){
                        if(angular.isDefined(data)) {
                            $scope.recordingStatusParam = data;
                            //如果状态为播放，显示暂停按钮，如果状态为暂停，显示播放按钮
//                        $scope.videotapeId = 'StartRecord ';
                            if(para === "notInit"){
                            } else {
                                if($scope.recordingStatusParam === "Recording") {
                                    $scope.videotapeId = 'StartRecord';
                                } else {
                                    $scope.videotapeId = 'PauseRecord';
                                }
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


//                DirectorMainService.recordingStatus().then(
//                    function(data){
//                        if(angular.isDefined(data)) {
//                            $scope.recordingStatusParam = data;
//                            //如果状态为播放，显示暂停按钮，如果状态为暂停，显示播放按钮
////                        $scope.videotapeId = 'StartRecord ';
//                            if(para === "notInit"){
//                            } else {
//                                if($scope.recordingStatusParam === "Recording") {
//                                    $scope.videotapeId = 'StartRecord';
//                                } else {
//                                    $scope.videotapeId = 'PauseRecord';
//                                }
//                            }
//                        }
//                    },
//                    function(code){
//                        throw(code);
//                    }
//                );

            };

            //记录直播状态方法
            $scope.livingStatus = function(){
                DirectorMainService.livingStatus($scope.mac).then(
                    function(data){
                        if(angular.isDefined(data)) {
                            $scope.livingStatusParam = data;
                        }
                    },
                    function(errorMessage){
                    	if(errorMessage[1] === 500){
                    		//alert($scope.activedeviceServiceurl + "livingStatus method is error: " + "网络未连接。。");
                    	}
                    	throw(status);
                    }
                );

            };

            //得到websocket推送消息后，打開是否同意抢占的弹出框
            //进入导播间的命令
            $scope.openIsAgreenWindow = function (reqUserName) {
            	//打开弹框之后，将页面隐藏
            	$scope.directorFighting = true;

                $modal.open({
                    templateUrl: 'director.current_director.tpl.html',
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
                }).result.then(function(isPromise){
                    if(isPromise === "0"){
                    	//不同意的话，将隐藏的页面显示
                    	$scope.directorFighting = false;
                    }
                });
//            window.open('director/console/index.html?size='+size);
            };

            //得到视频源地址
            var initVideoPreview = function(mac){
                DirectorMainService.initrtspPreview(mac).then(
                    function(data){
                        if(angular.isDefined(data) && data != "") {
                            $scope.videoPreviewObject = data;
                            $scope.movieParam = $scope.videoPreviewObject[0].card0;
                            $scope.urlParam1 = $scope.videoPreviewObject[0].card0;
                            $scope.urlParam2 = $scope.videoPreviewObject[0].card1;
                            $scope.urlParam3 = $scope.videoPreviewObject[0].card2;
                            $scope.urlParam4 = $scope.videoPreviewObject[0].card3;
                            $scope.urlParam5 = $scope.videoPreviewObject[0].card4;
                            $scope.urlParam6 = $scope.videoPreviewObject[0].card5;
                            //如果获取不到，则置为空串
                            if(angular.isUndefined($scope.movieParam)){
                            	$scope.movieParam = "";
                            }
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
                            if(angular.isUndefined($scope.urlParam5)){
                            	$scope.urlParam5 = "";
                            }
                            if(angular.isUndefined($scope.urlParam6)){
                            	$scope.urlParam6 = "";
                            }
                        }
                    },
                    function(code){
//                        throw(code);
                    }
                );
            };

            //预处理录像状态
            $scope.dealRecordingStatusParam = function(id){
                console.log("后台查询到的录播机状态：" + $scope.recordingStatusParam);
                //预处理设置状态（Recording，RecordPaused，RecordStopped ，ResumeRecord（前端加））
                //如果id为stop,点击之后，状态为stop，停止循环
                var resumFlag = false;
                if (id === 'StopRecord') {
//                $scope.recording(id);
                    $scope.recordingStatusParam = "RecordStopped";
                } else {
                    //如果为停止，点击之后播放，如果播放，点击之后暂停，如果暂停，点击之后继续，如果继续，点击之后暂停，然后，暂停，继续循环。
                    if($scope.recordingStatusParam === "RecordStopped"){
//                    $scope.recording(id);
                        id = "StartRecord";
                        $scope.recordingStatusParam = "Recording";
                    } else if($scope.recordingStatusParam === "Recording"){
//                    $scope.recording(id);
//                        if(resumFlag){
//                            id = "PauseRecord";
//                            $scope.recordingStatusParam = "RecordPaused";
//                        } else {
                            id = "PauseRecord";
                            $scope.recordingStatusParam = "RecordPaused";
//                        }
                    } else if($scope.recordingStatusParam === "RecordPaused"){
//                    $scope.recording(id);
                        id = "ResumeRecord";
                        $scope.recordingStatusParam = "ResumeRecord";
//                        resumFlag = true;
                    }
                }

                return id;
            }
            //$scope.activePicInPicMode = "";
            //录像的方法
            $scope.videotape = function (id) {
//            alert(id);
            	
            	//点击之后，按钮不可用，等获取完状态，根据状态做出相应处理，并向后台成功发送请求后，再可用。防止请求重复提交
                if (id === 'StartRecord') {
                    $scope.recordingStartOperationDisable = "RecordingStart";
                } else {

                    $scope.recordingPauseOperationDisable = "RecordingPause";
                }


                $scope.recordingStatus("notInit");

                //预处理录像状态
                $timeout(function(){
                	var dealid = $scope.dealRecordingStatusParam(id);

                    if (id === 'StopRecord') {
                        $scope.videotapeId = 'PauseRecord';
                        $scope.recording(dealid);
                    } else {
                        $scope.videotapeId = id;
                        $scope.recording(dealid);
                        
                        if (id === 'StartRecord') {
                            $scope.recordingStartOperationDisable = "able";
                        } else {
                            $scope.recordingPauseOperationDisable = "able";
                        }
                    }
                },1000);
            };

            //接口recording,传值para=[StartRecord开始,StopRecord停止,PauseRecord暂停,ResumeRecord恢复]

            $scope.recording = function (para) {
                var url_ = $scope.activedeviceServiceurl + "recording?para=" + para + "&editclassbatch=" + $scope.classbatch + "&resourcefloder=" + $scope.resourcefloder + "&mac=" + $scope.mac;
                exec(url_);
            };


//        //直播
//        $scope.setLiveMode = function (mode) {
//            $scope.liveMode = mode;
//        };

            //预处理直播状态
            $scope.dealLivingStatusParam = function(){

                //预处理设置状态（Recording，RecordPaused，RecordStopped）
                $scope.livingOperationDisable = "";

                //正常传值之后，可以注释掉
                if(angular.isUndefined($scope.livingStatusParam)){
                    $scope.livingStatusParam = "LivingStart";
                }

                //如果是start, stop图标灰化 ，否则，反之
                if($scope.livingStatusParam === "LivingStart"){
                    $scope.livingStartOperationDisable = "LivingStart";
                } else if($scope.livingStatusParam === "LivingStopped"){
                    $scope.livingStopOperationDisable = "LivingStop";
                }
            }

            //直播的方法
            $scope.setLiveMode = function (id) {
            	
            	//记录直播状态方法
                $scope.livingStatus();

                $timeout(function(){
                	
                	//预处理一下直播状态
//                	if($scope.livingStatusParam === "LivingStart"){
//                		id = "start";
//                	} else {
//                		id = "stop";
//                	}
                	
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
                },300);
            };

            //接口recording,传值para=[StartRecord开始,StopRecord停止,PauseRecord暂停,ResumeRecord恢复]

            $scope.recordingliveMode = function (mac, para) {
                var url_ = $scope.activedeviceServiceurl + "living?mac=" + mac + "&para=" + para + "&endTime=" + $scope.endTime + "&isLive=1";
                exec(url_);
            };


//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^主画面做切面的特效
            //切换特效
            $scope.setEffect = function (type) {
                if ($scope.activeEffect !== type) {
                    $scope.activeEffect = type;
                } else {
                    $scope.activeEffect = "11";
                }
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
                var url = $scope.activedeviceServiceurl + "changeWindows?type=" + activeEffect + "&port=" + index + "&mac=" + $scope.mac;
                exec(url);
            };


//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^设置记忆功能和定位
            $scope.operConsole = function (para) {

                //如果para为0 并且和上次的传值不一样则赋值为0
                if (para == '-1') {
                    $scope.perset(para, $scope.activeMem);
                    return;
                }
                if ($scope.activeMem == '0') {
                    if (para == 0) {
                        $scope.activeMem = '';
                    } else {
                         $scope.activeMem = '';
                        $scope.perset(para, $scope.activeMem);
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


            //设置画中画于位置和大小的联动设置连动
            $scope.$watch('PIP', function () {
                if ($scope.PIP === 'Insert') {
                    $scope.PIPLocation = 'LU';
                    $scope.PIPSize = '4';
                    $scope.getPosAndSize($scope.PIPLocation, $scope.PIPSize);
                    if ($scope.deputyVideo !== '') {
                        $scope.picInPic();
                    }

                } else {
                    $scope.PIPLocation = '';
                    $scope.PIPSize = '';
                    $scope.pos = '';
                    $scope.size = '';
                }
            });

            //画中画
            $scope.setHzh = function (PicInPicMode) {
                //控制主副画面的切换
                //当主控画面切换，控制效果（显示全部视频则不做操作）
                if (PicInPicMode !== $scope.PIP) {
                    switch (PicInPicMode) {
                        case "Insert":
//                        alert(PicInPicMode);
                            $scope.PIP = PicInPicMode;
                            /*                            if($scope.deputyVideo!==''){
                             alert('副画选中');
                             alert("设置联动的位置,直接执行画中画的改变");
                             }*/
                            break;
                        case "LeftRight":
//                        alert(PicInPicMode);
                            $scope.PIP = PicInPicMode;
                            $scope.clearPosAndSize();
                            if ($scope.deputyVideo !== '') {
//                            alert('副画选中');
                                $scope.picInPic();
                            }
                            break;
                        case "Tile":
//                        alert(PicInPicMode);
                            $scope.PIP = PicInPicMode;
                            $scope.clearPosAndSize();
                            if ($scope.deputyVideo !== '') {
                                $scope.picInPic();
                            }
                            break;
                        case "000":
                            $scope.PIP = PicInPicMode;
                            $scope.clearPosAndSize();
                            //不需要清空副窗口选中标志位
//                        $scope.deputyVideo = '';
                            $scope.picInPic();
                            break;
                        case "change":

                            //处理主副切换时必须有一个主，一个副画面问题。
                            if($scope.deputyVideo === ""){
                                if($scope.mainVideo === $scope.VideosInformations[0].id){
                                    $scope.deputyVideo = $scope.VideosInformations[1].id;
                                } else {
                                    //需要查找主窗口所在的索引，并将，索引-1对应的id值，传给副窗口
                                    var indexFlag = 0;
                                    $.each($scope.VideosInformations, function(index, vi){
                                        if(vi.id === $scope.mainVideo){
                                            indexFlag = index;
                                        }
                                    })
                                    //跟前一个交换
                                    $scope.deputyVideo = $scope.VideosInformations[indexFlag-1].id;
                                }
                            }

//                        if ($scope.PIP !== "000" && $scope.deputyVideo !== '' && $scope.PIP !== "")
                            var s = $scope.mainVideo;
                            $scope.mainVideo = $scope.deputyVideo;
                            $scope.deputyVideo = s;
                            $scope.ChangAndClose("change");
                            break;
                    }
                }
                else {
//            alert("反选PIP");
                    $scope.PIP = '';
                    if ($scope.deputyVideo !== '' || PicInPicMode === '000') {
                        $scope.ChangAndClose("close");
                    }
                    //在这写取消反选的操作
                }
            };

            //画中画设置位置
            $scope.setLoc = function (CurrPos) {
                if ($scope.PIP === 'Insert' && $scope.PIPLocation !== CurrPos) {
                    $scope.PIPLocation = CurrPos;
                    $scope.getPosAndSize($scope.PIPLocation, $scope.PIPSize);
                    if ($scope.deputyVideo !== '') {
                        $scope.picInPic();
                    }
                }
            };


            //画中画大小
            $scope.setSize = function (id) {
                if ($scope.PIP === 'Insert' && $scope.PIPLocation !== id) {
                    $scope.PIPSize = id;
                    $scope.getPosAndSize($scope.PIPLocation, $scope.PIPSize);
                    if ($scope.deputyVideo !== '') {
                        $scope.picInPic();
                    }
                }
            };

            //调用画中画的后台服务
            $scope.picInPic = function (picInPicMode, port, pos, size, currPos) {
//          var url=$scope.activedeviceServiceurl+"picInPic?picInPicMode="+picInPicMode+"&port="+port+"&pos="+pos+"&size"+size+"&currPos"+currPos;
                if ($scope.PIP === '000') {
                    var url = $scope.activedeviceServiceurl + "picInPic?picInPicMode=" + $scope.PIP + "&port=" + $scope.mainVideo + "&pos=" + $scope.pos + "&size=" + $scope.size + "&currPos=" + $scope.PIPLocation 
                    + "&mac=" + $scope.mac;
                } else {
                    var url = $scope.activedeviceServiceurl + "picInPic?picInPicMode=" + $scope.PIP + "&port=" + $scope.deputyVideo + "&pos=" + $scope.pos + "&size=" + $scope.size + "&currPos=" + $scope.PIPLocation
                    + "&mac=" + $scope.mac;
                }
                exec(url);
            };

            //执行取消选择和主副改变的时候执行的结果
            $scope.ChangAndClose = function (para) {
                var url = $scope.activedeviceServiceurl + "picInPic?para=" + para + "&mac=" + $scope.mac;
                exec(url);
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
            
            //处理 云台控制 视屏传参数
            $scope.dealLivingPara = function(id) {
            	$scope.livingCardPara = id;
            };

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^导播台 云台操作
            $scope.setVideo2 = function (id) {
//            alert(id);
//                $scope.activeVideo2 = id;
//                console.log("当前主设备id: " + $scope.mainVideo);
                
                console.log("当前云台控制 card值为: " + $scope.livingCardPara);
                if (id !== '') {
                    var consoleOperationInfo = id;
                    $.get($scope.activedeviceServiceurl + "consoleOperationInfo?cardInfo=" + $scope.livingCardPara + "&mac="
                    		+ $scope.mac, {
                        consoleOperationInfo: consoleOperationInfo
                    }, function (data, textStatus) {
                        $("#resText").html(data); // 把返回的数据添加到页面上
                    });
                }
            };
            /*
             $scope.xx = function (){
             $scope.time_=0;
             $scope.time_++;
             if(id===''){
             $timeout(function(){
             $scope.time_=0;
             },1000);
             }
             }*/
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^特效的设置生效方法
            var execute = function (type, port) {
                if (0 > type || type > 11)type = '11';
                if (3000 > port || port > 3005)port = '3000';
                exec($scope.activedeviceServiceurl + "changeWindows?type=" + type + "&port=" + port + "&mac=" + $scope.mac);
            };


//……………………………………………………………………………………………………………………………………………………获得当前时间的变化
            var updateTime = function () {
                $scope.clock = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
            };
//……………………………………………………………………………………………………………………………………………………得到底部标题
            var getopen = function () {
                DirectorMainService.searchDirectorMain($scope.mac).then(
                    function (data) {
                    	data =  {
                                "a0": "教师",
                                "a1": "教室全景",
                                "a2": "学生",
                                "a3": "学生全景",
                                "a4": "VGA",
                                "a5": "板书"
                    	}
                    	if(angular.isDefined(data)){
                    		$scope.VideosInformations[0].title = data.a0;
                            $scope.VideosInformations[1].title = data.a1;
                            $scope.VideosInformations[2].title = data.a2;
                            $scope.VideosInformations[3].title = data.a3;
                            $scope.VideosInformations[4].title = data.a4;
                            $scope.VideosInformations[5].title = data.a5;
                    	}
                    },
                    function(errorMessage){
            			if(errorMessage[1] === 500){
            				//alert($scope.activedeviceServiceurl + "searchDirectorMain method is error: " + "网络未连接。。");
            			}
            			throw(status);
            		}
                );
            };
            //消息推送
            $scope.sendMessage = function () {
                $scope.message = {
                    to: '发送给谁',
                    subject: '标题',
                    content: '这是我发送的内容,这是个测试'
                };
                SocketService.sendMessage($scope.message);
//            alert('xxxxxxxxxxxxxxxxxxxxxxxxxxx');
//            SocketService.send('hello world...');
            };

            function setConsole(data) {
                if (data === 'server open...') return;
                
//                "[{'00E04C730075':'LivingStart,,2104,,auto,,72.85'}]";
                
                //标版导播台中间视屏信息取值修改
                
                if(angular.isUndefined(data) || data === "[]" || data === "" || data === null){
            		return;
            	} else {
            		$scope.webData = eval('(' + data + ')');
            	}
                
                $scope.StringInit = JSON.stringify($scope.webData).split(":")[1]; //分隔符右侧取内容
                $scope.String_ = [];
                $scope.String_[0] = $scope.StringInit.split(",,")[0].split("\"")[1];
                $scope.String_[1] = $scope.StringInit.split(",,")[1];
                $scope.String_[2] = $scope.StringInit.split(",,")[2];

//                $scope.remainSizeArray = $scope.String_[3].split("&");
                $scope.remainSize = $scope.StringInit.split(",,")[3].split("\"")[0];
            }

//        //得到websocket推送消息，打开导播台权限认证页面
//        $scope.openDirectorCheck = function() {
//            $scope.openIsAgreenWindow();
//        };

            //得到websocket推送消息，打开导播台权限认证页面
            $scope.openDirectorCheck = function(reqUserName) {
                $scope.openIsAgreenWindow(reqUserName);
            };

            //预处理mac,reqUserName参数值
            $scope.dealMacReqUserValue = function(){
//        	$scope.urlParamArray = window.location.href;
//        	$scope.mac = $scope.urlParamArray[1];

                $scope.dealLocationValue = window.location.href.split("?");
                $scope.dealLocationParamValue = $scope.dealLocationValue[1];
                $scope.dealLocationParamArray = $scope.dealLocationParamValue.split("&");
                //获取地址栏上的mac,reqUserName
                $scope.mac = $scope.dealLocationParamArray[0].split("=")[1];
//              $scope.mac = "123";
	            $scope.reqUserName = $scope.dealLocationParamArray[1].split("=")[1];
	            $scope.classId = $scope.dealLocationParamArray[2].split("=")[1];
	            //添加classbatch参数。为结束时间更新做准备
	            $scope.classbatch = $scope.dealLocationParamArray[3].split("=")[1];
	            //添加resourcefloder参数。为录像做准备
	            $scope.resourcefloder = $scope.dealLocationParamArray[4].split("=")[1].split("#")[0];
            };

            var stringToJson = function(stringValue)
            {
                eval("var theJsonValue = "+stringValue);
                console.log(stringValue);
                return theJsonValue;
            };

            //预处理数据绑定
            $scope.dealDataBing = function(connnectId, mac, reqUserName){
                var url = $scope.activedeviceServiceurl + 'bind?connectId=' + connnectId + '&mac=' + mac + "&reqUserName=" + reqUserName;
                exec(url);
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

            $scope.countNumber = 0;
            //服务器推送过来的数据,通过这个监听方法，event接收的是方法,data是接收的数据
            $rootScope.$on('event:socket-message', function (event, data) {
                console.log('监听到的数据' + data);

                //导播台抢占初始化
                $scope.initDirectorSeize(data);
                
                //获取视频源地址
                setConsole(data);
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
                 url: $scope.activedeviceServiceurl + "stauts",
                 success: function(data) {
                 alert("1"+data);
                 },
                 error: function(code){
                 alert(code);
                 }
                 });*/

                DirectorMainService.getvideotape($scope.mac).then(
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

            //改变音量的值得大小
            $scope.onVolumeChange = function (voice) {
                console.log(voice);
                $scope.volume = voice;
                $scope.voiceSet($scope.volume);
            };

            $scope.voiceSet = function (setVoice) {
                var url_ = $scope.activedeviceServiceurl + 'setVolume?volume=' + setVoice + "&mac=" + $scope.mac;
                exec(url_);
            };


            var init = function () {
            	DirectorMainService.permission().then(
                        function(data){
                            $scope.user = data;
                            console.log('data',data);
                        },
                        function(){
                        }
                    );
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
                                            	 "card3": "urlParam4",
                                                 "card4": "urlParam5",
                                                 "card5": "urlParam6",
                                                 "card6": "urlParam7"
                                             }
                                         ];
                $scope.movieParam = $scope.videoPreviewObject[0].card6;
                $scope.urlParam1 = $scope.videoPreviewObject[0].card0;
                $scope.urlParam2 = $scope.videoPreviewObject[0].card1;
                $scope.urlParam3 = $scope.videoPreviewObject[0].card2;
                $scope.urlParam4 = $scope.videoPreviewObject[0].card3;
                $scope.urlParam5 = $scope.videoPreviewObject[0].card4;
                $scope.urlParam6 = $scope.videoPreviewObject[0].card5;
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^初始化 视屏预览 start

                initVideoPreview($scope.mac);

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^初始化 视屏预览 end

//            $scope.videotapeId = 'PauseRecord';

                SocketService.connect('');

//            $scope.sendMessage();


                $scope.messages = [];

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
                        "title": "教室全景",
                        "id": "3001"
                    },
                    {
                        "title": "学生",
                        "id": "3002"
                    },
                    {
                        "title": "学生全景",
                        "id": "3003"
                    },
                    {
                        "title": "VGA",
                        "id": "3004"
                    },
                    {
                        "title": "板书",
                        "id": "3005"
                    }
                ];
                console.log($scope.className);

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^画中画效果初始值定义
                //初始化画中画的效果
                $scope.PIP = '';

                //初始化画中画位置
                $scope.PIPLocation = '';

                //画中画的大小初始化
                $scope.PIPSize = '';

                //传值的具体值
                $scope.pos = '';
                $scope.size = '';

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^主副画面的初始值定义

                //切换特效初始化定义^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                $scope.activeEffect = '11';
                //云台记忆初始化为空
                $scope.activeMem = '';

                $scope.activeHolder = '0';
                $scope.activeVideo2 = '0';
                $scope.liveMode = 'start';
                $scope.today = new Date();
                $scope.clock = '';
                $scope.volume = 50;

                $interval(function () {
                    updateTime();
                }, 1000);
                
                getopen();

                //主画面
                $scope.mainVideo = '3000';
//            $scope.mainVideo = $scope.VideosInformations[0].id;
                //副画面
                $scope.deputyVideo = '3001';
//            $scope.deputyVideo = $scope.VideosInformations[1].id;(可以正常获取后台数据值时，则打开此注释)
//           $scope.getvideotape();
                
                //右侧页面云台控制视屏下拉列表设置默认值
                $scope.dealModel = "card0";

                //记录录像状态方法
                $scope.recordingStatus();

                
                //默认录像的start,pause都可用
                $scope.recordingStartOperationDisable = "able";
                $scope.recordingPauseOperationDisable = "able";

                //默认直播的start,stop都可用
                $scope.livingStartOperationDisable = "able";
                $scope.livingStopOperationDisable = "able";

                
                //默认云台控制底部第一个视屏
                $scope.livingCardPara = "card0";

                //记录直播状态方法
                $scope.livingStatus();
                
                //预处理直播状态
                $timeout(function(){
                	$scope.dealLivingStatusParam();
                },1000);
                
                //得到导播台表头数据
                getDirectorHeaderData($scope.classbatch);
                //弹出框模拟
                //$scope.openDirectorCheck("admin");
                
                //视屏直播流数据模拟
                	/*$scope.videoPreviewObject = [
                                                 {
                                                     "card0": "rtmp://192.168.12.117:51935/zonekey/000000000003_teacher",
                                                     "card1": "",
                                                     "card2": "",
                                                	 "card3": "rtmp://192.168.12.133/vod/flvs/3",
                                                     "card4": "rtmp://192.168.12.133/vod/flvs/4",
                                                     "card5": "rtmp://192.168.12.133/vod/flvs/5",
                                                     "card6": ""
                                                 }
                                             ];
                    $scope.movieParam = $scope.videoPreviewObject[0].card6;
                    $scope.urlParam1 = $scope.videoPreviewObject[0].card0;
                    $scope.urlParam2 = $scope.videoPreviewObject[0].card1;
                    $scope.urlParam3 = $scope.videoPreviewObject[0].card2;
                    $scope.urlParam4 = $scope.videoPreviewObject[0].card3;
                    $scope.urlParam5 = $scope.videoPreviewObject[0].card4;
                    $scope.urlParam6 = $scope.videoPreviewObject[0].card5;*/
                
                //获取视频源地址
                /*$scope.websocketData = "[{'00E04C730075':'LivingStart,,2104,,auto,,72.85'}]";
                setConsole($scope.websocketData);*/
                
            };

            init();
        }]);
});


function exec(uri) {
    //alert(uri);
    $.get(uri, { }, function (data, textStatus) {
//    	alert('11');
            $("#resText").html(data); // 把返回的数据添加到页面上
        }
    );
}