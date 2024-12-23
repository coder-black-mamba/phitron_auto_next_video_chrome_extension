console.log("Phitron Easy: Watching for React-rendered content...");

function setupVideoEventListener() {
    const video = document.querySelector("video"); // Adjust selector if needed
    if (video && !video.hasAttribute("phitron-listener")) {
        console.log("Phitron Easy: Video element found. Adding event listener...");
        
        video.addEventListener("ended", () => {
            console.log("Phitron Easy: Video ended! Attempting to click the Next button...");
            const wasFullScreen = !!document.fullscreenElement; // Check if fullscreen mode is active

            const nextButton = document.querySelector("button[aria-label='next']");
            if (nextButton) {
                nextButton.click();
                console.log("Next button clicked!");

                // Wait for the next video to load
                const observer = new MutationObserver(() => {
                    const newVideo = document.querySelector("video");
                    if (newVideo && newVideo !== video) {
                        observer.disconnect(); // Stop observing

                        // Reapply full-screen mode if it was active before
                        if (wasFullScreen) {
                            newVideo.addEventListener("play", () => {
                                newVideo.requestFullscreen().catch(err => {
                                    console.warn("Failed to enter full-screen mode:", err);
                                });
                            }, { once: true }); // Add listener for the first play event
                        }
                    }
                });

                observer.observe(document.body, { childList: true, subtree: true });
            } else {
                console.warn("Next button not found!");
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
