global._ = _ = require('underscore');

var express = require('express'),
    app = express();


app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.static(__dirname + '/../webapp'));
app.use(express.favicon());

app.listen(3000);
console.log("Server is listening for HTTP requests on port 3000...");

app.get('/offres', function(req, res){
    res.send({ok: "ok"}, 200);
});