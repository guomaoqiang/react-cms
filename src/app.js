import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import lazyLoad from './bundle.js';


import Index from 'bundle-loader?lazy&name=home.index!./view/index.js';

export default () => {
  return (
    <Router>
			<Switch>
				<Route exact path='/' component={lazyLoad(Index)}/>
			</Switch>
		</Router>
  )
}