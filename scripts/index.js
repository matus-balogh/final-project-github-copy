// The line of code below is for me to check that I linked JS file correctly to my HTML file
// The message would appear in the Console in Dev Tools in the browser

console.log("okay, we're in");

// -----------------------------------------------------------------------------

// The code below is to manipulate the background colour of the body so we can switch between light and dark theme

// Element

const makeDark = document.getElementById("dark-button");
const makeLight = document.getElementById("light-button");

// Event

makeDark.addEventListener("click", turnDark);
makeLight.addEventListener("click", turnLight);

// Execution

function turnDark() {
  document.body.classList.add("dark-theme");
}

function turnLight() {
  document.body.classList.remove("dark-theme");
}

// -----------------------------------------------------------------------------

// Code to fetch the Guardian API

// When you click the "GetLatestHeadline" button, fetch the latest headline from the Guardian API
// When the headline loads, a Read More link appears underneath it. taking you to the source article on the Guardian website to learn more
// The below hopefully gives me clear, repeatable, step by step method for calling APIs, catching errors, filering results and displaying them on my website

// Constants

const apiKey = "3de54b58-84ac-4405-a006-649614850382";
// Note that my API key is attached to the end of the API URL I was given by The Guardian, the line above is for reference only

// Code

const getLastestGuardianArticleButton =
  document.querySelector(".GetLatestHeadline");

const LatestGuardianHeadline = document.querySelector(".HeadlineFromGuardian");
const LatestGuardianHeadlineUrl = document.querySelector(".ReadMore");

const loadHeadline = async () => {
  try {
    const response = await fetch(
      "https://content.guardianapis.com/search?api-key=3de54b58-84ac-4405-a006-649614850382"
    );
    const data = await response.json();
    console.log(data); // This console logs the entire API output
    console.log(data.response.results[0].webTitle); // console logs the headline

    console.log(data.response.results[0].webUrl); //  console logs the URL of the headline

    LatestGuardianHeadline.innerText = data.response.results[0].webTitle; // This is how you inject the filtered API output from above to your HTML element, in this case a h2 with the class LatestGuardianHeadline
    // LatestGuardianHeadlineUrl.innerText = data.response.results[0].webUrl;

    LatestGuardianHeadlineUrl.classList.add("show");

    LatestGuardianHeadlineUrl.setAttribute(
      "href",
      data.response.results[0].webUrl
    );

    // The above sets the href URL of the link underneath the headline as the URL of the article I fetched from the API
  } catch (error) {
    LatestGuardianHeadline.innerText = "An error happened 😭"; //Display error to a user when loading of the API content fails
    console.error("Something is not working", error);
  }
};

// window.addEventListener('DOMContentLoaded', loadHeadline); // I needed to replace this so that the API is called only when I hit the 'Get latest headline' button, as per below
getLastestGuardianArticleButton.addEventListener("click", loadHeadline);
