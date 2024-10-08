// test/API.test.js
import axios from 'axios';

const BASE_URL = 'https://ai-chatterbox.mb6.top';
const limit = 5;  // Corrected to use 'const'

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

// Test 3: Verify password and get dynamic counts
async function getAccess() {
    try {
        // Step 1: Verify password
        const passwordVerification = await axios.post(`${BASE_URL}/admin/verify-password`, {
            password: 'admin123'
        });
        
        if (passwordVerification.status === 200) {
            console.log('Password verified successfully.');
        } else {
            console.error('Password verification failed.');
        }
    } catch (error) {
        console.error('API Request Error:', error.response ? error.response.data : error.message);
    }
}

// Test 4: GET /admin/export/users with limit
async function testExportUserData() {
    try {
        const response = await axios.get(`${BASE_URL}/admin/export/users?limit=${limit}`);
        console.log("Test 4 - Export User Data:");
        console.log(response.data);
    } catch (error) {
        console.error("Test 4 - Export User Data Error:", error.response ? error.response.data : error.message);
    }
}

// Test 5: GET /admin/export/chats with limit
async function testExportChatData() {
    try {
        const response = await axios.get(`${BASE_URL}/admin/export/chats?limit=${limit}`);
        console.log("Test 5 - Export Chat Data:");
        console.log(response.data);
    } catch (error) {
        console.error("Test 5 - Export Chat Data Error:", error.response ? error.response.data : error.message);
    }
}

// Test 6: GET /admin/export/users/count
async function testUserDataCount() {
    try {
        const response = await axios.get(`${BASE_URL}/admin/export/users/count`);
        console.log("Test 6 - User Data Count:");
        console.log(response.data);
    } catch (error) {
        console.error("Test 6 - User Data Count Error:", error.response ? error.response.data : error.message);
    }
}

// Test 7: GET /admin/export/chats/count
async function testChatDataCount() {
    try {
        const response = await axios.get(`${BASE_URL}/admin/export/chats/count`);
        console.log("Test 7 - Chat Data Count:");
        console.log(response.data);
    } catch (error) {
        console.error("Test 7 - Chat Data Count Error:", error.response ? error.response.data : error.message);
    }
}

// Run all tests
async function runTests() {
    await testUserInfo();
    await testCompletion();
    await getAccess();
    await testExportUserData();
    await testExportChatData();
    await testUserDataCount();
    await testChatDataCount();
}

runTests();
