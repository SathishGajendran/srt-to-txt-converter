const fs = require('fs');

const srtIndexRemoverRegex = /(\n)*([0-9]*)(\n).+ --> .+/g;
const UTF_8 = 'utf-8';

const readFile = filePath => {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, UTF_8, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

const writeFile = (filePath, data) => {
  return new Promise(function(resolve, reject) {
    fs.writeFile(filePath, data, err => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
};

const convertSrtDataToTxt = srtData => {
  try {
    return srtData.replace(srtIndexRemoverRegex, '').trim();
  } catch (err) {
    console.log(`Error while converting .srt to .txt :${err.message}`);
    throw err;
  }
};

const processSrtFile = async filePath => {
  try {
    const newFilePath = filePath.split('.srt')[0] + '.txt';
    const fileData = await readFile(filePath);
    const processedFileData = convertSrtDataToTxt(fileData);
    await writeFile(newFilePath, processedFileData);
  } catch (err) {
    console.log(err.message);
  }
};

processSrtFile(process.argv[2]);
