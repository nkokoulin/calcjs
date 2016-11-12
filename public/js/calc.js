function Calc(exression) {
	this.expression = exression || '';
};

//Выполнение записанного выражения
Calc.prototype.eval = function() {
	let result = eval(this.expression);
	this.writeResultToDisplay(result);
	this.writeExpressionToHistory(this.expression + '=' + result);
	this.expression = result;
}

Calc.prototype.clearDisplay = function() {
	this.expression = '';
	inputDisplay.value = '';
}

Calc.prototype.writeExpressionToHistory = function(expression) {
	var historyListItem = document.createElement('li');
	historyListItem.innerHTML = expression;
	historyList.appendChild(historyListItem);
}

Calc.prototype.writeExpressionToDisplay = function() {
	inputDisplay.value = this.expression;
}

Calc.prototype.writeResultToDisplay = function(result) {
	inputDisplay.value = result;
}

Calc.prototype.addSign = function(sign) {
	this.expression += sign;
	this.writeExpressionToDisplay();
}

Calc.prototype.addDigit = function(digit) {
	this.expression += digit.toString();
	this.writeExpressionToDisplay();
}

var Calc = new Calc();
var inputDisplay = document.getElementById('expression');
var historyList = document.getElementById('historyList');