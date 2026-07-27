function display(){
    const form = document.querySelector(".center");
    form.classList.toggle("visible");
}

const close = document.getElementById("clsoe");
close.addEventListener("click", () => {
    const form = document.querySelector(".center");
    form.classList.toggle("visible");
});


    const addToList = document.getElementById("addto-list");
    const count = 0;
    addToList.addEventListener("click", () => {
    const card = document.querySelector(".problem");
    const tempCard = card.cloneNode(true);

    const task = document.getElementById("task-name").value;
    const level = document.getElementById("difficulty").value;
    const assignee = document.getElementById("Assignee").value;
    const Priority = document.getElementById("Priority").value;

    tempCard.querySelector(".problem-stat p").textContent = task;
    tempCard.querySelector(".problem-stat button").textContent = level;
    tempCard.querySelector(".due span").textContent = Priority;
    tempCard.querySelector(".to span").textContent = assignee;
    
    const apnd = document.querySelector(".tasks");
    apnd.appendChild(tempCard);

    const resetall = document.querySelector(".task-details")
    resetall.querySelectorAll("input").forEach(input => {
    input.value = "";
});

}); 
        








