var TAG = function(){}
var http = require("http");//获取http对象
var HttpRequest = function(method,path,content,callback){
    //return;
    console.log(TAG(),"HttpRequest, send, method=", method,",path=",path,",contents=",content);
    var contents = JSON.stringify(content);
    console.log(contents);
    var resDataTemp = '';
    var options = {
        host:"10.32.2.40",
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
            resDataTemp += data;
        });
        res.on('end',function(data){
            console.log(TAG(),"HttpRequest, end resDataTemp=",resDataTemp);
            callback(resDataTemp);
        });
    });

    req.write(contents);
    req.end();
};


HttpRequest(
    'post',
    '/rule',
    {
        "ruleId":"1111","ruleType":"system","ruleName":"rule11","resourceType":"11","ruleAction":"select11"
    },
    function(httpresdata){
        console.log("res=",httpresdata);
    });