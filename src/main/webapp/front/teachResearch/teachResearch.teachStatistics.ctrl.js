define(['app','config'], function (app,config) {
    app.registerController('TeachStatisticsCtrl', ['$scope','$modal','$location','TeachSearchService',function ($scope,$modal,$location,TeachSearchService) {

    
    	$scope.newStatischart = function(){
    		$scope.transferdata = angular.copy($scope.statisticLists);
    		delete $scope.transferdata.deptTemp;
    		TeachSearchService.StatisticListModal($scope.transferdata).then(
    				function(data){
    					/*console.log(data);
    					$scope.labels = [];*/
    	                /*$scope.series = ['听课', '评课'];*/
    	                /*$scope.data = [
    	                  [500, 1000, 1500, 2000],
    	                  [100, 900, 1300, 2000]
    	                ];*/
    					$scope.labels1 = [];
    					$scope.labels2 = [];
    					$scope.data = [[],[]];
    	                for(var i=0;i<data.deptType.length;i++){
    	                	$scope.labels1[i]=data.deptType[i].deptname;
    	                	$scope.data[0][i]=data.deptType[i].count;
    	                }
    	                for(var j=0;j<data.timeType.length;j++){
    	                	$scope.labels2[j]=data.timeType[j].time;
    	                	$scope.data[1][j]=data.timeType[j].count;
    	                }
    	                console.log($scope.labels1);
    	                console.log($scope.labels2);
    	                console.log($scope.data);
    				},
    				function(){
    					
    				}
    		)
    	}
    	$scope.GetOrigalList = function(keywords){
    		TeachSearchService.DepartStatList(keywords).then(
    				function(data){
    					$scope.orignalList = data;
    				},
    				function(){
    					
    				}
    		)
    	}
        $scope.chooseOrgan = function () {
        	$scope.init_1++;
            var modalInstance = $modal.open({
                templateUrl: 'teachResearch/teachStatistics/chooseOrgan.modal.html',
                backdrop:'static',
                controller: ChooseOrganModalCtrl,
                resolve: {
                	orignalList:function(){
                		return $scope.orignalList
                	},
                	dept:function(){
                		return $scope.statisticLists.dept;
                	},
                	init_1:function(){
                		return $scope.init_1;
                	},
                	cache:function(){
                		return $scope.cache;
                	}
                }
            }).result.then(
            		function(data){
            			console.log(data);
            			$scope.statisticLists.dept = data;
            			$scope.statisticLists.deptTemp="";
            			for(var j=0;j<data.length;j++){
            				$scope.statisticLists.deptTemp = data[j].name + ';' + $scope.statisticLists.deptTemp;
            			}
            			
            		}
            );
        };

        var ChooseOrganModalCtrl = function ($scope, $modalInstance,cache, growl,orignalList,dept) {
        	$scope.selectedList = dept;
        	$scope.orignalList = orignalList;
        	$scope.cache = cache;
        	/*if(init_1 === 1){
        		$scope.cache = $cacheFactory('cacheId');
        	}*/
        	
        	/*$scope.cache.push(key,$scope.orignalList);*/
        	
        	/*$scope.selectedList = [];*/
        	
        	
        	$scope.GetOrigalList = function(keywords){
        		TeachSearchService.DepartStatList(keywords).then(
        				function(data){
        					$scope.orignalList = data;
        				},
        				function(){
        					
        				}
        		)
        	}
        	
        	$scope.addOrignal = function(index){
        		$scope.selectedList.push({
        			'id':$scope.orignalList[index].id,
        			'name':$scope.orignalList[index].name
        		})
        		/*$scope.orignalList[index].checked = true;*/
        		$scope.cache.put(index,'checked');
        	}
        	$scope.delOrignal = function(index){
        		$scope.cache.remove(index,'checked');
        		for(var i=0;i<$scope.selectedList.length;i++){
        			if($scope.selectedList[i].id == $scope.orignalList[index].id){
        				$scope.selectedList.splice(i,1);
        				
        			}
        		}        		
        	}
        	$scope.cancel = function(){
        		$modalInstance.dismiss('cancel');
        	}
        	$scope.saveselected = function(){
        		console.log("savelogo")
        		$modalInstance.close($scope.selectedList);
        		
        	}
        }
        $scope.changetype = function(index){
        	$scope.statisticLists.timeflag = index; 
        }
       /* $scope.cache = $cacheFactory("");*/
            var init = function(){
            	$scope.init_1 = 0;
            	
                $scope.$parent.active = 4;
                $scope.statisticLists = {
                		'deptTemp':"",
                		'dept':[],
                		"timeflag":0,
                		"startdate":"",
                		"enddate":"",
                		'type':1
                }
                //判断是否有权限
               if($scope.global.user.authenticatid.indexOf('auth_teachResearch_teachStatistics_url_view') === -1){
                    console.log("+++++++课表管理  您没有权限+++++++++")
                    $location.path('dashboard');
                } 
                $scope.type=3;
                
               
                $scope.options = {
                        title: 'Company Performance'
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
                    lastText: config.pagination.lastText
                };
               /* $scope.GetStatisticList("");*/
               /* $scope.newStatischart();*/
                $scope.GetOrigalList("");
                
            };

            init();
        }]);
});
