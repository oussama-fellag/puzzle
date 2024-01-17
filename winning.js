document.addEventListener("DOMContentLoaded", function () {
    const stepsContainer = document.getElementById("steps");

    // Retrieve steps from localStorage
    const steps = JSON.parse(localStorage.getItem('steps'));

    if (steps) {
        // Display the steps on the web page
        stepsContainer.innerHTML = "<strong>Steps to Win:</strong> " + steps.join(" -> ");
    } else {
        stepsContainer.innerHTML = "No steps found.";
    }
});
