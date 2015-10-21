define(['app',
    'config'
], function (app, config) {
    app.registerController('CardSetCtrl', ['$scope','$rootScope','$modal','$location','$upload','growl' ,
        '$http', '$filter','$timeout','$upload','ClassroomService','TreeService','CodeService',
        function ($scope,$rootScope,$modal,$location,$upload,growl ,$http, $filter,$timeout,$upload,ClassroomService,TreeService,CodeService) {
    	
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
            	$scope.GetCardsList($scope.searchkey); //调用查询接口
            }else{
            	$scope.GetCardsList(""); //调用查询接口
            }

        };
    	
        $scope.startUploadCard = function () {
        	var modalInstance = $modal.open({
                templateUrl: 'classrooms/cardSet/classrooms.cardImport.modal.html',
                backdrop:'static',
                controller: ImpCardModalCtrl,
                resolve: {
                    
                }
            }).result.then(
                function(updata){
                    $scope.GetCardsList("");
                }
            );
        };

        var ImpCardModalCtrl = function ($scope, $modalInstance,growl,$upload){
        	
        	$scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.close = function () {
            	$modalInstance.close(true);
            };
        	//导入卡信息
        	$scope.onFileSelect = function($files) {

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
            $scope.start = function(){
	        	var url = config.backend.ip + config.backend.base + 'card/import';
	        	var test = "aa";
	            $scope.upload = $upload.upload({
	                url: url,
	                data: test,
	                file: $scope.file
	            }).progress(function(evt) {
	                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
	                console.log('percent: ' + $scope.progress);
	            }).success(function(data, status, headers, config) {
	                if(data.id === '1'){
	                    growl.addSuccessMessage(data.operation);
	                    $modalInstance.close(true);
	                    return true;
	                }
	                if(data.id === '2'){
	                    growl.addErrorMessage("导入部分失败");
	                    $scope.ErrorNum = data.name;
	                    $scope.error = true;
	                }
	                if(data.id === '0'){
	                    growl.addErrorMessage("导入全部失败");
	                    $scope.ErrorNum = data.name;
	                    $scope.error = true;
	                }
	            }).error(function(){
	                $scope.importerror = true;
	                growl.addErrorMessage("系统错误,导入失败");
	                $modalInstance.close(true);
	            });
            }
        }
    	
    	// 将时间戳换成时间
   	  	/*$scope.getLocalTime = function(nS) {   	  
          var t = new Date(parseInt(nS) * 1000); 
          return (t.getHours()<18?'0':'')+(t.getHours()-8)+':'+(t.getMinutes()>9?t.getMinutes():'0'+t.getMinutes())+':'+(t.getSeconds()>9?t.getSeconds():'0'+t.getSeconds());
             
       };*/
        
       //获取持卡人信息
       $scope.getCardholderList = function(keywords){
      	 ClassroomService.CardholderList(keywords).then(
         		function(data){
         			$scope.holderList = data;
         		},
         		function(){
         			
         		}
         	 )        	 
          }
       
    	//获取卡信息列表
    	$scope.GetCardsList = function(keywords){
    		ClassroomService.CardsList(keywords,$scope.pagination).then(
    				function(data){
    					$scope.cardLists = data.data;
    					$scope.pagination.totalItems = data.total;
    					/*for(var i in $scope.cardLists){
    						if($scope.cardLists[i].createdate)
    						$scope.cardLists[i].createdate = $scope.getLocalTime($scope.cardLists[i].createdate);
    						if($scope.cardLists[i].lossDate){
    							$scope.cardLists[i].lossDate = $scope.getLocalTime($scope.cardLists[i].lossDate);
    						}
    						
    					}*/
    				},
    				function(){
    					
    				}
    		)
    	}
       
    	//删除卡
    	/*$scope.DeleteCard = function(index){
    		$scope.cardLists.splice(index,1);
    		ClassroomService.CardDelete($scope.cardLists[index].id).then(
        			function(data){
        				if(data == 1){
        					growl.addSuccessMessage("卡销毁成功");
        				}
        				if(data == 0){
        					growl.addErrorMessage("卡销毁失败");
        				}
        			},
        			function(){
        				growl.addErrorMessage("卡销毁失败");
        			}
        	)
    	}*/
    	$scope.splitcardData = function(data){
    		$scope.NumList = [];
    		for(var i=0;i<data.length;i++){
    			$scope.NumList.push(data[i].cardNumber);
    		}
    		return $scope.NumList.join('/');
    	}
    	$scope.splitMacData = function(data){
    		$scope.NumList = [];
    		for(var i=0;i<data.length;i++){
    			if(data[i].deviceType === 'centralcontroller'){
    				$scope.NumList.push(data[i].mac);
    			}    			
    		}
    		return $scope.NumList;
    	}
    	$scope.SetCardToFacility = function(){
    		if($rootScope.webDataDeal){
    			
    		
    		 $http.get($scope.activedeviceServiceurl1 + "centerController/getAllSpecialCard")
             .success(function(data){
                 if(angular.isDefined(data)) {
                     var cardlists = $scope.splitcardData(data);
                     var maclists = $scope.splitMacData($rootScope.webDataDeal);
                     $http.get($scope.activedeviceServiceurl2 + "sendCmdToCentralControl?cmd=AddCardNumList:"+ cardlists + "&mac=" + maclists)
                     
	                     .success(function(data){
	                         if(data.result == 'success') {
	                        	 growl.addSuccessMessage("下发到设备成功");	                             
	                         }
	                     })
	                     .error(function(data,status,headers,config){
	                         if(status === 500){
	                         }
	                         throw(status);
	                     });
                 }
             })
             .error(function(data,status,headers,config){
                 if(status === 500){
                 }
                 throw(status);
             });
    		};
    	}
    	//挂失卡
    	$scope.OperaCard = function(index,cardOperation){
    		if(cardOperation == 'lose'){
    			/*var myDate = new Date();*/
    			var lossDate = $scope.CurentTime();
    			$scope.cardLists[index].lossDate = lossDate;
    		}
    		var modalInstance = $modal.open({
                templateUrl: 'classrooms/cardSet/classrooms.operationCard.modal.html',
                backdrop:'static',
                controller: LoseCardModalCtrl,
                resolve: {
                	cardinfo:function(){
                		return {id:$scope.cardLists[index].id,lossDate:lossDate};
                	},
    				cardOperation:function(){
    					return cardOperation;
    				}
    				
                }
            }).result.then(
                    function(state){
                    	if(state == '1'){ 
                    		$scope.cardLists.splice(index,1);
                    	}
                    }
                );
    	}
    	var LoseCardModalCtrl = function ($scope, $modalInstance,growl,cardinfo,cardOperation) {
          	 $scope.cardOperation = cardOperation;
          	 $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.save = function(cardOperation){
            	
            	if(cardOperation == 'lose'){   
	            	ClassroomService.CardLose(cardinfo).then(
	            			function(data){
		            			if(data == '1'){
		           					growl.addSuccessMessage("挂失成功");
		           					$modalInstance.close(cardOperation);
		           				}
		           				if(data == '0'){
		           					growl.addErrorMessage("挂失失败");
		           					$modalInstance.close();
		           				}
	            				
	            			},
	            			function(){
	            				$modalInstance.close();
	            				growl.addErrorMessage("系统发生错误，挂失失败");
	            			}
	            	)
            	}
            	if(cardOperation == 'delete'){
            		var key = [];
            		key.push({'id':cardinfo.id});
	            	ClassroomService.CardDelete(key).then(
	            			function(data){
	            				if(data == '1'){
		           					growl.addSuccessMessage("删除成功");
		           					$modalInstance.close(data);
		           				}
		           				if(data == '0'){
		           					growl.addErrorMessage("删除失败");
		           					$modalInstance.close(data);
		           				}
		            				
		            		},
		            		function(){
		            			growl.addErrorMessage("系统发生错误,删除失败");
	           					$modalInstance.close();
		            		}
	            	)
            	}
            }
          }
    	//编辑卡
    	$scope.EditCard = function(index){
            var modalInstance = $modal.open({
               templateUrl: 'classrooms/cardSet/classrooms.newCard.modal.html',
               backdrop:'static',
               controller: EditCardModalCtrl,
               resolve: {
	               	cardinfo:function(){
	               		return $scope.cardLists[index];               		
	               	},
	               	holderList:function(){
	               		return $scope.holderList;
	               	}
            		
               }
           }).result.then(
                   function(){
                	   $scope.GetCardsList("");
                   }
               );
       };
       var EditCardModalCtrl = function ($scope, $modalInstance,growl,cardinfo,holderList) {
    	 $scope.oper = 'edit';
    	 $scope.holderList = holderList;
       	 $scope.card = {
       			"id": cardinfo.id,                                    
       			"cardNumber": cardinfo.cardNumber,                    
       			"cardPerson": cardinfo.cardPerson,                     
       			"cardPersonId": cardinfo.cardPersonId,                
       			"cardType": cardinfo.cardType        			 
       	 }
       	 $scope.oldValue = $scope.card.cardNumber;
       	$scope.card.Person = $scope.card.cardPerson + '-' + $scope.card.cardPersonId;
       	 $scope.cancel = function () {
             $modalInstance.dismiss('cancel');
         };
         $scope.save = function(){
        	delete $scope.card.Person;
        	ClassroomService.CardUpdate($scope.card).then(
         			function(data){
         				if(data == 1){
        					growl.addSuccessMessage("卡信息修改成功");
        					$modalInstance.close(true);
        				}
        				if(data == 0){
        					growl.addErrorMessage("卡信息修改失败");
        					$modalInstance.close();
        				}
         				
         			}
         	)
         }
         $scope.checkCardNum = function(cardNum){
        	 if(cardNum == $scope.oldValue){
        		 $scope.showCardNumRequired = false;
        		 return;
        	 }
        	 $scope.showCardNumRequired = false;
        	ClassroomService.checkCardNum(cardNum).then(
         			function(data){
         				if(data == 1){
         					$scope.showCardNumRequired = true;
         				}
         				if(data == 0){
         					$scope.showCardNumRequired = false;
         				}
         			},
         			function(){}
         	)
         	
         }
         $scope.getSelectedHoder = function(){
        	 $scope.card.cardPersonId = $scope.card.Person.split('-')[1];
        	 $scope.card.cardPerson = $scope.card.Person.split('-')[0];
         }
       }
        //新建卡
        $scope.newCard = function(){
             var modalInstance = $modal.open({
                templateUrl: 'classrooms/cardSet/classrooms.newCard.modal.html',
                backdrop:'static',
                controller: NewCardModalCtrl,
                resolve: {
                	teacherTree:function(){
                		return $scope.teacherTree;
                	},
	               	holderList:function(){
	               		return $scope.holderList;
	               	}
                }
            }).result.then(
                    function(){
                    	$scope.GetCardsList("");
                    }
                );
        };
        var NewCardModalCtrl = function ($scope, $modalInstance,$location,growl,teacherTree,holderList) {
        	$scope.teacherTree = teacherTree;
        	$scope.holderList = holderList;
        	$scope.card = {
        			cardNumber:"",
        			cardPerson:"",
        			cardPersonId:"",
        			cardType:"0"
        	}
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.getSelectedHoder = function(){
           	 $scope.card.cardPersonId = $scope.card.Person.split('-')[1];
           	 $scope.card.cardPerson = $scope.card.Person.split('-')[0];
            }
            $scope.save = function(){
            	delete $scope.card.Person;
            	ClassroomService.CardCreat($scope.card).then(
            			function(data){
            				if(data == 1){
            					growl.addSuccessMessage("发卡成功");
            					$modalInstance.close(true);
            				}
            				if(data == 0){
            					growl.addErrorMessage("发卡失败");
            				}
            				$modalInstance.close(true);
            			},
            			function(){}
            	)
            }
            $scope.checkCardNum = function(cardNum){
           	 $scope.showCardNumRequired = false;
           	ClassroomService.checkCardNum(cardNum).then(
            			function(data){
            				if(data == 1){
            					$scope.showCardNumRequired = true;
            				}
            				if(data == 0){
            					$scope.showCardNumRequired = false;
            				}
            			},
            			function(){}
            	)
            	
            }
            
        }
            

       

        var init = function(){
            
        	$scope.activedeviceServiceurl2 = config.backend.ip + config.backend.base2;
        	$scope.activedeviceServiceurl1 = config.backend.ip + config.backend.base;
        	//判断是否有权限
            if($scope.global.user.authenticatid.indexOf('auth_classrooms_cardSet_url_view') === -1){
            	//alert("对不起！您没有权限访问。")
                console.log("+++++++教室设置  您没有权限+++++++++");
                $location.path('classrooms/duty');
            };
            $scope.$parent.active = 9;
          //分页对象
            $scope.pagination = {
                totalItems:0,
                pageIndex:1,
                pageSize:50,
                maxSize:8,
                numPages:4,
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText,
                limit:50
            };
            $scope.GetCardsList("");
            $scope.getCardholderList("")

        };

           
        init();
      }]);
});
