// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConnect = require('./db/dbConnect');
const authRoutes = require('./routes/auth');
const Users = require('./models/User'); // Import the Rigmage model

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
dbConnect();

// API endpoint to fetch keywords from rigmage collection
app.get('/api/keywords', async (req, res) => {
    try {
        // Fetch all documents from the rigmage collection
        const documents = await Users.find();
        
        // Extract keywords from each document
        const keywords = documents.flatMap(doc => doc.keywords);
        
        // Remove duplicates if necessary
        const uniqueKeywords = [...new Set(keywords)];
        
        res.json(uniqueKeywords);
    } catch (error) {
        console.error('Error fetching keywords:', error);
        res.status(500).send('Server Error');
    }
});

// Routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});