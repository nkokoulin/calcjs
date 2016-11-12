var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/detail', function(req, res) {
	res.send('Detail info page');
})

module.exports = router;