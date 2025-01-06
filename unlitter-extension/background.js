chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == "SEARCH_RESULTS") {
        //console.log("Received search results: ", message.payload);

        // Return true to indicate we'll send response asynchronously
        (async () => {
            try {
                // Send the results to the server and wait for all requests to complete
                const results = await Promise.all(message.payload.map(async result => {
                    const response = await fetch("http://localhost:3000/api", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(result)
                    });
                    const data = await response.json();
                    console.log("Server response for ", result.title, ": ", data);
                    return data;
                }));
                
                sendResponse({ status: "success", results: results });
            } catch (error) {
                console.error("Error sending results to server: ", error);
                sendResponse({ status: "error", error: error.message });
            }
        })();
        return true;
    }
});
