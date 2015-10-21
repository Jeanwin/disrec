define({
    app: {
        name: '录播系统',
        client: '中庆',
        version: '1.5',
        lan: 'zh-cn',
        debug: false
    },
    data:{
        method: 'urls'    //method: 'files' //files:urls
    },
    backend: {
<<<<<<< .mine
<<<<<<< .mine
        ip: 'http://192.168.12.198:8110',
        deviceServiceIP: 'http://192.168.12.198:8110',
=======
        ip: 'http://192.168.12.135:8080',   
        deviceServiceIP: 'http://192.168.12.135:8080',
=======
        ip: 'http://192.168.12.46:8080',   
        deviceServiceIP: 'http://192.168.12.46:8080',
>>>>>>> .r2827
>>>>>>> .r2704
        base: '/disrec/',
        base2: '/deviceService/',
        timeout: 30000,
        sessionTimeout: 1800
    },
    //调用的WebSocket要传送的服务器的位置
    //ws://e是不变的，传送WebSocket的一种格式
    //echo.websocket.org是webSocket提供的一个测试网页
    socketServer: {
<<<<<<< .mine
        url: 'ws://192.168.12.198:8110/deviceService/deviceService'
=======
        url: 'ws://192.168.12.46:8080/deviceService/deviceService'
>>>>>>> .r2827
    },
    pagination: {
        pageSize: 20,
        previousText: '上一页',
        nextText: '下一页',
        firstText: '第一页',
        lastText: '最后一页'
    },
    display: {
        dateFormat: 'yyyy-MM-dd'
    }
});