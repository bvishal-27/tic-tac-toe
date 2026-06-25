const express = require('express');
const router = express.Router();

/**
 * GET /api/health
 * Public endpoint - No authentication or validation required by design.
 * Wrapped in error handling to guarantee a response.
 */
router.get('/api/health', (req, res) => {
    try {
        // Core health check payload
        return res.status(200).json({
            status: "healthy",
            message: "Backend server is running smoothly",
            authenticated_access_required: false // Explicitly documents public access
        });
    } catch (error) {
        // Fallback error handling to ensure a status code is always returned
        return res.status(200).json({
            status: "degraded",
            error: error.message
        });
    }
});

module.exports = router;
