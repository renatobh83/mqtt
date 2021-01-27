import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from '../pages/navbar';
import SliderChart from '../pages/slider';
import Temperatura from '../pages/temperatura';



function Router() {

  return (
  <BrowserRouter>
   <NavBar />
    <Switch>

      <Route path="/" component={Temperatura}/>
    </Switch>

  </BrowserRouter>)
}

export default Router;
