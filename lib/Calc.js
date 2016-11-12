function Calc() {};

//Функция для вычисления выражения
Calc.prototype.execExpr = function(expression) {
	return eval(expression);
}

Calc.prototype.addPlus = function(task) {
	return task += '+';
}

Calc.prototype.addDigit = function(task, digit) {
	task += digit;
}

Calc.prototype.addMinus = function(task) {
	return task += '-';
}

Calc.prototype.eval = function(task) {
	return eval(task);
}

module.exports = new Calc(); 