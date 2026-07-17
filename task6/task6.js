// Create manifest.json: name, short_name, description, start_url, display: standalone,​
// ​theme_color, background_color, and icons (192px and 512px)​
// ​498.​ ​Link the manifest in all HTML pages: <link rel='manifest'>​
// ​ 99.​
// 4
// ​500.​
// ​Add beforeinstallprompt listener - show a custom 'Install App' button when appropriate​
// ​Verify in DevTools Application > Manifest - all required fields present and valid

let installPrompt = null;
const installButton = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    console.log(event);
    installPrompt = event;
    installButton.removeAttribute("hidden");
});
installButton.addEventListener("click", async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    installPrompt = null;
    installButton.setAttribute("hidden", "");
});