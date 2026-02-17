# Cave of Courage (Dragon Cave Logic Challenge)

## How to run
1. Install Node.js
2. Put `dragon-cave.js` in a folder
3. Open a terminal in that folder
4. Run: `node dragon-cave.js`

## How to play
- Enter your name, then face 10 cave encounters.
- Each encounter gives 3 choices: `talk`, `item`, or `run`.
- Dice rolls (1–6) + your stats determine success or failure.
- Your HUD prints after each encounter showing Bravery, Charisma, and Inventory.

## Player stats + items
- **Bravery**: your resolve; increases on success, decreases on failure.
- **Charisma**: your ability to persuade; increases on success, decreases on failure.
- **Inventory**: items you can use during encounters.
  - `bread`: +1 Bravery, +1 Charisma
  - `feather charm`: adds a shield that prevents the next Bravery loss
  - `silver tear`: +2 Charisma

## Endings (final choice)
At the dragon’s nest you choose:
1. **Grab** the princess and run (best if your stats + roll are high)
2. **Bargain** with the dragon (peaceful win if persuasive)
3. **Leave** the princess (bad ending)
4. **Weapon**: if you took the weapon, you can win but at a moral cost (gray ending)

## Bonus features included
- Dice roll mechanic (`Math.random`)
- Inventory with item effects
- 10 encounters
- HUD display after encounters
- Replay loop (play again without restarting the script)
