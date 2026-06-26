const observerOptions = {
  root: null,
  rootMargin: "0px",
  scrollMargin: "0px",
  threshold: 1.0,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("heading-visible");
    } else {
      entry.target.classList.remove("heading-visible");
    }
  });
};
const headingObserver = new IntersectionObserver(
  observerCallback,
  observerOptions,
);
const headings = document.querySelectorAll(
  "h1, h2, h3, p",
);

headings.forEach((heading) => {
  headingObserver.observe(heading);
});


function updateProgressBar(){
    const {scrollTop, scrollHeight}=document.documentElement;
    const scrollpercent = (scrollTop/(scrollHeight - window.innerHeight)) * 100 + '%';
    document.querySelector("#progress-bar").style.setProperty("--progress",scrollpercent);
}

document.addEventListener("scroll", updateProgressBar);




let mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}