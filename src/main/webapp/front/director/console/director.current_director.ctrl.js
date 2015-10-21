define(['app','config'], function (app,config) {
    app.registerController('CurrentConsoleDirectorCtrl', ['$scope','$modalInstance','$location',
        'DirectorMainService','currentDirectorPeople','mac','classid','$interval','$timeout',
        function ($scope,$modalInstance,$location,DirectorMainService,currentDirectorPeople,mac,classid,$interval, $timeout) {
    	
    	
	    	//请求地址公共变量
			$scope.activedeviceServiceurl = config.backend.ip + config.backend.base2;
			$scope.activedeviceServiceurl2 = config.backend.ip + config.backend.base;
    	
	    	//初始化是否同意结果数据
	    	var setBackendPromiseArray = {
	         		"mac" : "",
	         		"para": ""
	        };
	    	
	    	var exec = function(uri) {
	    	    $.get(uri, { }, function (data, textStatus) {
	    	        }
	    	    );
	    	};

            //将导播台权限结果传给后台，并关闭相应窗口
            $scope.resultWindow = function(isPromise){
            	var url = $scope.activedeviceServiceurl + "confome?mac=" + mac + "&para=" + isPromise + "&reqUserName=" + $scope.reqUserName;
            	exec(url);
            	
            	if(isPromise === "1"){
                  //同意直接关闭弹出框，进入导播台页面
//                  alert("您已同意！即将退出。申请者即将进入导播台页面...");
                  console.log("您已同意！即将退出。申请者即将进入导播台页面...");
                  $scope.intervalFlag = false;
                  $modalInstance.close(isPromise);
//                  if(confirm("您确定要关闭本页吗？")){
                      window.opener=null; //为了不出现提示框
//                      window.open('','_self');
//                      window.close();
                      window.open($scope.activedeviceServiceurl2 + 'front/index.html#/coursepatrol/' + classid ,'_self');
//                  }
//                  window.open('director/console/index.html');
              } else if(isPromise === "0"){
                  //不同意关闭弹出框
//                  alert("您不同意！");
                  console.log("您不同意！");
                  $scope.intervalFlag = false;
                  $interval.cancel($scope.intervalSet);
                  $modalInstance.close(isPromise);

              } 
//                setBackendPromise(setBackendPromiseArray);
            };

            //设置10s计时器（与后台沟通，10s结束后，要及时把关闭窗口的信息通过websocket传送过来）
            $scope.dealCountTime = function(){
                $scope.intervalFlagValue = 10;
                $scope.intervalSet =  $interval(function(){
                    $scope.intervalFlagValue--;
                    //如果倒计时为0，则停止倒计时
                    if($scope.intervalFlagValue === 0){
                        $interval.cancel($scope.intervalSet);
                        
                        //IE下可用
//                        window.opener=null; //为了不出现提示框
//                        window.open('','_self');
//                        window.close();
                        
                        // var opened=window.open('','_self');
                        // opened.opener=null;
                        // opened.close();
                        window.opener=null; //为了不出现提示框
                        window.open($scope.activedeviceServiceurl2 + 'front/index.html#/coursepatrol/' + classid ,'_self');
                    }
                }, 1000);
            };

            var init = function(){

                $scope.reqUserName = currentDirectorPeople;

                //设置30s计时器
                $scope.dealCountTime();

            };

            init();
        }]);
});
