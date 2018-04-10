import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Index from './view/index.js';
import List from './view/list.js';

export default () => {
  return (
    <Router>
			<Switch>
				<Route exact path='/' component={Index}/>
				<Route path='/list' component={List}/>
			</Switch>
		</Router>
  )
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);