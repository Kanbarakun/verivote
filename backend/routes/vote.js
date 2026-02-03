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

router.get('/results', async (req, res) => {
    const votes = await fileHandler.read('votes');
    const candidates = await fileHandler.read('candidates');

    // Logic to count votes per candidate
    const summary = candidates.map(c => {
        const count = votes.filter(v => v.candidateId === c.id).length;
        return { name: c.name, votes: count };
    });

    res.json({ success: true, results: summary });
});
module.exports = router;