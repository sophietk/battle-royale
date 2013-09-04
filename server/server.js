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
    path_root: '/annonces/offres/{city}/?f=a&th=1&q='
};

app.get('/offres', function (req, res) {

    var query = req.query['q'];
    var city = req.query['r'];
    city = 'ile_de_france' + (req.query['r'] ? '/' + alnumuscorify(city) : '');

	console.log("query", query);
	console.log("city", city);

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

    options.path = (options.path_root + query).replace('{city}', city);
    console.log("options.path", options.path);

    http.request(options, callback).end();

});

var parse = function(str) {
    console.log("=================================================================");

    var rez = [];

    $(str).find('.list-lbc a').
        each(function(i, elem) {
            var $elem = $(elem);
            rez.push({
                image: $elem.find('.image img').attr('src'),
                description: $elem.find('.title').text().trim(),
                price: parseInt($elem.find('.price').text().trim().split(' ')[0]),
                city: $elem.find('.placement').text().trim()
            }) ;
        });

    return rez;
};

function alnumuscorify(a){a=a.toLowerCase();a=a.replace(/[áàâä]/g,"a");a=a.replace(/[éèêë]/g,"e");a=a.replace(/[íìîï]/g,"i");a=a.replace(/[óòôö]/g,"o");a=a.replace(/[úùûü]/g,"u");a=a.replace(/ÿ/g,"y");a=a.replace(/ç/g,"c");a=a.replace(/¤/g,"e");a=a.replace(/²/g,"2");a=a.replace(/³/g,"3");a=a.replace(/[^a-zA-Z0-9]+/g,"_");return a}
