﻿define({
    app: {
        name: '录播系统',
        client: 'tbb',
        version: 'alpha 1.0',
        lan: 'zh-cn',
        debug: false
    },
    data:{
        method: 'urls' //files:urls
    },
    backend: {
        ip: 'http://192.168.12.150:8080',
        deviceServiceIP:'http://192.168.12.126:8080',
        base: '/disrec/',
        base2: '/deviceService/',
        timeout: 3600000
    },

    //调用的WebSocket要传送的服务器的位置
    //ws://e是不变的，传送WebSocket的一种格式
    //echo.websocket.org是webSocket提供的一个测试网页
    socketServer: {
//        url: 'ws://echo.websocket.org/'
        url: 'ws://192.168.12.150:8080/ccdeviceService/ccdeviceService'
//        url: 'ws://192.168.12.46:8080/deviceService/message'
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