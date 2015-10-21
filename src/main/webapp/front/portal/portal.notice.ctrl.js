define(['app',
    'config'
], function (app,config) {
    app.registerController('PortalNoticeCtrl', ['$scope','$modal','$filter','NoticeService',
        function ($scope,$modal,$filter,NoticeService) {

        //删除公告弹窗--最外层
        $scope.openDeleteNoticeModal=function(){
            console.log("打开Notice删除弹窗");
            var modalInstance=$modal.open({
                templateUrl:'portal/notice/notice.delete.modal.html',
                controller: DeleteNoticeModalCtrl,
                resolve:{
                    selectedItems:function(){
                        return $scope.selectedItems;
                    }
                }
            }).result.then(
                function(){
                    console.log("Notice删除窗口被关闭以后，要执行的数据刷新");
                    $scope.noticeList("",$scope.pagination,"");
                });
        };
        //删除公告的弹窗---控制器
        var DeleteNoticeModalCtrl=function($scope,$modalInstance,selectedItems,NoticeService){
            $scope.selectedItems = selectedItems;
            //连接后台删除的 数据 服务
            $scope.deleteNotices=function(selectedItems,user){
                console.log("调用删除Notice的服务");
                NoticeService.deleteNotice(selectedItems,user).then(
                    function(data){
                        console.log("Notice中的服务回调成功60");
                        if(angular.isDefined(data)){
                            growl.addSuccessMessage("删除成功");
                            $modalInstance.close();
                        }else
                            growl.addSuccessMessage("删除失败");
//                            alert("删除失败!");
                            console.log(data);
                    },
                    function(code){
                        //处理失败后操作
                        alert("删除失败!");
                    }
                );
            };
            /*确认删除功能*/
            $scope.ok=function(){
                $scope.deleteNotices($scope.selectedItems, {});
            };

            /*删除功能取消按钮*/
            $scope.cancel=function(){
                $modalInstance.dismiss('cancel');
            };
        };

        //Json门户管理--通知公告--最外层
        $scope.portalnotices=function(keywords,pagination,user){
            console.log("进入portalNotice得值的服务109");
            NoticeService.portalNotice(keywords,pagination,user).then(
                function(data){
                    if(data.total > 0){
                        $scope.noticeList=data.data;
                        $scope.pagination.totalItems = data.total;
                        $scope.pagesize = parseInt(($scope.pagination.totalItems-1)/$scope.pagination.pageSize+1);
                    }else{
                        $scope.noticeList =[];
                        $scope.growl("未查找到相关信息",'error');
                    }
                },
                function(code) {
                    throw(code);
                }
            );
        };

        //点击全部选中时设置控制的单选按钮状态--最外层
        $scope.checkAllNotice= function (){
            if($scope.noticeList.length>0){
                /*当前的选项取反一下,真变假，假变真*/
                $scope.checkAll = !$scope.checkAll;
                /*each遍历第一个是要遍历的对象,function方法中的index是接收下标,notice是接收具体的对象*/
                $.each($scope.noticeList, function(index, notice){
                    /*因为遍历了notice中的checked属性*/
                    notice.checked = $scope.checkAll;
                });
            }
        };

        //设置单选按钮响应事件--最外层
        $scope.selectedItems=[];
        $scope.$watch('noticeList',function(){

            $scope.selectedItems=$filter('filter')($scope.noticeList,{checked:true});
            $scope.selectedCount=$scope.selectedItems.length;
            if( $scope.selectedCount === $scope.noticeList.length && $scope.noticeList.length>0)
                $scope.checkAll = true;
            else
                $scope.checkAll = false;
        },true)

        //根据页码查询--最外层
        $scope.onSelectPage = function(pageIndex){
            $scope.pagination.pageIndex = pageIndex;
            var _pagination = angular.copy($scope.pagination);
            if(angular.isDefined(_pagination.pageIndex.pageIndex)){
                _pagination.pageIndex = (_pagination.pageIndex.pageIndex)*1;
            }
            $scope.portalnotices($scope.noticeResource,_pagination,""); //调用查询接口
            console.log("*********",$scope.noticeResource);
        };

            //简单查询的方法
            $scope.inquire=function(){
                //……………………………………………………………………查询以后要不要分页…………………………………………………………
                var condition=angular.copy( $scope.noticeResource);
                $scope.portalnotices(condition,$scope.pagination,"");
            };


            //把$scope.hideAdvancedSearch做个联动
            $scope.$watch('hideAdvancedSearch',function(){
                if($scope.hideAdvancedSearch){
                    $scope.noticeResource.username='';
                    $scope.noticeResource.startdate='';
                    $scope.noticeResource.enddate='';
                }else{
                    $scope.noticeResource.name='';
                }
            });
            //定义查询数据于前台文本框做关联查询数据
            $scope.noticeResource={
                "name":'',
                "username":'',
                "startdate":'',
                "enddate":''
            };

        var init = function(){
            //设置全选按钮的初始值
            $scope.checkAll=false;
            $scope.$parent.active = 2;
            $scope.noticeList=[];
            $scope.hideAdvancedSearch = true;
            //分页对象
            $scope.pagination = {
                totalItems:0,
                pageIndex:1,
                pageSize:2,
                maxSize:8,
                numPages:4,
                previousText: config.pagination.previousText,
                nextText: config.pagination.nextText,
                firstText: config.pagination.firstText,
                lastText: config.pagination.lastText
            };

            $scope.portalnotices("",$scope.pagination,"");
        };

        init();
    }]);
});
