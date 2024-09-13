import { User, OpenAIChat } from '../models/db.model.js';

// Create a user record
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a Chat record
const createOpenAIChat = async (req, res) => {
  try {
    // 判断 userID 是否存在
    if (!req.body.userID) {
      return res.status(400).json({ message: "userID is required." });
    }

    // 判断 userID 是否为有效字符串（此处你可以加入其他格式校验逻辑，如UUID格式）
    if (typeof req.body.userID !== 'string' || req.body.userID.trim() === '') {
      return res.status(400).json({ message: "Invalid userID format." });
    }

    const openAIChat = new OpenAIChat({
      ...req.body, // 从请求体中获取输入的数据
      userID: req.body.userID // Assuming userID is passed as part of the request body
    });
    await openAIChat.save();

    res.status(200).json(openAIChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

export { createUser, createOpenAIChat, getOpenAIChatByUser };