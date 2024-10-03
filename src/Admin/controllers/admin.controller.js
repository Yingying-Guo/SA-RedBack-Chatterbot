import { User, OpenAIChat } from '../../Database/models/db.model.js';
import { Parser } from 'json2csv';
import CryptoJS from 'crypto-js'; // Import CryptoJS for password encryption

// Export user data as CSV
const exportUserData = async (req, res) => {
    try {
        // Get the limit parameter from the query, converting it to an integer
        const limit = parseInt(req.query.limit) || 0; // Default to 0 (no limit) if limit is not provided

        // Fetch the specified number of users, using limit to restrict the result count
        const users = await User.find().limit(limit).exec();

        if (!users.length) {
            return res.status(404).json({ message: "No user data found." });
        }

        const userFields = ['userID', 'location', 'gender', 'DoB'];
        const userParser = new Parser({ fields: userFields });
        const userCsv = userParser.parse(users);

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="user_data.csv"');
        res.status(200).send(Buffer.from(userCsv, 'utf-8'));
    } catch (error) {
        console.error('Error exporting user data:', error.message);
        res.status(500).json({ message: 'Error exporting user data' });
    }
};

// Export chat data as CSV
const exportChatData = async (req, res) => {
    try {
        // Get the limit parameter from the query, converting it to an integer
        const limit = parseInt(req.query.limit) || 0; // Default to 0 (no limit) if limit is not provided

        // Fetch the specified number of chat records, using limit to restrict the result count
        const chats = await OpenAIChat.find().limit(limit).exec();

        if (!chats.length) {
            return res.status(404).json({ message: "No chat data found." });
        }

        const chatFields = ['chatID', 'timestamp', 'creativityLevel', 'userInput', 'response', 'userID'];
        const chatParser = new Parser({ fields: chatFields });
        const chatCsv = chatParser.parse(chats);

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="chat_data.csv"');
        res.status(200).send(Buffer.from(chatCsv, 'utf-8'));
    } catch (error) {
        console.error('Error exporting chat data:', error.message);
        res.status(500).json({ message: 'Error exporting chat data' });
    }
};

// Get the total count of user data
const getUserDataCount = async (req, res) => {
    try {
        const userCount = await User.countDocuments(); // Count the total number of users
        res.status(200).json({ count: userCount });
    } catch (error) {
        console.error('Error fetching user data count:', error.message);
        res.status(500).json({ message: 'Error fetching user data count' });
    }
};

// Get the total count of chat data
const getChatDataCount = async (req, res) => {
    try {
        const chatCount = await OpenAIChat.countDocuments(); // Count the total number of chat records
        res.status(200).json({ count: chatCount });
    } catch (error) {
        console.error('Error fetching chat data count:', error.message);
        res.status(500).json({ message: 'Error fetching chat data count' });
    }
};

// Hashed password stored on the backend
const correctHashedPassword = CryptoJS.SHA256("admin123").toString(CryptoJS.enc.Hex);

// Password verification
const authenticateAdmin = async (req, res) => {
    const { password } = req.body;

    // Check if the hashed password sent matches the correct hashed password
    if (password === correctHashedPassword) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ success: false });
    }
};

export { exportUserData, exportChatData, getUserDataCount, getChatDataCount, authenticateAdmin };