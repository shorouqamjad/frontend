const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static assets from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// API route to handle travel data (Geonames, Weatherbit, Pixabay)
app.post('/api/trip', async (req, res) => {
    const { location, date } = req.body;

    // Response for successful request handling
    res.json({ success: true, message: 'Data received successfully' });
});

// Handle root route and serve the main index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start the server and listen on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
