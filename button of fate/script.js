// DOM Selection
const meter = document.querySelector("#meter");
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");
const prophecy = document.querySelector("#prophecy");

let fate = 0;

// Helper Functions

// update number display
function updateMeter(){
    meter.textContent = fate;
}

// apply threshold rules
function checkFateState(){

    display.classList.remove("good","bad");

    if(fate >= 50){
        display.textContent = "Fate favors you.";
        display.classList.add("good");
    }
    else if(fate <= -50){
        display.textContent = "Darkness closes in.";
        display.classList.add("bad");
    }
}

// highlight clicked button
function highlightButton(btn){
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}

// Main Event Handler

buttons.forEach(button => {

    button.addEventListener("click", e => {

        const action = e.target.dataset.action;

        highlightButton(e.target);

        switch(action){

            case "blessing":
                fate += 10;
                display.textContent = "A blessing lifts your spirit.";
                break;

            case "curse":
                fate -= 10;
                display.textContent = "A curse drains your fortune.";
                break;

            case "reveal":
                prophecy.classList.toggle("hidden");
                display.textContent = "The prophecy shifts...";
                break;

            case "reset":
                fate = 0;
                prophecy.classList.add("hidden");
                display.textContent = "Fate resets to balance.";
                break;
        }

        updateMeter();
        checkFateState();
    });

});
