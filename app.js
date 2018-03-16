
/**
 * 
 */

var express = require("express");
var bodyParser     =   require("body-parser"); 
var app = express(); 
app.use(bodyParser.urlencoded({ extended: false }));  
var hostName = '127.0.0.1';
var port = 8080;

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "text/html;charset=utf-8");  
    next();  
});

app.use(express.static(__dirname));

app.listen(port,hostName,function(){

   console.log(`Server is running on http://${hostName}:${port}`);

});
