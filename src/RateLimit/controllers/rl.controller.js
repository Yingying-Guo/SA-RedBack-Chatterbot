import { Request } from '../models/rl.model.js';

/**
 * @typedef {Object} RequestSchema
 * @property {string} hash - The hash value of IP and Fingerprint.
 * @property {number} count - The number of requests.
 * @property {Date} date - The record date.
 */
const requestRate = async (req, res) => {
    const { hash } = req.body;
  
    try {
      // 获取当前日期，忽略时间部分
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // 查找今天该用户的请求记录
      let requestRecord = await Request.findOne({ hash, date: today });
      
      if (requestRecord) {
        // 如果记录存在，检查请求次数是否超过 20 次
        if (requestRecord.count >= 20) {
          return res.status(500).json({ message: 'Rate limit exceeded. You can only make 20 requests per day.' });
        }
        
        // 如果没有超限，增加请求次数
        requestRecord.count += 1;
        await requestRecord.save();
      } else {
        // 如果没有记录，创建新记录
        requestRecord = new Request({
          hash,
          count: 1,
          date: today
        });
        await requestRecord.save();
      }
      
      res.status(200).json({ message: 'Request accepted', requestRate: requestRecord.count});
  } catch (error) {
    console.error('Error processing request:', error.message);
    throw new Error('Error processing request');
    // res.status(500).json({ message: error.message });
  }
};

export { requestRate };


