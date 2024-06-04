console.log("Hello, World!");

//fetch the data from the API
//this is a asynchronous function which means it will runs in the background
async function getFoxes(params) {
  //we are using fetch to get the data from the API, with await we are waiting for the data to be fetched
  const response = await fetch("https://randomfox.ca/floof/");
  console.log(response);

  //we are converting/translate(parse) the response to json format
  const data = await response.json();
  console.log(data);

  //filter the data (data wrangling) with dot notation
  const wrangledData = data.image;
  console.log(wrangledData);

  //I want to use this data outside this function so I will return it
  return wrangledData;
}

//create an element to contain my foxes image
function foxContainer(foxImg) {
  const foxImageElement = document.createElement("img");
  foxImageElement.src = foxImg;
  console.log(foxImageElement.src);
  foxImageElement.alt = "fox image";
  document.body.appendChild(foxImageElement);
}

//display the foxes image on the webpage
async function displayFoxes() {
  //getFoxes contains my foxes images
  const myWrangledFoxes = await getFoxes();
  foxContainer(myWrangledFoxes);
}

displayFoxes();

// by using the .then() method on the object returned by fetch. This is a special type of object called a "promise", and it's how async/await works under the hood. We'll use async/await in most cases, but it's useful to recognise what this is if you see it. We'll look at how we can make and break promises next week.
fetch("https://randomfox.ca/floof/")
  .then(function (response) {
    console.log("HTTP Response:", response);
    return response.json();
  })
  .then(function (json) {
    console.log("JSON Data:", json);
  });

//   https://api.github.com/repos/d-g-Szabo/Fetch-Requesting-data-from-APIs
// Make a fetch request to the Github API for one of your public repositories. Log the response to the console. What properties does the response have?
// From the JSON object returned, access the stargazers_count and update your page to display the value by creating a DOM element and setting it's content to that value.
async function gitHubFetch(params) {
  const response = await fetch(
    "https://api.github.com/repos/d-g-Szabo/Fetch-Requesting-data-from-APIs"
  );
  const data = await response.json();
  console.log(data);

  const starGazers = data.stargazers_count;
  return starGazers;
}

function addElementToBody(params) {
  const element = document.createElement("h1");
  element.textContent = "Star Gazers: " + params;
  document.body.appendChild(element);

  const starGazersMoreText = document.createElement("p");
  starGazersMoreText.textContent =
    "You will only see here the number of people who starred this repo which is only one, me! If you want to see it increasing, please go to the repo on GitHub and give it a star! Thank you!";
  document.body.appendChild(starGazersMoreText);

  const link = document.createElement("a");
  link.href = "https://github.com/d-g-Szabo/Fetch-Requesting-data-from-APIs";
  link.textContent = "Link to the repo";
  document.body.appendChild(link);
}

displayStarGazers();

async function displayStarGazers() {
  const starGazers = await gitHubFetch();
  addElementToBody(starGazers);
}
