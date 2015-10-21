define(['app',
    'config'
], function (app, config) {
    app.registerController('ScheduleManagementshandleRecordCtrl', ['$scope','$modal','$location','growl' ,
        '$http','$timeout','ScheduleService',
        function ($scope,$modal,$location,growl ,$http,$timeout,ScheduleService) {
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
               if($scope.key){
                    $scope.GetHandleRecordList($scope.key); //调用查询接口
                }else{
                    $scope.GetHandleRecordList(""); //调用查询接口
                }
            };
        
            //手动录像任务的查询
            $scope.GetHandleRecordList = function(keywords){
            ScheduleService.manualVideos($scope.pagination).then(
                    function(data){
                        $scope.handleRecordLists = data.data;
                       
                        $scope.pagination.totalItems = data.total;
                    },
                    function(){
                        
                    }
                )
            }
            
            //删除录像任务
            $scope.deleteRecordModal = function(index){
                var modalInstance = $modal.open({
                    templateUrl: 'scheduleManagements/handleRecord/handleRecord.delete.modal.html',
                    backdrop:'static',
                    controller: DeleteHandleRecordModalCtrl,
                    resolve: {
                        recordID:function(){
                            return $scope.handleRecordLists[index].id;
                        }
                        
                    }
                }).result.then(
                        function(){
                            $scope.handleRecordLists.splice(index,1);
                            $scope.pagination.totalItems--;
                        }
                    );
            }
            var DeleteHandleRecordModalCtrl = function ($scope, $modalInstance,growl,recordID) { 
                $scope.recordID= recordID;             
                $scope.cancel = function(){
                    $modalInstance.dismiss('cancel');
                }
                $scope.ok = function(){   
                     var recordIDs=[];
                     recordIDs.push({"id":$scope.recordID});                 
                     ScheduleService.manualVideoDelete(recordIDs).then(
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
                                growl.addErrorMessage("系统发生错误，删除失败");
                                $modalInstance.close();
                            }
                    )
                }
                
            }
           
            var init = function(){                
                //判断是否有权限
                $scope.$parent.active = 4;
                
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
                    lastText: config.pagination.lastText
                };
                
                $scope.GetHandleRecordList("");
            };
            init();
      }]);
});