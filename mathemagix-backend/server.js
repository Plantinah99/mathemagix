const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data files (for example purposes, you might replace with a database)
const questionsFilePath = path.join(__dirname, 'data', 'questions.json');

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to fetch quiz questions
app.get('/questions', (req, res) => {
    const questions = getQuestions();
    res.json(questions);
});

// Helper function to get questions from file
function getQuestions() {
    try {
        const questionsData = fs.readFileSync(questionsFilePath);
        return JSON.parse(questionsData);
    } catch (error) {
        console.error('Error reading questions:', error);
        return [];
    }
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

