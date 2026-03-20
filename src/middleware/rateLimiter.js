const logger = require("../utils/logger");
const rateLimitMap = new Map();

const WINDOW_SIZE = 60 * 1000;
const MAX_REQUESTS = 5;

module.exports = (req, res, next) => {
  const ip = req.ip;
  const time = Date.now();

  if (!rateLimitMap.has(ip)) {
    logger.info(`New IP tracked: ${ip}`);
    rateLimitMap.set(ip, []);
  }

  const timeStamps = rateLimitMap.get(ip);

  const filtered = timeStamps.filter((ts) => time - ts < WINDOW_SIZE);

  if (filtered.length >= 3) {
    logger.info(`High activity from IP ${ip}: ${filtered.length} requests`);
  }

  if (filtered.length >= MAX_REQUESTS) {
    logger.warn(`Rate limit exceeded for IP: ${ip}`);
    return res.status(429).json({
      message: "Too many uploads. Try again later.",
      retryAfter: "60 seconds",
    });
  }

  filtered.push(time);
  rateLimitMap.set(ip, filtered);

  next();
};
