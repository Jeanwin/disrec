define(['app', 'config','focusMe','directorSeize'], function (app, config) {

    app.controller('MainCtrl', ['$scope','$cookieStore', '$translate', '$timeout','$cacheFactory', '$interval', '$cookies','SystemService', 'CodeService', 'SecurityService', 'SocketService','ScheduleService', '$q','$modal', 'growl','PermissionsService','MessageService',
        function ($scope,$cookieStore, $translate, $timeout,$cacheFactory, $interval, $cookies,SystemService, CodeService, SecurityService, SocketService,ScheduleService, $q, $modal, growl,PermissionsService,MessageService) {
    	
    	 //获取标志
	        var getLog = function(){
	        	SystemService.getPlateForm().then(
	                    function(data){
	                        console.log(data);
	                        $scope.logoInfo = data[0];
	                    },
	                    function(code){
	                        return [];
	                    }
	               )
	        }
    	
    		//关闭提示
    		$scope.closeMsg = function(){
    			$scope.infoSet = !$scope.infoSet;
    		};
    		$scope.closechromeMsg = function(){
    			$scope.chromeset = !$scope.chromeset;
    		};

    		//修改用户密码
            $scope.modifyPassword = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'about/modifyPassword.modal.html',
                    controller: modifyPasswordCtrl,
                    resolve: {
                        user: function () {
                            return $scope.global.user;
                        }
                    }
                }).result.then(
                        function(data){
//                        	$scope.modifyPasswordServer();
                        	console.log(data);
                        }
                 );
            };

            var modifyPasswordCtrl = function ($scope,$modalInstance,user) {
            	
                $scope.save = function (originalPassword,newPassword,secondPassword) {
                	var keywords = {
        					'id':user.id,
        					'oldPassword':originalPassword,
        					'newPassword':newPassword,
        					'repPassword':secondPassword
        			}
                	PermissionsService.modifyPassword(keywords).then(
                            function(data){
                            	if(data.operation == "密码修改成功"){
                                    growl.addSuccessMessage(data.operation);
                                    $modalInstance.close(true);
                                }else{
                                growl.addErrorMessage(data.operation);
                                }
                            },
                            function(error){
                            	console.log("密码修改失败啦，请重试");
                            }
                        );
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
            //判断用户权限
            $scope.userPermissions = function(){
                console.log("+++++++用户权限++++++")
                $.each($scope.global.user.authenticatid, function(index, userPer){
//                    console.log('+++++'+userPer+'+++++');
                    return userPer;
                    if(userPer){

                    };
//                    schedule[event.classnum-1].weekly[parseInt(event.weekdate)-1].classes.push(event);
                });
            };

           

            //权限
            $scope.permissions = function(keywords){
                PermissionsService.permission(keywords).then(
                    function(data){
                        $scope.global.user = data;
                        //$scope.global.user.roleid = ['1', '2','3'];
                        console.log('start通过后台获取权限接口++++++++++');
                        console.log('data',data);
                        console.log($scope.global.user.authenticatid.indexOf('auth_mhgl_url_view'));
                        console.log('+++++++++++++++++通过后台获取权限接口++++++++++');
                        return $scope.global.user;
                    },
                    function(){
                    }
                );
            };
            //更改外观
            $scope.changeCloth = function(chooseValue){
            	 $cookieStore.put("chooseValue",chooseValue);
                 $scope.choose = $cookieStore.get("chooseValue");
            }
            //关于系统
            $scope.openAbsystem = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'about/about.system.model.html',
                    controller: ModalInstanceCtrl,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });
            };

            var ModalInstanceCtrl = function ($scope,$modalInstance) {

                $scope.ok = function () {
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
            //当前学期显示
            $scope.NowTerm = function(){
                ScheduleService.selectNowTerm().then(
                    function(data){
                        if(data.id >0){
                            $scope.Nowterm = data;
                        }else{
                            $scope.Oldterm = data;
                        }
//                        $.each($scope.NowtermList,function(index,nowterm){
//                            if(nowterm.iscurrent === '1'){
//                                $scope.Nowterm = nowterm.termname;
//                            }
//                        });
                    },
                    function(){

                    }
                );
            };

            //日期格式化
            $scope.initDateFormat = function(){
                $scope.dateFormat = {
                    format : "mm-dd-yyyy"
                };
            };

            $scope.getCodes = function(keywords, user){
                var deffered = $q.defer();
                CodeService.getCodes(keywords, user).then(
                    function(data){
                        deffered.resolve(angular.copy( data));
                    },
                    function(code){
                        deffered.reject(code);
                    }
                );
                return deffered.promise;
            };

            $scope.growl = function(message, type) {
                switch(type){
                    case('info'):
                        growl.addInfoMessage(message);
                        break;
                    case('warn'):
                        growl.addWarnMessage(message);
                        break;
                    case('success'):
                        growl.addSuccessMessage(message);
                        break;
                    case('error'):
                        growl.addErrorMessage(message);
                        break;
                    default:
                        growl.addInfoMessage(message);

                }

            };
            //所有百分比input框进行格式化时选用
            $scope.formatPercent = function(input){
                var t = /^(((([0-9]{1,2})(\.[0-9]{1,6})?)|100(\.[0]{1,6})?))$/;
                if(t.test(input)){
                    var temp = (input+"").split(".");
                    var result = "";
                    if(temp.length>1){
                        for(var i = temp[1].length; i < 6; i++){
                            temp[1] = temp[1]+""+0;
                        }
                        result = temp[0]+"."+temp[1];
                        return (result);

                    }else{
                        return   (input +".000000");
                    }
                }else{
                    return input;
                }
            };
//        //-----------------------------------------------
            $scope.config = config;

            $scope.menus = {};

            $scope.global = {
                app: {
                    status: 'ready'
                },
                lang: config.app.lang || 'zh-cn',
                window: {
                    width: $(window).width(),
                    height: $(window).height()
                },
                viewType: 'table',
                user: {},
//                detector: {
//                    touch: Modernizr.touch,
//                    draganddrop: Modernizr.draganddrop
//                },
                isBusy:false
            };

            //控制旋转图片显示
            $scope.showBusy = function (_busy) {
                $scope.global.isBusy = _busy;
            };

            //计算分页列表的序号
            $scope.getListIndex = function (_index, _pagination) {
                return _index + 1 + (_pagination.pageIndex-1) * _pagination.pageSize;
            };

            //登出
            $scope.logout = function () {
                SecurityService.logout().then(
    	                function(data){
    	                	if(angular.isDefined(data)){
    	                		if(data.msg === "true"){
	    	                	   $scope.global.user = {};
//    	    	                       delete $cookies.reins_user;
    	    	                       window.location.href = '../login';
	    	                	} else {
	    	                	   alert("退出失败！");	
	    	                	}
    	                	} else {
    	                		console.log("error,数据返回异常");
    	                		window.location.href = '../login';
    	                	}
    	                },
    	                function(code){
    	                    throw(code);
    	                    alert("退出未响应！");	
    	                }
                );
            };

            $scope.changeLanguage = function (lang) {
                $scope.global.lang = lang;
                $translate.use(lang);
            };

            //响应浏览器窗口大小的变化
            $(window).on('resize', function () {
                $scope.global.window.width = $(window).width();
                $scope.global.window.height = $(window).height();
                $scope.$apply();
            });


            var UrlDecode=function(utftext) {
            	var string = "";  
                var i = 0;  
                var c = c1 = c2 = 0;  
           
                while ( i < utftext.length ) {  
           
                    c = utftext.charCodeAt(i);  
           
                    if (c < 128) {  
                        string += String.fromCharCode(c);  
                        i++;  
                    }  
                    else if((c > 191) && (c < 224)) {  
                        c2 = utftext.charCodeAt(i+1);  
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                        i += 2;  
                    }  
                    else {  
                        c2 = utftext.charCodeAt(i+1);  
                        c3 = utftext.charCodeAt(i+2);  
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                        i += 3;  
                    }  
                }  
                return string;       
            };
            
            var readUserFromCookie = function () {

                if(config.data.method==='files')
                    $scope.global.user = {
                        userCode: '234234',
                        userName: '',
                        comCode: '234234',
                        comName: '北京分公司'
                    };
            	else{
                    if(angular.isUndefined($cookies.reins_user))
                        return false;

                    var reins_user = $cookies.reins_user;
                    reins_user = UrlDecode(unescape(reins_user));
                    $scope.global.user = JSON.parse(reins_user);

                }

            	return true;
            };

            //计时退出ngidle.
            var startTimer  = function(){
            	
            	var startTimerPara;
            	$scope.sessionTime = config.backend.sessionTimeout; //单位为s 预设值20m
            	
            	//当鼠标移动或者键盘操作时重新记录时间
            	$(window).on("mousemove", function(){
            		//如果监听到鼠标移动时间，则重置倒计时时间
            		$scope.sessionTime = config.backend.sessionTimeout;
            	});
            	
            	$(window).on("keydown", function(){
            		//如果监听到鼠标移动时间，则重置倒计时时间
            		$scope.sessionTime = config.backend.sessionTimeout;
            	});
            	
            	startTimerPara = $interval(function(){
            		//1s之后，执行该方法
            		$scope.sessionTime--;
//            		console.log("inner",$scope.sessionTime);
            		//不操作之后，倒计时开始
            		if($scope.sessionTime < 0){
            			//清除定时器
            			$interval.cancel(startTimerPara);
            			$scope.logout();
            		}
            	},1000);

                /*$scope.$on('$idleTimeout', function() {
                    $scope.logout();
                });*/
            };
            
            //验证浏览器方法
            function check(r){  
            	var ua = navigator.userAgent.toLowerCase();  
          	  	return r.test(ua);  
          	}; 
          	
          //验证ppapi插件是否删除
          	$scope.checkPPAPI = function(){
          		$scope.isPPAPI = false;
                var type = 'application/x-shockwave-flash';
                var mimeTypes = navigator.mimeTypes;

                var endsWith = function(str, suffix) {
                    return str.indexOf(suffix, str.length - suffix.length) !== -1;
                }

                if (mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin &&
                   (mimeTypes[type].enabledPlugin.filename == "pepflashplayer.dll" ||
                    mimeTypes[type].enabledPlugin.filename == "libpepflashplayer.so" ||
                    endsWith(mimeTypes[type].enabledPlugin.filename, "Chrome.plugin"))) $scope.isPPAPI = true;
          	}
            
            
            var init = function () {
            	 $scope.cache = $cacheFactory("");
            	$scope.choose=$cookieStore.get("chooseValue")==undefined? 1:$cookieStore.get("chooseValue");
            	getLog();
            	if($scope.checkBrowserType() != "Chrome"){
            		$scope.infoSet = true;
            		$scope.NotChrome = true;
//                    $scope.$broadcast('NotChrome', $scope.NotChrome);
            		/*var infoSetTime = $timeout(function(){
            			$scope.infoSet = false;
            			$timeout.cancel(infoSetTime);
            		},5000);*/
//            		window.open("install-plugin.html","_parent");
            	}
            	else{
					if(parseInt(navigator.userAgent.toLowerCase().match(/chrome\/[\d.]+/gi)[0].replace(/[^0-9.]/ig,""))>=45){
						$scope.chromeset = true;	
					}
            	}
            	
            	/** 
            	 * return IE,IE6,IE7,IE8,IE9,Chrome,Firefox,Opera,WebKit,Safari,Others 
            	*/  
            	
            	startTimer();           	
            	if(readUserFromCookie()) {

                    //openSocket();
            	}else{
//                    window.location.href = 'login.jsp';
                }

                $scope.permissions();
                $timeout(function(){
					openSocket($scope.global.user.loginname)  					
                	$scope.userPermissions();
                },100);


                //显示当前日期
                $scope.NowTerm();

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
                    $scope.browserFlag = true; 
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

            var openSocket = function (name) {
                SocketService.connect(name);//$scope.global.user.userCode
            };
            
            //验证PPAPI
            $scope.checkPPAPI();
			
			//警报及消息
			$scope.showWarmTimeOutCount = -1;
			$scope.warmData = null;
			$scope.showWarm = function(data){
				$scope.warmData = data;
				
				MessageService.MessageList({firstText: "第一页",lastText: "最后一页",limit: 50,maxSize: 8,nextText: "下一页",numPages: 4,offset: 1,pageIndex: 1,pageSize: 50,previousText: "上一页",totalItems: 0}).then(
					function(data){
						$scope.WarmCount = data.total;
					},
					function(){}
				)
				if($scope.hasWarm){clearTimeout($scope.showWarmTimeOutCount)}
				$scope.showWarmTimeOutCount = setTimeout($scope.closeWarm,10000);
				$scope.hasWarm = true;
			}
			$scope.closeWarm = function(){
				$scope.hasWarm = false;
				$scope.showWarmTimeOutCount = -1;
			}
			$scope.showCall = function(data){}
            
            
            init();

        }])
        .config(function($idleProvider, $keepaliveProvider) {
        	$idleProvider.idleDuration(1);
            $idleProvider.warningDuration(1800);
            $keepaliveProvider.interval(3);
        })
        .run(function($rootScope, $idle, $log, $keepalive){
//            $idle.watch();
            $log.debug('app started.');
        });
});