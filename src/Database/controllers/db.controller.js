import { User, OpenAIChat } from '../models/db.model.js';
import { Parser } from 'json2csv';
import { Snowflake } from 'node-snowflake';  // Import Snowflake from node-snowflake


// 导出用户数据为 CSV
const exportUserData = async (req, res) => {
  try {
    // 从查询参数中获取 limit 参数，转换为整数
    const limit = parseInt(req.query.limit) || 0; // 如果没有提供 limit，则默认为 0（不限制）

    // 获取指定数量的用户数据，使用 limit 方法来限制返回的数量
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

// 导出聊天记录数据为 CSV
const exportChatData = async (req, res) => {
  try {
    // 从查询参数中获取 limit 参数，转换为整数
    const limit = parseInt(req.query.limit) || 0; // 如果没有提供 limit，则默认为 0（不限制）

    // 获取指定数量的聊天记录，使用 limit 方法来限制返回的数量
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

// 获取用户数据总条数
const getUserDataCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments(); // 统计用户数据总数
    res.status(200).json({ count: userCount });
  } catch (error) {
    console.error('Error fetching user data count:', error.message);
    res.status(500).json({ message: 'Error fetching user data count' });
  }
};

// 获取聊天记录数据总条数
const getChatDataCount = async (req, res) => {
  try {
    const chatCount = await OpenAIChat.countDocuments(); // 统计聊天记录数据总数
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
    // Querying user information in the User table
    const user = await User.findOne({ userID: req.params.userID }).exec();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Querying records in the OpenAIChat table by userID
    const openAIChats = await OpenAIChat.find({ userID: user.userID }).exec();

    // Returns user information and related chat logs
    res.status(200).json({ user, openAIChats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


import moment from 'moment-timezone';

/**
 * Create a Chat record
 * @param {string} chatID - Dialogue unique identifiers
 * @param {number} timestamp - Unix timestamp
 * @param {string} creativityLevel - Creativity level
 * @param {string} userInput - user input
 * @param {string} response - AI Replies
 * @param {string} userID - User ID
 */
const createOpenAIChat = async (chatID, timestamp, creativityLevel, userInput, response, userID) => {
  try {
    // Determine if userID exists
    if (!userID) {
      return res.status(400).json({ message: "userID is required." });
    }

    // Determine if userID is a valid string (here you can add other format checking logic, such as UUID format)
    if (typeof userID !== 'string' || userID.trim() === '') {
      return res.status(400).json({ message: "Invalid userID format." });
    }

    // Creating a new chat
    const newChatRecord = new OpenAIChat({
      chatID: chatID,
      timestamp: moment.unix(timestamp).tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss z'), // Unix 时间戳
      creativityLevel: creativityLevel,
      userInput: userInput,  // Note that field names should be consistent with model definitions
      response: response,
      userID: userID
    });

    // Save to database
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


