import home from "./routes/home.js";
import Login from "./routes/login.js";
import { store } from "./js/store.js";
import { renderTask } from "../src/components/render.js";

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  if (button.dataset.action === "delete-task") {
    const id = button.closest("[data-id]").dataset.id;
  
    store.dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }
  if (button.dataset.action === "append-task") {
    const togle = document.querySelector(".center");
    togle.classList.toggle("visible");
  }
  if (button.dataset.action === "exit") {
    const togle = document.querySelector(".center");
    togle.classList.toggle("visible");
  }
  if (button.dataset.action === "create-task") {
    const task = {
      title: document.querySelector("#task-name").value,
      assigned: document.querySelector("#Assignee").value,
      due: document.querySelector("#Priority").value,
      priority: document.querySelector("#difficulty").value,
      complete: false,
    };
    store.dispatch({
      type: "ADD_TASK",
      payload: task,
    });
  }
  if (button.dataset.action === "finished") {
    const id = button.closest("[data-id]").dataset.id;
   
    store.dispatch({
        type : "COMPLETE_TASK",
        payload: id,
    });
    
  }
});

const routes = {
  "/": home,
  login: Login,
  404: () => "<h1>404 Page Not Found </h1>",
};

const app = document.getElementById("app");

const render = (state) => {
  const viewFunction = routes[state.route.path] || routes["404"];
  app.innerHTML = viewFunction();
  if (state.route.path === "/") {
    renderTask();
  }
};
const syncRouterWithHash = () => {
  const path = location.hash.slice(1) || "/";
  store.dispatch({
    type: "ROUTE_CHANGED",
    payload: { path, params: {} },
  });
};
store.subscribe(render);

window.addEventListener("load", syncRouterWithHash);
window.addEventListener("hashchange", syncRouterWithHash);
