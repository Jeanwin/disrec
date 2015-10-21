define(['app','config'], function (app,config) {
    app.registerController('SystemDataCtrl', ['$scope','$modal','$location','SystemService' , '$timeout',function ($scope,$modal,$location,SystemService,$timeout) {
        //查询分类
        $scope.searchclassify = function (keywords, pagination, user){
            SystemService.searchclassify(keywords, pagination, user).then(
                function(data){
                    $scope.organizationList = data.data;
                    pagination.totalItems = data.total;
                },
                function(code) {
                    throw(code);
                }
            );
        };


        //编辑数据字典代码
        $scope.editCode = function(code){

            var modalInstance = $modal.open({
                templateUrl: 'system/data/system.edit.code.modal.html',
                backdrop:'static',
                controller: EditCodeModalCtrl,
                resolve: {
                    code: function () {
                        return angular.copy(code);
                    },
                    activeTreeNode: function () {
                        return $scope.activeTreeNode;
                    }
                }
            }).result.then(
                function(){
                    $scope.searchCodes();
                },
                function(reason){
                }
            );
        };

        var EditCodeModalCtrl = function ($scope, $modalInstance, code, activeTreeNode, growl) {
            $scope.code = code;
            $scope.editingMode = code || false;

            $scope.code = code || {
            	parentid:activeTreeNode.node.id,
                parentName: activeTreeNode.node.name,
                name: '',
                value:''
            };

            $scope.ok = function () {
                SystemService.addclassif($scope.code).then(
                    function(data){
                        	if(data>0){
                        		growl.addSuccessMessage('添加成功');
                        	}else{
                        		growl.addErrorMessage('添加失败');
                        	}
                        $modalInstance.close(true);
                    },
                    function(code){
                    	growl.addErrorMessage('内部错误');
                    }
                );
            };
            $scope.update = function () {
                SystemService.editclassif($scope.code).then(
                    function(data){
                        	if(data>0){
                        		growl.addSuccessMessage('更新成功');
                        	}else{
                        		growl.addErrorMessage('更新失败');
                        	}
                        $modalInstance.close(true);
                    },
                    function(code){
                    	growl.addErrorMessage('内部错误');
                    }
                );
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            
            var checkName = $scope.code.name;
            //校验名称
            $scope.checkName = function() {
            	$scope.showNameError = false;
            	var data = {
            			name:$scope.code.name,
            			parentid:$scope.code.parentid
            	};
            	if(checkName===$scope.code.name || $scope.code.name==null)
            		return;
            	
            	SystemService.checkName(data).then(
                        function(data){
                            $scope.showNameError = data > 0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
            }
            
            //校验名称
            var checkVal = $scope.code.value;
            $scope.checkVal = function() {
            	 $scope.showValueError = false;
            	var data = {
            			value:$scope.code.value,
            			parentid:$scope.code.parentid
            	};
            	if(checkVal===$scope.code.value || $scope.code.value==null)
            		return;
            	
            	SystemService.checkValue(data).then(
                        function(data){
                            $scope.showValueError = data > 0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
            }
            
        };
        

        //添加或编辑数据字典分类
        $scope.editCategory = function (category) {
            var modalInstance = $modal.open({
                templateUrl: 'system/data/system.edit.category.modal.html',
                backdrop:'static',
                controller: EditCategoryModalCtrl,
                resolve: {
                    category: function () {
                        return category;
                    },
                    activeTreeNode: function () {
                        return $scope.activeTreeNode;
                    },
                    dicTree: function () {
                        return $scope.dicTree;
                    }
                }
            }).result.then(
                function(){
                	$scope.searchCodes();
                	loadTree();
                },
                function(reason){
                }
            );
        };

        var EditCategoryModalCtrl = function ($scope, $modalInstance, category, activeTreeNode,dicTree, growl) {
            $scope.activeTreeNode = activeTreeNode;
            $scope.category = category;
            $scope.editingMode = category || false;
            
            $scope.category = category || {
            	parentid:dicTree[0].id,
                parentName: dicTree[0].name,
                name: '',
                value:''
            };
            $scope.area = {
                attribute: 'N',
                parentid: ""
            };

            if(activeTreeNode.$parentNodeScope){
                $scope.area.parentid = activeTreeNode.$parentNodeScope.node.id;
                $scope.parentName = activeTreeNode.$parentNodeScope.node.name;
            }
            $scope.save = function () {
                SystemService.addclassif($scope.category).then(
                    function(data){
                    	if(data>0)
                        growl.addSuccessMessage('分类信息已添加');
                    	else
                    		growl.addErrorMessage('分类信息添加失败');
                        $modalInstance.close(true);
                    },
                    function(code){
                    }
                );
            };

            $scope.update = function () {
                SystemService.editclassif(category).then(
                    function(data){
                        if(data>0){
                            growl.addSuccessMessage('分类信息已更新');
                            $modalInstance.close(true);
                        }else{
                            growl.addErrorMessage('分类信息更新失败');
                        }

                    },
                    function(code){
                    }
                );
            };


            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            var checkName = $scope.category.name;
            //校验名称
            $scope.checkName = function() {
            	var data = {
            			name:$scope.category.name,
            			parentid:dicTree[0].id
            	};
            	if(checkName===$scope.category.name)
            		return;
            	
            	SystemService.checkName(data).then(
                        function(data){
                            $scope.showNameError = data > 0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
            };
            
          //校验value
            var checkVal = $scope.category.value;
            $scope.checkVal = function() {
            	 $scope.showValueError = false;
            	var data = {
            			value:$scope.category.value,
            			parentid:dicTree[0].id
            	};
            	console.log(data);
            	if(checkVal===$scope.category.value || $scope.category.value==null)
            		return;
            	
            	SystemService.checkValue(data).then(
                        function(data){
                            $scope.showValueError = data > 0;
                        },
                        function(code){
                            growl.addErrorMessage('发生意外错误');
                        }
                    );
            }
        };


        //删除数据字典代码
        $scope.deleteCode = function (code) {
            var modalInstance = $modal.open({
                templateUrl: 'system/data/system.delete.code.modal.html',
                backdrop:'static',
                controller: DelCodeModalCtrl,
                resolve: {
                    code: function () {
                        return code;
                    }
                }
            }).result.then(
                function(){
                    $scope.searchCodes(); //调用查询接口
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };

        var DelCodeModalCtrl = function ($scope, $modalInstance, code, growl) {
            $scope.code = code;

            $scope.ok = function () {
                SystemService.delclassif($scope.code).then(
                    function(data){
                    	if(data>0)
                    		growl.addSuccessMessage('代码已删除');
                    	else
                    		growl.addErrorMessage('代码已删除');
                        $modalInstance.close();
                    },
                    function(code){
                     //   处理失败后操作
                    }
                );
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };


        //删除数据字典分类
        $scope.deleteCategory = function () {
            var modalInstance = $modal.open({
                templateUrl: 'system/data/system.delete.category.modal.html',
                backdrop:'static',
                controller: DelCategoryModalCtrl,
                resolve: {
                    category: function () {
                        return $scope.activeTreeNode.node;
                    }
                }
            }).result.then(
                function(){
                	$scope.activeTreeNode =$scope.activeTreeNode.$parentNodeScope;
                    $scope.searchCodes(); //调用查询接口
                    loadTree();
                },
                function(reason){
                    console.log('reason is '+ reason);
                }
            );
        };

        var DelCategoryModalCtrl = function ($scope, $modalInstance, category, growl) {
            $scope.category = category;

            $scope.ok = function () {
                SystemService.delclassif(category).then(
                    function(data){
                        growl.addSuccessMessage('分类已删除');
                        $modalInstance.close();
                        
                    },
                    function(code){
                        //处理失败后操作
                    }
                );
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        //根据页码查询
        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            if($scope.selectdata === '1'){
                $scope.searchCodes(); //调用查询接口
            }else{
                $scope.numdata = '';
                $scope.searchCodes(); //调用查询接口
            }

        };


        //显示树的当前节点
        $scope.setActiveAreaTreeNode = function (that) {
            $scope.numdata = "";
            $scope.activeTreeNode = that;

            $scope.searchCodes();

             $timeout(function(){
                max_height = $("#rightContent-height").height();  
                console.log("右边内容高度max_height"+max_height);              
                $("#tree-root").css('max-height',function(){
                return max_height + 20;
                // alert()
            });
            },300);
        };


        $scope.searchCodes = function(select){
            $scope.selectdata = select;
            SystemService.searchData($scope.numdata,$scope.activeTreeNode.node.id,$scope.pagination,"").then(
                function(data){
                    $scope.dataList=data.data;
                    $scope.pagination.totalItems = data.total;
                },
                function(){

                }
            );
        };

        //Json--Tree
        var loadTree = function(){
            SystemService.datatree().then(
                function(data){
                    $scope.dicTree = data;
                    if($scope.activeTreeNode.node.id==='')
                        $scope.setActiveAreaTreeNode(
                            {
                                node:{
                                    id:$scope.dicTree[0].id,
                                    name: $scope.dicTree[0].name

                                }
                            });
                },
                function(){
                }
            );
        };
        
        window.onresize = function () {
            min_height =  window.innerHeight;
            $("#rightContent-height").css('min-height',function(){
                return min_height - 337;
             });
            $("#tree-root").css('max-height',function(){               
                return window.innerHeight - 315;                
            });                          
        }
        var setTreeHeight = function(){               
                                 
            $timeout(function(){
                min_height =  window.innerHeight;
                // alert("window.innerHeight"+window.innerHeight);
                $("#rightContent-height").css('min-height',function(){
                    return min_height - 337;
                 });             
            },1000);

            $timeout(function(){
                max_height = $("#rightContent-height").height(); 
                 // alert("窗体高度mix_height"+$('#rightContent-height').css('min-height')); 
                $("#tree-root").css('max-height',function(){
                    return max_height + 40;                
                  });             
            },1000);
        };

        var init = function(){
            $scope.selectdata = '';
            //树的显示
        	$scope.dicTree =[];

            $scope.activeTreeNode = {
                node:{
                    id: '',
                    name:''
                }
            };

            loadTree();
            //分页数据
            
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

            $scope.$parent.active = 5;
            $scope.dataList=[];

            $scope.searchCodes();
            
            //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_system_data_url_view') === -1){
                        console.log("+++++++数据字典  您没有权限+++++++++")
                        $location.path('system/serverConfigure');
                }

        };
        setTreeHeight();
        init();
    }]);
});