// Function Forge Toolkit

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(q){
    return new Promise(resolve => rl.question(q, ans => resolve(ans)));
}

// VALIDATION FUNCTION

function isValidNumber(value){
    return !isNaN(value) && value !== null && value !== "";
}

// UTILITY FUNCTIONS

// 1. Calculate total with tax
function calculateTotalWithTax(amount, taxRate){
    return amount + (amount * taxRate);
}

// 2. Check if number is even
function isEven(num){
    return num % 2 === 0;
}

// 3. Convert text to Title Case
function toTitleCase(text){
    return text
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

// 4. Find max of three numbers
function findMax(a, b, c){
    return Math.max(a, b, c);
}

// 5. Format username
function formatUsername(first, last){
    return (first[0] + last).toLowerCase();
}

// 6. Calculate average (USES FUNCTION COMPOSITION)
function sumArray(arr){
    return arr.reduce((sum, n) => sum + n, 0);
}

function calculateAverage(numbers){
    return sumArray(numbers) / numbers.length;
}

// DISPATCHER FUNCTION

async function runTool(choice){

    switch(choice){

        case "1":{
            let amount = await ask("Enter amount: ");
            let tax = await ask("Enter tax rate (decimal): ");

            if(!isValidNumber(amount) || !isValidNumber(tax)){
                console.log("Invalid input.");
                return;
            }

            let result = calculateTotalWithTax(Number(amount), Number(tax));
            console.log("Result:", result.toFixed(2));
            break;
        }

        case "2":{
            let num = await ask("Enter number: ");

            if(!isValidNumber(num)){
                console.log("Invalid number.");
                return;
            }

            console.log("Result:", isEven(Number(num)));
            break;
        }

        case "3":{
            let text = await ask("Enter text: ");
            console.log("Result:", toTitleCase(text));
            break;
        }

        case "4":{
            let a = await ask("Enter first number: ");
            let b = await ask("Enter second number: ");
            let c = await ask("Enter third number: ");

            if(!isValidNumber(a) || !isValidNumber(b) || !isValidNumber(c)){
                console.log("Invalid numbers.");
                return;
            }

            console.log("Result:", findMax(Number(a), Number(b), Number(c)));
            break;
        }

        case "5":{
            let first = await ask("First name: ");
            let last = await ask("Last name: ");
            console.log("Result:", formatUsername(first, last));
            break;
        }

        case "6":{
            let list = await ask("Enter numbers separated by commas: ");

            let arr = list.split(",").map(n => Number(n.trim()));

            if(arr.some(n => isNaN(n))){
                console.log("Invalid list.");
                return;
            }

            console.log("Result:", calculateAverage(arr).toFixed(2));
            break;
        }

        default:
            console.log("Invalid selection.");
    }
}

// MENU / DRIVER FUNCTION

async function startForge(){

    console.log(`
==== FUNCTION FORGE ====
1. Calculate Total With Tax
2. Check Even Number
3. Convert To Title Case
4. Find Maximum
5. Format Username
6. Calculate Average
7. Exit
`);

    let choice = await ask("Choose a tool: ");

    if(choice === "7"){
        console.log("Forge closing...");
        rl.close();
        return;
    }

    await runTool(choice);

    console.log("\n--- Run another tool ---\n");
    startForge();
}


// Start program
startForge();
