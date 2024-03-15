document.getElementById("loadDataBtn").addEventListener("click", function () {
  var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object

  xhr.open("GET", "data.json", true); // Specify the request type and URL

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Check if request is complete and successful
      var response = JSON.parse(xhr.responseText); // Parse JSON response
      displayData(response); // Call a function to display the data
    }
  };

  xhr.send(); // Send the request
});

function displayData(data) {
  var contentDiv = document.getElementById("content");
  contentDiv.innerHTML = ""; // Clear previous content

  // Create and append new HTML content
  for (var i = 0; i < data.length; i++) {
    var paragraph = document.createElement("p");
    paragraph.textContent = data[i].name + ": " + data[i].description;
    contentDiv.appendChild(paragraph);
  }
}
