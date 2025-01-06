# Unlitter - Say hello to a cleaner internet and a more human web. 
 
![Unlitter](./unlitter-extension/icon.png)

## What is Unlitter? 

Unlitter is a prototypeChrome extension that helps you identify AI-generated content on the web. It is powered by a backend server that uses the Sapling API to check if a page is AI-generated.

**Note:** This is a prototype, which means it will be inaccurate at times, and surely is not the cleanest, safest, or most efficient code. This app is not ready for production. 

## How does it work? 

The extension injects a script into the page you are on. This script sends the search results to the backend server, which then checks if each result is AI-generated. The server then sends the results back to the extension, which then displays the AI scores on the page. 

## How do I use it? 

1. Clone the repository
2. Run `yarn install` to install the dependencies in the `unlitter-server` directory
3. Add your Sapling API key to a .env file in the `unlitter-server` directory
4. Run `yarn dev` to start the development server in the `unlitter-server` directory
5. Load the extension (`unlitter-extension`) into Chrome by navigating to chrome://extensions/ and clicking "Load unpacked."
6. Navigate to a Google search results page and enjoy! 