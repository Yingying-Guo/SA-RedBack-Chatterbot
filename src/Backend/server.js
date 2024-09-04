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

let conversation = [
  {
    role: "system",
    content: "You are a personal assistant. Answer the user's questions and generate four What-If questions.",
  }
];

app.post('/api/conversations', async (req, res) => {
    const userInput = req.body.message;

    if (typeof userInput !== 'string') {
        return res.status(400).json({ error: 'Invalid input type. Expected a string.' });
    }

    conversation.push({
        role: "user",
        content: userInput,
    });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: conversation,
        });

        const assistantReply = response.choices[0].message.content;

        conversation.push({
            role: "assistant",
            content: assistantReply,
        });

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
