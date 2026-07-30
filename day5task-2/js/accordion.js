const acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      this.setAttribute("aria-expanded", "false");
      sessionStorage.setItem("aria-expanded", false);
    } else {
      panel.style.display = "block";
      sessionStorage.setItem("aria-expanded", true);

      this.setAttribute("aria-expanded", "true");
    }
  });
}
const val = sessionStorage.getItem("aria-expanded");
console.log(val);
const blk = document.getElementById("rand");
if (val === "true") {
  blk.style.display = "block";
}

const headers = Array.from(document.querySelectorAll(".accordion"));
headers.forEach((header, index) => {
  header.addEventListener("keydown", (event) => {
    let newIndex = index;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        newIndex = (index + 1) % headers.length;
        headers[newIndex].focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        newIndex = (index - 1 + headers.length) % headers.length;
        headers[newIndex].focus();
        break;

      case "Home":
        event.preventDefault();
        headers[0].focus();
        break;

      case "End":
        event.preventDefault();
        headers[headers.length - 1].focus();
        break;
    }
  });
});
