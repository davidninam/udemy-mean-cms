var express = require('express');
var router = express.Router();

// Get User model
var User = require('../models/user');

/*
* Register User
*/
router.post('/register', function(req, res) {
	User.findOne(
		{
			$or: [{ username: req.body.username }, { email: req.body.email }]
		},
		function(err, users) {
			if (err) console.log(err);
			if (users) {
				if (users.username == req.body.username) {
					// username already exists
					res.json('usernameExists');
				} else if (users.email == req.body.email) {
					res.json('emailExists');
				}
			} else {
				// Register the new user
				var user = new User({
					username: req.body.username,
					password: req.body.password,
					email: req.body.email
				});
				user.save(err => {
					if (err) {
						console.log('Error in saving to DB: ', err);
					} else {
						res.json('userRegistered');
					}
				});
			}
		}
	);
});

/*
* User Login
*/
router.get('/:id', function(req, res) {
	var slug = req.params.slug;

	User.findOne({ slug: slug }, function(err, page) {
		if (err) {
			console.log(err);
		}
		res.json(page);
	});
});

// Export
module.exports = router;
