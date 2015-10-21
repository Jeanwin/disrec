define(['app'], function (app) {
    app.registerController('ScheduleManagementsmyscheduleCtrl', ['$scope','$modal','$location','ScheduleService','CodeService','TreeService' , '$timeout','TacticsService',
        function ($scope,$modal,$location,ScheduleService,CodeService,TreeService,$timeout,TacticsService) {
            //选择课类型
            var generateWeeklySchedule = function (){
                var weeklySchedule = [];
                var cnNumbers = ['零','一','二','三','四','五','六','日'];
                for (var i=0; i< 7; i++) {
                    weeklySchedule.push({
                        day: cnNumbers[String(i+1)],
                        classes:[]
                    });
                }
                return weeklySchedule;
            };
            var generateEmptySchedule = function (totalClassCount, morningClassCount) {
                console.log(totalClassCount,parseInt(morningClassCount));
                var schedule = [];
                for(var i=0; i< totalClassCount; i++) {
                    schedule.push({
                        classIndex: (i+1),
                        weekly:generateWeeklySchedule()
                        }
                    );
                }
//                schedule.push({
//                    classIndex: 0,
//                    weekly:[]
//                });
//
//                for(var i=0; i< (totalClassCount - parseInt(morningClassCount)); i++) {
//                    schedule.push({
//                            classIndex: (i+1),
//                            weekly:generateWeeklySchedule()
//                        }
//                    );
//                }


                return schedule;
            };
            var pushEvents = function(schedule) {
                $.each($scope.events, function(index, event){
                    schedule[event.classnum-1].weekly[parseInt(event.weekdate)-1].classes.push(event);
                });
                return schedule;
            };
            $scope.class=function(_keywords){
                $scope.live="";
                $scope.record="";
                $scope.isresource="";
                if(_keywords=== '0'){
                    $scope.showscheduletype ="0";
                }else if(_keywords=== '1'){
                    $scope.showscheduletype ="1";
                }else if(_keywords=== '2'){
                    $scope.showscheduletype ="2";
                }else if(_keywords === ''){
                    $scope.showscheduletype = '';
                    $scope.searchEvents();
                }

//                ScheduleService.searchWeektime($scope.live,$scope.record,$scope.isresource,$scope.weeks,$scope.activeArea.id).then(
//                    function(data){
//                        $scope.events=data.data;
//                        $scope.schedules = [];
//                        $scope.schedules = pushEvents(generateEmptySchedule(data.classmaxnum.maxclass, data.classmaxnum.smaxclass));
//                    },
//                    function(code) {
//                        throw(code);
//                    }
//                );
            };
            //周课表查询
            $scope.week=function(weeks){
                $scope.weeks=weeks;
                ScheduleService.searchMyWeektime($scope.live,$scope.video,$scope.isresource,$scope.weeks,$scope.activeArea.id).then(
                    function(data){
                        $scope.notnum = false;
                        $scope.events=data.data;
                        $scope.schedules = [];
                        $scope.schedules = pushEvents(generateEmptySchedule(data.classmaxnum.maxclass, data.classmaxnum.smaxclass));
                        $scope.notnum = data.data ==="";
                        console.log(JSON.stringify($scope.schedules));
                },
                    function(code) {
                        throw(code);
                    }
                );

            };
            //手动添加课表
            $scope.AddScheduleModal = function (schedule,activeArea,classDay,weeklySchedule) {
                console.log(schedule,activeArea,classDay,weeklySchedule);
                var modalInstance = $modal.open({
                    templateUrl: 'scheduleManagements/schedule.add.modal.html',
                    backdrop:'static',
                    windowClass: 'modal-lg',
                    controller: AddScheduleModalCtrl,
                    resolve: {
                        classDay: function () {
                            return classDay;
                        },
                        weeklySchedule:function(){
                            return weeklySchedule;
                        },
                        node:function(){
                            return activeArea;
                        },
                        schedule:function(){
                            return schedule
                        }
                    }
                }).result.then(
                    function(Add){
                        $scope.searchEvents();
                    },
                    function(reason){
                        console.log('reason is '+ reason);
                    }
                );

            };
            var AddScheduleModalCtrl = function ($scope, $modalInstance,growl,classDay,weeklySchedule,node,schedule) {
                $scope.scheduleWeekdate = classDay.day;
                console.log(node,classDay,weeklySchedule,schedule);
                $scope.showErrorClassTime = false;
                var selectschema = function(keywords){
                    ScheduleService.selectschema(keywords).then(
                        function(data){
                            $scope.schemaList = data;
                            $.each($scope.schemaList,function(index,schema){
                                if(schema.name === "电影+资源"){
                                    $scope.schedule.video = schema.id;
                                }
                            });
                        },
                        function(){

                        }
                    );
                };


                //将自动提示列表中选中的值赋值给自动提示框绑定的变量
                $scope.setautoMessageValue = function(autoflag, schedule, typeValue){
                    if(autoflag === "areaname") {
                        schedule.areaname = typeValue.value;
                        schedule.areaid = typeValue.id;
                        schedule.areano = typeValue.innerid;
                        $scope.hideTree = !$scope.hideTree;
                    }
                }

                //将自动提示列表中选中的值赋值给自动提示框绑定的变量
                $scope.setautoMessageValueUser = function(autoflag, schedule, typeValueUser){
                    if(autoflag === "username") {
                        schedule.username = typeValueUser.name;
                        schedule.userid = typeValueUser.id;
                        $scope.hideTreeUser = !$scope.hideTreeUser;
                    }
                }

                //将自动提示列表中选中的值赋值给自动提示框绑定的变量
                $scope.setautoMessageValueClass = function(autoflag, schedule, typeValueClass){
                    if(autoflag === "classname") {
                        schedule.deptname = typeValueClass.name;
                        schedule.deptid = typeValueClass.id;
                        $scope.hideTreeClass = !$scope.hideTreeClass;
                    }
                }


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

               $scope.schedule = {
                    live: '0',
                    livemodel: '1',
                    record: '1',
                    video:'3',
                    isupload:'0',
                    classniddlerecord: '0',
                    intercourse: '0',
                    videoupload: '0',
                    areaid: '',
                    areaname: ''
                };
                $scope.schedule.startclasstime = '1';
                $scope.schedule.endclasstime = '1';
                if(node.attribute === "Y"){
                    $scope.schedule.areaname = node.title;
                    $scope.schedule.areaid = node.id;
                    $scope.schedule.areano = node.innerid;
                }
                $scope.schedule.weeks = schedule.weeks;

                if(classDay.day === '一'){
                    $scope.num = '1';
                }if(classDay.day === '二'){
                    $scope.num = '2';
                }if(classDay.day === '三'){
                    $scope.num = '3';
                }if(classDay.day === '四'){
                    $scope.num = '4';
                }if(classDay.day === '五'){
                    $scope.num = '5';
                }if(classDay.day === '六'){
                    $scope.num = '6';
                }if(classDay.day === '七'){
                    $scope.num = '7';
                }
                //便利得到节次数
                $.each(classDay.classes,function(index,classtime){
                    $scope.schedule.startclasstime = String(classtime.classnum);
                    $scope.schedule.endclasstime = String(classtime.classnum);
                });

                $scope.schedule.weekdate = $scope.num;
                $scope.schedule.sameclass = weeklySchedule.classIndex;
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
                    var tmp = $scope.schedule.username.split(',');
                    $scope.schedule.userid = tmp[0];
                    $scope.schedule.username = tmp[1];
                };
                //获取选择班级信息
                $scope.selectClass = function() {
                    var tmp = $scope.schedule.deptname.split(',');
                    $scope.schedule.deptid = tmp[0];
                    $scope.schedule.deptname = tmp[1];
                };
                //连带检索教室名称
                $scope.searchClassname = function(aim,name){
                    var temp = aim+"";
                    var keywords = {
                        "id":aim,
                        "name":name,
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
                };
                //连带检索用户名称
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
                //查询教室是否有节次方案
                var SeclectClassroomTime = function(){
                    $scope.ClassroomTime = '';
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
                //节次时间的比较
                $scope.CompareClassTime = function(){
                    if(parseInt($scope.schedule.endclasstime) < parseInt($scope.schedule.startclasstime)){
                        $scope.showErrorClassTime = true;
                    }else{
                        $scope.showErrorClassTime = false;
                    }
                };
                //鼠标上去的时候显示节次
                $scope.showClassTimePopup = function (){
                    $scope.ClassTimePopupIsShown = true;
                    $timeout(function(){
                        $scope.ClassTimePopupIsShown = false;
                    },10)
                };

                $scope.save = function (schedule) {
                	$scope.schedule.sameclass = $scope.schedule.startclasstime +'-'+$scope.schedule.endclasstime;
                    //编辑直播课表保存接口
                        ScheduleService.createAdd($scope.schedule).then(
                            function(data){
                                if(data.id === '1'){
                                    growl.addSuccessMessage(data.operation);
                                    $modalInstance.close(true);
                                }
                                if(data.id === '0'){
                                    alert(data.operation)
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
                //添加课表--选择开课周次
                $scope.getWeek = function(keywords,week){
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
//                $scope.schedule.weeks = '';
                //提交选择的周次
                $scope.submit = function(){
                    $.each($scope.getWeeks,function(index,weektime){
                        if($scope.schedule.weeks === ''){
                            $scope.schedule.weeks =  weektime.id
                        }
                        else{
                            $scope.schedule.weeks = $scope.schedule.weeks +','+ weektime.id
                        }
                    });
                };
                //清空选择的周次
                $scope.weekCancel = function(){
                    $scope.schedule.weeks = '';
                    $.each($scope.WeeksList,function(index,week){
                        $scope.Weeksselct[index].id = '';
                    });
                    $scope.getWeeks = [];
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
        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'scheduleManagements/schedule.add.modal.html',
                controller: SaveModalCtrl,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };

        var SaveModalCtrl = function ($scope, $modalInstance, items) {
            $scope.ok = function () {
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        $scope.searchEvents = function(){
            ScheduleService.searchMyEvent($scope.live,$scope.video,$scope.isresource,$scope.weeks,$scope.activeArea.id,$scope.pagination,"").then(
                function(data){
                    $scope.notnum = false;
                    $scope.events = data.data;

                    $scope.smaxclass = String(data.classmaxnum.smaxclass);
                    $scope.schedules = [];
                    $scope.schedules = pushEvents(generateEmptySchedule(data.classmaxnum.maxclass, data.classmaxnum.smaxclass));
                    $scope.notnum = data.data ==="";

                },
                function(code) {
                    throw(code);
                }
            );
        };

//        $scope.showSchedulePopup = function (keywords){
//            console.log(keywords);
//            $scope.SchedulePopupIsShown[keywords] = true;
//            $timeout(function(){
//                $scope.SchedulePopupIsShown[keywords] = false;
//            },10)
//        };

        //Json--Tree
        var scheduleTrees = function(){
            TreeService.weekTree().then(
                function(data){
                    $scope.areaTree = data;
                    getSelectClassrooms($scope.areaTree[0]);
                },
                function(){

                }
            );
        };
        $scope.activeArea = {id:'',title:''};
        $scope.setActiveArea = function (node,pagination) {
          $scope.Treename =angular.copy(node);
            console.log($scope.Treename);
          $scope.activeArea = node;
            if(node.attribute === 'Y'){
                $scope.searchEvents();
            }

            $timeout(function(){
                max_height = $("#rightContent-height").height();  
                console.log("右边内容高度max_height"+max_height);              
                $("#tree-root").css('max-height',function(){
                return max_height + 20;
                // alert()
            });
            },500);
        };
            //获取周次接口
            $scope.selectSchedulebyWeek = function(){
                ScheduleService.selectSchedulebyweek().then(
                    function(data){
                        $scope.WeekTimeList = data;
                    },
                    function(){

                    }
                );
            };
            //初始化查询课表信息
            var getSelectClassrooms = function(node){
                if(node.attribute === "Y" && $scope.stop){
                    $scope.activeArea.id = node.id;
                    $scope.weeks=[];
                    $scope.setActiveArea(node);
                    $scope.stop = false;
                }
                if(node.nodes){
                    $.each(node.nodes, function(index, _node){
                        getSelectClassrooms(_node);
                    });
                }
            };
            //显示今天的日期
            $scope.NowTerm = function(){
                $scope.schedule = {
                    "weeks":""
                };
                ScheduleService.selectNowTerm().then(
                    function(data){
                            $scope.schedule.weeks = data.week;
                            $scope.schedule.weekdate = data.weekdate;
                            $scope.schedule.date = data.date;
                    },
                    function(){

                    }
                );
            };
            //初始化比较日期
            var date = function dateDiff(interval, date1, date2){
                var objInterval = {'D' : 1000 * 60 * 60 * 24, 'H' : 1000 * 60 * 60,
                    'M' : 1000 * 60, 'S' : 1000, 'T' : 1};
                interval = interval.toUpperCase();
                var dt1 = Date.parse(date1.replace(/-/g, '/'));
                var dt2 = Date.parse(date2.replace(/-/g, '/'));
                try
                {
                    return $scope.comparedate = Math.round((dt2 - dt1) / eval('(objInterval.' + interval + ')')) > 0;
                }
                catch (e)
                {
                    return e.message;
                }
            };
            $scope.EditScheduleMessage = function(schedule){
                var modalInstance = $modal.open({
                    templateUrl: 'scheduleManagements/schedule.weekScheduleEdit.modal.html',
                    backdrop:'static',
                    windowClass: 'modal-lg',
                    controller: EditScheduleModalCtrl,
                    resolve: {
                        schedule: function () {
                            return schedule;
                        },
                        /*activeArea:function(){
                            return activeArea;
                        }*/
                    }
                }).result.then(
                    function(){
                        $scope.searchEvents();
                    },
                    function(reason){
                        console.log('reason is '+ reason);
                    }
                );
            };
            var EditScheduleModalCtrl = function ($scope, $modalInstance, schedule, growl) {
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
                //niuxilin 2015-1-7
//                if(activeArea.attribute === "Y"){
                    $scope.schedule.areaname = schedule.areaname;
                    $scope.schedule.areaid = schedule.areaid;
                    $scope.schedule.areano = schedule.areano;
//                }
                //分解节次向界面传值
                var temp = $scope.schedule.sameclass.split('-');
                if(temp.length === 1){
                    $scope.schedule.startclasstime = temp[0];
                    $scope.schedule.endclasstime = temp[0];
                }else{
                    $scope.schedule.startclasstime = temp[0];
                    $scope.schedule.endclasstime = temp[1];
                }

                //跳转到节次设置
                $scope.NewTermSet = function(){
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
                //TODO:  用户名称  stare
                //连带检索用户名称
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
                        },200);
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
                $scope.searchClassname = function(aim,name){
                    var temp = aim+"";
                    var keywords = {
                        "id":aim,
                        "name":name,
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
                };

                //鼠标上去的时候显示节次
                $scope.showClassTimePopup = function (){
                    $scope.ClassTimePopupIsShown = true;
                    $timeout(function(){
                        $scope.ClassTimePopupIsShown = false;
                    },10)
                };

                $scope.save = function () {

                	if($scope.schedule.startclasstime ===$scope.schedule.endclasstime){
                		$scope.schedule.sameclass = $scope.schedule.startclasstime;
                	}else{
                		$scope.schedule.sameclass = $scope.schedule.startclasstime +'-'+$scope.schedule.endclasstime;
                	}
                    //编辑直播课表保存接口
                    ScheduleService.updateweek($scope.schedule).then(
                        function(data){
                            if(data.id === '1'){
                                growl.addSuccessMessage(data.operation);
                                $modalInstance.close(true);
                            }
                            if(data.id === '0'){
                                growl.addErrorMessage(data.operation);
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
                //添加课表--选择开课周次
                $scope.getWeek = function(keywords,week){
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
//                $scope.schedule.weeks = '';
                //提交选择的周次
                $scope.submit = function(){
                    $.each($scope.getWeeks,function(index,weektime){
                    	 $scope.successSave = true;
                        if($scope.schedule.weeks === ''){
                            $scope.schedule.weeks =  weektime.id
                        }
                        else{
                            $scope.schedule.weeks = $scope.schedule.weeks +','+ weektime.id
                        }
                    });
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
                            $scope.Weeksselct = angular.copy($scope.WeeksList);
                            $.each($scope.Weeksselct,function(index,weeks){
                                weeks.id = '';
                            });
                        },
                        function(){

                        }
                    );
                };
                

                var init = function(){
                    selectschema();
                    selectClassTime();
                    $scope.selectWeeks();
                    SeclectClassroomTime();


                    //默认隐藏自动提示框内容
                    $scope.hideTree = true;
                    $scope.hideTreeUser = true;
                    $scope.hideTreeClass = true;
                };
               
                init();
            };

            //跳转到节次设置
            $scope.NewClassTimeSet = function(){
                $location.path('/scheduleManagements/Classtime');
            };

            window.onresize = function () {
                    min_height =  window.innerHeight;
                    $("#rightContent-height").css('min-height',function(){
                        return min_height - 320;
                     });
                    $("#tree-root").css('max-height',function(){ 
                        // return $("#rightContent-height").css("height") - 20;              
                        return window.innerHeight - 300;                
                    });                          
                }
                var setTreeHeight = function(){               
                                         
                    $timeout(function(){
                        max_height = $("#rightContent-height").height();  
                        min_height =  window.innerHeight;
                        // alert("window.innerHeight"+window.innerHeight);
                        $("#rightContent-height").css('min-height',function(){
                            return min_height - 320;
                         });
                         // alert("窗体高度mix_height"+$('#rightContent-height').css('min-height')); 
                        $("#tree-root").css('max-height',function(){
                            return max_height + 20;                
                          });              
                    },2000);
                };

            var init = function(){
                $scope.SchedulePopupIsShown = false;
            	$scope.showscheduletype = '';
                $scope.item = false;
                $scope.show = true;
                $scope.$parent.active = 3;
                $scope.areaTree =[];
                $scope.events =[];
                $scope.schedules = [];
                $scope.weeks=[];
                //scheduleTrees();
                $scope.stop = true;
                $scope.selectSchedulebyWeek();
                //初始化确定今天的日期
                $scope.NowTerm();
                $scope.searchEvents();
                //初始化比较日期
                date('D', '2007-5-1', '2007-04-19');

                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_scheduleManagements_myschedule_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                    console.log("+++++++周课表  您没有权限+++++++++")                  
                    $location.path('scheduleManagements/handleRecord');
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
