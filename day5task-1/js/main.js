import { darkModeToggle } from "./components/darkMode.js";

window.onload = (event) => {
  let toggleElement = document.querySelector("#checkbox");
  darkModeToggle(toggleElement)
};