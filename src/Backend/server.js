import { OpenAI } from "openai";
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


// const openai = new OpenAI({ apiKey: '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' });

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); 

let conversation = [
  {
    role: "system",
    content: "You are a personal assistant. Answer the user's questions. You need to generate four What-If questions",
  }
];

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.message;

    // 将用户输入添加到对话历史中
    conversation.push({
        role: "user",
        content: userInput,
    });

    try {
        // 发送对话历史并获取助手的回复
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: conversation,
        });

        console.log(response);
        const assistantReply = response.choices[0].message.content;

        // 打印助手的回复到terminal
        console.log("Assistant:", assistantReply);

        // 将助手的回复添加到对话历史中
        conversation.push({
            role: "assistant",
            content: assistantReply,
        });

        // 返回助手的回复给前端
        res.json({ reply: assistantReply });
    } catch (error) {
        console.error("Error during interaction:", error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
