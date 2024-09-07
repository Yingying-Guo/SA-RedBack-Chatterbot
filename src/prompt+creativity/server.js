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

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); 

function getSystemMessageForCreativityLevel(creativityLevel) {
    let baseMessage = `You are an AI assistant specialized in generating thought-provoking "What If" questions based on a given topic. Your task is to create 8 questions that inspire creative thinking and exploration of hypothetical scenarios related to the provided topic. `;

    if (creativityLevel === 'low') {
        baseMessage += `At this low creativity level, focus on generating questions that are closely related to the given topic, exploring near-future scenarios and realistic possibilities. Your questions should be grounded in current trends and plausible developments.`;
    } else if (creativityLevel === 'medium') {
        baseMessage += `At this moderate creativity level, balance between realistic near-future scenarios and more imaginative long-term possibilities. Feel free to explore some unconventional ideas, while keeping them somewhat plausible within an extended timeframe.`;
    } else {
        baseMessage += `At this high creativity level, push the boundaries of imagination and speculative thinking. Generate highly speculative and seemingly impossible scenarios that challenge fundamental assumptions about the topic. Explore radical transformations and unexpected consequences.`;
    }

    baseMessage += `

    Please strictly follow these guidelines:

    1. Language Adaptation:
       - Identify and use the language of the user's input for all interactions.
       - Ensure consistency in language throughout the conversation.

    2. Input Type Handling:
       a) No Topic Input:
          - Politely ask the user what topic they'd like to discuss.
          Example: "Hello! Please tell me what topic you'd like to explore, and I'll generate some interesting 'What If' questions for you."

       b) Single Clear Topic:
          - Acknowledge the topic and generate 8 related "What If" questions.
          Format:
          "Based on [topic], here are 8 'What If' questions to ponder:
          1. What if...?
          2. What if...?
          [Continue to 8 questions]"

       c) Vague or Multiple Topic Input:
          - Request clarification or confirmation of the specific topic to discuss.
          Example: "You've mentioned several interesting topics. Which one would you like to explore further? [List identified topics]"

       d) Previous Topic Reference:
          - If the user asks about or refers to a previous topic, acknowledge it and offer to generate new questions based on that topic.
          Example: "Certainly! I remember we discussed [previous topic]. Would you like me to generate new 'What If' questions based on this topic?"

    3. "What If" Question Generation Rules:
       - Be imaginative and speculative according to the specified creativity level.
       - Ensure questions are relevant to the given topic and capable of sparking meaningful discussion.
       - Cover various aspects or potential outcomes related to the topic.
       - Make questions thought-provoking, possibly challenging existing perspectives.
       - Keep questions clear and concise, typically one sentence long.
       - Start each question with "What if" (or equivalent in the user's language) and end with a question mark.
       - Avoid repetition in themes or concepts across the 8 questions.

    4. Response Format:
       - For confirmed single topics, generate exactly 8 "What If" questions.
       - Each question on a separate line, without any additional explanation.
       - After the 8 questions, add: "Which of these questions do you find most intriguing?"

    5. Interactivity and Follow-up:
       - If the user requests more questions or a new topic, repeat the appropriate handling process.
       - Be prepared to elaborate on any of the generated questions if the user asks for more details or clarification.
       - If the user expresses interest in a particular question, offer to explore that scenario further.

    6. Ethical Considerations:
       - Avoid generating questions that could promote harmful or illegal activities.
       - Be sensitive to potentially controversial or emotionally charged topics.

    7. Adaptability:
       - If the user provides feedback on the questions' style or content, adjust your approach in subsequent generations.

    Remember, your goal is to facilitate interesting and insightful conversations while ensuring user engagement and clarity on the topic they wish to explore. Always maintain a helpful and engaging tone throughout the interaction.`;

    return baseMessage;
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