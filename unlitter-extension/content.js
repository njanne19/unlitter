// Script is injected after the DOM is loaded, by default. 
console.log("Content script loaded");

// select search results on Google 
const searchResults = document.querySelectorAll(".tF2Cxc");


const resultsArray = Array.from(searchResults).map((result, index) => {
    const title = result.querySelector("h3")?.innerText || "No Title"; 
    const url = result.querySelector("a")?.href || "No Link"; 
    return { title: title, url: url, index: index };
});

// send the results to the background script
chrome.runtime.sendMessage({ type: "SEARCH_RESULTS", payload: resultsArray }, response => {
    console.log("Response from background script: ", response);

    // Once I get the resonse, I want to place the AI scores onto the page. 
    // The response will have an array 'results', which contains a 'status' and 'aiScore' for each result. 
    // The indices of the arrays correspond to the DOM objects ordered by the search results. 
    // I want to place the AI scores onto the page in the same order.  
    // For starters, let's add a new, bold red text element that says "AI Score: " and then the score.
    // to every div that has a class of "tF2Cxc"
    resultsArray.forEach((result, index) => {
        const div = searchResults[index];
        const aiScore = response.results[index].aiScore;
        const aiScoreElement = document.createElement("div");
        const formattedScore = (aiScore * 100).toFixed(2);

        if (formattedScore > 35) {
            aiScoreElement.textContent = `Probably AI generated (${formattedScore}%)`
            aiScoreElement.style.color = "red";
        } else {
            aiScoreElement.textContent = `Probably human (${formattedScore}%)`
            aiScoreElement.style.color = "green";
        }
        aiScoreElement.style.fontWeight = "bold";
        aiScoreElement.style.fontSize = "16px";
        div.appendChild(aiScoreElement);
    });

});

// // Change color of search result title (H3) and description (div)
// document.querySelectorAll(".LC20lb, .VwiC3b").forEach(element => {
//     element.style.color = "red";
// });