import { store } from "../js/store.js";
import taskCard from "./task.js";

export function renderTask(){
    const task = store.getState().tasks;

    const container = document.querySelector(".tasks");
    container.innerHTML = "";

    task.forEach(task =>{
        container.insertAdjacentHTML(
            "beforeend",
            taskCard(task)
        )
    });
}