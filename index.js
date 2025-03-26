let displayValue = ""; // Stores the current number being typed
let firstNumber = null;
let secondNumber = null;
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const decimalButton = document.getElementById("decimal");

function updateDisplay() {
  display.textContent = displayValue || "0";
  decimalButton.disabled = displayValue.includes(".");
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

function handleDecimalClick() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
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

function handleBackspaceClick() {
  displayValue = displayValue.slice(0, -1);
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

function handleKeyboardInput(event) {
  if (event.key >= "0" && event.key <= "9") {
    handleDigitClick(event.key);
  } else if (event.key === ".") {
    handleDecimalClick();
  } else if (
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/"
  ) {
    handleOperatorClick(event.key);
  } else if (event.key === "Enter") {
    handleEqualsClick();
  } else if (event.key === "Backspace") {
    handleBackspaceClick();
  } else if (event.key === "Escape" || event.key.toLowerCase() === "c") {
    clearCalculator();
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
document
  .getElementById("decimal")
  .addEventListener("click", handleDecimalClick);
document
  .getElementById("backspace")
  .addEventListener("click", handleBackspaceClick);
document.addEventListener("keydown", handleKeyboardInput);

updateDisplay();
