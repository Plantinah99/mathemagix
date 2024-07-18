const express = require('express');
const cors = require('cors');
const { getRandomQuestion } = require('./questions');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/question', (req, res) => {
  const question = getRandomQuestion();
  res.json(question);
});

app.post('/api/check', (req, res) => {
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
