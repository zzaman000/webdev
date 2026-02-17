// ==============================
// Loop of Destiny Game
// ==============================

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(q){
    return new Promise(resolve => rl.question(q, ans => resolve(ans)));
}

async function game(){

    // ---------- Game Setup ----------
    const name = await ask("Hero, what is your name? ");

    let energy = 50;
    let score = 0;
    let lives = 3;
    let turnsRemaining = 10;

    console.log(`\nWelcome ${name}, to the Loop of Destiny!\n`);

    // ---------- Main Game Loop ----------
    while(turnsRemaining > 0){

        console.log("\n--------------------");
        console.log(`Turns Left: ${turnsRemaining}`);
        console.log(`Energy: ${energy} | Score: ${score} | Lives: ${lives}`);

        // Lose condition
        if(lives <= 0){
            console.log("You have fallen. Destiny rejects you.");
            break;
        }

        // Win condition
        if(score >= 100){
            console.log("You have achieved legendary status. Destiny crowns you victorious!");
            break;
        }

        // ---------- Player Choice ----------
        const choice = await ask("\nChoose action: (attack / rest / focus): ");

        // ---------- Choice Logic ----------
        if(choice === "attack"){
            console.log("You strike the enemy!");

            energy -= 10;
            score += 20;

            if(Math.random() < 0.3){
                console.log("The enemy struck back!");
                lives -= 1;
            }
        }

        else if(choice === "rest"){
            console.log("You meditate and regain strength.");

            energy += 15;

            // continue example: skip penalty check
            turnsRemaining--;
            continue;
        }

        else if(choice === "focus"){
            console.log("You channel your willpower.");

            energy -= 5;
            score += 10;
        }

        else{
            console.log("Invalid choice. Fate hesitates...");
            continue;
        }


        // ---------- Energy Check ----------
        if(energy <= 0){
            console.log("Your energy is depleted. Destiny fades...");
            break;
        }

        turnsRemaining--;
    }

    // ---------- End Result ----------
    console.log("\n===== FINAL RESULT =====");

    if(score >= 100)
        console.log("WINNER: Destiny favors you.");
    else if(lives <= 0)
        console.log("DEFEAT: You ran out of lives.");
    else if(energy <= 0)
        console.log("DEFEAT: You collapsed from exhaustion.");
    else
        console.log("TIME UP: Destiny remains undecided.");

    rl.close();
}

game();
