const display = document.getElementById("display");
const nums = document.querySelectorAll(".num");
const opr = document.querySelectorAll(".operator");
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");

let expression = "";

// Numbers
nums.forEach(element => {
    element.addEventListener("click", () => {
        expression += element.textContent;
        display.value = expression;
    });
});

// Clear
clear.addEventListener("click", () => {
    expression = "";
    display.value = "";
});

// Equals
equals.addEventListener("click", () => {
    if (expression === "") return;

    try {
        expression = eval(expression).toString();
        display.value = expression;
    } catch {
        display.value = "Error";
        expression = "";
    }
});

// Operators
const isOperator = char => ["+", "-", "*", "/"].includes(char);

const updateDisplay = () => {
    display.value = expression;
};

const replaceOperator = operator => {
    expression = expression.slice(0, -1) + operator;
};

const appendOperator = operator => {
    const lastChar = expression.slice(-1);

    if (expression === "") return;

    if (isOperator(lastChar)) {
        replaceOperator(operator);
    } else {
        expression += operator;
    }

    updateDisplay();
};

opr.forEach(element => {
    element.addEventListener("click", () => {
        appendOperator(element.textContent);
    });
});
