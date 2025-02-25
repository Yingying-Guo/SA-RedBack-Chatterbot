import { User, OpenAIChat } from '../models/db.model.js';
import { Snowflake } from 'node-snowflake';  // Import Snowflake from node-snowflake


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
