define(['app','config'], function (app,config) {
    app.registerController('ListenModalCtrl', ['$scope','$modal','$location','TeachSearchService',function ($scope,$modal,$location,TeachSearchService) {
    	
    	//
    	$scope.stateFlagChange = function(index){
    		for(var i=0;i<$scope.listenLists.length;i++){
    			if($scope.listenLists[i].status === '1'){
    				$scope.listenLists[i].status = '0';
    			}
    		}
    		$scope.listenLists[index].status = '1';
    		var key = {
    				'id':$scope.listenLists[index].id,
    				'status': $scope.listenLists[index].status
    		}
    		TeachSearchService.ChangeStatus(key).then(
    				function(data){
    					console.log(data);
    				}
    		)
    		
    	}    	
    	
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
           if($scope.searchkey){
            	$scope.GetlistenList($scope.searchkey); //调用查询接口
            }else{
            	$scope.GetlistenList(""); //调用查询接口
            }

        };
   	  
    	$scope.GetlistenList = function(keywords){
    		TeachSearchService.GetlistenModal(keywords,$scope.pagination).then(
    				function(data){
    					$scope.listenLists = data.data;
    					for(var i in $scope.listenLists){
    						$scope.listenLists[i].createtime = $scope.CurentTime($scope.listenLists[i].createtime);
    					}
    					$scope.pagination.totalItems = data.total;
    					console.log($scope.listenLists);
    				},
    				function(){
    					
    				}
    		)
    	}
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
           if($scope.searchkey){
            	$scope.GetlistenList($scope.searchkey); //调用查询接口
            }else{
            	$scope.GetlistenList(""); //调用查询接口
            }

        };
        //删除听课模板
    	$scope.deletelistenModal = function(index){
    		var modalInstance = $modal.open({
                templateUrl: 'teachResearch/listenModal/deleteListenModal.modal.html',
                backdrop:'static',
                controller: DeletelistenModalCtrl,
                resolve: {
                	listenID:function(){
                		return $scope.listenLists[index].id;
                	}
    				
                }
            }).result.then(
                    function(){
                    	$scope.listenLists.splice(index,1);
                    	$scope.pagination.totalItems--;
                    }
                );
    	}
    	var DeletelistenModalCtrl = function ($scope, $modalInstance,growl,listenID) {
    		
    		$scope.cancel = function(){
    			$modalInstance.dismiss('cancel');
    		}
    		$scope.save = function(){
    			TeachSearchService.DeleteListenModal(listenID).then(
            			function(data){
                			if(data == '1'){
               					growl.addSuccessMessage("删除成功");
               					$modalInstance.close(true);
               				}
               				if(data == '0'){
               					growl.addErrorMessage("删除失败");
               					$modalInstance.close();
               				}
            				
            			},
            			function(){
            				$modalInstance.close();
            				growl.addErrorMessage("系统发生错误，删除失败");
            			}
            	)
    		}
    		
    	}
        //新建听课模板
        $scope.NewlistenModal = function (opera,index) {
        	var transferdata;
        	
        	if(opera == 'edit'){
        		transferdata = $scope.listenLists[index];
        	}
            var modalInstance = $modal.open({
                templateUrl: 'teachResearch/listenModal/newListenModal.modal.html',
                backdrop:'static',
                controller: NewListenModalCtrl,
                resolve: {
                	transferdata:function(){
                		return transferdata;
                	},
                	opera:function(){
                		return opera;
                	}
                }
            }).result.then(
            		function(){
            			$scope.GetlistenList('');
            		}
            		
            );
        };

        var NewListenModalCtrl = function ($scope, $modalInstance, growl,transferdata,opera) {
        	$scope.opera = opera;
        	if(opera == 'edit'){
        		$scope.newlistendata = {
        				'id':transferdata.id,
        				"lectureName":transferdata.lectureName,
        				"description":transferdata.description,
        				"childList":transferdata.childList        				
        			}
        	}else{
        		$scope.newlistendata = {
        				"lectureName":"",
        				"description":"",
        				"childList":[
	        				{
	        				"childKey":"",
	        				"childValue":"",
	        				"sort":""
	        				},
	        				{
	        				"childKey":"",
	        				"childValue":"",
	        				"sort":""
	        				}
        				]
        			}
        	}
        	

        			
        	$scope.cancel = function(){
        		$modalInstance.dismiss('cancel');
        	}
        	$scope.newdata = function(){
        		$scope.newlistendata.childList.push({'order':'','field':'','details':''});
        	}
        	$scope.deletedata = function(index){
        		$scope.newlistendata.contents.splice(index,1);
        	}
        	$scope.save = function(){
        		if(opera == 'edit'){
        			TeachSearchService.UpdatelistenModal($scope.newlistendata).then(
            				function(data){
            					$modalInstance.close('true');
            					growl.addSuccessMessage("修改模板成功");
            				},
            				function(){
            					$modalInstance.close('true');
            					growl.addErrorMessage("修改模板失败");
            				}
            		)
        		}else{
        			TeachSearchService.InsertlistenModal($scope.newlistendata).then(
            				function(data){
            					$modalInstance.close('true');
            					growl.addSuccessMessage("新增模板成功");
            				},
            				function(){
            					$modalInstance.close('true');
            					growl.addErrorMessage("新增模板失败");
            				}
            		)
        		}
        		
        	}
        }


            var init = function(){
                $scope.$parent.active = 0;
                $scope.searchkey = "";
                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_teachResearch_listenModal_url_view') === -1){
                    console.log("+++++++课表管理  您没有权限+++++++++")
                    $location.path('teachResearch/classEvaluation');
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
                    lastText: config.pagination.lastText
                };
                $scope.GetlistenList("");
            };

            init();
        }]);
});
