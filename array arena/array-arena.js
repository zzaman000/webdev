// Array Arena

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(q){
    return new Promise(resolve => rl.question(q, ans => resolve(ans)));
}

// ARENA SETUP
// Roster represents monster health values

let roster = [45, 72, 30, 88, 61]; // starts with 5 entries


// DISPLAY FUNCTION

function showRoster(title){
    console.log(`\n${title}`);
    console.log(roster.join(", "));
}

// ARRAY ACTION FUNCTIONS

// add entry
function addMonster(value){
    roster.push(value);
}

// remove last
function removeLast(){
    roster.pop();
}

// update by index
function updateIndex(index, value){
    if(index >= 0 && index < roster.length){
        roster[index] = value;
    }
}

// search value
function containsValue(val){
    return roster.includes(val);
}

// remove first
function removeFirst(){
    roster.shift();
}

// ROUND LOOP

async function runArena(){

    showRoster("Starting Roster:");

    for(let round = 1; round <= 5; round++){

        console.log(`\n=== Round ${round} ===`);

        let action = Math.floor(Math.random() * 5);

        switch(action){

            case 0:{
                let newVal = Math.floor(Math.random() * 100) + 1;
                addMonster(newVal);
                console.log("Added monster with health:", newVal);
                break;
            }

            case 1:{
                removeLast();
                console.log("Last monster defeated!");
                break;
            }

            case 2:{
                let idx = Math.floor(Math.random() * roster.length);
                let newHealth = Math.floor(Math.random() * 100);
                updateIndex(idx, newHealth);
                console.log(`Monster at index ${idx} changed health to ${newHealth}`);
                break;
            }

            case 3:{
                let val = Math.floor(Math.random() * 100);
                console.log(`Searching for ${val}:`, containsValue(val));
                break;
            }

            case 4:{
                removeFirst();
                console.log("First monster fled!");
                break;
            }
        }

        console.log("Roster now:", roster.join(", "));
    }

    while(roster.length < 10){
        roster.push(Math.floor(Math.random()*100)+1);
    }

    showRoster("\nFinal Roster:");

    showStats();

    rl.close();
}

// STATS BOARD

function showStats(){

    console.log("\n****** STATS BOARD ******");

    const total = roster.length;

    const sum = roster.reduce((a,b)=>a+b,0);

    const avg = sum / total;

    const max = Math.max(...roster);
    const min = Math.min(...roster);

    const above50 = roster.filter(n => n > 50).length;

    console.log("Total Entries:", total);
    console.log("Sum:", sum);
    console.log("Average:", avg.toFixed(2));
    console.log("Highest:", max);
    console.log("Lowest:", min);
    console.log("Count > 50:", above50);
}


// Start
runArena();
