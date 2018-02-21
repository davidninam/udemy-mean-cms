var express = require('express');
var router = express.Router();

// Get page model
var Page = require('../models/page');

/*
* Get all pages
*/
router.get('/', function(req, res) {
	Page.find({}, function(err, pages) {
		if (err) console.log(err);
		res.json(pages);
	});
});

/*
* Get a page
*/
router.get('/:slug', function(req, res) {
	var slug = req.params.slug;

	Page.findOne({ slug: slug }, function(err, page) {
		if (err) {
			console.log(err);
		}
		res.json(page);
	});
});

/*
* Post Add Page
*/
router.post('/add-page', function(req, res) {
	var title = req.body.title;
	var slug = req.body.title.replace(/\s+/g, '-').toLowerCase();
	var content = req.body.content;
	Page.findOne({ slug: slug }, function(err, page) {
		if (err) console.log(err);
		if (page) {
			res.json('pageExists');
		} else {
			var page = new Page({
				title: title,
				slug: slug,
				content: content,
				sidebar: 'no'
			});
			page.save(err => {
				if (err) console.log('Error in saving page: ', err);
				res.json('ok');
			});
		}
	});
});

// Export
module.exports = router;
