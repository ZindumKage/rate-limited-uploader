const fs = require('fs');
const fileService = require('../services/file.service');
const logger = require('../utils/logger');

exports.handleUpload = async (req, res) => {
  try {
    const filePath = req.file.path;

    const result = await fileService.processFileStream(
      filePath,
      req.file.originalname
    );

    fs.unlinkSync(filePath);

    logger.info(`File processed: ${req.file.originalname}`);

    res.json({
      message: 'File uploaded successfully',
      data: result
    });

  } catch (error) {
    logger.error(`Error: ${error.message}`);

    res.status(500).json({
      message: 'Error processing file',
      error: error.message
    });
  }
};