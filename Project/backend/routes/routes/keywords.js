const express = require('express');
const { getKeywordsFromDatabase } = require('../controllers/keywordsController'); // Import the controller
const { authenticateToken } = require('../middleware/authMiddleware'); // Import the authentication middleware

const router = express.Router();

// GET /api/keywords - Fetch keywords for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the request object set by the middleware
    const keywords = await getKeywordsFromDatabase(userId); // Fetch keywords from the database
    res.json({ keywords }); // Send the keywords as a response
  } catch (error) {
    console.error('Error fetching keywords:', error);
    res.status(500).json({ error: 'Failed to fetch keywords' }); // Handle errors
  }
});

module.exports = router;