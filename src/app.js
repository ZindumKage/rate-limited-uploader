const express = require('express');
const uploadRoutes = require('./routes/upload.routes');

const app = express();

const loggerMiddleware = require('./middleware/logger.middleware')

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/upload', uploadRoutes);


app.get('/', (req, res) => {
  res.json({
    message: 'Rate Limited File Uploader API is running',
    endpoint: '/api/upload'
  });
});


app.use((err, req, res, next) => {
 
  if (err.name === 'MulterError') {
    return res.status(400).json({
      message: err.message
    });
  }

 
 const logger = require('./utils/logger');
logger.error(err.message);

  res.status(500).json({
    message: 'Internal Server Error'
  });
});


module.exports = app;