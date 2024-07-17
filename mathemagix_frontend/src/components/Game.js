import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Game = ({ difficulty }) => {
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchQuestion();
  }, [difficulty]);

  const fetchQuestion = async () => {
    const response = await axios.get(`/api/questions?difficulty=${difficulty}`);
    setQuestion(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('/api/check-answer', {
      questionId: question.id,
      userAnswer,
    });

    if (response.data.correct) {
      setFeedback('Correct! Moving to the next question...');
      fetchQuestion();
    } else {
      setFeedback(getRandomIncorrectFeedback());
    }
    setUserAnswer('');
  };

  const getRandomIncorrectFeedback = () => {
    const feedbacks = [
      "Oops! That's not quite right. Maybe math isn't your strong suit?",
      "Wrong answer! Did you forget how to count?",
      "Nice try, but no cigar. Maybe stick to finger-counting?",
      "That's incorrect. Have you considered a career in interpretive dance instead?",
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div>
      <h2>Question: {question.text}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default Game;
