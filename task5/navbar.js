export const init = () => {
    const navBtn = document.querySelector(".hamburger");
    const navContainer = document.querySelector(".nav-mobile .nav-container");
    let isOpen = false;
    navBtn.addEventListener("click", () => {
        if(!isOpen){
            navContainer.classList.add("open");
            navContainer.setAttribute("aria-expanded", "true");
            isOpen = !isOpen;
        }
        else {
      navContainer.classList.remove("open");
      navContainer.setAttribute("aria-expanded", "false");
      isOpen = !isOpen;
    }
  });

  const focusableElementSet1 = navContainer.querySelectorAll("a[href]");

  const focusableElementSet2 = navContainer.querySelectorAll("button");

  const focusableElement = [
    navBtn,
    ...focusableElementSet1,
    ...focusableElementSet2,
  ];

  let i = 0;
  const length = focusableElement.length;
  const firstElement = focusableElement[0];
  const lastElement = focusableElement[focusableElement.length - 1];

  window.addEventListener("keydown", (event) => {
    if (isOpen) {
      event.preventDefault();
    }

    if (event.shiftKey && event.key === "Tab") {
      if (!focusableElement.includes(document.activeElement)) {
        lastElement.focus();
        i = length - 1;
        return;
      }
      i = (((i - 1) % length) + length) % length;
      focusableElement[i].focus();
      return;
    }
    if (event.key === "Tab") {
      if (!focusableElement.includes(document.activeElement)) {
        firstElement.focus();
        i = 0;
        return;
      }
      i = (((i + 1) % length) + length) % length;
      focusableElement[i].focus();
    }
  });
};