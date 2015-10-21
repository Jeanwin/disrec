define({
    app: {
        name: '录播系统',
        client: 'tbb',
        version: 'alpha 1.0',
        lan: 'zh-cn',
        debug: false
    },
    data:{
        method: 'files' //files:urls
    },
    backend: {
        ip: 'http://192.168.12.150:8081',
        base: '/disrec/',
        timeout: 10000
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