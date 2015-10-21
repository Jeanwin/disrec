define(['app','config'], function (app,config) {
    app.registerController('ActionManageCtrl', ['$scope','$modal','$location','TeachSearchService',function ($scope,$modal,$location,TeachSearchService) {
    	
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
            	$scope.GetActionList($scope.searchkey); //调用查询接口
            }else{
            	$scope.GetActionList(""); //调用查询接口
            }

        };
    	
    	//删除活动模板
    	$scope.deleteactionModal = function(index){
    		var modalInstance = $modal.open({
                templateUrl: 'teachResearch/listenModal/deleteListenModal.modal.html',
                backdrop:'static',
                controller: DeleteactionModalCtrl,
                resolve: {
                	actionID:function(){
                		return $scope.actionLists[index].id;
                	}
    				
                }
            }).result.then(
                    function(){
                    	$scope.actionLists.splice(index,1);
                    	$scope.pagination.totalItems -- ;
                    }
                );
    	}
    	var DeleteactionModalCtrl = function ($scope, $modalInstance,growl,actionID) {
    		
    		$scope.cancel = function(){
    			$modalInstance.dismiss('cancel');
    		}
    		$scope.save = function(){
    			TeachSearchService.DeleteActiveModal(actionID).then(
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
    	
    	$scope.GetActionList = function(keywords){
    		TeachSearchService.GetActiveListModal(keywords,$scope.pagination).then(
    				function(data){
    					$scope.actionLists = data.data;
    					for(var i in $scope.actionLists){
    						$scope.actionLists[i].createdate = $scope.CurentTime($scope.actionLists[i].createdate);
    					}
    					$scope.pagination.totalItems = data.total;
    					console.log($scope.actionLists);
    				},
    				function(){
    					
    				}
    		)
    	}
            

            var init = function(){
            	$scope.$parent.active = 3;
                $scope.searchkey = {};
                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_teachResearch_actionManage_url_view') === -1){
                    console.log("+++++++课表管理  您没有权限+++++++++")
                    $location.path('teachResearch/teachStatistics');
                } 
                $scope.key = {
                		'status':"",
                		'type':"",
                		"searchkey":"",
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
                $scope.searchkey ="";
                /*$scope.key = {
                		'statustype':"",
                		'scheduletype':""
                }*/
                $scope.GetActionList("");
            };

            init();
        }]);
});
