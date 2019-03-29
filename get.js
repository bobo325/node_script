var TAG = function(){}
var http = require("http");//获取http对象
var querystring = require('querystring');
var HttpRequest = function(method,path,content,callback){
    //return;
    console.log(TAG(),"HttpRequest, send, method=", method,",path=",path,",contents=",content);
    var contents = JSON.stringify(content);
    console.log(contents);
    var querys = querystring.stringify(content);
    console.log(querys);
    var resDataTemp = '';
    var options = {
        host:"10.32.2.40",
        path:path + '?' + querys,
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
            //console.log(data);
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


HttpRequest(
    'get',
    '/userInfo',
    {
        "userId":1
    },
    function(httpresdata){
        console.log("res=",httpresdata);
})