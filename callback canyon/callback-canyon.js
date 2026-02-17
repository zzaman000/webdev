// 
// CALLBACK CANYON
// 

// HIGHER ORDER FUNCTION
// returns a new logger function

const createStepLogger = prefix => {
  return (step, status, score) => {
    console.log(`${prefix} Step: ${step} | Status: ${status} | Score: ${score}`);
  };
};

// CALLBACKS

// logger callback
const loggerCallback = (step, status, score) => {
  console.log(`LOG → ${step} (${status}) Score:${score}`);
};


// score tracker callback
let totalScore = 0;

const scoreTracker = (step, status, scoreChange) => {
  totalScore += scoreChange;
};


// danger detector callback
const dangerDetector = (step, status) => {
  if (status === "danger") {
    console.log(`Danger detected at ${step}!`);
  }
};

// MAIN fucntion

const traverseCanyon = actionCallback => {

  const steps = [
    { name:"Entrance", status:"safe", points:10 },
    { name:"Rock Slide", status:"danger", points:-15 },
    { name:"Narrow Path", status:"safe", points:20 },
    { name:"Hidden Bridge", status:"safe", points:30 },
    { name:"Final Gate", status:"danger", points:-10 }
  ];

  console.log("=== Traversing Canyon ===");

  steps.forEach(step => {
    actionCallback(step.name, step.status, step.points);
  });

  // final result
  const result = totalScore > 0 ? "SUCCESS" : "FAIL";

  console.log("\nFinal Score:", totalScore);
  console.log("Result:", result);
};

// RUN SIMULATION

// higher-order generated logger
const prefixedLogger = createStepLogger("[CANYON]");

// combine multiple callbacks
const combinedCallback = (step, status, score) => {
  loggerCallback(step, status, score);
  scoreTracker(step, status, score);
  dangerDetector(step, status);
  prefixedLogger(step, status, totalScore);
};

// run
traverseCanyon(combinedCallback);
