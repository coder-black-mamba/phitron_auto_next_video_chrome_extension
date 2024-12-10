console.log("Phitron Easy: Watching for React-rendered content...");

function setupVideoEventListener() {
    const video = document.querySelector("video"); // Adjust selector if needed
    if (video && !video.hasAttribute("phitron-listener")) {
        console.log("Phitron Easy: Video element found. Adding event listener...");
        video.addEventListener("ended", () => {
            console.log("Phitron Easy: Video ended! Attempting to click the Next button...");
            const buttons = document.querySelectorAll("button"); // Adjust selector if needed
            
            const nextButton=buttons[29];
            console.log(buttons);
            console.log(nextButton);

            if (nextButton) {
                nextButton.click();
                console.log("Phitron Easy: Next button clicked!");
            } else {
                console.warn("Phitron Easy: Next button not found!");
            }
        });
        video.setAttribute("phitron-listener", "true"); // Prevent multiple listeners
    } else if (!video) {
        console.log("Phitron Easy: No video element found yet.");
    }
}

// Use MutationObserver to monitor DOM changes
const observer = new MutationObserver(() => {
    setupVideoEventListener();
});

// Start observing the body for changes
observer.observe(document.body, { childList: true, subtree: true });

console.log("Phitron Easy: MutationObserver initialized.");
