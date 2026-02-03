const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.JSONBIN_API_KEY;

// Map your data types to their specific Bin IDs from JSONBin.io
const BINS = {
    users: process.env.BIN_ID_USERS,
    candidates: process.env.BIN_ID_CANDIDATES,
    elections: process.env.BIN_ID_ELECTIONS,
    votes: process.env.BIN_ID_VOTES
};

const fileHandler = {
    read: async (type) => {
        try {
            const response = await axios.get(`https://api.jsonbin.io/v3/b/${BINS[type]}/latest`, {
                headers: { 'X-Master-Key': API_KEY }
            });
            return response.data.record;
        } catch (err) {
            console.error(`Cloud Read Error (${type}):`, err.message);
            return [];
        }
    },

    write: async (type, data) => {
        try {
            await axios.put(`https://api.jsonbin.io/v3/b/${BINS[type]}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY
                }
            });
            return true;
        } catch (err) {
            console.error(`Cloud Write Error (${type}):`, err.message);
            return false;
        }
    }
};

module.exports = fileHandler;