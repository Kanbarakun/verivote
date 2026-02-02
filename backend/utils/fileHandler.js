const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

const fileHandler = {
    // Reads a JSON file and returns an Array
    read: (fileName) => {
        const filePath = path.join(dataDir, fileName);
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data || '[]');
    },
    // Writes an Array into a JSON file
    write: (fileName, data) => {
        const filePath = path.join(dataDir, fileName);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
};

module.exports = fileHandler;