const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(q){
  return new Promise(res => rl.question(q, ans => res(ans.trim().toLowerCase())));
}

function roll(){
  return Math.floor(Math.random()*6)+1;
}

// ---------- ENCOUNTER SYSTEM ----------

function showHUD(player){
  const inv = player.inventory.length ? player.inventory.join(", ") : "(empty)";
  console.log(`
--- HUD ---
Bravery: ${player.bravery}
Charisma: ${player.charisma}
Inventory: ${inv}
-----------`);
}

// Item effects: each item has a real gameplay use
const itemEffects = {
  bread: {
    label: "bread",
    desc: "Comfort food. +1 bravery and +1 charisma.",
    use(player){
      player.bravery += 1;
      player.charisma += 1;
      return "You share the bread. Warmth returns to your chest. (+1 Bravery, +1 Charisma)";
    }
  },
  "feather charm": {
    label: "feather charm",
    desc: "A light blessing. Prevents bravery loss once.",
    use(player){
      player.shields += 1;
      return "You hold the feather charm to your heart. Fear feels lighter. (Shield +1: blocks next bravery loss)";
    }
  },
  "silver tear": {
    label: "silver tear",
    desc: "A quiet truth. +2 charisma.",
    use(player){
      player.charisma += 2;
      return "You let the silver tear fall into your palm and speak honestly. (+2 Charisma)";
    }
  }
};

// Use an item intentionally during an encounter
async function useItem(player){
  if(player.inventory.length === 0){
    return "You reach for something comforting, but your pockets are empty.";
  }

  console.log("\nWhich item will you use?");
  player.inventory.forEach((it, i) => console.log(`${i+1}. ${it}`));
  const pick = await ask("> ");

  const idx = Number(pick) - 1;
  if(Number.isNaN(idx) || idx < 0 || idx >= player.inventory.length){
    return "You fumble indecisively and end up using nothing.";
  }

  const chosen = player.inventory.splice(idx, 1)[0];
  const effect = itemEffects[chosen];

  if(!effect){
    return `You use ${chosen}, but nothing happens.`;
  }

  return effect.use(player);
}

function applyBraveryLoss(player, amount){
  // shields prevent bravery loss (not charisma loss)
  if(amount <= 0) return 0;

  if(player.shields > 0){
    player.shields -= 1;
    console.log("Your charm steadies you. The fear doesn't bite this time. (Shield consumed, bravery loss prevented)");
    return 0;
  }

  player.bravery -= amount;
  return amount;
}

function printEncounterSummary(braveryBefore, charismaBefore, player){
  const bDiff = player.bravery - braveryBefore;
  const cDiff = player.charisma - charismaBefore;

  const bText = bDiff > 0 ? `+${bDiff}` : `${bDiff}`;
  const cText = cDiff > 0 ? `+${cDiff}` : `${cDiff}`;

  console.log(`Bravery ${bText} (now ${player.bravery})`);
  console.log(`Charisma ${cText} (now ${player.charisma})`);
}


// ---------- ENCOUNTER SYSTEM ----------

function clampStats(player){
  if(player.bravery < 0) player.bravery = 0;
  if(player.charisma < 0) player.charisma = 0;
  if(player.shields < 0) player.shields = 0;
}

async function encounter(player, data){

  const braveryBefore = player.bravery;
  const charismaBefore = player.charisma;

  console.log(`\n${data.text}`);
  console.log("Choose: talk / item / run");

  let choice = await ask("> ");
  let dice = roll();

  console.log(`(Dice: ${dice})`);

  function applySuccess(){
    const gain = data.braveryGain ?? 1;
    player.bravery += gain;

    // charisma increases on success (as requested)
    player.charisma += 1;

    console.log(data.success);

    if(data.reward){
      player.inventory.push(data.reward);
      console.log(`You received: ${data.reward}`);
    }
  }

  function applyFail(){
    const loss = data.braveryLoss ?? 1;

    console.log(data.fail);

    // bravery loss can be shielded
    applyBraveryLoss(player, loss);

    // charisma also takes a small hit when you fail socially
    if(data.charismaLoss){
      player.charisma -= data.charismaLoss;
    } else {
      player.charisma -= 1;
    }
  }

  if(choice === "talk"){
    // HARDER: talk uses dice + charisma primarily; bravery helps, but less
    // This makes failing possible even with high bravery
    const score = dice + player.charisma + Math.floor(player.bravery*(5/8));

    if(score >= data.diff){
      applySuccess();
    } else {
      applyFail();
    }
  }

  else if(choice === "item"){
    // Using an item is an action: it can buff you, but it doesn't automatically "win"
    // After using, you still roll a smaller check.
    const msg = await useItem(player);
    console.log(msg);

    // after item use, do a lighter check
    const score = dice + player.charisma;

    if(score >= Math.max(6, data.diff - 2)){
      console.log("The moment turns in your favor.");
      applySuccess();
    } else {
      console.log("Even with help, your nerves show.");
      applyFail();
    }
  }

  else if(choice === "run"){
    console.log("You choose retreat over confrontation.");

    // Running avoids the toughest consequences, but still has risk:
    // low rolls lose bravery, high rolls gain a little bravery
    if(dice >= 5){
      player.bravery += 1;
      console.log("You retreat with discipline, keeping your resolve.");
    } else {
      console.log("You retreat too quickly, doubts following close behind.");
      applyBraveryLoss(player, data.runLoss ?? 1);
      player.charisma -= 0; // no charisma penalty for running
    }
  }

  else {
    console.log("Invalid choice. The cave answers hesitation.");
    applyFail();
  }

  clampStats(player);
  printEncounterSummary(braveryBefore, charismaBefore, player);
  showHUD(player);
}

// helper for cleaner output
function printStatChange(bBefore, bAfter, cBefore, cAfter){
  const bDiff = bAfter - bBefore;
  const cDiff = cAfter - cBefore;

  const bText = bDiff > 0 ? `+${bDiff}` : `${bDiff}`;
  const cText = cDiff > 0 ? `+${cDiff}` : `${cDiff}`;

  console.log(`Bravery ${bText} (now ${bAfter})`);
  console.log(`Charisma ${cText} (now ${cAfter})`);
}

// ---------- ENCOUNTER LIST ----------
const encounters = [

{ text:"A cave spirit hums softly, daring you to speak first.", diff:7,
  success:"Your greeting lands gently. The spirit brightens.", fail:"Your words feel thin in the dark.",
  reward:"feather charm", braveryGain:1, braveryLoss:2, charismaLoss:1, runLoss:1 },

{ text:"A stone guardian blocks the tunnel, waiting for a reason to let you pass.", diff:11,
  success:"It recognizes sincerity and steps aside.", fail:"It remains unmoved, and you feel smaller.",
  braveryGain:2, braveryLoss:2, charismaLoss:1, runLoss:2 },

{ text:"A lost child ghost clings to the air like unfinished grief.", diff:10,
  success:"You listen without fixing. The ghost finally rests.", fail:"The ghost recoils from your attempt.",
  reward:"silver tear", braveryGain:1, braveryLoss:3, charismaLoss:2, runLoss:1 },

{ text:"A riddle door stares at you with a carved grin, demanding confidence.", diff:12,
  success:"You speak clearly. The stone clicks open.", fail:"You second-guess yourself. The door stays shut.",
  braveryGain:2, braveryLoss:2, charismaLoss:1, runLoss:2 },

{ text:"A black pool whispers your battlefield memories back to you.", diff:13,
  success:"You name the fear and it loses its teeth.", fail:"The voices hook into you for a moment.",
  braveryGain:2, braveryLoss:3, charismaLoss:1, runLoss:2 },

{ text:"A glowing moth circles you, as if testing your patience.", diff:2,
  success:"You stay calm. It guides you onward.", fail:"You rush it. It vanishes into cracks.",
  braveryGain:1, braveryLoss:2, charismaLoss:1, runLoss:1 },

{ text:"A mirror shows the worst thing you ever did, and waits for your response.", diff:14,
  success:"You forgive yourself. The mirror fogs over.", fail:"You flinch away, and shame follows.",
  braveryGain:3, braveryLoss:3, charismaLoss:2, runLoss:2 },

{ text:"A sleeping troll snores. One mistake wakes it.", diff:11,
  success:"You move like a shadow. No sound.", fail:"A pebble skitters. The cave holds its breath.",
  braveryGain:1, braveryLoss:2, charismaLoss:1, runLoss:2 },

{ text:"A narrow bridge creaks and asks why you deserve to cross.", diff:5,
  success:"Your answer is simple and true. The bridge steadies.", fail:"The bridge shudders under doubt.",
  braveryGain:2, braveryLoss:2, charismaLoss:1, runLoss:2 },

{ text:"A shadow whispers: 'Turn back.' It sounds like your own voice.", diff:15,
  success:"You stand firm. The shadow retreats into nothing.", fail:"Your resolve wavers and the dark feels closer.",
  braveryGain:3, braveryLoss:4, charismaLoss:2, runLoss:3 }

];


// ---------- GAME ----------
async function game(){

  console.clear();
  console.log("=== CAVE OF COURAGE ===\n");

  const name = await ask("Name, retired soldier: ");

  let player = {
  name,
  bravery: 7,
  charisma: 3,
  shields: 0,
  inventory: ["bread"]
};

  console.log(`
You were once a knight, but a traumatic experience on the battlefield has left you afraid of combat.
Life has been peaceful so far, but an ancient dragon has awaken after 100 years of slumber.
The king's daughter has been taken hostage in exchange for a ransom.
Can you save the princess and the king's coffers armed with nothing but your words and courage?
`);

  // RUN ALL ENCOUNTERS
  for(let e of encounters){
    await encounter(player, e);
  }

  // VAULT
  console.log("\nYou discover an ancient vault. Inside rests a weapon.");
  let take = await ask("Take it? (yes/no) ");
  let weapon = false;

  if(take === "yes"){
    weapon = true;
    console.log("Your hands remember war. Invigorating.");
  } else {
    console.log("You leave it behind. Some things are best left in the past.");
  }

  // FINAL SCENE
  console.log(`
You enter the dragon's nest.
Mountains of valuables surround you.
The dragon watches, bright yellow eyes pierce into your soul, testing your courage.
The princess stands beside it unharmed, but scared.
`);

  console.log(`
Choose:
1 grab
2 bargain
3 leave
4 weapon
`);

  let final = await ask("> ");
  let dice = roll();

  console.log(`\nFinal Roll: ${dice}\n`);

// ---------- ENDINGS (Corrected Logic) ----------
  
  // Choice 1: GRAB
  if (final === "1") { 
    if (dice + player.bravery + player.charisma > 25) {
      console.log(`
You point at a danger that does not exist. The dragon distracted, you move.
You take the princess’s hand and pull her close.
You run.
Behind you, no roar comes. Maybe out of embarassment the dragon lets you go.
You saved the princess.
When the king offers titles and medals, you refuse them with a bow.
You return to your quiet life, but the kingdom tells your story anyway.
Not as a tale of battle, but as proof that courage can be as sharp a blade as a sword.
`);
    } else {
      console.log(`
You step forward, reaching for the princess as swiftly as you can.
The dragon does not strike. It simply shifts, placing itself between you like a closing door.
It's eyes lock with yours.
Your soul is shaken with fear.
You back up, about face, and run away, the dragon allows it.
When you return to the surface, the king demands answers you cannot simplify.
You speak the truth: the king is enraged and calls his guards to take you to the dungeon.
You hear the princess has returned and the dragon has been slain by the king's army.
You live out your days looking at the sky from your jail cell.
ENDING: COWARDS RETURN
`);
    }
  }

  // Choice 2: BARGAIN
  else if (final === "2") {
    if (dice + player.bravery + player.charisma > 18) {
      console.log(`
You keep your distance.
You speak with a nonthreatening voice.
You tell the dragon what the princess means to the kingdom, and what the kingdom could offer in return.
You negotiate the ransom price to a modest amount that won't bankrupt the kingdom and would still assure the dragon's satisfaction.
The dragon agrees.
The princess is released.
Back at court, your deeds are met with mixed reactions.
On one hand you have people calling you a coward for not slaying the dragon.
On the other you are called a shrewd businessman.
Treaties are written. Roads are rerouted. Hunters are turned away.
The kingdom talks of an unfamiliar victory, the day saved by business negotiations.
`);
    } else {
      console.log(`
You speak carefully, offering reason, empathy, and try to bargain the price down.
Feeling snubbed the dragon with a mighty breath, turns you into ash.
ENDING: WORDS FAILED
`);
    }
  }

  // Choice 3: LEAVE
  else if (final === "3") {
    console.log(`
You turn your back on the Princess, choosing the safety of your skin over the weight of your duty.
The King’s grief manifests as a public scaffold, and the crowd's roar for your head is the last thing you hear.
As the axe falls, you realize too late that some vows are written in blood, whether you shed it or the executioner does.
You survived the dragon only to be unmade by the very kingdom you refused to protect.

ENDING: QUIET SURRENDER (Execution)`);
  }

  // Choice 4: WEAPON
  else if (final === "4") {
    if (!weapon) {
      console.log(`
You reach for a hilt that isn't there, your empty hand a final, hollow confession of your failure.
The dragon does not admire your bravery; it simply closes its jaws around the man who brought a wish to a war.
There is no glory in this cold dark, only the crushing realization that intent without steel is just a death sentence.

ENDING: UNARMED TRUTH (Death)`);
    } else {
      console.log(`
The beast falls and the Princess clings to you in tearful gratitude, hailing you as the savior the realm prayed for.
The kingdom erupts in song, but the ring of steel and the smell of sulfur have triggered a war in your mind that won't end.
You hid your blade because you were broken, and picking it up has only reopened wounds that no medal can stitch shut.

ENDING: VICTORY AT A COST (Trauma)`);
    }
  }

console.log(`\nFinal Bravery: ${player.bravery}\n`);
}

// ---------- LOOP ----------
async function loop(){
  let play = true;
  while(play){
    await game();
    let again = await ask("\nPlay again? (y/n) ");
    if(again !== "y") play = false;
  }
  rl.close();
}

loop();
