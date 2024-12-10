// Add a listener for the test button
document.addEventListener("DOMContentLoaded", () => {
    const testButton = document.getElementById("testButton");
    const status = document.getElementById("status");

    testButton.addEventListener("click", () => {
        status.textContent = "Test clicked! Your extension is working.";
        console.log("Test button clicked!");
    });
});
