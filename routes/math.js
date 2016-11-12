var express = require('express');
var router = express.Router();
var Calc = require('../lib/Calc');

router.get('/', function(req, res) {
	res.render('index');
});

router.post('/', function(req, res) {
	var expression = req.body.expression;
	//Вычисляем значение введенного выражения с помощью одной из функций нашего класса Calc
	var result = Calc.execExpr(expression);
	res.render('index', {message: result});
})

module.exports = router;