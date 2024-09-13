import { User, OpenAIChat } from '../models/db.model.js';
// sessionId
import { Snowflake } from 'node-snowflake';  // Import Snowflake from node-snowflake

// Create a user record
const createUser = async (req, res) => {
  let { location, gender, DoB, sessionId } = req.body;

  try {
    // If no sessionId is provided by the client, generate a new one using Snowflake
    if (!sessionId) {
      sessionId = Snowflake.nextId();  // Generate a unique sessionId using Snowflake
    }

    // 创建并保存用户信息
    const user = new User({
      userID: sessionId,  // 使用 sessionId 作为 userID
      location,
      gender,
      DoB,
    });
    
    // console.log('DoB:', DoB);
    await user.save(); // 保存用户信息到数据库

    res.status(201).json({ sessionId: sessionId, message: 'User information saved successfully.' });
  } catch (error) {
    console.error('Error saving user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all Query by userID
const getOpenAIChatByUser = async (req, res) => {
  try {
    // 查询 User 表中的用户信息
    const user = await User.findOne({ userID: req.params.userID }).exec();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    
    // 根据 userID 查询 OpenAIChat 表中的记录
    const openAIChats = await OpenAIChat.find({ userID: user.userID }).exec();

    // 返回用户信息和相关的聊天记录
    res.status(200).json({ user, openAIChats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


import moment from 'moment-timezone';

/**
 * Create a Chat record
 * @param {string} chatID - 对话唯一标识
 * @param {number} timestamp - Unix 时间戳
 * @param {string} creativityLevel - 创造力级别
 * @param {string} userInput - 用户输入
 * @param {string} response - AI 回复
 * @param {string} userID - 用户 ID
 */
const createOpenAIChat = async (chatID, timestamp, creativityLevel, userInput, response, userID) => {
  try {
    // 判断 userID 是否存在
    if (!req.body.userID) {
      return res.status(400).json({ message: "userID is required." });
    }

    // 判断 userID 是否为有效字符串（此处你可以加入其他格式校验逻辑，如UUID格式）
    if (typeof req.body.userID !== 'string' || req.body.userID.trim() === '') {
      return res.status(400).json({ message: "Invalid userID format." });
    }

    // 创建新的聊天记录
    const newChatRecord = new OpenAIChat({
      chatID: chatID,
      timestamp: moment.unix(timestamp).tz('Australia/Sydney').format('YYYY-MM-DD HH:mm:ss z'), // Unix 时间戳
      creativityLevel: creativityLevel,
      userInput: userInput,  // 注意字段名应与模型定义一致
      response: response,
      userID: userID
    });

    // 保存到数据库
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


