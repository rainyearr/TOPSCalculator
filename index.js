let displayValue = ""; // Stores the current number being typed
let firstNumber = null;
let secondNumber = null;
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");

function updateDisplay() {
  display.textContent = displayValue || "0";
}

function clearCalculator() {
  displayValue = "";
  firstNumber = null;
  secondNumber = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function handleDigitClick(value) {
  if (shouldResetDisplay) {
    displayValue = value;
    shouldResetDisplay = false;
  } else {
    displayValue += value;
  }
  updateDisplay();
}

function handleOperatorClick(selectedOperator) {
  if (operator !== null && displayValue !== "") {
    secondNumber = parseFloat(displayValue);
    displayValue = operate(operator, firstNumber, secondNumber).toString();
    updateDisplay();
  }
  firstNumber = parseFloat(displayValue);
  operator = selectedOperator;
  shouldResetDisplay = true;
}

function handleEqualsClick() {
  if (operator === null || firstNumber === null) return;
  secondNumber = parseFloat(displayValue);
  displayValue = operate(operator, firstNumber, secondNumber).toString();
  firstNumber = null;
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : "Error";
    default:
      return num2;
  }
}

// Add event listeners to buttons
document.querySelectorAll(".digit").forEach((button) => {
  button.addEventListener("click", () => handleDigitClick(button.textContent));
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () =>
    handleOperatorClick(button.dataset.operator)
  );
});

document.getElementById("equals").addEventListener("click", handleEqualsClick);
document.getElementById("clear").addEventListener("click", clearCalculator);

updateDisplay();
