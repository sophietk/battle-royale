global._ = _ = require('underscore');

var express = require('express'),
    http = require('http'),
    $ = require('jquery'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.static(__dirname + '/../webapp'));
app.use(express.favicon());

app.listen(port);
console.log("Server is listening for HTTP requests on port 3000...");


var options = {
    host: 'www.leboncoin.fr',
    port: 80,
    path: '/annonces/offres/ile_de_france/?f=a&th=1&q=xbox'
};


app.get('/offres', function (req, res) {

	console.log("/offres");

    var callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log("=================================================================");
            parse(str);
            console.log("=================================================================");
        });
    };

    http.request(options, callback).end();

    res.send({ok: "ok"}, 200);
});

var parse = function(str) {
    console.log("=================================================================");
    console.log(str);
    console.log("=================================================================");
};
