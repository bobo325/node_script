//封装好的方法
var TAG = function(){}
var http = require("http");//获取http对象
// var querystring = require('querystring');
var HttpRequest = function(method,path,contents,callback){
    //return;
    console.log(TAG(),"HttpRequest, send, method=", method,",path=",path,",contents=",contents);
    var contents = JSON.stringify(contents);
    var resDataTemp = '';
    var options = {
        host:"localhost",
        path:path,
        method:method,
        port:8000,
        headers:{
            'Content-Type':'application/json',
            //'Content-Length':contents.length
            'Content-Length': Buffer.byteLength(contents, 'utf8')
        }
    };

    var req = http.request(options,function(res){
        res.setEncoding('utf-8');
        res.on('data',function(data){
            //ZJLog.info(TAG(),"HttpRequest, data=", data,",resDataTemp=",resDataTemp);
            resDataTemp += data;
            // console.log('--->',data);
            //callback(resDataTemp);
        });
        res.on('end',function(data){
            console.log(TAG(),"HttpRequest, end resDataTemp=",resDataTemp);
            //console.log(data);
            callback(resDataTemp);
        });
    });

    req.write(contents);
    req.end();
};

//查询所有的rule
HttpRequest(
    'get',
    '/rules',
    {},
    function(httpresdata){
        console.log("res=",httpresdata);
});

// 查询单个rule
