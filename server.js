const http = require('http');

function start(router) {
    http.createServer(function(request, response) {
        // response.setHeader('Access-Control-Allow-Origin', '*');//设置所有请求可以跨域
        router.init(request, response);
    }).listen(3000);
    console.log('Server 127.0.0.1:3000 starting');
}

exports.start = start;