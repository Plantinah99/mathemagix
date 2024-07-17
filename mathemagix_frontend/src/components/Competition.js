import React, { useState, useEffect } from 'react';
import Game from './Game';

const Competition = () => {
  const [competition, setCompetition] = useState(null);

  useEffect(() => {
    // TODO: Fetch competition data from backend
  }, []);

  return (
    <div>
      <h2>Live Competition</h2>
      {competition && (
        <div>
          <p>Competition: {competition.name}</p>
          <Game difficulty={competition.difficulty} timed={true} />
        </div>
      )}
    </div>
  );
};

export default Competition;
