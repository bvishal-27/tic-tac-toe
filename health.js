const express = require('express');
const router = express.Router();

/**
 * Lightweight GET endpoint to verify that the backend server 
 * is up, running, and accessible.
 */
router.get('/api/health', (req, res) => {
    return res.status(200).json({
        status: "healthy",
        message: "Backend server is running smoothly"
    });
});

module.exports = router;
