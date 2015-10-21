define(['app','config'], function (app,config) {
    app.registerController('ClassEvaluationCtrl',['$scope','$modal','$location','TeachSearchService',function ($scope,$modal,$location,TeachSearchService) {

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
            	$scope.GetclassEvaluationList($scope.searchkey); //调用查询接口
            }else{
            	$scope.GetclassEvaluationList(""); //调用查询接口
            }

        };	
    	
    	//获取评课模板列表
    	$scope.GetclassEvaluationList = function(keywords){
    		TeachSearchService.GetclassEvaluationModal(keywords,$scope.pagination).then(
    				function(data){
    					$scope.classEvaluationLists = data.data;
    					for(var i in $scope.classEvaluationLists){
    						$scope.classEvaluationLists[i].createtime = $scope.CurentTime($scope.classEvaluationLists[i].createtime);
    						$scope.classEvaluationLists[i].modifytime = $scope.CurentTime($scope.classEvaluationLists[i].modifytime);
    					}
    					$scope.pagination.totalItems = data.total;
    				},
    				function(){
    					
    				}
    		)
    	}
    	//删除听课表模板
    	$scope.deleteclassEvaluatModal = function(index){    		
    		
    		var modalInstance = $modal.open({
                templateUrl: 'teachResearch/classEvaluation/teachResearch.classEvaDelete.modal.html',
                backdrop:'static',
                controller: DeleteclassEvaModalCtrl,
                resolve: {
                	classEvaID:function(){
                		return $scope.classEvaluationLists[index].id;
                	}
    				
                }
            }).result.then(
                    function(){
                    	$scope.classEvaluationLists.splice(index,1);      
                    	$scope.pagination.totalItems--;
                    }
                );
    	}
    	var DeleteclassEvaModalCtrl = function ($scope, $modalInstance,growl,classEvaID) {
    		
    		$scope.cancel = function(){
    			$modalInstance.dismiss('cancel');
    		}
    		classEvatransfer={'id':classEvaID};
    		$scope.save = function(){
    			TeachSearchService.DeleteclassEvaluationModal(classEvatransfer).then(
        				function(data){
        					if(data == 1){
        						$modalInstance.close('true');
            					growl.addSuccessMessage("删除成功");
        					}
        					if(data == 0){
        						$modalInstance.close();
            					growl.addSuccessMessage("删除失败");
        					}
        					
        				},
        				function(){ 
        					$modalInstance.close();
        					growl.addSuccessMessage("系统错误");
        				}
        		)
    		}
    		
    	}
            //新建评审表
        $scope.classEvaluatModal = function (opera,index) {
        	var transferdata;
        	if(opera == 'edit'){
        		transferdata = $scope.classEvaluationLists[index];
        	}
            var modalInstance = $modal.open({
                templateUrl: 'teachResearch/classEvaluation/newClassEvaluation.modal.html',
                backdrop:'static',
                controller: NewClassEvaluationCtrl,
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
            			$scope.GetclassEvaluationList("");
            		}
            );
        };
        var NewClassEvaluationCtrl=function($scope, $modalInstance, growl,opera,transferdata){
        	$scope.opera = opera;
        	if(opera == 'edit'){
        		$scope.classEvadata = {
        				'id':transferdata.id,
        				"name":transferdata.name,
        				/*'markTypename':transferdata.markType,*/
        				'markType':transferdata.markType,
        				"description":transferdata.description,
        				"childList":transferdata.childList        				
        			}
        	}else{
        		$scope.classEvadata = {
        				"name":"",
        				"description":"",
        				/*'markTypename':"",*/
        				'markType':"1",
        				"childList":[
	        				{
	        				'id':1,
	        				'parentId':null,
	        				"childValue":'5',
	        				"childKey":"",
	        				"sort":1,
	        				'childList':[
									{
										'id':null,
				        				'parentId':1,
										"childValue":'5',
										"childKey":"",
										"sort":1
									}
	        				      ]
	        				}
	        				
        				]
        			}
        	}
        	$scope.cancel=function(){
        		$modalInstance.dismiss('cancel');
        	}
        	$scope.save = function(){
        		if(opera == 'edit'){
        			TeachSearchService.UpdateclassEvaluationModal($scope.classEvadata).then(
	        				function(data){
	        					if(data == 1){
	        						$modalInstance.close('true');
	            					growl.addSuccessMessage("修改评课模板成功");
	        					}
	        					if(data == 0){
	        						$modalInstance.close('true');
	            					growl.addSuccessMessage("修改该评课模板失败");
	        					}
	        				},	
	        				function(){}
	        		)
        		}else{
	        		TeachSearchService.InsertclassEvaluationModal($scope.classEvadata).then(
	        				function(data){
	        					if(data == 1){
	        						$modalInstance.close('true');
	            					growl.addSuccessMessage("新建评课模板成功");
	        					}
	        					if(data == 0){
	        						$modalInstance.close('true');
	            					growl.addSuccessMessage("新建评课模板失败");
	        					}
	        				},	
	        				function(){}
	        		)
        		}
        	}
        	//添加新字段
        	$scope.addnewList = function(track,index){
        		if(track === '1'){
        			$scope.classEvadata.childList.push({
	        				'id':2,
	        				'parentId':null,
	        				"childValue":'5',
	        				"childKey":"",
	        				"sort":$scope.classEvadata.childList.length + 1,
	        				'childList':[
									{
										'id':null,
				        				'parentId':2,
										"childValue":'5',
										"childKey":"",
										"sort":1
									}
	        				      ]
	        				}
        				)
        		}else{
        			$scope.classEvadata.childList[index-1].childList.push({
        				'id':null,
        				'parentId':index,
        				"childValue":'5',
        				"childKey":"",
        				"sort":$scope.classEvadata.childList[index-1].childList.length + 1       				
        				}
    				)
        		}
        	}
        	//删除子节点
        	$scope.deleteList = function(track,index,parentid){
        		if(track == '1'){
        			$scope.classEvadata.childList.splice(index,1);
        			
        		}else{
        			$scope.classEvadata.childList[parentid-1].childList.splice(index,1);
        		}
        	}
        }

        var init = function(){
            $scope.$parent.active = 1;
            //判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_teachResearch_classEvaluation_url_view') === -1){
                console.log("+++++++课表管理  您没有权限+++++++++")
                $location.path('teachResearch/listenRecord');
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
            $scope.GetclassEvaluationList("");
        };

        init();
    }]);
});
