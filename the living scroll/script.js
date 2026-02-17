// DOM Selection
const input = document.getElementById("entryInput");
const addBtn = document.getElementById("addBtn");
const container = document.getElementById("scrollContainer");
const counter = document.getElementById("counter");
const message = document.getElementById("message");

// Helper Functions

// update counter
function updateCounter(){
    counter.textContent = `Total Entries: ${container.children.length}`;
}

// show empty message
function checkEmpty(){
    if(container.children.length === 0){
        message.textContent = "The scroll is empty.";
    } else {
        message.textContent = "";
    }
}

// Create Entry Function

function createEntry(text){

    const li = document.createElement("li");
    li.className = "entry";

    const span = document.createElement("span");
    span.textContent = text;

    // EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", () => {
        const newText = prompt("Edit your entry:", span.textContent);

        if(newText === null) return;

        if(newText.trim() === ""){
            alert("Entry cannot be blank.");
            return;
        }

        span.textContent = newText;
    });

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
        li.remove();
        updateCounter();
        checkEmpty();
    });

    li.append(span, editBtn, deleteBtn);
    container.appendChild(li);

    updateCounter();
    checkEmpty();
}

// Add Entry Event

addBtn.addEventListener("click", () => {

    const text = input.value.trim();

    if(text === ""){
        message.textContent = "Entry cannot be blank.";
        return;
    }

    createEntry(text);

    input.value = "";
    message.textContent = "";
});
