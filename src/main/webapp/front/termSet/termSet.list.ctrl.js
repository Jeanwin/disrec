define(['app','config'], function (app,config) {
    app.registerController('TermSetCtrl', ['$scope','$modal','growl','ScheduleService' , function ($scope,$modal,growl,ScheduleService) {

        //学期设置
        var systemusers = function(keywords, pagination, user) {
            ScheduleService.searchTermSet(keywords, pagination, user).then(
                function (data) {
                    $scope.termsets = data.data;
                    pagination.totalItems=data.total;
                    $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                },
                function () {

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
                systemusers($scope.termset,_pagination,""); //调用查询接口
            };
        };
        //编辑新学期
        $scope.editTermModal = function (termset) {
            var modalInstance = $modal.open({
                templateUrl: 'termSet/list/termSet.add.modal.html',
                backdrop:'static',
                controller: EditTermModalCtrl,
                resolve: {
                    termset: function () {
                        return termset;
                    }
                }
            }).result.then(
                function(updata){
                    systemusers("",$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        var EditTermModalCtrl = function ($scope, $modalInstance, termset,growl) {
            $scope.termset=angular.copy(termset);
            $scope.editingMode = termset? true:false;
             var copy = $scope.termset.termname;
            //添加教室--学期名称--后台校验
            $scope.checktermName = function(){
                var termdata = {
                    termname : $scope.termset.termname
                };
                if(angular.isDefined($scope.termset.termname) && $scope.termset.termname !== '' && copy !== $scope.termset.termname){
                    ScheduleService.CheckAreaName(termdata).then(
                        function(data){
                            $scope.showTermNameError = data.id === '0';
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
                }
            };
            //添加教室--开始时间和开课周--后台校验
            $scope.checkTimeandWeek = function(){
                var timedata = {
                    termname : $scope.termset.startday,
                    weeks : $scope.termset.weeks
                };
                if(timedata.termname !== undefined && timedata.weeks !== undefined){
                    ScheduleService.CheckAreaTimeName(timedata).then(
                        function(data){
                            $scope.showTimeNameError = data.id >0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
                }
            };
            //编辑学期设置保存接口
            $scope.ok = function (termset) {
                ScheduleService.createEditTerm(termset).then(
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
        //添加新学期
        $scope.addTermModal = function (termset) {
            var modalInstance = $modal.open({
                templateUrl: 'termSet/list/termSet.add.modal.html',
                backdrop:'static',
                controller: AddModalCtrl,
                resolve: {
                    termset: function () {
                        return termset;
                    }
                }
            }).result.then(
                function(updata){
                    systemusers("",$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };

        var AddModalCtrl = function ($scope, $modalInstance, termset,growl) {
            $scope.editingMode = termset? true:false;

            //添加教室--学期名称--后台校验
            $scope.checktermName = function(termset){
                $scope.termset = termset;
                var termdata = {
                    termname : $scope.termset.termname
                };
                if($scope.termset.termname !== ''){
                    ScheduleService.CheckAreaName(termdata).then(
                        function(data){
                             $scope.showTermNameError = data.id === '0';
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
                }
            };

            //添加教室--开始时间和开课周--后台校验
            $scope.checkTimeandWeek = function(termset){
                $scope.termset = termset;
                var timedata = {
                    startday : $scope.termset.startday,
                    weeks : $scope.termset.weeks
                };
                if(timedata.startday !== undefined && timedata.weeks !== undefined){
                    ScheduleService.CheckAreaTimeName(timedata).then(
                        function(data){
                             $scope.showTimeNameError = data.id === '0';
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
                }
            };

            //添加教室--选择周数--后台校验
//            $scope.checkweekName = function(termset){
//                $scope.termset = termset;
//                var weekdata = {
//                    termname : $scope.termset.weeks
//                };
//                if($scope.termset.weeks !== ''){
//                    ScheduleService.CheckAreaWeekName(weekdata).then(
//                        function(data){
//                             $scope.showTimeWeekError = data >0;
//                        },
//                        function(code){
//                            growl.addErrorMessage('发生意外错误');
//                        }
//                    );
//                }
//            };

            $scope.ok = function (termset) {
                //编辑学期设置保存接口
                ScheduleService.createAddTerm(termset).then(
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
        //添加学期控制器
        var AddTermModalCtrl = function ($scope, $modalInstance, termset,growl) {
            $scope.termset=termset;
            $scope.editingMode = termset? true:false;

            //编辑学期设置保存接口
            $scope.createEditTerm = function(termset){
                ScheduleService.createEditTerm(termset).then(
                    function(data){
                        growl.addSuccessMessage('区域信息已更新');
                        $modalInstance.close(true);
                    },
                    function(code){
                        //处理失败后操作
                        alert("添加失败!");
                    }
                );
            };
            $scope.ok = function (termset) {
                $modalInstance.close(
                    function(){
                        $scope.createEditTerm(termset);
                    }
                );
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
         //设定当前学期
        $scope.currentSemester = function (termname) {
            var modalInstance = $modal.open({
                templateUrl: 'termSet/list/term.current.modal.html',
                backdrop:'static',
                controller: CurrentTermModalCtrl,
                resolve: {
                    termname: function () {
                        return termname;
                    }
                }
            }).result.then(
                function(updata){
                    systemusers("",$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        var CurrentTermModalCtrl = function ($scope, $modalInstance, termname,growl) {
            $scope.termname = termname;
            $scope.ok = function () {
                //设定当前学期接口
                    ScheduleService.createCurrentTerm(termname).then(
                        function(data){
                            growl.addSuccessMessage('区域信息已更新');
                            $modalInstance.close(true);
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
        var init = function(){
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
                lastText: config.pagination.lastText
            };
            $scope.$parent.active = 1;
            $scope.termsets =[];

            systemusers("",$scope.pagination,"");
        };

        init();
      }]);
});
