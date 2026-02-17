// SPELL DATA
const spells = [
  { name: "Fireball", element: "Fire", power: 80, manaCost: 30 },
  { name: "Tsunami", element: "Water", power: 95, manaCost: 50 },
  { name: "Earthquake", element: "Earth", power: 90, manaCost: 45 },
  { name: "Wind Slash", element: "Air", power: 60, manaCost: 20 },
  { name: "Lightning Bolt", element: "Electric", power: 85, manaCost: 40 },
  { name: "Shadow Bind", element: "Dark", power: 70, manaCost: 35 },
  { name: "Holy Light", element: "Light", power: 75, manaCost: 25 },
  { name: "Frost Nova", element: "Ice", power: 65, manaCost: 28 }
];

// ARROW FUNCTIONS

// format spell output
const formatSpell = ({ name, element, power, manaCost }) =>
  `✨ ${name} (${element}) — Power: ${power}, Mana: ${manaCost}`;


// average power
const getAveragePower = arr =>
  arr.reduce((sum, { power }) => sum + power, 0) / arr.length;


// highest power spell
const getStrongestSpell = arr =>
  arr.reduce((max, spell) =>
    spell.power > max.power ? spell : max
  );


// summary generator
const createSummary = arr => {
  const total = arr.length;
  const avg = getAveragePower(arr);
  const strongest = getStrongestSpell(arr);

  return `
****** SPELL SUMMARY ******
Total Spells: ${total}
Average Power: ${avg.toFixed(2)}
Strongest Spell: ${strongest.name}
`;
};

// DESTRUCTURING EXAMPLES

// 1. object destructuring
const { name, element } = spells[0];
console.log(`First Spell: ${name} of ${element}`);

// 2. array destructuring
const [firstSpell, secondSpell] = spells;
console.log("First two spells:", firstSpell.name, secondSpell.name);

// 3. function parameter destructuring (inside formatSpell)

// DISPLAY SPELLBOOK

console.log("****** SPELLBOOK ******");

spells.forEach(spell => {
  console.log(formatSpell(spell));
});


// PRINT SUMMARY
console.log(createSummary(spells));