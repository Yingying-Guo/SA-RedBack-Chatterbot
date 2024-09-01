const express = require("express");
const { OpenAI } = require("openai"); // 引入 OpenAI SDK
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle incoming POST requests for chat messages
app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { "role": "system", "content": "You are a helpful assistant." },
                { "role": "system", "content": "You need to generate four What-If questions" },
                { "role": "user", "content": message },
            ],
        });

        const assistantMessage = completion.choices[0].message.content;
        console.log("Assistant's response:", assistantMessage);
        res.json({ response: assistantMessage });
    } catch (error) {
        console.error("Error occurred:", error.message);
        res.status(500).json({ response: "Sorry, something went wrong." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
