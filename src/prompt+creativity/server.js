import { OpenAI } from "openai";
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';  // 如果客户端不传 sessionId，可以生成一个新的
import { lowCreativityMessage, mediumCreativityMessage, highCreativityMessage, guidelines } from './prompt.js';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// 创建一个 Map 用于存储会话历史
const conversationHistory = new Map();

// 根据用户的Creativity Level获取系统消息
function getSystemMessageForCreativityLevel(creativityLevel) {
    switch (creativityLevel) {
        case 'low':
            return `${lowCreativityMessage}${guidelines}`;
        case 'medium':
            return `${mediumCreativityMessage}${guidelines}`;
        case 'high':
            return `${highCreativityMessage}${guidelines}`;
        default:
            return `${mediumCreativityMessage}${guidelines}`; // 默认使用中等创造力
    }
}

// 根据Creativity Level设置temperature
function getTemperatureForCreativityLevel(creativityLevel) {
    switch (creativityLevel) {
        case 'low':
            return 0.5;
        case 'medium':
            return 0.7;
        case 'high':
            return 1.0;
        default:
            return 0.7; // 默认使用中等创造力
    }
}

app.post('/api/conversations', async (req, res) => {
    const userInput = req.body.message;
    const creativityLevel = req.body.creativityLevel || 'medium';
    let sessionId = req.body.sessionId;  // 从客户端接收 sessionId
    const temperature = getTemperatureForCreativityLevel(creativityLevel);

    if (typeof userInput !== 'string') {
        return res.status(400).json({ error: 'Invalid input type. Expected a string.' });
    }

    // 如果客户端没有提供 sessionId，服务器生成一个新的
    if (!sessionId) {
        sessionId = uuidv4();  // 生成一个新的 sessionId
    }

    // 获取或初始化会话历史
    if (!conversationHistory.has(sessionId)) {
        conversationHistory.set(sessionId, [
            {
                role: "system",
                content: getSystemMessageForCreativityLevel(creativityLevel),
            }
        ]);
    }

    let conversation = conversationHistory.get(sessionId);

    // 添加用户输入到对话历史
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

        // 添加助手回复到对话历史
        conversation.push({
            role: "assistant",
            content: assistantReply,
        });

        // 更新会话历史
        conversationHistory.set(sessionId, conversation);

        console.log("Session ID:", sessionId);
        console.log("Creativity Level:", creativityLevel);
        console.log("Temperature:", temperature);
        console.log("Assistant:", assistantReply);
        console.log("Response:", response);

        // 将生成的回复和 sessionId 返回给客户端
        res.json({ reply: assistantReply, sessionId: sessionId });

    } catch (error) {
        console.error("Error during interaction:", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
