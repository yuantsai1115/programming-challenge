const fs = require('fs').promises;

const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, {encoding: 'utf8'});
        return data;
    } catch (err) {
        console.error('Error reading the file:', err);
        throw err;
    }
};
  
const writeFile = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing the file:', err);
        throw err;
    }
};

module.exports = { readFile, writeFile };