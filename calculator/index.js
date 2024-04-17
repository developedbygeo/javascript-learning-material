// constants
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equal]');
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

numberButtons.forEach((meraklis) => {
  meraklis.addEventListener('click', () => {
    console.log(meraklis.innerText);
  });
});
