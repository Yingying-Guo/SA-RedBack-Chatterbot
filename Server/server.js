// server.js
const PORT = 3001;
import express, { json, urlencoded } from 'express';
import cors from 'cors';
const app = express();


// middleware
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors(
    // {origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001']}
));

// connect to database
import connectDB from '../Database/connection/db.connection.js';
connectDB();

// routes
import DBRoute from "../Database/routes/db.route.js";
app.use("/api/products", DBRoute);

// OpenAI API
import { getCompletion } from '../OpenAI/openai.js';

/**
 * POST /completion
 * Handles a conversation request, generates AI responses, and returns the updated conversation.
 */
app.post('/completion', async (req, res) => {
    const userInput = req.body.message;  // User's input message
    const creativityLevel = req.body.creativityLevel || 'medium';  // Get creativity level from request, default to medium
    let sessionId = req.body.sessionId;  // Get sessionId from request (if provided)

    try {
        // Send the conversation to the OpenAI API and get the assistant's reply
        const response = await getCompletion(userInput, creativityLevel, sessionId); // Pass sessionId to the getCompletion function

        const assistantReply = response.get('reply');  // Extract the assistant's reply

        sessionId = response.get('sessionId');  // Get the updated sessionId from the response

        // Send the assistant's reply and the sessionId back to the client
        res.json({ reply: assistantReply, sessionId: sessionId });

    } catch (error) {
        // Handle errors during the OpenAI interaction
        console.error("Error during interaction:", error.message);
        if (error.message === 'Invalid input type. Expected a string.') {
            return res.status(400).json({ error: 'Invalid input type. Expected a string.' });
        } else {
            // Return an error response to the client
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));