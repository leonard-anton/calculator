const display = document.querySelector(".display");

const numberButtons = document.querySelectorAll(".numbers button");
const operatorButtons = document.querySelectorAll(".operators button");
const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("equal");

let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let resetDisplay = true;
display.textContent = '0';

function updateDisplay(value) {
    display.textContent = value;
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => appendNumber(button.textContent));
})

operatorButtons.forEach(button => {
    if (button.id !== "equal")
        button.addEventListener("click", () => setOperator(button.textContent));
})

equalButton.addEventListener("click", evaluate);

clearButton.addEventListener("click", clear);

function appendNumber(number) {
    if ((display.textContent === '0' && number !== '.') || resetDisplay === true || display.textContent === "Math Error" || display.textContent === "NaN" || display.textContent === "Infinity") {
        display.textContent = '';
        resetDisplay = false;
    }

    if (display.textContent.includes('.') && number === '.')
        return;

    display.textContent += number;
}

function setOperator(operator) {
    if (currentOperator !== null)
        evaluate();

    firstNumber = display.textContent;
    currentOperator = operator;
    resetDisplay = true;
}

function evaluate() {
    if (currentOperator === null || resetDisplay === true) return;
    secondNumber = display.textContent;
    display.textContent = operate(firstNumber, secondNumber, currentOperator);
    currentOperator = null;
}

function clear() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {

    if (b === 0)
        return "Math Error";
    return a / b;
}

function operate(a, b, operator) {

    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case 'x':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        default:
            return null;
    }
}