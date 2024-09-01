import OpenAI from "openai";
import dotenv from "dotenv";

// 加载 .env 文件中的环境变量
dotenv.config();

// Initialize OpenAI with the API key from the environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "Who won the world series in 2020?"},
                {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
                {"role": "user", "content": "Where was it played?"}]
        });

        console.log(completion.choices[0].message);
    } catch (error) {
        console.error("Error occurred:", error.message);
    }
}

main();
