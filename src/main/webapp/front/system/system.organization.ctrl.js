define(['app','config'], function (app,config) {
    app.registerController('SystemOrganizationCtrl', ['$scope','$modal','$filter','$upload','$location','growl','SystemService','TacticsService','CodeService','TreeService' ,'$timeout',
        function ($scope,$modal,$filter,$upload,$location,growl,SystemService,TacticsService,CodeService,TreeService,$timeout) {
    	
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
        		$scope.activeArea.id = temp[0].id;
    		    $scope.activeArea.title = temp[0].title;
                $scope.setActiveArea(temp[0]);
        }
        
        //toggleArea
        $scope.toggleArea1 = function(){
        	$scope.toggleArea=!$scope.toggleArea;
        	if($scope.toggleArea == false){
        		$scope.areaTree = $scope.areaTreecopy;
        	}else{
        		$scope.areaTree = $scope.organTree;
        		$scope.organizationList.temp = 'hideOrganTree';
        	}
        	initFirstNode($scope.areaTree);
        	
        }
        
        //导入机构弹出框  --最外层
        $scope.openImportOrganizationModal = function (organizationPlace) {
            var modalInstance = $modal.open({
                templateUrl: 'system/organization/system.importOrganization.modal.html',
                backdrop:'static',
                controller: importOrganizationModalCtrl,
                resolve: {
                    organizationPlace: function () {
                        return organizationPlace;
                    },
                    Tree:function(){
                        return $scope.areaTree
                    }
                }
            }).result.then(
                function(data){
                    // $scope.systemorganizations("",$scope.setTreeid,$scope.pagination,"");
                    // organizationTrees("trees");
                    $scope.systemorganizations();
                    organizationTrees("trees");

                }
            );
        };


        //导入机构弹出  弹框-控制器
        var importOrganizationModalCtrl = function ($scope, $modalInstance,growl,Tree,organizationPlace) {
            $scope.organizationPlace =organizationPlace.title;
            $scope.parentid =organizationPlace.id;
            $scope.areaTree = Tree;
            $scope.hideTree = true;
            $scope.showImportok = true;
            //点击事件展开闭合树
            $scope.organizationToggle = function(){
                $scope.hideTree = !$scope.hideTree;
            };
            $scope.setActiveAreaTreeNode = function(node){
                $scope.organizationPlace = node.title;
                $scope.parentid =node.id;
                $scope.organizationToggle();
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
                    console.log($scope.parentid);
                var url = config.backend.ip + config.backend.base + 'deptView/dept/import';

                $scope.upload = $upload.upload({
                    url: url,
                    data: {parentid:$scope.parentid},
                    file: $scope.file
                }).progress(function(evt) {
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('percent: ' + $scope.progress);
                }).success(function(data, status, headers, config) {
                    if(data.id === '1'){
                        growl.addSuccessMessage('机构导入成功！');
                        $modalInstance.close(true);
                        return true;
                       
                    }
                    if(data.id === '2'){
                        growl.addErrorMessage("部分导入失败");
                        $scope.ErrorNum = data.name;
                        $scope.error = true;
                    }
                    if(data.id === '0'){
                        growl.addErrorMessage('全部导入失败！');
                        $scope.ErrorNum = data.name;
                        $scope.error = true;
                    }
                }).error(function(){
                    $scope.error = true;
                });
            };
            //导出问题机构数据
            $scope.ExportData = function(){
                SystemService.exportData($scope.ErrorNum).then(
                    function(data){
                        if(data.id === '1'){
                            growl.addSuccessMessage('机构问题数据导出成功！');
                        }else{
                            growl.addErrorMessage('机构问题数据导出失败！');
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

        //显示树的当前区域
        $scope.activeArea = {id:'',title:''};
        $scope.setActiveArea = function (node,pagination) {
            $scope.activeArea.id = node.id;
            $scope.activeArea.title = node.title;
            if($scope.areaTree[0].temp){
            	$scope.organization.temp = "hideOrganTree";
            }else{
            	$scope.organization.temp = "";
            }
            $scope.systemorganizations();

            $timeout(function(){
                max_height = $("#rightContent-height").height();  
                console.log("右边内容高度max_height"+max_height);              
                $("#tree-root").css('max-height',function(){
                return max_height + 55;
                // alert()
            });
            },500);

        };
        //添加机构
        $scope.addOrganization = function (treeClassroom) {
            var modalInstance = $modal.open({
                templateUrl: 'system/organization/system.organization.modal.html',
                backdrop:'static',
                controller: AddganizationModalCtrl,
                resolve: {
                    tree: function () {
                        return $scope.areaTree;
                    },
                    treeClassroom:function(){
                        return treeClassroom;
                    },
                    status:function(){
                        return $scope.statusList
                    },
                    tattribute:function(){
                        return $scope.TattributeList
                    }
                }
            }).result.then(
                function(update){
                    $scope.systemorganizations("",$scope.setTreeid,$scope.pagination,"");
                    organizationTrees("trees");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        var AddganizationModalCtrl = function ($scope, $modalInstance,tree,growl,treeClassroom,status,tattribute,$timeout) {
            $scope.TattributeList = tattribute;
            $scope.statusList = status;
            $scope.areaTree = angular.copy(tree);
            $scope.hideTree = true;
            $scope.organization = {
                state:status[0].value
            };
            $scope.organization.parentname =treeClassroom.title;
            $scope.organization.parentid =treeClassroom.id;
            $scope.toggle = function () {
                $scope.hideTree = !$scope.hideTree;
            };

            //查询全部的自动提示列表
            $scope.toggleTreeClass = function (flag) {
                if(flag === "ImmediatelyClose"){ //type-select选中后，关闭 自动提示全部列表的代码块
                    $scope.hideTreeClass = true;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTreeClass = !$scope.hideTreeClass;
                    },200);
                }
            };

            //全部查询点击行时设置高亮颜色
            $scope.setColorClass = function(typeobject){
                if(angular.isDefined($scope.autoMessageArray)){
                    $.each($scope.autoMessageArray, function(index, amy){
                        if(amy === typeobject){
                            amy.getColor = true;
                        } else {
                            amy.getColor = false;
                        }
                    })
                }
            }

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量
            $scope.setautoMessageValue = function(autoflag, organization, value){
                if(autoflag === "areaname") {
                    organization.areaName = value;
                    $scope.hideTreeClass = !$scope.hideTreeClass;
                }
            }

            //添加区域弹出  弹框-控制器里的- 点击树取值
            $scope.setActiveAreaTree = function (node) {
                $scope.showSuccess = false;
                $scope.organization.parentname = node.title;
                $scope.organization.parentid = node.id;
                $scope.toggle();
            };
            //查询时需要返回值 --接受人、最终接受人、续转合同代码查询
            $scope.getByReturn = function(aim,condition){
                var temp = aim+"";
                var keywords = {"id":aim,"value":condition, "holdFlag": false};
                return CodeService.getCodes(keywords,{}).then(
                    function(data){
                        $scope.autoMessageArray = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
            };
            //获取选择教室信息
            $scope.searchclassrooms = function() {
                var tmp = $scope.organization.areaName.split(',');
                $scope.organization.areaid = tmp[0];
                $scope.organization.areaName =tmp[1];
            };
            //获取父设备id
//            $scope.getParenetDevice = function(parentId){
//                $scope.parentDeviceId = parentId;
//            };
            $scope.ok = function (organization) {
                //编辑直播课表保存接口
                SystemService.addOrganization(organization).then(
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
            //添加机构--机构代码验重
            $scope.selectCode = function(){
                $scope.showCodeError = false;
                var copy = $scope.organization.code;
                var findCode = {
                    "code":$scope.organization.code
                };
                if($scope.organization.code !== undefined){
                    SystemService.findOrganization(findCode).then(
                        function(data){
                            $scope.showCodeError = data > 0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
                }else{
                    $scope.showCodeError = false;
                }
            };

            //添加机构--机构名称和父级机构验重
            $scope.selectName = function(){
                console.log($scope.organization.name);
                if($scope.organization.name !== undefined &&  $scope.organization.parentname !== undefined){
                    var findName = {
                        "name":$scope.organization.name,
                        "parentid":$scope.organization.parentid
                    };
                    SystemService.findOrganization(findName).then(
                        function(data){
                            $scope.showNameError = data > 0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
                }
            };
            //重新填写，清楚已写信息
            $scope.refill = function(){
                $scope.organization = '';
            };
            $scope.attributeChange = function(attribute){
                if(attribute === '2'){
                    $scope.areaNameShow = true;
                }else{
                    $scope.areaNameShow = false;
                }
            };
            var init = function(){
//                SystemService.searchtype().then(
//                    function(data){
//                        $scope.typeList=data;
//                    },
//                    function(code){
//                        //处理失败后操作
//                        alert("添加失败!");
//                    }
//                );
                $scope.areaNameShow === false;
                //默认隐藏自动提示框内容
                $scope.hideTreeClass = true;
            };
            init();
        };
        //批量删除机构
        $scope.delOrganizations = function () {
            var modalInstance = $modal.open({
                templateUrl: 'system/organization/system.deleteorganizations.modal.html',
                backdrop:'static',
                controller: DelOrganizationModalCtrl,
                resolve: {
                    selectedOrgan: function () {
                        return $scope.selectedOrgan;
                    }
                }
            }).result.then(
                function(){
                    $scope.systemorganizations("",$scope.setTreeid,$scope.pagination,"");
                    organizationTrees("trees");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        //删除机构
        $scope.delOrganization = function (organization) {
        	var data=[];
        	data[0] = organization;
            $modal.open({
                templateUrl: 'system/organization/system.deleteorganization.modal.html',
                backdrop:'static',
                controller: DelOrganizationModalCtrl,
                resolve: {
                    selectedOrgan: function () {
                        return data;
                    }
                }
            }).result.then(
                function(){
                	$scope.systemorganizations("",$scope.setTreeid,$scope.pagination,"");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        var DelOrganizationModalCtrl = function ($scope, $modalInstance, selectedOrgan,growl) {
            $scope.selectedOrgan=selectedOrgan;
            $scope.delorganization = function(selectedOrgan){
                //编辑直播课表保存接口
                SystemService.delOrganization(selectedOrgan).then(
                    function(data){
                    	if(data>0)
                    		growl.addSuccessMessage('机构信息已删除');
                    	else
                    		growl.addErrorMessage('机构删除失败');
                        $modalInstance.close(true);
                    },
                    function(code){
                        //处理失败后操作
                        alert("添加失败!");
                    }
                );
            };
            $scope.ok = function () {
                $scope.delorganization($scope.selectedOrgan)
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        //编辑机构
        $scope.editOrganization = function (organization) {
            var modalInstance = $modal.open({
                templateUrl: 'system/organization/system.organization.modal.html',
                backdrop:'static',
                controller: EditOrganizationModalCtrl,
                resolve: {
                    organization: function () {
                        return organization;
                    },
                    tree: function () {
                        return $scope.areaTree;
                    },
                    status:function(){
                        return $scope.statusList
                    },
                    tattribute:function(){
                        return $scope.TattributeList
                    }
                }
            }).result.then(
                function(Add){
                    $scope.systemorganizations("");
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };
        var EditOrganizationModalCtrl = function ($scope, $modalInstance,tree, organization,growl,status,tattribute,$timeout) {
            $scope.TattributeList = tattribute;
            $scope.statusList = status;
            $scope.organization = angular.copy(organization);
            $scope.areaTree = tree;
            $scope.editingMode = organization? true:false;
            $scope.hideTree = true;
            $scope.showSuccess = true;

            if($scope.organization.state === '可用'){
                $scope.organization.state = '0'
            }
            if($scope.organization.state === '停用'){
                $scope.organization.state = '1'
            }
            //展开关闭列表树
            $scope.toggle = function () {
                $scope.hideTree = !$scope.hideTree;
            };
            //添加区域弹出  弹框-控制器里的- 点击树取值
            $scope.setActiveAreaTree = function (node) {
                $scope.organization.parentname = node.title;
                $scope.toggle();
            };
            //查询全部的自动提示列表
            $scope.toggleTreeClass = function (flag) {
                if(flag === "ImmediatelyClose"){ //type-select选中后，关闭 自动提示全部列表的代码块
                    $scope.hideTreeClass = true;
                } else {
                    //添加延时，保证自动提示列表的数据先获取到
                    $timeout(function(){
                        $scope.hideTreeClass = !$scope.hideTreeClass;
                    },200);
                }
            };
            $scope.attributeChange = function(attribute){
                if(attribute === '2'){
                    $scope.areaNameShow = true;
                }else{
                    $scope.areaNameShow = false;
                }
            };

            //全部查询点击行时设置高亮颜色
            $scope.setColorClass = function(typeobject){
                if(angular.isDefined($scope.autoMessageArray)){
                    $.each($scope.autoMessageArray, function(index, amy){
                        if(amy === typeobject){
                            amy.getColor = true;
                        } else {
                            amy.getColor = false;
                        }
                    })
                }
            }

            //将自动提示列表中选中的值赋值给自动提示框绑定的变量
            $scope.setautoMessageValue = function(autoflag, organization, value){
                if(autoflag === "areaname") {
                    organization.areaName = value;
                    $scope.hideTreeClass = !$scope.hideTreeClass;
                }
            }


            //查询时需要返回值 --接受人、最终接受人、续转合同代码查询
            $scope.getByReturn = function(aim,condition){
                var temp = aim+"";
                var keywords = {"id":aim,"value":condition, "holdFlag": false};
                return CodeService.getCodes(keywords,{}).then(
                    function(data){
                        $scope.autoMessageArray = data;
                        return data;
                    },
                    function(code){
                        return [];
                    }
                );
            };
            //获取选择教室信息
            $scope.searchclassrooms = function() {
                var tmp = $scope.organization.areaName.split(',');
                $scope.organization.areaid = tmp[0];
                $scope.organization.areaName =tmp[1];
            };
            //添加区域弹出  弹框-控制器里的- 点击树取值
            $scope.setActiveAreaTree = function (node) {
                $scope.showSuccess = false;
                $scope.organization.parentname = node.title;
                $scope.organization.parentid = node.id;
                $scope.toggle();
            };
            var code = $scope.organization.code;
            //编辑机构--机构代码验重
                $scope.selectCode = function(){
                    $scope.showCodeError = false;
                    if(angular.isDefined($scope.organization.code) && $scope.organization.code !== '' && code !== $scope.organization.code){
                        var findCode = {
                            "code":$scope.organization.code
                        };
                        SystemService.findOrganization(findCode).then(
                            function(data){
                                $scope.showCodeError = data > 0;
                            },
                            function(code){
                                growl.addErrorMessage('发生意外错误');
                            }
                        );
                    }else{
                        $scope.showCodeError = false;
                    }
                };

            var name = $scope.organization.name;
            //编辑机构--机构名称和父级机构验重
            $scope.selectName = function(){
                if(angular.isDefined($scope.organization.name) && $scope.organization.name !== '' && name !== $scope.organization.name && $scope.organization.parentname !== ''){
                    var findName = {
                        "name":$scope.organization.name,
                        "parentname":$scope.organization.parentname
                    };
                    SystemService.findOrganization(findName).then(
                        function(data){
                            $scope.showNameError = data > 0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
                }else{
                    $scope.showNameError = false;
                }
            };
            $scope.ok = function (organization) {
                //编辑直播课表保存接口
                SystemService.editOrganization(organization).then(
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
            //重新填写，清楚已写信息
            $scope.refill = function(){
                $scope.organization = '';
            };
            var init = function(){
//                SystemService.searchtype().then(
//                    function(data){
//                        $scope.typeList=data;
//                    },
//                    function(code){
//                        //处理失败后操作
//                        alert("添加失败!");
//                    }
//                );

                //默认隐藏自动提示框内容
                $scope.hideTreeClass = true;
            };
            init();
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
            if($scope.selectorganization === '1'){
                $scope.systemorganizations($scope.organization,_pagination,""); //调用查询接口
            }else{
                $scope.organization = '';
                $scope.systemorganizations($scope.organization,_pagination,""); //调用查询接口
            }

        };
        //Json系统设置--机构管理
        $scope.systemorganizations=function(select){
            $scope.selectorganization = select;
            SystemService.searchOrganization($scope.organization,$scope.activeArea.id,$scope.pagination,"").then(
                function(data){
                   $scope.organizationList=data.data;
                    $scope.pagination.totalItems = data.total;
                    $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                },
                function(){

                }
            );
        };
        //Json--Tree
        var organizationTrees = function(smalltree){
            TreeService.systemTree(smalltree).then(
                function(data){
                    $scope.areaTreecopy = data;
                    $scope.areaTree = $scope.areaTreecopy
                    $scope.activeArea.id = $scope.areaTree[0].id;
                    $scope.activeArea.title = $scope.areaTree[0].title;
                    $scope.systemorganizations();
                },
                function(){
                }
            );
        };
        //点击全部选中时设置控制的单选按钮状态
        $scope.checkAllFacilitys = function (){
            $scope.checkAll = !$scope.checkAll;
            $.each($scope.organizationList, function(index, organization){
                organization.checked = $scope.checkAll;
            });
        };
        //监视contractList中是否有元素被改变状态
        $scope.selectedOrgan=[];
        $scope.$watch('organizationList', function(){
            //监测是否有元素被选中
          $scope.selectedOrgan= $filter('filter')($scope.organizationList,{checked:true});
            $scope.selectedCount = $scope.selectedOrgan.length;
            if($scope.selectedCount === $scope.organizationList.length)
                $scope.checkAll = true;
            else
                $scope.checkAll = false;
        },true);

//        //按属性查询下拉框
//        var selectState = function(){
//            SystemService.searchtype().then(
//                function(data){
//                    $scope.typeList=data;
//                },
//                function(code){
//                    //处理失败后操作
//                    alert("添加失败!");
//                }
//            );
//        };
        //状态翻译状态码
        $scope.initStatus = function(state){
        	var name ="";
        	$.each($scope.statusList,function(index,data){
        		if(data.value == state){
        			name = data.name;
        			return false;
        		}
        	});
        	return name;
        };
        //属性翻译状态码
        $scope.initAttributeName = function(attributeName){
        	var tattributename ="";
        	$.each($scope.TattributeList,function(index,data){
        		if(data.value == attributeName){
                    tattributename = data.name;
        			return false;
        		}
        	});
        	return tattributename;
        };
        //初始化状态的接口
        $scope.selectStatus = function (){
        	TacticsService.code("state").then(
                function(data){
                    $scope.statusList = data;
                },
                function(){

                }
            );
        };
        //初始化属性的接口
        $scope.selectTattribute = function (){
        	TacticsService.code("institution").then(
                function(data){
                    $scope.TattributeList = data;
                },
                function(){

                }
            );
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
                    return max_height + 70;                
                  });             
            },1000);
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
            $scope.systemorganizations();
        };

        var init = function(){

            $scope.selectorganization = '';
            //初始化状态的接口
            $scope.selectStatus();
            //初始化查询属性下拉框
            $scope.selectTattribute();

            //树的显示
            organizationTrees("trees");
          //初始化机构树tree结构
           /* organTrees("tree",'');*/
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
            //排序对象
            $scope.sort = {
            	name:"asc",
            	attribute:"asc",
            	state:"asc",
            	Sort:"asc",
            };
            $scope.$parent.active = 1;
            $scope.hideAdvancedSearch = true;
            $scope.organizationList=[];
            $scope.areaTree = [];
            $scope.organization = {
            		"temp":""
            }            
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_system_organization_url_view') === -1){
                    console.log("+++++++机构管理  您没有权限+++++++++")
                    $location.path('system/limits');
            }
        };

        setTreeHeight();
        init();
    }]);
});