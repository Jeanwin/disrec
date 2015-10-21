define(['app','config'], function (app,config) {
    app.registerController('SystemServerConfigureCtrl', ['$scope','$modal','$location','SystemService','TacticsService','$timeout',
        function ($scope,$modal,$location,SystemService,TacticsService,$timeout) {

        //初始化查询所有的服务器列表
        var SelectServer = function(){
            SystemService.SelectServers().then(
                function(data){
                    $scope.SelectServerList = data;
                    $.each(data,function(index,node){
                        if(node.id === $scope.serverid){
                            $scope.selectport(node);
                        }
                    });
                    if($scope.serverid === ''){
                        $scope.selectport(data[0]);
                    }
                },function(){

                }
            );
        };
        //根据服务器名称查询端口号
        $scope.selectport = function(server){
               console.log(server);
               $scope.ServerPort = server;
               $scope.ServeName = server.name;
               $scope.serverid = server.id;
               $scope.serverType=server.type;
        };
        //初始化查询数据字典
        var SelectServerType = function(keywords){
            TacticsService.code(keywords).then(
                function(data){
                    $scope.SelectServerTypeList = data;
                },function(){

                }
            );
        };

        //添加服务器列表浮层展示
        $scope.AddServer = function(){
            var modalInstance = $modal.open({
                templateUrl: 'system/server/system.server.modal.html',
                backdrop:'static',
                controller: AddServerModalCtrl,
                resolve: {
                    SelectServerTyp:function(){
                        return $scope.SelectServerTypeList;
                    }
                }
            }).result.then(
                function(data){
                    SelectServer();
                }
            );
        };
        var AddServerModalCtrl = function($scope,$modalInstance,growl,SelectServerTyp){
            $scope.server = {
                type:''
            };
            $scope.SelectServerTypeList = SelectServerTyp;
            $scope.editingMode = false;
            $scope.server.type = SelectServerTyp[0].value;

            //保存添加服务器
            $scope.SaveServer = function(server){
                var keywords = {
                    "name":server.name,
                    "type":server.type,
                    "address":server.address
                };
                SystemService.SaveAddServers(keywords).then(
                    function(data){
                        if(data ==='1'){
                            growl.addSuccessMessage('编辑保存成功！');
                            $modalInstance.close();
                        }else{
                            growl.addErrorMessage('编辑保存失败！');
                        }

                    },
                    function(){

                    }
                );
            };
            //取消关闭浮层
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        //编辑服务器列表浮层展示
        $scope.EditServer = function(Server){
            var modalInstance = $modal.open({
                templateUrl: 'system/server/system.server.modal.html',
                backdrop:'static',
                controller: EditServerModalCtrl,
                resolve: {
                    Server: function () {
                        return Server;
                    },
                    SelectServerTyp:function(){
                        return $scope.SelectServerTypeList;
                    }
                }
            }).result.then(
                function(data){
                    SelectServer();
                }
            );
        };
        var EditServerModalCtrl = function($scope,$modalInstance,growl,Server,SelectServerTyp){
            $scope.server = angular.copy(Server);
            $scope.SelectServerTypeList = SelectServerTyp;
            /**/
            $scope.server.typeList = $scope.SelectServerTypeList[0].value;
            $scope.editingMode = true;

            //保存编辑服务
            $scope.SaveServer = function(){
                var keywords = {
                    "id":$scope.server.id,
                    "name":$scope.server.name,
                    "type":$scope.server.type,
                    "address":$scope.server.address
                };
                SystemService.SaveEditServers(keywords).then(
                    function(data){
                        if(data ==='1'){
                            growl.addSuccessMessage('编辑保存成功！');
                            $modalInstance.close();
                        }else{
                            growl.addErrorMessage('编辑保存失败！');
                        }

                    },
                    function(){

                    }
                );
            };
            //取消关闭浮层
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        //类型翻译状态码
        $scope.initType = function(type){
            var typeValue ="";
            $.each($scope.SelectServerTypeList,function(index,data){
                if(data.value === type){
                    typeValue = data.name;
                    return false;
                }
            });
            return typeValue;
        };
        //删除服务器列表浮层展示
        $scope.delServer = function(Server){
            var modalInstance = $modal.open({
                templateUrl: 'system/server/system.delserver.modal.html',
                backdrop:'static',
                controller: DelServerModalCtrl,
                resolve: {
                    Server: function () {
                        return Server;
                    }
                }
            }).result.then(
                function(data){
                    SelectServer();
                }
            );
        };
        var DelServerModalCtrl = function($scope,$modalInstance,growl,Server){
            $scope.Server = Server;

            //删除服务器列表信息
            $scope.okDel = function(){
                SystemService.SaveDelServers($scope.Server).then(
                    function(data){
                        if(data ==='1'){
                            growl.addSuccessMessage('删除服务器成功！');
                            $modalInstance.close();
                        }else{
                            growl.addErrorMessage('删除服务器失败！');
                        }

                    },
                    function(){

                    }
                );
            };
            //取消关闭浮层
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        //添加开放端口浮层展示
        $scope.Addport = function(){
            var modalInstance = $modal.open({
                templateUrl: 'system/server/system.port.modal.html',
                backdrop:'static',
                controller: AddportModalCtrl,
                resolve:{
                    serverid:function(){
                        return $scope.serverid;
                    },
                    ServeName:function(){
                        return $scope.ServeName
                    }
                }
            }).result.then(
                function(data){
                    SelectServer();

                }
            );
        };
        var AddportModalCtrl = function($scope,$modalInstance,growl,serverid,ServeName){
            $scope.editingMode = false;
            $scope.ServeName = ServeName;

            //添加保存接口
            $scope.SavePort = function(port){
                var keywords = {
                    "serverid":serverid,
                    "name":port.name,
                    "port":port.port
                };
                SystemService.SaveAddPorts(keywords).then(
                    function(data){
                        if(data ==='1'){
                            growl.addSuccessMessage('添加保存成功！');
                            $modalInstance.close();
                        }else{
                            growl.addErrorMessage('添加保存失败！');
                        }

                    },
                    function(){

                    }
                );
            };
            //取消关闭浮层
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        
        //应用到中控
        $scope.ApplyConsole=function(){
            var modalInstance = $modal.open({
                templateUrl: 'system/applyConsole/system.applyConsole.modal.html',
                backdrop:'static',
                controller: ApplyConsoleModalCtrl,
                resolve:{
                    
                }
            }).result.then(
                /*function(data){
                    SelectServer();

                }*/
            );
        };
        var ApplyConsoleModalCtrl=function($scope,$modalInstance,growl){
           $scope.deviceSearch={
                "name":""
            };
            $scope.showDeviceServerList=function(){
                SystemService.showDeviceServerList($scope.deviceSearch).then(
                    function(data){
                        $scope.deviceLists=data.data;
                        if($scope.deviceLists){
                           for(var i=0;i<$scope.deviceLists.length;i++){               
                               if($scope.deviceLists[i].flag=="0"){
                                    $scope.selConsoleStatus=false; 
                                }else if($scope.deviceLists[i].flag=="1"){
                                    $scope.selConsoleStatus=true;
                                } 
                            } 
                        }
                        
                    }                
                );
            }
            $scope.showDeviceServerList();
            $scope.toggle=function(val){
                $scope.selConsoleStatus=!$scope.selConsoleStatus;
            }

            $scope.saveApply=function(index){                
                var keywords=[];
                for(var i=0;i<$scope.deviceLists.length;i++){
                    if($scope.selConsoleStatus){
                        keywords.push({"deviceid":$scope.deviceLists[i].deviceid});
                    }
               }
                SystemService.addOrRemoveDeviceServer(keywords).then(
                        function(data){
                            if(data ==='1'){
                                growl.addSuccessMessage('添加保存成功！');
                                $modalInstance.close();
                            }else{
                                growl.addErrorMessage('添加保存失败！');
                            }
                        }
                )
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }

        //编辑端口列表浮层展示
        $scope.Editport= function(Port){
            var modalInstance = $modal.open({
                templateUrl: 'system/server/system.port.modal.html',
                backdrop:'static',
                controller: EditPortModalCtrl,
                resolve: {
                    Port: function () {
                        return Port;
                    },
                    serverid:function(){
                        return $scope.serverid;
                    },
                    ServeName:function(){
                        return $scope.ServeName
                    }
                }
            }).result.then(
                function(data){
                    SelectServer();
                }
            );
        };
        var EditPortModalCtrl = function($scope,$modalInstance,growl,Port,serverid,ServeName){
            $scope.editingMode = true;
            $scope.port = Port;
            $scope.ServeName = ServeName;

            //修改端口列表
            $scope.SavePort = function(){
                var keywords = {
                    "serverid":serverid,
                    "id":Port.id,
                    "name":Port.name,
                    "port":Port.port
                };
                SystemService.SaveEditPorts(keywords).then(
                    function(data){
                        if(data ==='1'){
                            growl.addSuccessMessage('添加保存成功！');
                            $modalInstance.close();
                        }else{
                            growl.addErrorMessage('添加保存失败！');
                        }

                    },
                    function(){

                    }
                );
            };
            //取消关闭浮层
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        //删除端口列表浮层展示
        $scope.Delport = function(Port){
            var modalInstance = $modal.open({
                templateUrl: 'system/server/system.delport.modal.html',
                backdrop:'static',
                controller: DelPortdalCtrl,
                resolve: {
                    Port: function () {
                        return Port;
                    }
                }
            }).result.then(
                function(data){
                    SelectServer();
                }
            );
        };
        var DelPortdalCtrl = function($scope,$modalInstance,growl,Port){
            $scope.port = Port;

            //删除端口列表
            $scope.okDel = function(){
                SystemService.SaveDelPorts($scope.port).then(
                    function(data){
                        if(data ==='1'){
                            growl.addSuccessMessage('删除端口成功！');
                            $modalInstance.close();
                        }else{
                            growl.addErrorMessage('删除端口失败！');
                        }

                    },
                    function(){

                    }
                );
            };
            //取消关闭浮层
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        $("123").click(function(){
            alert(123);
        })
        var init = function(){
            $scope.serverid = '';
            $scope.ServerPort = '';
            $scope.$parent.active = 7;

            //初始化查询全部服务器设置
            SelectServer();
            //初始化查询数据字典
            SelectServerType('serversType');
            //判断是否有权限
                if($scope.global.user.authenticatid.indexOf('auth_system_serverConfigure_url_view') === -1){
                        console.log("+++++++平台设置  您没有权限+++++++++")
                        $location.path('system/platform');
                }
            
        };
        init();
    }]);
});