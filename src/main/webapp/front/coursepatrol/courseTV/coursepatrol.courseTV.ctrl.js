define(['app','config'], function (app,config) {
    app.registerController('CourseTVCtrl', ['$scope','CourseService' , function ($scope,CourseService) {


        //进入导播间的命令
        $scope.openConsole = function (size) {
            window.open('director/console/index.html?size='+size);
        };

        //抓拍功能
        $scope.photograph = function(id){
            alert("抓拍对象的id:"+id);
        };

        $scope.pollingVideo = function(a,VideoID,pagination,user){
            CourseService.searchCourse(a,VideoID,pagination,user).then(
                function(data){
                    $scope.videoList=data.data;
                    $scope.pagination.totalItems = data.total;
                },
                function(code){
                    alert('error');
                }
            );
        };

        var init = function(){
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

            $scope.pollingVideo('','',$scope.pagination,'');
        };
        init();
    }]);
});
