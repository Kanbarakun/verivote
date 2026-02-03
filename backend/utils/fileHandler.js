const axios = require('axios');
require('dotenv').config();

const BIN_ID = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const fileHandler = {
    // Read from Cloud
    read: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/latest`, {
                headers: { 'X-Master-Key': API_KEY }
            });
            return response.data.record;
        } catch (err) {
            console.error("Cloud Read Error:", err.response ? err.response.data : err.message);
            return [];
        }
    },

    // Write to Cloud
    write: async (data) => {
        try {
            await axios.put(BASE_URL, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY
                }
            });
            return true;
        } catch (err) {
            console.error("Cloud Write Error:", err.response ? err.response.data : err.message);
            return false;
        }
    }
};

module.exports = fileHandler;