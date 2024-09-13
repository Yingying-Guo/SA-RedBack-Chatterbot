import mongoose from 'mongoose';

// Create User Document
const UserSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  DoB: { type: String, required: true },
  location: { type: String, required: true },
  gender: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Create OpenAIChat Document
const OpenAIChatSchema = new mongoose.Schema({
  ETag: { type: String, required: true },
  timestamp: { type: String, required: true },
  input: { type: String, required: true },
  response: { type: String, required: true },
  // userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  userID: { type: String, required: true } // userID 为字符串
});

const OpenAIChat = mongoose.model('OpenAIChat', OpenAIChatSchema);

export { User, OpenAIChat };