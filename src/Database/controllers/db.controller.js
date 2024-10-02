import { User, OpenAIChat } from '../models/db.model.js';
import { Parser } from 'json2csv';
import { Snowflake } from 'node-snowflake';  // Import Snowflake from node-snowflake

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

export { exportUserData, exportChatData };

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

export { getUserDataCount, getChatDataCount };

// Create a user record
const createUser = async (req, res) => {
  let { location, gender, DoB, sessionId } = req.body;

  try {
    // If no sessionId is provided by the client, generate a new one using Snowflake
    if (!sessionId) {
      sessionId = Snowflake.nextId();  // Generate a unique sessionId using Snowflake
    }

    // Create and save user information
    const user = new User({
      userID: sessionId,  // Use sessionId as userID
      location,
      gender,
      DoB,
    });

    // console.log('DoB:', DoB);
    await user.save(); // Save user information to the database

    res.status(200).json({ sessionId: sessionId, message: 'User information saved successfully.' });
  } catch (error) {
    console.error('Error saving user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all Query by userID
const getOpenAIChatByUser = async (req, res) => {
  try {
    // Query user information in the User table
    const user = await User.findOne({ userID: req.params.userID }).exec();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Query records in the OpenAIChat table by userID
    const openAIChats = await OpenAIChat.find({ userID: user.userID }).exec();

    // Return user information and related chat logs
    res.status(200).json({ user, openAIChats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import moment from 'moment-timezone';

/**
 * Create a Chat record
 * @param {string} chatID - Dialogue unique identifier
 * @param {number} timestamp - Unix timestamp
 * @param {string} creativityLevel - Creativity level
 * @param {string} userInput - User input
 * @param {string} response - AI response
 * @param {string} userID - User ID
 */
const createOpenAIChat = async (chatID, timestamp, creativityLevel, userInput, response, userID) => {
  try {
    // Ensure userID is provided
    if (!userID) {
      return res.status(400).json({ message: "userID is required." });
    }

    // Ensure userID is a valid string (you can add additional checks, e.g., UUID format)
    if (typeof userID !== 'string' || userID.trim() === '') {
      return res.status(400).json({ message: "Invalid userID format." });
    }

    // Create a new chat record
    const newChatRecord = new OpenAIChat({
      chatID: chatID,
      timestamp: moment.unix(timestamp).tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss z'), // Unix timestamp
      creativityLevel: creativityLevel,
      userInput: userInput,  // Ensure field names are consistent with model definitions
      response: response,
      userID: userID
    });

    // Save to the database
    await newChatRecord.save();
    console.log('Chat record saved successfully.');
    // res.status(200).json(openAIChat);
  } catch (error) {
    console.error('Error saving chat record:', error.message);
    throw new Error('Error saving chat record');
    // res.status(500).json({ message: error.message });
  }
};

export { createUser, createOpenAIChat, getOpenAIChatByUser };
