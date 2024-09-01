import { OpenAI } from "openai";
import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 创建一个 readline 接口实例
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 对话历史记录
let conversation = [
  {
    role: "system",
    content: "You are a personal assistant. Answer the user's questions. You need to generate four What-If questions",
  }
];

// 处理用户输入
async function handleUserInput(userInput) {
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

    // 输出助手的回复
    console.log(`Assistant: ${assistantReply}`);

    // 将助手的回复添加到对话历史中
    conversation.push({
      role: "assistant",
      content: assistantReply,
    });

    // 继续等待用户输入
    promptUser();
  } catch (error) {
    console.error("Error during interaction:", error.message);
    rl.close();
  }
}

// 提示用户输入
function promptUser() {
  rl.question('You: ', (userInput) => {
    handleUserInput(userInput);
  });
}

// 开始与用户的交互
promptUser();
