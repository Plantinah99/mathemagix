import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // TODO: Fetch leaderboard data from backend
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>{score.username}: {score.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
