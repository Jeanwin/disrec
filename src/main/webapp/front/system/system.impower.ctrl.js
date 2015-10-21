define(['app',
    'config'
], function (app,config) {
    app.registerController('SystemImpowerCtrl', ['$scope','$modal','$location','$timeout','$filter','growl','SystemService' ,
        function ($scope,$modal,$location,$timeout,$filter,growl,SystemService) {
        //点击添加管理员按钮 弹出弹框
        $scope.addimpower = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'system/impower/system.impower.modal.html',
                backdrop:'static',
                controller: addModalInstanceCtrl,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            }).result.then(
                function(news){
                    //界面初始化
                    $scope.systemimpowers("",$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        //点击添加管理员按钮 弹出弹框-控制器
        var addModalInstanceCtrl = function ($scope, $modalInstance, growl) {
            $scope.saves = function (name) {
                var saveNameList = name.split("-");
                $scope.saveNameList.loginname = saveNameList[0];
                $scope.saveNameList.name = saveNameList[1];
                $scope.saveNameList.scopeList =  $filter('filter')($scope.classroomList, {checkbox:true});
                var  institutionsList= $filter('filter')($scope.institutionList, {checkbox:true});
                if(institutionsList.length > 0){
                    $scope.saveNameList.scopeList.push(institutionsList[0]);
                }
                $scope.saveNameList.roleList = $filter('filter')($scope.sysroleList, {checkbox:true});
                SystemService.add_Impower($scope.saveNameList).then(
                    function(data){
                        growl.addSuccessMessage('区域信息已更新');
                        $modalInstance.close();
                    },
                    function(){

                    }
                );
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.searchImpowers = function(name){
                return  SystemService.search_impowers(name).then(
                    function(data){
                        $scope.searchimpowerList = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
            };
            //获取选择人物信息
            $scope.searchImpowerName = function(name){
                var names = name.split("-");
                var impowerName = $filter('filter')($scope.searchimpowerList, {loginname:names[0]});
                $.each($scope.classroomList, function (index1, classroom) {
                    $.each(impowerName[0].scopeList, function (index2, scope) {
                        if(classroom.rangeid === scope.rangeid && classroom.scopetype === scope.scopetype){
                            $scope.classroomList[index1].checkbox = true;
                        }
                    });
                });
                $.each($scope.institutionList, function (index1, institution) {
                    $.each(impowerName[0].scopeList, function (index2, scope) {
                        if(institution.rangeid === scope.rangeid &&  institution.scopetype === scope.scopetype){
                            $scope.institutionList[index1].checkbox = true;
                        }
                    });
                });
                $.each($scope.sysroleList, function (index1, sysrole) {
                    $.each(impowerName[0].roleList, function (index2, role) {
                        if(sysrole.id === role.id){
                            $scope.sysroleList[index1].checkbox = true;
                        }
                    });
                });
            };
            //教室，机构范围
            $scope. rangeViewScope = function(){
                SystemService.rangeView_scope().then(
                    function(data){
                        $scope.classroomList = $filter('filter')(data, {scopetype:'1'});//教室范围
                        $scope.institutionList = $filter('filter')(data, {scopetype:'2'});//机构范围
                    },
                    function(){

                    }
                );
            };
            //角色范围
            $scope. sysroleRoles = function(){
                SystemService.sysrole_roles().then(
                    function(data){
                        $scope.sysroleList = data;
                    },
                    function(){

                    }
                );
            };
            var init = function(){
                $scope. sysroleRoles();
                $scope. rangeViewScope();
                $scope.saveNameList = {};
                $scope.impowerList = [];
            };
            init();
        };
        //点击编辑管理员按钮 弹出弹框
        $scope.editimpower = function (impower) {
            console.log(impower);
            var modalInstance = $modal.open({
                templateUrl: 'system/impower/system.impower.edit.modal.html',
                backdrop:'static',
                controller: editModalInstanceCtrl,
                resolve: {
                    impower: function () {
                        return impower;
                    }
                }
            }).result.then(
                function(news){
                    //界面初始化
                    $scope.systemimpowers("",$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        //点击编辑管理员按钮 弹出弹框-控制器
        var editModalInstanceCtrl = function ($scope, $modalInstance, growl,impower) {
            $scope.impower=angular.copy(impower);
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.searchImpowers = function(name){
                return  SystemService.search_impowers(name).then(
                    function(data){
                        $scope.searchimpowerList = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
            };
            $scope.editImpowersOk = function (name) {
                $scope.editNameList.loginname = $scope.impower.loginname;
                $scope.editNameList.name = name;
                $scope.editNameList.scopeList =  $filter('filter')($scope.classroomList, {checkbox:true});
                var  institutionsList= $filter('filter')($scope.institutionList, {checkbox:true});
                if(institutionsList.length > 0){
                    $scope.editNameList.scopeList.push(institutionsList[0]);
                }
                $scope.editNameList.roleList = $filter('filter')($scope.sysroleList, {checkbox:true});
                SystemService.add_Impower($scope.editNameList).then(
                    function(data){
                        growl.addSuccessMessage('用户授权修改成功!');
                        $modalInstance.close();

                    },
                    function(){

                    }
                );
            };
            //教室，机构范围
            $scope. editrangeViewScope = function(){
                SystemService.rangeView_scope().then(
                    function(data){
                        $scope.classroomList = $filter('filter')(data, {scopetype:'1'});//教室范围
                        $scope.institutionList = $filter('filter')(data, {scopetype:'2'});//机构范围
                        $scope.edit_impower();
                    },
                    function(){

                    }
                );
            };

            $scope.edit_impower = function(){
                $.each($scope.classroomList, function (index1, classroom) {
                    $.each( $scope.impower.scopeList, function (index2, scope) {
                        if(classroom.rangeid === scope.rangeid && classroom.scopetype === scope.scopetype){
                            $scope.classroomList[index1].checkbox = true;
                        }
                    });
                });
                $.each($scope.institutionList, function (index1, institution) {
                    $.each( $scope.impower.scopeList, function (index2, scope) {
                        if(institution.rangeid === scope.rangeid &&  institution.scopetype === scope.scopetype){
                            $scope.institutionList[index1].checkbox = true;
                        }
                    });
                });
                $timeout(function(){
                $.each($scope.sysroleList, function (index1, sysrole) {
                    $.each( $scope.impower.roleList, function (index2, role) {
                        if(sysrole.id === role.id){
                            $scope.sysroleList[index1].checkbox = true;
                        }
                    });
                });
                },100);
            };
            var init = function(){
                //角色范围
                    SystemService.sysrole_roles().then(
                        function(data){
                            $scope.sysroleList = data;

                        },
                        function(){

                        }
                    );

                $scope. editrangeViewScope();
                $scope.editNameList = {};

            };
            init();
        };

        //权限管理列表查询  通过Json接口获得数据
        $scope.systemimpowers = function (select){
        	$scope.selectimpower = (select == undefined) ? '1':select;
//            $scope.selectimpower = select;
            console.log('通过后台接口查询设备');
            SystemService.searchImpower($scope.impower, $scope.pagination,"").then(
                function(data){
                        $scope.impowerList = data.data;
                        $scope.pagination.totalItems = data.total;
                        $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                },
                function(code){
                    throw(code);
                }
            );
        };
        //根据页码查询点击页码查询相应数据
        $scope.onSelectPage = function(pageIndex){
            if(!pageIndex){
                growl.addErrorMessage("此页码不存在");
            }
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
            }
            if($scope.selectimpower === '1'){
                $scope.systemimpowers(); //调用查询接口
            }else{
                $scope.impower = '';
                $scope.systemimpowers(); //调用查询接口
            }

        };

        //批量取消授权用户
        $scope.delimpowers = function(){
            var modalInstance = $modal.open({
                templateUrl: 'system/impower/system.deleteimpowers.modal.html',
                backdrop:'static',
                controller:delImpowersModelCtrl,
                resolve: {
                    impowers: function () {
                        var _temp = $filter('filter')($scope.impowerList, {checkbox:true});
                        return _temp;
                    }
                }
            }).result.then(
                function(news){
                    //界面初始化
                    $scope.systemimpowers("",$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };

        //单独取消授权用户
        $scope.delimpower = function(impower){
            var modalInstance = $modal.open({
                templateUrl: 'system/impower/system.deleteimpowers.modal.html',
                backdrop:'static',
                controller:delImpowersModelCtrl,
                resolve: {
                    impowers: function () {
                        return [impower];
                    }
                }
            }).result.then(
                function(news){
                    //界面初始化
                    $scope.systemimpowers("",$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };

        var delImpowersModelCtrl = function($scope,impowers,$modalInstance,growl){
            $scope.impowers=impowers;
            $scope.loginNameList = [];
            $.each(impowers,function(index,delimpower){
                $scope.loginNameList.push({
                   "loginname":delimpower.loginname
               })
            });
            $scope.ok = function () {
                SystemService.rangeView_deletes($scope.loginNameList).then(
                    function(data){
                        growl.addSuccessMessage('授权已取消');
                        $modalInstance.close();
                    },
                    function(){

                    }
                );
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };




        //点击全部选中时设置控制的单选按钮状态
        $scope.checkAllFacilitys = function (){
            $scope.checkAll = ! $scope.checkAll;
            if($scope.checkAll){
                $.each($scope.impowerList, function(index, impower){
                    $scope.impowerList[index].checkbox = true;
                });
            }else{
                $.each($scope.impowerList, function(index, impower){
                    $scope.impowerList[index].checkbox = false;
                });
            }

        };
           var _temp=[];
        //监视contractList中是否有元素被改变状态
        $scope.$watch('impowerList', function(){
            //监测是否有元素被选中
            var _temp = $filter('filter')($scope.impowerList, {checkbox:true});
            $scope.selectedCount = _temp.length;
            if(_temp.length === $scope.impowerList.length)
                $scope.checkAll = true;
            else
                $scope.checkAll = false;
        },true);

        //查询条件角色范围
        $scope. selectsysroleRoles = function(){
            SystemService.sysrole_roles().then(
                function(data){
                    $scope.selectsysroleList = data;

                },
                function(){

                }
            );
        };
        //排序方法
        $scope.orderby = function(order){
            if($scope.sort[order] === 'asc'){
                $scope.sort[order] = 'desc';
            }
            else{
                $scope.sort[order] = 'asc';
            }
            $scope.pagination.sort=$scope.sort[order];
            $scope.pagination.order=order;
            $scope.systemimpowers();
        };
        var init = function(){
            $scope.selectimpower = '';
            //全选按钮设置为未选中状态（不初始化为false）
            $scope.checkAll = false;
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
                order:"loginname",
                sort:"asc",
            };
            $scope.sort = {
            	"loginname":"asc",
            	"name":"asc",
            };
            $scope.$parent.active = 4;
            $scope.hideAdvancedSearch = true;
            $scope.impowerList=[];
            $scope.impower=
                        {
                            "userID": "",
                            "name": "",
                            "role": "",
                            "scope": ""
                        };
            //管理员初始化
            $scope. selectsysroleRoles();
            //界面初始化
            $scope.systemimpowers("",$scope.pagination,"");           
            //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_system_impower_url_view') === -1){
                        console.log("+++++++授权管理  您没有权限+++++++++")
                        $location.path('system/data');
                }
        };
        init();
    }]);
});