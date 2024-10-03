import { Request } from '../models/rl.model.js';
import dotenv from 'dotenv';
dotenv.config();

/**
 * @typedef {Object} RequestSchema
 * @property {string} hash - The hash value of IP and Fingerprint.
 * @property {number} count - The number of requests.
 * @property {Date} date - The record date.
 */
const requestRate = async (req, res) => {
  const { hash } = req.body;
  const MAX_REQUESTS = process.env.MAX_REQUESTS;
  console.log('MAX_REQUESTS:', MAX_REQUESTS); // Outputs the value of MAX_REQUESTS

  try {
    // Get the current date, ignore the time part
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if there is an existing record for the hash
    let requestRecord = await Request.findOne({ hash });

    if (requestRecord) {
      // If the record exists, update the date to today
      requestRecord.date = today;

      // Check if the count has exceeded MAX_REQUESTS
      if (requestRecord.count >= MAX_REQUESTS) {
        return res.status(429).json({ message: 'Rate limit exceeded. You can only make 20 requests per day.' });
      }

      // Increment the count
      requestRecord.count += 1;
      await requestRecord.save();
    } else {
      // If no record exists, create a new record
      requestRecord = new Request({
        hash,
        count: 1,
        date: today
      });
      await requestRecord.save();
    }

    return res.status(200).json({ message: 'Request accepted', requestRate: requestRecord.count });
  } catch (error) {
    console.error('Error processing request:', error.message);
    // Check for duplicate key error
    if (error.code === 11000) {
      return res.status(500).json({ message: 'Duplicate key error: This hash has already been recorded for today.' });
    }
    return res.status(500).json({ message: error.message });
  }
};

export { requestRate };
