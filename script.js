document.addEventListener("DOMContentLoaded", function () {
    let loadingBar = document.getElementById("loadingBar");
    let dogImage = document.getElementById("dogImage");
    let dogContainer = document.getElementById("dogContainer");

    // Simulate loading progress
    function startLoading() {
        let progress = 0;
        loadingBar.style.width = "0%";
        let interval = setInterval(function () {
            if (progress < 100) {
                progress += 10;
                loadingBar.style.width = progress + "%";
            }
        }, 300);

        return interval;
    }

    // Image loaded callback
    window.imageLoaded = function () {
        clearInterval(loadingInterval);
        loadingBar.style.width = "100%";
        setTimeout(function () {
            dogContainer.style.display = "flex"; // Show the image
            document.querySelector(".loading-bar-container").style.display = "none"; // Hide the loading bar
        }, 500);
    };

    // Fetch a new dog image from the API
    function fetchDogImage() {
        return fetch('https://dog.ceo/api/breeds/image/random')
            .then(response => response.json())
            .then(data => data.message)
            .catch(error => {
                console.error('Error fetching dog image:', error);
                return ''; // Return an empty string if there's an error
            });
    }

    // Load a new dog image
    window.getNewDog = function () {
        dogContainer.style.display = "none"; // Hide the image
        document.querySelector(".loading-bar-container").style.display = "flex"; // Show the loading bar
        loadingInterval = startLoading(); // Start loading bar

        fetchDogImage().then(newImageUrl => {
            dogImage.src = newImageUrl; // Set the new dog image URL
        });
    };

    let loadingInterval = startLoading(); // Initial load
    getNewDog(); // Load a random dog image on page load
});
