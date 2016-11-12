'use strict'
/* простое приложение-калькулятор, созданное в учебных целях.
   Цели создания приложения:
	- Научиться использовать маршрутизацию +
	- Научиться использовать шаблонизаторы (pug) +
	- Научиться работать с математикой в js +
	- Научиться использовать git и github при разрработке +
*/
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//views
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

//static
app.use(express.static(path.join(__dirname, 'public')));

//routes
var mathRouter = require('./routes/math');
app.use('/', mathRouter);

app.listen(3000, function() {
	console.log('app listening on port 3000');
});