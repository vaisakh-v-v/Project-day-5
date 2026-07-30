export async function fetchJson(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Error while fetching");
    }
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw new Error(error);
  }
}

export function debounce(fn, time = 300) {
  setTimeout(() => {
    fn();
  }, time);
}

export function showToast(message, duration) {
  const showToastElement = document.createElement("div");
  showToastElement.classList.add("showToast");
  const toastContainerElement = document.createElement("div");
  toastContainerElement.classList.add("toastContainer");
  const imageElement = document.createElement("img");
  imageElement.src =
    "https://img.icons8.com/?size=100&id=43736&format=png&color=000000";
  const messageElement = document.createElement("span");
  messageElement.textContent = message;
  const progressBarElement = document.createElement("div");
  progressBarElement.classList.add("progressBar");
  toastContainerElement.appendChild(imageElement);
  toastContainerElement.appendChild(messageElement);
  showToastElement.appendChild(toastContainerElement);
  showToastElement.appendChild(progressBarElement);
  const styleElement = document.createElement("style");
  styleElement.textContent = `  .showToast {
        box-sizing: border-box;
        position: absolute;
        top: 30px;
        right: 30px;
        width: 200px;
        border: solid;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        transform: translateX(120%);
        animation:
          slideIn 0.3s ease-in forwards,
          slideOut 0.5s ease-out forwards ${duration}s;
      }
      .toastContainer {
        display: flex;
        align-items: center;
        gap:4px;
      }
      .progressBar {
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0%;
        border: solid red;
        animation: progress ${duration}s ease-in ;
      }
      .showToast img {
        height: 30px;
      }
      @keyframes slideIn {
        0% {
          transform: translateX(120%);
        }
        100% {
          transform: translateX(0%);
        }
      }
      @keyframes slideOut {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes progress {
        0% {
          width: 100%;
        }
        100% {
          width: 0%;
        }
      }`;
  const head = document.head;
  head.appendChild(styleElement);
  document.body.prepend(showToastElement);
}