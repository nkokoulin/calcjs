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

Calc.prototype.addEqual = function() {

}

// Calc.eval() возвращает результат, сбрасывая текущие цифры и знак, и ничего не печатает
Calc.prototype.eval = function() {
	if (this.buffer !== '') {
		this.addNumberFromBuffer();
		this.clearBuffer();
	}

	if (this.secondNumber !== undefined) {
		let a = this.firstNumber;
		let b = this.secondNumber;
		let modifier = 0;
		
		/*Для правильного вычисления дробных чисел, нам необходимо умножать их на 10^n, чтобы сделать их целыми, 
		и результат вычисления поделить на 10^n. 
		Для того, чтобы не умножать любое число на 10^9, мы высчитываем количество десятичных разрядов у каждого числа
		затем сравниваем их и выбираем наибольшее. Затем умножаем каждое из чисел на 10^n, производим вычисление
		и результат делим на 10^n
		*/

		//Если присутствуют десятичные числа, то умножаем оба числа на 10^n до целых
		if (this.firstNumberDots > 0 || this.secondNumberDots > 0) {
			let n = 0;
			if (this.firstNumberDots >= this.secondNumberDots) {
				n = this.firstNumberDots;
			} else {
				n = this.secondNumberDots;
			}
			modifier = Math.pow(10, n);
			a = a * modifier;
			b = b * modifier;
		}

		// Вычисляем результат
		let toPerform = a + this.currentSign + b;
		var result = eval(toPerform);

		// Если мы меняли числа, то делим результат на 10^n
		if (modifier > 0) {
			result = result / modifier;
		}

		this.writeExpressionToHistory(this.expression + '=' + result);
	
		this.firstNumber = result;
		this.secondNumber = undefined;
		this.currentSign = undefined;
		this.firstNumberDots = 0;
		this.secondNumberDots = 0;

		this.expression = result;
		this.writeExpressionToDisplay();
		this.result = result;
	} 
}

// При нажатии на кнопку 'C' очищаем дисплей и сбрасываем все сохраненные значения
Calc.prototype.clearDisplay = function() {
	this.expression = '';
	this.digitCount = 0;
	this.dotCount = 0;
	this.thereIsDot = 0;
	this.result = 0;
	inputDisplay.value = '';
	this.firstNumber = undefined;
	this.firstNumberDots = 0;
	this.secondNumber = undefined;
	this.secondNumberDots = 0;
	this.currentSign = undefined;
}

// Записываем любое выражение в историю
Calc.prototype.writeExpressionToHistory = function(expression) {
	var historyListItem = document.createElement('li');
	historyListItem.innerHTML = expression;
	historyList.appendChild(historyListItem);
}

// Записываем текущее выражение из памяти на дисплей
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
	if (this.thereIsDot !== true) {
		this.thereIsDot = true;
		this.buffer += '.'
		this.expression += '.';
		this.writeExpressionToDisplay();
	}
}

Calc.prototype.addSign = function(sign) {
	
	this.addNumberFromBuffer();
	this.clearBuffer();
	
	if (this.secondNumber !== undefined) {
		this.eval();
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
		this.thereIsDot = false;
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

console.log(Math.pow(2, 4));
var Calc = new Calc();
var inputDisplay = document.getElementById('expression');
var historyList = document.getElementById('historyList');