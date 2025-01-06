const express = require("express");
const cors = require("cors");
const tools = require("./tools");
const app = express(); 
const PORT = 3000;

// Middleware 
app.use(cors());
app.use(express.json());

// Routes
app.get("/api", (req, res) => {
    res.send("Hello from express server"); 
});

app.post("/api", async (req, res) => {
    console.log("Request url: ", req.body.url);

    // we have the url, and we want to do a few things with it.
    // 1. Fetch the page
    // 2. Extract the text (and clean any html tags)
    // 3. send the extracted text to another api to check if it is AI generated
    // 4. return the result
    try {
        const cleanedText = await tools.extractTextFromUrl(req.body.url);
        // console.log("Cleaned text for ", req.body.url, " contains ", cleanedText.length, " characters"); 
        const aiScore = await tools.checkIfTextIsAiGenerated(cleanedText);

        res.send({
            status: "success", 
            aiScore: aiScore
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).send({
            status: "error", 
            message: error.message
        });
    }
});


app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});