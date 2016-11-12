'use strict'
/* простое приложение-калькулятор, созданное в учебных целях.
   Цели создания приложения:
	- Научиться использовать маршрутизацию 
	- Научиться использовать шаблонизаторы (pug)
	- Научиться работать с математикой в js
	- Научиться использовать git и github при разрработке
	- Научиться использовать тесты (mocha и chai)
*/
var express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');
var logger = require('morgan');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');


var mathRouter = require('./routes/math');
app.use('/', mathRouter);

app.listen(3000, function() {
	console.log('app listening on port 3000');
});