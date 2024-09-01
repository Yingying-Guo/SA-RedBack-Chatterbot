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
app.use(express.static('public')); // 假设前端文件在public文件夹中

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
