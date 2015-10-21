define(['app','config'], function (app,config) {
    app.registerController('ListenRecordCtrl', ['$scope','$modal','$location','TeachSearchService',function ($scope,$modal,$location,TeachSearchService) {
    	
    	//删除活动模板
    	$scope.listenRecord = function(index){
    		var modalInstance = $modal.open({
                templateUrl: 'teachResearch/listenRecord/listenRecord.modal.html',
                /*backdrop:'static',*/
                controller: listenRecordModalCtrl,
                resolve: {
                	listencontent:function(){
                		return $scope.listenrecordLists[index];
                	}
    				
                }
            }).result.then(
                    function(){
                    	
                    	
                    }
                );
    	}
    	var listenRecordModalCtrl = function ($scope, $modalInstance,growl,listencontent) {
    		$scope.listencontent = listencontent;
    		$scope.cancel = function(){
    			$modalInstance.dismiss('cancel');
    		}
    		$scope.save = function(){
    			
    		}
    		
    	}
    	
    	$scope.GetlistenrecordList = function(keywords){
    		TeachSearchService.RecordListModal(keywords,$scope.pagination).then(
    				function(data){
    					$scope.listenrecordLists = data.data;
    					for(var i in $scope.listenrecordLists){
    						$scope.listenrecordLists[i].createDate = $scope.CurentTime($scope.listenrecordLists[i].createDate);
    					}
    					$scope.pagination.totalItems = data.total;
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
            	$scope.GetlistenrecordList($scope.searchkey); //调用查询接口
            }else{
            	$scope.GetlistenrecordList(""); //调用查询接口
            }

        };

            var init = function(){
                $scope.$parent.active = 2;
                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_teachResearch_listenRecord_url_view') === -1){
                    console.log("+++++++课表管理  您没有权限+++++++++")
                    $location.path('teachResearch/actionManage');
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
                $scope.GetlistenrecordList('');
                
            };

            init();
        }]);
});
