define(['angular', 'config'], function (angular, config) {
    /*-----------------------------------------
     *实时接口服务
     *----------------------------------------- */
    angular.module('lemon.service.socket', ['lemon.service.websocketLog'])
        .factory('SocketService',['$rootScope', '$q','$location','$filter','WebsocketLogService', function ($rootScope, $q,$location,$filter,WebsocketLogService) {
            var connected = false;
            //判断浏览器是否支持WebSocket的
            var isSupported = window.WebSocket? true:false;
            //WebSocket发送的位置
            var url = config.socketServer.url;
            var ws;
            //登记我是谁
            //var user = "";
            //未读消息
            //服务器执行回送的时候执行的方法
            //evt是服务器接收回来的数据
            var onMessage = function (evt) {
                console.log('接收到' + evt.data);
//              通过转码得到想要的json数据
//author by wh 20150708 扩展websocket
                var data = JSON.parse(evt.data);
				if(data.MessageType){
					switch(data.MessageType){
						case 'IoAlarm':
//IO报警					
							console.log('接收到原始中控报警信息：',data)
							angular.element(document.getElementsByTagName('body')[0]).scope().showWarm(data);
							//alert(data.areaName+' 发起报警：'+data.clues)
/*实际测试没有乱码 后续函数保留
							var alarmData = WebsocketLogService.GetDeviceAlarm(data.mac,data.output,data.state);
							if(alarmData){
								alarmData.messageid = data.messageid;
								alarmData.bell = data.bell+'.mp3';
								console.log('接收到中控报警信息：',alarmData)
							}*/
						break;
						case 'ToStartTalk':
//中控呼叫						
						break;
						case 'ProjectorOFF':
//投影机掉电						
						break;
					}
					
				}else{
                	$rootScope.$broadcast('event:socket-message', evt.data);
				}
            };
            //通道打开错误执行的方法
            var onError = function (evt) {
                $rootScope.$broadcast('event:socket-error', evt.data);
            };
            //打开通道执行的方法
            var onOpen = function (evt) {
                connected = true;
                console.log('Socket通道打开');
                $rootScope.$broadcast('event:socket-connected');
            };
            //关闭通道执行的方法
            var onClose = function () {
                console.log('通道关闭');
                connected = false;
                $rootScope.$broadcast('event:socket-disconnected', {});
            };

            return {

                isSupported: function(){
                    return isSupported;
                },
                //这个方法是定义一个当前用户
                connect: function(name){
                    //判断当前浏览器支持不支持WebSocket
                    if(isSupported){
//                        定义用户
                        //user = _user;
                        //推送的服务器的地址
                        ws = new WebSocket(url+'?username='+name);
                        //这是推送的服务器的地址，+后边是推送的对象
                        //ws = new WebSocket(url + user);
                        //服务器是否返回了数据,如果返回了数据，就执行这个方法
                        ws.onmessage = onMessage;
                        //如果连接WebSocket的通道没有通,则执行这个方法
                        ws.onerror = onError;
                        //如果连接通了则执行这个方法
                        ws.onopen = onOpen;
                        //如果关闭了通道则执行这个方法
                        ws.onclose = onClose;

                    }else{
                        alert('浏览器不支持websocket');
                    }

                },
                  //手动的关闭通道的方法
                disconnect: function() {
                    ws.close();
                },

                isConnected: function () {
                    return connected;
                },
                //自己定义的方法，
                //函数中接收的值就是你要推送的json数据
                sendMessage: function (message) {
                    //判断浏览器是否支持WebSocket方法,如果不支持则返回假
                    if(!isSupported)
                        return false;
                    //判断通道是否打开,真为打开，假为没打开
                    if(!connected)
                        this.connect();
                    //在WebSocket是解析json数据的，需要转换成字符串
//                  JSON.stringify();转换json数据
//                  send是执行发送的数据
                    ws.send(JSON.stringify(message));
                }

            };
        }]);

});