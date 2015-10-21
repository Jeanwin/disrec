define(['app',
    'config'],
    function (app,config) {
    app.registerController('ScheduleManagementsLiveCtrl',
        [
            '$scope',
            '$modal',
            '$timeout',
            '$upload',
            '$location',
            'growl',
            'ScheduleService',
            'TreeService',
            'CodeService' ,
            '$timeout',
            function ($scope,$modal,$timeout,$upload,$location,growl,ScheduleService,TreeService,CodeService,$timeout) {

//              切换树
            	//JSON 机构树
                var userTrees = function(keywords,areaid){
                    TreeService.systemTree(keywords,areaid).then(
                        function(data){
                            $scope.organTree = data;
                            
                            var addtemp =  function(nodes){
                            	for(var i in nodes){
                            		if(nodes[i].title){
                            			nodes[i].temp = "hideorganTree";
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
                	$scope.toggleArea=!$scope.toggleArea;
                	if($scope.toggleArea == false){
                		$scope.areaTree = $scope.areaTreecopy;
                		$scope.areaTreecopyid
                	}else{
                		$scope.areaTree = $scope.organTree;
                		$scope.liveList.temp = 'hideOrganTree';
                	}
                	initFirstNode($scope.areaTree);
                	
                }
            	
        //进入导播间
        $scope.openConsole = function (size) {
            window.open('director/console/index.html');
        };

        //详细查询图片切换
        $scope.setCheckMode = function(mode) {
            $scope.checkMode = mode;
        };

        //编辑直播课程
        $scope.openSetupModal = function (live) {
            var modalInstance = $modal.open({
                templateUrl: 'scheduleManagements/schedule.setup.modal.html',
                backdrop:'static',
                controller: editLiveScheduleModalCtrl,
                resolve: {
                    live: function () {
                        return live;
                    }
                }
            }).result.then(
                function(update){
                    $scope.searchlives("",$scope.setTreeid,$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };

        //编辑直播课程Modal控制器
        var editLiveScheduleModalCtrl = function ($scope, $modalInstance, live, growl) {
            $scope.live = angular.copy(live);
            $scope.iptemp =  config.backend.tempIp;
            //去掉默认图片
            if($scope.live.imageurl === "/disrec/resource/image/defaultimage.jpg"){
            	$scope.live.imageurl = "";
            }

            $scope.file;
            $scope.progress = -1;
            $scope.upload;
            $scope.error = false;
            $scope.img;
            $scope.uploadRightAway = false;

            //导入上传
            $scope.onFileUploadDone = function(data){
                alert("上传成功。。");
                console.log(data);
            }


            $scope.onFileSelect = function($files) {

                $scope.file = $files[0];

                if($files.length > 1) {
                    growl.addSuccessMessage('一次只能上传一个文件');
                }

                if($scope.file.type.indexOf('image') < 0) {
                    growl.addErrorMessage('请上传图片文件');
                    $scope.file = null;
                    return false;
                }


                var fileReader = new FileReader();
                fileReader.readAsDataURL($scope.file);
                var loadFile = function(fileReader) {
                    fileReader.onload = function(e) {
                        $timeout(function() {
                            $scope.img = e.target.result;
                        });
                    }
                }(fileReader);


                $scope.progress = -1;
                if ($scope.uploadRightAway) {
                    $scope.save();
                }
                
                //上传完之后，让保存按钮可用
                $scope.uploadReadyFlag = true;
                
            };

            //获取选择教师信息
            $scope.selectTeacher = function() {
                var tmp = $scope.live.username.split(',');
                $scope.live.userid = tmp[0];
                $scope.live.username = tmp[1];
            };
            //TODO:自动提示 用户名称stare
            //连带检索用户名称
            $scope.searchTeacher = function(aim,name){
                var temp = aim+"";
                var keywords = {
                    "id":aim,
                    "name":name,
                    "holdFlag": false
                };
                return CodeService.getCodes(keywords,{}).then(
                    function(data){
                        $scope.searchimpowerList = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
            };

            //查询全部的自动提示列表
            $scope.toggleTreeUser = function (flag) {
                if(flag === "ImmediatelyCloseUser"){ //type-select选中后，关闭 自动提示全部列表的代码块
                    $scope.hideTreeUser = true;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTreeUser = !$scope.hideTreeUser;
                    },200);
                }
            };

            //全部查询点击行时设置高亮颜色
            $scope.setColor = function(typeobject){
                if(angular.isDefined($scope.searchimpowerList)){
                    $.each($scope.searchimpowerList, function(index, amy){
                        if(amy === typeobject){
                            amy.getColor = true;
                        } else {
                            amy.getColor = false;
                        }
                    })
                }
            }

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量
            $scope.setautoMessageValueUser = function(autoflag, schedule, name){
                if(autoflag === "username") {
                    schedule.username = name;
                    $scope.hideTreeUser = !$scope.hideTreeUser;
                }
            }

            //验证自动提示框上编辑之后的数据是否在自动提示列表中查询到
            $scope.checkAutoMessageUser = function(autoflag, schedule){
                //遍历自动提示列表，判断输入值是否在列表中存在，不存在的话，清空列表值
                $scope.autoMessageCheck = false;
                if(angular.isDefined($scope.searchimpowerList)){
                    if(angular.isDefined(schedule)){
                        $.each($scope.searchimpowerList, function(index, aimI){
                            if(autoflag === 'username'){
                                if(schedule.username === aimI.name){
                                    $scope.autoMessageCheck = true;
//                                return condition;
                                }
                            }
                        });
                    }
                }
                //不存在的话，清空自动提示框录入值
                if(autoflag === 'username') {
                    if (!$scope.autoMessageCheck) {
                        schedule.username = "";
                    }
                }
            }
            //TODO:自动提示 用户名称end

            //保存
            $scope.save = function () {
                if($scope.file) {
                    var url = config.backend.ip + config.backend.base + 'rest/curriculum/curriculum/importimage';
                    var data = {
                        date: $scope.live.date === undefined?'':$scope.live.date,
                        sameclass: $scope.live.sameclass === undefined?'':$scope.live.sameclass,
                        areaid: $scope.live.areaid === undefined?'':$scope.live.areaid,
                        userid: $scope.live.userid === undefined?'':$scope.live.userid,
                        classname: $scope.live.classname === undefined?'':$scope.live.classname,
                        weeks: $scope.live.weeks === undefined?'':$scope.live.weeks,
                        weekdate: $scope.live.weekdate === undefined?'':$scope.live.weekdate,
                        subject: $scope.live.subject === undefined?'':$scope.live.subject,
                        subjectattribute: $scope.live.subjectattribute === undefined?'':$scope.live.subjectattribute,
                        imageurl: $scope.live.imageurl === undefined?'':$scope.live.imageurl,
                        coursedesc: $scope.live.coursedesc === undefined?'':$scope.live.coursedesc

                    };
                    console.log(data);

                    $scope.upload = $upload.upload({
                        url: url,
                        method: 'POST',
                        data: data,
                        file: $scope.file
                    }).progress(function (evt) {
                        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    }).success(function (data, status, headers, config) {
                        $modalInstance.close();
                        growl.addSuccessMessage("修改成功");
                    }).error(function () {
                        $scope.error = true;
                    });
                }else{
                    var data = {
                        date: $scope.live.date === undefined?'':$scope.live.date,
                        sameclass: $scope.live.sameclass === undefined?'':$scope.live.sameclass,
                        areaid: $scope.live.areaid === undefined?'':$scope.live.areaid,
                        userid: $scope.live.userid === undefined?'':$scope.live.userid,
                        classname: $scope.live.classname === undefined?'':$scope.live.classname,
                        weeks: $scope.live.weeks === undefined?'':$scope.live.weeks,
                        weekdate: $scope.live.weekdate === undefined?'':$scope.live.weekdate,
                        subject: $scope.live.subject === undefined?'':$scope.live.subject,
                        subjectattribute: $scope.live.subjectattribute === undefined?'':$scope.live.subjectattribute,
                        coursedesc: $scope.live.coursedesc === undefined?'':$scope.live.coursedesc
                    };
                    ScheduleService.LiveEditSave(data).then(
                        function(data){
                        	if(data.id === '1'){
                                growl.addSuccessMessage(data.operation);
                                $modalInstance.close(true);
                            }
                            if(data.id === '0'){
                                growl.addErrorMessage(data.operation);
                            }
                        },function(){
                        	 //处理失败后操作
                            alert("添加失败!");
                        }
                    );
                }
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            var init = function() {
                //默认隐藏自动提示框内容
                $scope.hideTreeUser = true;
            };

            init();
        };
//      取消直播
        $scope.cancelLive = function (live) {
            console.log(live);
            var modalInstance = $modal.open({
                templateUrl: 'scheduleManagements/schedule.cancel.modal.html',
                backdrop:'static',
                controller: cancelModalCtrl,
                resolve: {
                    live: function () {
                        return live;
                    }
                }
            }).result.then(
                function(del){
                    $scope.searchlives("",$scope.setTreeid,$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        var cancelModalCtrl = function ($scope, $modalInstance, live,growl) {
            $scope.live = live;
            $scope.ok = function () {
                console.log('通过后台接口删除操作');
                ScheduleService.cancelLive(live).then(
                    function(data){
                        if(data.id === '1'){
                            growl.addSuccessMessage(data.operation);
                            $modalInstance.close(true);
                        }
                        if(data.id === '0'){
                            growl.addErrorMessage(data.operation);
                            $modalInstance.close(true);
                        }
                    },
                    function(code){
                        //处理失败后操作
                        alert("添加失败!");
                    }
                );
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
//     删除
        $scope.openDeleteModal = function (live) {
            console.log(live);
            var modalInstance = $modal.open({
                templateUrl: 'scheduleManagements/schedule.delete.modal.html',
                backdrop:'static',
                controller: DeleteModalCtrl,
                resolve: {
                    live: function () {
                        return live;
                    }
                }
            }).result.then(
                function(del){
                    $scope.searchlives("",$scope.setTreeid,$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        var DeleteModalCtrl = function ($scope, $modalInstance, live,growl) {
            $scope.live = live;
            $scope.ok = function () {
                console.log('通过后台接口删除操作');
                ScheduleService.DeleteLive(live).then(
                    function(data){
                        if(data.id === '1'){
                            growl.addSuccessMessage(data.operation);
                            $modalInstance.close(true);
                        }
                        if(data.id === '0'){
                            growl.addErrorMessage(data.operation);
                            $modalInstance.close(true);
                        }
                    },
                    function(code){
                        //处理失败后操作
                        alert("添加失败!");
                    }
                );
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        //查询用户管理列表
        $scope.searchlives = function (select){
        	$scope.selectlive = (select == undefined) ? '1':select;
//            $scope.selectlive = select;
            console.log('通过后台接口查询直播数据');
            ScheduleService.searchLive($scope.live,$scope.activeArea.id,$scope.pagination,"").then(
                function(data){
                    $scope.liveList = data.data;
                    $scope.pagination.totalItems = data.total;
                    $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                    //告诉页面数据已经加载完毕
                    $scope.getDataReady = true;
                },
                function(code) {
                    throw(code);
                }
            );
        };
        //直播课表Tree
        $scope.activeArea = {id:'',title:''};
        $scope.setActiveArea = function (node,pagination) {
           /* $scope.live = [];*/
            $scope.activeArea = angular.copy(node);
            if($scope.areaTree[0].temp){
            	$scope.live.temp = "hideOrganTree";
            }else{
            	$scope.live.temp = "";
            }
           /* $scope.activeArea = node;
            $scope.searchlives(node,pagination,"");*/
            $scope.searchlives();
            
            $timeout(function(){
                max_height = $("#rightContent-height").height();  
                console.log("右边内容高度max_height"+max_height);              
                $("#tree-root").css('max-height',function(){
                return max_height + 55;
                // alert()
            });
            },500);
        };
        //Json--Tree
        var liveTrees = function(){
            TreeService.livetree().then(
                function(data){
                    $scope.areaTreecopy = data;
                    $scope.areaTreecopyid = data[0].id;
                    $scope.areaTree = $scope.areaTreecopy;
                    initFirstNode($scope.areaTree);
                    /*if($scope.areaTree[0].attribute === 'N'){
                        $scope.activeArea.id = $scope.areaTree[0].id;
                        $scope.searchlives('1');
                    }*/
                },
                function(){
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
            if($scope.selectlive === '1'){
                $scope.searchlives($scope.live,_pagination,""); //调用查询接口
            }else{
                $scope.select = "";
                $scope.searchlives($scope.live,_pagination,""); //调用查询接口
            }

        };

        window.onresize = function () {
            min_height =  window.innerHeight;
            $("#rightContent-height").css('min-height',function(){
                return min_height - 320;
             });
            $("#tree-root").css('max-height',function(){               
                return window.innerHeight - 300;                
            });                          
        }
        var setTreeHeight = function(){               
                                 
            $timeout(function(){
                min_height =  window.innerHeight;
                // alert("window.innerHeight"+window.innerHeight);
                $("#rightContent-height").css('min-height',function(){
                    return min_height - 320;
                 });             
            },1000);

            $timeout(function(){
                max_height = $("#rightContent-height").height(); 
                 // alert("窗体高度mix_height"+$('#rightContent-height').css('min-height')); 
                $("#tree-root").css('max-height',function(){
                    return max_height + 50;                
                  });             
            },1000);
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
            $scope.searchlives();
        };
        var init = function(){
            $scope.selectlive = '';
            //树的初始化
            liveTrees();
            $scope.sort = {
            		"date":"asc",
            		"weekdate":"asc",
            		"sameclass":"asc",
            		"areaname":"asc",
            		"username":"asc",
            		"subject":"asc"
            		
            }
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
                order:"",
                sort:""
            };

            $scope.$parent.active = 0;
            $scope.checkMode = 'play';
            /*$scope.liveList = [];*/
            $scope.live = {
                    'temp':''
                };
            $scope.hideAdvancedSearch = true;
            $scope.areaTree = [];
            userTrees("trees",'');
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_scheduleManagements_live_url_view') === -1){
//              alert("对不起！您没有权限访问。")
                console.log("+++++++直播课表  您没有权限+++++++++");
                //没有权限的话，跳转到下一个功能块
                $location.path('scheduleManagements/week'); 
            }
            /*var arrAuthentic=['auth_scheduleManagements_live_url_view','auth_scheduleManagements_week_url_view','auth_scheduleManagements_edit_url_view','auth_scheduleManagements_myschedule_url_view','auth_scheduleManagements_manual_url_view'];
            for(var i=0;i<arrAuthentic.length;i++){
                var tempAuthentic=arrAuthentic[i];
                if($scope.global.user.authenticatid.indexOf(tempAuthentic)>=0){
                    switch (i)
                    {
                    case 0:
                       $location.path('classrooms/live');
                       break;
                    case 1:
                       $location.path('classrooms/week');
                       break;
                    case 2:
                       $location.path('classrooms/edit');
                       break;
                    case 3:
                       $location.path('classrooms/myschedule');
                       break; 
                    case 4:
                       $location.path('classrooms/handleRecord');
                       break;
                    }
                    break ;
                }
            }*/
        };
        setTreeHeight();

            init();
        }]);
});
