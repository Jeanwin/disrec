define(['app','config'], function (app,config) {
    app.registerController('PersonalInformationCtrl', ['$scope','$modal','CodeService' , function ($scope,$modal,CodeService ) {


        //是否显示已发送、已接受和发消息的选中状态
        $scope.showmodal = function(index){
            $scope.accepted = index;
            $scope.Sent = index;
            $scope.sendmessage = index;
        };
        //鼠标移动上去的时候，标题变化
        $scope.titleColor = function(index){
            $scope.titlenameColor = index;
        };
        //已接收鼠标点击列表底色变化
        $scope.backgroundChange = function(){
            $scope.reply=!$scope.reply;
            $scope.backnameChange = !$scope.backnameChange;
            $scope.ShowEllipsisCharacter();
        };
        //已发送鼠标点击列表底色变化
        $scope.backgroundChange1 = function(){
            $scope.reply=!$scope.reply;
            $scope.backnameChange1 = !$scope.backnameChange1;
            $scope.ShowEllipsisCharacter();
        };
        //增加收件人信息
        $scope.addRecipientman = function(user){
            var modalInstance = $modal.open({
                templateUrl: 'PersonalInformation/information/PersonalInformation.informationAdd.modal.html',
                backdrop:'static',
//                windowClass: 'modal-lg',
                controller: PersonalInformationAddModalCtrl,
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            });
        };
        //editcontent
        $scope.editcontent = function(index){
            $scope.editconditionpencil = index;
        }
        var PersonalInformationAddModalCtrl = function($scope,$modalInstance,user){
            $scope.user= user;

            //点击弹框文字底色变化
            $scope.backChange = function(index){
                if(index ==='2'){
                    $scope.backchanage2 = index;
                    $scope.backok = '';
                }else{
                    $scope.backchanage = '';
                }if(index ==='5'){
                    $scope.backchanage5 = index;
                    $scope.backok = '';
                }else{
                    $scope.backchanage5 = '';
                }
            };
            $scope.ok =function(){
                $modalInstance.dismiss('cancel');
            };
            $scope.cancel =function(){
                $modalInstance.dismiss('cancel');
            };

        };
        //显示和隐藏多余文字
        $scope.ShowEllipsisCharacter = function(){
            $scope.ellipsisShow = !$scope.ellipsisShow;
        };

        var init = function(){
            $scope.reply = false;
            $scope.ellipsisShow = false;
            $scope.$parent.active = 3;
            $scope.backnameChange = false;
            $scope.backnameChange1 = false;
            $scope.accepted = '1';

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
            }

            $scope.multi2Value = { id: 'AK', text: 'Alaska' }; //结构必须一样，否则默认值不匹配，显示为underfined

            $scope.multi = {
                multiple: true,
                query: function (query) {
                    query.callback({ results: $scope.states });
                }
            };
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
       };

        init();
      }]);
});
