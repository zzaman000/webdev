// DATASET (15 objects, 4+ fields)

const potions = [
  { name:"Healing Draught", type:"Health", power:40, price:25 },
  { name:"Mana Surge", type:"Mana", power:55, price:40 },
  { name:"Dragon Breath", type:"Attack", power:90, price:85 },
  { name:"Stone Skin", type:"Defense", power:70, price:60 },
  { name:"Swiftstep", type:"Speed", power:35, price:30 },
  { name:"Night Vision", type:"Utility", power:25, price:20 },
  { name:"Thunder Tonic", type:"Attack", power:88, price:75 },
  { name:"Frost Guard", type:"Defense", power:65, price:55 },
  { name:"Elixir of Life", type:"Health", power:95, price:120 },
  { name:"Focus Serum", type:"Mana", power:50, price:42 },
  { name:"Venom Brew", type:"Attack", power:77, price:68 },
  { name:"Guardian Mix", type:"Defense", power:80, price:70 },
  { name:"Blink Potion", type:"Speed", power:45, price:50 },
  { name:"Shadow Veil", type:"Utility", power:60, price:58 },
  { name:"Solar Flask", type:"Health", power:85, price:95 }
];

// forEach

console.log("****** POTION LIST ******");

potions.forEach(({ name, type, power, price }) => {
  console.log(`${name} [${type}] — Power: ${power}, Price: ${price}`);
});

// filter

// strong potions
const strongPotions = potions.filter(p => p.power >= 80);

// attack type potions
const attackPotions = potions.filter(p => p.type === "Attack");

// map

// names only
const potionNames = potions.map(p => p.name);

// formatted strings
const formattedPotions = potions.map(
  ({ name, power }) => `${name} → ${power} power`
);

// REPORT OBJECT

// average power
const avgPower =
  potions.reduce((sum, p) => sum + p.power, 0) / potions.length;

// highest power potion
const strongest = potions.reduce((max, p) =>
  p.power > max.power ? p : max
);

const report = {
  totalItems: potions.length,
  strongCount: strongPotions.length,
  averagePower: Number(avgPower.toFixed(2)),
  strongestPotion: strongest.name
};

// OUTPUT RESULTS

console.log("\n****** FILTER RESULTS ******");
console.log("Strong Potions:", strongPotions.length);
console.log("Attack Potions:", attackPotions.length);

console.log("\n****** MAP RESULTS ******");
console.log("Names:", potionNames);
console.log("Formatted:", formattedPotions);

console.log("\n****** REPORT ******");
console.log(report);
