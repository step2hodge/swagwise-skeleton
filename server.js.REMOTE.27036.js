/* ================= REQUIRE MODULES ===================== */

var express      = require('express'),
    path         = require('path'),
    fs           = require('fs'),
    logger       = require('morgan'),
    mongoose     = require('mongoose'),
    uriUtil      = require('mongodb-uri'),
    http         = require('http'),
    https        = require('https'),
    stripe       = require('stripe')('sk_test_MPZw5Of5EjrfHaAM789HgPUc');

/* ===================== CONFIGURATION ==================== */

var app = express();

var privateKey   = fs.readFileSync('cert/server.key', 'utf8');
var certificate  = fs.readFileSync('cert/server.crt', 'utf8');
var credentials  = {key: privateKey, cert: certificate};

var httpServer   = http.createServer(app);
var httpsServer  = https.createServer(credentials, app);

var port = process.env.PORT || 9001;					                // Default port or port 9001
var sslport = 8443;                                                     // 8443 for development, 443 for production

/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */

var options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS : 30000
        }
    }
};

/*
 * Mongoose uses a different connection string format than MongoDB's standard.
 * Use the mongodb-uri library to help you convert from the standard format to
 * Mongoose's format.
 */

var mongodbUri = 'mongodb://swagwise:geekwise@ds045679.mongolab.com:45679/geekwise';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var conn = mongoose.connection;

mongoose.connect(mongooseUri, options);
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
    // Wait for the database connection to establish, then start the app.
    httpServer.listen(port);                                          // startup our app at http://localhost:9001
    httpsServer.listen(sslport);                                      // startup our HTTPS server on http://localhost:8443 or :443
    console.log('Get your swagger on at http://localhost:' + port);   // shoutout to the user
});
/*
mongoose.connect('mongodb://localhost:27017/swag');
mongoose.connection.once('open', function() {
    app.listen(port);                                                       // startup our app at http://localhost:9001
    console.log('Get your swagger on at http://localhost:' + port);   // shoutout to the user
});
*/

/* ================= REGISTER MODULES ===================== */
app.use(logger('dev'));                                 		        // log every request to the console
app.use(express.static(path.join(__dirname, 'app')));		            // set the static files location


/* ======================== MODELS ========================= */
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

/* ======================== ROUTES ========================= */
require('./routes.js')(app);                            		        // configure our routes, passing in app reference

/* ======================== MERCHANTS ====================== */

/*stripe.customers.list({ limit: 3 }, function(err, customers) {
    // asynchronously called
    console.log(customers);
});*/

stripe.charges.create({
    amount: 400,
    currency: "usd",
    card: {
        number: '4242424242424242',
        exp_month: 07,
        exp_year: 2015,
        name: 'BB Thorton',
        "brand": "Visa",
        "funding": "credit",
        "country": "US",
        "address_line1": null,
        "address_line2": null,
        "address_city": null,
        "address_state": null,
        "address_zip": null,
        "address_country": null,
        "cvc_check": null,
        "address_line1_check": null,
        "address_zip_check": null,
        "customer": null
    }
}, function(err, charge) {
    console.log(charge);
});

exports = module.exports = app;                                         // expose app