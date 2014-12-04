module.exports = function(app, passport) {

    // Require mongoose dependency
    var mongoose = require('mongoose');

    /* Add the dependency to Stripe */
    var stripe   = require('stripe')('sk_test_MPZw5Of5EjrfHaAM789HgPUc');

    /* ======================= REST ROUTES ====================== */
    // Handle API calls

	function checkRole(role) {
		return function(req, res, next) {

			if (req.user && req.user[role]) {
				next();
			} else {
				res.send(401, 'Unauthorized');
			}
		}
	}

    // Swag API route
    app.route('/api/admin/products')
	    .all(checkRole('isAdmin'))
        .get(function(req, res) {

		    var filter = {};

		    if (req.query.isFeatured) {
			    filter.isFeatured = isBoolean(req.query.isFeatured) ? req.query.isFeatured : true;
		    }

            // use mongoose to get all products in the database
            mongoose.model('Product').find(filter, function(err, swag) {

                //http://localhost:9001/api/swag/?isActive=false&foo=bar&ninja=false
                // req.query = {isFeatured: true, foo: bar, ninja: false}

                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.send(swag); // return products in JSON format
            });
        });

    app.route('/api/admin/products/:id')
        .get(function(req, res) {
            // use mongoose to get a product in the database by id
            mongoose.model('Product').findOne({id: req.params.id}, function(err, product) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.send(product); // return the product in JSON format
            });
        });

	app.route('/api/admin/users', function(req, res) {});

	app.route('/api/admin/users/:id', function(req, res) {});

};
