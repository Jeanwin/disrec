define(['app'], function (app) {
    app.registerController('CourseScrnCtrl', ['$scope','$stateParams' , function ($scope,$stateParams) {

        //进入导播间的命令
        $scope.openConsole = function (size) {
            window.open('director/console/index.html?size='+size);
        };

        //抓拍功能
        $scope.photograph = function(id){
            alert("抓拍对象的id:"+id);
        };


        var init = function(){
            $scope.video = JSON.parse($stateParams.video);
            console.log('进入导播界面以后接收的值');
            console.log($scope.video);
        };
        init();
    }]);
});
