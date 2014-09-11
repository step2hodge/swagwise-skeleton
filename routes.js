module.exports = function(app) {

    // Require mongoose dependency
    var mongoose = require('mongoose');
    // Add the dependency to passport after the mongoose require declaration
	var passport = require('passport');
    /* Add the dependency to Stripe */
    var stripe   = require('stripe')('sk_test_MPZw5Of5EjrfHaAM789HgPUc');

    /* ======================= REST ROUTES ====================== */
    // Handle API calls

    /* ========================= AUTH ROUTES ======================= */

    app.get('/api/logout', function(req, res, next) {
        req.logout();
        res.send(200);
    });

    // login API route
    app.post('/api/login', passport.authenticate('local'), function(req, res) {
        console.log(req.user);
        res.cookie('user', JSON.stringify(req.user));
        res.send(req.user);
    });

    // signup API route
    app.post('/api/signup', function(req, res, next) {
        var User = mongoose.model('User');
        // Create a customer
        stripe.customers.create({

            email: req.body.email

        }, function(err, customer){

            if(err) return next(err);

            var user = new User({
                email: req.body.email,
                password: req.body.password,
                customer_id: customer.id
            });

            user.save(function(err) {
                if (err) return next(err);

                res.send(200);
            });

        });
    });

    // Swag API route
    app.route('/api/swag')
        .get(function(req, res) {

            // use mongoose to get all products in the database
            mongoose.model('Swag').find(req.query, function(err, swag) {

                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.send(swag); // return products in JSON format
            });
        })

        .post(function(req, res) {
            // Add code here to update swag
        });

    app.route('/api/swag/:id')
        .get(function(req, res) {
            // use mongoose to get a product in the database by id
            mongoose.model('Swag').findOne({id: req.params.id}, function(err, product) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.send(product); // return the product in JSON format
            });
        });

    /* ========================= CHECK OUT ROUTES ======================= */
    app.route('/api/checkout')
        .post(function(req, res, next) {

            var charge = {
                amount: parseInt(req.body.amount) * 100,
                currency: "usd",
                card: {
                    number: parseInt(req.body.number),
                    exp_month: parseInt(req.body.month),
                    exp_year: parseInt(req.body.year),
                    name: req.body.name,
                    cvc: parseInt(req.body.cvv),
                    customer: req.body.customer_id || null
                }
            };

            stripe.charges.create(charge, function(err, order) {

                if(err) return next(err);

                res.send(order);

            });

        });

    /* ========================= FRONT-END ROUTES ======================= */
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./app/index.html'); // load our public/index.html file
    });

};