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

// event listeners

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener('click', () => {
    calculator(numberButton.innerText);
  });
});

operationButtons.forEach((operationButton) => {
  operationButton.addEventListener('click', () => {
    handleOperationButtonClick(operationButton.innerText);
  });
});

clearButton.addEventListener('click', handleClearButtonClick);

equalsButton.addEventListener('click', handleEqualButtonClick);

function handleEqualButtonClick() {
  const result = calculate();

  setGlobalVariables({
    newFirstOperand: result,
    newOperator: '',
    newSecondOperand: '',
    newShouldExpectSecondOperand: false,
  });

  updateDisplayText();
}

function handleOperationButtonClick(incomingOperator) {
  const isFirstOperandEmpty = isEmptyString(firstOperand);
  const isOperatorEmpty = isEmptyString(operator);

  if (isFirstOperandEmpty || !isOperatorEmpty) return;

  shouldExpectSecondOperand = true;
  operator = incomingOperator;

  updateDisplayText();
}

function calculate() {
  const parsedFirstOperand = Number(firstOperand);
  const parsedSecondOperand = Number(secondOperand);

  return operations[operator](parsedFirstOperand, parsedSecondOperand);
}

function calculator(input) {
  const isStringNumber = isStringAnActualNumber(input);
  const isDecimal = isStringADecimal(input);

  if (isDecimal) return handleDecimal();

  if (!shouldExpectSecondOperand) {
    const isFirstOperandEmpty = isEmptyString(firstOperand);
    firstOperand = isFirstOperandEmpty ? input : (firstOperand += input);
  } else {
    const isSecondOperandEmpty = isEmptyString(secondOperand);
    secondOperand = isSecondOperandEmpty ? input : (secondOperand += input);
  }

  updateDisplayText();
}

// handlers;

function handleDecimal() {
  if (shouldExpectSecondOperand) {
    secondOperand.includes('.') ? secondOperand : (secondOperand += '.');
  } else {
    firstOperand.includes('.') ? firstOperand : (firstOperand += '.');
  }
}

// kanoume reset ta global values kai ta outputs sto html
function handleClearButtonClick() {
  setGlobalVariables({
    newFirstOperand: '',
    newOperator: '',
    newSecondOperand: '',
    newShouldExpectSecondOperand: false,
  });

  updateDisplayText();
}

// helpers;

// checkaroume an to string einai number
function isStringAnActualNumber(str) {
  return !isNaN(Number(str));
}

// checkaroume an to string einai decimal
function isStringADecimal(str) {
  return str === '.';
}

// checkaroume an to string einai empty
function isEmptyString(str) {
  return str === '';
}

// updatearoume to html text
function updateDisplayText() {
  outputFirstOperand.innerText = firstOperand;
  outputOperator.innerText = operator;
  outputSecondOperand.innerText = secondOperand;
}

// setaroume ta global variables me ta nea values. To pername san object gia na min xreiastei na kanoume update ola ta values xexorista
function setGlobalVariables({
  newFirstOperand,
  newOperator,
  newSecondOperand,
  newShouldExpectSecondOperand,
}) {
  firstOperand = newFirstOperand;
  operator = newOperator;
  secondOperand = newSecondOperand;
  shouldExpectSecondOperand = newShouldExpectSecondOperand;
}
