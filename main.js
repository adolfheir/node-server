const fs =require('fs')
const path = require('path');
const querystring = require("querystring");

const DB = require('./db/db.js').db;
const server = require('./server.js');
const router = require('./router.js');



router.setRootPath(__dirname);//设置根目录

router.get('/', function(req, res){
    // 路由转发
    router.redirect(res, "/view/index.html");
});////路由转发 不知道是不是这么搞的 反正我只会这个了


router.get('/view/index.html', function(req, res){
    router.sendFile(res, '/view/index.html')
});//get请求示例

router.post('/getUserData', function(req, res){
    let postData = '';
    req.on('data', function(data){
        postData += data;
    })
    req.on("end", function () {
        let params = querystring.parse(postData);
        let sql = `SELECT * FROM img`;  
        DB.get(sql, function(data, err){
            if(err){
                sendError(res, err)
            }else if(data){
                res.writeHead(200, {
                    'Content-Type': "application/json"
                });
                res.write(JSON.stringify(data))
                res.end();
            }
        })
    })
})//post 请求示例


server.start(router);