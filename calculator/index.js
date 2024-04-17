// constans
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');

const outputFirstOperand = document.querySelector('[data-first-operand]');
const outputSecondOperand = document.querySelector('[data-second-operand]');
const outputOperator = document.querySelector('[data-operator]');

let firstOperand = '';
let secondOperand = '';
let operator = '';
let shouldExpectSecondOperand = false;

const operations = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
};

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator(button.innerText);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (firstOperand === '') return;
    shouldExpectSecondOperand = true;
    operator = button.innerText;
    calculator(button.innerText);
  });
});

// event listeners
equalsButton.addEventListener('click', () => {
  const result = calculate(operator);
  firstOperand = result;
  secondOperand = '';
  operator = '';
  shouldExpectSecondOperand = false;

  outputFirstOperand.innerText = firstOperand;
  outputSecondOperand.innerText = secondOperand;
  outputOperator.innerText = operator;
});

clearButton.addEventListener('click', () => {
  firstOperand = '';
  secondOperand = '';
  operator = '';
  shouldExpectSecondOperand = false;

  outputFirstOperand.innerText = firstOperand;
  outputSecondOperand.innerText = secondOperand;
  outputOperator.innerText = operator;
});

// helpers
const calculate = (operator) => {
  const a = parseFloat(firstOperand);
  const b = parseFloat(secondOperand);
  return operations[operator](a, b);
};

const calculator = (input) => {
  const isStringNumber = isStringAnActualNumber(input);
  const isDecimal = isStringADecimal(input);

  if (isDecimal) return handleDecimal();
  if (!isStringNumber) return;

  if (!shouldExpectSecondOperand) {
    if (firstOperand === '') {
      firstOperand = input;
    } else {
      firstOperand += input;
    }
  } else if (isStringNumber && shouldExpectSecondOperand) {
    if (secondOperand === '') {
      secondOperand = input;
    } else {
      secondOperand += input;
    }
  }

  outputFirstOperand.innerText = firstOperand;
  outputOperator.innerText = operator;
  outputSecondOperand.innerText = secondOperand;
};

// handlers
const handleDecimal = () => {
  if (shouldExpectSecondOperand) {
    if (secondOperand.includes('.')) return;
    secondOperand += '.';
  } else {
    if (firstOperand.includes('.')) return;
    firstOperand += '.';
  }
};

// helpers
const isStringAnActualNumber = (str) => !isNaN(Number(str));
const isStringADecimal = (str) => str === '.';
