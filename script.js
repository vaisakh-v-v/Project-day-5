const btn = document.getElementById("toggle-btn");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  btn.textContent = "Switch to Light Mode";
}

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  let theme = "light";
  if (document.body.classList.contains("dark-mode")) {
    theme = "dark";
    btn.textContent = "Switch to Light Mode";
  } else {
    btn.textContent = "Switch to Dark Mode";
  }
    localStorage.setItem("theme", theme);
});


  const button = document.getElementById('menu-button');
  const menu = document.querySelector('.nav-list');


  button.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
