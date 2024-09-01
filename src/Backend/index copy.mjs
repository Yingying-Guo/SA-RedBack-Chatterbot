// import OpenAI from 'openai';
// import dotenv from 'dotenv';

// dotenv.config();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// console.log("Loaded API Key:", process.env.OPENAI_API_KEY); // 调试行

// async function main() {
//     try {
//         const completion = await openai.chat.completions.create({
//             model: "gpt-4o-mini", // 使用正确的模型名称
//             messages: [
//                 {"role": "system", "content": "You are a helpful assistant."},
//                 {"role": "user", "content": "Hello, how can you assist me today?"},
//             ],
//         });

//         const message = completion.choices[0].message.content;
//         console.log("Assistant's response:", message);
//     } catch (error) {
//         console.error("Error occurred:", error.message);
//     }
// }

// main();