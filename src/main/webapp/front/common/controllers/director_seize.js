define(['app',
    'config',
    'director/director.current_director.ctrl'
], function (app, config) {

    app.registerController('DirectorSeize', ['$scope', '$timeout','$modal','$interval', 'DirectorService', 'SocketService','ScheduleService', 'growl',
        function ($scope, $timeout,$modal, $interval, DirectorService, SocketService,ScheduleService , growl) {

            /**
             * 申请者 start
             */

            //进入导播间的命令
            $scope.openConsole = function (mac,pageFlag,classId,classbatch,resourcefloder,ip,centerControllerstate,recordedBroadcaststate) {
                $scope.pageFlag = pageFlag;

                if(mac === null){
                    alert("没有录播机可用!");
                    return;
                }
				centerControllerstate=centerControllerstate?1:0;
				recordedBroadcaststate=recordedBroadcaststate?1:0;
				if(centerControllerstate==0&&recordedBroadcaststate==0){
					recordedBroadcaststate=1;
				}
                //获得当前导播员
                $scope.getCurrentDirector($scope.global.user, mac, classId,classbatch,resourcefloder,ip,centerControllerstate,recordedBroadcaststate);
            };

            //得到当前导播员 1)
            $scope.getCurrentDirector = function(user, mac, classId, classbatch, resourcefloder,ip,centerControllerstate,recordedBroadcaststate){
                user.mac = mac;
                //防止传过来的参数为undefined，导致页面打开出错
                if(angular.isUndefined(classId)){
                	$scope.classId = "";
                } else {
                	$scope.classId = classId;
                }
                if(angular.isUndefined(classbatch)){
                	$scope.classbatch = "";
                } else {
                	$scope.classbatch = classbatch;
                }
                if(angular.isUndefined(resourcefloder)){
                	$scope.resourcefloder = "";
                } else {
                	$scope.resourcefloder = resourcefloder;
                }
                $timeout(function() {
                	DirectorService.getCurrentDirector(user).then(
                            function(data){
                                if(data.result==="1"){
                                    $scope.currentDirectorPeople = data.username;
                                    $scope.currentDirectorNoPeople = false;
                                    console.log("导播台有人" + $scope.currentDirectorPeople);
                                } else {
                                    $scope.currentDirectorNoPeople = true;
                                    console.log("导播台没人");
                                }

                                if($scope.currentDirectorNoPeople){
                                    if($scope.pageFlag > 4) {
                                        window.open('director/console/index.html?mac=' + mac + "&reqUserName=" + user.loginname
                                        		+ "&classId=" + $scope.classId + "&classbatch=" + $scope.classbatch + "&resourcefloder=" + $scope.resourcefloder);
                                    } else if($scope.pageFlag == 4){
                                        window.open('director/consoleSample/index.html?mac=' + mac + "&reqUserName=" + user.loginname
                                        		+ "&classId=" + $scope.classId + "&classbatch=" + $scope.classbatch + "&resourcefloder=" + $scope.resourcefloder);
                                    /*} else if($scope.pageFlag == 3){
                                        window.open('director/consoleBestSample/index.html?mac=' + mac + "&reqUserName=" + user.loginname
                                        		+ "&classId=" + $scope.classId + "&classbatch=" + $scope.classbatch + "&resourcefloder=" + $scope.resourcefloder);*/
                                    } else{
                                        window.open('director/consoleSampleThree/index.html?mac=' + mac + "&reqUserName=" + user.loginname
                                                + "&classId=" + $scope.classId + "&classbatch=" + $scope.classbatch + "&resourcefloder=" + $scope.resourcefloder
												+ "&ip=" +ip
												+ "&centerControllerstate=" +centerControllerstate
												+ "&recordedBroadcaststate=" +recordedBroadcaststate
												);
                                    }
                                } else {
                                    $modal.open({
                                        templateUrl: 'director/director.current_director.tpl.html',
                                        controller: 'CurrentDirectorCtrl',
                                        backdrop:'static',
                                        windowClass: 'modal-big',
                                        width: '1000px',
                                        resolve: {
                                            currentDirectorPeople: function () {
                                                console.log($scope.currentDirectorPeople);
                                                return $scope.currentDirectorPeople;
                                            },
                                            currentReqPeople: function(){
                                                return user.loginname;
                                            },
                                            mac: function(){
                                                return mac;
                                            },
                                            pageFlag: function(){
                                                return $scope.pageFlag;
                                            },
                                            classId : function(){
                                                return $scope.classId;
                                            },
                                            classbatch : function(){
                                                return $scope.classbatch;
                                            },
                                            resourcefloder : function(){
                                                return $scope.resourcefloder;
                                            }
                                        }
                                    })
                                        .result.then(function(dataArray){
                                            if(dataArray[0] === "1"){
                                                //同意,关闭当前页面，进入导播台页面
                                                var x =screen.width;
                                                var y =screen.height;
                                                if(dataArray[1] === "openConsole") {
                                                    window.open ('director/console/index.html?mac=' + mac + "&reqUserName=" + user.loginname
                                                    		+ "&classId=" + dataArray[2] + "&classbatch=" + dataArray[3] + "&resourcefloder=" + dataArray[4]);
//                                                window.open('director/console/index.html?size='+size);
                                                } else if(dataArray[1] === "openConsoleSample"){
                                                    window.open ('director/consoleSample/index.html?mac=' + mac + "&reqUserName=" + user.loginname 
                                                    		+ "&classId=" + dataArray[2] + "&classbatch=" + dataArray[3] + "&resourcefloder=" + dataArray[4]);
//                                                window.open('director/console/index.html?size='+size);
                                                } else if(dataArray[1] === "openConsoleBestSample"){
                                                    window.open ('director/consoleBestSample/index.html?mac=' + mac + "&reqUserName=" + user.loginname 
                                                    		+ "&classId=" + dataArray[2] + "&classbatch=" + dataArray[3] + "&resourcefloder=" + dataArray[4]);
//                                                window.open('director/console/index.html?size='+size);
                                                } else {
                                                    window.open ('director/consoleSampleThree/index.html?mac=' + mac + "&reqUserName=" + user.loginname 
                                                            + "&classId=" + dataArray[2] + "&classbatch=" + dataArray[3] + "&resourcefloder=" + dataArray[4]
															+"&ip="+ip
															+ "&centerControllerstate=" +centerControllerstate
															+ "&recordedBroadcaststate=" +recordedBroadcaststate
															);
//                                                window.open('director/console/index.html?size='+size);
                                                }

                                            }
                                        });
                                }
                            },
                            function(code){
                                throw(code);
                            }
                        );
                },1000);
            };

            /**
             * 申请者 end
             */

        }])
});