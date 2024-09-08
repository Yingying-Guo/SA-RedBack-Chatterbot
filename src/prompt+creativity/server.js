// import { OpenAI } from "openai";
// import dotenv from 'dotenv';
// import express from 'express';
// import bodyParser from 'body-parser';

// dotenv.config();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(express.static('public')); 

// let conversation = [
//   {
//     role: "system",
//     content: "You are a personal assistant. Answer the user's questions and generate four What-If questions.",
//   }
// ];

// app.post('/api/conversations', async (req, res) => {
//     const userInput = req.body.message;

//     if (typeof userInput !== 'string') {
//         return res.status(400).json({ error: 'Invalid input type. Expected a string.' });
//     }

//     conversation.push({
//         role: "user",
//         content: userInput,
//     });

//     try {
//         const response = await openai.chat.completions.create({
//             model: "gpt-4o-mini",
//             messages: conversation,
//         });

//         const assistantReply = response.choices[0].message.content;

//         conversation.push({
//             role: "assistant",
//             content: assistantReply,
//         });

//         console.log("Assistant:", assistantReply);
//         console.log("Response:", response);

//         res.json({ reply: assistantReply });

//     } catch (error) {
//         console.error("Error during interaction:", error.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

import { OpenAI } from "openai";
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { lowCreativityMessage, mediumCreativityMessage, highCreativityMessage, guidelines } from './prompt.js';


dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); 

function getSystemMessageForCreativityLevel(creativityLevel) {
    switch (creativityLevel) {
        case 'low':
            return `${lowCreativityMessage}${guidelines}`;
        case 'medium':
            return `${mediumCreativityMessage}${guidelines}`;
        case 'high':
            return `${highCreativityMessage}${guidelines}`;
        default:
            return `${mediumCreativityMessage}${guidelines}`; // Default to medium if an invalid value is provided
    }
}


function getTemperatureForCreativityLevel(creativityLevel) {
    switch (creativityLevel) {
        case 'low':
            return 0.5;
        case 'medium':
            return 0.7;
        case 'high':
            return 1.0;
        default:
            return 0.7; // Default to medium if an invalid value is provided
    }
}


let conversation = [];

app.post('/api/conversations', async (req, res) => {
    const userInput = req.body.message;
    const creativityLevel = req.body.creativityLevel || 'medium'; // Default to moderate creativity if not provided
    const temperature = getTemperatureForCreativityLevel(creativityLevel);

    if (typeof userInput !== 'string') {
        return res.status(400).json({ error: 'Invalid input type. Expected a string.' });
    }

    // Reset conversation and set system message based on creativity level
    conversation = [
        {
            role: "system",
            content: getSystemMessageForCreativityLevel(creativityLevel),
        }
    ];

    conversation.push({
        role: "user",
        content: userInput,
    });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: conversation,
            temperature: temperature,
        });

        const assistantReply = response.choices[0].message.content;

        conversation.push({
            role: "assistant",
            content: assistantReply,
        });

        console.log("Creativity Level:", creativityLevel);
        console.log("Temperature:", temperature);
        console.log("Assistant:", assistantReply);
        console.log("Response:", response);

        res.json({ reply: assistantReply });

    } catch (error) {
        console.error("Error during interaction:", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});