document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get username and password from the form
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Example API endpoint for authentication
    var apiUrl = "http://localhost:8080/api/login/" + encodeURIComponent(username) + "/" + encodeURIComponent(password);

    // Send a GET request to the API endpoint
    fetch(apiUrl)
    .then(response => {
        if (response.ok) {
            // If response is successful (status code 200), redirect to next page
            window.location.href = "home.html";
        } else {
            // If response is not successful, display error message
            document.getElementById("message").innerText = "Login failed. Please check your username and password.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("message").innerText = "An error occurred while processing your request. Please try again later.";
    });
});
