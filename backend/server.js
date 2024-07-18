const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const { getRandomQuestion } = require('./questions');

const app = express();
app.use(cors());
app.use(express.json());

const router = express.Router();

router.get('/question', (req, res) => {
  const question = getRandomQuestion();
  res.json(question);
});

router.post('/check', (req, res) => {
  const { id, answer } = req.body;
  const question = getRandomQuestion(id);
  
  if (question.correctAnswer === answer) {
    res.json({ correct: true });
  } else {
    const snarkyComments = [
      "Oh, come on! Even a calculator could do better!",
      "Are you sure you passed elementary school math?",
      "I've seen better math skills in a potato.",
      "Did you forget to carry the one, or your brain?",
      "Math: 1, You: 0. Try again, Einstein!"
    ];
    const randomComment = snarkyComments[Math.floor(Math.random() * snarkyComments.length)];
    res.json({ correct: false, message: randomComment });
  }
});

app.use('/.netlify/functions/server', router);

module.exports.handler = serverless(app);
