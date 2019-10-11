const express = require("express");

router = express.Router();

router.get('/', function(req,res) {
	res.send("Welcome to Front End Challenge API");
});

const files = require('../files.js');
router.get('/api/files', files.list);

const categories = require('../categories.js');
router.get('/api/categories', categories.list);

const data = require('../data.js');
router.get('/api/:name', data.display);

module.exports = router;