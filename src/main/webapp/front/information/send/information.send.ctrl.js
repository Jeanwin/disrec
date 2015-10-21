define(['app'], function (app) {
    app.registerController('InformationSendCtrl', ['$scope' , '$rootScope', 'SocketService',
        function ($scope, $rootScope, SocketService) {

        $scope.message = {
            to: '00023',
            subject: '',
            content: ''
        };

        $scope.sendMessage = function () {
            SocketService.sendMessage($scope.message);
        };

        var init = function(){
            $scope.messages= [];
            //服务器推送过来的数据,通过这个监听方法，event接收的是方法,data是接收的数据
            $rootScope.$on('event:socket-message', function(event, data){
                console.log(data);
                $scope.messages.push(data);
            });
        };

        init();
    }]);
});