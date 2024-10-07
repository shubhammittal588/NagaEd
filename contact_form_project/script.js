
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh on form submission

    // Get form input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validate inputs
    if (name && email && message) {
        // Log data to the console
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);

        // Display success message
        document.getElementById("successMessage").classList.remove("hidden");
        
        // Clear form fields
        document.getElementById("contactForm").reset();
    } else {
        alert("Please fill in all fields.");
    }
});
