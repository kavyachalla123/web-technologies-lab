// Import http module
const http = require('http');

// Create server
const server = http.createServer((req, res) => {

    // Log request details
    console.log("Request received for:", req.url);

    // Set response header
    res.setHeader('Content-Type', 'text/html');

    // Handle different routes
    if (req.url === '/') {
        res.write("<h1>Welcome to Node.js Server</h1>");
        res.write("<p>This is the Home Page</p>");
    } 
    else if (req.url === '/about') {
        res.write("<h1>About Page</h1>");
        res.write("<p>This is a simple Node.js web server.</p>");
    } 
    else {
        res.write("<h1>404 Not Found</h1>");
    }

    // End response
    res.end();
});

// Define port
const PORT = 3000;

// Start server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});