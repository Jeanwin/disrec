define(['app','config'], function (app,config) {
    app.registerController('PersonalInformationResourceCtrl', ['$scope','$modal','TreeService' , function ($scope,$modal,TreeService ) {

        //初始化加载树
        var userTrees = function(keywords){
            TreeService.systemTree(keywords).then(
                function(data){
                    $scope.areaTree = data;
                },
                function(){

                }
            );
        };

        //是否显示复选按钮
        $scope.oneCheck = function(){
            console.log($scope.ok)
            $scope.showbutton = !$scope.showbutton;
            if($scope.showbutton === true){
                $scope.resource.checked = true;
            }else{
                $scope.resource.checked =false;
            }
        };
        //点击全部选中时设置控制的单选按钮状态
        $scope.checkAllFacilitys = function (){
            console.log($scope.checkAll);
            if($scope.checkAll === false && $scope.checkAll1 === false){
                $scope.resource.checked = true;
                $scope.showbutton = true;
                $scope.checkAll1 = true
            }else{
                $scope.resource.checked = false;
                $scope.showbutton = false;
                $scope.checkAll1 = false;
            }
//            $scope.checkAll = !$scope.checkAll;
//            $.each($scope.userList, function(index, user){
//                user.checked = $scope.checkAll;
//            });
        };
        //我的资源移动到
        $scope.pleaceChange = function(){
            var modalInstance = $modal.open({
                templateUrl: 'PersonalInformation/resource/PersonalResource.placechange.modal.html',
                backdrop:'static',
//                windowClass: 'modal-lg',
                controller:PersonalResourceModalCtrl,
                resolve: {
                    resourcetree: function () {
                        return $scope.areaTree;
                    }
                }
            });
        };
        var PersonalResourceModalCtrl = function($scope,$modalInstance,resourcetree){
            $scope.areaTree = resourcetree;

            //点击树文件触发的事件
            $scope.setActiveFolder = function(node){
                $scope.ActiveFolder = node;
            };
            //确定移动保存到
            $scope.MoveSave = function(){

            };
            //取消移动到
            $scope.cancel = function(){
                $modalInstance.close();
            }

        };
         //上传资源
        $scope.newFolder = function(){
            var modalInstance = $modal.open({
                templateUrl: 'PersonalInformation/resource/PersonalResource.newFolder.modal.html',
                backdrop:'static',
                controller:NewFolderModalCtrl,
                resolve: {
                    // del: functiouploadn () {
                    //     return del;
                    // }
                }
            });
        };
        //上传资源控制器
        var NewFolderModalCtrl = function($modalInstance,$scope){
            //确定设置
            $scope.ok = function(){
            };
            //取消设置
            $scope.cancel = function(){
                $modalInstance.close();
            };
        };
        //上传资源
        $scope.uploadResource = function(){
            var modalInstance = $modal.open({
                templateUrl: 'PersonalInformation/resource/PersonalResource.UploadResource.modal.html',
                backdrop:'static',
                controller:UploadResourceModalCtrl,
                resolve: {
                    // del: functiouploadn () {
                    //     return del;
                    // }
                }
            });
        };
        //上传资源控制器
        var UploadResourceModalCtrl = function($modalInstance,$scope){
            //确定设置
            $scope.ok = function(){
            };
            //取消设置
            $scope.cancel = function(){
                $modalInstance.close();
            };
        };
        //删除资源
        $scope.delResourse = function(del){
            var modalInstance = $modal.open({
                templateUrl: 'PersonalInformation/resource/PersonalResource.DelResource.modal.html',
                backdrop:'static',
                controller:DelResourceModalCtrl,
                resolve: {
                    del: function () {
                        return del;
                    }
                }
            });
        };
        //删除控制器
        var DelResourceModalCtrl = function($modalInstance,$scope,del){
            //确定设置
            $scope.ok = function(){
            };
            //取消设置
            $scope.cancel = function(){
                $modalInstance.close();
            };
        };
        //列表设置
        $scope.EditResource = function(edit){
            var modalInstance = $modal.open({
                templateUrl: 'PersonalInformation/resource/PersonalResource.EditResource.modal.html',
                backdrop:'static',
//                windowClass: 'modal-lg',
                controller:EditResourceModalCtrl,
                resolve: {
                    edit: function () {
                        return edit;
                    }
                }
            });
        };
        var EditResourceModalCtrl = function($modalInstance,$scope){
            //确定设置
            $scope.ok = function(){

            };
            //取消设置
            $scope.cancel = function(){
                $modalInstance.close();
            };
        };
        //分享文件
        $scope.ResourseShare = function(share){
            var modalInstance = $modal.open({
                templateUrl: 'PersonalInformation/resource/PersonalResource.ResourseShare.modal.html',
//                backdrop:'static',
//                windowClass: 'modal-lg',
                controller:ResourseShareModalCtrl,
                resolve: {
                    share: function () {
                        return share;
                    }
                }
            });
        };
        var ResourseShareModalCtrl = function($modalInstance,$scope){
            $scope.organizationModal = true;
            $scope.MyselftModal = false;
            //发消息时候的收件人的格式
            $scope.states = [
                { id: 'AK', text: 'Alaska' },
                { id: 'HI', text: 'Hawaii' },
                { id: 'HI1', text: 'Holle' },
                { id: 'HI2', text: 'Hi' },
                { id: 'HI3', text: 'Hawai' }
            ];

            var findState = function(id) {
                for (var i=0; i<states.length; i++) {
                    for (var j=0; j<states[i].children.length; j++) {
                        if (states[i].children[j].id == id) {
                            return states[i].children[j];
                        }
                    }
                }
            };

            $scope.multi2Value = { id: 'AK', text: 'Alaska' }; //结构必须一样，否则默认值不匹配，显示为underfined

            $scope.multi = {
                multiple: true,
                query: function (query) {
                    query.callback({ results: $scope.states });
                }
            };

            //选择组织机构的
            $scope.organization = function(){
                $scope.organizationModal = true;
                $scope.MyselftModal = false;
            };
            //选择个人的
            $scope.Myselft = function(){
                $scope.MyselftModal = true;
                $scope.organizationModal = false;
            }
            //选择机构底色变化
            $scope.backChange = function(keywords){
                if(keywords ==='2'){
                    $scope.backchanage2 = keywords;
                }if(keywords ==='5'){
                $scope.backchanage5 = keywords;
                }
            };
            //取消分享
            $scope.cancel = function(){
                $modalInstance.close();
            };
        };

        var init = function(){
            $scope.checkAll = false;
            $scope.checkAll1 = false;
            $scope.resource = {
                checked:''
            };
            $scope.showbutton = false;

            userTrees("trees");
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
            $scope.$parent.active = 1;
        };

        init();
      }]);
});
