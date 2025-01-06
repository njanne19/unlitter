const axios = require('axios'); 
const cheerio = require('cheerio');
const env = require('dotenv').config();

async function extractTextFromUrl(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;

        // Now we have the raw HTML, we just want to extract body text. 
        const $ = cheerio.load(html);
        // Remove <script> and <style> elements
        $('script, style, noscript').remove();

        // Remove hidden elements
        $('[style*="display: none"], [style*="visibility: hidden"], [hidden]').remove();

        // Extract visible text from the <body>
        const bodyText = $('body')
            .text() // Get all text within the body
            .replace(/\s+/g, ' ') // Replace excessive whitespace
            .trim(); // Trim leading/trailing whitespace

        return bodyText;
    } catch (error) {
        console.error("Error fetching URL:", error);
        return null;
    }
}

async function checkIfTextIsAiGenerated(text) {
    const apiKey = process.env.SAPLING_API_KEY;

    try {
        const response = await axios.post(
            'https://api.sapling.ai/api/v1/aidetect',
            {
                key: apiKey,
                text: text
            }
        );
        const {status, data} = response; 
        //console.log("Response from Sapling API: ", status, data.score);
        return data.score;
    } catch (error) {
        console.error("Error checking if text is AI generated: ", error);
        return null;
    }
}



module.exports = { extractTextFromUrl, checkIfTextIsAiGenerated };