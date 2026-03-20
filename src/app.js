const express = require('express');
const uploadRoutes = require('./routes/upload.routes');

const app = express();

const loggerMiddleware = require('./middleware/logger.middleware')

app.use(express.json());

app.use ('/api/upload', uploadRoutes);

app.use((err, req, res, next) => {
  if (err.name === 'MulterError') {
    return res.status(400).json({
      message: err.message
    });
  }

  next(err);
});

module.exports = app;