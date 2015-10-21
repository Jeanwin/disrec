define(['app',
    'config'
], function (app, config) {
    app.registerController('SystemUserCtrl', ['$scope','$stateParams','$modal','$timeout','$location','$upload','growl',
        '$filter','SystemService','TacticsService' ,'TreeService',
        function ($scope,$stateParams,$modal,$timeout,$location,$upload,growl,$filter,SystemService,TacticsService,TreeService) {
    		
//      切换树
    	//JSON 机构树
        var organTrees = function(keywords,areaid){
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
        		$scope.UnitArea.id = temp[0].id;
    		    $scope.UnitArea.title = temp[0].title;
                $scope.setActiveArea(temp[0]);
        }
        
        //toggleArea
        $scope.toggleArea1 = function(){
        	$scope.toggleArea=!$scope.toggleArea;
        	if($scope.toggleArea == false){
        		$scope.areaTree = $scope.areaTreecopy;
        	}else{
        		$scope.areaTree = $scope.organTree;
        		$scope.userList.temp = 'hideOrganTree';
        	}
        	initFirstNode($scope.areaTree);
        	
        }
    	
            //导入用户弹出框  --最外层
            $scope.openImportUserModal = function (UserPlace) {
                var modalInstance = $modal.open({
                    templateUrl: 'system/useradd/system.importUser.modal.html',
                    backdrop:'static',
                    controller: importUserModalCtrl,
                    resolve: {
                        UserPlace: function () {
                            return UserPlace;
                        },
                        Tree:function(){
                            return $scope.areaTree
                        }
                    }
                }).result.then(
                    function(data){
                        $scope.systemusers();
                    }
                );
            };

            //导入用户弹出  弹框-控制器
            var importUserModalCtrl = function ($scope, $modalInstance,growl,Tree,UserPlace) {
                $scope.parentid = UserPlace.id;
                $scope.areaTree = Tree;
                $scope.ImportUserhideTree = true;
                $scope.showImportok = true;
                $scope.ImportPlace = UserPlace.title;
                $scope.importerror = false;

                //导入用户展开关闭树
                $scope.ImportUsertoggle = function(){
                    $scope.ImportUserhideTree = !$scope.ImportUserhideTree;
                };
                //点击树节点选择树节点名称
                $scope.setActiveAreaTreeNode = function(node){
                    $scope.ImportPlace = node.title;
                    $scope.parentid = node.id;
                    $scope.ImportUsertoggle();
                };

                $scope.dropSupported = true;
                $scope.file;
                $scope.progress = -1;
                $scope.upload;
                $scope.error = false;
                $scope.uploadRightAway = false;

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

                    var url = config.backend.ip + config.backend.base + 'userView/user/import';

                    $scope.upload = $upload.upload({
                        url: url,
                        data: {deptid:$scope.parentid},
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
                        if(data.id === '2'){
                            growl.addErrorMessage('部分导入成功！');
                            $scope.ErrorNum = data.name;
                            $scope.error = true;
                        }
                        if(data.id === '0'){
                            growl.addErrorMessage('全部导入失败！');
                            $scope.ErrorNum = data.name;
                            $scope.error = true;
                        }
                    }).error(function(){
                        growl.addErrorMessage('导入失败！');
                        $scope.importerror = true
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

            //批量删除用户
            $scope.delusers = function () {
                var modalInstance = $modal.open({
                    templateUrl: 'system/useradd/system.deleteusers.modal.html',
                    backdrop:'static',
                    controller: DelUsersModalCtrl,
                    resolve: {
                        deleteuser: function () {
                            var _temp = $filter('filter')($scope.userList, {checked:true});
                            return _temp;
                        }
                    }
                }).result.then(
                    function(){
                        $scope.systemusers("",$scope.setTreeid,$scope.pagination,"");
                    },
                    function(reason){
                        console.log('reason is '+ reason);
                    }
                );
            };

            //删除用户
            $scope.deluser = function (user) {
            	var data =[];
            	data[0]=user;
                $modal.open({
                    templateUrl: 'system/useradd/system.deleteuser.modal.html',
                    backdrop:'static',
                    controller: DelUsersModalCtrl,
                    resolve: {
                        deleteuser: function () {
                            return data;
                        }
                    }
                }).result.then(
                    function(){
                        $scope.systemusers("",$scope.setTreeid,$scope.pagination,"");
                    },
                    function(reason){
                        console.log('reason is '+ reason);
                    }
                );
            };
            var DelUsersModalCtrl = function ($scope, $modalInstance, deleteuser,growl) {
                console.log(deleteuser);
                $scope.deleteuser=deleteuser;
                $scope.ok = function () {
                    SystemService.delUser(deleteuser).then(
                        function(data){
                        	if(data>0)
                        		growl.addSuccessMessage('用户信息已删除');
                        	else
                        		growl.addErrorMessage('用户信息删除失败');
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

            //添加用户
            $scope.adduser = function (UnitArea) {
                var modalInstance = $modal.open({
                    templateUrl: 'system/useradd/system.useradd.modal.html',
                    backdrop:'static',
                    controller: AddUserModalCtrl,
                    windowClass: 'modal-lg',
                    resolve: {
                        tree:function(){
                            return $scope.areaTree
                        },
                        Classfiy:function(){
                            return $scope.classfiyList
                        },
                        Status:function(){
                            return $scope.statusList;
                        },
                        Sex:function(){
                            return $scope.sexList;
                        },
                        UnitArea:function(){
                            return UnitArea
                        }
                        
                    }
                }).result.then(
                    function(){
                        $scope.systemusers("",$scope.setTreeid,$scope.pagination,"");
                    },
                    function(reason){
                    }
                );
            };

            var AddUserModalCtrl = function ($scope, $modalInstance,growl,tree,Classfiy,Status,Sex,UnitArea) {

                $scope.sexList = Sex;
                $scope.statusList = Status;
                $scope.classfiyList = Classfiy;
                $scope.areaTree = tree;
                $scope.hideTree = true;
                $scope.user = {
                    password: '',
                    sex:Sex[0].value,
                    usertype:Classfiy[0].value,
                    status:Status[0].value
                };
                $scope.user.deptName = UnitArea.title;
                $scope.user.deptid = UnitArea.id;

                $scope.file;
                $scope.progress = -1;
                $scope.upload;
                $scope.error = false;
                $scope.imgData = {
            		"url" : ""
                };
                $scope.imgCheck = {
                	"flag" : false
                };
                $scope.uploadRightAway = false;

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
                        		$scope.imgData.url = e.target.result;
                        		$scope.imgCheck.flag = true;
                            },1000);
                        }
                    }(fileReader);
                    
                    $scope.progress = -1;
                    if ($scope.uploadRightAway) {
                        $scope.save();
                    }
                };
                //添加区域弹出  弹框-控制器里的- 点击树取值
                $scope.setActiveAreaTree = function (node) {
                    $scope.user.deptName = node.title;
                    $scope.user.deptid = node.id;
                    $scope.toggleTree();                    
                };

                //文本框树的闭合
                $scope.toggleTree = function () {
                    $scope.hideTree = !$scope.hideTree;
                };

                $scope.ok = function () {
                    if($scope.file) {
                        var url = config.backend.ip + config.backend.base + 'userView/save';
                        var data = {
                            deptName: $scope.user.deptName === undefined ? '' : $scope.user.deptName,
                            deptid: $scope.user.deptid === undefined ? '' : $scope.user.deptid,
                            email: $scope.user.email === undefined ? '' : $scope.user.email,
                            loginname: $scope.user.loginname === undefined ? '' : $scope.user.loginname,
                            name: $scope.user.name === undefined ? '' : $scope.user.name,
                            password: $scope.user.password === undefined ? '' : $scope.user.password,
                            passwordok: $scope.user.passwordok === undefined ? '' : $scope.user.passwordok,
                            phone: $scope.user.phone === undefined ? '' : $scope.user.phone,
                            sex: $scope.user.sex === undefined ? '' : $scope.user.sex,
                            status: $scope.user.status === undefined ? '' : $scope.user.status,
                            usertype: $scope.user.usertype === undefined ? '' : $scope.user.usertype,
                            remark: $scope.user.remark === undefined ? '' : $scope.user.remark,
                    		pictureurl: $scope.user.pictureurl === undefined ? '' : $scope.user.pictureurl
                        };
                        //如果是学生，将入学年份传入
                        if(data.usertype === "2"){
                        	data.schoolyear = $scope.user.schoolyear === undefined ? null : $scope.user.schoolyear;
                        }
                        $scope.upload = $upload.upload({
                            url: url,
                            method: 'POST',
                            data: data,
                            file: $scope.file
                        }).progress(function (evt) {
                            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                        }).success(function (data, status, headers, config) {
                            growl.addSuccessMessage("用户添加成功！");
                            $modalInstance.close();
                        }).error(function () {
                            $scope.error = true;
                        });
                    }else{
                        var data = {
                            deptName: $scope.user.deptName === undefined ? '' : $scope.user.deptName,
                            deptid: $scope.user.deptid === undefined ? '' : $scope.user.deptid,
                            email: $scope.user.email === undefined ? '' : $scope.user.email,
                            loginname: $scope.user.loginname === undefined ? '' : $scope.user.loginname,
                            name: $scope.user.name === undefined ? '' : $scope.user.name,
                            password: $scope.user.password === undefined ? '' : $scope.user.password,
                            passwordok: $scope.user.passwordok === undefined ? '' : $scope.user.passwordok,
                            phone: $scope.user.phone === undefined ? '' : $scope.user.phone,
                            sex: $scope.user.sex === undefined ? '' : $scope.user.sex,
                            status: $scope.user.status === undefined ? '' : $scope.user.status,
                            usertype: $scope.user.usertype === undefined ? '' : $scope.user.usertype,
                            remark: $scope.user.remark === undefined ? '' : $scope.user.remark
                        };
                        //如果是学生，将入学年份传入
                        if(data.usertype === "2"){
                        	data.schoolyear = $scope.user.schoolyear === undefined ? null : $scope.user.schoolyear;
                        }
                        SystemService.AddUserMessage(data).then(
                            function(data){
                                if(data >0){
                                    growl.addSuccessMessage("用户信息添加成功！");
                                    $modalInstance.close(true);
                                }else{
                                    growl.addErrorMessage("用户信息添加失败！");
                                }
                            },
                            function(){

                            }
                        );
                    }

                    //编辑直播课表保存接口
//                    SystemService.addUser($scope.user).then(
//                        function(data){
//                            growl.addSuccessMessage('用户添加信息已更新');
//                            $modalInstance.close(true);
//                        },
//                        function(code){
//                            //处理失败后操作
//                            alert("添加失败!");
//                        }
//                    );
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
                //添加用户--用户ID验重
                $scope.selectUserID = function(){
                    var findUser = {
                        "loginname":$scope.user.loginname
                    };
                    console.log(findUser);
                    if($scope.user.loginname !== undefined){
                        SystemService.findUserID(findUser).then(
                            function(data){
                                $scope.showUserIDError = data > 0;
                            },
                            function(code){
                                growl.addErrorMessage('发生意外错误');
                            }
                        );
                    };
                };
                //添加用户--Email验重
                $scope.selectEmail = function(){
                    var findUser = {
                        "email":$scope.user.email
                    };
                    if($scope.user.email !== ''){
                        SystemService.findEmail().then(
                            function(data){
                                $scope.showEmailError = data > 0;
                            },
                            function(code){
                                growl.addErrorMessage('发生意外错误');
                            }
                        );
                    };
                };
                //添加用户--电话号码验重
                $scope.selectPhone = function(){
                    var findUser = {
                        "phone":$scope.user.phone
                    };
                    if($scope.user.phone !== ''){
                        SystemService.findPhone().then(
                            function(data){
                                $scope.showPhoneError = data > 0;
                            },
                            function(code){
                                growl.addErrorMessage('发生意外错误');
                            }
                        );
                    };
                };
            };
            //编辑用户
            $scope.edituser = function (user) {
                var modalInstance = $modal.open({
                    templateUrl: 'system/useradd/system.useradd.modal.html',
                    backdrop:'static',
                    windowClass: 'modal-lg',
                    controller: EditUserModalCtrl,
                    resolve: {
                        user: function () {
                            return user;
                        },
                        tree:function(){
                            return $scope.areaTree;
                        },
                        Status:function(){
                            return $scope.statusList;
                        },
                        Sex:function(){
                            return $scope.sexList;
                        },
                        Classfiy:function(){
                            return $scope.classfiyList
                        },
                        userRole:function(){
                        	return $scope.global.user;
                        }
                    }
                }).result.then(
                    function(Add){
                        $scope.systemusers("",$scope.setTreeid,$scope.pagination,"");
                    },
                    function(reason){
                        console.log('reason is '+ reason);
                    }
                );
            };
            var EditUserModalCtrl = function ($scope, $modalInstance, user,growl,tree,Classfiy,Status,Sex,userRole) {
                console.log(user.remark);
            	$scope.iptemp =  config.backend.tempIp;
                $scope.userRole = userRole;
                $scope.picChange = false;
                $scope.sexList = Sex;
                $scope.statusList = Status;
                $scope.classfiyList = Classfiy;
                $scope.areaTree = tree;
                $scope.user=angular.copy(user);
                $scope.editingMode = user? true:false;
                $scope.hideTree =true;
                $scope.showSuccess = true;
                    //编辑区域弹出  弹框-控制器里的- 点击树取值
                $scope.setActiveAreaTree = function (node) {
                    $scope.showSuccess = false;
                    $scope.user.deptName = node.title;
                    $scope.user.deptid = node.id;
                    $scope.toggleTree();
                };
                //文本框树的闭合
                $scope.toggleTree = function () {
                    $scope.hideTree = !$scope.hideTree;
                };

                $scope.file;
                $scope.progress = -1;
                $scope.upload;
                $scope.error = false;
//                $scope.img;
                $scope.imgData = {
                		"url" : ""
                    };
                $scope.imgCheck = {
                		"flag" : false
                    };
                $scope.uploadRightAway = false;

                $scope.onFileSelect = function($files) {
                    $scope.picChange = true;
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
//                                $scope.img = e.target.result;
                                $scope.imgData.url = e.target.result;
                                $scope.imgCheck.flag = true;
                            },1000);
                        }
                    }(fileReader);

                    $scope.progress = -1;
                    if ($scope.uploadRightAway) {
                        $scope.save();
                    }
                };

                $scope.ok = function () {
                    if($scope.file) {
                        var url = config.backend.ip + config.backend.base + 'userView/update';
                        var data = {
                            deptName: $scope.user.deptName === undefined ? '' : $scope.user.deptName,
                            deptid: $scope.user.deptid === undefined ? '' : $scope.user.deptid,
                            email: $scope.user.email === undefined ? '' : $scope.user.email,
                            loginname: $scope.user.loginname === undefined ? '' : $scope.user.loginname,
                            name: $scope.user.name === undefined ? '' : $scope.user.name,
                            password: $scope.user.password === undefined ? '' : $scope.user.password,
                            passwordok: $scope.user.passwordok === undefined ? '' : $scope.user.passwordok,
                            phone: $scope.user.phone === undefined ? '' : $scope.user.phone,
                            sex: $scope.user.sex === undefined ? '' : $scope.user.sex,
                            status: $scope.user.status === undefined ? '' : $scope.user.status,
                            usertype: $scope.user.usertype === undefined ? '' : $scope.user.usertype,
                            remark: $scope.user.remark === 'null' ? '' : $scope.user.remark,
                    		pictureurl: $scope.user.pictureurl === undefined ? '' : $scope.user.pictureurl
                        };
                        //如果是学生，将入学年份传入
                        if(data.usertype === "2"){
                        	data.schoolyear = $scope.user.schoolyear === undefined ? null : $scope.user.schoolyear;
                        }
                        $scope.upload = $upload.upload({
                            url: url,
                            method: 'POST',
                            data: data,
                            file: $scope.file
                        }).progress(function (evt) {
                            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                        }).success(function (data, status, headers, config) {
                            growl.addSuccessMessage("用户信息修改成功！");
                            $modalInstance.close();
                        }).error(function () {
                            $scope.error = true;
                        });
                    }else{
                        var data = {
                            deptName: $scope.user.deptName === undefined ? '' : $scope.user.deptName,
                            deptid: $scope.user.deptid === undefined ? '' : $scope.user.deptid,
                            email: $scope.user.email === undefined ? '' : $scope.user.email,
                            loginname: $scope.user.loginname === undefined ? '' : $scope.user.loginname,
                            name: $scope.user.name === undefined ? '' : $scope.user.name,
                            password: $scope.user.password === undefined ? '' : $scope.user.password,
                            passwordok: $scope.user.passwordok === undefined ? '' : $scope.user.passwordok,		
                            phone: $scope.user.phone === undefined ? '' : $scope.user.phone,
                            sex: $scope.user.sex === undefined ? '' : $scope.user.sex,
                            status: $scope.user.status === undefined ? '' : $scope.user.status,
                            usertype: $scope.user.usertype === undefined ? '' : $scope.user.usertype,
                            remark: $scope.user.remark === 'null'?'' : $scope.user.remark
                        };
                        //如果是学生，将入学年份传入
                        if(data.usertype === "2"){
                        	data.schoolyear = $scope.user.schoolyear === undefined ? null : $scope.user.schoolyear;
                        }
                        SystemService.EditUserMessage(data).then(
                            function(data){
                                if(data>0){
                                    growl.addSuccessMessage("用户信息修改成功！");
                                    $modalInstance.close(true);
                                }else{
                                growl.addErrorMessage("用户信息修改失败！");
                                }
                            },
                            function(){

                            }
                        );

                    }

                    //编辑直播课表保存接口
//                    SystemService.editUser(user).then(
//                        function(data){
//                            growl.addSuccessMessage('用户编辑信息已更新');
//                            $modalInstance.close(true);
//                        },
//                        function(code){
//                            //处理失败后操作
//                            alert("添加失败!");
//                        }
//                    );
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
        //用户查询
            $scope.searchuser=function(keywords, pagination, user){
                SystemService.searchuser(keywords, pagination, user).then(
                    function(data){
                        $scope.userList = data.data;
                        pagination.totalItems = data.total;
                    },
                    function(code) {
                        throw(code);
                    }
                );
            };
            $scope.toggle = function (node) {
            };
            //查询树节点
            $scope.UnitArea = {id:'',title:''};
            $scope.setActiveArea = function (node) {
                $scope.UnitArea.id = node.id;
                $scope.UnitArea.title = node.title;
                if($scope.areaTree[0].temp){
                	$scope.user.temp = "hideOrganTree";
                }else{
                	$scope.user.temp = "";
                }
                $scope.systemusers();

                $timeout(function(){
                    max_height = $("#rightContent-height").height();  
                    console.log("右边内容高度max_height"+max_height);              
                    $("#tree-root").css('max-height',function(){
                    return max_height + 55;
                    // alert()
                });
                },500);
            };


            //设备列表查询  Json系统管理--用户管理
            $scope.systemusers = function (select){
                $scope.selectuser = select;
                if($scope.UnitArea.id=="{{}}"){
                    $scope.UnitArea.id="";
                }
                SystemService.searchUser($scope.user,$scope.UnitArea.id,$scope.pagination,"").then(
                    function(data){
                            $scope.userList = data.data;
                            $scope.pagination.totalItems = data.total;
                            $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                    },
                    function(code){
                        throw(code);
                    }
                );
            };
            //设备列表简单查询  Json系统管理--用户管理
//            $scope.systemuser = function (keywords, areaid, pagination, user){
//                console.log('通过后台接口查询设备');
//                SystemService.searchUser(keywords,$scope.UnitArea.id,$scope.pagination,user).then(
//                    function(data){
//                            $scope.userList = data.data;
//                            $scope.pagination.totalItems = data.total;
//                            $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
//                    },
//                    function(code){
//                        throw(code);
//                    }
//                );
//            };
            //查询字典
//            var searchFlag = true;
//            $scope.searchList = [];
//            $scope.getCode = function(keywords,user,searcher){
//                var temp = angular.copy({keywords:keywords,searcher:searcher});
//                $scope.searchList.push(temp);
//                if(searchFlag && $scope.searchList.length > 0){
//                    ralSearch(user);
//                }
//            };
//            var ralSearch = function(user){
//                if(searchFlag && $scope.searchList.length > 0){
//                    searchFlag = false;
//                    $scope.getCodes($scope.searchList[0].keywords,user).then(
//                        function(data){
//                            $scope[$scope.searchList[0].searcher] = data;
//                            searchFlag = true;
//                            $scope.searchList.splice(0,1);
//                            ralSearch();
//                        },
//                        function(code){
//                            console.log("error  "+code);
//                            searchFlag = true;
//                            if(angular.equals(code,"bussy")){
//                                $scope.searchList.push($scope.searchList[0]);
//                                $scope.searchList.splice(0,1);
//                            }else{
//                                $scope[$scope.searchList[0].searcher] = [];
//                                $scope.searchList.splice(0,1);
//                            }
//                            ralSearch();
//                        }
//                    );
//                }
//            };
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
                if($scope.selectuser === '1'){
                    $scope.systemusers("1", $scope.setTreeid, _pagination, "");
                }else{
                    /*$scope.user = {
                        "userID":  "",
                        "name": "",
                        "sort":"0",
                        "sex": "",
                        "organization": "",
                        "state": "",
                        "email": "",
                        "user_type": "",
                        "year": "",
                        "parentname": "",
                        "phone":"",
                        "temp":""
                    };*/
                    $scope.systemusers($scope.user, $scope.setTreeid, _pagination, "");
                }

            };

            //点击全部选中时设置控制的单选按钮状态
            $scope.checkAllFacilitys = function (){
                $scope.checkAll = !$scope.checkAll;
                $.each($scope.userList, function(index, user){
                    user.checked = $scope.checkAll;
                });
            };
            //Json--Tree
            var userTrees = function(keywords,areaid){
                TreeService.systemTree(keywords,areaid).then(
                    function(data){
                        $scope.areaTreecopy = data;
                        $scope.areaTree = $scope.areaTreecopy
                            if($scope.user.deptid !== ''){
                                $scope.UnitArea.id = $scope.user.deptid;
                                $scope.UnitArea.title = $scope.parentname;

                            }else{
                                $scope.UnitArea.id = $scope.areaTree[0].id;
                                $scope.UnitArea.title = $scope.areaTree[0].title;
                            }

                            $scope.systemusers($scope.selectuser);
                    },
                    function(){

                    }
                );
            };
            var _temp = [];
            //监视contractList中是否有元素被改变状态
            $scope.$watch('userList', function(){
                //监测是否有元素被选中
                var _temp = $filter('filter')($scope.userList, {checked:true});
                $scope.selectedCount = _temp.length;
                if(_temp.length === $scope.userList.length)
                    $scope.checkAll = true;
                else
                    $scope.checkAll = false;
            },true);

            //初始化性别的接口
            $scope.selectSex = function (){
                TacticsService.code('sex').then(
                    function(data){
                        $scope.sexList = data;
                    },
                    function(){

                    }
                );
            };
            //性别翻译状态码
            $scope.initSex = function(sex){
                var sexValue ="";
                $.each($scope.sexList,function(index,data){
                    if(data.value == sex){
                        sexValue = data.name;
                        return false;
                    }
                });
                return sexValue;
            };

            //初始化身份的接口
            $scope.selectClassfiy = function (){
                TacticsService.code('identity').then(
                    function(data){
                        $scope.classfiyList = data;
                    },
                    function(){

                    }
                );
            };
            //身份翻译状态码
            $scope.initClassfiy = function(Classfiy){
                var classfiyValue ="";
                $.each($scope.classfiyList,function(index,data){
                    if(data.value == Classfiy){
                        classfiyValue = data.name;
                        return false;
                    }
                });
                return classfiyValue;
            };
            //初始化状态的接口
            $scope.selectStatus = function (){
                TacticsService.code('state').then(
                    function(data){
                        $scope.statusList = data;
                    },
                    function(){

                    }
                );
            };
            //状态翻译状态码
            $scope.initStatus = function(status){
                var statusValue ="";
                $.each($scope.statusList,function(index,data){
                    if(data.value == status){
                        statusValue = data.name;
                        return false;
                    }
                });
                return statusValue;
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
            $scope.systemusers();
        };

         window.onresize = function () {
            min_height =  window.innerHeight;
            $("#rightContent-height").css('min-height',function(){
                return min_height - 325;
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
                    return min_height - 325;
                 });             
            },1000);

            $timeout(function(){
                max_height = $("#rightContent-height").height(); 
                 // alert("窗体高度mix_height"+$('#rightContent-height').css('min-height')); 
                $("#tree-root").css('max-height',function(){
                    return max_height + 70;                
                  });             
            },1000);
        };

        var init = function(){
            $scope.selectuser = '';
            //初始化状态的接口
            $scope.selectStatus();
            //初始化身份的接口
            $scope.selectClassfiy();
//            初始化性别的接口
            $scope.selectSex();
            $scope.userList=[];

            //数据字典差寻条件
            $scope.user = {
                "userID":  "",
                "name": "",
                "sort":"0",
                "sex": "",
                "deptid": "",
                "state": "",
                "email": "",
                "user_type": "",
                "year": "",
                "parentname": "",
                "phone":"",
                "temp":""
            };
            $scope.sort = {
            		"loginname":"asc",
            		"name":"asc",
            		"user_type":"asc",
            		"deptid":"asc"
            }
            //路由传值初始化定义
            $scope.user.deptid = $stateParams.id;
            $scope.parentname = $stateParams.parentname;

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
                sort:"asc"
            };
            $scope.$parent.active = 0;
            $scope.hideAdvancedSearch = true;
            $scope.areaTree =[];
            
          //初始化树tree结构
            userTrees("trees",'');
            
            //初始化机构树tree结构
            /*organTrees("tree",'');*/

            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_system_user_url_view') === -1){
                    console.log("+++++++用户管理  您没有权限+++++++++")
                    $location.path('system/organization');
            }


        };
        setTreeHeight();
        init();
    }]);
});