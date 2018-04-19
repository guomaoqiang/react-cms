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
import List from 'bundle-loader?lazy&name=home.list!./view/list.js';


// 后管
import Admin from 'bundle-loader?lazy&name=admin.index!./view/admin/index.js';

export default () => {
  return (
    <Router>
			<Switch>
				<Route exact path='/' component={lazyLoad(Index)}/>
        <Route  path='/list' component={lazyLoad(List)}/>
        <Route  path='/admin' component={lazyLoad(Admin)}/>
			</Switch>
		</Router>
  )
}