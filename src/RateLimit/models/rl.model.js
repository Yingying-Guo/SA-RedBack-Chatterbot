import mongoose from 'mongoose';


/**
 * @typedef {Object} RequestSchema
 * @property {string} hash - The hash value of IP and Fingerprint.
 * @property {number} count - The number of requests.
 * @property {Date} date - The record date.
 */
const requestSchema = new mongoose.Schema({
  hash: { type: String, required: true, unique: true },  // IP + Fingerprint
  count: { type: Number, required: true, default: 1 }, 
  date: { type: Date, required: true }    
});

requestSchema.index({ date: 1 }, { expireAfterSeconds: 86400 });  // One day expiry

const Request = mongoose.model('Request', requestSchema);

export { Request };