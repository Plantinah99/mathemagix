import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import Competition from './components/Competition';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/game" component={Game} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/competition" component={Competition} />
      </Switch>
    </Router>
  );
}

export default App;
