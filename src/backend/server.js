import { OpenAI } from "openai";
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { Snowflake } from 'node-snowflake';  // Import Snowflake from node-snowflake
import { lowCreativityMessage, mediumCreativityMessage, highCreativityMessage, guidelines } from './prompt.js';

dotenv.config();  // Load environment variables from the .env file

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Set the OpenAI API key from the environment variable
});

const app = express();
const port = 3000;

app.use(bodyParser.json());  // Middleware to parse JSON request bodies
app.use(express.static('public'));  // Serve static files from the 'public' directory

// Create a Map to store conversation history by sessionId
const conversationHistory = new Map();

/**
 * Get the system message based on the user's creativity level.
 * 
 * @param {string} creativityLevel - The user's creativity level ('low', 'medium', 'high').
 * @returns {string} - The corresponding system message for the creativity level.
 */
function getSystemMessageForCreativityLevel(creativityLevel) {
    switch (creativityLevel) {
        case 'low':
            return `${lowCreativityMessage}${guidelines}`;
        case 'medium':
            return `${mediumCreativityMessage}${guidelines}`;
        case 'high':
            return `${highCreativityMessage}${guidelines}`;
        default:
            return `${mediumCreativityMessage}${guidelines}`;  // Default to medium creativity if no valid level is provided
    }
}

/**
 * Get the temperature (randomness level) for the AI response based on creativity level.
 * 
 * @param {string} creativityLevel - The user's creativity level ('low', 'medium', 'high').
 * @returns {number} - The temperature value for the creativity level.
 */
function getTemperatureForCreativityLevel(creativityLevel) {
    switch (creativityLevel) {
        case 'low':
            return 0.5;  // Low creativity uses a lower temperature for more deterministic responses
        case 'medium':
            return 0.7;  // Medium creativity uses a moderate temperature
        case 'high':
            return 1.0;  // High creativity uses a higher temperature for more creative and varied responses
        default:
            return 0.7;  // Default to medium temperature if no valid level is provided
    }
}

/**
 * POST /api/conversations
 * Handles a conversation request, generates AI responses, and returns the updated conversation.
 */
app.post('/api/conversations', async (req, res) => {
    const userInput = req.body.message;  // User's input message
    const creativityLevel = req.body.creativityLevel || 'medium';  // Get creativity level from request, default to medium
    let sessionId = req.body.sessionId;  // Get sessionId from request (if provided)
    const temperature = getTemperatureForCreativityLevel(creativityLevel);  // Set temperature based on creativity level

    // Validate input: userInput must be a string
    if (typeof userInput !== 'string') {
        return res.status(400).json({ error: 'Invalid input type. Expected a string.' });
    }

    // If no sessionId is provided by the client, generate a new one using Snowflake
    if (!sessionId) {
        sessionId = Snowflake.nextId();  // Generate a unique sessionId using Snowflake
    }

    // Initialize conversation history if it's the first message in the session
    if (!conversationHistory.has(sessionId)) {
        conversationHistory.set(sessionId, [
            {
                role: "system",
                content: getSystemMessageForCreativityLevel(creativityLevel),  // Add a system message based on creativity level
            }
        ]);
    }

    let conversation = conversationHistory.get(sessionId);  // Retrieve the conversation history for the session

    // Add the user's input to the conversation history
    conversation.push({
        role: "user",
        content: userInput,
    });

    try {
        // Send the conversation to the OpenAI API and get the assistant's reply
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",  // Specify the AI model
            messages: conversation,  // Send the conversation history
            temperature: temperature,  // Use the temperature based on the creativity level
        });

        const assistantReply = response.choices[0].message.content;  // Extract the assistant's reply

        // Add the assistant's reply to the conversation history
        conversation.push({
            role: "assistant",
            content: assistantReply,
        });

        // Update the conversation history with the latest messages
        conversationHistory.set(sessionId, conversation);

        console.log("Session ID:", sessionId);  // Log the session ID
        console.log("Creativity Level:", creativityLevel);  // Log the creativity level
        console.log("Temperature:", temperature);  // Log the temperature used
        console.log("Assistant:", assistantReply);  // Log the assistant's response
        console.log("Response:", response);  // Log the full API response

        // Send the assistant's reply and the sessionId back to the client
        res.json({ reply: assistantReply, sessionId: sessionId });

    } catch (error) {
        // Handle errors during the OpenAI interaction
        console.error("Error during interaction:", error.message);
        res.status(500).json({ error: 'Internal Server Error' });  // Return an error response to the client
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});