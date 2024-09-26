const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use body-parser middleware to parse incoming requests
app.use(bodyParser.json());

// Your verify token
const VERIFY_TOKEN = 'my_secret_token';

// Webhook endpoint for verification
app.get('/webhook', (req, res) => {
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Check if a token and mode are in the query string of the request
    if (mode && token) {
        // Verify that the mode and token sent are correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Respond with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

// Endpoint to handle incoming webhook events
app.post('/webhook', (req, res) => {
    // Handle your webhook data here
    console.log('Webhook data:', req.body);
    res.sendStatus(200);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});