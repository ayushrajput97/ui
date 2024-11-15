// backend/controllers/keywordsController.js
const Rigmage = require('../models/rigmage'); // Import the Rigmage model

// Function to get keywords from the database for a specific user
const getKeywordsFromDatabase = async (userId) => {
    try {
        // Find the document in the rigmage collection that corresponds to the user ID
        const document = await Rigmage.findOne({ userId: userId }); // Assuming you have a userId field in your rigmage collection
        
        if (!document) {
            throw new Error('No document found for this user');
        }

        return document.keywords; // Return the keywords array
    } catch (error) {
        console.error('Error fetching keywords from database:', error);
        throw error; // Rethrow the error to be handled in the router
    }
};

module.exports = { getKeywordsFromDatabase };