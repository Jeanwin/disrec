define(['app','config'], function (app,config) {
    app.registerController('ClassRoomSetupCtrl', ['$scope','$filter','$modal','$timeout','$upload','$location','growl','ClassroomService' ,'TacticsService','TreeService','SystemService','$timeout',
        function ($scope,$filter,$modal,$timeout,$upload,$location,growl,ClassroomService,TacticsService,TreeService,SystemService,$timeout){

            //导入教室弹出框  --最外层
            $scope.openImportClassRooomModal = function (editMode) {
                var modalInstance = $modal.open({
                    templateUrl: 'classrooms/setup/classrooms.import.modal.html',
                    backdrop:'static',
                    controller: importModalCtrl,
                    resolve: {
                        activeAreaTreeNode: function () {
                            return $scope.activeAreaTreeNode;
                        },
                        areaTree: function () {
                            return $scope.areaTree;
                        }
                    }
                }).result.then(
                    function(data){
                        $scope.searchClassrooms();
                        mainTrees("classroomSet",  $scope.activeAreaTreeNode.node.id);
                    }
                );
            };

            //导入教室弹出  弹框-控制器
            var importModalCtrl = function ($scope, $modalInstance, areaTree, activeAreaTreeNode, growl, ClassroomService) {

                $scope.hideTree = true;
                $scope.showImportok = true;
                $scope.toggleTree = function () {
                	$scope.hideTree = !$scope.hideTree;
                    
                };

                $scope.areaTree = areaTree;

                $scope.area = {
                    attribute: 'N',
                    id: '',
                    parentid : activeAreaTreeNode.node.id,
                    name: ''
                };

                $scope.parentTitle = activeAreaTreeNode.node.title;

                //查询区域名称是否匹配
                $scope.checkAreaName = function(){

                    var data = {
                        parentid : $scope.area.parentid,
                        name :$scope.area.name,
                        attribute :"N"
                    };
//                $scope.showAreaNameError = true;
                    if($scope.area.name !== ''){

                        ClassroomService.CheckAreaName(data).then(
                            function(data){
                                $scope.showAreaNameError = data > 0;
                            },
                            function(code){
                                growl.addErrorMessage('发生意外错误');
                            }
                        );
                    }
                };
                //添加区域弹出  弹框-控制器里的- 点击树取值
                $scope.setActiveAreaTreeNode = function (that) {
                    $scope.parentTitle = that.node.title;
                    $scope.area.parentid =that.node.id;
                    $scope.toggleTree();                    
                };

                $scope.onFileSelect = function($files) {
                    $scope.showImportok = false;

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

                $scope.Import = function(){
                    console.log($scope.area.parentid);
                    var url = config.backend.ip + config.backend.base + 'areaView/area/import';

                    $scope.upload = $upload.upload({
                        url: url,
                        data: {parentid:$scope.area.parentid},
                        file: $scope.file
                    }).progress(function(evt) {
                        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('percent: ' + $scope.progress);
                    }).success(function(data, status, headers, config) {
                        if(data.id === '1'){
                            growl.addSuccessMessage('导入成功！');
                            $modalInstance.close(true);
                            return true;
                        }
                        if(data.id === '0'){
                            growl.addErrorMessage('全部导入失败！');
                            $scope.ErrorNum = data.name;
                            $scope.error = true;
                        }
                        if(data.id === '2'){
                            growl.addErrorMessage("部分导入失败");
                            $scope.ErrorNum = data.name;
                            $scope.error = true;
                        }
                    }).error(function(){
                        growl.addErrorMessage('教室导入失败！');
                    });
                };
                //导出问题用户数据
                $scope.ExportData = function(){
                    SystemService.exportData($scope.ErrorNum).then(
                        function(data){
                            if(data.id === '1'){
                                growl.addSuccessMessage('用户问题数据导出成功！');
                            }else{
                                growl.addErrorMessage('用户问题数据导出失败！');
                            }
                        },
                        function(){

                        }
                    );
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

        //编辑区域弹出  弹框
        $scope.openEditAreaNodeModal = function (editMode) {
            var modalInstance = $modal.open({
                templateUrl: 'classrooms/setup/classrooms.editArea.modal.html',
                backdrop:'static',
                controller: editModalCtrl,
                resolve: {
                    activeAreaTreeNode: function () {
                        return $scope.activeAreaTreeNode;
                    },
                    areaTree: function () {
                        return $scope.areaTree;
                    }
                }
            }).result.then(
                    function(){
                        $scope.searchClassrooms("",$scope.setTreeid, $scope.pagination,"");
                        mainTrees("classroomSet",  $scope.activeAreaTreeNode.node.id);
//                        mainTrees("classroomSet", "", $scope.activeAreaTreeNode.node.id);
                    }
            );
        };


        //编辑区域弹出  弹框-控制器
        var editModalCtrl = function ($scope, $modalInstance,
                                      areaTree, activeAreaTreeNode, growl, ClassroomService) {
            console.log(areaTree, activeAreaTreeNode.node);
                $scope.successSave = false;
                $scope.areaTree = areaTree;
                $scope.activeAreaTreeNode = activeAreaTreeNode;

                $scope.hideTree = true;
                $scope.toggleTree = function () {
                    $scope.hideTree = !$scope.hideTree;
                };

            console.log($scope.activeAreaTreeNode.node.sort,"这里是sort");
                $scope.area = {
                    attribute: 'N',
                    id: $scope.activeAreaTreeNode.node.id,
                    name: $scope.activeAreaTreeNode.node.title,
                    sort:parseInt($scope.activeAreaTreeNode.node.sort)
                };

                if(activeAreaTreeNode.$parentNodeScope){
                    $scope.area.parentid = activeAreaTreeNode.$parentNodeScope.node.id;
                    $scope.parentTitle = activeAreaTreeNode.$parentNodeScope.node.title;
                }


                //编辑区域弹出  弹框-控制器  --点击树 tree  取值
                $scope.setActiveAreaTreeNode = function (that) {
                    $scope.parentTitle = that.node.title;
                    $scope.area.parentid =that.node.id;
                    $scope.area.sort =that.node.sort;
                    $scope.toggleTree();
                    $scope.successSave = true;
                };


                //编辑区域是保存
                $scope.save = function () {

                    ClassroomService.EditClassroom('update', $scope.area).then(
                        function(data){
                            if(angular.isDefined(data)){
                                growl.addSuccessMessage('区域信息已更新');
                                $modalInstance.close();
                            }else {
                                growl.addErrorMessage('区域信息更新失败');
                            }
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    )
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                var checkName = $scope.area.name;
                //查询区域名称是否匹配
                $scope.checkAreaName = function(){
                	$scope.showAreaNameError = false;
                	if(checkName === $scope.area.name)
                		return;
                    var data = {
                        parentid : $scope.area.parentid,
                        name :$scope.area.name,
                        attribute :"N"
                    };
//                    $scope.showAreaNameError = true;
                    if($scope.area.name !== ''&&angular.isDefined($scope.area.name)){

                        ClassroomService.CheckAreaName(data).then(
                            function(data){
                                $scope.showAreaNameError = data > 0;
                            },
                            function(code){
                                growl.addErrorMessage('发生意外错误');
                            }
                        );
                    }
                };
                
            };

        //添加区域弹出  弹框
        $scope.openAddAreaNodeModal = function (editMode) {
            var modalInstance = $modal.open({
                templateUrl: 'classrooms/setup/classrooms.addArea.modal.html',
                backdrop:'static',
                controller: addAreaModalCtrl,
                resolve: {
                    activeAreaTreeNode: function () {
                        return $scope.activeAreaTreeNode;
                    },
                    areaTree: function () {
                        return $scope.areaTree;
                    }
                }
            }).result.then(
                    function(){
                        $scope.searchClassrooms("",$scope.setTreeid, $scope.pagination,"");
                        mainTrees("classroomSet",  $scope.activeAreaTreeNode.node.id);
                    }
            );
        };

        //添加区域弹出  弹框-控制器
        var addAreaModalCtrl = function ($scope, $modalInstance, areaTree, activeAreaTreeNode, growl, ClassroomService) {

            $scope.hideTree = true;
            $scope.toggleTree = function () {
                $scope.hideTree = !$scope.hideTree;
            };

            $scope.areaTree = areaTree;

            $scope.area = {
                attribute: 'N',
                id: '',
                parentid : activeAreaTreeNode.node.id,
                name: ''
            };

            $scope.parentTitle = activeAreaTreeNode.node.title;

            //查询区域名称是否匹配
            $scope.checkAreaName = function(){

                var data = {
                    parentid : $scope.area.parentid,
                    name :$scope.area.name,
                    attribute :"N"
                };
//                $scope.showAreaNameError = true;
                if($scope.area.name !== ''){

                    ClassroomService.CheckAreaName(data).then(
                        function(data){
                            $scope.showAreaNameError = data > 0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
                }
            };
            //添加区域弹出  弹框-控制器里的- 点击树取值
            $scope.setActiveAreaTreeNode = function (that) {
                $scope.parentTitle = that.node.title;
                $scope.area.parentid =that.node.id;
                $scope.toggleTree();
               
            };

            //保存新建区域
            $scope.save = function () {

                ClassroomService.EditClassroom('save', $scope.area).then(
                    function(data){
                        if(angular.isDefined(data)){
                            growl.addSuccessMessage('区域信息已添加');
                            $modalInstance.close();
                        }else {
                            growl.addErrorMessage('区域信息添加失败');
                        }
                    },
                    function(code){
                        growl.addErrorMessage('发生意外错误');
                    }
                );
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

//            $scope.activeArea = {id:'',title:''};

            //设置当前选中的树节点--外面页面的tree
        $scope.setActiveAreaTreeNode = function (that) {

            $scope.open1=that;

            $scope.activeAreaTreeNode.node = angular.copy(that.node);
            if(that.node.id === $scope.areaTree[0].id){
            	$scope.hideEdit = true;
            } else {
            	$scope.hideEdit = false;
            }
            if($scope.areaTree[0].temp){
            	$scope.classroom.temp = "hideOrganTree";
            }else{
            	$scope.classroom.temp = "";
            }
            console.log($scope.activeAreaTreeNode);
            console.log($scope.areaTree);
            console.log("+++++++++++",$scope.activeAreaTreeNode.parentid);

            //点击树tree节点调用查询接口  --相应列表分页等。。。 因此查询
            $scope.searchClassrooms("", $scope.activeAreaTreeNode.node.id, $scope.pagination,"");
            
            $timeout(function(){
                max_height = $("#rightContent-height").height();  
                console.log("右边内容高度max_height"+max_height);              
                $("#tree-root").css('max-height',function(){
                return max_height + 20;
                // alert()
            });
            },500);
        };

//        编辑或添加教室 弹出框 ---控制器
        var EditClassRoomModalCtrl = function ($scope,$modalInstance,growl, areaTree, activeAreaTreeNode,deviceDepartment,
                                               editMode,  classroom ,ClassroomService,organTree) {
            $scope.areaTree = areaTree;
            $scope.organTree = organTree;
            $scope.deviceDepartment = deviceDepartment;
         /* $scope.classroom = angular.copy(classroom);*/
          if(editMode === "update"){            	
            	$scope.classroom = angular.copy(classroom);
            }else{
            	$scope.classroom = {
            			'deptName':$scope.organTree[0].title,
            			'deptid':$scope.organTree[0].id,
            			'parentid': classroom.parentid,
						'parentname':$scope.organTree[0].title,
            	}
            }
            //$scope.classroom.parentid = activeAreaTreeNode.node.id;
            if(editMode==='update'){
                $scope.classroom.parentname = angular.copy($scope.classroom.parentname);
            }else{
                $scope.classroom.parentname = angular.copy( activeAreaTreeNode.node.title);
                $scope.classroom.state=deviceDepartment[0].value;
            };
            $scope.classroom.sort = parseInt($scope.classroom.sort);


            $scope.editingMode = editMode;
            $scope.hideTree = true;
            $scope.toggleTree = function (temp) {
            	if(temp == 'hideTree'){
            		$scope.hideTree = !$scope.hideTree;
            	}
            	if(temp == 'hideOrganTree'){
            		$scope.hideOrganTree = !$scope.hideOrganTree
            	}
//                $scope.hideTree = !$scope.hideTree;
            };
            var name = $scope.classroom.name;
            //重置按钮
            $scope.NewWrite = function(editingMode){
                if(editingMode ==='update'){
                    $scope.classroom = angular.copy(classroom);
                }if(editingMode ==='save'){
                    $scope.classroom = angular.copy(classroom);
                    $scope.classroom.parentname = angular.copy( activeAreaTreeNode.node.title);
                }
            };
            //查询区域名称是否匹配--编辑教室/添加教室弹出框里的
            $scope.checkClassroomName = function(){
            	if(angular.isDefined($scope.classroom.name)&&$scope.classroom.name != ''&&name !=$scope.classroom.name){
                var data = {
                    parentid : $scope.classroom.parentid,
                    name :$scope.classroom.name,
                    attribute :"Y"
                };
                    ClassroomService.CheckAreaName(data).then(
                        function(data){
                            $scope.showClassroomNameError = data > 0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
                }
            };
            //查询区域编码是否匹配--编辑教室/添加教室弹出框里的
            var innerid =$scope.classroom.innerid;
            $scope.checkClassroomNum = function(){
            	if(innerid === $scope.classroom.innerid)
            		return;
            	
                var data = {
//                    parentid : $scope.classroom.parentid,
                    innerid : $scope.classroom.innerid
//                    name :$scope.classroom.name
                }
//                $scope.showAreaNameError = true;
                if($scope.classroom.innerid !== ''){
                    ClassroomService.CheckAreaNum(data).then(
                        function(data){
                            $scope.showClassroomNumError = data > 0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
                }
            };

            //编辑/添加教室 弹出框  控制器里的--点击树tree 取值
            $scope.setActiveAreaTreeNode = function (that) {
            	$scope.successSave = true;
                
//                $scope.classroom.sort =$scope.classroom.sort;
                if(that.node.temp == "hideOrganTree"){
                	$scope.hideOrganTree = !$scope.hideOrganTree
                	$scope.classroom.deptName = angular.copy(that.node.title);
                    $scope.classroom.deptid =that.node.id;
                }else{
                	$scope.hideTree = !$scope.hideTree;
                	$scope.classroom.parentname = angular.copy(that.node.title);
                    $scope.classroom.parentid =that.node.id;
                }
                	
//                $scope.toggleTree();
            };

            //编辑教室保存接口
            $scope.EditClassroom = function(editMode, classroom){
                ClassroomService.EditClassroom(editMode, classroom).then(
                    function(data){
                        if(angular.isDefined(data)){

                            if(editMode === "update"){
                                if(data>0){
                                	growl.addSuccessMessage("信息更新成功");
                                	//$scope.searchClassrooms("",classroom.parentid, $scope.pagination,"");
                                }else{
                                	growl.addErrorMessage("信息更新失败");
                                }
                            } else {
                            	if(data>0){
                                	growl.addSuccessMessage("信息新增成功");
                                	//$scope.searchClassrooms("",classroom.parentid, $scope.pagination,"");
                                }else{
                                	growl.addErrorMessage("信息新增失败");
                                }
                            }
                            //init();
//                            $modalInstance.close();
                        }else {
                            if(editMode === "update"){
                                alert("编辑失败!");
                            } else {
                                alert("添加失败!");
                            }
                        }
                        console.log(data);
                    },
                    function(code){
                        //处理失败后操作
                        if(editMode === "update"){
                            alert("编辑失败!");
                        } else {
                            alert("添加失败!");
                        }
                    }
                );
            };


            $scope.save = function () {
                $scope.classroom.attribute = "Y";
                console.log("这里是state里的data");
                console.log( $scope.classroom,"编辑后传给service的 数据");
                ClassroomService.EditClassroom($scope.editingMode,$scope.classroom).then(
                    function(data){
                        if(angular.isDefined(data)){

                            if(editMode === "update"){
                                if(data>0){
                                    growl.addSuccessMessage("信息更新成功");
                                    //$scope.searchClassrooms("",classroom.parentid, $scope.pagination,"");
                                }else{
                                    growl.addErrorMessage("信息更新失败");
                                }
                            } else {
                                if(data>0){
                                    growl.addSuccessMessage("信息新增成功");
                                    //$scope.searchClassrooms("",classroom.parentid, $scope.pagination,"");
                                }else{
                                    growl.addErrorMessage("信息新增失败");
                                }
                            }
                            //init();
//                            $modalInstance.close();
                        }else {
                            if(editMode === "update"){
                                alert("编辑失败!");
                            } else {
                                alert("添加失败!");
                            }
                        }
                        console.log(data);
                    },
                    function(code){
                        //处理失败后操作
                        if(editMode === "update"){
                            alert("编辑失败!");
                        } else {
                            alert("添加失败!");
                        }
                    }
                );
                $modalInstance.close();
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        };

//      编辑或添加教室 弹出框
        $scope.openEditClassRooomModal = function (editMode, classroom) {
            console.log("这是classroom",classroom);
            if(classroom===''){
            	classroom = {
            			parentid:$scope.activeAreaTreeNode.node.id
            	};
            	console.log(classroom);
            }
            var modalInstance = $modal.open({
                templateUrl: 'classrooms/setup/edit.classroom.modal.html',
                backdrop:'static',
                controller: EditClassRoomModalCtrl,
                resolve: {
                    editMode: function () {
                        return editMode;
                    },
                    classroom: function () {
                        return classroom;
                    },
                    activeAreaTreeNode: function () {
                        return $scope.activeAreaTreeNode;
                    },
                    areaTree: function () {
                        return $scope.areaTree;
                    },
                    deviceDepartment: function(){
                    	return $scope.deviceDepartment;
                    },
                    organTree: function(){
                    	return $scope.organTree
                    }
                }
            }).result.then(
                function(){
                	$timeout(function(){
                		$scope.searchClassrooms("",$scope.activeAreaTreeNode.node.id, $scope.pagination,"");             
                    },100);
//                    $scope.searchClassrooms("",$scope.activeAreaTreeNode.node.id, $scope.pagination,"");
                },
                function(){
                    console.log("添加失败");
                }
            );
        };


        //详细查询图片切换
        $scope.setCheckMode = function(mode) {
            $scope.checkMode = mode;
        };


        //点击删除区域图标弹出弹出框
        $scope.openDeleteModal = function (areaTree) {
            var modalInstance = $modal.open({
                templateUrl: 'classrooms/setup/classrooms.delete.modal.html',
                backdrop:'static',
                controller: DeleteModalCtrl,
                resolve: {
                    node: function () {
                        return $scope.activeAreaTreeNode.node;
                    },
                    areaTree: function () {
                        return areaTree;
                    },
                    activeAreaTreeNode: function () {
                        return $scope.activeAreaTreeNode;
                    }
                }
            }).result.then(
                function(deleteClassroom){
                    $scope.searchClassrooms("",$scope.setTreeid, $scope.pagination,"");
                    mainTrees("classroomSet",  $scope.activeAreaTreeNode.node.id);
//                    $scope.deleteClassroom();
                }
            );
        };

        //点击删除区域图标弹出弹出框  --控制器
        var DeleteModalCtrl = function ($scope, $modalInstance, node,areaTree,growl,activeAreaTreeNode) {
            $scope.node = angular.copy(node);
    		$scope.areaTree = areaTree;
    		$scope.activeAreaTreeNode =  activeAreaTreeNode; 
          
            $scope.getSelectNodeTree = function(areaTree){
            	$.each(areaTree,function(offset,pre){
                    $.each(pre.nodes,function(offset,child){
                        if(child.id===$scope.activeAreaTreeNode.node.id){
                        	$scope.activeAreaTreeNode.node.id=pre.id;
                        	$scope.activeAreaTreeNode.node.title=pre.title;
                            return ;
                        }else if(child.nodes != null){
                            $scope.getSelectNodeTree(child.nodes);
                        }
                    });
            	});

            };

            $scope.ok = function () {
                ClassroomService.DeleteClassroom(node).then(
                    function(data){
                        if(data>0){
                        	growl.addSuccessMessage("删除区域成功");
                            $scope.getSelectNodeTree($scope.areaTree);
                        }
                        $modalInstance.close();
                    },function(){

                    }
                )
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
           
        };

            //点击删除教室图标弹出弹出框
            $scope.openDeleteClassroomModal = function (classroom) {
//                alert(classroom.id);
                var modalInstance = $modal.open({
                    templateUrl: 'classrooms/setup/classrooms.deleteClass.modal.html',
                    backdrop:'static',
                    controller: DeleteClssroomModalCtrl,
                    resolve: {
                        classroom: function () {
                            return classroom;
                        }
                    }
                }).result.then(
                    function(deleteClassroom){
                        $scope.searchClassrooms("",$scope.setTreeid, $scope.pagination,"");
                        mainTrees("classroomSet",  $scope.activeAreaTreeNode.node.id);
//                    $scope.deleteClassroom();
                    }
                );
            };
            //点击删除教室图标弹出弹出框--控制器
            var DeleteClssroomModalCtrl = function ($scope, $modalInstance,growl, classroom) {
                $scope.ok = function () {
                    ClassroomService.DeleteClassroom(classroom).then(
                        function(data){
                            if(data>0){
                               growl.addSuccessMessage("删除成功");
                            }else{
                            	growl.addErrorMessage("删除失败");
                            }
                            $modalInstance.close();
                        },function(){

                        }
                    )
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

        //教室管理Json  教室列表查询
        $scope.searchClassrooms = function (select) {
        	$scope.selectsetup = (select == undefined) ? '1':select;
//            $scope.selectsetup = select;
//            alert();
            //先通过服务接收数据再通过服务传给后台
            ClassroomService.searchClassroom($scope.classroom, $scope.areaid = $scope.activeAreaTreeNode.node.id, $scope.pagination,"").then(
                function (data) {
                    $scope.pagination.totalItems = data.total;
                    $scope.classroomList = data.data;
                    $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                    if(data.total === 0){
                        $scope.growl("未查找到相关信息",'error');
                    }
                },
                function (code) {
                    $scope.growl('发生意外错误,错误号:' + code ,'error');
                }
            );
        };

        //查询字典  ---在最外面
        var searchFlag = true;
        $scope.searchList = [];
        $scope.getCode = function(keywords,user,searcher){
            var temp = angular.copy({keywords:keywords,searcher:searcher});
            $scope.searchList.push(temp);
            if(searchFlag && $scope.searchList.length > 0){
                ralSearch(user);
            }
        };

        var ralSearch = function(user){
            if(searchFlag && $scope.searchList.length > 0){
                searchFlag = false;
                $scope.getCodes($scope.searchList[0].keywords,user).then(
                    function(data){
                        $scope[$scope.searchList[0].searcher] = data;
                        searchFlag = true;
                        $scope.searchList.splice(0,1);
                        ralSearch();
                    },
                    function(code){
                        console.log("error  "+code);
                        searchFlag = true;
                        if(angular.equals(code,"bussy")){
                            $scope.searchList.push($scope.searchList[0]);
                            $scope.searchList.splice(0,1);
                        }else{
                            $scope[$scope.searchList[0].searcher] = [];
                            $scope.searchList.splice(0,1);
                        }
                        ralSearch();
                    }
                );
            }
        };

            //根据页码查询
//            $scope.onSelectPage = function(pageIndex){
//                $scope.pagination.pageIndex = pageIndex;
//                var _pagination = angular.copy($scope.pagination);
//                if(angular.isDefined(_pagination.pageIndex.pageIndex)){
//                    _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
//                }
//                $scope.searchClassroom("",_pagination,""); //调用查询接口
//            };

            //删除列表中的教室
            $scope.deleteClassroom = function(id){
                console.log('通过后台接口删除操作');
                ClassroomService.DeleteClassroom(id).then(
                    function(data){
                        if(data.status === "OK"){
                            $scope.growl("删除成功！",'success');
                        }else{
                            $scope.growl("删除成功！",'error');
                        }
                    },
                    function(code){
//                            $scope.$emit('notification', {message:'未查找到相关信息', delay:3000, type:'error'});
                    }
                );
            };

            //编辑列表中的教室
            $scope.EditClassrooms = function(classroom){
                console.log(classroom);
                console.log('通过后台接口编辑操作');
                    ClassroomService.EditClassroom(classroom).then(
                        function(data){
                            if(data.status === "OK"){
                                $scope.growl("删除成功！",'success');
                            }else{
                                $scope.growl("删除成功！",'error');
                            }
                        },
                        function(code){
//                            $scope.$emit('notification', {message:'未查找到相关信息', delay:3000, type:'error'});
                        }
                    );
            };

          //查询时需要返回值 --接受人、最终接受人、续转合同代码查询
            $scope.getByReturn = function(aim,condition){
                var temp = aim+"";
                var keywords = {"id":aim,"value":condition, "holdFlag": false};
                return CodeService.getCodes(keywords,{}).then(
                    function(data){
                        console.log(data);
                        return data;
                    },
                    function(code){
                        return [];
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
            if($scope.selectsetup === '1'){
                //调用查询接口
                $scope.searchClassrooms();
            }else{
                $scope.classroom = '';
                //调用查询接口
                $scope.searchClassrooms();
            }

        };



            $scope.selectPage = function(event) {
                console.log("$scope.selectPage = function(event)疑问？",event);
            };

            //通过所属教室查询父设备信息接口--最外层  详细查询里的教室状态
            $scope.classroomstate = function(classstate){
            	TacticsService.code(classstate).then(
                    function(data){
                    	$scope.deviceDepartment = data;
                    },
                    function(code){
                        throw(code);
                    }
                );
            };
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
        //Json--Tree   写在最外面  没有在var  $scope 里
        var mainTrees = function(keywords,areaid){
            console.log("Json--Tree   写在最外面",keywords);
            console.log("Json--Tree   写在最外面",areaid);
            TreeService.mainTree(keywords,areaid).then(
                function(data){
                    console.log("TreeService.mainTree(keywords) 写在最外面",keywords);
                    console.log("TreeService.mainTree(areaid) 写在最外面",areaid);
                    $scope.areaTreecopy = data;
                    $scope.areaTree = $scope.areaTreecopy;
                    initFirstNode($scope.areaTreecopy);
                },
                function(){

                }
            );
//            $scope.areaTree = $scope.areaTreecopy;
        };
        
        //初始化第一个节点
        var initFirstNode = function(temp){
        	
        	if($scope.activeAreaTreeNode.node.id==='')
        		$scope.activeAreaTreeNode.node.id = temp[0].id;
    		    $scope.activeAreaTreeNode.node.title = temp[0].title;
                $scope.setActiveAreaTreeNode(
                    {
                        node:{
                            id:temp[0].id,
                            title: temp[0].title
                         }
                    });
        }
        
        //toggleArea
        $scope.toggleArea1 = function(){
        	if($scope.toggleArea == false){
        		$scope.areaTree = angular.copy($scope.areaTreecopy);
        	}else{
        		$scope.areaTree = angular.copy($scope.organTree);
        	}
        	initFirstNode($scope.areaTree);
        	
        }
        //翻译状态码
        $scope.initStatus = function(state){
        	var name ="";
        	$.each($scope.deviceDepartment,function(index,data){
        		if(data.value == state){
        			name = data.name;
        			return false;
        		}
        	});
        	return name;
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
                max_height = $("#rightContent-height").height();  
                min_height =  window.innerHeight;
                // alert("window.innerHeight"+window.innerHeight);
                $("#rightContent-height").css('min-height',function(){
                    return min_height - 320;
                 });
                 // alert("窗体高度mix_height"+$('#rightContent-height').css('min-height')); 
                $("#tree-root").css('max-height',function(){
                    return max_height + 70;                
                  });              
            },2000);
        };
        
        //排序函數
        $scope.orderby = function(order){
            if($scope.sort[order] === 'asc'){
                $scope.sort[order] = 'desc';
            }
            else{
                $scope.sort[order] = 'asc';
            }
            $scope.pagination.sort=$scope.sort[order];
            $scope.pagination.order=order;
            $scope.searchClassrooms();
        };

        var init = function(){
            $scope.selectsetup = '';

            //判断是否有权限
//            if(userPer === 'auth_classrooms_setup_url_view'){
//                alert("userPer 方法  没有权限")
//            };

            if($scope.global.user.authenticatid.indexOf('auth_classrooms_setup_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++教室设置  您没有权限+++++++++");
//                window.location.href('classrooms/daily');
                $location.path('classrooms/facility');
//                $location.path('localhost:8080/disrec/login');
            };

                $scope.$parent.active = 0;
                $scope.checkMode = 'play';
            //初始化  用来接收服务传过来的数组
                $scope.classroomList = [];
                //最外层在var init 里--点击详细查询时  教室状态数据字典接口初始化
                $scope.classroomstate("state");

                //数据字典差寻条件  Y
                $scope.keywords = {
                    "id":"",
                    "value":"",
                    "other1":"",
                    "name":'',
                    "state":'',
                    'temp':''
                };

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
                    order:"name",
                    sort:"asc"
                };
                
                //
                $scope.sort = {
                	"name":"asc",
                	"innerid":"asc",
                	"sort":"asc"
                };

                $scope.classroom = {
                    "id":"",
                    "name":"",
                    "innerid":"",
                    "state":"",
                    'temp':''
                };

//                $scope.classroomDeal = {};

                $scope.hideAdvancedSearch = true;

                $scope.areaTree =[];
                //最外面树tree初始化  将id; title赋值给 activeAreaTreeNode.node
                $scope.activeAreaTreeNode = {
                    node:{
                        id: '',
                        title:''
                    }
                };
            //进入页面初始化树tree结构  获取树tree
                mainTrees("classroomSet",  $scope.activeAreaTreeNode.node.id);
              //初始化树tree结构
                userTrees("trees",'');
                console.log('获取教室列表');
            //进入页面初始化教室列表结构  获取教室列表
               // $scope.searchClassrooms("",$scope.activeAreaTreeNode.node.id, $scope.pagination,"");

                $scope.pathParamSet = config.backend.base;
            };
        setTreeHeight();
        init();
    }]);
});
