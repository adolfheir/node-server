const url = require('url');
const path = require('path');
const querystring = require('querystring');
const fs = require('fs');
module.exports = {
    fileType: {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    },
    routePathGet: {},
    routePathPost: {},
    get: function(pathname, fn) {
        this.routePathGet[pathname] = fn;
    },
    post: function(pathname, fn) {
        this.routePathPost[pathname] = fn;
    },
    rootPath: "",
    setRootPath: function(rp) {
        this.rootPath = rp;
    },
    sendFile: function(response, pathname) {
        let ext = path.extname(pathname).slice(1);
        let ft = this.fileType[ext] || "text/plain";
        response.setHeader("Content-type", [ft, "charset=utf-8"]);
        pathname = this.rootPath + pathname;
        pathname = path.normalize(pathname);
        fs.readFile(pathname, function(err, data) {
            if (err) {
                response.statusCode = 404;
                response.end('404文件不存在');
            } else {
                response.statusCode = 200;
                response.end(data, "binary");
            }
        });
    },
    sendError: function(response, err){
        response.statusCode = 500;
        if(typeof(err) == "object"){
            response.end(JSON.stringify(content));
        }else if(typeof(err) == "string"){
            response.end(err);
        }else{
            response.end('服务器错误');
        }
    },
    redirect: function(response, path){
        response.writeHead(302, {
            'Location': `${path}`
        });
        response.end();
    },
    init: function(request, response) {
        console.log(request.url);
        let fn = undefined;
        let pathname = request.url;
        if (request.method.toLowerCase() === 'get') {
            fn = this.routePathGet[pathname];
        } else {
            fn = this.routePathPost[pathname];
        }
        if (fn) {
            fn(request, response);
        } else {
            this.sendFile(response, pathname);
        }
    }
};