const fs = require('fs');
const readline = require('readline');

exports.processFileStream = async (filePath, fileName) => {
  const stream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  let wordCount = 0;
  let fileSize = 0;

  for await (const line of rl) {
    const words = line.trim().split(/\s+/).filter(Boolean);
    wordCount += words.length;
    fileSize += Buffer.byteLength(line + '\n');
  }

  return {
    fileName,
    fileSize,
    wordCount
  };
};