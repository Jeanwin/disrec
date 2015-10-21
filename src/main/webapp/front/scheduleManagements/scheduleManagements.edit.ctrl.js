define(['app','config'], function (app,config) {
    app.registerController('ScheduleManagementsEditCtrl', ['$scope',
                                '$modal',
                                '$timeout',
                                '$filter',
                                '$upload',
                                '$location',
                                'growl',
                                'ScheduleService',
                                'CodeService',
                                'SystemService',
                                'TreeService',
                                'TacticsService',
                                function ($scope,
                                          $modal,
                                          $timeout,
                                          $filter,
                                          $upload,
                                          $location,
                                          growl,
                                          ScheduleService,
                                          CodeService,
                                          SystemService,
                                          TreeService,
                                          TacticsService) {


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
        	$scope.toggleArea=!$scope.toggleArea;
        	if($scope.toggleArea == false){
        		$scope.areaTree = $scope.areaTreecopy;
        	}else{
        		$scope.areaTree = $scope.organTree;
        		$scope.scheduleList.temp = 'hideOrganTree';
        	}
        	initFirstNode($scope.areaTree);
        	
        }
    	
        //详细查询图片切换
        $scope.setCheckMode = function(mode) {
            $scope.checkMode = mode;
        };

        //点击全部选中时设置控制的单选按钮状态
        $scope.checkAllContracts = function (){
            $scope.checkAll = !$scope.checkAll;
            $.each($scope.contractList, function(index, contract){
                contract.checked = $scope.checkAll;
            });
        };
        //删除课表
        $scope.openDeleteModal = function (schedule) {
            var modalInstance = $modal.open({
                templateUrl: 'scheduleManagements/edit/schedule.delete.modal.html',
                backdrop:'static',
                controller: DeleteModalCtrl,
                resolve: {
                    schedule: function () {
                        return schedule;
                    }
                }
            }).result.then(
                function(updata){
                    $scope.searchSchedules("",$scope.setTreeid,$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };

        var DeleteModalCtrl = function ($scope, $modalInstance, schedule,growl) {
            $scope.deleteschedule = angular.copy(schedule);
            $scope.schedule = [schedule];
            $scope.ok = function () {
                console.log('通过后台接口删除操作');
                ScheduleService.DeleteEdit($scope.schedule).then(
                    function(data){
                        if(data.id === '1'){
                            growl.addSuccessMessage(data.operation);
                            $modalInstance.close(true);
                        }
                        if(data.id === '0'){
                            alert(data.operation);
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
        //导入课表
        $scope.impScheduleModal = function (TermList) {
            var modalInstance = $modal.open({
                templateUrl: 'scheduleManagements/addschedule/schedule.impSchedule.modal.html',
                backdrop:'static',
                controller: ImpScheduleModalCtrl,
                resolve: {
                    TermList: function () {
                        return TermList;
                    }
                }
            }).result.then(
                function(updata){
                    $scope.searchSchedules("",$scope.setTreeid,$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };

        var ImpScheduleModalCtrl = function ($scope, $modalInstance, TermList,growl) {
             var selectschema = function(keywords){
            	 TacticsService.code('recordType').then(
                         function(data){
                             $scope.schemaList = data;
                             $scope.impScheduleSet.video = data[0].value;
                         },
                         function(){

                         }
                     );
             };
             var selectlivemodel = function(keywords){
             	TacticsService.code('livemodel').then(
                         function(data){
                             $scope.livemodelList = data;
                             $scope.impScheduleSet.livemodel = data[0].value;
                         },
                         function(){

                         }
                     );
             };
            $scope.impScheduleSet = {
                live: '0',
                livemodel: '33',
                record: '1',
                video:'35',
                isupload:'0',
                classniddlerecord: '0',
                intercourse: '0',
                videoupload: '0'
            };
            $scope.numerror = false;
            $scope.dropSupported = true;

            $scope.file;
            $scope.progress = -1;
            $scope.upload;
            $scope.error = false;
            $scope.uploadRightAway = false;


            $scope.onFileSelect = function($files) {

                $scope.file = $files[0];

                if($files.length > 1) {
                    growl.addSuccessMessage('一次只能上传一个文件');
                }

                if($scope.file.type !== 'application/vnd.ms-excel') {
                    growl.addErrorMessage('请上传excel文件');
                    $scope.file = null;
                    return false;
                }
                $scope.progress = -1;
                if ($scope.uploadRightAway) {
                    $scope.startUpload();
                }

            };
            //导入课表
            $scope.startUpload = function () {

                $scope.impScheduleSet.termid = $scope.impScheduleSet.termname;

                var url = config.backend.ip + config.backend.base + 'rest/curriculum/curriculum/import';

                $scope.upload = $upload.upload({
                    url: url,
                    data: $scope.impScheduleSet,
                    file: $scope.file
                }).progress(function(evt) {
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('percent: ' + $scope.progress);
                }).success(function(data, status, headers, config) {
                    if(data.id === '1'){
                        growl.addSuccessMessage(data.operation);
                        $modalInstance.close(true);
                        return true;
                    }
                    if(data.id === '2'){
                        growl.addErrorMessage("部分导入失败");
                        /*$scope.ErrorNum = data.name;*/
                        $scope.ErrorNum = data.name;
                        $scope.error = true;
                       /* $modalInstance.close(true);*/
                    }
                    if(data.id === '0'){
                        growl.addErrorMessage("全部导入失败");
                        $scope.ErrorNum = data.name;
                        $scope.error = true;
                    }
                }).error(function(){
                    $scope.importerror = true;
                    growl.addErrorMessage("导入失败");
                });
            };
            //导出问题用户数据
            $scope.ExportData = function(){
                SystemService.exportData($scope.ErrorNum).then(
                    function(data){
                          $modalInstance.close(true);
//                        if(data.id === '1'){
//                            growl.addSuccessMessage('用户问题数据导出成功！');
//                            $modalInstance.close(true);
//                        }else{
//                            growl.addErrorMessage('用户问题数据导出失败！');
//                            $scope.numerror = true;
//                        }
                    },
                    function(){

                    }
                );
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.close = function () {
            	$modalInstance.close(true);
            };
            //跳转到学期设置
            $scope.NewTermSet = function(){
                $modalInstance.close(true);
//               var url ='#/termSet';
                $location.path('/scheduleManagements/termSet');
            };
            //跳转到学期设置
            $scope.NewClassTimeSet = function(){
                $modalInstance.close(true);
//               var url ='#/termSet';
                $location.path('/scheduleManagements/Classtime');
            };
//            //初始化
            var init = function(){
            	 //查询录播模式的数据字典
                selectschema();
                selectlivemodel();
                ScheduleService.selectTerm().then(
                    function(data){
                        $scope.TermList = data;
                        $.each($scope.TermList,function(index,_term){
                            if(_term.iscurrent === '1'){
                                $scope.impScheduleSet.termname = _term.id;
                            }
                        });
                    },
                    function(){

                    }
                );
//                $scope.impScheduleSet = {
//                    "id":""
//                };
            };
            init();
        };
        //删除列表信息
        $scope.delScheduleMessage = function(){
            var modalInstance = $modal.open({
                templateUrl: 'scheduleManagements/edit/schedule.ScheduleEditDelete.modal.html',
                backdrop:'static',
                controller: DelScheduleModalCtrl,
                resolve: {
                    schedule: function () {
                        $scope._temp = $filter('filter')($scope.scheduleList, {checked:true});
                        return $scope._temp;
                    }
                }
            }).result.then(
                function(){
                    $scope.searchSchedules("",$scope.setTreeid,$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        var DelScheduleModalCtrl = function($scope,$modalInstance,growl,schedule){
            $scope.schedule = schedule;
            console.log($scope.schedule);
            $scope.ok = function () {
                ScheduleService.delSchedule(schedule).then(
                    function(data){
                        if(data.id === '1'){
                            growl.addSuccessMessage(data.operation);
                            $modalInstance.close(true);
                        }
                        if(data.id === '0'){
                            alert(data.operation);
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
        //手动手动添加课表
        $scope.addScheduleModal = function (activeArea) {
            var modalInstance = $modal.open({
                templateUrl: 'scheduleManagements/edit/schedule.add.modal.html',
                backdrop:'static',
                windowClass: 'modal-lg',
                controller: AddModalCtrl,
                resolve: {
                    activeArea: function () {
                        return activeArea;
                    },
            		termName:function () {
                        return $scope.global.user.terms.termname;
                    },
                    termWeek:function () {
                        return $scope.global.user.terms.week;
                    },
                    username:function(){
                    	return $scope.global.user.loginname;
                    },
                    userid:function(){
                    	return $scope.global.user.id;
                    }
                }
            }).result.then(
                function(updata){
                    $scope.searchSchedules("",$scope.setTreeid,$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };

        var AddModalCtrl = function ($scope, $modalInstance,growl,CodeService,activeArea,termName,termWeek,username,userid) {
            $scope.showErrorClassTime = false;
            /*$scope.schedule.username = username;*/
            var i = 0;
//            $scope.dubleClick = true;
            var selectschema = function(keywords){
            	TacticsService.code('recordType').then(
                        function(data){
                            $scope.schemaList = data;
                            $scope.schedule.video = data[0].value;
                        },
                        function(){

                        }
                    );
            };

            var selectlivemodel = function(keywords){
            	TacticsService.code('livemodel').then(
                        function(data){
                            $scope.livemodelList = data;
                            $scope.schedule.livemodel = data[0].value;
                        },
                        function(){

                        }
                    );
            };
            $scope.termName = termName;
            $scope.termWeek = termWeek;
            $scope.schedule = {
                live: '0',
                livemodel: '33',
                record: '1',
                video:'35',
                isupload:'0',
                classniddlerecord: '0',
                intercourse: '0',
                videoupload: '0',
                areaid: '',
                username:username,
                userid:userid,
                areaname: ''
                	
            };

            $scope.schedule.startclasstime = '1';
            $scope.schedule.endclasstime = '1';
            //$scope.schedule.weekdate = "1";
            if(activeArea.nodes.length <= 0){
                    $scope.schedule.areaname = activeArea.title;
                    $scope.schedule.areaid = activeArea.id;
                    $scope.schedule.areano = activeArea.innerid;
            }
            //获取选择教室信息
            $scope.selectClassname = function() {
               var tmp = $scope.schedule.areaname.split(',');
                $scope.schedule.areaid = tmp[0];
                $scope.schedule.areaname =tmp[1];
                $scope.schedule.areano =tmp[2];
                //根据教室查询该教室的节次方案
                SeclectClassroomTime();
            };
            var SeclectClassroomTime = function(){
                $scope.ClassroomTime = '';
                ScheduleService.ClassroomTime($scope.schedule.areaid).then(
                    function(data){
                        $scope.showClassroomTimeError = data.length > 0;
                        if(data.length >0){
                            $.each(data,function(index,Classtime){
                                $scope.ClassroomTimeList =Classtime;
                            });
                        }else{
                        	$scope.ClassroomTimeList='';
                        }
                    },
                    function(){

                    }
                );
            };
            //获取选择教师信息
            $scope.selectTeacher = function() {
                var tmp = $scope.schedule.username.split(',');
                $scope.schedule.userid = tmp[0];
                $scope.schedule.username = tmp[1];
                $scope.schedule.userno = tmp[2];
            };
            //获取选择班级信息
            $scope.selectClass = function() {
                var tmp = $scope.schedule.deptname.split(',');
                $scope.schedule.deptid = tmp[0];
                $scope.schedule.deptname = tmp[1];
            };

            //TODO:添加课表控制器里--自动查询教室stare
            //连带检索教室名称--添加课表控制器里
            $scope.searchClassname = function(aim,name){
                var temp = aim+"";
                var keywords = {
                    "id":aim,
                    "value":name,
                    "holdFlag": false
                };
                return  CodeService.getCodes(keywords,{}).then(
                    function(data){
                        $scope.searchimpowerList = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
            }
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

            //查询全部的自动提示列表
            $scope.toggleTree = function (flag) {
                if(flag === "ImmediatelyClose"){ //type-select选中后，关闭 自动提示全部列表的代码块
                    $scope.hideTree = true;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTree = !$scope.hideTree;
                    },500);
                }
            };

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量
            $scope.setautoMessageValue = function(autoflag, schedule, typeValue){
                if(autoflag === "areaname") {
                    schedule.areaname = typeValue.value;
                    schedule.areaid = typeValue.id;
                    schedule.areano = typeValue.innerid;
                    
                    $scope.hideTree = !$scope.hideTree;
                    SeclectClassroomTime();
                }
            };

            //验证自动提示框上编辑之后的数据是否在自动提示列表中查询到
            $scope.checkAutoMessage = function(autoflag, schedule){
                //遍历自动提示列表，判断输入值是否在列表中存在，不存在的话，清空列表值
                $scope.autoMessageCheck = false;
                if(angular.isDefined($scope.searchimpowerList)){
                    if(angular.isDefined(schedule)){
                        $.each($scope.searchimpowerList, function(index, aimI){
                            if(autoflag === 'areaname'){
                                if(schedule.areaname === aimI.value){
                                    $scope.autoMessageCheck = true;
//                                return value;
                                }
                            }
                        });
                    }
                }
                //不存在的话，清空自动提示框录入值
                if(autoflag === 'areaname') {
                    if (!$scope.autoMessageCheck) {
                        schedule.areaname = "";
                    }
                }
            }
            //TODO:添加课表控制器里--自动查询教室end

            //TODO:添加课表控制器里--自动查询教师stare
            //连带检索用户名称--添加课表控制器里
            $scope.searchTeacher = function(aim,name){
                var temp = aim+"";
                var keywords = {
                    "id":aim,
                    "name":name,
                    "holdFlag": false
                };
                return  CodeService.getCodes(keywords,{}).then(
                    function(data){
                        $scope.searchUserList = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
            };
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
                    $scope.hideTreeUser = true;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTreeUser = !$scope.hideTreeUser;
                    },500);
                }
            };

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量
            $scope.setautoMessageValueUser = function(autoflag, schedule, typeValueUser){
                if(autoflag === "username") {
                    schedule.username = typeValueUser.name;
                    schedule.userid = typeValueUser.id;
                    $scope.hideTreeUser = !$scope.hideTreeUser;
                }
            }

            //验证自动提示框上编辑之后的数据是否在自动提示列表中查询到
            $scope.checkAutoMessageUser = function(autoflag, schedule){
                //遍历自动提示列表，判断输入值是否在列表中存在，不存在的话，清空列表值
                $scope.autoMessageCheck = false;
                if(angular.isDefined($scope.searchUserList)){
                    if(angular.isDefined(schedule)){
                        $.each($scope.searchUserList, function(index, aimI){
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
            //TODO:添加课表控制器里--自动查询教师end

            //TODO:添加课表控制器里--自动查询班级stare
            //连带检索班级名称
            $scope.searchClass = function(aim,name){
                var temp = aim+"";
                var keywords = {
                    "id":aim,
                    "name":name,
                    "holdFlag": false
                };
                return  CodeService.getCodes(keywords,{}).then(
                    function(data){
                        $scope.searchClassList = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
            };
            //全部查询点击行时设置高亮颜色
            $scope.setColorClass = function(typeobject){
                if(angular.isDefined($scope.searchClassList)){
                    $.each($scope.searchClassList, function(index, amy){
                        if(amy === typeobject){
                            amy.getColor = true;
                        } else {
                            amy.getColor = false;
                        }
                    })
                }
            }

            //查询全部的自动提示列表
            $scope.toggleTreeClass = function (flag) {
                if(flag === "ImmediatelyCloseClass"){ //type-select选中后，关闭 自动提示全部列表的代码块
                    $scope.hideTreeClass = true;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTreeClass = !$scope.hideTreeClass;
                    },200);
                }
            };

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量
            $scope.setautoMessageValueClass = function(autoflag, schedule, typeValueClass){
                if(autoflag === "classname") {
                    schedule.deptname = typeValueClass.name;
                    schedule.deptid = typeValueClass.id;
                    $scope.hideTreeClass = !$scope.hideTreeClass;
                }
            }

            //验证自动提示框上编辑之后的数据是否在自动提示列表中查询到
            $scope.checkAutoMessageClass = function(autoflag, schedule){
                //遍历自动提示列表，判断输入值是否在列表中存在，不存在的话，清空列表值
                $scope.autoMessageCheck = false;
                if(angular.isDefined($scope.searchClassList)){
                    if(angular.isDefined(schedule)){
                        $.each($scope.searchClassList, function(index, aimI){
                            if(autoflag === 'classname'){
                                if(schedule.deptname === aimI.name){
                                    $scope.autoMessageCheck = true;
//                                return condition;
                                }
                            }
                        });
                    }
                }
                //不存在的话，清空自动提示框录入值
                if(autoflag === 'classname') {
                    if (!$scope.autoMessageCheck) {
                        schedule.deptname = "";
                    }
                }
            }
            //TODO:添加课表控制器里--自动查询班级end

            //鼠标上去的时候显示节次
            $scope.showClassTimePopup = function (){
                $scope.ClassTimePopupIsShown = true;
                $timeout(function(){
                    $scope.ClassTimePopupIsShown = false;
                },10)
            };
            //选择周次
            $scope.selectWeeks = function(){
                ScheduleService.findWeekTimes().then(
                        function(data){
                            $scope.WeeksList = data;
                            $scope.Weeksselct = angular.copy($scope.WeeksList);
                            $.each($scope.Weeksselct,function(index,weeks){
                                weeks.id = '';
                            });
                        },
                        function(){

                        }
                    );
            };
            $scope.getWeeks = [];
            //添加课表--选择开课周次 (增加页面控制器)
            $scope.getWeek = function(keywords,week){
                $scope.successSave = true;
                $scope.changeColor = week.id;
                var a='';
                if($scope.getWeeks.length >0){
                    $.each($scope.getWeeks,function(index,getweek){
                        if(week.value === getweek.id){
                            $scope.getWeeks.splice(index,1);
                            a=index;
                            $scope.Weeksselct[keywords].id = '';
                        }
                    });
                }
                if(a==='') {
                    $scope.getWeeks.push(
                        {
                            "id": week.value
                        }
                    );
                    $scope.Weeksselct[keywords].id = week.value;
                }
            };
//            $scope.schedule.weeks = '';
            //提交选择的周次
            $scope.submit = function(){

                $scope.schedule.weeks = undefined;
                $.each($scope.getWeeks,function(index,weektime){
                    if($scope.schedule.weeks === undefined){
                        $scope.schedule.weeks =  weektime.id
                    }
                    else{
                        $scope.schedule.weeks = $scope.schedule.weeks +','+ weektime.id
                    }
                });
            };
            //清空选择的周次
            $scope.weekCancel = function(){
                $scope.schedule.weeks = undefined;
                $.each($scope.WeeksList,function(index,week){
                    $scope.Weeksselct[index].id = '';
                });
                $scope.getWeeks = [];
            };
            //跳转到节次方案设置
            $scope.NewClassTimeSet = function(){
                $modalInstance.close(true);
                $location.path('/scheduleManagements/Classtime');
            };
            //节次时间的比较
            $scope.CompareClassTime = function(){
                if(parseInt($scope.schedule.endclasstime) < parseInt($scope.schedule.startclasstime)){
                    $scope.showErrorClassTime = true;
                }else{
                    $scope.showErrorClassTime = false;
                }
            };
            $scope.save = function () {
                //将true转化为1
//                if($scope.schedule !=undefined){
//                    $scope.schedule={
//                        "subject":$scope.schedule.subject === undefined?'':$scope.schedule.subject,
//                        "areaid":$scope.schedule.areaid === undefined?'':$scope.schedule.areaid,
//                        "areaname":$scope.schedule.areaname === undefined?'':$scope.schedule.areaname,
//                        "areano":$scope.schedule.areano === undefined?'':$scope.schedule.areano,
//                        "isupload":$scope.schedule.isupload === true?'1':'0',
//                        "live":$scope.schedule.live === true?'1':'0',
//                        "livemodel":$scope.schedule.livemodel === undefined?'':$scope.schedule.livemodel,
//                        "userid":$scope.schedule.userid === undefined?'':$scope.schedule.userid,
//                        "username":$scope.schedule.username === undefined?'':$scope.schedule.username,
//                        "intercourse":$scope.schedule.intercourse === true?'1':'0',
//                        "record":$scope.schedule.record === true?'1':'0',
//                        "classniddlerecord":$scope.schedule.classniddlerecord === true?'1':'0',
//                        "deptid":$scope.schedule.deptid === undefined?'':$scope.schedule.deptid,
//                        "deptname":$scope.schedule.deptname === undefined?'':$scope.schedule.deptname,
//                        "weeks":$scope.schedule.weeks === undefined?'':$scope.schedule.weeks,
//                        "sameclass":$scope.schedule.sameclass === undefined?'':$scope.schedule.sameclass,
//                        "weekdate":$scope.schedule.weekdate === undefined?'':$scope.schedule.weekdate,
////                        "starttime":$scope.schedule.starttime === undefined?'':$scope.schedule.starttime,
////                        "endtime":$scope.schedule.endtime === undefined?'':$scope.schedule.endtime,
//                        "startclasstime":$scope.schedule.startclasstime === undefined?'':$scope.schedule.startclasstime,
//                        "endclasstime":$scope.schedule.endclasstime === undefined?'':$scope.schedule.endclasstime,
//                        "video":$scope.schedule.video === undefined?'':$scope.schedule.video,
//                        "coursedesc":$scope.schedule.coursedesc === undefined?'':$scope.schedule.coursedesc
//                    }
//                }else{
//                    $scope.schedule={
//                        "subject":"",
//                        "areaid":"",
//                        "areaname":"",
//                        "isupload":'0',
//                        "areano":"",
//                        "live":'0',
//                        "livemodel":"",
//                        "userid":"",
//                        "username":"",
//                        "intercourse":'0',
//                        "record":'0',
//                        "classniddlerecord":'0',
//                        "deptid":'',
//                        "deptname":"",
//                        "weeks":"",
//                        "sameclass":"",
//                        "weekdate":"",
////                        "starttime":"",
////                        "endtime":"",
//                        "video":"",
//                        "coursedesc":""
//                    }
//                }
            	i++;
                if($scope.schedule.startclasstime===$scope.schedule.endclasstime){
                	$scope.schedule.sameclass=$scope.schedule.startclasstime;
                }else{
                	$scope.schedule.sameclass = $scope.schedule.startclasstime +'-'+$scope.schedule.endclasstime;
                }
                //编辑直播课表保存接口
                if(i == 1){
                ScheduleService.createAdd($scope.schedule).then(
                    function(data){
                        if(data.id === '1'){
                            growl.addSuccessMessage(data.operation);
                            $modalInstance.close();
                        }
                        if(data.id === '0'){
                        	$modalInstance.close();
                        	growl.addErrorMessage("添加失败");
                        }
                    },
                    function(code){
                        //处理失败后操作
                    	$modalInstance.close();
                    	growl.addErrorMessage("添加失败");
                    }
                )};
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            //添加课表--查询节次
            var selectClassTime = function(){
                ScheduleService.findClassTime().then(
                    function(data){
                        $scope.classTimeList = data;
                    },
                    function(){

                    }
                );
            };
            var init = function(){
                //查询录播模式的数据字典
                selectschema();
                selectlivemodel();
                selectClassTime();
                $scope.selectWeeks();
                if($scope.schedule.areaname !==''){
                    SeclectClassroomTime();
                }
                //默认隐藏自动提示框内容
                $scope.hideTree = true;
                $scope.hideTreeUser = true;
                $scope.hideTreeClass = true;

            };
            init();
        };
        //手动编辑课表
        $scope.editScheduleModal = function (schedule) {
            console.log(schedule);
            var modalInstance = $modal.open({
                templateUrl: 'scheduleManagements/schedule.edit.modal.html',
                backdrop:'static',
                windowClass: 'modal-lg',
                controller: EditScheduleModalCtrl,
                resolve: {
                    schedule: function () {
                        return schedule;
                    }
                }
            }).result.then(
                function(){
                    $scope.searchSchedules("",$scope.setTreeid,$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        var EditScheduleModalCtrl = function ($scope, $modalInstance, schedule, growl) {
        	var i = 0;
            $scope.successSave = false;
            $scope.showErrorClassTime = false;
            $scope.schedule = angular.copy(schedule);
            var selectschema = function(keywords){
            	TacticsService.code('recordType').then(
                        function(data){
                            $scope.schemaList = data;
                        },
                        function(){

                        }
                    );
            };
            var selectlivemodel = function(keywords){
            	TacticsService.code('livemodel').then(
                        function(data){
                            $scope.livemodelList = data;
                        },
                        function(){

                        }
                    );
            };
            //分解节次向界面传值
            var temp = $scope.schedule.sameclass.split('-');
            if(temp.length === 1){
                $scope.schedule.startclasstime = temp[0];
                $scope.schedule.endclasstime = temp[0];
            }else{
                $scope.schedule.startclasstime = temp[0];
                $scope.schedule.endclasstime = temp[1];
            }


            $scope.showClassTimePopup = function (){
                $scope.ClassTimePopupIsShown = true;
                $timeout(function(){
                    $scope.ClassTimePopupIsShown = false;
                },10)
            };


//TODO:自动提示列表 stare

            //查询时需要返回值 --接受人、最终接受人、续转合同代码查询
            $scope.searchClassname = function(aim,name){
                var temp = aim+"";
                var keywords = {"id":aim,"value":name, "holdFlag": false};
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
            };

            //查询全部的自动提示列表
            $scope.toggleTree = function (flag) {
                if(flag === "ImmediatelyClose"){ //type-select选中后，关闭 自动提示全部列表的代码块
                    $scope.hideTree = true;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTree = !$scope.hideTree;
                    },200);
                }
            };

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量
            $scope.setautoMessageValue = function(autoflag, schedule, typeValue){
                $scope.successSave = true;
                if(autoflag === "areaname") {
                    schedule.areaname = typeValue.value;
                    schedule.areaid = typeValue.id;
                    schedule.areano = typeValue.innerid;
                    
                    $scope.hideTree = !$scope.hideTree;
                    SeclectClassroomTime();
                }
            };

            //验证自动提示框上编辑之后的数据是否在自动提示列表中查询到
            $scope.checkAutoMessage = function(autoflag, schedule){
                //遍历自动提示列表，判断输入值是否在列表中存在，不存在的话，清空列表值
                $scope.autoMessageCheck = false;
                if(angular.isDefined($scope.searchimpowerList)){
                    if(angular.isDefined(schedule)){
                        $.each($scope.searchimpowerList, function(index, aimI){
                            if(autoflag === 'areaname'){
                                if(schedule.areaname === aimI.value){
                                    $scope.autoMessageCheck = true;
//                                return value;
                                }
                            }
                        });
                    }
                }
                //不存在的话，清空自动提示框录入值
                if(autoflag === 'areaname') {
                    if (!$scope.autoMessageCheck) {
                        schedule.areaname = "";
                    }
                }
            }

//TODO:自动提示列表 End

            //跳转到节次设置
            $scope.NewClassTimeSet = function(){
                $modalInstance.close(true);
                $location.path('/scheduleManagements/Classtime');
            };
            //获取选择教室信息
            $scope.selectClassname = function() {
                var tmp = $scope.schedule.areaname.split(',');
                $scope.schedule.areaid = tmp[0];
                $scope.schedule.areaname =tmp[1];
                $scope.schedule.areano =tmp[2];
                //根据教室查询该教室的节次方案
                SeclectClassroomTime();
            };
            //获取选择教师信息
            $scope.selectTeacher = function() {
                console.log($scope.schedule.username);
                var tmp = $scope.schedule.username.split(',');
                $scope.schedule.userid = tmp[0];
                $scope.schedule.username = tmp[1];
            };
            //获取选择班级信息
            $scope.selectClass = function() {
                console.log($scope.schedule.deptname);
                var tmp = $scope.schedule.deptname.split(',');
                $scope.schedule.deptid = tmp[0];
                $scope.schedule.deptname = tmp[1];
            };
            //TODO:自动提示 用户名称stare
            //连带检索用户名称--编辑控制器里
            $scope.searchTeacher = function(aim,name){
                var temp = aim+"";
                var keywords = {
                    "id":aim,
                    "name":name,
                    "holdFlag": false
                };
                return  CodeService.getCodes(keywords,{}).then(
                    function(data){
                        $scope.searchUserList = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
                $scope.toggleTreeUser("");
            };
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
                    $scope.hideTreeUser = true;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTreeUser = !$scope.hideTreeUser;
                    },500);
                }
            };

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量
            $scope.setautoMessageValueUser = function(autoflag, schedule, typeValueUser){
                $scope.successSave = true;
                if(autoflag === "username") {
                    schedule.username = typeValueUser.name;
                    schedule.userid = typeValueUser.id;
                    $scope.hideTreeUser = !$scope.hideTreeUser;
                }
            }

            //验证自动提示框上编辑之后的数据是否在自动提示列表中查询到
            $scope.checkAutoMessageUser = function(autoflag, schedule){
                //遍历自动提示列表，判断输入值是否在列表中存在，不存在的话，清空列表值
                $scope.autoMessageCheck = false;
                if(angular.isDefined($scope.searchUserList)){
                    if(angular.isDefined(schedule)){
                        $.each($scope.searchUserList, function(index, aimI){
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
            //TODO: 自动提示 用户名称END

            //TODO: 自动提示 班级stare
            //连带检索班级名称
            $scope.searchClass = function(aim,name){
                var temp = aim+"";
                var keywords = {
                    "id":aim,
                    "name":name,
                    "holdFlag": false
                };
                return  CodeService.getCodes(keywords,{}).then(
                    function(data){
                        $scope.searchClassList = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
            };
            //全部查询点击行时设置高亮颜色
            $scope.setColorClass = function(typeobject){
                if(angular.isDefined($scope.searchClassList)){
                    $.each($scope.searchClassList, function(index, amy){
                        if(amy === typeobject){
                            amy.getColor = true;
                        } else {
                            amy.getColor = false;
                        }
                    })
                }
            }

            //查询全部的自动提示列表
            $scope.toggleTreeClass = function (flag) {
                if(flag === "ImmediatelyCloseClass"){ //type-select选中后，关闭 自动提示全部列表的代码块
                    $scope.hideTreeClass = true;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTreeClass = !$scope.hideTreeClass;
                    },200);
                }
            };

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量
            $scope.setautoMessageValueClass = function(autoflag, schedule, typeValueClass){
                $scope.successSave = true;
                if(autoflag === "classname") {
                    schedule.deptname = typeValueClass.name;
                    schedule.deptid = typeValueClass.id;
                    $scope.hideTreeClass = !$scope.hideTreeClass;
                }
            }

            //验证自动提示框上编辑之后的数据是否在自动提示列表中查询到
            $scope.checkAutoMessageClass = function(autoflag, schedule){
                //遍历自动提示列表，判断输入值是否在列表中存在，不存在的话，清空列表值
                $scope.autoMessageCheck = false;
                if(angular.isDefined($scope.searchClassList)){
                    if(angular.isDefined(schedule)){
                        $.each($scope.searchClassList, function(index, aimI){
                            if(autoflag === 'classname'){
                                if(schedule.deptname === aimI.name){
                                    $scope.autoMessageCheck = true;
//                                return condition;
                                }
                            }
                        });
                    }
                }
                //不存在的话，清空自动提示框录入值
                if(autoflag === 'classname') {
                    if (!$scope.autoMessageCheck) {
                        schedule.deptname = "";
                    }
                }
            }

            //TODO: 自动提示 班级end

            //连带检索教室名称
//            $scope.searchClassname = function(aim,value){
//                var temp = aim+"";
//                var keywords = {
//                    "id":aim,
//                    "value":value,
//                    "holdFlag": false
//                };
//                return  CodeService.getCodes(keywords,{}).then(
//                    function(data){
//                        $scope.searchimpowerList = data;
//                        return data;
//                    },
//                    function(code){
//                        return [];
//                    }
//                );
//            };
            //校验节次时间的大小
            $scope.CompareClassTime = function(){
                if(parseInt($scope.schedule.endclasstime) < parseInt($scope.schedule.startclasstime)){
                        $scope.showErrorClassTime = true;
                }else{
                    $scope.showErrorClassTime = false;
                }
            };
            $scope.save = function () {

                
                if($scope.schedule.startclasstime===$scope.schedule.endclasstime){
                	$scope.schedule.sameclass = $scope.schedule.startclasstime;
                }else{
                	$scope.schedule.sameclass = $scope.schedule.startclasstime +'-'+$scope.schedule.endclasstime;
                }
                i++;
                if(i == 1){
                //编辑直播课表保存接口
                ScheduleService.createEdit($scope.schedule).then(
                    function(data){
                        if(data.id === '1'){
                            growl.addSuccessMessage(data.operation);
                            $modalInstance.close(true);
                        }
                        if(data.id === '0'){
                            growl.addErrorMessage(data.operation);
                            $modalInstance.dismiss('cancel');
                        }
                    },
                    function(code){
                            //处理失败后操作
                            alert("添加失败!");
                    }
                ); }
            };
           

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            var selectClassTime = function(){
                ScheduleService.findClassTime().then(
                    function(data){
                        $scope.classTimeList = data;
                    },
                    function(){

                    }
                );
            };
            //根据教室查询该教室的节次方案
            var SeclectClassroomTime = function(){
                ScheduleService.ClassroomTime($scope.schedule.areaid).then(
                    function(data){
                        $scope.showClassroomTimeError = data.length > 0;
                        if(data.length >0){
                            $.each(data,function(index,Classtime){
                                $scope.ClassroomTimeList =Classtime;
                            });
                        }
                    },
                    function(){

                    }
                );
            };
            $scope.getWeeks = [];
            //添加课表--选择开课周次（编辑页面控制器）
            $scope.getWeek = function(indexMessage,weekObject){
                //判断遍历的索引跟传进来的索引，如果相同，则判断值，如果值为空串，则将传进来的对象id赋值过去，否则执行splice操作
                if(angular.isDefined($scope.Weeksselct)){
                    $.each($scope.Weeksselct, function(index, wsParam){
                        if(index === indexMessage){
                            if(wsParam.id === ""){
                                wsParam.id = weekObject.id;
                            }else {
                                //不能splice掉，只能将值赋为空串，否则，保存选中数据的时候，值不正确[很重要]
                                wsParam.id = "";
//                                $scope.Weeksselct.splice(index, 1);
                            }
                        }
                    });
                }
            };
            //$scope.schedule.weeks = '';
            //提交选择的周次
            $scope.submit = function(){
                $scope.successSave = true;
                //判断遍历的索引跟传进来的索引，如果相同，则判断值，如果值为空串，则将传进来的对象id赋值过去，否则执行splice操作
                var checkData = "";
                if(angular.isDefined($scope.Weeksselct)){
                    $.each($scope.Weeksselct, function(index, wsParam){
                        if(wsParam.id === ""){
                        }else {
                            if(checkData === ""){
                                checkData = wsParam.value ;
                            } else {
                                checkData = checkData + "," + wsParam.value ;
                            }
                        }
                    });
                };

                //将处理好的值放到开课周字段上
                $scope.schedule.weeks = checkData;

            };
            //清空选择的周次
            $scope.weekCancel = function(){
                $scope.schedule.weeks = '';
                $.each($scope.WeeksList,function(index,week){
                    $scope.Weeksselct[index].id = '';
                });
                $scope.getWeeks = [];
            };
            //选择周次
            $scope.selectWeeks = function(){
                ScheduleService.findWeekTimes().then(
                    function(data){
                        $scope.WeeksList = data;

                        //预处理Weeksselct数据，用于对比显示周列表数据
                        $scope.Weeksselct = angular.copy($scope.WeeksList);
                        console.log("scheduleweeks" + $scope.scheduleweeks);
                        $scope.scheduleweeks = $scope.scheduleweeks.split(",");

                        //记录开课周字段在开课周列表中的索引位置
                        $scope.getIndexArray = [];
                        if(angular.isDefined($scope.scheduleweeks)){
                            $.each($scope.scheduleweeks, function(index, sw){
                                var shutdownFlag = false;
                                $.each($scope.Weeksselct,function(index,weeks) {
                                    if (sw === weeks.id) {
                                        weeks.id = sw;
                                        shutdownFlag = true;
                                        console.log(index);
                                        $scope.getIndexArray.push(index);
                                        return false;
                                    } else {
                                        if(shutdownFlag){
                                            return false;
                                        }
                                    }
                                });
                            });
                        }
                        //遍历开课周列表数据，并且保留列表中与索引数组索引相同的数据值，其他数据的id全置为空
                        $.each($scope.Weeksselct,function(index,weeks) {
                            //内层循环，挨个取出索引数组,然后判断索引是否存在，如果存在的话，将标志位isExistence设置为true,跳出循环，然后保存
                            var isExistence = false;
                            for (var i=0; i<$scope.getIndexArray.length; i++)
                            {
                                //保证一个索引只匹配一个值
                                if($scope.getIndexArray[i] === index){
                                    isExistence = true;
                                    break;
                                }
                            }
                            //如果不存在的话，将该对象的id置为空串
                            if(!isExistence){
                                weeks.id = "";
                            }
                        });

                    },
                    function(){

                    }
                );
            };
            var init = function(){
                $scope.scheduleweeks = angular.copy($scope.schedule.weeks);
                $scope.num = '';
                selectschema();
                selectlivemodel();
                selectClassTime();
                $scope.selectWeeks();
                SeclectClassroomTime();

                //默认初始化开课周列表与开课周字段比对中间变量
                $scope.Weeksselct = [];

                //默认隐藏自动提示框内容
                $scope.hideTree = true;
                $scope.hideTreeUser = true;
                $scope.hideTreeClass = true;
            };
            init();
        };
        //点击全部选中时设置控制的单选按钮状态
        $scope.checkAllEdits = function (){
            $scope.checkAll = !$scope.checkAll;
            $.each($scope.scheduleList, function(index, schedule){
                schedule.checked = $scope.checkAll;
            });
        };
        $scope.searchSchedules = function (select){
        	$scope.selectscheduleEdit = (select == undefined) ? '1':select;
           /* $scope.selectscheduleEdit = select;*/
            console.log('通过后台接口查询课表');
            ScheduleService.searchSchedule($scope.schedule,$scope.activeArea.id,$scope.pagination,"").then(
                function(data){
                    $scope.scheduleList = data.data;
                    $scope.pagination.totalItems = data.total;
                    $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                },
                function(){

                }
            );
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
                if($scope.selectscheduleEdit === '1'){
                    $scope.searchSchedules(); //调用查询接口
                }else{
                    $scope.schedule = '';
                    $scope.searchSchedules(); //调用查询接口
                }

            };
        };
        $scope._temp=[];
        //监视contractList中是否有元素被改变状态
        $scope.$watch('scheduleList', function(){
            //监测是否有元素被选中
            $scope._temp = $filter('filter')($scope.scheduleList, {checked:true});
            $scope.selectedCount = $scope._temp.length;
            if($scope.selectedCount === $scope.scheduleList.length)
                $scope.checkAll = true;
            else
                $scope.checkAll = false;
        },true);

        //显示课表编辑树数据
        var editTrees = function(){
            TreeService.editTree().then(
                function(data){
                    $scope.areaTree = data;
                    $scope.areaTreecopy = data;
                    $scope.areaTree = $scope.areaTreecopy;
                    initFirstNode($scope.areaTreecopy)
                    /*if($scope.areaTree[0].attribute === 'N'){
                        $scope.activeArea.id = $scope.areaTree[0].id;
                        $scope.searchSchedules("",$scope.setTreeid,$scope.pagination,"");
                    }*/
                },
                function(){
                }
            );
        };
        //当前区域显示
        $scope.activeArea = {id:'',title:''};
        $scope.setActiveArea = function (node,pagination) {
            /*$scope.schedule = "";*/
            $scope.activeArea = angular.copy(node);
            
            if($scope.areaTree[0].temp){
            	$scope.schedule.temp = "hideOrganTree";
            }else{
            	$scope.schedule.temp = "";
            }
            $scope.searchSchedules();

            $timeout(function(){
                max_height = $("#rightContent-height").height();  
                console.log("右边内容高度max_height"+max_height);              
                $("#tree-root").css('max-height',function(){
                return max_height + 55;
                // alert()
            });
            },300);
        };
        //开课周数据字典
        $scope.StartWeek = function(){
            ScheduleService.startweek().then(
                function(data){
                    $scope.startweekList = data;
                },
                function(){

                }
            );
        };
        //时间排序查询列表，sortTime方法，目前用不到了，还未注掉，留作参考用
        $scope.sortTime = function(){
            if($scope.schedule.sort === '0'){
                $scope.schedule.sort = '1';
            }
            else{
                $scope.schedule.sort = '0';
            }
            $scope.searchSchedules();
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
            $scope.searchSchedules();
        };

        window.onresize = function () {
            min_height =  window.innerHeight;
            $("#rightContent-height").css('min-height',function(){
                return min_height - 320;
             });
            $("#tree-root").css('max-height',function(){               
                return window.innerHeight - 260;                
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
                $("#tree-root").css('max-height',function(){
                    return max_height + 70;                
                  });              
            },1000);
        };

        var init = function(){
            $scope.selectscheduleEdit = '';
            $scope.changeColor = false;
            //下面的属性，目前用不到了
            $scope.schedule = {
                "sort":"0"
            };
            $scope.sort = {
            		"areaname":"asc",
            		"username":"asc",
            		"subject":"asc",
            		"deptname":"asc",
            		"weeks":"asc",
            		"weekdate":"asc",
            		"sameclass":"asc",
            		"live":"asc",
            		"record":"asc"
            		
            }
            //开课周数据字典
            $scope.StartWeek();
            editTrees();
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

            $scope.$parent.active = 2;
            $scope.checkMode = 'play';
            $scope.scheduleList = [];
            $scope.schedule={
                    'temp':''
            };
            $scope.hideAdvancedSearch = true;
            userTrees("trees",'');
            $scope.areaTree = [];
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_scheduleManagements_edit_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++课表编辑  您没有权限+++++++++");
                //没有权限的话，跳转到下一个功能块
                $location.path('scheduleManagements/myschedule');
            };
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
