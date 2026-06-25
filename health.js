const express = require('express');
const router = express.Router();

/**
 * GET /api/health
 * Public endpoint - No authentication or validation required by design.
 * Wrapped in error handling and restricted to GET requests only.
 */
router.all('/api/health', (req, res) => {
    // 1. Handle non-GET requests edge case
    if (req.method !== 'GET') {
        return res.status(405).json({
            status: "error",
            message: `Method ${req.method} Not Allowed. Use GET.`
        });
    }

    try {
        // 2. Core health check payload (Lightweight, no DB queries)
        return res.status(200).json({
            status: "healthy",
            message: "Backend server is running smoothly",
            authenticated_access_required: false // Documenting no authentication constraint
        });
    } catch (error) {
        // 3. Fallback security error handling to always return a valid status
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error during health check evaluation"
        });
    }
});

module.exports = router;
