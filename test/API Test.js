import axios from 'axios';

const BASE_URL = 'https://ai-chatterbox.mb6.top';

// Test 1: POST /db/user-info
async function testUserInfo() {
    try {
        const response = await axios.post(`${BASE_URL}/db/user-info`, {
            location: "Brizal",
            gender: "Male",
            DoB: "22-11-2000",
            sessionId: ""
        });
        console.log("Test 1 - User Info:");
        console.log(response.data);
    } catch (error) {
        console.error("Test 1 - User Info Error:", error.response ? error.response.data : error.message);
    }
}

// Test 2: POST /openai/completion
async function testCompletion() {
    try {
        const response = await axios.post(`${BASE_URL}/openai/completion`, {
            message: "climate change",
            creativityLevel: 0.5,
            sessionId: ""
        });
        console.log("Test 2 - Completion:");
        console.log(response.data);
    } catch (error) {
        console.error("Test 2 - Completion Error:", error.response ? error.response.data : error.message);
    }
}

async function runTests() {
    await testUserInfo();
    await testCompletion();
}

runTests();
