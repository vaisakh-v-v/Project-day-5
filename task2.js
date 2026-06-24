const inputbox = document.querySelector("#input-box");
const listcontainer = document.querySelector("#list-container");

function addTask(){
    let li = document.createElement("li");
    li.innerHTML=inputbox.value;
    listcontainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML="\u00d7";
    li.appendChild(span)
    inputbox.value="";
}
listcontainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.clasList.toggle("checked")
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
},false)








// todolist.addEventListener("click", (event) => {
//     const checkbox = event.target.closest(".t1");

// if(checkbox){
//     const listitem = checkbox.closest(".list1");
//     listitem.classList.toggle("completed", checkbox.checked);
//     return;
// }
//   const deleteBtn = event.target.closest('.dlt-btn');
//   if (deleteBtn) {
//     const listitem = deleteBtn.closest('.list1');
//     listItem.remove();
//     return; 
//   }
// })

