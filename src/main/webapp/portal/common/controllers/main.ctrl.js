define(['app', 'config'], function (app, config) {

    app.controller('MainCtrl', ['$scope','$http', '$translate', '$timeout', '$interval','$location', '$cookies', 'CodeService', 'SecurityService', '$q','$modal', '$filter',
        function ($scope,$http, $translate, $timeout, $interval,$location, $cookies, codeService, securityService, $q,$modal,$filter) {
            //关于系统
            $scope.openAbsystem = function () {
                var modalInstance = $modal.open({
                    templateUrl: '/Absystem.html',
                    controller: ModalInstanceCtrl,
                    resolve: {
                        items: function () {
                            return $scope.items;
                        }
                    }
                });
            };

            //搜索按钮切换
            $scope.toggleInput = function(){
                $scope.focus = true;
                
            }

            var ModalInstanceCtrl = function ($scope,$modalInstance) {

                $scope.ok = function () {
                    $modalInstance.close();
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
            //点击登录出现登陆界面
            $scope.Login = function(){
                $scope.Loginhidden = true;
            };
            //点击界面登录按钮登录界面
            $scope.Loginname = function(){
                $scope.LoginName = true;
                $scope.Loginhidden = false;
                $scope.LoginSelect = '';
            };
            //点击退出的时候进行退到登录的初始化
            $scope.loginSelect = function(selectvalue){
                  if(selectvalue ==='1'){
                      $location.path('PersonalInformation/resource');
                  }
                  if(selectvalue ==='2'){
                      $scope.LoginName = false;
                  }
            };

            $scope.getCodes = function(keywords, user){
                var deffered = $q.defer();
                codeService.getCodes(keywords, user).then(
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
                notification: {},
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


            $scope.logout = function () {
                securityService.logout().then(
    	                function(data){
    	                	if(data.msg === "true"){
    	                	   $scope.global.user = {};
//    	                       delete $cookies.reins_user;
    	                       window.location.href = 'login.jsp';
    	                	} else {
    	                	   alert("退出失败！");	
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

            var notification_timeout;

            $scope.$on('notification', function(event, notification){

                $scope.global.notification = notification;

                var delay = angular.isNumber(notification.delay)? notification.delay: 2000;

                //延时关闭提示消息
                if(notification_timeout)
                    $timeout.cancel(notification_timeout);

                notification_timeout = $timeout(function(){
                    $scope.closeNotification();
                }, delay);
            });

            $scope.closeNotification = function(){
                $scope.global.notification = {};
            };
            
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
                        userName: '斌',
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

            //搜索按钮
            $scope.searchCourse = function(){

            }

            $scope.$watch('sourceList', function(){
                //监测是否有元素被选中
                // if(angular.isDefined($scope.sourceList)){
                    var _temp = $filter('filter')($scope.sourceList, {checked:true});
                    $scope.selectedCount = _temp.length;
                    $scope.showM = _temp.length > 0;
                // }
            },true); 

            $scope.fillSearchInput = function(index,scheduletype){
                $scope.focus = true;
                var _temp = $filter('filter')($scope.schedules, {scheduletype:scheduletype});
                $scope.query = _temp[_temp.length - 1].data[index].resourcename;
                $scope.showsearchContent = '2';
            }
            //清空搜索框
            $scope.cleanSearchContent = function(){
                $scope.query = "";
            }
            var init = function () {
                $scope.query = "";
                $scope.scheduletype = "精品";
                $http.get("data/releaseds.list.json")
                .success(function(response) 
                    {
                        $scope.schedules = response;
                        console.log($scope.schedules);
                    }
                );


                $scope.sourceList =[
                {
                    "treatyNo": "1",
                    "temTreatyNo": "2",
                    'checked': false
                },
                {
                    "treatyNo": "2",
                    "temTreatyNo": "3",
                    'checked': false
                },
                {
                    "treatyNo": "4",
                    "temTreatyNo": "5",
                    'checked': false
                },
                {
                    "treatyNo": "2",
                    "temTreatyNo": "3",
                    'checked': false
                },
                {
                    "treatyNo": "2",
                    "temTreatyNo": "3",
                    'checked': false
                },
                {
                    "treatyNo": "2",
                    "temTreatyNo": "3",
                    'checked': false
                },
                {
                    "treatyNo": "2",
                    "temTreatyNo": "3",
                    'checked': false
                },
                {
                    "treatyNo": "2",
                    "temTreatyNo": "3",
                    'checked': false
                },                ,
                {
                    "treatyNo": "2",
                    "temTreatyNo": "3",
                    'checked': false
                }
            ];
                $scope.sourceChecked = false;
                $scope.focus=false;
                $scope.LoginSelect = '';
                $scope.LoginName = false;
                $scope.Loginhidden = false;
            	if(readUserFromCookie()) {
                    startTimer();
            	}else{
                    window.location.href = 'login.jsp';
                }


            };

            //计时退出ngidle.
            var startTimer  = function(){
            	
                 $scope.$on('$idleTimeout', function() {
                     $scope.logout();
                 });
            }
           
            init();

        }])
        .config(function($idleProvider, $keepaliveProvider) {
            $idleProvider.idleDuration(1);
            $idleProvider.warningDuration(600);
            $keepaliveProvider.interval(10);
        })
        .run(function($rootScope, $idle, $log, $keepalive){
            $idle.watch();
            $log.debug('app started.');
        });
});