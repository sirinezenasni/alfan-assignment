import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.scss';

import NotFoundPage from './pages/notFound/NotFoundPage';
import MainLayout from './components/layouts/main/MainLayout';
import HomePage from './pages/home/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainLayout>
          <Switch>
            <Route exact path="/"><HomePage /></Route>

            <Route><NotFoundPage /></Route>
          </Switch>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
