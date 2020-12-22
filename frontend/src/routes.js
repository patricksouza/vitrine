import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../src/pages/Home';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
    
      </Switch>
    </BrowserRouter>
  )
}