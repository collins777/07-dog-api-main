// Get reference to the select element
const breedSelect = document.getElementById("breed-select");
// Get reference to the gallery where images will be displayed
const gallery = document.getElementById("gallery");

// Function to fetch dog breeds from the API
function fetchDogBreeds() {
  // Fetch the list of all dog breeds from the Dog API
  fetch("https://dog.ceo/api/breeds/list/all")
    .then((response) => {
      // Convert the response to JSON format
      return response.json();
    })
    .then((data) => {
      // Get the breeds object from the API response
      const breeds = data.message;

      // Loop through each breed and create option elements
      for (const breed in breeds) {
        // Create a new option element
        const option = document.createElement("option");

        // Set the value and text content of the option
        option.value = breed;
        option.textContent = breed;

        // Add the option to the select menu
        breedSelect.appendChild(option);
      }
    });
}

// Function to fetch and display 9 random dog images
function fetchDogImage(breed) {
  // Clear the gallery first
  gallery.innerHTML = "";

  // Show a loading message
  gallery.innerHTML = `<p>Loading ${breed} images...</p>`;

  // Fetch 9 random images for the selected breed
  fetch(`https://dog.ceo/api/breed/${breed}/images/random/9`)
    .then((response) => {
      // Convert the response to JSON format
      return response.json();
    })
    .then((data) => {
      // Get the array of image URLs from the API response
      const imageUrls = data.message;

      // Clear the loading message
      gallery.innerHTML = "";

      // Loop through each image URL and create image elements
      for (let i = 0; i < imageUrls.length; i++) {
        // Create an image element
        const img = document.createElement("img");
        img.src = imageUrls[i];
        img.alt = `A ${breed} dog`;

        // Add the image to the gallery
        gallery.appendChild(img);
      }
    });
}

// Add event listener to the select element
breedSelect.addEventListener("change", function () {
  // Get the selected breed value
  const selectedBreed = breedSelect.value;

  // Only fetch image if a breed is selected (not the default option)
  if (selectedBreed) {
    fetchDogImage(selectedBreed);
  } else {
    // Clear the gallery if no breed is selected
    gallery.innerHTML = "";
  }
});

// Call the function when the page loads
fetchDogBreeds();
