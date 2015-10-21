define(['app','config','directorSeize'], function (app,config) {
    app.registerController('MessageMainCtrl', ['$scope', '$modal','$location','growl' ,'$http','$timeout','MessageService',
        function ($scope,$modal,$location,growl ,$http,$timeout,MessageService) {
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
                    $scope.GetAlarmMessageList($scope.key); //调用查询接口
                }else{
                    $scope.GetAlarmMessageList(""); //调用查询接口
                }
            };
        
        
            //获取报警消息
            $scope.GetAlarmMessageList = function(keywords){
            MessageService.MessageList($scope.pagination).then(
                    function(data){
                        $scope.alarmMessageLists = data.data;
                        /*for(var i in $scope.alarmLists){
                            $scope.alarmLists[i].createdate = $scope.CurentTime($scope.alarmLists[i].createdate);
                        }*/
                        $scope.pagination.totalItems = data.total;
                        console.log($scope.alarmMessageLists);
                    },
                    function(){
                        
                    }
                )
            };
            //删除报警消息
            $scope.deleteMessageModal = function(index){
                var modalInstance = $modal.open({
                    templateUrl: 'message/alarmMessage/message.delete.modal.html',
                    backdrop:'static',
                    controller: DeleteMessageModalCtrl,
                    resolve: {
                        messageID:function(){
                            return $scope.alarmMessageLists[index].id;
                        }
                        
                    }
                }).result.then(
                        function(){
                            $scope.alarmMessageLists.splice(index,1);
                            $scope.pagination.totalItems--;
                        }
                    );
            }
            var DeleteMessageModalCtrl = function ($scope, $modalInstance,growl,messageID) {               
                $scope.cancel = function(){
                    $modalInstance.dismiss('cancel');
                }
                $scope.ok = function(){   
                     var messageIds=[];
                     messageIds.push({"id":messageID});                 
                    MessageService.DeleteMessageModal(messageIds).then(
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
            //报警消息已读状态
            $scope.read=function(index){
                MessageService.ReadUpdate($scope.alarmMessageLists[index].id).then(
                    function(data){
                        if(data.state=="1"){
                            $scope.alarmMessageLists[index].readFlag=1;
                            $scope.growl("操作成功!");
                        }else{
                            $scope.growl("操作失败!");
                        }
                    }
                )
            }
            var init = function(){            	
            	$scope.active = 0;
                $scope.$parent.mainactive = 12;
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
                //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_message_url_view') === -1){
                    console.log("+++++++系统日志 您没有权限+++++++++")
                    $location.path('dashboard');

                }else{
                	$location.path('message');
                }
                $scope.GetAlarmMessageList("");
            };
            init();
        }]);
});