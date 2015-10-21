define(['app',
    'config'
], function (app,config) {
    app.registerController('ResourceUploadCtrl', ['$scope','$modal','$filter','$upload','$timeout','$location','ResourceService', 'TreeService',
        function ($scope,$modal,$filter,$upload,$timeout,$location,ResourceService,TreeService) {
    		
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
                $scope.setActiveAreaTreeNode(temp[0]);
        }
        
        //toggleArea
        $scope.toggleArea1 = function(){
        	$scope.toggleArea=!$scope.toggleArea;
        	$scope.int_ = 0;
        	if($scope.toggleArea == false){
        		$scope.areaTree = $scope.areaTreecopy;
        	}else{
        		$scope.areaTree = $scope.organTree;
        		$scope.resourceList.temp = 'hideOrganTree';
        	}
        	initFirstNode($scope.areaTree);
        	
        }
    	
            //--最外层 打开资源上传，批量上传删除界面的弹窗
            $scope.openReleasedFacilityModal=function(){
                console.log("打开资源上传，批量上传界面的弹窗");
                var modalInstance = $modal.open({
                    templateUrl: 'resource/upload/resource.upload.modal.html',
                    backdrop:'static',
                    controller: UploadFacilityModalCtrl,
                    resolve: {
                        selectedItems: function () {
                            return $scope.selectedItems;
                        }
                    }
                    /*打开完以后可以加result.then来执行窗口关闭以后的刷新*/
                }).result.then(
                    /* 窗口关闭以后执行的方法*/
                    function(){
                        console.log("关闭upload删除窗口以后执行的刷新代码21");
                        $scope.resourceupmid("",$scope.activeAreaTreeNode.id,$scope.pagination,"");
                    }
                );
            };
            // 批量上传视频控制器--最外层
            var UploadFacilityModalCtrl=function($scope, $modalInstance, selectedItems, ResourceService,growl){
            	 $scope.selectedItems = selectedItems;
                 //删除设备接口调用
                 /*resourceList要删除的数据的信息*/
                 /*user初始化为空值*/
                 $scope.batchUpload = function(resourceList, user){
                       /*then在serve中调用完了用来执行返回的值，真就执行data假就执行code*/
                     ResourceService.batchUpload(resourceList, user).then(
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
                             alert("上传失败!");
                         }
                     );
                 };

                 $scope.ok = function () {
                     console.log("执行delete,upload中的的数据");
                     $scope.batchUpload($scope.selectedItems, {});
                 };
                 $scope.cancel = function () {
                     $modalInstance.dismiss('cancel');
                 };
            };



            //删除弹出框--最外层
            $scope.openDeleteFacilityModal = function () {
                console.log("打开resourceUpload删除界面的弹窗");
                var modalInstance = $modal.open({
                    templateUrl: 'resource/upload/classrooms.deleteUpload.modal.html',
                    backdrop:'static',
                    controller: DeleteFacilityModalCtrl,
                    resolve: {
                        selectedItems: function () {
                            return $scope.selectedItems;
                        }
                    }
                    /*打开完以后可以加result.then来执行窗口关闭以后的刷新*/
                }).result.then(
                   /* 窗口关闭以后执行的方法*/
                    function(){
                        console.log("关闭upload删除窗口以后执行的刷新代码21");
                        $scope.resourceupmid("",$scope.activeAreaTreeNode.id,$scope.pagination,"");
                    }
                );
            };
            //删除弹出框--控制器--最外层
            var DeleteFacilityModalCtrl = function ($scope, $modalInstance, selectedItems,growl, ResourceService) {
                $scope.selectedItems = selectedItems;
                //删除设备接口调用
                /*resourceList要删除的数据的信息*/
                /*user初始化为空值*/
                $scope.deleteUpload = function(resourceList, user){
                      /*then在serve中调用完了用来执行返回的值，真就执行data假就执行code*/
                    ResourceService.deleteUpload(resourceList, user).then(
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
                            alert("删除失败!");
                        }
                    );
                };

                $scope.ok = function () {
                    console.log("执行delete,upload中的的数据");
                    $scope.deleteUpload($scope.selectedItems, {});
                };
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            };

            
            //--最外层  --初始化
            $scope.activeAreaTreeNode = {id:'',title:''};

            //设置当前选中的树节点-点击树时-最外层 显示当前区域
            $scope.setActiveAreaTreeNode = function (that) {
                 //把当前树节点的信息给了$scope.activeAreaTreeNode
                
                if($scope.areaTree[0].temp){
                	$scope.uploadFlag.temp = "hideOrganTree";
                }else{
                	$scope.uploadFlag.temp = "";
                }
                if(that.nodes.length <= 0){
                	$scope.activeAreaTreeNode = angular.copy(that);
                }else{
                	$scope.selectOnetree(that);
                }
                $scope.resourceupload($scope.uploadFlag, $scope.activeAreaTreeNode.id,$scope.pagination,"");
                $timeout(function(){
                    max_height = $("#rightContent-height").height();  
                    console.log("右边内容高度max_height"+max_height);              
                    $("#tree-root").css('max-height',function(){
                    return max_height + 50;
                    // alert()
                });
                },300);
            };
            //按条件查询
            $scope.resourceupmidBywhere = function(select){
                 $scope.resourceupmid($scope.upload,$scope.activeAreaTreeNode.id,$scope.pagination,""); //调用查询接口
             };
            //根据页码查询-最外层
            $scope.onSelectPage = function(pageIndex){
               /* 把分页的下标传值给$scope.pagination.pageIndex*/
                $scope.pagination.pageIndex = pageIndex;
                var _pagination = angular.copy($scope.pagination);
                if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                    _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
                }
//                alert($scope.activeAreaTreeNode)
//                $scope.resourceupload($scope.upload,$scope.activeAreaTreeNode.id,$scope.pagination,""); //调用查询接口
                $scope.resourceupmid($scope.upload,$scope.activeAreaTreeNode.id,_pagination,""); //调用查询接口
            };

            //点击全部选中时设置控制的单选按钮状态-最外层
            $scope.checkAllUploads = function (){
                if($scope.resourceList.length>0){
                $scope.checkAll = !$scope.checkAll;
                $.each($scope.resourceList, function(index, upload){
                    upload.checked = $scope.checkAll;
                });
                }
            };

            //--最外层
            $scope.selectedItems = [];
            //监视contractList中是否有元素被改变状态--最外层
            $scope.$watch('resourceList', function(){
                //监测是否有元素被选中
                $scope.selectedItems = $filter('filter')($scope.resourceList, {checked:true});
                $scope.selectedCount =  $scope.selectedItems.length;
//                alert($scope.selectedCount)
                if( $scope.selectedCount === $scope.resourceList.length && $scope.resourceList.length>0)
                    $scope.checkAll = true;
                else
                    $scope.checkAll = false;
            },true);

//            选中第一个教室-最外层
            $scope.selectOnetree=function(tree){
                if(tree.nodes.length >= 1) {
                    $.each(tree.nodes, function (index, tree_1) {
                        $scope.selectOnetree(tree_1);
                    })
                }else{
                         if($scope.int_===0 && tree.nodes.length <= 0 ){
                             $scope.activeAreaTreeNode = angular.copy(tree);
                             //$scope.resourceupload("",tree.id,$scope.pagination,"");
                             $scope.int_=1;
                         }
                    //断点
//                    }
                }
            }
//            $scope.selectOnetree1=function(tree){
//                if(tree.nodes!=='') {
//                    alert(tree.title);
//                    $.each(tree.nodes, function (index, tree_1) {
//                        $scope.selectOnetree(tree_1);
//                    })
//                }
//            }
            //Json--Tree^-最外层
           var mainTrees = function(keywords,areaid){
//           var mainTrees = function(){
                TreeService.mainTree(keywords,areaid).then(
                    function(data){
                    	$scope.areaTreecopy = data;
                        $scope.areaTree = $scope.areaTreecopy;
                        console.log('通过后台接口获取树接口');
                       // $scope.getSelectUploads($scope.areaTree);
                        
                        //处理选中班级节点
                        $scope.dealClassNode();
                        
                    },
                    function(){
                    }
                );
            };



        //Json资源管理--资源上传-最外层
           //初始化信息并且把初始化信息给了$scope.resourceList数组
        $scope.resourceupload = function (keywords,areaid,pagination,user){
//            $scope.resourceupload($scope.upload,$scope.activeAreaTreeNode.id,_pagination,""); //调用查询接口
            console.log('进入resourceUPload的初始化资源服务');
            ResourceService.resourceUpload(keywords,areaid,pagination,user).then(
                function(data){
                    console.log("resourceupload回调成功以后的赋值操作");
                    console.log(data);
                    if(data.total > 0) {
                        $scope.resourceList = data.data;
                        console.log(pagination,"上传资源的分页信息");
                        $scope.pagination.totalItems = data.total;
                         //告诉页面数据已经加载完毕
                        $scope.getDataReady = true;
//                        $scope.pagination.totalItems =  $scope.resourceList.length;
                        //测试
          //              $scope.growl("成功更新区域",'successed');

                    }else if(data.total === 0){
                        //如果没有查到信息，则页面信息无变化
                        $scope.resourceList =[];
                        //绿框
//                        $scope.growl("未查找到相关信息",'success');
                        $scope.pagination.totalItems = data.total;
                        //篮框
//                        $scope.growl("未查找到相关信息",'danger');
                        //
                    }else{
                    	  //如果没有查到信息，则页面信息无变化
                        $scope.resourceList =[];
                        //篮框
                        $scope.growl("该教室没有绑定设备",'danger');
                    }
                },
                function(){

                }
            );
        };

            //资源上传批量删除后列表显示-最外层
            $scope.resourceupmid = function (keywords,areaid,pagination,user){
//            $scope.resourceupload($scope.upload,$scope.activeAreaTreeNode.id,_pagination,""); //调用查询接口
                console.log('进入resourceupmid的初始化资源服务');
                ResourceService. resourceupmid(keywords,areaid,pagination,user).then(
                    function(data){
                        console.log("resourceupload回调成功以后的赋值操作");
                        console.log(data);
                        if(data.total >= 0) {
                            $scope.resourceList = data.data;
                            console.log(pagination,"上传资源的分页信息");
                            $scope.pagination.totalItems = data.total;
//                        $scope.pagination.totalItems =  $scope.resourceList.length;
                            //测试
 //                           $scope.growl("成功更新区域",'successed');
                        }else{
                            //如果没有查到信息，则页面信息无变化
                            $scope.resourceList =[];
                            //绿框
//                        $scope.growl("未查找到相关信息",'success');
                            //篮框
//                            $scope.growl("未查找到相关信息",'danger');
                            //
                        }
                    },
                    function(){

                    }
                );
            };
           // 初始化树
//            $scope.getSelectUploads = function(that){
//                if(that.attribute === "Y" && $scope.stop){
//                    $scope.activeAreaTreeNode = that;
//                    alert(that.title);
//                    console.log(that.id,"点击得到树id");
//                    $scope.upload=[];
//                    $scope.setActiveAreaTreeNode(that,"");
//                    $scope.stop = false;
//                    return false;
//                }
//                if(that.nodes){
//                    alert('3');
//                    $.each(that.nodes, function(index, _that){
//                            alert('4');
//                        $scope.getSelectUploads(_that);
//                    });
//                }
//            };
        
        window.onresize = function () {
            min_height =  window.innerHeight;
            $("#rightContent-height").css('min-height',function(){
                return min_height - 320;
             });
            $("#tree-root").css('max-height',function(){               
                return window.innerHeight - 250;                
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
        
        //节点折叠展开处理 start
        var treeRootScope;
        var treeNodesScope;

        var targetId = "";
        var targetScope;

        var expandParents = function(_node) {
            if(!_node)
                return;

            console.log(_node);
            _node.expand();
            expandParents(_node.$parentNodeScope);

        };

        var findTarget = function(_nodes){
            $.each(_nodes, function(index, __node){
                __node.collapse();
                if(__node.$modelValue.id === targetId) {
                    console.log('find ');
                    targetScope = __node;
                    return __node;
                }else{
                    if(__node.hasChild())
                        return findTarget(__node.childNodes())
                }

            });
        };
        //节点折叠展开处理 end
        
        //处理选中班级节点
        $scope.dealClassNode = function(){
        	$scope.dealLocationValue = window.location.href.split("?");
            $scope.dealLocationParamValue = $scope.dealLocationValue[1];
            if(angular.isUndefined($scope.dealLocationParamValue)){
            	$scope.hiddenTreeFlag = true;
            	
            	//如果地址栏不带参数的话，默认查询第一个教室的列表信息
            	$.each($scope.areaTree,function(index,tree){
                    $scope.selectOnetree(tree);
                })
            } else {
            	$scope.hiddenTreeFlag = false;
            	$scope.dealLocationParamArray = $scope.dealLocationParamValue.split("=")[1];
            	targetId = $scope.dealLocationParamArray;
            	//遍历树节点，查找默认教室，查找到，将上级节点展开
            	$timeout(function(){
            		$scope.stop = true;
            		
            		treeRootScope = angular.element(document.getElementById('tree1-root')).scope();
                    treeNodesScope = angular.element(document.getElementById('tree1-nodes')).scope();

                    //console.log(treeNodesScope);
                    //console.log(treeNodesScope.childNodes());
                    var _target_node = findTarget(treeNodesScope.childNodes());

                    if(targetScope) {
                        console.log(targetScope.$modelValue.title);
                        expandParents(targetScope);
                        //必须整个传入一个对象，才可默认选中
//    	                $scope.activeAreaTreeNode = {id:'',title:''};
//    	                $scope.activeAreaTreeNode.id = $scope.dealLocationParamArray;
    	                
    	                $scope.activeAreaTreeNode = targetScope.$modelValue;
    	                $scope.resourceupload("", $scope.activeAreaTreeNode.id,$scope.pagination,""); 
                    }else{
                        treeRootScope.collapseAll();
                    }
            	},200);
            	
            }
        };
      //把$scope.hideAdvancedSearch做个联动
        $scope.$watch('hideAdvancedSearch',function(){
            if($scope.hideAdvancedSearch){
                $scope.upload.startdate='';
                $scope.upload.enddate='';
                $scope.upload.uploadstate='';
                $scope.upload.uploaddeletestatus='';
                $scope.upload.course='';
                $scope.upload.username='';
                $scope.upload.deptname='';
            }else{
                $scope.upload.name='';
            }
        });
      //定义查询数据于前台文本框做关联查询数据
        $scope.upload={
                "name":'',
                "uploadstate":'',
                "uploaddeletestatus":'',
                "course":'',
                "username":'',
                "deptname":'',
                "startdate":'',
                "enddate":'',
                "temp":""
        };
        $scope.uploadFlag = {
        		"temp":""
        }
        //进入页面-最外层  初始化
        var init = function(){
        	//$scope.upload='';
        	 $scope.hideAdvancedSearch = true;
            $scope.activeAreaTreeNode = [];
            //全选按钮设置为未选中状态（不初始化为false）
            $scope.checkAll = false;
            $scope.int_=0;
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



            //初始化对象给keywords
//            $scope.upload = {
////                "name":"",
////                "innerid":"",
////                "state":""
//            };
            $scope.$parent.active = 0;
            $scope.resourceList=[];
            $scope.areaTree =[];
            //初始化树tree结构
            //传deviceSet是为了调用树下边子的方法
            mainTrees("deviceSet","");
            $scope.stop = true;
//            $timeout(function(){
//                console.log($scope.areaTree,"原始树");
//                //初始化树
//                getSelectUploads($scope.areaTree[0]);
//            },100);
//            $timeout(function(){
//                var getSelectUploads = function(that){
//                    if(that.attribute === "Y" && $scope.stop){
//                        $scope.activeAreaTreeNode.id = that.id;
//                        alert(that.id);
//                        console.log(that.id,"点击得到树id");
//                        $scope.upload=[];
//                        $scope.searchEvents();
//                        $scope.stop = false;
//                    }
//                    if(that.nodes){
//                        $.each(that.nodes, function(index, _that){
//                            alert(_that.title);
//                            getSelectUploads(_that);
//                        });
//                    }
//                };
//                getSelectUploads($scope.areaTree);
//            },100);
            console.log('获取资源列表');
            userTrees("trees",'');
//           $scope.resourceupload("","",$scope.pagination,"");
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_resource_upload_url_view') === -1){
//                alert("对不起！您没有权限访问。")
                console.log("+++++++资源上传  您没有权限+++++++++");
                //没有权限的话，跳转到下一个功能块
                $location.path('resource/video');
            };
            
        };
        setTreeHeight();
        init();
    }]);
});
