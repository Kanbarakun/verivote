const express = require('express');
const router = express.Router();
const fileHandler = require('../utils/fileHandler');

// Record a vote
router.post('/cast', (req, res) => {
    const { userId, category, candidateId } = req.body;
    const votes = fileHandler.read('votes.json');

    // Simple vote recording
    const newVote = {
        userId,
        category,
        candidateId,
        timestamp: new Date().toISOString()
    };

    votes.push(newVote);
    fileHandler.write('votes.json', votes);

    res.json({ success: true, message: "Vote cast successfully!" });
});

module.exports = router;