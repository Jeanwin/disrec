define(['app'], function (app) {
    app.registerController('HomePageMainCtrl', ['$scope','$modal' , 'anchorScroll',
        function ($scope,$modal,anchorScroll ) {

        $scope.$parent.action = 0;
        $scope.changeImg = function(index){
            $scope.imgone = index;
            $scope.imgtwo = index;
            $scope.imgthree = index;
        };

        //跳转到热播课程
        $scope.goCourse = function(anchor){
            anchorScroll.toView(anchor, true);
        }

        //判断是否是手持设备
       var IsPC = function(){    
             var userAgentInfo = navigator.userAgent;  
             var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPod");    
             $scope.flag = true;    
             for (var v = 0; v < Agents.length; v++) {    
                 if (userAgentInfo.indexOf(Agents[v]) > 0) { 
                    $scope.flag = false;
                    
                }    
                 
             }   
          }  


        var init = function(){
            $scope.imgone = '1';
            $scope.imgtwo = '';
            $scope.imgthree = '';
            IsPC();
        };
        init();
      }]);
});
