// Promise Harbor Simulation

// DOCK SHIP FUNCTION
const dockShip = shipName => {

  return new Promise((resolve, reject) => {

    const delay = Math.floor(Math.random() * 2000) + 1000;

    setTimeout(() => {

      // reject if blank
      if (!shipName || shipName.trim() === "") {
        reject("Ship name missing. Docking denied.");
        return;
      }

      // random failure chance
      const failure = Math.random() < 0.3;

      if (failure) {
        reject(`Storm blocked ${shipName}'s arrival.`);
      } else {
        resolve(`${shipName} has arrived at harbor.`);
      }

    }, delay);
  });
};

// RUN SHIP PROCESS
const processShip = name => {

  dockShip(name)

    // THEN #1 → format message
    .then(msg => {
      console.log(msg);
      return msg.toUpperCase();
    })

    // THEN #2 → transform data
    .then(msg => {
      return `[LOG ENTRY] ${msg}`;
    })

    // THEN #3 → final processing
    .then(finalMsg => {
      console.log(finalMsg);
    })

    // ERROR HANDLING
    .catch(err => {
      console.log("ERROR:", err);
    })

    // FINALLY BLOCK
    .finally(() => {
      console.log("Docking attempt complete.\n");
    });
};

// SIMULATION FOR 3 SHIPS
console.log("*** PROMISE HARBOR ***\n");

processShip("SS Aurora");
processShip("Sea Streak");
processShip(""); // triggers blank name rejection
