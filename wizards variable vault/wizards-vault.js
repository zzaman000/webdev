// ==============================
// Wizard's Variable Vault (Node Version)
// ==============================

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Ask questions function (promise wrapper)
function ask(question){
    return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}


async function runVault(){

    // ---------- Wizard Profile ----------
    const wizardName = await ask("Enter your wizard name: ");
    const wizardRank = await ask("Enter your rank (Apprentice, Adept, Master): ");

    console.log(`\nWelcome, ${wizardRank} ${wizardName}! Preparing your vault...\n`);

    // ---------- Inventory Based On Rank ----------
    let goldCoins;
    let manaCrystals;
    let vaultSecurityLevel;

    if (wizardRank === "Apprentice") {
        goldCoins = 50;
        manaCrystals = 20;
        vaultSecurityLevel = 3;
    }
    else if (wizardRank === "Adept") {
        goldCoins = 120;
        manaCrystals = 50;
        vaultSecurityLevel = 2;
    }
    else if (wizardRank === "Master") {
        goldCoins = 300;
        manaCrystals = 150;
        vaultSecurityLevel = 1;
    }
    else {
        console.log("Unknown rank. Defaulting to Apprentice.\n");
        goldCoins = 50;
        manaCrystals = 20;
        vaultSecurityLevel = 3;
    }

    // ---------- Other Vault Items ----------
    let hasKey = true;
    let potionName = "Elixir of Wisdom";
    let potionCount = 4;

    // ---------- Display Inventory ----------
    console.log("=== Vault Inventory ===");
    console.log(`Gold Coins: ${goldCoins}`);
    console.log(`Mana Crystals: ${manaCrystals}`);
    console.log(`Has Key: ${hasKey}`);
    console.log(`Potion: ${potionName}`);
    console.log(`Potion Count: ${potionCount}`);
    console.log(`Security Level: ${vaultSecurityLevel}`);
    console.log("========================\n");


    // ---------- Spell Cost Calculator ----------
    const spellInput = await ask("How many spells would you like to craft? ");
    const spellCount = parseInt(spellInput);

    const manaCost = 3 * spellCount;
    const goldCost = 10 * spellCount;

    console.log(`\nCrafting ${spellCount} spell(s) costs:`);
    console.log(`${manaCost} Mana Crystals`);
    console.log(`${goldCost} Gold Coins\n`);


    // ---------- Affordability Check ----------
    if (manaCrystals >= manaCost && goldCoins >= goldCost) {

        console.log("You have enough resources. Crafting spells...\n");

        manaCrystals -= manaCost;
        goldCoins -= goldCost;

        console.log("=== Updated Inventory ===");
        console.log(`Gold Coins: ${goldCoins}`);
        console.log(`Mana Crystals: ${manaCrystals}`);

    } else {

        console.log("Not enough resources!");

        if (manaCrystals < manaCost && goldCoins < goldCost) {
            console.log("You lack BOTH mana crystals and gold.");
        }
        else if (manaCrystals < manaCost) {
            console.log("You lack enough mana crystals.");
        }
        else {
            console.log("You lack enough gold coins.");
        }
    }


    // ---------- Vault Access ----------
    console.log("\nChecking vault access...");

    if ((hasKey === true && vaultSecurityLevel <= 3) || wizardRank === "Master") {
        console.log("Vault Opened");
    } else {
        console.log("Access Denied");
    }

    rl.close();
}


// Run program
runVault();
