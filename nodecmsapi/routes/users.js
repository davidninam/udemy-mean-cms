var express = require('express');
var router = express.Router();

// Get User model
var User = require('../models/user');

/*
* Register User
*/
router.post('/register', function(req, res) {
	User.findOne({ username: req.body.username }, function(err, users) {
		if (err) console.log(err);
		if (users) {
			//User already exists
			res.json('userExists');
		} else {
			// Register the new user
			var user = new User({
				username: req.body.username,
				password: req.body.password
			});
			user.save(err => {
				if (err) {
					console.log(err);
				} else {
					res.json('userRegistered');
				}
			});
		}
	});
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
