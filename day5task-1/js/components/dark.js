export function darkModeToggle(toggleElement) {
  const bodyElement = document.getElementsByTagName("html")[0];
  toggleElement.addEventListener("click", function (event) {
    if (this.ariaPressed === "true") {
      this.ariaPressed = "false";
      bodyElement.setAttribute("data-theme", "light");
      localStorage.setItem("data-theme", "light");
    } else {
      this.ariaPressed = "true";
      bodyElement.setAttribute("data-theme", "dark");
      localStorage.setItem("data-theme", "dark");
    }
  });
  window.onload = (event) => {
    let theme = localStorage.getItem("data-theme");
    if (theme === null) {
      const systemSettingDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );
      if (systemSettingDark.matches) {
        theme = "dark";
        localStorage.setItem("data-theme", "dark");
        bodyElement.setAttribute("data-theme", "dark");
      }
    } else {
      if (theme === "dark") {
        bodyElement.setAttribute("data-theme", "dark");
      }
    }
    if (theme === "dark") {
      toggleElement.ariaPressed = "true";
    }
  };
}