const logger = require('../utils/logger');

const allowedTypes = ['text/plain', 'text/csv'];

module.exports = (req, res, next) => {
  if (!req.file) {
    logger.warn('No file uploaded');
    return res.status(400).json({ message: 'File is required' });
  }

  if (!allowedTypes.includes(req.file.mimetype)) {
    logger.warn(`Invalid file type: ${req.file.mimetype}`);
    return res.status(400).json({
      message: 'Only .txt and .csv files are allowed'
    });
  }

  next();
};