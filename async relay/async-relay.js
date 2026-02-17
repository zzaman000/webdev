// ASYNC RELAY

// RUNNER FACTORY
// returns async stage function

const createRunner = (runnerName, failChance = 0) => {

  return () => new Promise((resolve, reject) => {

    console.log(`${runnerName} starting...`);

    const time = Math.floor(Math.random() * 2000) + 1000;

    setTimeout(() => {

      if (Math.random() < failChance) {
        reject(`${runnerName} tripped and failed!`);
        return;
      }

      console.log(`${runnerName} finished in ${time}ms`);

      resolve({
        runnerName,
        timeMs: time,
        status: "completed"
      });

    }, time);
  });
};

// CREATE RUNNERS

const runner1 = createRunner("Runner 1");
const runner2 = createRunner("Runner 2");
const runner3 = createRunner("Runner 3", 0.35); // can fail
const runner4 = createRunner("Runner 4");

// RELAY EXECUTION (ASYNC/AWAIT)

const runRelay = async () => {

  console.log("=== RELAY START ===");

  let totalTime = 0;
  let completed = 0;

  try {

    const r1 = await runner1();
    totalTime += r1.timeMs;
    completed++;

    const r2 = await runner2();
    totalTime += r2.timeMs;
    completed++;

    const r3 = await runner3(); // may fail
    totalTime += r3.timeMs;
    completed++;

    const r4 = await runner4();
    totalTime += r4.timeMs;
    completed++;

    console.log("\nRelay finished successfully!");

    console.log("\n=== FINAL SUMMARY ===");
    console.log("Total Time:", totalTime, "ms");
    console.log("Completed Runners:", completed);
    console.log("Final Status: SUCCESS");

  } catch (err) {

    console.log("\nERROR:", err);

    console.log("\n=== FINAL SUMMARY ===");
    console.log("Total Time:", totalTime, "ms");
    console.log("Completed Runners:", completed);
    console.log("Final Status: FAILED");
  }
};

// START RELAY

runRelay();
