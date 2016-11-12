'use strict'
/* TODO: 
	Добавить десятичные числа
	Сделать точные вычисления десятичных чисел
*/

function Calc(exression) {
	//expression используется для отображения формулы на дисплее калькулятора
	this.expression = exression || '';
	//buffer используется для записи чисел
	this.buffer = '';
	this.signCount = 0;
	this.digitCount = 0;
	this.dotCount = 0;
	this.thereIsDot = 0;
	this.result = 0;

	//Вычисление всегда происходит по 1 математической операции за один раз
	this.firstNumber = undefined;
	this.firstNumberDots = 0;
	this.secondNumber = undefined;
	this.secondNumberDots = 0;
	this.currentSign = undefined;
};

Calc.prototype.evalExpression = function(expression) {

}
// Calc.eval() возвращает результат, сбрасывая текущие цифры и знак, и ничего не печатает
Calc.prototype.eval = function() {
	this.addNumberFromBuffer();
	this.clearBuffer();
	if (this.secondNumber !== undefined) {
		var toPerform = this.firstNumber + this.currentSign + this.secondNumber;
		var result = eval(toPerform);

		this.writeExpressionToHistory(toPerform + '=' + result);
	
		this.firstNumber = result;
		this.secondNumber = undefined;
		this.currentSign = undefined;

		this.expression = result;
		this.writeExpressionToDisplay();
		this.result = result;
	} 
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

Calc.prototype.clearBuffer = function() {
	this.buffer = '';
}

Calc.prototype.writeResultToDisplay = function(result) {
	inputDisplay.value = result;
}

Calc.prototype.addDot = function() {
	this.thereIsDot = true;
	this.expression += '.';
	this.writeExpressionToDisplay();
}

Calc.prototype.addSign = function(sign) {
	if (this.firstNumber === undefined && this.buffer === '') {
		//вернуть ошибку
	} else if (this.firstNumber === undefined && this.digitCount > 0) {
		this.addNumberFromBuffer();
		this.clearBuffer();
	} else if (this.firstNumber !== undefined && this.digitCount > 0) {
		this.addNumberFromBuffer();
		this.clearBuffer();
		this.eval();
		this.firstNumber = this.result;
	}
	this.currentSign = sign;
	this.expression = this.firstNumber + this.currentSign;
	this.writeExpressionToDisplay();
}

Calc.prototype.addNumberFromBuffer = function() {
	if (this.buffer !== '') {
		if (this.firstNumber === undefined) {
			this.firstNumber = +this.buffer;
			this.firstNumberDots = this.dotCount;
		} else if (this.secondNumber === undefined) {
			this.secondNumber = +this.buffer;
			this.secondNumberDots = this.dotCount;
		} else {
			//Выдать ошибку, о том, что невозможно добавить третье число
		}
		this.digitCount = 0;
	}
}

Calc.prototype.addDigit = function(digit) {
	this.digitCount++;
	if (this.thereIsDot) {
		this.dotCount++;
	}
	this.buffer += digit.toString();
	this.expression += digit.toString();
	this.writeExpressionToDisplay();
}

var Calc = new Calc();
var inputDisplay = document.getElementById('expression');
var historyList = document.getElementById('historyList');