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
    path_root: '/annonces/offres/ile_de_france/?f=a&th=1&q='
};


app.get('/offres', function (req, res) {

    var query = req.query['q'];

	console.log("query", query);

    var callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log("=================================================================");
            var rez = parse(str);
            res.send(rez, 200);

            console.log("=================================================================");
        });
    };

    options.path = options.path_root + query;
    console.log("options.path", options.path);

    http.request(options, callback).end();

});

var parse = function(str) {
    console.log("=================================================================");

    var rez = [];

    $(str).find('.list-lbc a').
        each(function(i, elem) {
            var $elem = $(elem)
            rez.push({
                image: $elem.find('.image img').attr('src'),
                description: $elem.find('.title').text().trim(),
                price: parseInt($elem.find('.price').text().trim().split(' ')[0])
            }) ;
        });

    return rez;
};
