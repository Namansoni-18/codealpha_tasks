const expressionDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

const historyList = document.getElementById("history-list");
const emptyHistory = document.getElementById("empty-history");
const clearHistoryButton = document.getElementById("clear-history");

let expression = "";
let finished = false;

const HISTORY_KEY = "calculatorHistory";
let calculationHistory = [];

// Load saved calculation history.
try {
  const savedHistory = JSON.parse(
    localStorage.getItem(HISTORY_KEY) || "[]"
  );

  if (Array.isArray(savedHistory)) {
    calculationHistory = savedHistory
      .filter((item) => {
        return (
          item &&
          typeof item.expression === "string" &&
          typeof item.result === "number" &&
          Number.isFinite(item.result)
        );
      })
      .slice(0, 50);
  }
} catch (error) {
  calculationHistory = [];
}

// Evaluate arithmetic without eval().
// Multiplication and division take priority.
function calculate(text) {
  const tokens =
    text.match(/(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?|[+*/-]/gi) || [];

  if (!tokens.length || tokens.join("") !== text) {
    throw new Error("Incomplete");
  }

  let index = 0;

  function readNumber() {
    let sign = 1;

    while (tokens[index] === "+" || tokens[index] === "-") {
      if (tokens[index] === "-") {
        sign *= -1;
      }

      index++;
    }

    const token = tokens[index++];

    if (!token || !/^[\d.]/.test(token)) {
      throw new Error("Incomplete");
    }

    return sign * Number(token);
  }

  function readTerm() {
    let value = readNumber();

    while (tokens[index] === "*" || tokens[index] === "/") {
      const operator = tokens[index++];
      const next = readNumber();

      if (operator === "/" && next === 0) {
        throw new Error("Cannot divide by zero");
      }

      value = operator === "*" ? value * next : value / next;
    }

    return value;
  }

  let value = readTerm();

  while (index < tokens.length) {
    const operator = tokens[index++];

    if (operator !== "+" && operator !== "-") {
      throw new Error("Incomplete");
    }

    const next = readTerm();
    value = operator === "+" ? value + next : value - next;
  }

  if (!Number.isFinite(value)) {
    throw new Error("Number too large");
  }

  return Number(value.toPrecision(12));
}

// Update the expression and live result.
function updateDisplay() {
  expressionDisplay.textContent = (expression || "0")
    .replaceAll("*", "×")
    .replaceAll("/", "÷");

  try {
    resultDisplay.textContent = expression
      ? calculate(expression)
      : "0";
  } catch (error) {
    resultDisplay.textContent =
      error.message === "Incomplete" ? "…" : error.message;
  }
}

// Save history in the browser.
function storeHistory() {
  try {
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(calculationHistory)
    );
  } catch (error) {
    // History still works for this session if storage is unavailable.
  }
}

// Add a completed calculation to history.
function saveCalculation(originalExpression, answer) {
  calculationHistory.unshift({
    expression: originalExpression,
    result: answer
  });

  // Keep the latest 50 calculations.
  calculationHistory = calculationHistory.slice(0, 50);

  storeHistory();
  renderHistory();
}

// Display history, newest first.
function renderHistory() {
  if (!historyList || !emptyHistory) {
    return;
  }

  historyList.replaceChildren();
  emptyHistory.hidden = calculationHistory.length > 0;

  calculationHistory.forEach((calculation) => {
    const item = document.createElement("li");

    const expressionText = document.createElement("span");
    expressionText.className = "history-expression";
    expressionText.textContent = calculation.expression
      .replaceAll("*", "×")
      .replaceAll("/", "÷");

    const resultText = document.createElement("span");
    resultText.className = "history-result";
    resultText.textContent = "= " + calculation.result;

    item.append(expressionText, resultText);
    historyList.appendChild(item);
  });
}

// Handle calculator input.
function handleInput(key) {
  if (key === "clear") {
    expression = "";
    finished = false;
  } else if (key === "delete") {
    expression = expression.slice(0, -1);
    finished = false;
  } else if (key === "=") {
    try {
      const originalExpression = expression || "0";
      const answer = calculate(originalExpression);

      // Prevent duplicate history when equals is pressed repeatedly.
      if (!finished && expression) {
        saveCalculation(originalExpression, answer);
      }

      expression = String(answer);
      finished = true;
    } catch (error) {
      // Keep invalid expressions available for correction.
    }
  } else if (key === "%" || key === "sign") {
    const match = expression.match(
      /(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i
    );

    if (match) {
      let start = match.index;
      let value = Number(match[0]);

      const hasNegativeSign =
        expression[start - 1] === "-" &&
        (start === 1 || /[+*/-]/.test(expression[start - 2]));

      if (hasNegativeSign) {
        start--;
        value = -value;
      }

      value =
        key === "%"
          ? Number((value / 100).toPrecision(12))
          : -value;

      expression = expression.slice(0, start) + String(value);
    }

    finished = false;
  } else if (/^[0-9.]$/.test(key)) {
    // Start a new calculation after equals.
    if (finished) {
      expression = "";
    }

    finished = false;

    const currentNumber = expression.match(/[\d.]+$/)?.[0] || "";

    // Prevent multiple decimal points in one number.
    if (key === "." && currentNumber.includes(".")) {
      return;
    }

    if (expression.length >= 100) {
      return;
    }

    expression += key === "." && !currentNumber ? "0." : key;
  } else if (/^[+*/-]$/.test(key)) {
    finished = false;

    if (!expression) {
      if (key === "-") {
        expression = "-";
      }
    } else if (/[+*/-]$/.test(expression)) {
      // Allow negative numbers, such as 5 × -2.
      if (key === "-" && !expression.endsWith("-")) {
        expression += "-";
      } else {
        expression = expression.replace(/[+*/-]+$/, key);
      }
    } else {
      expression += key;
    }
  }

  updateDisplay();
}

// Calculator button clicks.
document.querySelectorAll("button[data-key]").forEach((button) => {
  button.addEventListener("click", () => {
    handleInput(button.dataset.key);
  });
});

// Keyboard support.
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }

  // Allow Enter to activate the focused Clear History button.
  if (
    event.key === "Enter" &&
    event.target === clearHistoryButton
  ) {
    return;
  }

  const shortcuts = {
    Enter: "=",
    Escape: "clear",
    Backspace: "delete",
    Delete: "clear",
    x: "*",
    X: "*"
  };

  const key = shortcuts[event.key] || event.key;

  if (
    /^[0-9.+*/%=-]$/.test(key) ||
    key === "clear" ||
    key === "delete"
  ) {
    event.preventDefault();
    handleInput(key);
  }
});

// Clear calculation history.
if (clearHistoryButton) {
  clearHistoryButton.addEventListener("click", () => {
    calculationHistory = [];
    storeHistory();
    renderHistory();
  });
}

// Initial display.
updateDisplay();
renderHistory();