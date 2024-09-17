import mongoose from 'mongoose';

// Create User Document
const UserSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  DoB: { type: String, required: false },
  location: { type: String, required: false },
  gender: { type: String, required: false }
});

const User = mongoose.model('User', UserSchema);

// Create OpenAIChat Document
const OpenAIChatSchema = new mongoose.Schema({
  chatID: { type: String, required: true },
  timestamp: { type: String, required: true },
  creativityLevel: { type: String, required: true },
  userInput: { type: String, required: true },
  response: { type: String, required: true },
  // userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  userID: { type: String, required: true } // userID 为字符串
});

const OpenAIChat = mongoose.model('OpenAIChat', OpenAIChatSchema);

export { User, OpenAIChat };