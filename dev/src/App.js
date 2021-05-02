import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';

export function App() {
  return (
    <main className="body">
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
    </main>
  )
}

export default App;


